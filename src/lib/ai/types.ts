/* ─── AI Feature Types ─────────────────────────────────────────────── */

export type AIToolType =
  | "offer_builder"
  | "value_stack"
  | "marketing_play"
  | "funnel_blueprint"
  | "ad_copy"
  | "email_sequence"
  | "positioning_workshop";

export interface AIToolMeta {
  type: AIToolType;
  name: string;
  description: string;
  minTier: "starter" | "growth" | "scale";
  icon: string; // SVG path data
}

export const AI_TOOLS: AIToolMeta[] = [
  {
    type: "offer_builder",
    name: "Offer Builder",
    description: "Build irresistible offers based on your diagnostic data. Creates pricing, guarantees, urgency, and value stacks.",
    minTier: "starter",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    type: "value_stack",
    name: "Value Stack Creator",
    description: "Design value stacks with anchored pricing that make your offer feel like a steal. Bonuses, anchors, and psychology.",
    minTier: "growth",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  },
  {
    type: "marketing_play",
    name: "Marketing Plays",
    description: "Get tactical marketing plays based on your weakest pillars. Step-by-step execution plans you can run this week.",
    minTier: "starter",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    type: "funnel_blueprint",
    name: "Funnel Blueprints",
    description: "AI-designed funnel architecture based on your business type, audience, and current gaps.",
    minTier: "growth",
    icon: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z",
  },
  {
    type: "ad_copy",
    name: "Ad Copy Generator",
    description: "Write high-converting ad copy for Google, Meta, LinkedIn based on your positioning and audience data.",
    minTier: "growth",
    icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
  },
  {
    type: "email_sequence",
    name: "Email Sequence Builder",
    description: "Create nurture email sequences that convert. From cold to customer in 5-7 emails with behavioral triggers.",
    minTier: "growth",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  },
  {
    type: "positioning_workshop",
    name: "Positioning Workshop",
    description: "Interactive positioning refinement. Clarify your message, differentiation, and audience targeting with AI guidance.",
    minTier: "growth",
    icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  },
];

export function getToolMeta(type: AIToolType): AIToolMeta {
  return AI_TOOLS.find((t) => t.type === type)!;
}
