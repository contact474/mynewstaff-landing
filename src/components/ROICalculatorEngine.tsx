import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Globe, MessageSquare, Mail, Instagram, Search, Smartphone, Database,
  ArrowRight, ToggleLeft, ToggleRight, Calculator, Sparkles, Clock, Zap,
  ShoppingCart, Briefcase, Scale, UtensilsCrossed, Laptop, TrendingUp,
  Languages,
} from 'lucide-react'

// ─── Icon Map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Globe, MessageSquare, Mail, Instagram, Search, Smartphone, Database,
  Calculator, Sparkles, Clock, Zap, ShoppingCart, Briefcase, Scale,
  UtensilsCrossed, Laptop, TrendingUp, Languages,
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ServiceDefinition {
  id: string
  label: string
  labelHR?: string
  icon: string
  baseSetupCost: number
  baseMonthlyCost: number
  enabledByDefault: boolean
  buildHoursMin: number
  buildHoursMax: number
  impacts: Record<string, number>
  description?: string
  descriptionHR?: string
}

export interface RevenueInputDef {
  id: string
  label: string
  labelHR?: string
  defaultValue: number
  min: number
  max: number
  step?: number
  prefix?: string
  suffix?: string
}

export interface ImpactDimension {
  id: string
  label: string
  labelHR?: string
  cap: number
}

export interface ComparisonRowDef {
  label: string
  labelHR?: string
  current: (inputs: Record<string, number>, base: ComputedBase) => string
  projected: (inputs: Record<string, number>, base: ComputedBase, boosts: Record<string, number>) => string
  good: (inputs: Record<string, number>, base: ComputedBase, boosts: Record<string, number>) => boolean
}

export interface ProspectConfig {
  vertical: string
  businessName: string
  location: string
  inputs: RevenueInputDef[]
  services: ServiceDefinition[]
  impactDimensions: ImpactDimension[]
  revenueFormula: (inputs: Record<string, number>) => number
  projectedRevenueFormula: (inputs: Record<string, number>, boosts: Record<string, number>) => number
  comparisonRows: ComparisonRowDef[]
  referenceRevenue?: number
  pricingFloor?: number
  pricingCap?: number
  currency?: string
}

interface ComputedBase {
  currentRevenue: number
  projectedRevenue: number
  revenueUplift: number
}

// ─── Revenue Multiplier ──────────────────────────────────────────────────────

export function getRevenueMultiplier(
  revenue: number,
  reference = 100_000,
  floor = 0.5,
  cap = 5.0
): number {
  return Math.min(cap, Math.max(floor, revenue / reference))
}

// ─── i18n Labels ─────────────────────────────────────────────────────────────

const i18n = {
  en: {
    yourNumbers: 'Your Current Numbers',
    editAny: 'Edit any field',
    selectServices: 'Select Services',
    toggleOnOff: 'Toggle on/off',
    setup: 'Setup',
    mo: '/mo',
    currentVsProjected: 'Current State vs Projected',
    projectedUplift: 'Projected Annual Revenue Uplift',
    netRevenueIncrease: 'net revenue increase',
    investReturn: 'Investment & Return',
    oneTimeSetup: 'One-Time Setup',
    monthlyCost: 'Monthly Cost',
    yearOneTotal: 'Year 1 Total Investment',
    yearOneROI: 'Year 1 ROI',
    breakEven: 'Break-even',
    paybackPeriod: 'Payback Period',
    months: 'months',
    fiveYearGain: '5-Year Net Gain',
    expertHours: 'Expert Build Hours',
    totalHours: 'Total',
    effectiveRate: 'Effective Rate',
    perHour: '/hour of expert work',
    buildYourMachine: 'This is what it takes to build your Revenue Machine',
    standard: 'Standard',
    revenueAdjusted: 'Revenue-Adjusted',
    pricing: 'Pricing',
    hours: 'h',
  },
  hr: {
    yourNumbers: 'Vaši trenutni brojevi',
    editAny: 'Uredite bilo koje polje',
    selectServices: 'Odaberite usluge',
    toggleOnOff: 'Uključi/isključi',
    setup: 'Postavljanje',
    mo: '/mj',
    currentVsProjected: 'Trenutno stanje vs. Projekcija',
    projectedUplift: 'Projicirani godišnji rast prihoda',
    netRevenueIncrease: 'povećanje neto prihoda',
    investReturn: 'Investicija i povrat',
    oneTimeSetup: 'Jednokratno postavljanje',
    monthlyCost: 'Mjesečni trošak',
    yearOneTotal: 'Ukupna investicija 1. godine',
    yearOneROI: 'ROI 1. godine',
    breakEven: 'Povrat investicije',
    paybackPeriod: 'Period povrata',
    months: 'mjeseci',
    fiveYearGain: 'Neto dobit u 5 godina',
    expertHours: 'Stručni sati izgradnje',
    totalHours: 'Ukupno',
    effectiveRate: 'Efektivna cijena',
    perHour: '/sat stručnog rada',
    buildYourMachine: 'Ovo je potrebno za izgradnju vašeg Revenue Machine sustava',
    standard: 'Standardno',
    revenueAdjusted: 'Prilagođeno prihodu',
    pricing: 'Cijene',
    hours: 'h',
  },
}

// ─── Industry Presets ────────────────────────────────────────────────────────

