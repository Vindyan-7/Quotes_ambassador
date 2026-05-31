"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Users, GraduationCap, Building2, TrendingUp,
  Search, LogOut, ChevronDown, Eye, Download,
  CheckCircle, Clock, XCircle, Star, Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

type Application = {
  id: string;
  reference_id: string;
  full_name: string;
  college_email: string;
  mobile: string;
  date_of_birth: string;
  city: string;
  college_name: string;
  degree: string;
  year_of_study: number;
  graduation_year: number;
  branch: string;
  current_semester: number;
  linkedin_url?: string | null;
  instagram_handle?: string | null;
  bio: string;
  areas_of_interest: string[];
  social_platforms: string;
  why_ambassador: string;
  why_choose_you: string;
  leadership_experience: string;
  prior_experience: string;
  hours_per_week: string;
  content_creation: boolean;
  status?: string;
  source?: string | null;
  device_type?: string | null;
  submitted_at: string;
  updated_at: string;
};

const STATUS_OPTIONS = ["new", "reviewing", "shortlisted", "selected", "rejected"];

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  reviewing: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  shortlisted: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  selected: "bg-green-500/15 text-green-400 border-green-500/20",
  rejected: "bg-red-500/15 text-red-400 border-red-500/20",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  new: <Clock size={11} />,
  reviewing: <Eye size={11} />,
  shortlisted: <Star size={11} />,
  selected: <CheckCircle size={11} />,
  rejected: <XCircle size={11} />,
};

