/* ─── EscalaX Bilingual i18n System ────────────────────────────────── */

export type Locale = "en" | "es";

// Detect locale from request headers
export function detectLocale(headers: Headers): Locale {
  // 1. Check Vercel/Cloudflare geolocation headers
  const country = headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry") || "";
  const spanishCountries = [
    "MX", "ES", "AR", "CO", "CL", "PE", "VE", "EC", "GT", "CU",
    "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "PR",
  ];
  if (spanishCountries.includes(country.toUpperCase())) return "es";

  // 2. Check Accept-Language header
  const acceptLang = headers.get("accept-language") || "";
  if (/^es/i.test(acceptLang)) return "es";

  // 3. Default to English
  return "en";
}

// All UI strings, organized by section
export const t = {
  // ── App Shell ─────────────────────────────────────────────────
  brandName: { en: "ScaleX", es: "EscalaX" },
  tagline: {
    en: "Free AI Business Diagnostic",
    es: "Diagnóstico de Negocio con IA Gratis",
  },
  poweredBy: {
    en: "Powered by MyNewStaff.ai — We Build Revenue Machines",
    es: "Powered by MyNewStaff.ai — Construimos Máquinas de Ingresos",
  },

  // ── Hero Step ─────────────────────────────────────────────────
  heroTitle: {
    en: "How Strong Is Your Digital Business?",
    es: "¿Qué Tan Fuerte Es Tu Negocio Digital?",
  },
  heroSubtitle: {
    en: "Our AI scans your website, probes your DNS, audits your security, analyzes your funnel, offer, positioning, and ad strategy — then scores you across 10 pillars.",
    es: "Nuestra IA escanea tu sitio web, sondea tu DNS, audita tu seguridad, analiza tu embudo, oferta, posicionamiento y estrategia de anuncios — y te califica en 10 pilares.",
  },
  heroFeatures: {
    en: [
      "Deep HTML parsing (100+ tools detected)",
      "DNS & email infrastructure probing",
      "Funnel & offer analysis",
      "Ad intelligence & spend estimation",
      "Positioning & messaging audit",
      "Personalized improvement roadmap",
    ],
    es: [
      "Parseo profundo de HTML (100+ herramientas detectadas)",
      "Sondeo de DNS e infraestructura de email",
      "Análisis de embudo y oferta",
      "Inteligencia publicitaria y estimación de gasto",
      "Auditoría de posicionamiento y mensajería",
      "Hoja de ruta personalizada de mejoras",
    ],
  },
  heroCTA: {
    en: "Scan My Business Free",
    es: "Escanear Mi Negocio Gratis",
  },

  // ── Input Step ────────────────────────────────────────────────
  inputCompanyLabel: { en: "Company Name", es: "Nombre de Empresa" },
  inputUrlLabel: { en: "Website URL", es: "URL del Sitio Web" },
  inputUrlPlaceholder: { en: "www.yourbusiness.com", es: "www.tunegocio.com" },
  inputCTA: { en: "Analyze Now", es: "Analizar Ahora" },

  // ── Analyzing Step ────────────────────────────────────────────
  analyzingSteps: {
    en: [
      "Fetching website HTML...",
      "Parsing 100+ tool signatures...",
      "Probing DNS records...",
      "Analyzing email infrastructure...",
      "Auditing security headers...",
      "Mapping funnel stages...",
      "Analyzing offer & pricing...",
      "Evaluating positioning...",
      "Detecting ad pixels...",
      "Estimating ad spend...",
      "Crawling key pages...",
      "Generating recommendations...",
    ],
    es: [
      "Obteniendo HTML del sitio...",
      "Analizando 100+ firmas de herramientas...",
      "Sondeando registros DNS...",
      "Analizando infraestructura de email...",
      "Auditando headers de seguridad...",
      "Mapeando etapas del embudo...",
      "Analizando oferta y precios...",
      "Evaluando posicionamiento...",
      "Detectando píxeles de anuncios...",
      "Estimando gasto en anuncios...",
      "Rastreando páginas clave...",
      "Generando recomendaciones...",
    ],
  },

  // ── Discovery Step ────────────────────────────────────────────
  discoveryTitle: { en: "What We Found", es: "Lo Que Encontramos" },
  discoverySignals: { en: "signals detected", es: "señales detectadas" },
  discoveryPages: { en: "pages crawled", es: "páginas rastreadas" },

  // ── Questions ─────────────────────────────────────────────────
  q1Label: { en: "Monthly leads", es: "Leads mensuales" },
  q2Label: { en: "CRM usage", es: "Uso de CRM" },
  q3Label: { en: "Marketing budget", es: "Presupuesto de marketing" },
  q4Label: { en: "Content frequency", es: "Frecuencia de contenido" },
  q5Label: { en: "Growth challenge", es: "Desafío de crecimiento" },
  q1Options: {
    en: ["0-10", "11-50", "51-200", "200+"],
    es: ["0-10", "11-50", "51-200", "200+"],
  },
  q2Options: {
    en: ["None", "Spreadsheets", "Basic CRM", "Advanced CRM"],
    es: ["Ninguno", "Hojas de cálculo", "CRM Básico", "CRM Avanzado"],
  },
  q3Options: {
    en: ["Under $500/mo", "$500-$2K/mo", "$2K-$10K/mo", "$10K+/mo"],
    es: ["Menos de $500/mes", "$500-$2K/mes", "$2K-$10K/mes", "$10K+/mes"],
  },
  q4Options: {
    en: ["Rarely", "Monthly", "Weekly", "Daily"],
    es: ["Raramente", "Mensual", "Semanal", "Diario"],
  },
  q5Options: {
    en: ["Getting visible", "Converting visitors", "Closing sales", "Scaling operations"],
    es: ["Ser visible", "Convertir visitantes", "Cerrar ventas", "Escalar operaciones"],
  },

  // ── Email Step ────────────────────────────────────────────────
  emailTitle: {
    en: "Where should we send your full report?",
    es: "¿A dónde enviamos tu reporte completo?",
  },
  emailSkip: { en: "Skip — show results now", es: "Omitir — ver resultados ahora" },

  // ── Results ───────────────────────────────────────────────────
  resultsTitle: { en: "Your ScaleX Score", es: "Tu Puntaje EscalaX" },
  overallScore: { en: "Overall Score", es: "Puntaje General" },

  // ── Pillar Names ──────────────────────────────────────────────
  pillars: {
    digital_presence: { en: "Digital Presence", es: "Presencia Digital" },
    website_conversion: { en: "Website Conversion", es: "Conversión Web" },
    content_strategy: { en: "Content Strategy", es: "Estrategia de Contenido" },
    lead_generation: { en: "Lead Generation", es: "Generación de Leads" },
    marketing_automation: { en: "Marketing Automation", es: "Automatización de Marketing" },
    advertising: { en: "Advertising", es: "Publicidad" },
    sales_process: { en: "Sales Process", es: "Proceso de Ventas" },
    customer_journey: { en: "Customer Journey", es: "Recorrido del Cliente" },
    tech_ai_readiness: { en: "Tech & AI Readiness", es: "Preparación Tech & IA" },
    revenue_operations: { en: "Revenue Operations", es: "Operaciones de Ingresos" },
  } as Record<string, { en: string; es: string }>,

  // ── Zones ─────────────────────────────────────────────────────
  zones: {
    danger: { en: "Danger Zone", es: "Zona Roja" },
    risk: { en: "Risk Zone", es: "Zona de Riesgo" },
    growth: { en: "Growth Zone", es: "Zona de Crecimiento" },
    domination: { en: "Domination Zone", es: "Zona de Dominio" },
  },

  // ── New Section Headers ───────────────────────────────────────
  funnelTitle: { en: "Funnel Analysis", es: "Análisis de Embudo" },
  funnelCompleteness: { en: "Funnel Completeness", es: "Completitud del Embudo" },
  funnelStages: { en: "Funnel Stages", es: "Etapas del Embudo" },
  funnelGaps: { en: "Funnel Gaps", es: "Brechas del Embudo" },
  funnelLeadMagnets: { en: "Lead Magnets Detected", es: "Lead Magnets Detectados" },

  offerTitle: { en: "Offer & Value Stack", es: "Oferta y Pila de Valor" },
  offerPricing: { en: "Pricing Tiers", es: "Niveles de Precios" },
  offerGuarantee: { en: "Guarantee", es: "Garantía" },
  offerUrgency: { en: "Urgency Tactics", es: "Tácticas de Urgencia" },
  offerScarcity: { en: "Scarcity Tactics", es: "Tácticas de Escasez" },
  offerValueStack: { en: "Value Stack Elements", es: "Elementos de Pila de Valor" },
  offerClarity: { en: "Offer Clarity", es: "Claridad de Oferta" },
  offerStrength: { en: "Offer Strength", es: "Fuerza de Oferta" },

  positioningTitle: { en: "Positioning & Messaging", es: "Posicionamiento y Mensajería" },
  positioningHeadline: { en: "Primary Headline", es: "Titular Principal" },
  positioningAudience: { en: "Target Audience", es: "Audiencia Objetivo" },
  positioningDifferentiators: { en: "Differentiators", es: "Diferenciadores" },
  positioningType: { en: "Positioning Type", es: "Tipo de Posicionamiento" },
  positioningClarity: { en: "Clarity Score", es: "Puntaje de Claridad" },

  adIntelTitle: { en: "Advertising Intelligence", es: "Inteligencia Publicitaria" },
  adIntelMaturity: { en: "Ad Maturity Level", es: "Nivel de Madurez Publicitaria" },
  adIntelSpend: { en: "Estimated Monthly Spend", es: "Gasto Mensual Estimado" },
  adIntelPlatforms: { en: "Ad Platforms", es: "Plataformas de Anuncios" },
  adIntelPixelHealth: { en: "Pixel Health", es: "Salud de Píxeles" },

  recommendationsTitle: { en: "Your Improvement Roadmap", es: "Tu Hoja de Ruta de Mejoras" },
  recommendationsPriority: {
    critical: { en: "Critical", es: "Crítico" },
    high: { en: "High Priority", es: "Alta Prioridad" },
    medium: { en: "Medium Priority", es: "Prioridad Media" },
    low: { en: "Low Priority", es: "Baja Prioridad" },
  },
  recommendationsImpact: { en: "Expected Impact", es: "Impacto Esperado" },
  recommendationsEffort: {
    easy: { en: "Quick Win", es: "Ganancia Rápida" },
    medium: { en: "Medium Effort", es: "Esfuerzo Medio" },
    hard: { en: "Strategic Investment", es: "Inversión Estratégica" },
  },

  // ── Results sections ──────────────────────────────────────────
  topIssues: { en: "Top Issues", es: "Problemas Principales" },
  trackingInfra: { en: "Tracking Infrastructure", es: "Infraestructura de Seguimiento" },
  securityAudit: { en: "Security Header Audit", es: "Auditoría de Headers de Seguridad" },
  emailInfra: { en: "Email Infrastructure", es: "Infraestructura de Email" },
  digitalStack: { en: "Complete Digital Stack", es: "Stack Digital Completo" },
  contentSeo: { en: "Content & SEO Intelligence", es: "Inteligencia de Contenido y SEO" },
  conversionEvents: { en: "Conversion Events Tracked", es: "Eventos de Conversión Rastreados" },
  businessData: { en: "Business Data Extracted", es: "Datos de Negocio Extraídos" },
  revenueLeak: {
    en: "Estimated Revenue You're Leaving on the Table",
    es: "Ingresos Estimados Que Estás Dejando en la Mesa",
  },

  // ── CTA ───────────────────────────────────────────────────────
  ctaTitle: {
    en: "Want Us to Fix This?",
    es: "¿Quieres Que Lo Arreglemos?",
  },
  ctaDescription: {
    en: "Our AI team builds revenue machines. We found {signals} signals — we know exactly where your gaps are. Let us build a custom action plan to fix your weakest pillars.",
    es: "Nuestro equipo de IA construye máquinas de ingresos. Encontramos {signals} señales — sabemos exactamente dónde están tus brechas. Déjanos construir un plan de acción personalizado.",
  },
  ctaWhatsApp: { en: "Talk to Us on WhatsApp", es: "Habla con Nosotros por WhatsApp" },
  ctaShare: { en: "Share Your Score", es: "Comparte Tu Puntaje" },

  // ── Misc ──────────────────────────────────────────────────────
  detected: { en: "Detected", es: "Detectado" },
  notDetected: { en: "Not Detected", es: "No Detectado" },
  yes: { en: "Yes", es: "Sí" },
  no: { en: "No", es: "No" },
  pagesIndexed: { en: "Pages Indexed", es: "Páginas Indexadas" },
  loadTime: { en: "Load Time", es: "Tiempo de Carga" },
  forms: { en: "Forms", es: "Formularios" },
  thirdPartyScripts: { en: "3rd Party Scripts", es: "Scripts de Terceros" },
};

// Helper to get a translated string
export function tr(key: { en: string; es: string }, locale: Locale): string {
  return key[locale];
}
