export type Locale = "en" | "es";

export interface TierData {
  credits: string;
  value: number;
  trade: string;
  spots: number;
  requirements: string[];
  bundles: {
    name: string;
    detail: string;
    useCase: string;
    projection: string;
    deliverables: string[];
  }[];
  delivery: string;
}

export interface PlayData {
  tag: string;
  name: string;
  subtitle: string;
  credits: string;
  value: number;
  trade: string;
  delivery: string;
  description: string;
  highlight: string;
  includes: string[];
  whoItsFor: string;
  projection: string;
  phases?: string[];
}

export interface PartnersTranslations {
  hero: {
    badge: string;
    h1Line1: string;
    h1Line2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaWhatsApp: string;
    limitedSpots: string;
  };
  steps: {
    label: string;
    heading: string;
    headingAccent: string;
    items: { title: string; desc: string }[];
  };
  valueCompare: {
    label: string;
    heading: string;
    headingAccent: string;
    subtitle: string;
    colDeliverable: string;
    colMarketRate: string;
    colPartnerCredits: string;
    rows: { item: string; market: string; here: string }[];
    footer: string;
  };
  proof: {
    label: string;
    headingPrefix: string;
    headingBuild: string;
    headingShip: string;
    subtitle: string;
    stats: { label: string; detail: string }[];
    capabilitiesLabel: string;
    capabilities: { title: string; desc: string }[];
    screenshotsLabel: string;
    screenshots: { label: string }[];
    poweredByLabel: string;
    testimonialLabel: string;
    testimonialQuote: string;
    testimonialAttribution: string;
  };
  tiers: {
    label: string;
    heading: string;
    headingAccent: string;
    spotsRemaining: string;
    creditLevel: string;
    spots: string;
    buildCredits: string;
    bundlesAvailable: string;
    selected: string;
    select: string;
    chooseBundlePrefix: string;
    chooseBundleSuffix: string;
    whatYouGet: string;
    delivery: string;
    value: string;
    whyThisMatters: string;
    projectedImpact: string;
    whatYouPost: string;
    lockThisIn: string;
    spotsLeftPrefix: string;
    spotsLeftSuffix: string;
    selectBundleHint: string;
    selectedLabel: string;
    data: TierData[];
  };
  bigPlays: {
    label: string;
    heading: string;
    headingAccent: string;
    subtitle: string;
    whatsIncluded: string;
    phasesLabel: string;
    delivery: string;
    value: string;
    whoThisIsFor: string;
    projectedImpact: string;
    applyFor: string;
    applicationOnly: string;
    deliverables: string;
    details: string;
    viewDetails: string;
    data: PlayData[];
  };
  addOn: {
    label: string;
    heading: string;
    price: string;
    description: string;
  };
  terms: {
    label: string;
    items: string[];
  };
  cta: {
    heading: string;
    headingAccent: string;
    subtitle: string;
    applyNow: string;
    whatsapp: string;
    dmInstagram: string;
    orEmail: string;
  };
  floatingCta: {
    applyNow: string;
  };
  applyModal: {
    appSent: string;
    appSentSubtitle: string;
    speedUp: string;
    speedUpWithScreenshots: string;
    speedUpWithout: string;
    dmButton: string;
    close: string;
    stepOf: string;
    step0Title: string;
    step0Subtitle: string;
    fullName: string;
    email: string;
    instagramHandle: string;
    step1Title: string;
    step1Subtitle: string;
    followerCount: string;
    nicheIndustry: string;
    avgStoryViews: string;
    avgReelViews: string;
    engagementRate: string;
    step2Title: string;
    step2Subtitle: string;
    step2Optional: string;
    clickUpload: string;
    uploadHint: string;
    whatToScreenshot: string;
    screenshotHints: string[];
    remove: string;
    step3Title: string;
    step3Subtitle: string;
    yourPackage: string;
    youPost: string;
    yourProfile: string;
    name: string;
    instagram: string;
    followers: string;
    niche: string;
    screenshotsAttached: string;
    anythingElse: string;
    anythingElsePlaceholder: string;
    back: string;
    changeSelection: string;
    next: string;
    skip: string;
    sending: string;
    submitApplication: string;
    selectPlaceholder: string;
    niches: string[];
  };
}

