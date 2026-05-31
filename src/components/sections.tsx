"use client";

import { Reveal, RevealStagger, RevealChild } from "@/components/reveal";
import {
  Megaphone, Trophy, Users, Zap, Star, BookOpen,
  Clock, MessageCircle, ChevronDown, Target, Heart, Rocket,
} from "lucide-react";
import { useState } from "react";
/* ─── ABOUT ──────────────────────────────────────────────── */
export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-4 block">
            Who We Are
          </span>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white mb-6 leading-tight">
            Tirupati&apos;s Data &{" "}
            <span className="text-gold-gradient">Technology</span> Platform
          </h2>
          <p className="text-dq-muted text-base leading-relaxed mb-4">
            DataQuotes is Tirupati&apos;s integrated student growth ecosystem — spanning
            IT services, EduTech, digital marketing, and K12 education. We help students
            build real-world skills through hands-on projects, expert mentors, and
            industry-aligned training.
          </p>
          <p className="text-dq-muted text-base leading-relaxed mb-8">
            The Campus Ambassador Program is our way of bringing DataQuotes directly to
            your college — through students who believe in the power of data, technology,
            and community-driven growth.
          </p>
          <div className="flex flex-wrap gap-3">
            {["EduTech", "IT Services", "Digital Marketing", "K12 Programs", "Placement Support"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-dq-gold/10 border border-dq-gold/20 text-dq-gold text-xs font-display font-medium"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <BookOpen className="text-dq-gold" size={22} />, title: "Real-World Projects", desc: "Hands-on learning with actual industry projects" },
            { icon: <Users className="text-dq-gold" size={22} />, title: "Expert Mentors", desc: "Learn from professionals with industry experience" },
            { icon: <Rocket className="text-dq-gold" size={22} />, title: "Placement Support", desc: "Career-focused training with placement backing" },
            { icon: <Heart className="text-dq-gold" size={22} />, title: "Community First", desc: "Tirupati's most trusted student technology community" },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-2xl p-5 hover:border-dq-gold/20 transition-colors">
              <div className="mb-3">{item.icon}</div>
              <h3 className="font-display font-semibold text-sm text-white mb-1">{item.title}</h3>
              <p className="text-dq-muted text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WHY JOIN ───────────────────────────────────────────── */
export function WhyJoinSection() {
  const benefits = [
    { icon: <Trophy size={20} />, title: "Leadership Experience", desc: "Take a real leadership role on your campus and develop communication, management, and outreach skills." },
    { icon: <Star size={20} />, title: "Official Certificate", desc: "Receive a verified DataQuotes Ambassador Certificate that strengthens your resume and LinkedIn profile." },
    { icon: <Users size={20} />, title: "Exclusive Network", desc: "Connect with ambassadors from 50+ colleges, DataQuotes mentors, and industry professionals." },
    { icon: <Zap size={20} />, title: "Program Access", desc: "Get early and free access to DataQuotes workshops, data science training, and technology events." },
    { icon: <Target size={20} />, title: "Career Advantage", desc: "Stand out in placements with real ambassador experience, letter of recommendation, and proven impact." },
    { icon: <Megaphone size={20} />, title: "Campus Recognition", desc: "Be the official DataQuotes face at your college — recognized by peers, faculty, and industry." },
  ];

  return (
    <section id="benefits" className="py-24 px-4 bg-dq-darker">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <span className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-3 block">
            Why Join
          </span>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white mb-4">
            What You <span className="text-gold-gradient">Gain</span>
          </h2>
          <p className="text-dq-muted text-base max-w-xl mx-auto">
            Being a DataQuotes Campus Ambassador is more than a title. It is a launchpad.
          </p>
        </Reveal>
        <RevealStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b) => (
            <RevealChild key={b.title}>
              <div className="glass-card rounded-2xl p-6 hover:border-dq-gold/25 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-dq-gold/10 flex items-center justify-center text-dq-gold mb-4">
                  {b.icon}
                </div>
                <h3 className="font-display font-semibold text-white text-base mb-2">{b.title}</h3>
                <p className="text-dq-muted text-sm leading-relaxed">{b.desc}</p>
              </div>
            </RevealChild>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ─── RESPONSIBILITIES ───────────────────────────────────── */
export function ResponsibilitiesSection() {
  const items = [
    { num: "01", title: "Promote on Campus", desc: "Represent DataQuotes in your college — share opportunities, workshops, and programs with peers." },
    { num: "02", title: "Social Media Outreach", desc: "Create and share engaging content about DataQuotes on Instagram, LinkedIn, and WhatsApp." },
    { num: "03", title: "Organize Events", desc: "Help coordinate or host DataQuotes-powered workshops, tech talks, and student meetups." },
    { num: "04", title: "Peer Mentoring", desc: "Guide interested students toward DataQuotes courses, programs, and career pathways." },
    { num: "05", title: "Feedback & Insights", desc: "Share valuable feedback about your campus community to help DataQuotes improve and grow." },
    { num: "06", title: "Content Creation", desc: "Create posters, reels, stories, and digital content that represent the DataQuotes brand." },
  ];

  return (
    <section id="responsibilities" className="py-24 px-4 max-w-7xl mx-auto">
      <Reveal className="text-center mb-14">
        <span className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-3 block">
          Your Role
        </span>
        <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white mb-4">
          What You&apos;ll <span className="text-gold-gradient">Do</span>
        </h2>
        <p className="text-dq-muted text-base max-w-xl mx-auto">
          Clear, manageable responsibilities — designed for busy college students.
        </p>
      </Reveal>
      <RevealStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <RevealChild key={item.num}>
            <div className="glass-card rounded-2xl p-6 hover:border-dq-gold/20 transition-all hover:-translate-y-1 duration-300">
              <span className="text-dq-gold/40 font-display font-extrabold text-3xl block mb-3">{item.num}</span>
              <h3 className="font-display font-semibold text-white text-base mb-2">{item.title}</h3>
              <p className="text-dq-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          </RevealChild>
        ))}
      </RevealStagger>
    </section>
  );
}

/* ─── ELIGIBILITY ────────────────────────────────────────── */
export function EligibilitySection() {
  return (
    <section id="eligibility" className="py-24 px-4 bg-dq-darker">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal className="mb-12">
          <span className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-3 block">
            Who Can Apply
          </span>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white mb-6">
            Eligibility <span className="text-gold-gradient">Criteria</span>
          </h2>
          <p className="text-dq-muted text-base max-w-xl mx-auto">
            Simple, fair, and open to students from all backgrounds and branches.
          </p>
        </Reveal>
        <RevealStagger className="grid sm:grid-cols-2 gap-4 text-left">
          {[
            { check: true, text: "Currently enrolled in any college or university" },
            { check: true, text: "Interest in data, technology, marketing, or student leadership" },
            { check: true, text: "Good communication skills with peers and faculty" },
            { check: true, text: "Active on at least one social media platform" },
            { check: true, text: "Willing to dedicate 2–8 hours per week" },
            { check: true, text: "Passionate about helping students grow and discover opportunities" },
            { check: false, text: "Prior ambassador experience NOT required" },
            { check: false, text: "No minimum CGPA or branch restriction" },
          ].map((item) => (
            <RevealChild key={item.text}>
              <div className="glass-card rounded-xl p-4 flex items-start gap-3 hover:border-dq-gold/20 transition-colors">
                <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${item.check ? "bg-dq-gold/15 text-dq-gold" : "bg-green-500/15 text-green-400"}`}>
                  ✓
                </span>
                <span className="text-dq-text text-sm leading-relaxed">{item.text}</span>
              </div>
            </RevealChild>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ─── SOCIAL PROOF ───────────────────────────────────────── */
export function SocialProofSection() {
  return (
    <section id="stories" className="py-24 px-4 max-w-7xl mx-auto">
      <Reveal className="text-center mb-14">
        <span className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-3 block">
          Our Reach
        </span>
        <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white mb-4">
          Trusted by <span className="text-gold-gradient">Colleges</span>
        </h2>
        <p className="text-dq-muted text-base max-w-xl mx-auto">
          DataQuotes has partnered with colleges and institutions across Andhra Pradesh and beyond.
        </p>
      </Reveal>
      {/* Testimonial placeholders */}
      <RevealStagger className="grid sm:grid-cols-3 gap-5 mb-12">
        {[
          { name: "Priya S.", college: "SVCE, Tirupati", quote: "Being a DataQuotes ambassador helped me build confidence, expand my network, and land my first internship." },
          { name: "Rahul K.", college: "SRKR Engineering", quote: "I organized 3 workshops in my college. The response was incredible. DataQuotes made it easy to deliver value." },
          { name: "Anjali M.", college: "VIT-AP, Amaravati", quote: "The certificate and mentorship I received added real weight to my resume during campus placements." },
        ].map((t) => (
          <RevealChild key={t.name}>
            <div className="glass-card rounded-2xl p-6 hover:border-dq-gold/20 transition-all hover:-translate-y-1 duration-300">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-dq-gold fill-dq-gold" />)}
              </div>
              <p className="text-dq-muted text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <div className="font-display font-semibold text-white text-sm">{t.name}</div>
                <div className="text-dq-muted text-xs">{t.college}</div>
              </div>
            </div>
          </RevealChild>
        ))}
      </RevealStagger>
      {/* MoU Banner */}
      <Reveal>
        <div className="glass-card rounded-2xl p-8 text-center border-dq-gold/10">
          <p className="text-dq-muted text-sm mb-2">Official Industry-Academia Partnerships</p>
          <p className="font-display font-semibold text-white text-lg">
            DataQuotes has signed MoUs with colleges across Andhra Pradesh for industry collaboration and student upskilling.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────── */
export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: "Who can apply for the program?", a: "Any currently enrolled college student from any branch or degree. No prior ambassador experience is required." },
    { q: "Is the role paid or unpaid?", a: "The role is currently unpaid, but you receive a verified certificate, mentorship, training access, and priority consideration for future opportunities at DataQuotes." },
    { q: "How many hours per week are expected?", a: "We expect 2–8 hours per week depending on your availability. You choose your own workload level during application." },
    { q: "Will I get a certificate?", a: "Yes. Every selected ambassador receives an official DataQuotes Campus Ambassador Certificate on successful completion." },
    { q: "How will I be contacted after applying?", a: "Shortlisted applicants will receive an email to their college address within 7–10 days of applying." },
    { q: "Do I need to be from Tirupati?", a: "No. The program is open to college students across India. DataQuotes started in Tirupati but is growing nationally." },
    { q: "Can I apply if I am in my final year?", a: "Yes, final year students are encouraged to apply. The leadership and network benefits are especially valuable for placements." },
  ];

  return (
    <section id="faq" className="py-24 px-4 bg-dq-darker">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-14">
          <span className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-3 block">
            Questions
          </span>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white mb-4">
            Frequently Asked <span className="text-gold-gradient">Questions</span>
          </h2>
        </Reveal>
        <RevealStagger className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <RevealChild key={i}>
              <div className="glass-card rounded-xl overflow-hidden hover:border-dq-gold/20 transition-colors">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-display font-medium text-white text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-dq-gold flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-dq-muted text-sm leading-relaxed border-t border-dq-border/50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            </RevealChild>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="bg-[#0a0f1e] border-t border-white/5">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <div className="font-display font-extrabold text-xl text-white">
            Data<span className="text-dq-gold">Quotes</span>
          </div>
          <p className="text-dq-muted text-sm leading-relaxed max-w-[220px]">
            Enabling students to lead, learn, and grow through campus ambassador programs and industry-connected career opportunities.
          </p>
          {/* Social icons */}
          <div className="flex gap-3 mt-1">
            {[
              { label: "LinkedIn", href: "https://linkedin.com", icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              )},
              { label: "Instagram", href: "https://instagram.com", icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              )},
              { label: "YouTube", href: "https://youtube.com", icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              )},
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-dq-gold/30 flex items-center justify-center text-dq-gold hover:bg-dq-gold hover:text-black transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div>
          <h4 className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-5">Programs</h4>
          <ul className="space-y-3">
            {["Data Analytics", "Python Data Science", "Business Intelligence", "Full Stack Development", "Digital Marketing", "Machine Learning"].map((item) => (
              <li key={item}>
                <a href="#" className="text-dq-muted text-sm hover:text-white transition-colors duration-200">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-5">Company</h4>
          <ul className="space-y-3">
            {[
              { label: "About Us", href: "#about" },
              { label: "Success Stories", href: "#stories" },
              { label: "Community", href: "#" },
              { label: "Leaderboard", href: "#" },
              { label: "Verify Ambassador", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-dq-muted text-sm hover:text-white transition-colors duration-200">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest mb-5">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-dq-muted text-sm">
              <span className="text-dq-gold flex-shrink-0">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.94a16 16 0 0 0 6.15 6.15l1.83-1.83a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              +91 98765 43210
            </li>
            <li className="flex items-center gap-3 text-dq-muted text-sm">
              <span className="text-dq-gold flex-shrink-0">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              hello@dataquotes.in
            </li>
            <li className="flex items-start gap-3 text-dq-muted text-sm">
              <span className="text-dq-gold flex-shrink-0 mt-0.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              Tirupati, Andhra Pradesh, India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-dq-faint">
          <p>© {new Date().getFullYear()} DataQuotes. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-dq-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-dq-gold transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-dq-gold transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}