const HOSPITALITY_SERVICES: ServiceDefinition[] = [
  { id: 'website', label: 'Cinematic Website + Booking', labelHR: 'Cinematska web stranica + Rezervacije', icon: 'Globe', baseSetupCost: 2500, baseMonthlyCost: 0, enabledByDefault: true, buildHoursMin: 6, buildHoursMax: 8, impacts: { directBooking: 25, occupancy: 3, adr: 5, repeat: 2 }, description: 'Design, dev, booking, multi-lang, SEO', descriptionHR: 'Dizajn, razvoj, rezervacije, višejezičnost, SEO' },
  { id: 'chatbot', label: 'AI Concierge Chatbot', labelHR: 'AI Concierge Chatbot', icon: 'MessageSquare', baseSetupCost: 1000, baseMonthlyCost: 100, enabledByDefault: true, buildHoursMin: 3, buildHoursMax: 4, impacts: { directBooking: 5, occupancy: 4, adr: 0, repeat: 3 }, description: 'RAG trained, GHL sync, 4 languages', descriptionHR: 'RAG obučen, GHL sinkronizacija, 4 jezika' },
  { id: 'instagram', label: 'Instagram Content Engine', labelHR: 'Instagram sadržajni sustav', icon: 'Instagram', baseSetupCost: 500, baseMonthlyCost: 400, enabledByDefault: true, buildHoursMin: 2, buildHoursMax: 3, impacts: { directBooking: 5, occupancy: 5, adr: 3, repeat: 0 }, description: '12-week plan, virality scored', descriptionHR: 'Plan za 12 tjedana, ocjena viralnosti' },
  { id: 'email', label: 'Email Machine (16+ emails)', labelHR: 'Email sustav (16+ emailova)', icon: 'Mail', baseSetupCost: 800, baseMonthlyCost: 200, enabledByDefault: true, buildHoursMin: 3, buildHoursMax: 4, impacts: { directBooking: 3, occupancy: 2, adr: 0, repeat: 10 }, description: 'Sequences, GHL workflows', descriptionHR: 'Sekvence, GHL radni tokovi' },
  { id: 'google', label: 'Google Business + Reviews', labelHR: 'Google Business + Recenzije', icon: 'Search', baseSetupCost: 400, baseMonthlyCost: 100, enabledByDefault: true, buildHoursMin: 1, buildHoursMax: 2, impacts: { directBooking: 5, occupancy: 3, adr: 2, repeat: 0 }, description: 'GBP optimization, review engine', descriptionHR: 'GBP optimizacija, sustav recenzija' },
  { id: 'whatsapp', label: 'WhatsApp Communication', labelHR: 'WhatsApp komunikacija', icon: 'Smartphone', baseSetupCost: 200, baseMonthlyCost: 0, enabledByDefault: false, buildHoursMin: 1, buildHoursMax: 1.5, impacts: { directBooking: 2, occupancy: 1, adr: 0, repeat: 2 }, description: 'Business setup, AI bridge', descriptionHR: 'Postavljanje, AI integracija' },
  { id: 'crm', label: 'CRM + Guest Intelligence', labelHR: 'CRM + Inteligencija gostiju', icon: 'Database', baseSetupCost: 600, baseMonthlyCost: 100, enabledByDefault: false, buildHoursMin: 2, buildHoursMax: 3, impacts: { directBooking: 2, occupancy: 1, adr: 0, repeat: 5 }, description: 'GHL sub-account, tagging, scoring', descriptionHR: 'GHL račun, oznake, bodovanje' },
]

const COACHING_SERVICES: ServiceDefinition[] = [
  { id: 'landing', label: 'High-Converting Landing Page', labelHR: 'Landing stranica s visokom konverzijom', icon: 'Globe', baseSetupCost: 2000, baseMonthlyCost: 0, enabledByDefault: true, buildHoursMin: 5, buildHoursMax: 7, impacts: { conversionRate: 15, leadVolume: 10, closeRate: 0, retention: 5 } },
  { id: 'email', label: 'Email Nurture Sequences', labelHR: 'Email sekvence', icon: 'Mail', baseSetupCost: 800, baseMonthlyCost: 200, enabledByDefault: true, buildHoursMin: 3, buildHoursMax: 4, impacts: { conversionRate: 5, leadVolume: 0, closeRate: 10, retention: 15 } },
  { id: 'content', label: 'Content Marketing Engine', labelHR: 'Sustav za marketing sadržaja', icon: 'Instagram', baseSetupCost: 500, baseMonthlyCost: 400, enabledByDefault: true, buildHoursMin: 2, buildHoursMax: 3, impacts: { conversionRate: 5, leadVolume: 20, closeRate: 0, retention: 5 } },
  { id: 'chatbot', label: 'AI Qualification Chatbot', labelHR: 'AI chatbot za kvalifikaciju', icon: 'MessageSquare', baseSetupCost: 1000, baseMonthlyCost: 100, enabledByDefault: true, buildHoursMin: 3, buildHoursMax: 4, impacts: { conversionRate: 10, leadVolume: 5, closeRate: 5, retention: 0 } },
  { id: 'crm', label: 'CRM + Pipeline Intelligence', labelHR: 'CRM + Inteligencija prodajnog lijevka', icon: 'Database', baseSetupCost: 600, baseMonthlyCost: 100, enabledByDefault: false, buildHoursMin: 2, buildHoursMax: 3, impacts: { conversionRate: 0, leadVolume: 0, closeRate: 10, retention: 10 } },
  { id: 'whatsapp', label: 'WhatsApp Client Communication', labelHR: 'WhatsApp komunikacija s klijentima', icon: 'Smartphone', baseSetupCost: 200, baseMonthlyCost: 0, enabledByDefault: false, buildHoursMin: 1, buildHoursMax: 1.5, impacts: { conversionRate: 3, leadVolume: 0, closeRate: 5, retention: 5 } },
]

const B2B_SAAS_SERVICES: ServiceDefinition[] = [
  { id: 'landing', label: 'Product Landing Page', labelHR: 'Produktna landing stranica', icon: 'Globe', baseSetupCost: 2500, baseMonthlyCost: 0, enabledByDefault: true, buildHoursMin: 6, buildHoursMax: 8, impacts: { trialConversion: 15, churnReduction: 0, leadVolume: 10, expansion: 5 } },
  { id: 'email', label: 'Onboarding + Lifecycle Email', labelHR: 'Onboarding + Lifecycle email', icon: 'Mail', baseSetupCost: 1000, baseMonthlyCost: 200, enabledByDefault: true, buildHoursMin: 3, buildHoursMax: 5, impacts: { trialConversion: 10, churnReduction: 15, leadVolume: 0, expansion: 10 } },
  { id: 'chatbot', label: 'AI Support Chatbot', labelHR: 'AI chatbot za podršku', icon: 'MessageSquare', baseSetupCost: 1200, baseMonthlyCost: 150, enabledByDefault: true, buildHoursMin: 4, buildHoursMax: 6, impacts: { trialConversion: 5, churnReduction: 10, leadVolume: 0, expansion: 5 } },
  { id: 'content', label: 'Content + SEO Engine', labelHR: 'Sadržaj + SEO sustav', icon: 'Instagram', baseSetupCost: 600, baseMonthlyCost: 400, enabledByDefault: true, buildHoursMin: 2, buildHoursMax: 3, impacts: { trialConversion: 5, churnReduction: 0, leadVolume: 20, expansion: 0 } },
  { id: 'crm', label: 'CRM + Lead Scoring', labelHR: 'CRM + Bodovanje leadova', icon: 'Database', baseSetupCost: 800, baseMonthlyCost: 100, enabledByDefault: false, buildHoursMin: 2, buildHoursMax: 3, impacts: { trialConversion: 5, churnReduction: 5, leadVolume: 0, expansion: 10 } },
  { id: 'outreach', label: 'Cold Outreach Engine', labelHR: 'Sustav za hladni outreach', icon: 'Zap', baseSetupCost: 500, baseMonthlyCost: 300, enabledByDefault: false, buildHoursMin: 2, buildHoursMax: 3, impacts: { trialConversion: 0, churnReduction: 0, leadVolume: 25, expansion: 0 } },
]

