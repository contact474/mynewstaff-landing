"use client";
import Link from "next/link";
import { useQuiz } from "./QuizModal";

export function HomeStickyNav() {
    const { openQuiz } = useQuiz();

    return (
        <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap md:flex-nowrap justify-center items-center gap-2 p-1 bg-white/5 backdrop-blur-md rounded-2xl md:rounded-full border border-white/10 z-50 w-[95%] md:w-auto">
            <Link
                href="/scalex"
                className="flex-1 md:flex-none px-4 md:px-5 py-3 rounded-full bg-transparent hover:bg-white/5 text-[9px] md:text-[10px] tracking-widest uppercase transition-colors shimmer-text text-center whitespace-nowrap"
            >
                Free ScaleX AI Score
            </Link>
            <button
                onClick={() => openQuiz("sticky-qualify")}
                className="w-full md:w-auto order-first md:order-none px-6 py-3 rounded-full bg-white text-black font-bold text-[10px] tracking-widest uppercase hover:scale-105 transition-transform text-center whitespace-nowrap cursor-pointer"
            >
                Book Strategy Call
            </button>
        </div>
    );
}
