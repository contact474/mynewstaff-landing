"use client";

import { useQuiz } from "./QuizModal";

export const HomeCTA = () => {
  const { openQuiz } = useQuiz();

  return (
    <>
      {/* Mobile button */}
      <button
        type="button"
        onClick={() => openQuiz("home-cta")}
        id="mobile-strategy-btn"
        className="md:hidden block w-[90%] max-w-sm mx-auto mb-8 px-8 py-5 rounded-full border border-white text-white font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
      >
        Book Your Strategy Call
      </button>

      {/* Desktop button */}
      <button
        type="button"
        onClick={() => openQuiz("home-cta")}
        className="inline-block px-12 py-5 rounded-full bg-white text-black font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform"
      >
        See If You Qualify
      </button>
    </>
  );
};
