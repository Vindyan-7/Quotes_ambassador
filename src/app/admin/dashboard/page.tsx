import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/admin/dashboard-client";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) redirect("/admin");

  const supabase = createAdminClient();

  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("Supabase dashboard error:", error);
    return (
      <main className="min-h-screen bg-[#090b10] text-white p-8">
        <div className="max-w-3xl mx-auto rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h1 className="text-xl font-bold text-red-400 mb-3">
            Failed to load admin data
          </h1>
          <pre className="text-xs text-zinc-300 whitespace-pre-wrap overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </main>
    );
  }

  return <AdminDashboardClient applications={applications ?? []} />;
}