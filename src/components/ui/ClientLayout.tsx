"use client";

import { QuizProvider } from "./QuizModal";
import { GrainOverlay } from "./ScrollEffects";
import { AuthProvider } from "@/lib/supabase/auth-context";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <QuizProvider>
                <GrainOverlay />
                {children}
            </QuizProvider>
        </AuthProvider>
    );
}
