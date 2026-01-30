"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Local videos
const videos = [
    "/videos/video_1.mp4",
    "/videos/video_2.mp4",
    "/videos/video_3.mp4",
    "/videos/video_4.mp4",
    "/videos/video_5.mp4",
    "/videos/video_6.mp4"
];

export const VideoShowcaseCarousel = () => {
    return (
        <div className="w-full relative overflow-hidden py-10 bg-zinc-950/50">
            <div className="flex w-full">
                {/* Infinite Scroll Wrapper */}
                {/* Note: We duplicate the row to ensure seamless infinite scroll */}
                <VideoRow key="row-1" />
                <VideoRow key="row-2" />
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
        transition={{ ease: "linear", duration: 40, repeat: Infinity }}
    >
        {videos.map((src, i) => (
            <div key={i} className="relative w-[250px] aspect-[9/16] rounded-2xl overflow-hidden group border border-white/10 flex-shrink-0 bg-black">
                <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />

                {/* Overlay Gradient to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />

                {/* Footer Info */}
                <div className="absolute bottom-0 left-0 w-full p-4 pointer-events-none">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-wider text-white">Live Demo</span>
                    </div>
                </div>
            </div>
        ))}
    </motion.div>
)
