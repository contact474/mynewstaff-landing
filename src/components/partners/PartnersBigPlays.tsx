import { Reveal } from "@/components/ui/Reveal";

export function PartnersBigPlays() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-zinc-950">
      <Reveal className="max-w-5xl mx-auto text-center mb-16">
        <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8">
          For Operators
        </span>
        <h2 className="text-3xl md:text-6xl lg:text-7xl font-wide font-bold uppercase leading-[0.9] text-white">
          BIGGER <span className="shimmer-text">PLAYS.</span>
        </h2>
      </Reveal>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Option A */}
        <Reveal className="border border-white/10">
          <div className="p-10 md:p-12 h-full flex flex-col">
            <span className="block text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-4 font-sans">
              Option A
            </span>
            <h3 className="font-wide text-2xl md:text-3xl uppercase text-white mb-2">
              BUSINESS-IN-A-BOX
            </h3>
            <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans mb-1">
              Franchise Model
            </p>
            <p className="text-sm text-zinc-400 font-sans mb-6">
              Value: <span className="text-white">$7,500</span>
            </p>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">
              Turn your audience into a revenue engine by selling MyNewStaff.ai
              services <strong className="text-white">under your brand</strong>.
              We fulfill delivery behind the scenes. You earn{" "}
              <strong className="text-white">
                30% commission on all sales
              </strong>{" "}
              (cash collected).
            </p>

            <div className="border-t border-white/5 pt-6 mt-auto">
              <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-3 font-sans">
                Includes
              </span>
              <ul className="space-y-2">
                {[
                  "White-label offer kit (positioning + package structure)",
                  "Sales assets (deck + scripts + DM flow)",
                  "Delivery playbook + fulfillment pipeline",
                  '"What to sell" menu: Mission Control, lead gen, content systems',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-zinc-400 font-sans leading-relaxed"
                  >
                    <span className="text-zinc-600 mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-zinc-600 font-sans mt-4">
                Delivery: 7–10 business days (after alignment call)
              </p>
            </div>
          </div>
        </Reveal>

        {/* Option B */}
        <Reveal delay={0.1} className="border border-white/10 md:border-l-0">
          <div className="p-10 md:p-12 h-full flex flex-col bg-zinc-900/30">
            <span className="block text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-4 font-sans">
              Option B
            </span>
            <h3 className="font-wide text-2xl md:text-3xl uppercase text-white mb-2">
              90-DAY BLITZ
            </h3>
            <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-sans mb-1">
              Full-Scale Build
            </p>
            <p className="text-sm text-zinc-400 font-sans mb-6">
              Value: <span className="text-white">$71,900</span>
            </p>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
              We build, launch, and scale your business with a full system.
              Content, outreach, conversion assets, and growth ops — driving a{" "}
              <strong className="text-white">
                5x step-change in visibility + pipeline
              </strong>
              .
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                "Build the machine",
                "Launch the offer",
                "Scale distribution",
                "Drive 5x growth",
              ].map((phase, i) => (
                <div key={i} className="p-3 border border-white/5 text-center">
                  <span className="text-[10px] text-zinc-400 font-sans">
                    {phase}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-6 mt-auto">
              <span className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-3 font-sans">
                Includes
              </span>
              <ul className="space-y-2">
                {[
                  "Brand + offer architecture",
                  "Landing pages + conversion assets",
                  "Press / media kit",
                  "Content production system (monthly)",
                  "Lead gen + outreach system",
                  "Mission Control buildout (CRM + automation)",
                  "Weekly optimization cadence for 90 days",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-zinc-400 font-sans leading-relaxed"
                  >
                    <span className="text-zinc-600 mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-zinc-600 font-sans mt-4">
                Delivery: 90 days (weekly milestones)
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
