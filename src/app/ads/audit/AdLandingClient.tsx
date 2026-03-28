"use client";

import { useEffect, useState } from "react";

/**
 * Client wrapper for ad landing page:
 * 1. Sticky mobile CTA
 * 2. UTM parameter persistence
 */
export function AdLandingClient({ children }: { children: React.ReactNode }) {
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowSticky(window.scrollY > window.innerHeight * 0.6);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Persist UTM params
        const params = new URLSearchParams(window.location.search);
        ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(key => {
            const val = params.get(key);
            if (val) sessionStorage.setItem(key, val);
        });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {children}

            {/* Sticky mobile CTA */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
                    showSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
                style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
            >
                <div className="bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
                    <a
                        href="#get-audit"
                        className="block w-full py-3.5 bg-white text-black font-bold text-[11px] tracking-[0.2em] uppercase font-sans text-center active:bg-white/90"
                    >
                        Get Your Free Audit
                    </a>
                </div>
            </div>
        </>
    );
}
