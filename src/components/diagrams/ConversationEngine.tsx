"use client";
import { motion } from "framer-motion";

export const ConversationEngine = () => {
    return (
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Logic Flow */}
            <div className="relative h-[300px] border border-white/10 rounded-xl bg-zinc-900/50 p-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

                {/* Nodes */}
                <div className="relative z-10 flex gap-8">
                    <LogicNode label="If Opened" action="Send Video 2" delay={0} />
                    <div className="text-zinc-600 self-center">→</div>
                    <LogicNode label="If No Reply" action="Send Case Study" delay={0.3} active />
                </div>
            </div>

            {/* Right: Phone Interface */}
            <div className="bg-black border-[4px] border-zinc-800 rounded-[2rem] p-3 shadow-2xl w-[280px] mx-auto h-[450px] relative overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-zinc-800 rounded-b-xl z-20" />

                {/* Screen */}
                <div className="bg-zinc-950 w-full h-full rounded-[1.5rem] overflow-hidden flex flex-col p-4 pt-12">
                    <div className="flex-1 flex flex-col gap-3">
                        <ChatBubble text="Does this work with Prop firms?" align="right" delay={0.5} />
                        <ChatBubble text="Yes, QuantumX is compatible. Are you looking to pass a challenge?" align="left" delay={1.0} isAi />
                        <ChatBubble text="Personal capital." align="right" delay={1.8} />
                        <ChatBubble text="Great. I have a case study on that. Sending now." align="left" delay={2.5} isAi />
                    </div>

                    {/* Input Area */}
                    <div className="mt-4 h-10 bg-zinc-900 rounded-full border border-white/10 flex items-center px-3">
                        <div className="w-full h-2 bg-zinc-800 rounded-full opacity-50" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const LogicNode = ({ label, action, delay, active }: { label: string, action: string, delay: number, active?: boolean }) => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
        className={`w-32 p-4 rounded-lg border flex flex-col items-center text-center gap-2 backdrop-blur-sm ${active ? 'border-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.15)]' : 'border-white/20 bg-black/50'}`}
    >
        <span className="text-[10px] text-zinc-400 uppercase tracking-wide">{label}</span>
        <span className="text-xs font-bold text-white leading-tight">{action}</span>
    </motion.div>
)

const ChatBubble = ({ text, align, delay, isAi }: { text: string, align: 'left' | 'right', delay: number, isAi?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 0.4 }}
        className={`max-w-[85%] p-3 rounded-2xl text-[10px] leading-relaxed ${align === 'right' ? 'bg-zinc-800 text-white ml-auto rounded-br-none' : 'bg-white text-black mr-auto rounded-bl-none'}`}
    >
        {isAi && <span className="block text-[8px] font-bold opacity-50 mb-1 uppercase tracking-wider">AI Assistant</span>}
        {text}
    </motion.div>
)
