"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="min-h-screen bg-[#090b10] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-display font-extrabold text-2xl text-white mb-1">
            Data<span className="text-dq-gold">Quotes</span>
          </div>
          <p className="text-dq-muted text-sm">Admin Panel</p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-dq-border">
          <h1 className="font-display font-bold text-white text-xl mb-6">Sign in</h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-dq-muted text-xs font-display font-medium mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dataquotes.in"
                required
                className="w-full bg-dq-card border border-dq-border rounded-xl px-4 py-3 text-dq-text text-sm placeholder:text-dq-faint focus:border-dq-gold/50 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-dq-muted text-xs font-display font-medium mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-dq-card border border-dq-border rounded-xl px-4 py-3 pr-11 text-dq-text text-sm placeholder:text-dq-faint focus:border-dq-gold/50 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dq-faint hover:text-dq-muted transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-dq-gold text-black font-display font-bold text-sm hover:bg-dq-gold-hover transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-dq-faint text-xs mt-6">
          <a href="/" className="hover:text-dq-gold transition-colors">← Back to website</a>
        </p>
      </div>
    </main>
  );
}