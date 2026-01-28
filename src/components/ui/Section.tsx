import { Reveal } from "./Reveal";

interface SectionProps {
    id?: string;
    subtitle: string;
    title: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    dark?: boolean;
}

export const Section = ({ id, subtitle, title, children, className = "", dark = false }: SectionProps) => {
    return (
        <section id={id} className={`min-h-screen py-32 px-4 md:px-8 flex flex-col items-center justify-center relative border-t border-white/5 ${dark ? 'bg-zinc-950' : 'bg-black'} ${className}`}>
            <Reveal className="w-full max-w-[1400px]">
                <span className="block text-xs font-sans uppercase tracking-[0.2em] text-zinc-500 mb-8 ml-1">{subtitle}</span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-wide font-bold uppercase leading-[0.9] text-white mb-24">
                    {title}
                </h2>
                {children}
            </Reveal>
        </section>
    )
}
