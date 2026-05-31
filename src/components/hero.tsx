"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, Star, Zap } from "lucide-react";

const stats = [
  { label: "Colleges Reached", value: "50+" },
  { label: "Workshops Conducted", value: "120+" },
  { label: "Students Trained", value: "5000+" },
  { label: "Live Projects", value: "200+" },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.classList.add("animate-fade-in");
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-dq-gold/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#f5a623 1px, transparent 1px), linear-gradient(90deg, #f5a623 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dq-gold/10 border border-dq-gold/20 text-dq-gold text-xs font-medium font-display tracking-wide">
            <MapPin size={12} />
            DataQuotes · Tirupati, Andhra Pradesh
            <span className="w-1.5 h-1.5 rounded-full bg-dq-gold animate-pulse" />
            Applications Open
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-center max-w-4xl mx-auto mb-8"
        >
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-tight text-white mb-6">
            Become a{" "}
            <span className="text-gold-gradient">DataQuotes</span>
            <br />
            Campus Ambassador
          </h1>
          <p className="text-dq-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Lead your campus. Represent a growing data & technology brand.
            Build real leadership skills, access mentors, workshops, and
            career-changing opportunities — right from college.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="/apply"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-dq-gold text-black font-display font-bold text-base hover:bg-dq-gold-hover transition-all duration-200 shadow-xl shadow-dq-gold/25 hover:shadow-dq-gold/40 hover:scale-105 active:scale-95"
          >
            Apply Now — It&apos;s Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-dq-border text-dq-text font-display font-medium text-base hover:border-dq-gold/40 hover:text-dq-gold transition-all duration-200"
          >
            Learn More
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-4 text-center hover:border-dq-gold/20 transition-colors duration-300"
            >
              <div className="font-display font-extrabold text-2xl text-dq-gold mb-1">
                {stat.value}
              </div>
              <div className="text-dq-muted text-xs font-body">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Perks strip */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {[
            { icon: <Users size={13} />, text: "50+ Colleges" },
            { icon: <Zap size={13} />, text: "Live Projects" },
            { icon: <Star size={13} />, text: "Certificate Awarded" },
          ].map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center gap-1.5 text-xs text-dq-muted bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-full"
            >
              <span className="text-dq-gold">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}