const LEGAL_SERVICES: ServiceDefinition[] = [
  { id: 'landing', label: 'Professional Landing Page', labelHR: 'Profesionalna web stranica', icon: 'Globe', baseSetupCost: 2000, baseMonthlyCost: 0, enabledByDefault: true, buildHoursMin: 5, buildHoursMax: 7, impacts: { consultations: 15, winRate: 0, clientValue: 5, referrals: 10 } },
  { id: 'chatbot', label: 'AI Legal Intake Chatbot', labelHR: 'AI chatbot za pravni prijem', icon: 'MessageSquare', baseSetupCost: 1200, baseMonthlyCost: 150, enabledByDefault: true, buildHoursMin: 4, buildHoursMax: 5, impacts: { consultations: 20, winRate: 0, clientValue: 0, referrals: 5 } },
  { id: 'email', label: 'Client Nurture Emails', labelHR: 'Email sekvence za klijente', icon: 'Mail', baseSetupCost: 800, baseMonthlyCost: 200, enabledByDefault: true, buildHoursMin: 3, buildHoursMax: 4, impacts: { consultations: 5, winRate: 0, clientValue: 10, referrals: 15 } },
  { id: 'google', label: 'Google Business + Reviews', labelHR: 'Google Business + Recenzije', icon: 'Search', baseSetupCost: 400, baseMonthlyCost: 100, enabledByDefault: true, buildHoursMin: 1, buildHoursMax: 2, impacts: { consultations: 10, winRate: 0, clientValue: 0, referrals: 10 } },
  { id: 'content', label: 'Legal Content Marketing', labelHR: 'Pravni marketing sadržaja', icon: 'Instagram', baseSetupCost: 500, baseMonthlyCost: 400, enabledByDefault: false, buildHoursMin: 2, buildHoursMax: 3, impacts: { consultations: 10, winRate: 0, clientValue: 5, referrals: 5 } },
  { id: 'crm', label: 'CRM + Case Pipeline', labelHR: 'CRM + Pipeline predmeta', icon: 'Database', baseSetupCost: 600, baseMonthlyCost: 100, enabledByDefault: false, buildHoursMin: 2, buildHoursMax: 3, impacts: { consultations: 0, winRate: 5, clientValue: 10, referrals: 5 } },
]

const ECOMMERCE_SERVICES: ServiceDefinition[] = [
  { id: 'landing', label: 'Conversion-Optimized Store', labelHR: 'Trgovina optimizirana za konverziju', icon: 'Globe', baseSetupCost: 3000, baseMonthlyCost: 0, enabledByDefault: true, buildHoursMin: 8, buildHoursMax: 12, impacts: { conversionRate: 20, aov: 5, returnCustomers: 5, traffic: 10 } },
  { id: 'email', label: 'Email Flows (Cart, Welcome, Win-back)', labelHR: 'Email tokovi (Košarica, Dobrodošlica, Win-back)', icon: 'Mail', baseSetupCost: 1000, baseMonthlyCost: 250, enabledByDefault: true, buildHoursMin: 4, buildHoursMax: 6, impacts: { conversionRate: 10, aov: 5, returnCustomers: 20, traffic: 0 } },
  { id: 'chatbot', label: 'AI Shopping Assistant', labelHR: 'AI asistent za kupovinu', icon: 'MessageSquare', baseSetupCost: 1000, baseMonthlyCost: 100, enabledByDefault: true, buildHoursMin: 3, buildHoursMax: 4, impacts: { conversionRate: 10, aov: 10, returnCustomers: 5, traffic: 0 } },
  { id: 'instagram', label: 'Instagram + Social Commerce', labelHR: 'Instagram + Društvena trgovina', icon: 'Instagram', baseSetupCost: 500, baseMonthlyCost: 400, enabledByDefault: true, buildHoursMin: 2, buildHoursMax: 3, impacts: { conversionRate: 5, aov: 0, returnCustomers: 5, traffic: 15 } },
  { id: 'google', label: 'Google Shopping + SEO', labelHR: 'Google Shopping + SEO', icon: 'Search', baseSetupCost: 600, baseMonthlyCost: 200, enabledByDefault: false, buildHoursMin: 2, buildHoursMax: 3, impacts: { conversionRate: 5, aov: 0, returnCustomers: 0, traffic: 20 } },
  { id: 'crm', label: 'CRM + Customer Intelligence', labelHR: 'CRM + Inteligencija kupaca', icon: 'Database', baseSetupCost: 600, baseMonthlyCost: 100, enabledByDefault: false, buildHoursMin: 2, buildHoursMax: 3, impacts: { conversionRate: 0, aov: 5, returnCustomers: 15, traffic: 0 } },
]