const en: PartnersTranslations = {
  hero: {
    badge: "BRAND ACCELERATOR \u2014 10 SPOTS",
    h1Line1: "WE BUILD.",
    h1Line2: "YOU GROW.",
    subtitle: "We\u2019re selecting 10 brands to receive our full growth stack \u2014 landing pages, content systems, lead gen, video, and press kits \u2014 built for you, in exchange for sharing the journey.",
    ctaPrimary: "See What We Build",
    ctaWhatsApp: "Chat on WhatsApp",
    limitedSpots: "Only 10 brands selected per quarter \u2022 Q2 2026",
  },
  steps: {
    label: "How It Works",
    heading: "THE PARTNERSHIP",
    headingAccent: "PROCESS.",
    items: [
      { title: "Apply", desc: "Tell us about your brand. We review every application and select 10 partners per quarter." },
      { title: "Scope", desc: "We match you with a partnership level and scope exactly what we\u2019ll build for your brand." },
      { title: "Build", desc: "Our team builds your growth assets \u2014 landing pages, content, video, press kits \u2014 world-class, on deadline." },
      { title: "Share", desc: "Document the transformation as we build. Stories, reels, behind-the-scenes \u2014 your audience sees the glow-up in real time." },
    ],
  },
  valueCompare: {
    label: "What You\u2019d Pay Elsewhere",
    heading: "MARKET RATE VS.",
    headingAccent: "WHAT WE BUILD FREE.",
    subtitle: "Selected partners receive the same systems we deploy for paying clients. The only investment: share the process with your audience.",
    colDeliverable: "Deliverable",
    colMarketRate: "Market Rate",
    colPartnerCredits: "As a Selected Partner",
    rows: [
      { item: "Landing Page", market: "$3,000 \u2013 $8,000", here: "Built for you" },
      { item: "Press Kit (Pro)", market: "$1,500 \u2013 $4,000", here: "Built for you" },
      { item: "Explainer Video", market: "$2,000 \u2013 $5,000", here: "Built for you" },
      { item: "30-Day Content Pack", market: "$4,000 \u2013 $10,000", here: "Built for you" },
      { item: "Full Visibility Stack", market: "$6,000 \u2013 $15,000", here: "Built for you" },
    ],
    footer: "Zero cash. Zero invoices. We build everything \u2014 you share the journey.",
  },
  proof: {
    label: "Proof of Work",
    headingPrefix: "WE ",
    headingBuild: "BUILD.",
    headingShip: "SHIP.",
    subtitle: "Everything we build for selected partners is battle-tested across real client deployments. This isn\u2019t theory \u2014 it\u2019s live infrastructure.",
    stats: [
      { label: "Revenue Closed", detail: "Across 6 active clients in 2026" },
      { label: "Leads Generated", detail: "Multi-channel scraping from 7 platforms" },
      { label: "Avg ROI Delivered", detail: "Before-vs-after tracked for every client" },
      { label: "Landing Pages Live", detail: "Conversion-optimized, A/B tested funnels" },
    ],
    capabilitiesLabel: "What Powers Your Growth Stack",
    capabilities: [
      { title: "Mission Control", desc: "AI-powered CRM with autonomous agents \u2014 CEO, Content Head, Outreach Head, Dev Head \u2014 running 24/7 on autopilot." },
      { title: "Content Engine", desc: "9-platform trend discovery \u2192 5-dimension scoring \u2192 AI carousel generation \u2192 branded PNG rendering. Automated every 8 hours." },
      { title: "Behavioral Email System", desc: "4-campaign engine: Pure Value \u2192 Social Proof \u2192 Conversion \u2192 Re-engagement. Cold leads never get pitched. Behavioral triggers route leads through the right sequence." },
      { title: "Landing Pages & Funnels", desc: "Next.js 15 + Tailwind v4 + GSAP animations. Dark-mode, conversion-optimized, world-class design. Deployed on Vercel edge." },
      { title: "AI Video Production", desc: "Explainer videos, slide-based presentations, AI voiceover \u2014 all produced in-house with our generation pipeline." },
      { title: "Lead Generation", desc: "High-intent Reddit prospecting, AI cold emails via GHL, multi-channel outreach. Fully autonomous pipeline from discovery to booked call." },
    ],
    screenshotsLabel: "Live Systems \u2014 Real Screenshots",
    screenshots: [
      { label: "Dashboard Overview" },
      { label: "Cold Outreach Engine" },
      { label: "AI Lead Scraper" },
      { label: "Landing Pages & Funnels" },
    ],
    poweredByLabel: "Powered By & Integrated With",
    testimonialLabel: "Built for the Kardashians",
    testimonialQuote: "We built growth systems for the Kardashian-Jenner brand. Here\u2019s what Kris Jenner had to say about working with our founder.",
    testimonialAttribution: "Kris Jenner \u2014 on working with Luka Lah",
  },
  tiers: {
    label: "Partnership Levels",
    heading: "WHAT WE",
    headingAccent: "BUILD.",
    spotsRemaining: "10 brands selected per quarter \u2014 {count} spots remaining",
    creditLevel: "Partnership Level {n}",
    spots: "{n} spots",
    buildCredits: "Build Value",
    bundlesAvailable: "{n} packages available",
    selected: "Selected \u2193",
    select: "Select \u2192",
    chooseBundlePrefix: "Choose Your Package \u2014 ",
    chooseBundleSuffix: " level",
    whatYouGet: "What You Get",
    delivery: "Delivery",
    value: "Value",
    whyThisMatters: "Why This Matters For You",
    projectedImpact: "Projected Impact",
    whatYouPost: "What You Share",
    lockThisIn: "Apply for This Level",
    spotsLeftPrefix: "Only ",
    spotsLeftSuffix: " spots left this quarter",
    selectBundleHint: "Select a package above to see the full breakdown and apply",
    selectedLabel: "Selected",
    data: [
      {
        credits: "$500",
        value: 500,
        trade: "4 Stories (or equivalent)",
        spots: 4,
        requirements: [
          "4 Stories within 48\u201372 hours",
          "Tag: @ga.god and @mynewstaff.ai",
          "Link sticker to tracking URL we provide",
          "Save to Highlight for 7 days (\"Tools\" or \"Business\")",
        ],
        bundles: [
          {
            name: "Press Kit Lite",
            detail: "1-page PDF: bio, audience, positioning, collab contact",
            useCase: "Perfect for creators who need a professional media kit to land more brand deals and sponsorships.",
            projection: "Creators with professional press kits see up to 3x more inbound brand inquiries.",
            deliverables: ["Professional 1-page PDF media kit", "Audience demographics breakdown", "Brand positioning statement", "Collaboration contact section"],
          },
          {
            name: "Content Pack Starter",
            detail: "12 hooks + captions + 2-week posting plan",
            useCase: "For creators stuck in a content rut who need a system to post consistently and grow engagement.",
            projection: "Consistent posting with optimized hooks can increase reach 40-60% within the first month.",
            deliverables: ["12 scroll-stopping hooks", "12 engagement-optimized captions", "2-week content calendar", "Best posting times analysis"],
          },
          {
            name: "AI Visuals Pack",
            detail: "10 branded visuals for posts + story backgrounds",
            useCase: "Elevate your feed aesthetic instantly. Professional branded visuals that make your profile look premium.",
            projection: "Consistent visual branding increases profile visit-to-follow rate by 25-35%.",
            deliverables: ["10 branded post visuals", "Story background templates", "Color palette + typography guide", "Source files for future use"],
          },
        ],
        delivery: "72 hours",
      },
      {
        credits: "$1,500",
        value: 1500,
        trade: "1 Reel + 3 Stories",
        spots: 3,
        requirements: [
          "1 Reel (15\u201330 sec)",
          "3 Stories supporting the reel within 72 hours",
          "Tag + link sticker",
          "Pin reel for 7 days",
          "MyNewStaff can repost organically for 30 days",
        ],
        bundles: [
          {
            name: "Landing Page Kit",
            detail: "1-page landing page in MyNewStaff.ai style + copy + CTA sections",
            useCase: "Turn your audience into leads and customers with a conversion-optimized page that captures emails and drives sales.",
            projection: "Custom landing pages convert at 15-25% vs 3% on standard link-in-bio tools.",
            deliverables: ["Custom 1-page landing page", "Conversion-optimized copy", "CTA sections + email capture", "Mobile-responsive design", "Hosted on your domain"],
          },
          {
            name: "Explainer Video Kit",
            detail: "60\u201390 sec explainer video \u2014 script + AI voiceover",
            useCase: "A professional explainer video you can use in your bio, stories, or pitches to instantly communicate your value proposition.",
            projection: "Video explainers increase conversion rates by 20% and reduce time-to-close on brand deals.",
            deliverables: ["60\u201390 second explainer video", "Professional script writing", "AI voiceover production", "Slide-based visual design", "Multiple format exports (16:9, 9:16, 1:1)"],
          },
          {
            name: "Press Kit Pro",
            detail: "5\u20137 page PDF deck: story, offer, audience, metrics, examples",
            useCase: "The full professional package for creators serious about landing $5k-$50k brand partnerships.",
            projection: "Pro-level press kits are the #1 factor brands cite when choosing between similar creators.",
            deliverables: ["5\u20137 page designed PDF deck", "Your story + brand narrative", "Audience demographics + metrics", "Past collaboration examples", "Rate card + partnership tiers"],
          },
        ],
        delivery: "5 business days",
      },
      {
        credits: "$3,500",
        value: 3500,
        trade: "3 Reels + 6 Stories (over 10\u201314 days)",
        spots: 2,
        requirements: [
          "3 Reels over 10\u201314 days (min 72h between)",
          "6 Stories total (2 per reel)",
          "Tag + link sticker",
          "Pin best-performing reel for 14 days",
          "MyNewStaff can repost organically for 30 days",
        ],
        bundles: [
          {
            name: "Visibility Stack",
            detail: "Landing page (1-page) + Press Kit Pro",
            useCase: "The complete online presence upgrade. Your own conversion page plus a professional press kit \u2014 everything you need to close bigger deals.",
            projection: "Creators with both a landing page and press kit close brand deals 4x faster.",
            deliverables: ["Custom landing page (fully hosted)", "5\u20137 page press kit PDF", "Conversion-optimized copy", "Email capture integration", "Mobile-responsive design", "Rate card + partnership tiers"],
          },
          {
            name: "One Month Content Machine",
            detail: "30 carousels + 10 AI visuals + 12 hooks & captions",
            useCase: "Never run out of content again. One full month of daily branded carousels, visual assets, and engagement-driving copy.",
            projection: "Daily posting with carousel content generates 3-5x more saves and shares than single-image posts.",
            deliverables: ["30 branded carousel posts", "10 AI-generated visual assets", "12 scroll-stopping hooks", "12 engagement-optimized captions", "Monthly content calendar", "Performance tracking template"],
          },
          {
            name: "Authority Builder",
            detail: "Press Kit Pro + explainer video + 10 AI visuals",
            useCase: "Position yourself as the go-to expert in your niche. Pro media kit, professional video, and branded visuals that scream credibility.",
            projection: "Full authority positioning packages increase average deal size by 60-80%.",
            deliverables: ["5\u20137 page press kit PDF", "60\u201390 sec explainer video", "10 branded visual assets", "Professional script + voiceover", "Brand positioning strategy", "Source files for all assets"],
          },
        ],
        delivery: "7\u201310 business days",
      },
    ],
  },
  bigPlays: {
    label: "For Operators",
    heading: "BIGGER",
    headingAccent: "PLAYS.",
    subtitle: "For brands ready for a complete transformation. Application and strategy call required.",
    whatsIncluded: "What's Included",
    phasesLabel: "Phases",
    delivery: "Delivery",
    value: "Value",
    whoThisIsFor: "Who This Is For",
    projectedImpact: "Projected Impact",
    applyFor: "Apply for",
    applicationOnly: "By application only \u2014 schedule a strategy call",
    deliverables: "deliverables",
    details: "Details \u2193",
    viewDetails: "View Details \u2192",
    data: [
      {
        tag: "Option A",
        name: "BUSINESS-IN-A-BOX",
        subtitle: "Franchise Model",
        credits: "$7,500",
        value: 7500,
        trade: "Custom scope (alignment call required)",
        delivery: "7\u201310 business days (after alignment call)",
        description: "Turn your audience into a revenue engine by selling MyNewStaff.ai services under your brand. We fulfill delivery behind the scenes.",
        highlight: "30% commission on all sales (cash collected)",
        includes: [
          "White-label offer kit (positioning + package structure)",
          "Sales assets (deck + scripts + DM flow)",
          "Delivery playbook + fulfillment pipeline",
          "\"What to sell\" menu: Mission Control, lead gen, content systems",
        ],
        whoItsFor: "Operators, agency owners, and high-influence creators who want to resell premium AI marketing services without building the backend.",
        projection: "Partners reselling services at $3K\u2013$10K/client earn $900\u2013$3,000 per deal. 3 deals covers the full barter value.",
      },
      {
        tag: "Option B",
        name: "90-DAY BLITZ",
        subtitle: "Full-Scale Build",
        credits: "$71,900",
        value: 71900,
        trade: "Custom scope (strategy session required)",
        delivery: "90 days (weekly milestones)",
        description: "We build, launch, and scale your business with a full system. Content, outreach, conversion assets, and growth ops.",
        highlight: "5x step-change in visibility + pipeline",
        phases: ["Build the machine", "Launch the offer", "Scale distribution", "Drive 5x growth"],
        includes: [
          "Brand + offer architecture",
          "Landing pages + conversion assets",
          "Press / media kit",
          "Content production system (monthly)",
          "Lead gen + outreach system",
          "Mission Control buildout (CRM + automation)",
          "Weekly optimization cadence for 90 days",
        ],
        whoItsFor: "Ambitious founders and established creators ready for a full-scale digital transformation \u2014 brand, content, outreach, and systems all built in 90 days.",
        projection: "Clients in the 90-Day Blitz see an average 5x increase in qualified pipeline and 3x increase in content output within the first 60 days.",
      },
    ],
  },
  addOn: {
    label: "Optional Add-on",
    heading: "PAID USAGE RIGHTS",
    price: "+$1,000 (or negotiated)",
    description: "Allows MyNewStaff to run your influencer content as paid ads for 30 days. Whitelisting optional.",
  },
  terms: {
    label: "Terms",
    items: [
      "Timelines start after intake is complete and assets are provided.",
      "1 revision round included per deliverable.",
      "Content sharing milestones are agreed upon during onboarding.",
    ],
  },
  cta: {
    heading: "READY TO",
    headingAccent: "GET SELECTED?",
    subtitle: "Apply now to be considered for Q2 2026 \u2014 or reach out directly via WhatsApp, Instagram, or email.",
    applyNow: "Apply Now",
    whatsapp: "WhatsApp",
    dmInstagram: "DM on Instagram",
    orEmail: "or email",
  },
  floatingCta: {
    applyNow: "Apply Now",
  },
  applyModal: {
    appSent: "APPLICATION SENT",
    appSentSubtitle: "We\u2019ll review your brand within 48 hours and reach out via email to confirm your partnership level.",
    speedUp: "Speed Up Your Approval",
    speedUpWithScreenshots: "You uploaded {n} screenshot{s} \u2014 great! DM us on Instagram to confirm and we'll fast-track your review.",
    speedUpWithout: "DM us your latest Instagram Insights screenshots (followers, reach, engagement). This helps us fast-track your application.",
    dmButton: "DM @mynewstaff.ai",
    close: "Close",
    stepOf: "Step {current} of {total}",
    step0Title: "TELL US ABOUT YOU",
    step0Subtitle: "Basic details so we can reach you.",
    fullName: "Full Name",
    email: "Email",
    instagramHandle: "Instagram Handle",
    step1Title: "YOUR AUDIENCE",
    step1Subtitle: "Helps us match you to the right partnership level.",
    followerCount: "Follower Count",
    nicheIndustry: "Niche / Industry",
    avgStoryViews: "Avg Story Views",
    avgReelViews: "Avg Reel Views",
    engagementRate: "Engagement Rate (if known)",
    step2Title: "SHOW US YOUR BRAND",
    step2Subtitle: "Upload Instagram Insights screenshots so we can scope what to build.",
    step2Optional: "Optional \u2014 you can skip this step",
    clickUpload: "Click to upload screenshots",
    uploadHint: "PNG, JPG up to 5 files \u2014 Insights overview, reach, audience demographics",
    whatToScreenshot: "What to screenshot",
    screenshotHints: [
      "Instagram Insights \u2192 Overview (accounts reached, engaged)",
      "Audience demographics (top locations, age range)",
      "Content \u2192 Reels or Stories performance",
    ],
    remove: "Remove",
    step3Title: "CONFIRM YOUR APPLICATION",
    step3Subtitle: "Review everything before submitting.",
    yourPackage: "Your Partnership",
    youPost: "You Share",
    yourProfile: "Your Profile",
    name: "Name",
    instagram: "Instagram",
    followers: "Followers",
    niche: "Niche",
    screenshotsAttached: "{n} screenshot{s} attached",
    anythingElse: "Anything else? (optional)",
    anythingElsePlaceholder: "Links to previous brand collabs, your vision for the partnership, etc.",
    back: "\u2190 Back",
    changeSelection: "\u2190 Change Selection",
    next: "Next \u2192",
    skip: "Skip \u2192",
    sending: "Sending...",
    submitApplication: "Submit Application",
    selectPlaceholder: "Select...",
    niches: [
      "Fitness & Health",
      "Beauty & Fashion",
      "Tech & Gadgets",
      "Business & Finance",
      "Travel & Lifestyle",
      "Food & Cooking",
      "Education & Learning",
      "Entertainment & Comedy",
      "Real Estate",
      "Crypto & Web3",
      "Other",
    ],
  },
};

