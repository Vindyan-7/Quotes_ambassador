import ApplicationForm from "@/components/application-form";
import Navbar from "@/components/navbar";
import { ArrowLeft } from "lucide-react";

export default function ApplyPage() {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen pt-24 pb-16 px-4 bg-dq-darker">
        <div className="max-w-2xl mx-auto">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-dq-muted hover:text-dq-gold text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </a>
          <div className="text-center mb-10">
            <span className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-3 block">
              Applications Open
            </span>
            <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-white mb-4">
              Apply <span className="text-gold-gradient">Now</span>
            </h1>
            <p className="text-dq-muted text-base max-w-md mx-auto">
              Takes less than 5 minutes. No prior experience needed. Just your drive to lead.
            </p>
          </div>
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-dq-border hover:border-dq-gold/10 transition-colors">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </main>
  );
}