const RESTAURANT_SERVICES: ServiceDefinition[] = [
  { id: 'website', label: 'Modern Website + Online Menu', labelHR: 'Moderna web stranica + Online meni', icon: 'Globe', baseSetupCost: 1500, baseMonthlyCost: 0, enabledByDefault: true, buildHoursMin: 4, buildHoursMax: 6, impacts: { covers: 10, avgCheck: 5, returnRate: 5, onlineOrders: 15 } },
  { id: 'google', label: 'Google Business Domination', labelHR: 'Google Business dominacija', icon: 'Search', baseSetupCost: 400, baseMonthlyCost: 100, enabledByDefault: true, buildHoursMin: 1, buildHoursMax: 2, impacts: { covers: 15, avgCheck: 0, returnRate: 0, onlineOrders: 10 } },
  { id: 'instagram', label: 'Instagram Food Content', labelHR: 'Instagram sadržaj za hranu', icon: 'Instagram', baseSetupCost: 500, baseMonthlyCost: 400, enabledByDefault: true, buildHoursMin: 2, buildHoursMax: 3, impacts: { covers: 10, avgCheck: 5, returnRate: 0, onlineOrders: 5 } },
  { id: 'whatsapp', label: 'WhatsApp Reservations', labelHR: 'WhatsApp rezervacije', icon: 'Smartphone', baseSetupCost: 200, baseMonthlyCost: 0, enabledByDefault: true, buildHoursMin: 1, buildHoursMax: 1.5, impacts: { covers: 5, avgCheck: 0, returnRate: 5, onlineOrders: 0 } },
  { id: 'email', label: 'Email + Loyalty Engine', labelHR: 'Email + Sustav lojalnosti', icon: 'Mail', baseSetupCost: 600, baseMonthlyCost: 150, enabledByDefault: false, buildHoursMin: 2, buildHoursMax: 3, impacts: { covers: 5, avgCheck: 5, returnRate: 15, onlineOrders: 5 } },
  { id: 'chatbot', label: 'AI Reservation Chatbot', labelHR: 'AI chatbot za rezervacije', icon: 'MessageSquare', baseSetupCost: 800, baseMonthlyCost: 100, enabledByDefault: false, buildHoursMin: 2, buildHoursMax: 3, impacts: { covers: 5, avgCheck: 0, returnRate: 5, onlineOrders: 10 } },
]

// ─── Preset Configs ──────────────────────────────────────────────────────────

