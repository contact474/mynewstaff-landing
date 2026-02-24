"use client";

import { QuizProvider } from "./QuizModal";
import { GrainOverlay } from "./ScrollEffects";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <QuizProvider>
            <GrainOverlay />
            {children}
        </QuizProvider>
    );
}
