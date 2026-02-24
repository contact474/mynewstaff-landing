"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFullForm } from "./QuizModal";

const ScaleCTAInner = () => {
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
        openFullForm("scale-cta", pre);
    };

    return (
        <>
            <FullFormModal />
            <div className="text-center mt-12 py-12 md:py-0 relative z-30">
                <div className="inline-block px-8 py-4 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm mb-8">
                    <p className="text-[10px] tracking-[0.4em] uppercase opacity-50">Exclusive Onboarding • Jan 2026</p>
                </div>
                <div className="pb-48 md:pb-0">
                    <button
                        type="button"
                        onClick={handleClick}
                        className="block w-[90%] max-w-sm mx-auto mb-8 px-8 py-5 rounded-full border border-white text-white font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        </>
    );
};

export const ScaleCTA = () => (
    <Suspense>
        <ScaleCTAInner />
    </Suspense>
);