export const INDUSTRY_PRESETS: Record<string, ProspectConfig> = {
  hospitality: {
    vertical: 'hospitality',
    businessName: '',
    location: '',
    inputs: [
      { id: 'units', label: 'Apartment Units', labelHR: 'Broj apartmana', defaultValue: 3, min: 1, max: 50 },
      { id: 'nightlyRate', label: 'Avg Nightly Rate', labelHR: 'Prosj. cijena noćenja', defaultValue: 110, min: 30, max: 500, prefix: '€' },
      { id: 'occupancy', label: 'Occupancy', labelHR: 'Popunjenost', defaultValue: 65, min: 10, max: 100, suffix: '%' },
      { id: 'seasonDays', label: 'Season (days)', labelHR: 'Sezona (dana)', defaultValue: 180, min: 30, max: 365 },
      { id: 'otaBookingPct', label: 'OTA Booking %', labelHR: 'OTA rezervacije %', defaultValue: 85, min: 0, max: 100, suffix: '%' },
      { id: 'otaCommission', label: 'OTA Commission', labelHR: 'OTA provizija', defaultValue: 17.5, min: 5, max: 30, step: 0.5, suffix: '%' },
    ],
    services: HOSPITALITY_SERVICES,
    impactDimensions: [
      { id: 'directBooking', label: 'Direct Bookings', labelHR: 'Direktne rezervacije', cap: 50 },
      { id: 'occupancy', label: 'Occupancy', labelHR: 'Popunjenost', cap: 20 },
      { id: 'adr', label: 'Avg Daily Rate', labelHR: 'Prosj. dnevna cijena', cap: 15 },
      { id: 'repeat', label: 'Repeat Guests', labelHR: 'Povratni gosti', cap: 35 },
    ],
    revenueFormula: (inp) => {
      const gross = inp.units * inp.seasonDays * (inp.occupancy / 100) * inp.nightlyRate
      const otaFees = gross * (inp.otaBookingPct / 100) * (inp.otaCommission / 100)
      return gross - otaFees
    },
    projectedRevenueFormula: (inp, boosts) => {
      const projOccupancy = Math.min(95, inp.occupancy + boosts.occupancy)
      const projAdr = inp.nightlyRate * (1 + boosts.adr / 100)
      const projOtaPct = Math.max(30, inp.otaBookingPct - boosts.directBooking)
      const projRepeatRate = Math.min(35, 5 + boosts.repeat)
      const gross = inp.units * inp.seasonDays * (projOccupancy / 100) * projAdr
      const otaFees = gross * (projOtaPct / 100) * (inp.otaCommission / 100)
      const repeatBonus = (inp.units * inp.seasonDays * (inp.occupancy / 100) * inp.nightlyRate) * (projRepeatRate / 100) * 0.3
      return (gross - otaFees) + repeatBonus
    },
    comparisonRows: [
      { label: 'Gross Revenue', labelHR: 'Bruto prihod', current: (inp) => fmt(inp.units * inp.seasonDays * (inp.occupancy / 100) * inp.nightlyRate), projected: (inp, _, boosts) => fmt(inp.units * inp.seasonDays * (Math.min(95, inp.occupancy + boosts.occupancy) / 100) * (inp.nightlyRate * (1 + boosts.adr / 100))), good: () => true },
      { label: 'OTA Dependency', labelHR: 'Ovisnost o OTA', current: (inp) => fmtPct(inp.otaBookingPct), projected: (inp, _, boosts) => fmtPct(Math.max(30, inp.otaBookingPct - boosts.directBooking)), good: (inp, _, boosts) => Math.max(30, inp.otaBookingPct - boosts.directBooking) < inp.otaBookingPct },
      { label: 'Occupancy', labelHR: 'Popunjenost', current: (inp) => fmtPct(inp.occupancy), projected: (inp, _, boosts) => fmtPct(Math.min(95, inp.occupancy + boosts.occupancy)), good: (_inp, _, boosts) => boosts.occupancy > 0 },
      { label: 'Avg Daily Rate', labelHR: 'Prosj. dnevna cijena', current: (inp) => fmt(inp.nightlyRate), projected: (inp, _, boosts) => fmt(inp.nightlyRate * (1 + boosts.adr / 100)), good: (_, __, boosts) => boosts.adr > 0 },
      { label: 'Net Revenue', labelHR: 'Neto prihod', current: (_inp, base) => fmt(base.currentRevenue), projected: (_, base) => fmt(base.projectedRevenue), good: (_, base) => base.revenueUplift > 0 },
      { label: 'Repeat Guest Rate', labelHR: 'Stopa povratnih gostiju', current: () => '~5%', projected: (_, __, boosts) => fmtPct(Math.min(35, 5 + boosts.repeat)), good: () => true },
    ],
  },

  coaching: {
    vertical: 'coaching',
    businessName: '',
    location: '',
    inputs: [
      { id: 'monthlyLeads', label: 'Monthly Leads', labelHR: 'Mjesečni leadovi', defaultValue: 30, min: 5, max: 500 },
      { id: 'closeRate', label: 'Close Rate', labelHR: 'Stopa zatvaranja', defaultValue: 15, min: 1, max: 80, suffix: '%' },
      { id: 'avgPackagePrice', label: 'Avg Package Price', labelHR: 'Prosj. cijena paketa', defaultValue: 3000, min: 100, max: 50000, prefix: '€' },
      { id: 'monthlyClients', label: 'Active Clients', labelHR: 'Aktivni klijenti', defaultValue: 8, min: 1, max: 100 },
    ],
    services: COACHING_SERVICES,
    impactDimensions: [
      { id: 'conversionRate', label: 'Conversion Rate', labelHR: 'Stopa konverzije', cap: 40 },
      { id: 'leadVolume', label: 'Lead Volume', labelHR: 'Volumen leadova', cap: 50 },
      { id: 'closeRate', label: 'Close Rate', labelHR: 'Stopa zatvaranja', cap: 30 },
      { id: 'retention', label: 'Client Retention', labelHR: 'Zadržavanje klijenata', cap: 40 },
    ],
    revenueFormula: (inp) => inp.monthlyLeads * (inp.closeRate / 100) * inp.avgPackagePrice * 12,
    projectedRevenueFormula: (inp, boosts) => {
      const projLeads = inp.monthlyLeads * (1 + boosts.leadVolume / 100)
      const projClose = Math.min(80, inp.closeRate + boosts.closeRate)
      const projRetention = 1 + boosts.retention / 100
      return projLeads * (projClose / 100) * inp.avgPackagePrice * 12 * (projRetention * 0.3 + 0.7)
    },
    comparisonRows: [
      { label: 'Monthly Leads', labelHR: 'Mjesečni leadovi', current: (inp) => String(inp.monthlyLeads), projected: (inp, _, boosts) => String(Math.round(inp.monthlyLeads * (1 + boosts.leadVolume / 100))), good: () => true },
      { label: 'Close Rate', labelHR: 'Stopa zatvaranja', current: (inp) => fmtPct(inp.closeRate), projected: (inp, _, boosts) => fmtPct(Math.min(80, inp.closeRate + boosts.closeRate)), good: () => true },
      { label: 'Annual Revenue', labelHR: 'Godišnji prihod', current: (_, base) => fmt(base.currentRevenue), projected: (_, base) => fmt(base.projectedRevenue), good: (_, base) => base.revenueUplift > 0 },
    ],
  },

  b2b_saas: {
    vertical: 'b2b_saas',
    businessName: '',
    location: '',
    inputs: [
      { id: 'mrr', label: 'Monthly Recurring Revenue', labelHR: 'Mjesečni ponavljajući prihod', defaultValue: 15000, min: 500, max: 500000, prefix: '€' },
      { id: 'churnRate', label: 'Monthly Churn', labelHR: 'Mjesečni odljev', defaultValue: 5, min: 0.5, max: 20, step: 0.5, suffix: '%' },
      { id: 'monthlyTrials', label: 'Monthly Trial Signups', labelHR: 'Mjesečne probne registracije', defaultValue: 100, min: 10, max: 5000 },
      { id: 'trialToPayRate', label: 'Trial→Paid Rate', labelHR: 'Probna→Plaćena stopa', defaultValue: 12, min: 1, max: 50, suffix: '%' },
    ],
    services: B2B_SAAS_SERVICES,
    impactDimensions: [
      { id: 'trialConversion', label: 'Trial Conversion', labelHR: 'Konverzija probe', cap: 40 },
      { id: 'churnReduction', label: 'Churn Reduction', labelHR: 'Smanjenje odljeva', cap: 30 },
      { id: 'leadVolume', label: 'Lead Volume', labelHR: 'Volumen leadova', cap: 50 },
      { id: 'expansion', label: 'Expansion Revenue', labelHR: 'Prihod od ekspanzije', cap: 30 },
    ],
    revenueFormula: (inp) => inp.mrr * 12,
    projectedRevenueFormula: (inp, boosts) => {
      const projTrialRate = Math.min(50, inp.trialToPayRate * (1 + boosts.trialConversion / 100))
      const projChurn = Math.max(0.5, inp.churnRate * (1 - boosts.churnReduction / 100))
      const newMRR = inp.monthlyTrials * (projTrialRate / 100) * (inp.mrr / (inp.monthlyTrials * (inp.trialToPayRate / 100) || 1))
      const retainedMRR = inp.mrr * (1 - projChurn / 100)
      const expansionMRR = inp.mrr * (boosts.expansion / 100 / 12)
      return (retainedMRR + newMRR + expansionMRR) * 12
    },
    comparisonRows: [
      { label: 'ARR', labelHR: 'Godišnji ponavljajući prihod', current: (_, base) => fmt(base.currentRevenue), projected: (_, base) => fmt(base.projectedRevenue), good: (_, base) => base.revenueUplift > 0 },
      { label: 'Monthly Churn', labelHR: 'Mjesečni odljev', current: (inp) => fmtPct(inp.churnRate), projected: (inp, _, boosts) => fmtPct(Math.max(0.5, inp.churnRate * (1 - boosts.churnReduction / 100))), good: (_inp, _, boosts) => boosts.churnReduction > 0 },
      { label: 'Trial→Paid', labelHR: 'Probna→Plaćena', current: (inp) => fmtPct(inp.trialToPayRate), projected: (inp, _, boosts) => fmtPct(Math.min(50, inp.trialToPayRate * (1 + boosts.trialConversion / 100))), good: () => true },
    ],
  },

  legal: {
    vertical: 'legal',
    businessName: '',
    location: '',
    inputs: [
      { id: 'casesPerMonth', label: 'Cases / Month', labelHR: 'Predmeta / mjesečno', defaultValue: 12, min: 1, max: 100 },
      { id: 'avgFee', label: 'Avg Case Fee', labelHR: 'Prosj. naknada', defaultValue: 5000, min: 200, max: 100000, prefix: '€' },
      { id: 'winRate', label: 'Win Rate', labelHR: 'Stopa uspjeha', defaultValue: 70, min: 10, max: 100, suffix: '%' },
      { id: 'consultationsPerMonth', label: 'Consultations / Month', labelHR: 'Konzultacija / mjesečno', defaultValue: 25, min: 1, max: 200 },
    ],
    services: LEGAL_SERVICES,
    impactDimensions: [
      { id: 'consultations', label: 'Consultation Volume', labelHR: 'Volumen konzultacija', cap: 50 },
      { id: 'winRate', label: 'Win Rate', labelHR: 'Stopa uspjeha', cap: 10 },
      { id: 'clientValue', label: 'Client Value', labelHR: 'Vrijednost klijenta', cap: 30 },
      { id: 'referrals', label: 'Referral Rate', labelHR: 'Stopa preporuka', cap: 40 },
    ],
    revenueFormula: (inp) => inp.casesPerMonth * inp.avgFee * (inp.winRate / 100) * 12,
    projectedRevenueFormula: (inp, boosts) => {
      const projConsult = inp.consultationsPerMonth * (1 + boosts.consultations / 100)
      const projCases = Math.min(projConsult * 0.8, inp.casesPerMonth * (1 + boosts.consultations / 200))
      const projFee = inp.avgFee * (1 + boosts.clientValue / 100)
      const projWin = Math.min(95, inp.winRate + boosts.winRate)
      const referralBonus = inp.casesPerMonth * inp.avgFee * (boosts.referrals / 100) * 0.2
      return (projCases * projFee * (projWin / 100) * 12) + (referralBonus * 12)
    },
    comparisonRows: [
      { label: 'Monthly Cases', labelHR: 'Mjesečni predmeti', current: (inp) => String(inp.casesPerMonth), projected: (inp, _, boosts) => String(Math.round(inp.casesPerMonth * (1 + boosts.consultations / 200))), good: () => true },
      { label: 'Annual Revenue', labelHR: 'Godišnji prihod', current: (_, base) => fmt(base.currentRevenue), projected: (_, base) => fmt(base.projectedRevenue), good: (_, base) => base.revenueUplift > 0 },
    ],
  },

  ecommerce: {
    vertical: 'ecommerce',
    businessName: '',
    location: '',
    inputs: [
      { id: 'monthlyVisitors', label: 'Monthly Visitors', labelHR: 'Mjesečni posjetitelji', defaultValue: 10000, min: 100, max: 1000000 },
      { id: 'conversionRate', label: 'Conversion Rate', labelHR: 'Stopa konverzije', defaultValue: 2.5, min: 0.1, max: 20, step: 0.1, suffix: '%' },
      { id: 'avgOrderValue', label: 'Avg Order Value', labelHR: 'Prosj. vrijednost narudžbe', defaultValue: 65, min: 5, max: 5000, prefix: '€' },
      { id: 'returnRate', label: 'Return Customer %', labelHR: 'Postotak povratnih kupaca', defaultValue: 15, min: 0, max: 80, suffix: '%' },
    ],
    services: ECOMMERCE_SERVICES,
    impactDimensions: [
      { id: 'conversionRate', label: 'Conversion Rate', labelHR: 'Stopa konverzije', cap: 50 },
      { id: 'aov', label: 'Avg Order Value', labelHR: 'Prosj. vrijednost narudžbe', cap: 30 },
      { id: 'returnCustomers', label: 'Return Customers', labelHR: 'Povratni kupci', cap: 50 },
      { id: 'traffic', label: 'Traffic Volume', labelHR: 'Volumen prometa', cap: 50 },
    ],
    revenueFormula: (inp) => inp.monthlyVisitors * (inp.conversionRate / 100) * inp.avgOrderValue * 12,
    projectedRevenueFormula: (inp, boosts) => {
      const projVisitors = inp.monthlyVisitors * (1 + boosts.traffic / 100)
      const projConv = inp.conversionRate * (1 + boosts.conversionRate / 100)
      const projAOV = inp.avgOrderValue * (1 + boosts.aov / 100)
      const projReturn = Math.min(80, inp.returnRate + boosts.returnCustomers)
      const newOrders = projVisitors * (projConv / 100)
      const returnOrders = newOrders * (projReturn / 100)
      return (newOrders + returnOrders * 0.3) * projAOV * 12
    },
    comparisonRows: [
      { label: 'Monthly Orders', labelHR: 'Mjesečne narudžbe', current: (inp) => String(Math.round(inp.monthlyVisitors * (inp.conversionRate / 100))), projected: (inp, _, boosts) => String(Math.round(inp.monthlyVisitors * (1 + boosts.traffic / 100) * (inp.conversionRate * (1 + boosts.conversionRate / 100) / 100))), good: () => true },
      { label: 'Avg Order Value', labelHR: 'Prosj. vrijednost narudžbe', current: (inp) => fmt(inp.avgOrderValue), projected: (inp, _, boosts) => fmt(inp.avgOrderValue * (1 + boosts.aov / 100)), good: () => true },
      { label: 'Annual Revenue', labelHR: 'Godišnji prihod', current: (_, base) => fmt(base.currentRevenue), projected: (_, base) => fmt(base.projectedRevenue), good: (_, base) => base.revenueUplift > 0 },
    ],
  },

  restaurant: {
    vertical: 'restaurant',
    businessName: '',
    location: '',
    inputs: [
      { id: 'seats', label: 'Seats', labelHR: 'Mjesta', defaultValue: 60, min: 10, max: 500 },
      { id: 'turnsPerDay', label: 'Turns / Day', labelHR: 'Obrta / dan', defaultValue: 2, min: 1, max: 6, step: 0.5 },
      { id: 'avgCheck', label: 'Avg Check', labelHR: 'Prosj. račun', defaultValue: 25, min: 5, max: 200, prefix: '€' },
      { id: 'operatingDays', label: 'Operating Days / Year', labelHR: 'Radnih dana / godišnje', defaultValue: 300, min: 100, max: 365 },
    ],
    services: RESTAURANT_SERVICES,
    impactDimensions: [
      { id: 'covers', label: 'Covers / Day', labelHR: 'Gostiju / dan', cap: 40 },
      { id: 'avgCheck', label: 'Avg Check', labelHR: 'Prosj. račun', cap: 20 },
      { id: 'returnRate', label: 'Return Rate', labelHR: 'Stopa povratka', cap: 40 },
      { id: 'onlineOrders', label: 'Online Orders', labelHR: 'Online narudžbe', cap: 40 },
    ],
    revenueFormula: (inp) => inp.seats * inp.turnsPerDay * inp.avgCheck * inp.operatingDays,
    projectedRevenueFormula: (inp, boosts) => {
      const projCovers = inp.seats * inp.turnsPerDay * (1 + boosts.covers / 100)
      const projCheck = inp.avgCheck * (1 + boosts.avgCheck / 100)
      const onlineBonus = inp.seats * inp.turnsPerDay * inp.avgCheck * (boosts.onlineOrders / 100) * 0.3
      return (projCovers * projCheck * inp.operatingDays) + (onlineBonus * inp.operatingDays)
    },
    comparisonRows: [
      { label: 'Daily Covers', labelHR: 'Dnevni gosti', current: (inp) => String(Math.round(inp.seats * inp.turnsPerDay)), projected: (inp, _, boosts) => String(Math.round(inp.seats * inp.turnsPerDay * (1 + boosts.covers / 100))), good: () => true },
      { label: 'Avg Check', labelHR: 'Prosj. račun', current: (inp) => fmt(inp.avgCheck), projected: (inp, _, boosts) => fmt(inp.avgCheck * (1 + boosts.avgCheck / 100)), good: () => true },
      { label: 'Annual Revenue', labelHR: 'Godišnji prihod', current: (_, base) => fmt(base.currentRevenue), projected: (_, base) => fmt(base.projectedRevenue), good: (_, base) => base.revenueUplift > 0 },
    ],
  },
}

