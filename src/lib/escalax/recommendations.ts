/* ─── EscalaX Recommendation Engine ────────────────────────────────── */

import type {
  Recommendation,
  FunnelAnalysis,
  OfferAnalysis,
  PositioningAnalysis,
  AdIntelligence,
} from "./types";

interface RecommendationInput {
  scores: Record<string, number>;
  findings: Record<string, unknown>;
  funnel: FunnelAnalysis;
  offer: OfferAnalysis;
  positioning: PositioningAnalysis;
  adIntel: AdIntelligence;
}

// Each rule is a function that checks conditions and returns a recommendation if applicable
type Rule = (input: RecommendationInput) => Recommendation | null;

const rules: Rule[] = [
  // ── FUNNEL RECOMMENDATIONS ──────────────────────────────────────
  (i) => {
    if (i.funnel.completeness < 40) return {
      id: "funnel-incomplete",
      category: "Funnel",
      priority: "critical",
      title: {
        en: "Your sales funnel is severely incomplete",
        es: "Tu embudo de ventas está severamente incompleto",
      },
      description: {
        en: `Only ${i.funnel.completeness}% of your funnel stages are active. Missing stages: ${i.funnel.gaps.join(", ")}. Every gap is a leak where potential customers fall off.`,
        es: `Solo el ${i.funnel.completeness}% de las etapas de tu embudo están activas. Etapas faltantes: ${i.funnel.gaps.join(", ")}. Cada brecha es una fuga donde los clientes potenciales se pierden.`,
      },
      impact: "30-50% more conversions",
      effort: "hard",
      pillarAffected: "lead_generation",
    };
    return null;
  },
  (i) => {
    if (i.funnel.leadMagnets.length === 0) return {
      id: "no-lead-magnet",
      category: "Funnel",
      priority: "critical",
      title: {
        en: "No lead magnet detected — you're losing 95% of visitors",
        es: "No se detectó lead magnet — estás perdiendo el 95% de visitantes",
      },
      description: {
        en: "Only 2-5% of website visitors are ready to buy. Without a lead magnet (free guide, quiz, consultation), you have no way to capture the other 95% and nurture them over time.",
        es: "Solo el 2-5% de los visitantes están listos para comprar. Sin un lead magnet (guía gratis, quiz, consulta), no tienes forma de capturar el otro 95% y nutrirlos con el tiempo.",
      },
      impact: "5-20x more leads",
      effort: "medium",
      pillarAffected: "lead_generation",
    };
    return null;
  },
  (i) => {
    if (!i.funnel.hasEmailSequence) return {
      id: "no-email-nurture",
      category: "Funnel",
      priority: "high",
      title: {
        en: "No email nurturing system detected",
        es: "No se detectó sistema de nutrición por email",
      },
      description: {
        en: "Email marketing has 36:1 ROI. Without automated email sequences (ActiveCampaign, Klaviyo, HubSpot), leads go cold and you rely entirely on one-touch conversions.",
        es: "El email marketing tiene un ROI de 36:1. Sin secuencias automatizadas de email, los leads se enfrían y dependes completamente de conversiones de un solo contacto.",
      },
      impact: "36:1 ROI potential",
      effort: "medium",
      pillarAffected: "marketing_automation",
    };
    return null;
  },

  // ── OFFER RECOMMENDATIONS ───────────────────────────────────────
  (i) => {
    if (!i.offer.hasPricingPage) return {
      id: "no-pricing-page",
      category: "Offer",
      priority: "high",
      title: {
        en: "No pricing page found — visitors can't self-qualify",
        es: "No se encontró página de precios — los visitantes no pueden auto-calificarse",
      },
      description: {
        en: "44% of B2B buyers say pricing information is the #1 thing they look for on a vendor's website. Without transparent pricing, you create friction and lose serious buyers to competitors who do show prices.",
        es: "El 44% de compradores B2B dicen que la información de precios es lo #1 que buscan. Sin precios transparentes, creas fricción y pierdes compradores serios ante competidores que sí los muestran.",
      },
      impact: "20-40% more qualified leads",
      effort: "easy",
      pillarAffected: "sales_process",
    };
    return null;
  },
  (i) => {
    if (!i.offer.hasMoneyBackGuarantee) return {
      id: "no-guarantee",
      category: "Offer",
      priority: "high",
      title: {
        en: "No money-back guarantee detected — high perceived risk",
        es: "No se detectó garantía de devolución — alto riesgo percibido",
      },
      description: {
        en: "Risk reversal is one of the most powerful conversion tactics. A clear guarantee (30-day money back, satisfaction guaranteed) can increase conversions by 20-30%.",
        es: "La reversión de riesgo es una de las tácticas de conversión más poderosas. Una garantía clara puede aumentar conversiones en 20-30%.",
      },
      impact: "20-30% conversion lift",
      effort: "easy",
      pillarAffected: "website_conversion",
    };
    return null;
  },
  (i) => {
    if (i.offer.urgencyTactics.length === 0 && i.offer.scarcityTactics.length === 0) return {
      id: "no-urgency",
      category: "Offer",
      priority: "medium",
      title: {
        en: "No urgency or scarcity triggers found",
        es: "No se encontraron disparadores de urgencia o escasez",
      },
      description: {
        en: "Without urgency (limited time) or scarcity (limited spots), visitors have no reason to act now. Even ethical urgency (enrollment deadlines, cohort starts) creates 15-25% conversion improvements.",
        es: "Sin urgencia (tiempo limitado) o escasez (plazas limitadas), los visitantes no tienen razón para actuar ahora. Incluso la urgencia ética crea mejoras de conversión del 15-25%.",
      },
      impact: "15-25% faster decisions",
      effort: "easy",
      pillarAffected: "website_conversion",
    };
    return null;
  },
  (i) => {
    if (i.offer.valueStackElements.length < 2) return {
      id: "weak-value-stack",
      category: "Offer",
      priority: "medium",
      title: {
        en: "Your value stack is thin — add bonuses and extras",
        es: "Tu pila de valor es débil — añade bonos y extras",
      },
      description: {
        en: "Top-performing offers stack value: bonuses, templates, community access, priority support. This makes the total perceived value exceed the price, making the decision feel like a no-brainer.",
        es: "Las mejores ofertas apilan valor: bonos, plantillas, comunidad, soporte prioritario. Esto hace que el valor percibido supere el precio, haciendo que la decisión sea obvia.",
      },
      impact: "Higher perceived value",
      effort: "medium",
      pillarAffected: "sales_process",
    };
    return null;
  },

  // ── POSITIONING RECOMMENDATIONS ─────────────────────────────────
  (i) => {
    if (i.positioning.positioningType === "missing" || i.positioning.positioningType === "generic") return {
      id: "weak-positioning",
      category: "Positioning",
      priority: "critical",
      title: {
        en: "Your headline doesn't communicate what you do or for whom",
        es: "Tu titular no comunica qué haces ni para quién",
      },
      description: {
        en: `Your H1 is "${i.positioning.primaryHeadline || "(empty)"}". A visitor has 3 seconds to understand: WHAT you do, WHO it's for, and WHY they should care. Use the formula: "We help [audience] achieve [outcome] without [pain point]".`,
        es: `Tu H1 es "${i.positioning.primaryHeadline || "(vacío)"}". Un visitante tiene 3 segundos para entender: QUÉ haces, PARA QUIÉN y POR QUÉ les importa. Usa la fórmula: "Ayudamos a [audiencia] a lograr [resultado] sin [dolor]".`,
      },
      impact: "2-5x engagement improvement",
      effort: "easy",
      pillarAffected: "digital_presence",
    };
    return null;
  },
  (i) => {
    if (!i.positioning.targetAudience) return {
      id: "no-target-audience",
      category: "Positioning",
      priority: "high",
      title: {
        en: "No clear target audience defined in your copy",
        es: "No hay audiencia objetivo clara definida en tu copy",
      },
      description: {
        en: "When you speak to everyone, you speak to no one. Define your ideal customer clearly in your copy: industry, role, company size, or pain point. This alone can double your conversion rates.",
        es: "Cuando le hablas a todos, no le hablas a nadie. Define tu cliente ideal claramente: industria, rol, tamaño de empresa o dolor. Solo esto puede duplicar tus tasas de conversión.",
      },
      impact: "2x conversion rates",
      effort: "easy",
      pillarAffected: "digital_presence",
    };
    return null;
  },
  (i) => {
    if (i.positioning.differentiators.length === 0) return {
      id: "no-differentiator",
      category: "Positioning",
      priority: "high",
      title: {
        en: "No clear differentiator — you look like everyone else",
        es: "Sin diferenciador claro — te ves igual que todos los demás",
      },
      description: {
        en: "Your website doesn't clearly state what makes you different from competitors. Add at least one strong differentiator: unique methodology, proprietary technology, specific results guarantee, or niche expertise.",
        es: "Tu sitio web no indica claramente qué te diferencia de los competidores. Agrega al menos un diferenciador fuerte: metodología única, tecnología propia, garantía de resultados o experiencia de nicho.",
      },
      impact: "Stand out from competitors",
      effort: "easy",
      pillarAffected: "digital_presence",
    };
    return null;
  },

  // ── AD INTELLIGENCE RECOMMENDATIONS ─────────────────────────────
  (i) => {
    if (i.adIntel.maturityLevel === "none") return {
      id: "no-paid-ads",
      category: "Advertising",
      priority: "high",
      title: {
        en: "Zero paid advertising detected — relying entirely on organic",
        es: "Cero publicidad pagada detectada — dependes completamente del orgánico",
      },
      description: {
        en: "No ad pixels found on your site. This means you have no paid acquisition channel. Even a $10/day Meta or Google campaign with proper tracking can generate 5-10 qualified leads per week.",
        es: "No se encontraron píxeles de anuncios. Esto significa que no tienes canal de adquisición pagado. Incluso una campaña de $10/día con seguimiento correcto puede generar 5-10 leads calificados por semana.",
      },
      impact: "New acquisition channel",
      effort: "medium",
      pillarAffected: "advertising",
    };
    return null;
  },
  (i) => {
    if (i.adIntel.pixelHealth === "partial") return {
      id: "pixel-no-events",
      category: "Advertising",
      priority: "high",
      title: {
        en: "Ad pixels installed but no conversion events tracked",
        es: "Píxeles de anuncios instalados pero sin eventos de conversión",
      },
      description: {
        en: "You have pixels installed but aren't tracking conversions. This means you're paying for ads but can't tell which ones actually generate leads or sales. Add conversion events for: Lead, Purchase, Registration.",
        es: "Tienes píxeles instalados pero no rastrean conversiones. Estás pagando anuncios sin saber cuáles generan leads o ventas. Agrega eventos de conversión: Lead, Purchase, Registration.",
      },
      impact: "Optimize ad spend by 30-50%",
      effort: "easy",
      pillarAffected: "advertising",
    };
    return null;
  },
  (i) => {
    if (!i.adIntel.hasRetargeting && i.adIntel.maturityLevel !== "none") return {
      id: "no-retargeting",
      category: "Advertising",
      priority: "medium",
      title: {
        en: "No retargeting setup — losing warm visitors",
        es: "Sin retargeting configurado — perdiendo visitantes calientes",
      },
      description: {
        en: "Retargeting converts 10x better than cold ads. Without it, visitors who showed interest leave and never come back. Install AdRoll, Criteo, or use platform-native retargeting audiences.",
        es: "El retargeting convierte 10x mejor que los anuncios fríos. Sin él, los visitantes interesados se van y nunca regresan. Instala AdRoll, Criteo o usa audiencias de retargeting nativas.",
      },
      impact: "10x better ROAS",
      effort: "medium",
      pillarAffected: "advertising",
    };
    return null;
  },

  // ── INFRASTRUCTURE RECOMMENDATIONS ──────────────────────────────
  (i) => {
    const f = i.findings;
    if (!f.crm) return {
      id: "no-crm",
      category: "Infrastructure",
      priority: "critical",
      title: {
        en: "No CRM detected — leads have nowhere to go",
        es: "No se detectó CRM — los leads no tienen a dónde ir",
      },
      description: {
        en: "Without a CRM (HubSpot, Salesforce, Pipedrive), every lead that comes in disappears into a black hole. You can't follow up, you can't segment, you can't measure pipeline. HubSpot has a powerful free tier.",
        es: "Sin un CRM (HubSpot, Salesforce, Pipedrive), cada lead desaparece en un agujero negro. No puedes dar seguimiento, segmentar ni medir pipeline. HubSpot tiene un plan gratuito potente.",
      },
      impact: "Stop losing every lead",
      effort: "medium",
      pillarAffected: "sales_process",
    };
    return null;
  },
  (i) => {
    const f = i.findings;
    if (!f.chat) return {
      id: "no-chat",
      category: "Infrastructure",
      priority: "medium",
      title: {
        en: "No live chat or chatbot — missing instant engagement",
        es: "Sin chat en vivo o chatbot — falta engagement instantáneo",
      },
      description: {
        en: "Live chat increases conversions by 20% and response time is the #1 factor in lead conversion. Install a chat widget (Intercom, Tidio, or even WhatsApp button) to capture visitors in the moment.",
        es: "El chat en vivo aumenta conversiones un 20% y el tiempo de respuesta es el factor #1 en conversión de leads. Instala un widget de chat (Intercom, Tidio o incluso WhatsApp).",
      },
      impact: "20% more conversions",
      effort: "easy",
      pillarAffected: "website_conversion",
    };
    return null;
  },
  (i) => {
    const sec = i.findings.securityScore as number;
    if (sec < 4) return {
      id: "weak-security",
      category: "Infrastructure",
      priority: "high",
      title: {
        en: `Only ${sec}/7 security headers present — your site is exposed`,
        es: `Solo ${sec}/7 headers de seguridad presentes — tu sitio está expuesto`,
      },
      description: {
        en: "Missing security headers make your site vulnerable to clickjacking, XSS, and data injection. This also affects Google rankings. Add: Strict-Transport-Security, Content-Security-Policy, X-Frame-Options, Referrer-Policy.",
        es: "Los headers de seguridad faltantes hacen tu sitio vulnerable a clickjacking, XSS e inyección de datos. También afecta el ranking en Google. Agrega: Strict-Transport-Security, Content-Security-Policy, X-Frame-Options.",
      },
      impact: "Security + SEO improvement",
      effort: "easy",
      pillarAffected: "tech_ai_readiness",
    };
    return null;
  },
  (i) => {
    const f = i.findings;
    if (!f.hasSchema || (f.structuredDataTypes as string[])?.length === 0) return {
      id: "no-schema",
      category: "SEO",
      priority: "medium",
      title: {
        en: "No structured data (Schema.org) — invisible to rich results",
        es: "Sin datos estructurados (Schema.org) — invisible para resultados enriquecidos",
      },
      description: {
        en: "Structured data powers rich snippets in Google: star ratings, prices, FAQ, events. Without it, your listings look plain compared to competitors. Add JSON-LD for your business type, products, and FAQs.",
        es: "Los datos estructurados potencian rich snippets en Google: calificaciones, precios, FAQ, eventos. Sin ellos, tus listados se ven simples. Agrega JSON-LD para tu tipo de negocio, productos y FAQs.",
      },
      impact: "Higher CTR in search results",
      effort: "easy",
      pillarAffected: "content_strategy",
    };
    return null;
  },

  // ── CONTENT RECOMMENDATIONS ─────────────────────────────────────
  (i) => {
    const f = i.findings;
    if (!f.hasBlog) return {
      id: "no-blog",
      category: "Content",
      priority: "medium",
      title: {
        en: "No blog or content hub detected",
        es: "No se detectó blog o hub de contenido",
      },
      description: {
        en: "Companies that blog generate 67% more leads than those that don't. A blog drives organic traffic, builds authority, and feeds your social media and email. Start with 1 SEO-optimized post per week.",
        es: "Las empresas que tienen blog generan 67% más leads. Un blog genera tráfico orgánico, construye autoridad y alimenta redes sociales y email. Comienza con 1 post optimizado para SEO por semana.",
      },
      impact: "67% more leads over time",
      effort: "hard",
      pillarAffected: "content_strategy",
    };
    return null;
  },
  (i) => {
    const f = i.findings;
    if (!f.hasVideo) return {
      id: "no-video",
      category: "Content",
      priority: "medium",
      title: {
        en: "No video content detected",
        es: "No se detectó contenido de video",
      },
      description: {
        en: "Video increases conversion rates by 80% and time on page by 2.6x. Add a hero video, product demo, or customer testimonial video. Even a simple Loom-style walkthrough significantly improves engagement.",
        es: "El video aumenta tasas de conversión un 80% y el tiempo en página 2.6x. Agrega un video hero, demo de producto o testimonial. Incluso un walkthrough estilo Loom mejora significativamente el engagement.",
      },
      impact: "80% conversion increase",
      effort: "medium",
      pillarAffected: "content_strategy",
    };
    return null;
  },
  (i) => {
    const social = (i.findings.socialLinks as Array<{ platform: string }>) || [];
    if (social.length < 3) return {
      id: "weak-social",
      category: "Content",
      priority: "low",
      title: {
        en: `Only ${social.length} social profile${social.length !== 1 ? "s" : ""} linked — expand your presence`,
        es: `Solo ${social.length} perfil${social.length !== 1 ? "es" : ""} social${social.length !== 1 ? "es" : ""} enlazado${social.length !== 1 ? "s" : ""} — expande tu presencia`,
      },
      description: {
        en: "Being on multiple platforms builds trust and multiplies touchpoints. At minimum: LinkedIn (B2B), Instagram (brand), and one content platform (YouTube/TikTok/podcast). Each channel compounds over time.",
        es: "Estar en múltiples plataformas construye confianza y multiplica puntos de contacto. Mínimo: LinkedIn (B2B), Instagram (marca) y una plataforma de contenido (YouTube/TikTok/podcast).",
      },
      impact: "More brand touchpoints",
      effort: "medium",
      pillarAffected: "digital_presence",
    };
    return null;
  },

  // ── CONVERSION OPTIMIZATION ─────────────────────────────────────
  (i) => {
    const f = i.findings;
    if ((f.formCount as number) === 0) return {
      id: "no-forms",
      category: "Conversion",
      priority: "critical",
      title: {
        en: "No forms detected — zero lead capture",
        es: "No se detectaron formularios — cero captura de leads",
      },
      description: {
        en: "Your website has no forms. This means visitors literally cannot convert even if they want to. Add at minimum: a contact form, a newsletter signup, and a booking/demo request form.",
        es: "Tu sitio web no tiene formularios. Los visitantes literalmente no pueden convertir aunque quieran. Agrega mínimo: formulario de contacto, suscripción a newsletter y formulario de reserva/demo.",
      },
      impact: "Enable lead capture",
      effort: "easy",
      pillarAffected: "lead_generation",
    };
    return null;
  },
  (i) => {
    const f = i.findings;
    if (!(f.hasTestimonials as boolean) && (f.reviewPlatforms as string[])?.length === 0) return {
      id: "no-social-proof",
      category: "Conversion",
      priority: "high",
      title: {
        en: "No testimonials or reviews — visitors can't trust you",
        es: "Sin testimonios ni reseñas — los visitantes no pueden confiar en ti",
      },
      description: {
        en: "92% of consumers read reviews before purchasing. Without social proof (testimonials, case studies, review widgets), visitors have no evidence you deliver results. Add 3-5 specific testimonials with names and photos.",
        es: "El 92% de los consumidores leen reseñas antes de comprar. Sin prueba social (testimonios, casos de estudio), los visitantes no tienen evidencia de que entregas resultados. Agrega 3-5 testimonios específicos.",
      },
      impact: "Build trust instantly",
      effort: "easy",
      pillarAffected: "website_conversion",
    };
    return null;
  },
];

export function generateRecommendations(input: RecommendationInput): Recommendation[] {
  const recommendations: Recommendation[] = [];
  for (const rule of rules) {
    const rec = rule(input);
    if (rec) recommendations.push(rec);
  }

  // Sort by priority: critical > high > medium > low
  const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recommendations;
}
