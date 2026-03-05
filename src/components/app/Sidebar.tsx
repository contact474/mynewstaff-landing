"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, useSubscription } from "@/lib/supabase/auth-context";
import { SubscriptionBadge } from "./SubscriptionBadge";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

function IconDashboard() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconScans() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2.75" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="1.75" x2="8" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="12.5" x2="8" y2="14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1.75" y1="8" x2="3.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12.5" y1="8" x2="14.25" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPlaybooks() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2.75" y="1.75" width="10.5" height="12.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="10.5" x2="8.5" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconAITools() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.75L9.5 5.5L13.25 5.5L10.25 7.75L11.25 11.5L8 9.25L4.75 11.5L5.75 7.75L2.75 5.5L6.5 5.5L8 1.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.36 3.64l-1.06 1.06M4.7 11.3l-1.06 1.06M12.36 12.36l-1.06-1.06M4.7 4.7L3.64 3.64"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSignOut() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.5 10.5L13.25 8L10.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="13.25" y1="8" x2="6.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/app/dashboard", icon: <IconDashboard /> },
  { label: "Scans", href: "/app/scans", icon: <IconScans /> },
  { label: "Playbooks", href: "/app/playbooks", icon: <IconPlaybooks /> },
  { label: "AI Tools", href: "/app/ai-tools", icon: <IconAITools /> },
  { label: "Settings", href: "/app/settings", icon: <IconSettings /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const subscription = useSubscription();

  function isActive(href: string) {
    if (href === "/app/dashboard") return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed top-0 left-0 h-full w-60 bg-black border-r border-white/10 flex flex-col py-8 px-4 z-40">
      {/* Brand */}
      <div className="mb-10 px-2">
        <Link href="/app/dashboard" className="block">
          <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 block mb-0.5">ScaleX</span>
          <span className="text-base font-wide font-bold uppercase tracking-wider text-white">AI</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 px-3 py-2.5 text-sm font-sans transition-colors relative",
                active
                  ? "text-white border-l-2 border-white -ml-px pl-[11px]"
                  : "text-zinc-500 hover:text-zinc-300 border-l-2 border-transparent -ml-px pl-[11px]",
              ].join(" ")}
            >
              <span className={active ? "text-white" : "text-zinc-500"}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        {/* Current tier */}
        <div className="px-3">
          <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-2">Current Plan</p>
          <SubscriptionBadge tier={subscription.tier} />
        </div>

        {/* Sign out */}
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2 w-full text-sm font-sans text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
        >
          <IconSignOut />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
