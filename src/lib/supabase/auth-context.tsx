"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "./client";
import type { User } from "@supabase/supabase-js";
import type { Tier } from "@/lib/tiers";

interface Subscription {
  tier: Tier;
  status: "active" | "trialing" | "past_due" | "canceled" | "unpaid";
  whopMembershipId: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

interface AuthContextType {
  user: User | null;
  subscription: Subscription;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
}

const DEFAULT_SUBSCRIPTION: Subscription = {
  tier: "free",
  status: "active",
  whopMembershipId: null,
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  subscription: DEFAULT_SUBSCRIPTION,
  loading: true,
  signOut: async () => {},
  refreshSubscription: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription>(DEFAULT_SUBSCRIPTION);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function fetchSubscription(userId: string) {
    const { data } = await supabase
      .from("subscriptions")
      .select("tier, status, whop_membership_id, current_period_end, cancel_at_period_end")
      .eq("user_id", userId)
      .single();

    if (data) {
      setSubscription({
        tier: data.tier as Tier,
        status: data.status,
        whopMembershipId: data.whop_membership_id,
        currentPeriodEnd: data.current_period_end,
        cancelAtPeriodEnd: data.cancel_at_period_end,
      });
    }
  }

  useEffect(() => {
    const {
      data: { subscription: authSub },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        await fetchSubscription(u.id);
      } else {
        setSubscription(DEFAULT_SUBSCRIPTION);
      }
      setLoading(false);
    });

    return () => authSub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setSubscription(DEFAULT_SUBSCRIPTION);
  }

  async function refreshSubscription() {
    if (user) await fetchSubscription(user.id);
  }

  return (
    <AuthContext.Provider value={{ user, subscription, loading, signOut, refreshSubscription }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useSubscription() {
  const { subscription } = useContext(AuthContext);
  return subscription;
}
