"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Mock thumbnails
// Mock thumbnails - mirroring the user's provided visual examples
const videos = [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=500", // TikTok/Phone
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=500", // Handshake/Business
    "https://images.unsplash.com/photo-1574375927938-d5a98e8efe30?auto=format&fit=crop&q=80&w=500", // Netflix/Cinematic
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=500", // Movie Collage
    "https://images.unsplash.com/photo-1611944212129-299908b0690d?auto=format&fit=crop&q=80&w=500", // LinkedIn
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=500"  // AI/Future
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
