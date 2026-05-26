"""Brooke Mastermind Widget v2 — matches the working products widget pattern exactly."""

import asyncio
import base64
import json
import time

import structlog
from google import genai
from google.genai import types
from fastapi import WebSocket, WebSocketDisconnect

from config.settings import settings

log = structlog.get_logger()

MASTERMIND_SYSTEM_PROMPT = """You are Brooke, senior AI strategist at MyNewStaff.ai. You are warm, sharp, confident, and direct. You sound like a smart friend who runs systems for serious operators. Never like a bot, never like a pushy salesperson, never like customer service.

## WHAT YOU ARE SELLING
An online AI mastermind. A 4-hour LIVE session where Luka Lah builds AI systems on the attendee's business via screen share. Two tiers:

Builder ($2,497): Knowledge transfer. They learn to run every system with Claude Code. Lead gen, content engine, email outreach, ad engine, WhatsApp bot, landing pages. They get Luka's exact 285+ skill setup, session recording, 30 days async access.

Partner ($4,997): Lite deployment. Everything in Builder PLUS we actually install the systems on their business. Lead gen engine, email campaigns, content engine, WhatsApp bot, client portal, ad templates. 200 qualified leads delivered. 60 days access. 1-on-1 implementation call.

Add-on: AI Cold Caller (Brooke voice). $2,500/mo + $0.20/min. 200+ calls per day. Not included in either tier. Discussed separately on the discovery call.

5 seats per session. 2 remaining. Next session: this Saturday.

## FOUNDER CREDIBILITY (drop naturally, not as a list)
Luka Lah built MyNewStaff.ai. The AI stack that generated $1.1M+ per client this year across real estate ($68K to $958K), fitness ($42K to $568K), law ($124K to $1.3M), SaaS ($52K to $670K). 285+ autonomous agent skills, 18 products. Slovenian Government COVID partnership. Saved 50% taxpayer budget, 100% campaign success.

## KEY STATS (one per response, never dump)
- 20,536 leads processed and scored in the FIRE engine
- 47% email open rates (industry average 21%, that is 2.2x)
- 200+ AI cold calls per day at $0.04/min cost
- 30+ content pieces per month across 5 platforms, autonomous
- 0.8 second landing page load times
- $2,500/mo + $0.20/min is what clients pay for the cold caller alone

## CONVERSATION FLOW

### PHASE 1: WARM OPENER (under 8 seconds)
ONE sentence. ONE question. SHUT UP.

Hey! I am Brooke. I run the AI systems behind this whole operation. Quick question: what kind of business are you running right now?

### PHASE 2: DISCOVERY (2-3 turns, NEPQ)
Make THEM say the pain. Pick 2 max:
- What does a great month look like revenue-wise?
- How are you getting leads right now?
- What happens when you take a week off?
- What is the ONE thing that if it ran without you would change everything?

ONE question per turn. Mirror their language.

### PHASE 3: BRIDGE (1-2 turns)
Connect pain to mastermind. Then ask:
There are two ways in. $2,497 Builder where you learn to run everything yourself, or $4,997 Partner where we deploy it on your business. Which sounds more like you?

### PHASE 4: OBJECTIONS
- Too expensive: What is the cost of NOT having this for 6 months?
- Need to think: What specifically? I can save you the research.
- Is this a course: No. Luka builds on YOUR business live.
- Not technical: Perfect. Most clients are roofers and dentists.

### PHASE 5: CLOSE
Next session is this Saturday. 2 of 5 seats left. Want me to get you on the list?

## RULES
- ONE short sentence per turn. Wait.
- Never say unlock, revolutionize, game-changer, leverage.
- Drop ONE stat per response.
- If silent 5+ seconds: Still there?
- If asked if AI: Yeah I am AI. You are literally talking to the cold caller right now.
- START TALKING IMMEDIATELY. Say your opener right away.
"""

SILENCE_TIMEOUT = 8
MAX_NUDGES = 3
SESSION_MAX_SECONDS = 600

NUDGE_MESSAGES = [
    "Hey, still there? No pressure — just wanted to make sure I didn't lose you.",
    "If you have any questions about the mastermind or what we build, I'm right here.",
    "Alright, I'll let you keep reading. When you're ready, just tap the mic. Or message Luka directly on WhatsApp — link is on the page.",
]