// ─── Utility ─────────────────────────────────────────────────────────────────

function fmt(n: number): string { return '€' + Math.round(n).toLocaleString('en') }
function fmtPct(n: number): string { return n.toFixed(1) + '%' }

// ─── Component ───────────────────────────────────────────────────────────────

export function ROICalculatorEngine({ config, compact = false }: { config: ProspectConfig; compact?: boolean }) {
  const [lang, setLang] = useState<'en' | 'hr'>('en')
  const t = i18n[lang]

  // Input state
  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {}
    config.inputs.forEach(inp => { init[inp.id] = inp.defaultValue })
    return init
  })

  // Service toggles
  const [enabledServices, setEnabledServices] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    config.services.forEach(s => { init[s.id] = s.enabledByDefault })
    return init
  })

  // Revenue pricing mode
  const [revenueAdjusted, setRevenueAdjusted] = useState(false)

  const setInput = (id: string, value: number) => setInputs(prev => ({ ...prev, [id]: value }))
  const toggleService = (id: string) => setEnabledServices(prev => ({ ...prev, [id]: !prev[id] }))

  // ─── Calculations ───
  const calculations = useMemo(() => {
    const active = config.services.filter(s => enabledServices[s.id])

    // Aggregate boosts (capped)
    const boosts: Record<string, number> = {}
    config.impactDimensions.forEach(dim => {
      const raw = active.reduce((sum, s) => sum + (s.impacts[dim.id] || 0), 0)
      boosts[dim.id] = Math.min(dim.cap, raw)
    })

    const currentRevenue = config.revenueFormula(inputs)
    const projectedRevenue = config.projectedRevenueFormula(inputs, boosts)
    const revenueUplift = projectedRevenue - currentRevenue
    const upliftPct = currentRevenue > 0 ? (revenueUplift / currentRevenue) * 100 : 0

    // Pricing
    const multiplier = revenueAdjusted
      ? getRevenueMultiplier(currentRevenue, config.referenceRevenue || 100_000, config.pricingFloor || 0.5, config.pricingCap || 5.0)
      : 1.0

    const totalSetup = active.reduce((s, sv) => s + sv.baseSetupCost * multiplier, 0)
    const totalMonthly = active.reduce((s, sv) => s + sv.baseMonthlyCost * multiplier, 0)
    const yearOneCost = totalSetup + (totalMonthly * 12)
    const roi = yearOneCost > 0 ? (revenueUplift / yearOneCost) * 100 : 0

    // Man-hours
    const totalHoursMin = active.reduce((s, sv) => s + sv.buildHoursMin, 0)
    const totalHoursMax = active.reduce((s, sv) => s + sv.buildHoursMax, 0)
    const effectiveRate = totalSetup > 0 && totalHoursMax > 0 ? totalSetup / totalHoursMax : 0

    const base: ComputedBase = { currentRevenue, projectedRevenue, revenueUplift }

    return { active, boosts, currentRevenue, projectedRevenue, revenueUplift, upliftPct, multiplier, totalSetup, totalMonthly, yearOneCost, roi, totalHoursMin, totalHoursMax, effectiveRate, base }
  }, [inputs, enabledServices, revenueAdjusted, config])

  const { active, boosts, revenueUplift, upliftPct, multiplier, totalSetup, totalMonthly, yearOneCost, roi, totalHoursMin, totalHoursMax, effectiveRate, base } = calculations

  // ─── Editable Input Component ───
  const NumInput = ({ label, value, onChange, min = 0, max = 999999, step = 1, suffix = '', prefix = '' }: {
    label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; suffix?: string; prefix?: string
  }) => (
    <div>
      <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">{label}</label>
      <div className="flex items-center gap-1.5">
        {prefix && <span className="text-xs text-zinc-500">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
          min={min} max={max} step={step}
          className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-sm font-bold text-white focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix && <span className="text-xs text-zinc-500">{suffix}</span>}
      </div>
    </div>
  )

  return (
    <div className="space-y-5">
      {/* Language Toggle */}
      <div className="flex items-center justify-end gap-2">
        <Languages size={14} className="text-zinc-500" />
        <button
          onClick={() => setLang(l => l === 'en' ? 'hr' : 'en')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all"
        >
          <span className={`text-xs font-bold transition-colors ${lang === 'en' ? 'text-violet-400' : 'text-zinc-600'}`}>EN</span>
          <span className="text-zinc-600 text-xs">/</span>
          <span className={`text-xs font-bold transition-colors ${lang === 'hr' ? 'text-violet-400' : 'text-zinc-600'}`}>HR</span>
        </button>
      </div>

      <div className={`grid grid-cols-1 ${compact ? '' : 'lg:grid-cols-2'} gap-5`}>
        {/* LEFT: Inputs + Service Toggles */}
        <div className="space-y-4">
          {/* Current Business Inputs */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calculator size={14} className="text-violet-400" />
              <p className="text-xs uppercase tracking-wider text-violet-400 font-semibold">{t.yourNumbers}</p>
              <span className="text-[9px] text-zinc-600 ml-auto">{t.editAny}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {config.inputs.map(inp => (
                <NumInput
                  key={inp.id}
                  label={lang === 'hr' && inp.labelHR ? inp.labelHR : inp.label}
                  value={inputs[inp.id]}
                  onChange={(v) => setInput(inp.id, v)}
                  min={inp.min} max={inp.max} step={inp.step || 1}
                  prefix={inp.prefix} suffix={inp.suffix}
                />
              ))}
            </div>
          </div>

          {/* Service Toggles */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-emerald-400" />
              <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">{t.selectServices}</p>
              <span className="text-[9px] text-zinc-600 ml-auto">{t.toggleOnOff}</span>
            </div>
            <div className="space-y-1.5">
              {config.services.map(s => {
                const Icon = ICON_MAP[s.icon] || Zap
                const enabled = enabledServices[s.id]
                const setupPrice = s.baseSetupCost * multiplier
                const monthlyPrice = s.baseMonthlyCost * multiplier
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left ${
                      enabled ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-white/[0.02] border border-white/[0.06] opacity-60 hover:opacity-80'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md ${enabled ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-zinc-600'}`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium ${enabled ? 'text-white' : 'text-zinc-500'}`}>
                        {lang === 'hr' && s.labelHR ? s.labelHR : s.label}
                      </p>
                      <p className="text-[9px] text-zinc-600">
                        {t.setup}: {fmt(setupPrice)}{monthlyPrice > 0 ? ` + ${fmt(monthlyPrice)}${t.mo}` : ''}
                        {' · '}{s.buildHoursMin}-{s.buildHoursMax}{t.hours}
                      </p>
                    </div>
                    {enabled ? (
                      <ToggleRight size={20} className="text-violet-400 flex-shrink-0" />
                    ) : (
                      <ToggleLeft size={20} className="text-zinc-600 flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Pricing Toggle */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-400">{t.pricing}</p>
                <p className="text-[9px] text-zinc-600">
                  {revenueAdjusted ? `${multiplier.toFixed(1)}x ${t.revenueAdjusted}` : `1.0x ${t.standard}`}
                </p>
              </div>
              <button
                onClick={() => setRevenueAdjusted(r => !r)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                  revenueAdjusted ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' : 'bg-white/[0.03] border-white/10 text-zinc-500'
                }`}
              >
                {revenueAdjusted ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                <span className="text-xs font-medium">{revenueAdjusted ? t.revenueAdjusted : t.standard}</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Results */}
        <div className="space-y-4">
          {/* Comparison Table */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3">{t.currentVsProjected}</p>
            <div className="space-y-3">
              {config.comparisonRows.map(row => (
                <div key={row.label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                  <span className="text-xs text-zinc-400">{lang === 'hr' && row.labelHR ? row.labelHR : row.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-600 w-20 text-right">{row.current(inputs, base)}</span>
                    <ArrowRight size={12} className="text-zinc-600" />
                    <span className={`text-xs font-bold w-20 text-right ${row.good(inputs, base, boosts) ? 'text-emerald-400' : 'text-red-400'}`}>
                      {row.projected(inputs, base, boosts)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Uplift Hero */}
          <div className={`rounded-xl p-5 text-center border ${revenueUplift > 0 ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">{t.projectedUplift}</p>
            <p className={`text-4xl font-black ${revenueUplift > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {revenueUplift > 0 ? '+' : ''}{fmt(revenueUplift)}
            </p>
            <p className={`text-sm font-bold mt-1 ${revenueUplift > 0 ? 'text-emerald-300' : 'text-red-300'}`}>
              {revenueUplift > 0 ? '+' : ''}{upliftPct.toFixed(0)}% {t.netRevenueIncrease}
            </p>
          </div>

          {/* Man-Hours Section */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className="text-cyan-400" />
              <p className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">{t.expertHours}</p>
            </div>
            <div className="space-y-1.5 mb-3">
              {active.map(s => (
                <div key={s.id} className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">{lang === 'hr' && s.labelHR ? s.labelHR : s.label}</span>
                  <span className="text-cyan-300 font-mono font-bold">{s.buildHoursMin}-{s.buildHoursMax}{t.hours}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-cyan-500/20 pt-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-300">{t.totalHours}</span>
                <span className="text-sm font-black text-cyan-300">{totalHoursMin}-{totalHoursMax}{t.hours}</span>
              </div>
              {effectiveRate > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-300">{t.effectiveRate}</span>
                  <span className="text-sm font-black text-cyan-300">{fmt(effectiveRate)}{t.perHour}</span>
                </div>
              )}
            </div>
            <p className="text-[10px] text-zinc-600 mt-2 italic">{t.buildYourMachine}</p>
          </div>

          {/* Investment & ROI */}
          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
            <p className="text-xs uppercase tracking-wider text-violet-400 font-semibold mb-3">{t.investReturn}</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-[10px] text-zinc-500">{t.oneTimeSetup}</p>
                <p className="text-lg font-black text-white">{fmt(totalSetup)}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500">{t.monthlyCost}</p>
                <p className="text-lg font-black text-white">{fmt(totalMonthly)}<span className="text-xs text-zinc-500">{t.mo}</span></p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500">{t.yearOneTotal}</p>
                <p className="text-lg font-black text-violet-400">{fmt(yearOneCost)}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500">{t.yearOneROI}</p>
                <p className={`text-lg font-black ${roi > 100 ? 'text-emerald-400' : roi > 0 ? 'text-amber-400' : 'text-red-400'}`}>
                  {roi.toFixed(0)}%
                </p>
              </div>
            </div>
            <div className="h-3 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, roi))}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full rounded-full ${roi > 100 ? 'bg-emerald-500' : roi > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-zinc-600">0%</span>
              <span className="text-[9px] text-zinc-600">{t.breakEven}</span>
              <span className="text-[9px] text-zinc-600">200%+</span>
            </div>
          </div>

          {/* Payback Period */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{t.paybackPeriod}</p>
                <p className="text-xl font-black text-white">
                  {revenueUplift > 0 ? `${Math.ceil(yearOneCost / (revenueUplift / 12))} ${t.months}` : '—'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{t.fiveYearGain}</p>
                <p className="text-xl font-black text-emerald-400">
                  {fmt(Math.max(0, (revenueUplift * 5) - totalSetup - (totalMonthly * 60)))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