export default function AdminDashboardClient({ applications }: { applications: Application[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCollege, setFilterCollege] = useState("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Derived stats
  const stats = useMemo(() => {
    const colleges = new Set(applications.map((a) => a.college_name)).size;
    const selected = applications.filter((a) => a.status === "selected").length;
    const thisWeek = applications.filter((a) => {
      const d = new Date(a.submitted_at);
      const now = new Date();
      return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
    }).length;
    return { total: applications.length, colleges, selected, thisWeek };
  }, [applications]);

  const colleges = useMemo(() =>
    ["all", ...Array.from(new Set(applications.map((a) => a.college_name)))],
    [applications]
  );

  const filtered = useMemo(() => applications.filter((a) => {
    const matchSearch =
      a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      a.college_email.toLowerCase().includes(search.toLowerCase()) ||
      a.college_name.toLowerCase().includes(search.toLowerCase()) ||
      a.reference_id?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || (a.status ?? "new") === filterStatus;
    const matchCollege = filterCollege === "all" || a.college_name === filterCollege;
    return matchSearch && matchStatus && matchCollege;
  }), [applications, search, filterStatus, filterCollege]);

  // College breakdown for analytics
  const collegeBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    applications.forEach((a) => {
      map[a.college_name] = (map[a.college_name] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [applications]);

  const branchBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    applications.forEach((a) => {
      map[a.branch] = (map[a.branch] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [applications]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch("/api/admin/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setUpdating(null);
    router.refresh();
  };

  const deleteApplication = async () => {
    if (!deleteTarget) return;

    setDeleting(true);

    const res = await fetch("/api/admin/delete-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteTarget.id }),
    });

    setDeleting(false);

    if (res.ok) {
      setDeleteTarget(null);
      setSelectedApp(null);
      router.refresh();
    } else {
      alert("Failed to delete application.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const exportCSV = () => {
    const headers = ["Reference ID", "Name", "Email", "Mobile", "College", "Branch", "Degree", "Year", "City", "Status", "Applied On"];
    const rows = filtered.map((a) => [
      a.reference_id, a.full_name, a.college_email, a.mobile,
      a.college_name, a.branch, a.degree, a.year_of_study,
      a.city, a.status ?? "new", new Date(a.submitted_at).toLocaleDateString()
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "applications.csv"; a.click();
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-dq-text">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0f1117]/95 backdrop-blur border-b border-dq-border px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display font-extrabold text-white">
            Data<span className="text-dq-gold">Quotes</span>
          </span>
          <span className="text-dq-faint text-xs hidden sm:block">/ Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dq-border text-dq-muted hover:text-white hover:border-dq-gold/40 text-xs font-display transition-all"
          >
            <Download size={13} /> Export CSV
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dq-border text-dq-muted hover:text-red-400 hover:border-red-400/30 text-xs font-display transition-all"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Applications", value: stats.total, icon: <Users size={18} />, color: "text-blue-400" },
            { label: "Colleges", value: stats.colleges, icon: <Building2 size={18} />, color: "text-dq-gold" },
            { label: "Selected", value: stats.selected, icon: <CheckCircle size={18} />, color: "text-green-400" },
            { label: "This Week", value: stats.thisWeek, icon: <TrendingUp size={18} />, color: "text-purple-400" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-5 border border-dq-border">
              <div className={cn("mb-2", s.color)}>{s.icon}</div>
              <div className="font-display font-extrabold text-2xl text-white">{s.value}</div>
              <div className="text-dq-muted text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Analytics row */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* College breakdown */}
          <div className="glass-card rounded-xl p-5 border border-dq-border">
            <h3 className="font-display font-semibold text-white text-sm mb-4 flex items-center gap-2">
              <Building2 size={15} className="text-dq-gold" /> Top Colleges
            </h3>
            <div className="space-y-3">
              {collegeBreakdown.map(([college, count]) => (
                <div key={college}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-dq-muted truncate pr-4">{college}</span>
                    <span className="text-white font-display font-semibold flex-shrink-0">{count}</span>
                  </div>
                  <div className="h-1.5 bg-dq-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-dq-gold rounded-full"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {collegeBreakdown.length === 0 && <p className="text-dq-faint text-xs">No data yet</p>}
            </div>
          </div>

          {/* Branch breakdown */}
          <div className="glass-card rounded-xl p-5 border border-dq-border">
            <h3 className="font-display font-semibold text-white text-sm mb-4 flex items-center gap-2">
              <GraduationCap size={15} className="text-dq-gold" /> Branch Distribution
            </h3>
            <div className="space-y-3">
              {branchBreakdown.map(([branch, count]) => (
                <div key={branch}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-dq-muted">{branch}</span>
                    <span className="text-white font-display font-semibold">{count}</span>
                  </div>
                  <div className="h-1.5 bg-dq-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {branchBreakdown.length === 0 && <p className="text-dq-faint text-xs">No data yet</p>}
            </div>
          </div>
        </div>

        {/* Filters + Table */}
        <div className="glass-card rounded-xl border border-dq-border overflow-hidden">
          {/* Filter bar */}
          <div className="p-4 border-b border-dq-border flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dq-faint" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, college, ref ID…"
                className="w-full bg-dq-card border border-dq-border rounded-lg pl-8 pr-4 py-2 text-sm text-dq-text placeholder:text-dq-faint focus:border-dq-gold/40 focus:outline-none"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-dq-card border border-dq-border rounded-lg px-3 py-2 text-sm text-dq-muted focus:outline-none focus:border-dq-gold/40"
            >
              <option value="all">All Status</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <select
              value={filterCollege}
              onChange={(e) => setFilterCollege(e.target.value)}
              className="bg-dq-card border border-dq-border rounded-lg px-3 py-2 text-sm text-dq-muted focus:outline-none focus:border-dq-gold/40 max-w-[200px]"
            >
              {colleges.map((c) => <option key={c} value={c}>{c === "all" ? "All Colleges" : c}</option>)}
            </select>
            <span className="text-dq-faint text-xs ml-auto">{filtered.length} results</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dq-border bg-dq-card/50">
                  {["Ref ID", "Name", "College", "Branch", "Year", "City", "Status", "Applied", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-dq-faint text-xs font-display font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dq-border/50">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-dq-gold font-display font-semibold text-xs whitespace-nowrap">{app.reference_id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-white font-medium">{app.full_name}</div>
                      <div className="text-dq-faint text-xs">{app.college_email}</div>
                    </td>
                    <td className="px-4 py-3 text-dq-muted max-w-[160px] truncate">{app.college_name}</td>
                    <td className="px-4 py-3 text-dq-muted whitespace-nowrap">{app.branch}</td>
                    <td className="px-4 py-3 text-dq-muted text-center">{app.year_of_study}</td>
                    <td className="px-4 py-3 text-dq-muted whitespace-nowrap">{app.city}</td>
                    <td className="px-4 py-3">
                      <div className="relative group">
                        <button className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-display font-medium whitespace-nowrap",
                          STATUS_STYLES[app.status ?? "new"]
                        )}>
                          {STATUS_ICONS[app.status ?? "new"]}
                          {(app.status ?? "new").charAt(0).toUpperCase() + (app.status ?? "new").slice(1)}
                          <ChevronDown size={10} />
                        </button>
                        {/* Status dropdown */}
                        <div className="absolute top-full left-0 mt-1 bg-dq-card border border-dq-border rounded-lg shadow-xl z-10 hidden group-hover:block min-w-[130px]">
                          {STATUS_OPTIONS.map((s) => (
                            <button
                              key={s}
                              onClick={() => updateStatus(app.id, s)}
                              disabled={updating === app.id}
                              className={cn(
                                "w-full text-left px-3 py-2 text-xs hover:bg-white/5 transition-colors first:rounded-t-lg last:rounded-b-lg",
                                (app.status ?? "new") === s ? "text-dq-gold" : "text-dq-muted"
                              )}
                            >
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-dq-faint text-xs whitespace-nowrap">
                      {new Date(app.submitted_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="text-dq-muted hover:text-dq-gold transition-colors p-1.5 rounded-lg hover:bg-white/5"
                          title="View details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(app)}
                          className="text-dq-muted hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10"
                          title="Delete application"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-16 text-center text-dq-faint text-sm">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="bg-[#0f1117] border border-dq-border rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#0f1117] border-b border-dq-border px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-white">{selectedApp.full_name}</h2>
                <p className="text-dq-gold text-xs font-display">{selectedApp.reference_id}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-dq-faint hover:text-white transition-colors text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-5">
              {[
                { title: "Contact", rows: [
                  ["Email", selectedApp.college_email],
                  ["Mobile", selectedApp.mobile],
                  ["City", selectedApp.city],
                ]},
                { title: "Academic", rows: [
                  ["College", selectedApp.college_name],
                  ["Degree", selectedApp.degree],
                  ["Branch", selectedApp.branch],
                  ["Year", `Year ${selectedApp.year_of_study}`],
                ]},
                { title: "Social", rows: [
                  ["LinkedIn", selectedApp.linkedin_url || "—"],
                  ["Instagram", selectedApp.instagram_handle || "—"],
                  ["Hours/week", selectedApp.hours_per_week],
                  ["Areas", selectedApp.areas_of_interest?.join(", ") || "—"],
                ]},
              ].map((section) => (
                <div key={section.title}>
                  <h4 className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-3">{section.title}</h4>
                  <div className="space-y-2">
                    {section.rows.map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4 text-sm">
                        <span className="text-dq-faint flex-shrink-0">{label}</span>
                        <span className="text-dq-text text-right break-all">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}              {/* Application Answers */}
              <div>
                <h4 className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-3">
                  Application Answers
                </h4>
                <div className="space-y-4">
                  {[
                    ["Bio", selectedApp.bio],
                    ["Social Media Activity", selectedApp.social_platforms],
                    ["Why do you want to be an ambassador?", selectedApp.why_ambassador],
                    ["Why should DataQuotes choose you?", selectedApp.why_choose_you],
                    ["Leadership Experience", selectedApp.leadership_experience],
                    ["Prior Outreach Experience", selectedApp.prior_experience],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-dq-border bg-dq-card/40 p-4">
                      <div className="text-dq-faint text-xs font-display uppercase tracking-wide mb-2">
                        {label}
                      </div>
                      <div className="text-sm text-dq-text leading-relaxed whitespace-pre-wrap break-words">
                        {value || "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>              {/* Update status from modal */}
              <div>
                <h4 className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-3">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => { updateStatus(selectedApp.id, s); setSelectedApp({ ...selectedApp, status: s }); }}
                      className={cn(
                        "px-3 py-1.5 rounded-full border text-xs font-display font-medium transition-all",
                        (selectedApp.status ?? "new") === s
                          ? STATUS_STYLES[s]
                          : "border-dq-border text-dq-faint hover:border-dq-gold/30 hover:text-dq-muted"
                      )}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {/* Danger Zone */}
              <div className="pt-2 border-t border-dq-border">
                <h4 className="text-red-400 text-xs font-display font-semibold uppercase tracking-widest mb-3">
                  Danger Zone
                </h4>
                <button
                  onClick={() => setDeleteTarget(selectedApp)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/25 text-red-400 hover:bg-red-500/10 transition-all text-sm font-display"
                >
                  <Trash2 size={14} />
                  Delete Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="bg-[#0f1117] border border-red-500/20 rounded-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-display font-bold text-white mb-2">
              Delete application?
            </h3>
            <p className="text-sm text-dq-muted leading-relaxed mb-5">
              This will permanently delete the application for{" "}
              <span className="text-white font-medium">{deleteTarget.full_name}</span>{" "}
              ({deleteTarget.reference_id}). This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg border border-dq-border text-dq-muted hover:text-white hover:border-dq-gold/30 transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={deleteApplication}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all text-sm font-display disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}