const es: PartnersTranslations = {
  hero: {
    badge: "ACELERADOR DE MARCAS \u2014 10 CUPOS",
    h1Line1: "NOSOTROS CONSTRUIMOS.",
    h1Line2: "T\u00da CRECES.",
    subtitle: "Estamos seleccionando 10 marcas para recibir nuestro stack de crecimiento completo \u2014 landing pages, sistemas de contenido, lead gen, video y press kits \u2014 construido para ti, a cambio de compartir el proceso.",
    ctaPrimary: "Mira Lo Que Construimos",
    ctaWhatsApp: "Escr\u00edbenos por WhatsApp",
    limitedSpots: "Solo 10 marcas seleccionadas por trimestre \u2022 Q2 2026",
  },
  steps: {
    label: "C\u00f3mo Funciona",
    heading: "EL PROCESO DE",
    headingAccent: "PARTNERSHIP.",
    items: [
      { title: "Aplica", desc: "Cu\u00e9ntanos sobre tu marca. Revisamos cada aplicaci\u00f3n y seleccionamos 10 partners por trimestre." },
      { title: "Alcance", desc: "Te asignamos un nivel de partnership y definimos exactamente qu\u00e9 construiremos para tu marca." },
      { title: "Construimos", desc: "Nuestro equipo construye tus activos de crecimiento \u2014 landing pages, contenido, video, press kits \u2014 clase mundial, en tiempo." },
      { title: "Comparte", desc: "Documenta la transformaci\u00f3n mientras construimos. Stories, reels, behind-the-scenes \u2014 tu audiencia ve el glow-up en tiempo real." },
    ],
  },
  valueCompare: {
    label: "Lo Que Pagar\u00edas en Otro Lado",
    heading: "PRECIO DE MERCADO VS.",
    headingAccent: "LO QUE CONSTRUIMOS GRATIS.",
    subtitle: "Los partners seleccionados reciben los mismos sistemas que desplegamos para clientes de pago. La \u00fanica inversi\u00f3n: compartir el proceso con tu audiencia.",
    colDeliverable: "Entregable",
    colMarketRate: "Precio de Mercado",
    colPartnerCredits: "Como Partner Seleccionado",
    rows: [
      { item: "Landing Page", market: "$3,000 \u2013 $8,000", here: "Construido para ti" },
      { item: "Press Kit (Pro)", market: "$1,500 \u2013 $4,000", here: "Construido para ti" },
      { item: "Video Explicativo", market: "$2,000 \u2013 $5,000", here: "Construido para ti" },
      { item: "Pack de Contenido 30 D\u00edas", market: "$4,000 \u2013 $10,000", here: "Construido para ti" },
      { item: "Visibility Stack Completo", market: "$6,000 \u2013 $15,000", here: "Construido para ti" },
    ],
    footer: "Cero efectivo. Cero facturas. Nosotros construimos todo \u2014 t\u00fa compartes el proceso.",
  },
  proof: {
    label: "Resultados Reales",
    headingPrefix: "",
    headingBuild: "CONSTRUIMOS.",
    headingShip: "ENTREGAMOS.",
    subtitle: "Todo lo que construimos para partners seleccionados est\u00e1 probado en despliegues reales con clientes. Esto no es teor\u00eda \u2014 es infraestructura en vivo.",
    stats: [
      { label: "Ingresos Cerrados", detail: "De 6 clientes activos en 2026" },
      { label: "Leads Generados", detail: "Scraping multicanal de 7 plataformas" },
      { label: "ROI Promedio", detail: "Medido antes vs despu\u00e9s para cada cliente" },
      { label: "Landing Pages Live", detail: "Funnels optimizados y con A/B testing" },
    ],
    capabilitiesLabel: "Lo Que Impulsa Tu Stack de Crecimiento",
    capabilities: [
      { title: "Mission Control", desc: "CRM con IA y agentes aut\u00f3nomos \u2014 CEO, Content Head, Outreach Head, Dev Head \u2014 operando 24/7 en autopiloto." },
      { title: "Content Engine", desc: "Descubrimiento de tendencias en 9 plataformas \u2192 scoring de 5 dimensiones \u2192 generaci\u00f3n de carruseles con IA \u2192 renderizado de PNG con branding. Automatizado cada 8 horas." },
      { title: "Email Behavioral", desc: "Motor de 4 campa\u00f1as: Valor Puro \u2192 Prueba Social \u2192 Conversi\u00f3n \u2192 Re-engagement. Los leads fr\u00edos nunca reciben pitch. Triggers conductuales los gu\u00edan por la secuencia correcta." },
      { title: "Landing Pages & Funnels", desc: "Next.js 15 + Tailwind v4 + animaciones GSAP. Modo oscuro, optimizado para conversi\u00f3n, dise\u00f1o de clase mundial. Desplegado en Vercel edge." },
      { title: "Video con IA", desc: "Videos explicativos, presentaciones con slides, voiceover con IA \u2014 todo producido internamente con nuestro pipeline de generaci\u00f3n." },
      { title: "Generaci\u00f3n de Leads", desc: "Prospecci\u00f3n de alta intenci\u00f3n en Reddit, emails fr\u00edos con IA v\u00eda GHL, outreach multicanal. Pipeline completamente aut\u00f3nomo desde descubrimiento hasta llamada agendada." },
    ],
    screenshotsLabel: "Sistemas en Vivo \u2014 Screenshots Reales",
    screenshots: [
      { label: "Vista General del Dashboard" },
      { label: "Motor de Outreach Fr\u00edo" },
      { label: "Scraper de Leads con IA" },
      { label: "Landing Pages & Funnels" },
    ],
    poweredByLabel: "Impulsado Por & Integrado Con",
    testimonialLabel: "Construido para las Kardashians",
    testimonialQuote: "Construimos sistemas de crecimiento para la marca Kardashian-Jenner. Esto es lo que Kris Jenner dijo sobre trabajar con nuestro fundador.",
    testimonialAttribution: "Kris Jenner \u2014 sobre trabajar con Luka Lah",
  },
  tiers: {
    label: "Niveles de Partnership",
    heading: "LO QUE",
    headingAccent: "CONSTRUIMOS.",
    spotsRemaining: "10 marcas seleccionadas por trimestre \u2014 {count} lugares disponibles",
    creditLevel: "Nivel de Partnership {n}",
    spots: "{n} lugares",
    buildCredits: "Valor de Construcci\u00f3n",
    bundlesAvailable: "{n} paquetes disponibles",
    selected: "Seleccionado \u2193",
    select: "Seleccionar \u2192",
    chooseBundlePrefix: "Elige Tu Paquete \u2014 ",
    chooseBundleSuffix: " nivel",
    whatYouGet: "Lo Que Recibes",
    delivery: "Entrega",
    value: "Valor",
    whyThisMatters: "Por Qu\u00e9 Te Conviene",
    projectedImpact: "Impacto Proyectado",
    whatYouPost: "Lo Que Compartes",
    lockThisIn: "Aplica para Este Nivel",
    spotsLeftPrefix: "Solo ",
    spotsLeftSuffix: " lugares este trimestre",
    selectBundleHint: "Selecciona un paquete arriba para ver el desglose completo y aplicar",
    selectedLabel: "Seleccionado",
    data: [
      {
        credits: "$500",
        value: 500,
        trade: "4 Stories (o equivalente)",
        spots: 4,
        requirements: [
          "4 Stories en 48\u201372 horas",
          "Etiquetar: @ga.god y @mynewstaff.ai",
          "Link sticker con URL de tracking que te damos",
          "Guardar en Highlight por 7 d\u00edas (\"Tools\" o \"Business\")",
        ],
        bundles: [
          {
            name: "Press Kit Lite",
            detail: "PDF de 1 p\u00e1gina: bio, audiencia, posicionamiento, contacto para collabs",
            useCase: "Perfecto para creadores que necesitan un media kit profesional para conseguir m\u00e1s deals con marcas y sponsors.",
            projection: "Creadores con press kits profesionales reciben hasta 3x m\u00e1s consultas de marcas.",
            deliverables: ["Media kit profesional PDF de 1 p\u00e1gina", "Desglose de demograf\u00eda de audiencia", "Declaraci\u00f3n de posicionamiento de marca", "Secci\u00f3n de contacto para colaboraciones"],
          },
          {
            name: "Content Pack Starter",
            detail: "12 ganchos + captions + plan de publicaci\u00f3n de 2 semanas",
            useCase: "Para creadores estancados que necesitan un sistema para publicar consistentemente y crecer en engagement.",
            projection: "Publicar consistentemente con hooks optimizados puede aumentar el alcance 40-60% en el primer mes.",
            deliverables: ["12 ganchos que detienen el scroll", "12 captions optimizados para engagement", "Calendario de contenido de 2 semanas", "An\u00e1lisis de mejores horarios para publicar"],
          },
          {
            name: "AI Visuals Pack",
            detail: "10 visuales con branding para posts + fondos de stories",
            useCase: "Eleva la est\u00e9tica de tu feed al instante. Visuales profesionales con branding que hacen tu perfil ver premium.",
            projection: "Branding visual consistente aumenta la tasa de visita-a-seguidor entre 25-35%.",
            deliverables: ["10 visuales con branding para posts", "Templates de fondo para stories", "Paleta de colores + gu\u00eda tipogr\u00e1fica", "Archivos fuente para uso futuro"],
          },
        ],
        delivery: "72 horas",
      },
      {
        credits: "$1,500",
        value: 1500,
        trade: "1 Reel + 3 Stories",
        spots: 3,
        requirements: [
          "1 Reel (15\u201330 seg)",
          "3 Stories de apoyo al reel en 72 horas",
          "Etiquetar + link sticker",
          "Fijar el reel por 7 d\u00edas",
          "MyNewStaff puede repostear org\u00e1nicamente por 30 d\u00edas",
        ],
        bundles: [
          {
            name: "Landing Page Kit",
            detail: "Landing page de 1 p\u00e1gina estilo MyNewStaff.ai + copy + secciones CTA",
            useCase: "Convierte tu audiencia en leads y clientes con una p\u00e1gina optimizada para conversi\u00f3n que captura emails e impulsa ventas.",
            projection: "Landing pages personalizadas convierten al 15-25% vs 3% en herramientas est\u00e1ndar de link-in-bio.",
            deliverables: ["Landing page personalizada de 1 p\u00e1gina", "Copy optimizado para conversi\u00f3n", "Secciones CTA + captura de email", "Dise\u00f1o responsive para m\u00f3vil", "Alojada en tu dominio"],
          },
          {
            name: "Video Explicativo",
            detail: "Video de 60\u201390 seg \u2014 gui\u00f3n + voiceover con IA",
            useCase: "Un video explicativo profesional que puedes usar en tu bio, stories o pitches para comunicar tu propuesta de valor al instante.",
            projection: "Los videos explicativos aumentan las tasas de conversi\u00f3n un 20% y reducen el tiempo de cierre en deals con marcas.",
            deliverables: ["Video explicativo de 60\u201390 segundos", "Escritura profesional del gui\u00f3n", "Producci\u00f3n de voiceover con IA", "Dise\u00f1o visual basado en slides", "Exportaciones en m\u00faltiples formatos (16:9, 9:16, 1:1)"],
          },
          {
            name: "Press Kit Pro",
            detail: "Deck PDF de 5\u20137 p\u00e1ginas: historia, oferta, audiencia, m\u00e9tricas, ejemplos",
            useCase: "El paquete profesional completo para creadores serios que buscan cerrar partnerships de $5K-$50K con marcas.",
            projection: "Los press kits de nivel profesional son el factor #1 que las marcas citan al elegir entre creadores similares.",
            deliverables: ["Deck PDF dise\u00f1ado de 5\u20137 p\u00e1ginas", "Tu historia + narrativa de marca", "Demograf\u00eda de audiencia + m\u00e9tricas", "Ejemplos de colaboraciones anteriores", "Tarjeta de tarifas + niveles de partnership"],
          },
        ],
        delivery: "5 d\u00edas h\u00e1biles",
      },
      {
        credits: "$3,500",
        value: 3500,
        trade: "3 Reels + 6 Stories (en 10\u201314 d\u00edas)",
        spots: 2,
        requirements: [
          "3 Reels en 10\u201314 d\u00edas (m\u00edn 72h entre cada uno)",
          "6 Stories en total (2 por reel)",
          "Etiquetar + link sticker",
          "Fijar el mejor reel por 14 d\u00edas",
          "MyNewStaff puede repostear org\u00e1nicamente por 30 d\u00edas",
        ],
        bundles: [
          {
            name: "Visibility Stack",
            detail: "Landing page (1 p\u00e1gina) + Press Kit Pro",
            useCase: "La mejora completa de tu presencia online. Tu propia p\u00e1gina de conversi\u00f3n m\u00e1s un press kit profesional \u2014 todo lo que necesitas para cerrar deals m\u00e1s grandes.",
            projection: "Creadores con landing page y press kit cierran deals con marcas 4x m\u00e1s r\u00e1pido.",
            deliverables: ["Landing page personalizada (alojada)", "Press kit PDF de 5\u20137 p\u00e1ginas", "Copy optimizado para conversi\u00f3n", "Integraci\u00f3n de captura de email", "Dise\u00f1o responsive para m\u00f3vil", "Tarjeta de tarifas + niveles de partnership"],
          },
          {
            name: "One Month Content Machine",
            detail: "30 carruseles + 10 visuales IA + 12 ganchos y captions",
            useCase: "Nunca te quedes sin contenido. Un mes completo de carruseles diarios con branding, activos visuales y copy que genera engagement.",
            projection: "Publicar diariamente con carruseles genera 3-5x m\u00e1s guardados y compartidos que los posts de imagen individual.",
            deliverables: ["30 carruseles con branding", "10 activos visuales generados con IA", "12 ganchos que detienen el scroll", "12 captions optimizados para engagement", "Calendario de contenido mensual", "Template de seguimiento de rendimiento"],
          },
          {
            name: "Authority Builder",
            detail: "Press Kit Pro + video explicativo + 10 visuales IA",
            useCase: "Posicci\u00f3nate como el experto referente en tu nicho. Media kit profesional, video profesional y visuales con branding que gritan credibilidad.",
            projection: "Los paquetes completos de posicionamiento de autoridad aumentan el tama\u00f1o promedio de deals entre 60-80%.",
            deliverables: ["Press kit PDF de 5\u20137 p\u00e1ginas", "Video explicativo de 60\u201390 seg", "10 activos visuales con branding", "Gui\u00f3n profesional + voiceover", "Estrategia de posicionamiento de marca", "Archivos fuente de todos los activos"],
          },
        ],
        delivery: "7\u201310 d\u00edas h\u00e1biles",
      },
    ],
  },
  bigPlays: {
    label: "Para Operadores",
    heading: "JUGADAS",
    headingAccent: "GRANDES.",
    subtitle: "Para marcas listas para una transformaci\u00f3n completa. Se requiere aplicaci\u00f3n y llamada estrat\u00e9gica.",
    whatsIncluded: "Qu\u00e9 Incluye",
    phasesLabel: "Fases",
    delivery: "Entrega",
    value: "Valor",
    whoThisIsFor: "Para Qui\u00e9n Es",
    projectedImpact: "Impacto Proyectado",
    applyFor: "Aplicar para",
    applicationOnly: "Solo por aplicaci\u00f3n \u2014 agenda una llamada estrat\u00e9gica",
    deliverables: "entregables",
    details: "Detalles \u2193",
    viewDetails: "Ver Detalles \u2192",
    data: [
      {
        tag: "Opci\u00f3n A",
        name: "BUSINESS-IN-A-BOX",
        subtitle: "Modelo de Franquicia",
        credits: "$7,500",
        value: 7500,
        trade: "Alcance personalizado (requiere llamada de alineaci\u00f3n)",
        delivery: "7\u201310 d\u00edas h\u00e1biles (despu\u00e9s de la llamada)",
        description: "Convierte tu audiencia en un motor de ingresos vendiendo servicios de MyNewStaff.ai bajo tu marca. Nosotros nos encargamos de la entrega.",
        highlight: "30% de comisi\u00f3n en todas las ventas (sobre el efectivo cobrado)",
        includes: [
          "Kit de oferta white-label (posicionamiento + estructura de paquetes)",
          "Activos de venta (deck + scripts + flujo de DMs)",
          "Playbook de entrega + pipeline de fulfillment",
          "Men\u00fa \"qu\u00e9 vender\": Mission Control, lead gen, sistemas de contenido",
        ],
        whoItsFor: "Operadores, due\u00f1os de agencia y creadores de alto impacto que quieren revender servicios premium de marketing con IA sin construir el backend.",
        projection: "Partners que revenden servicios a $3K\u2013$10K/cliente ganan $900\u2013$3,000 por deal. 3 deals cubren el valor total del trueque.",
      },
      {
        tag: "Opci\u00f3n B",
        name: "BLITZ 90 D\u00cdAS",
        subtitle: "Construcci\u00f3n a Escala Completa",
        credits: "$71,900",
        value: 71900,
        trade: "Alcance personalizado (requiere sesi\u00f3n estrat\u00e9gica)",
        delivery: "90 d\u00edas (milestones semanales)",
        description: "Construimos, lanzamos y escalamos tu negocio con un sistema completo. Contenido, outreach, activos de conversi\u00f3n y operaciones de crecimiento.",
        highlight: "Salto de 5x en visibilidad + pipeline",
        phases: ["Construir la m\u00e1quina", "Lanzar la oferta", "Escalar distribuci\u00f3n", "Impulsar crecimiento 5x"],
        includes: [
          "Arquitectura de marca + oferta",
          "Landing pages + activos de conversi\u00f3n",
          "Press / media kit",
          "Sistema de producci\u00f3n de contenido (mensual)",
          "Sistema de lead gen + outreach",
          "Construcci\u00f3n de Mission Control (CRM + automatizaci\u00f3n)",
          "Cadencia de optimizaci\u00f3n semanal por 90 d\u00edas",
        ],
        whoItsFor: "Fundadores ambiciosos y creadores establecidos listos para una transformaci\u00f3n digital completa \u2014 marca, contenido, outreach y sistemas construidos en 90 d\u00edas.",
        projection: "Los clientes del Blitz de 90 D\u00edas ven un aumento promedio de 5x en pipeline calificado y 3x en producci\u00f3n de contenido dentro de los primeros 60 d\u00edas.",
      },
    ],
  },
  addOn: {
    label: "Add-on Opcional",
    heading: "DERECHOS DE USO PAGADO",
    price: "+$1,000 (o negociado)",
    description: "Permite a MyNewStaff correr tu contenido de influencer como anuncios pagados por 30 d\u00edas. Whitelisting opcional.",
  },
  terms: {
    label: "T\u00e9rminos",
    items: [
      "Los plazos comienzan despu\u00e9s de completar el intake y recibir los assets.",
      "1 ronda de revisi\u00f3n incluida por entregable.",
      "Los milestones de contenido compartido se acuerdan durante el onboarding.",
    ],
  },
  cta: {
    heading: "\u00bfLISTO PARA SER",
    headingAccent: "SELECCIONADO?",
    subtitle: "Aplica ahora para ser considerado en Q2 2026 \u2014 o escr\u00edbenos directamente por WhatsApp, Instagram o email.",
    applyNow: "Aplicar Ahora",
    whatsapp: "WhatsApp",
    dmInstagram: "DM en Instagram",
    orEmail: "o escr\u00edbenos a",
  },
  floatingCta: {
    applyNow: "Aplicar Ahora",
  },
  applyModal: {
    appSent: "APLICACI\u00d3N ENVIADA",
    appSentSubtitle: "Revisaremos tu marca en 48 horas y te contactaremos por email para confirmar tu nivel de partnership.",
    speedUp: "Acelera Tu Aprobaci\u00f3n",
    speedUpWithScreenshots: "Subiste {n} screenshot{s} \u2014 \u00a1genial! Env\u00edanos un DM en Instagram para confirmar y aceleraremos tu revisi\u00f3n.",
    speedUpWithout: "Env\u00edanos por DM tus screenshots m\u00e1s recientes de Instagram Insights (seguidores, alcance, engagement). Esto nos ayuda a acelerar tu aplicaci\u00f3n.",
    dmButton: "DM @mynewstaff.ai",
    close: "Cerrar",
    stepOf: "Paso {current} de {total}",
    step0Title: "CU\u00c9NTANOS SOBRE TI",
    step0Subtitle: "Datos b\u00e1sicos para poder contactarte.",
    fullName: "Nombre Completo",
    email: "Email",
    instagramHandle: "Usuario de Instagram",
    step1Title: "TU AUDIENCIA",
    step1Subtitle: "Nos ayuda a ubicarte en el nivel de partnership correcto.",
    followerCount: "Cantidad de Seguidores",
    nicheIndustry: "Nicho / Industria",
    avgStoryViews: "Views Promedio en Stories",
    avgReelViews: "Views Promedio en Reels",
    engagementRate: "Tasa de Engagement (si la sabes)",
    step2Title: "MU\u00c9STRANOS TU MARCA",
    step2Subtitle: "Sube screenshots de Instagram Insights para que podamos definir qu\u00e9 construir.",
    step2Optional: "Opcional \u2014 puedes saltar este paso",
    clickUpload: "Haz clic para subir screenshots",
    uploadHint: "PNG, JPG hasta 5 archivos \u2014 Vista general de Insights, alcance, demograf\u00eda de audiencia",
    whatToScreenshot: "Qu\u00e9 capturar",
    screenshotHints: [
      "Instagram Insights \u2192 Vista general (cuentas alcanzadas, interacciones)",
      "Demograf\u00eda de audiencia (ubicaciones principales, rango de edad)",
      "Contenido \u2192 Rendimiento de Reels o Stories",
    ],
    remove: "Eliminar",
    step3Title: "CONFIRMA TU APLICACI\u00d3N",
    step3Subtitle: "Revisa todo antes de enviar.",
    yourPackage: "Tu Partnership",
    youPost: "T\u00fa Compartes",
    yourProfile: "Tu Perfil",
    name: "Nombre",
    instagram: "Instagram",
    followers: "Seguidores",
    niche: "Nicho",
    screenshotsAttached: "{n} screenshot{s} adjunto{s2}",
    anythingElse: "\u00bfAlgo m\u00e1s? (opcional)",
    anythingElsePlaceholder: "Links a collabs anteriores con marcas, tu visi\u00f3n para la partnership, etc.",
    back: "\u2190 Atr\u00e1s",
    changeSelection: "\u2190 Cambiar Selecci\u00f3n",
    next: "Siguiente \u2192",
    skip: "Saltar \u2192",
    sending: "Enviando...",
    submitApplication: "Enviar Aplicaci\u00f3n",
    selectPlaceholder: "Seleccionar...",
    niches: [
      "Fitness y Salud",
      "Belleza y Moda",
      "Tech y Gadgets",
      "Negocios y Finanzas",
      "Viajes y Estilo de Vida",
      "Comida y Cocina",
      "Educaci\u00f3n y Aprendizaje",
      "Entretenimiento y Comedia",
      "Bienes Ra\u00edces",
      "Crypto y Web3",
      "Otro",
    ],
  },
};

export const translations: Record<Locale, PartnersTranslations> = { en, es };
