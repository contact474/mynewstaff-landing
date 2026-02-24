"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFullForm } from "./QuizModal";

const VideosCTAInner = () => {
    const searchParams = useSearchParams();
    const { openFullForm, setPrefill, FullFormModal } = useFullForm();

    useEffect(() => {
        const name = searchParams.get("name") || "";
        const email = searchParams.get("email") || "";
        const need = searchParams.get("need") || "";
        if (name || email) {
            setPrefill({ firstName: name, email, need });
        } else {
            try {
                const stored = localStorage.getItem("mns-lead");
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setPrefill({ firstName: parsed.firstName || "", email: parsed.email || "", need: parsed.need || "" });
                }
            } catch { /* */ }
        }
    }, [searchParams, setPrefill]);

    const handleClick = () => {
        const name = searchParams.get("name") || "";
        const email = searchParams.get("email") || "";
        const need = searchParams.get("need") || "";
        let pre = { firstName: name, email, need };
        if (!name && !email) {
            try {
                const stored = localStorage.getItem("mns-lead");
                if (stored) pre = JSON.parse(stored);
            } catch { /* */ }
        }
        openFullForm("videos-cta", pre);
    };

    return (
        <>
            <FullFormModal />
            <div className="text-center mt-8 pb-48 md:pb-0 relative z-30">
                <button
                    type="button"
                    onClick={handleClick}
                    className="inline-block px-12 py-6 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform cursor-pointer"
                >
                    Apply Now
                </button>
            </div>
        </>
    );
};

export const VideosCTA = () => (
    <Suspense>
        <VideosCTAInner />
    </Suspense>
);
