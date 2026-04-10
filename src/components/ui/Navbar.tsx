"use client";

import Link from 'next/link';
import { useQuiz } from './QuizModal';
import { useAuth } from '@/lib/supabase/auth-context';

export function Navbar() {
    const { openQuiz } = useQuiz();
    const { user, loading } = useAuth();

    return (
        <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 text-white mix-blend-difference uppercase tracking-[0.2em] text-[10px] md:text-xs font-sans">
            <div className="hidden lg:flex gap-8">
                <Link href="/#strategy" className="hover:opacity-50 transition-opacity">The Engine</Link>
                <Link href="/products" className="hover:opacity-50 transition-opacity">Products</Link>
                <Link href="/#pricing" className="hover:opacity-50 transition-opacity">Pricing</Link>
                <Link href="/results" className="hover:opacity-50 transition-opacity">Results</Link>
                <Link href="/partners" className="hover:opacity-50 transition-opacity shimmer-text">Partners</Link>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 font-bold text-sm md:text-base tracking-[0.2em] font-wide">
                <Link href="/" className="flex items-center gap-3">
                    <img src="/logo-white.png" alt="Logo" className="h-5 w-auto" />
                    <span>mynewstaff.ai</span>
                </Link>
            </div>

            <div className="hidden lg:flex gap-8">
                <Link href="/scalex" className="hover:opacity-50 transition-opacity shimmer-text">ScaleX AI</Link>
                <button onClick={() => openQuiz("navbar-contact")} className="hover:opacity-50 transition-opacity cursor-pointer">
                    Contact
                </button>
                {!loading && (
                    user ? (
                        <Link href="/app/dashboard" className="hover:opacity-50 transition-opacity">Dashboard</Link>
                    ) : (
                        <Link href="/login" className="hover:opacity-50 transition-opacity">Login</Link>
                    )
                )}
            </div>
        </nav>
    );
}
