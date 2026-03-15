'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calculator, Building2, Briefcase, Laptop, Scale, ShoppingCart, UtensilsCrossed, Plus
} from 'lucide-react'
import { ROICalculatorEngine, INDUSTRY_PRESETS, type ProspectConfig } from '@/components/ROICalculatorEngine'

const VERTICALS: Record<string, { icon: React.ComponentType<any>; label: string; color: string; bg: string }> = {
  hospitality: { icon: Building2, label: 'Hospitality', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  coaching: { icon: Briefcase, label: 'Coaching', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  b2b_saas: { icon: Laptop, label: 'B2B SaaS', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  legal: { icon: Scale, label: 'Legal', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ecommerce: { icon: ShoppingCart, label: 'E-Commerce', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  restaurant: { icon: UtensilsCrossed, label: 'Restaurant', color: 'text-pink-400', bg: 'bg-pink-500/10' },
}

export default function ROICalculatorPage() {
  const [activeVertical, setActiveVertical] = useState<string | null>(null)
  const [config, setConfig] = useState<ProspectConfig | null>(null)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  const openCalc = (vertical: string) => {
    const preset = INDUSTRY_PRESETS[vertical]
    if (!preset) return
    setActiveVertical(vertical)
    setConfig({ ...preset, businessName: name || '', location: location || '' })
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400">
              <Calculator size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">ROI Calculator Engine</h1>
              <p className="text-sm text-zinc-500">Universal revenue projection tool — works for any industry</p>
            </div>
          </div>
        </motion.div>

        {/* Prospect Quick-Fill */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Business Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Hotel Marina, Coaching Co..."
              className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/20 transition-all" />
          </div>
          <div>
            <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Location</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Zagreb, Croatia"
              className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/20 transition-all" />
          </div>
        </div>

        {/* Vertical Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {Object.entries(VERTICALS).map(([key, cfg]) => {
            const Icon = cfg.icon
            const isActive = activeVertical === key
            return (
              <button key={key} onClick={() => openCalc(key)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                  isActive ? `${cfg.bg} border-current/20 ${cfg.color}` : 'bg-white/[0.02] border-white/[0.06] text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-300'
                }`}>
                <Icon size={22} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{cfg.label}</span>
              </button>
            )
          })}
        </div>

        {/* Calculator */}
        {config && activeVertical ? (
          <motion.div key={activeVertical} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
              <div className={`p-1.5 rounded-lg ${VERTICALS[activeVertical].bg} ${VERTICALS[activeVertical].color}`}>
                {(() => { const Icon = VERTICALS[activeVertical].icon; return <Icon size={16} /> })()}
              </div>
              <p className="text-sm font-bold text-white">{name || VERTICALS[activeVertical].label} ROI Projection</p>
              {location && <span className="text-xs text-zinc-500">· {location}</span>}
            </div>
            <ROICalculatorEngine config={config} />
          </motion.div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
            <Plus size={40} className="text-zinc-800 mx-auto mb-3" />
            <p className="text-sm text-zinc-600">Select an industry above to generate ROI projections</p>
            <p className="text-[10px] text-zinc-700 mt-1">Works for any prospect in any vertical</p>
          </div>
        )}
      </div>
    </div>
  )
}
