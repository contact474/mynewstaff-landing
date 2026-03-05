"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth, useSubscription } from "@/lib/supabase/auth-context";
import { createClient } from "@/lib/supabase/client";
import { SubscriptionBadge } from "@/components/app/SubscriptionBadge";
import type { Profile } from "@/lib/supabase/types";

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9.5 4.5L13 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const subscription = useSubscription();

  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [locale, setLocale] = useState<"en" | "es">("en");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user) return;

    const supabase = createClient();

    async function fetchProfile() {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();

      if (data) {
        setProfile(data as Profile);
        setFullName(data.full_name ?? "");
        setCompany(data.company_name ?? "");
        setLocale(data.locale ?? "en");
      }
    }

    fetchProfile();
  }, [user]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: fullName.trim() || null,
        company_name: company.trim() || null,
        locale,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      setSaveError("Failed to save. Please try again.");
    } else {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
    setSaving(false);
  }

  async function handleDeleteAccount() {
    if (deleteInput !== "DELETE") return;
    if (!user) return;
    setDeleting(true);

    // Sign out first then let the server handle deletion
    await signOut();
  }

  const periodEnd = subscription.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 md:p-10 max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-1">Account</p>
        <h1 className="text-2xl md:text-3xl font-wide font-bold uppercase text-white">Settings</h1>
      </div>

      {/* Profile section */}
      <section className="border border-white/10 p-6 mb-6">
        <h2 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">
          Profile
        </h2>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-sans mb-2">
              Email
            </label>
            <input
              type="email"
              value={user?.email ?? ""}
              disabled
              className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm font-sans text-zinc-500 outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-sans mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm font-sans text-white outline-none focus:border-white/60 transition-colors placeholder:text-zinc-700"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-sans mb-2">
              Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company"
              className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm font-sans text-white outline-none focus:border-white/60 transition-colors placeholder:text-zinc-700"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-sans mb-2">
              Preferred Language
            </label>
            <div className="flex gap-3 mt-1">
              {(["en", "es"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLocale(l)}
                  className={[
                    "px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-sans border transition-colors cursor-pointer",
                    locale === l
                      ? "border-white text-white"
                      : "border-white/20 text-zinc-500 hover:border-white/40 hover:text-zinc-300",
                  ].join(" ")}
                >
                  {l === "en" ? "English" : "Spanish"}
                </button>
              ))}
            </div>
          </div>

          {saveError && (
            <p className="text-xs text-red-400 font-sans">{saveError}</p>
          )}

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-white text-black text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {saveSuccess && (
              <span className="text-[10px] tracking-[0.15em] uppercase text-emerald-400 font-sans">
                Saved
              </span>
            )}
          </div>
        </form>
      </section>

      {/* Subscription section */}
      <section className="border border-white/10 p-6 mb-6">
        <h2 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">
          Subscription
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-sans text-white">Current Plan</p>
            <SubscriptionBadge tier={subscription.tier} />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-sans text-zinc-400">Status</p>
            <span className="text-[10px] tracking-[0.15em] uppercase text-zinc-300 font-sans capitalize">
              {subscription.status}
            </span>
          </div>

          {periodEnd && (
            <div className="flex items-center justify-between">
              <p className="text-sm font-sans text-zinc-400">
                {subscription.cancelAtPeriodEnd ? "Cancels on" : "Renews on"}
              </p>
              <span className="text-[10px] tracking-[0.1em] text-zinc-300 font-sans">{periodEnd}</span>
            </div>
          )}

          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row gap-3">
            {subscription.tier === "free" && (
              <Link
                href="/scalex/pricing"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white/90 transition-colors"
              >
                Upgrade Plan <IconArrow />
              </Link>
            )}
            {subscription.tier !== "free" && (
              <>
                <Link
                  href="/scalex/pricing"
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/20 text-white text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-white/[0.03] transition-colors"
                >
                  Change Plan <IconArrow />
                </Link>
                <a
                  href="https://whop.com/manage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/20 text-white text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-white/[0.03] transition-colors"
                >
                  Manage Billing <IconArrow />
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Account actions */}
      <section className="border border-white/10 p-6 mb-6">
        <h2 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-sans mb-6">
          Account
        </h2>

        <button
          onClick={signOut}
          className="flex items-center gap-2 px-5 py-3 border border-white/20 text-white text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-white/[0.03] transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </section>

      {/* Danger zone */}
      <section className="border border-red-400/20 p-6">
        <h2 className="text-[10px] tracking-[0.3em] uppercase text-red-400/70 font-sans mb-2">
          Danger Zone
        </h2>
        <p className="text-xs font-sans text-zinc-500 mb-5">
          Permanently delete your account and all associated data. This cannot be undone.
        </p>

        {!deleteConfirm ? (
          <button
            onClick={() => setDeleteConfirm(true)}
            className="px-5 py-3 border border-red-400/30 text-red-400 text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-red-400/5 transition-colors cursor-pointer"
          >
            Delete Account
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-xs font-sans text-zinc-400">
              Type <strong className="text-white">DELETE</strong> to confirm account deletion.
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder="DELETE"
              className="w-full max-w-xs bg-transparent border-b border-red-400/30 py-2.5 text-sm font-sans text-white outline-none focus:border-red-400/60 transition-colors placeholder:text-zinc-700"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={deleteInput !== "DELETE" || deleting}
                className="px-5 py-3 bg-red-500 text-white text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
              <button
                onClick={() => { setDeleteConfirm(false); setDeleteInput(""); }}
                className="px-5 py-3 border border-white/20 text-zinc-400 text-[10px] tracking-[0.2em] uppercase font-sans hover:border-white/40 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </motion.div>
  );
}
