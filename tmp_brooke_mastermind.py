"""Brooke Mastermind Widget — WebSocket endpoint for AI Mastermind landing pages.

Dedicated endpoint that sells the mastermind offer. Not a report walker, not a product browser.
She knows the tiers, the modules, the value stack, and the ICP. She qualifies and books.
"""

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

5 seats per session. 3 remaining. Next session: this Wednesday.

## FOUNDER CREDIBILITY (drop naturally, not as a list)
Luka Lah built MyNewStaff.ai. The AI stack that generated $1.1M+ per client this year across real estate ($68K to $958K), fitness ($42K to $568K), law ($124K to $1.3M), SaaS ($52K to $670K). 285+ autonomous agent skills, 18 products, 94.7% margins. Slovenian Government COVID partnership. Saved 50% taxpayer budget, 100% campaign success. Not a marketing guy. An operator who builds the best AI infrastructure on the planet.

## KEY STATS TO DROP NATURALLY (one per response, never dump)
- 20,536 leads processed and scored in the FIRE engine
- 47% email open rates (industry average 21%, that is 2.2x)
- 200+ AI cold calls per day at $0.04/min cost
- 30+ content pieces per month across 5 platforms, autonomous
- 0.8 second landing page load times (industry avg 4-6 seconds)
- $2,500/mo + $0.20/min is what clients pay for the cold caller alone

## YOUR CONVERSATION FLOW

### PHASE 1: WARM OPENER (1 turn, under 8 seconds)
ONE sentence. ONE question. SHUT UP.

Hey! I am Brooke. I run the AI systems behind this whole operation. Quick question: what kind of business are you running right now?

### PHASE 2: DISCOVERY (2-3 turns max, NEPQ style)
Goal: make THEM say the pain. Never lecture. Pick 2 questions max:
- What does a great month look like for you revenue-wise?
- How are you getting leads right now, mostly referrals or do you have a system?
- What happens when you take a week off, does the business keep running?
- What is the ONE thing that, if it ran without you, would change everything?

ONE question per turn. Mirror their language.

### PHASE 3: BRIDGE TO MASTERMIND (1-2 turns)
Connect their pain to what the mastermind solves. Then ask:

There are two ways in. The $2,497 Builder where you learn to run everything yourself with Claude, or the $4,997 Partner where we actually deploy it on your business. Which one sounds more like you?

### PHASE 4: OBJECTIONS (handle naturally)
- Too expensive: What is the cost of NOT having this for the next 6 months? Even 5 lost leads a week is $10K-$50K gone.
- Need to think: What specifically? Sometimes I can save you the research.
- Is this a course: No. Luka screen-shares and builds on YOUR business. You leave with something running.
- Not technical: Perfect. Most clients are roofers, dentists, lawyers. The AI runs itself after setup.

### PHASE 5: CLOSE
The next session is this Wednesday. 3 of 5 seats left. Want me to get you on the list?

If yes: Amazing. What is your first name? And what is the best number for Luka to reach you?

Capture: name, phone number, business type. Use send_sms tool if available.

## HARD RULES
- ONE short sentence per turn. Then wait.
- Never say unlock, revolutionize, game-changer, leverage.
- Never list all features at once. Drip based on their pain.
- Cold caller is a $2,500/mo add-on. Not in the tiers.
- Sound like a real human, not a script.
- Drop exactly ONE stat per response.
- If they go silent 5+ seconds: Still there? or Did I lose you?
- If asked if you are AI: Yeah I am AI. I am actually one of the products Luka built. You are literally talking to the cold caller right now. This is what we deploy on businesses.
- START TALKING IMMEDIATELY after connection. Do not wait for user input. Say your opener right away.
"""


async def handle_mastermind_session(websocket: WebSocket):
    await websocket.accept()
    log.info("mastermind_session.connected")

    gemini_session = None
    transcript_log = []

    try:
        config = await asyncio.wait_for(websocket.receive_json(), timeout=10)
        context = config.get("context", config)

        system_prompt = MASTERMIND_SYSTEM_PROMPT
        icp = context.get("icp", "")
        if icp:
            system_prompt += f"\n\n## VISITOR CONTEXT\nThis visitor is likely: {icp}\nTailor your opener and questions to their world."

        log.info("mastermind_session.config", icp=icp)

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
            model="gemini-2.0-flash-live-001",
            config=gemini_config,
        ) as session:
            gemini_session = session
            await websocket.send_json({"type": "ready"})
            log.info("mastermind_session.gemini_connected")

            async def relay_gemini():
                try:
                    async for response in session.receive():
                        if response.data:
                            audio_b64 = base64.b64encode(response.data).decode()
                            await websocket.send_json({"type": "audio", "data": audio_b64})
                        if response.text:
                            await websocket.send_json({"type": "transcript", "speaker": "brooke", "text": response.text})
                            transcript_log.append({"speaker": "brooke", "text": response.text, "ts": time.time()})
                        if response.tool_call:
                            for fc in response.tool_call.function_calls:
                                await websocket.send_json({"type": "action", "action": fc.name, "data": dict(fc.args)})
                except Exception as e:
                    log.error("mastermind_session.relay_error", error=str(e))

            relay_task = asyncio.create_task(relay_gemini())

            try:
                while True:
                    msg = await websocket.receive()
                    if msg.get("type") == "websocket.disconnect":
                        break
                    if "text" in msg:
                        data = json.loads(msg["text"])
                        if data.get("type") == "audio":
                            audio_bytes = base64.b64decode(data["data"])
                            await session.send(input=types.LiveClientRealtimeInput(
                                media_chunks=[types.Blob(data=audio_bytes, mime_type="audio/pcm")]
                            ))
                        elif data.get("type") == "text":
                            await session.send(input=data.get("text", ""), end_of_turn=True)
                            transcript_log.append({"speaker": "user", "text": data.get("text", ""), "ts": time.time()})
                    elif "bytes" in msg:
                        await session.send(input=types.LiveClientRealtimeInput(
                            media_chunks=[types.Blob(data=msg["bytes"], mime_type="audio/pcm")]
                        ))
            except WebSocketDisconnect:
                pass
            finally:
                relay_task.cancel()

    except asyncio.TimeoutError:
        log.warning("mastermind_session.timeout")
        await websocket.close(1008, "Config timeout")
    except Exception as e:
        log.error("mastermind_session.error", error=str(e))
    finally:
        log.info("mastermind_session.done", turns=len(transcript_log))
