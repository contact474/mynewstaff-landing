"use client";

import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 text-white mix-blend-difference uppercase tracking-[0.2em] text-[10px] md:text-xs font-sans">
            <div className="hidden lg:flex gap-8">
                <Link href="/#problem" className="hover:opacity-50 transition-opacity">The Friction</Link>
                <Link href="/#strategy" className="hover:opacity-50 transition-opacity">The Engine</Link>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 font-bold text-sm md:text-base tracking-[0.2em] font-wide">
                <Link href="/" className="flex items-center gap-3">
                    <img src="/logo-white.png" alt="Logo" className="h-5 w-auto" />
                    <span>mynewstaff.ai</span>
                </Link>
            </div>

            <div className="hidden lg:flex gap-8">
                <Link href="/#results" className="hover:opacity-50 transition-opacity">The Proof</Link>
                <Link href="https://calendly.com/contact-mynewstaff/30min" target="_blank" className="hover:opacity-50 transition-opacity">Contact</Link>
            </div>
        </nav>
    );
}
