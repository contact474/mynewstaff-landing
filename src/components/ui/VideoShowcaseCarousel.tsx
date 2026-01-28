"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Mock thumbnails
const videos = [
    "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=500"
];

export const VideoShowcaseCarousel = () => {
    return (
        <div className="w-full relative overflow-hidden py-10 bg-zinc-950/50">
            <div className="flex w-full">
                {/* Infinite Scroll Wrapper */}
                <VideoRow />
                <VideoRow />
            </div>
            {/* Gradients */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        </div>
    );
};

const VideoRow = () => (
    <motion.div
        className="flex flex-shrink-0 gap-6 px-3"
        animate={{ x: "-100%" }}
        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
    >
        {videos.map((src, i) => (
            <div key={i} className="relative w-[250px] aspect-[9/16] rounded-2xl overflow-hidden group border border-white/10 flex-shrink-0 cursor-pointer">
                <img src={src} alt="AI Video" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                </div>

                {/* Footer Info */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-wider text-white">AI Generated</span>
                    </div>
                </div>
            </div>
        ))}
    </motion.div>
)
