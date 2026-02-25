"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function PartnersSpanish() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 border-t border-white/5 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center">
          <button
            onClick={() => setOpen(!open)}
            className="group inline-flex items-center gap-3 cursor-pointer"
          >
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
              Versión en Español
            </span>
            <svg
              className={`w-4 h-4 text-zinc-600 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </Reveal>

        {open && (
          <Reveal className="mt-12">
            <div className="border border-white/10 p-8 md:p-12">
              {/* Hero */}
              <div className="text-center mb-12">
                <h3 className="font-wide text-2xl md:text-4xl uppercase text-white mb-4">
                  PUBLICA CONTENIDO.
                  <br />
                  <span className="shimmer-text">GANA CRÉDITOS.</span>
                </h3>
                <p className="text-sm text-zinc-400 font-sans max-w-lg mx-auto leading-relaxed">
                  Promociona MyNewStaff.ai y recibe créditos que puedes canjear
                  por landing pages, videos explicativos, press kits, contenido
                  con IA y activos de crecimiento.
                </p>
              </div>

              {/* How it works */}
              <div className="mb-10">
                <h4 className="font-wide text-lg uppercase text-white mb-4">
                  Cómo funciona
                </h4>
                <ol className="space-y-2">
                  {[
                    "Cumples un paquete de publicaciones (stories o reels).",
                    "Ganas créditos: $500 / $1,500 / $3,500+.",
                    "Eliges un bundle de ejemplo o lo personalizamos dentro del mismo valor.",
                    "La entrega inicia después del intake y de recibir tus assets.",
                  ].map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-xs text-zinc-400 font-sans leading-relaxed"
                    >
                      <span className="text-zinc-600 font-wide text-sm">
                        {i + 1}.
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <hr className="hr-fade mb-10" />

              {/* Tier 1 */}
              <div className="mb-10">
                <h4 className="font-wide text-lg uppercase text-white mb-1">
                  Nivel 1 — $500 en créditos
                </h4>
                <p className="text-xs text-zinc-500 font-sans mb-4">
                  Trueque típico: 4 Stories
                </p>
                <p className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans mb-2">
                  Requisitos
                </p>
                <ul className="space-y-1 mb-4">
                  {[
                    "4 Stories en 48–72 horas",
                    "Etiquetar: @ga.god y @mynewstaff.ai",
                    "Sticker de link con URL de tracking",
                    'Guardar en Highlight por 7 días ("Tools" o "Business")',
                  ].map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-zinc-400 font-sans"
                    >
                      <span className="text-zinc-600 shrink-0">—</span>
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans mb-2">
                  Elige 1 bundle
                </p>
                <ul className="space-y-1 mb-2">
                  {[
                    "Press Kit Lite (PDF 1 página)",
                    "Content Pack Starter (12 ganchos + captions + plan 2 semanas)",
                    "AI Visuals Pack (10 visuales para posts y stories)",
                  ].map((b, i) => (
                    <li
                      key={i}
                      className="text-xs text-zinc-400 font-sans"
                    >
                      {i + 1}) {b}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-zinc-600 font-sans">
                  Tiempo de entrega: 72 horas
                </p>
              </div>

              <hr className="hr-fade mb-10" />

              {/* Tier 2 */}
              <div className="mb-10">
                <h4 className="font-wide text-lg uppercase text-white mb-1">
                  Nivel 2 — $1,500 en créditos
                </h4>
                <p className="text-xs text-zinc-500 font-sans mb-4">
                  Trueque típico: 1 Reel + 3 Stories
                </p>
                <p className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans mb-2">
                  Requisitos
                </p>
                <ul className="space-y-1 mb-4">
                  {[
                    "1 Reel (15–30 seg)",
                    "3 Stories de soporte",
                    "Etiquetar + link sticker",
                    "Fijar el reel por 7 días",
                    "Repost orgánico por 30 días",
                  ].map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-zinc-400 font-sans"
                    >
                      <span className="text-zinc-600 shrink-0">—</span>
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans mb-2">
                  Elige 1 bundle
                </p>
                <ul className="space-y-1 mb-2">
                  {[
                    "Landing Page Kit",
                    "Video Explicativo (slides, 60–90 seg)",
                    "Press Kit Pro (PDF 5–7 páginas)",
                  ].map((b, i) => (
                    <li
                      key={i}
                      className="text-xs text-zinc-400 font-sans"
                    >
                      {i + 1}) {b}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-zinc-600 font-sans">
                  Tiempo de entrega: 5 días hábiles
                </p>
              </div>

              <hr className="hr-fade mb-10" />

              {/* Tier 3 */}
              <div className="mb-10">
                <h4 className="font-wide text-lg uppercase text-white mb-1">
                  Nivel 3 — $3,500 en créditos
                </h4>
                <p className="text-xs text-zinc-500 font-sans mb-4">
                  Trueque típico: 3 Reels + 6 Stories (10–14 días)
                </p>
                <p className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans mb-2">
                  Requisitos
                </p>
                <ul className="space-y-1 mb-4">
                  {[
                    "3 Reels en 10–14 días",
                    "6 Stories total",
                    "Etiquetar + link sticker",
                    "Fijar el mejor reel por 14 días",
                    "Repost orgánico por 30 días",
                  ].map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-zinc-400 font-sans"
                    >
                      <span className="text-zinc-600 shrink-0">—</span>
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] tracking-[0.2em] text-zinc-600 uppercase font-sans mb-2">
                  Elige 1 bundle
                </p>
                <ul className="space-y-1 mb-2">
                  {[
                    "Visibility Stack",
                    "One Month Content Machine",
                    "Authority Builder",
                  ].map((b, i) => (
                    <li
                      key={i}
                      className="text-xs text-zinc-400 font-sans"
                    >
                      {i + 1}) {b}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-zinc-600 font-sans">
                  Tiempo de entrega: 7–10 días hábiles
                </p>
              </div>

              <hr className="hr-fade mb-10" />

              {/* Bigger plays */}
              <div className="mb-10">
                <h4 className="font-wide text-lg uppercase text-white mb-4">
                  Opciones Grandes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-white/5">
                    <h5 className="font-wide text-sm uppercase text-white mb-2">
                      Business-in-a-Box — $7,500
                    </h5>
                    <ul className="space-y-1">
                      {[
                        "Vendes bajo tu marca",
                        "Nosotros entregamos",
                        "30% comisión en todas las ventas (sobre el efectivo cobrado)",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="text-xs text-zinc-400 font-sans"
                        >
                          — {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 border border-white/5">
                    <h5 className="font-wide text-sm uppercase text-white mb-2">
                      Blitz 90 Días — $71,900
                    </h5>
                    <p className="text-xs text-zinc-400 font-sans">
                      Construimos, lanzamos y escalamos para un salto 5x en
                      visibilidad y pipeline.
                    </p>
                  </div>
                </div>
              </div>

              {/* Add-on */}
              <div>
                <h4 className="font-wide text-sm uppercase text-white mb-2">
                  Add-on
                </h4>
                <p className="text-xs text-zinc-400 font-sans">
                  <strong className="text-zinc-300">
                    Derechos de uso pagado (Ads):
                  </strong>{" "}
                  +$1,000 (o negociado)
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
