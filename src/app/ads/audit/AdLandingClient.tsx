"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * Client wrapper for ad landing page:
 * 1. Meta Pixel tracking
 * 2. Sticky mobile CTA
 * 3. UTM parameter persistence
 * 4. No navigation — zero exit points
 */
export function AdLandingClient({ children }: { children: React.ReactNode }) {
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        // Show sticky CTA after scrolling past hero
        const handleScroll = () => {
            setShowSticky(window.scrollY > window.innerHeight * 0.6);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Persist UTM params in sessionStorage for form submission
        const params = new URLSearchParams(window.location.search);
        const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
        utmKeys.forEach(key => {
            const val = params.get(key);
            if (val) sessionStorage.setItem(key, val);
        });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Meta Pixel — fires on load, Lead event on form submit handled by AuditForm */}
            <Script id="meta-pixel" strategy="afterInteractive">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || "PIXEL_ID_HERE"}');
                    fbq('track', 'PageView');
                    fbq('track', 'ViewContent', {content_name: 'Ad Landing - Audit'});
                `}
            </Script>

            {/* Google Ads conversion tracking */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-XXXXXXXXX"}`}
                strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-XXXXXXXXX"}');
                `}
            </Script>

            {children}

            {/* Sticky mobile CTA — appears after scrolling past hero */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
                    showSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
            >
                <div className="bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-3 safe-bottom">
                    <a
                        href="#get-audit"
                        className="block w-full py-3.5 bg-white text-black font-bold text-[11px] tracking-[0.2em] uppercase font-sans text-center active:bg-white/90"
                    >
                        Get Your Free Audit
                    </a>
                </div>
            </div>

            <style jsx global>{`
                .safe-bottom {
                    padding-bottom: max(12px, env(safe-area-inset-bottom));
                }
            `}</style>
        </>
    );
}