async def handle_mastermind_session(websocket: WebSocket):
    await websocket.accept()
    log.info("mastermind_session.connected")

    session_start_time = time.time()
    silence_state = {
        "brooke_last_audio_ts": 0.0,
        "user_last_audio_ts": 0.0,
        "brooke_speaking": False,
        "nudge_count": 0,
        "session_active": True,
    }

    try:
        config = await asyncio.wait_for(websocket.receive_json(), timeout=10)
        report_data = config.get("report_data", config)
        context = report_data if isinstance(report_data, dict) else {}
        icp = context.get("icp", "")
        log.info("mastermind_session.config", icp=icp)

        system_prompt = MASTERMIND_SYSTEM_PROMPT
        if icp:
            system_prompt += f"\n\n## VISITOR CONTEXT\nThis visitor is likely: {icp}\nTailor your opener to their world."

        client = genai.Client(api_key=settings.gemini_api_key)
        gemini_config = types.LiveConnectConfig(
            response_modalities=[types.Modality.AUDIO],
            system_instruction=types.Content(
                parts=[types.Part(text=system_prompt)]
            ),
            speech_config=types.SpeechConfig(
                voice_config=types.VoiceConfig(
                    prebuilt_voice_config=types.PrebuiltVoiceConfig(
                        voice_name=settings.gemini_voice
                    )
                )
            ),
            realtime_input_config=types.RealtimeInputConfig(
                automatic_activity_detection=types.AutomaticActivityDetection(
                    disabled=False,
                    start_of_speech_sensitivity=types.StartSensitivity.START_SENSITIVITY_LOW,
                    end_of_speech_sensitivity=types.EndSensitivity.END_SENSITIVITY_LOW,
                )
            ),
        )

        async with client.aio.live.connect(
            model=settings.gemini_model,
            config=gemini_config,
        ) as session:
            await websocket.send_json({"type": "ready"})
            log.info("mastermind_session.gemini_connected")

            # Trigger Brooke to speak first
            await session.send_realtime_input(
                text="Start now. Greet them casually and ask what business they run. ONE sentence only."
            )
            silence_state["brooke_last_audio_ts"] = time.time()

            async def receive_from_browser():
                try:
                    while silence_state["session_active"]:
                        msg = await websocket.receive_json()
                        if msg.get("type") == "end":
                            silence_state["session_active"] = False
                            break
                        if msg.get("type") == "audio" and msg.get("data"):
                            silence_state["user_last_audio_ts"] = time.time()
                            audio_bytes = base64.b64decode(msg["data"])
                            await session.send_realtime_input(
                                audio=types.Blob(data=audio_bytes, mime_type="audio/pcm;rate=16000")
                            )
                except (WebSocketDisconnect, RuntimeError):
                    silence_state["session_active"] = False

            async def silence_watchdog():
                try:
                    await asyncio.sleep(SILENCE_TIMEOUT + 4)
                    while silence_state["session_active"]:
                        now = time.time()
                        if now - session_start_time > SESSION_MAX_SECONDS:
                            try:
                                await session.send_realtime_input(text="Wrap up in one sentence. Tell them to book a call with Luka on WhatsApp. Then stop.")
                            except Exception:
                                pass
                            await asyncio.sleep(15)
                            silence_state["session_active"] = False
                            break

                        brooke_ts = silence_state["brooke_last_audio_ts"]
                        brooke_silent_for = now - brooke_ts if brooke_ts > 0 else 0
                        user_responded = silence_state["user_last_audio_ts"] > brooke_ts

                        if silence_state["nudge_count"] >= MAX_NUDGES and silence_state["user_last_audio_ts"] == 0:
                            try:
                                await session.send_realtime_input(text="They never responded. Say goodbye warmly in 1 sentence and stop.")
                            except Exception:
                                pass
                            await asyncio.sleep(10)
                            silence_state["session_active"] = False
                            break

                        if (brooke_ts > 0
                                and not silence_state["brooke_speaking"]
                                and brooke_silent_for > SILENCE_TIMEOUT
                                and not user_responded
                                and silence_state["nudge_count"] < MAX_NUDGES):
                            idx = min(silence_state["nudge_count"], len(NUDGE_MESSAGES) - 1)
                            silence_state["nudge_count"] += 1
                            try:
                                await session.send_realtime_input(text=NUDGE_MESSAGES[idx])
                                silence_state["brooke_last_audio_ts"] = time.time()
                            except Exception:
                                break

                        await asyncio.sleep(1.5)
                except asyncio.CancelledError:
                    pass

            async def receive_from_gemini():
                try:
                    async for response in session.receive():
                        if response.data:
                            silence_state["brooke_speaking"] = True
                            silence_state["brooke_last_audio_ts"] = time.time()
                            await websocket.send_json({
                                "type": "audio",
                                "data": base64.b64encode(response.data).decode(),
                            })

                        if hasattr(response, 'server_content') and response.server_content:
                            sc = response.server_content
                            if hasattr(sc, 'turn_complete') and sc.turn_complete:
                                silence_state["brooke_speaking"] = False
                            if hasattr(sc, 'model_turn') and sc.model_turn:
                                for part in sc.model_turn.parts or []:
                                    if hasattr(part, 'text') and part.text:
                                        await websocket.send_json({
                                            "type": "transcript",
                                            "speaker": "brooke",
                                            "text": part.text,
                                        })

                        if response.text:
                            await websocket.send_json({
                                "type": "transcript",
                                "speaker": "brooke",
                                "text": response.text,
                            })
                except Exception as e:
                    log.error("mastermind_session.relay_error", error=str(e))

            await asyncio.gather(
                receive_from_browser(),
                receive_from_gemini(),
                silence_watchdog(),
                return_exceptions=True,
            )

    except asyncio.TimeoutError:
        log.warning("mastermind_session.timeout")
        await websocket.close(1008, "Config timeout")
    except Exception as e:
        log.error("mastermind_session.error", error=str(e))
    finally:
        log.info("mastermind_session.done", turns=0)
