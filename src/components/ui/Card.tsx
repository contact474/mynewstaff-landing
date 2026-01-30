import { Reveal } from "./Reveal";

interface CardProps {
    label: string;
    value: string;
    desc: string;
    detail?: string;
    highlight?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const Card = ({ label, value, desc, detail, highlight = false, className = "", children }: CardProps) => {
    return (
        <div className={`p-8 md:p-10 border border-white/10 flex flex-col justify-between h-full items-center text-center ${highlight ? 'bg-zinc-900/50 border-white/20' : 'bg-transparent'} ${className}`}>
            <div>
                <span className={`block text-[10px] tracking-[0.4em] uppercase mb-4 ${highlight ? 'text-white' : 'text-zinc-500'}`}>{label}</span>
                <h3 className={`font-wide text-2xl uppercase mb-2 ${highlight ? 'text-white' : 'text-white'}`}>{value}</h3>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <p className="text-xs text-zinc-500 leading-relaxed max-w-[200px]">{desc}</p>
                {detail && (
                    <p className="text-[10px] text-zinc-400 leading-relaxed max-w-[220px] pt-4 border-t border-white/5">
                        {detail}
                    </p>
                )}
                {children && <div className="mt-6 pt-6 border-t border-white/5 w-full flex justify-center">{children}</div>}
            </div>
        </div>
    )
}

export const Grid = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-white/10 ${className}`}>
            {children}
        </div>
    )
}
