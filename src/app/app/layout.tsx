import { AuthProvider } from "@/lib/supabase/auth-context";
import { Sidebar } from "@/components/app/Sidebar";
import { BottomNav } from "@/components/app/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white flex">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-60 shrink-0">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <BottomNav />
    </AuthProvider>
  );
}
