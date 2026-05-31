"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  step1Schema, step2Schema, step3Schema, step4Schema,
  fullApplicationSchema, AREAS_OF_INTEREST, HOURS_OPTIONS, DEGREE_OPTIONS,
  type FullApplication,
} from "@/types/application";
import { submitApplication } from "@/app/actions";
import { cn } from "@/lib/utils";
import { CheckCircle, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

const STEPS = [
  { id: 1, label: "Personal" },
  { id: 2, label: "Academic" },
  { id: 3, label: "Social" },
  { id: 4, label: "Questions" },
  { id: 5, label: "Review" },
];

const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema];

const inputClass =
  "w-full bg-dq-card border border-dq-border rounded-xl px-4 py-3 text-dq-text text-sm placeholder:text-dq-faint focus:border-dq-gold/50 focus:outline-none transition-all duration-200";
const labelClass = "block text-dq-muted text-xs font-display font-medium mb-1.5 uppercase tracking-wide";
const errorClass = "text-red-400 text-xs mt-1";

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const form = useForm<FullApplication>({
    resolver: zodResolver(fullApplicationSchema),
    defaultValues: {
      content_creation: false,
      areas_of_interest: [],
      year_of_study: 1,
      current_semester: 1,
      graduation_year: 2027,
    },
    mode: "onChange",
  });

  const { register, watch, setValue, getValues, trigger, formState: { errors } } = form;
  const watchedAreas = watch("areas_of_interest") || [];

  const nextStep = async () => {
    const schema = stepSchemas[step - 1];
    const fields = Object.keys(schema.shape) as (keyof FullApplication)[];
    const valid = await trigger(fields);
    if (valid) setStep((s) => Math.min(s + 1, 5));
    else toast.error("Please fix the errors before continuing.");
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const toggleArea = (area: string) => {
    const current = watchedAreas;
    setValue(
      "areas_of_interest",
      current.includes(area) ? current.filter((a) => a !== area) : [...current, area]
    );
  };

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const data = getValues();
      const result = await submitApplication(data);
      if (result.success && result.referenceId) {
        setReferenceId(result.referenceId);
        setStep(6);
      } else {
        toast.error(result.error || "Submission failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Success Screen
  if (step === 6) {
    return (
      <div className="text-center py-16 px-6 max-w-lg mx-auto">
        <div className="w-20 h-20 rounded-full bg-dq-gold/15 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-dq-gold" />
        </div>
        <h2 className="font-display font-extrabold text-3xl text-white mb-3">
          Application Submitted! 🎉
        </h2>
        <p className="text-dq-muted text-base mb-6">
          Thank you for applying to the DataQuotes Campus Ambassador Program.
          Shortlisted candidates will be contacted within 7–10 days.
        </p>
        <div className="glass-card rounded-2xl p-5 mb-8">
          <p className="text-dq-muted text-xs mb-2">Your Reference ID</p>
          <div className="flex items-center justify-center gap-3">
            <p className="font-display font-extrabold text-2xl text-dq-gold tracking-widest">
              {referenceId}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(referenceId ?? "");
                toast.success("Reference ID copied!");
              }}
              className="p-2 rounded-lg bg-dq-gold/10 border border-dq-gold/20 text-dq-gold hover:bg-dq-gold/20 transition-all"
              title="Copy to clipboard"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
            </button>
          </div>
          <p className="text-dq-faint text-xs mt-2">Save this for future reference</p>
        </div>
        <a
  href="/"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dq-gold text-black font-display font-semibold text-sm hover:bg-dq-gold-hover transition-all"
>
  ← Back to Home

        </a>
      </div>
    );
  }

  const values = getValues();

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        {/* Step labels - only show current */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-dq-gold text-xs font-display font-semibold uppercase tracking-widest">
            Step {step} of 5 — {STEPS[step - 1]?.label}
          </span>
          <span className="text-dq-faint text-xs">{Math.round((step / 5) * 100)}%</span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-dq-border rounded-full overflow-hidden">
          <div
            className="h-full bg-dq-gold rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
        {/* Dot indicators */}
        <div className="flex justify-between mt-2">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                step > s.id ? "bg-dq-gold" :
                step === s.id ? "bg-dq-gold scale-125" :
                "bg-dq-border"
              )}
            />
          ))}
        </div>
      </div>

      {/* Step 1: Personal */}
      {step === 1 && (
        <div className="space-y-5">
          <h3 className="font-display font-bold text-white text-xl mb-6">Personal Information</h3>
          <div>
            <label className={labelClass}>Full Name *</label>
            <input {...register("full_name")} placeholder="Your full name" className={inputClass} />
            {errors.full_name && <p className={errorClass}>{errors.full_name.message}</p>}
          </div>
          <div>
            <label className={labelClass}>College Email Address *</label>
            <input {...register("college_email")} type="email" placeholder="yourname@college.edu.in" className={inputClass} />
            {errors.college_email && <p className={errorClass}>{errors.college_email.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Mobile Number *</label>
            <input {...register("mobile")} type="tel" maxLength={10} placeholder="10-digit mobile number" className={inputClass} />
            {errors.mobile && <p className={errorClass}>{errors.mobile.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Date of Birth *</label>
            <input {...register("date_of_birth")} type="date" className={inputClass} />
            {errors.date_of_birth && <p className={errorClass}>{errors.date_of_birth.message}</p>}
          </div>
          <div>
            <label className={labelClass}>City / Campus Location *</label>
            <input {...register("city")} placeholder="e.g. Tirupati, Andhra Pradesh" className={inputClass} />
            {errors.city && <p className={errorClass}>{errors.city.message}</p>}
          </div>
        </div>
      )}

      {/* Step 2: Academic */}
      {step === 2 && (
        <div className="space-y-5">
          <h3 className="font-display font-bold text-white text-xl mb-6">Academic Details</h3>
          <div>
            <label className={labelClass}>College / University Name *</label>
            <input {...register("college_name")} placeholder="e.g. SVCE, Tirupati" className={inputClass} />
            {errors.college_name && <p className={errorClass}>{errors.college_name.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Degree *</label>
            <select {...register("degree")} className={inputClass}>
              <option value="">Select your degree</option>
              {DEGREE_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.degree && <p className={errorClass}>{errors.degree.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Year of Study *</label>
              <select {...register("year_of_study")} className={inputClass}>
                {[1,2,3,4,5,6].map((y) => <option key={y} value={y}>Year {y}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Current Semester *</label>
              <select {...register("current_semester")} className={inputClass}>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map((s) => <option key={s} value={s}>Sem {s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Branch / Department *</label>
            <input {...register("branch")} placeholder="e.g. ECE, CSE, MBA" className={inputClass} />
            {errors.branch && <p className={errorClass}>{errors.branch.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Expected Graduation Year *</label>
            <select {...register("graduation_year")} className={inputClass}>
              {[2025,2026,2027,2028,2029,2030,2031,2032].map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Step 3: Social */}
      {step === 3 && (
        <div className="space-y-5">
          <h3 className="font-display font-bold text-white text-xl mb-6">Social & Profile Details</h3>
          <div>
            <label className={labelClass}>LinkedIn Profile URL</label>
            <input {...register("linkedin_url")} placeholder="https://linkedin.com/in/yourprofile" className={inputClass} />
            {errors.linkedin_url && <p className={errorClass}>{errors.linkedin_url.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Instagram Handle</label>
            <input {...register("instagram_handle")} placeholder="@yourusername" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Short Bio *</label>
            <textarea
              {...register("bio")}
              rows={3}
              placeholder="Tell us about yourself — who you are, what you do, and what drives you (min 50 characters)"
              className={cn(inputClass, "resize-none")}
            />
            {errors.bio && <p className={errorClass}>{errors.bio.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Areas of Interest * (select all that apply)</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {AREAS_OF_INTEREST.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleArea(area)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-display font-medium border transition-all duration-200",
                    watchedAreas.includes(area)
                      ? "bg-dq-gold/15 border-dq-gold text-dq-gold"
                      : "bg-dq-card border-dq-border text-dq-muted hover:border-dq-gold/40"
                  )}
                >
                  {area}
                </button>
              ))}
            </div>
            {errors.areas_of_interest && <p className={errorClass}>{errors.areas_of_interest.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Social Media Activity *</label>
            <textarea
              {...register("social_platforms")}
              rows={2}
              placeholder="Which platforms do you use most? How many followers? How active are you?"
              className={cn(inputClass, "resize-none")}
            />
            {errors.social_platforms && <p className={errorClass}>{errors.social_platforms.message}</p>}
          </div>
        </div>
      )}

      {/* Step 4: Questions */}
      {step === 4 && (
        <div className="space-y-5">
          <h3 className="font-display font-bold text-white text-xl mb-6">Application Questions</h3>
          <div>
            <label className={labelClass}>Why do you want to be a DataQuotes Ambassador? *</label>
            <textarea {...register("why_ambassador")} rows={4} placeholder="Be specific about your motivation (min 100 characters)" className={cn(inputClass, "resize-none")} />
            {errors.why_ambassador && <p className={errorClass}>{errors.why_ambassador.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Why should DataQuotes choose you? *</label>
            <textarea {...register("why_choose_you")} rows={4} placeholder="What makes you the right fit? (min 100 characters)" className={cn(inputClass, "resize-none")} />
            {errors.why_choose_you && <p className={errorClass}>{errors.why_choose_you.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Leadership or Campus Involvement *</label>
            <textarea {...register("leadership_experience")} rows={3} placeholder="Clubs, positions, events you've led or participated in (min 50 characters)" className={cn(inputClass, "resize-none")} />
            {errors.leadership_experience && <p className={errorClass}>{errors.leadership_experience.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Prior Ambassador / Outreach Experience *</label>
            <textarea {...register("prior_experience")} rows={3} placeholder="Any prior experience in promotion, outreach, or campus ambassador roles" className={cn(inputClass, "resize-none")} />
            {errors.prior_experience && <p className={errorClass}>{errors.prior_experience.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Hours Available Per Week *</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {HOURS_OPTIONS.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setValue("hours_per_week", h)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-display font-medium border transition-all",
                    watch("hours_per_week") === h
                      ? "bg-dq-gold/15 border-dq-gold text-dq-gold"
                      : "bg-dq-card border-dq-border text-dq-muted hover:border-dq-gold/40"
                  )}
                >
                  {h}
                </button>
              ))}
            </div>
            {errors.hours_per_week && <p className={errorClass}>{errors.hours_per_week.message}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setValue("content_creation", !watch("content_creation"))}
              className={cn(
                "w-11 h-6 rounded-full border transition-all duration-300 relative flex-shrink-0",
                watch("content_creation") ? "bg-dq-gold border-dq-gold" : "bg-dq-card border-dq-border"
              )}
            >
              <span className={cn(
                "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300",
                watch("content_creation") ? "left-5" : "left-0.5"
              )} />
            </button>
            <label className="text-dq-text text-sm font-body">
              I am comfortable creating posters, reels, or promotional content
            </label>
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-white text-xl mb-6">Review Your Application</h3>
          {[
            { title: "Personal", fields: [
              { label: "Name", value: values.full_name },
              { label: "Email", value: values.college_email },
              { label: "Mobile", value: values.mobile },
              { label: "DOB", value: values.date_of_birth },
              { label: "City", value: values.city },
            ]},
            { title: "Academic", fields: [
              { label: "College", value: values.college_name },
              { label: "Degree", value: values.degree },
              { label: "Branch", value: values.branch },
              { label: "Year / Semester", value: `Year ${values.year_of_study}, Sem ${values.current_semester}` },
              { label: "Graduation", value: String(values.graduation_year) },
            ]},
            { title: "Social", fields: [
              { label: "LinkedIn", value: values.linkedin_url || "—" },
              { label: "Instagram", value: values.instagram_handle || "—" },
              { label: "Areas", value: values.areas_of_interest?.join(", ") || "—" },
            ]},
          ].map((section) => (
            <div key={section.title} className="glass-card rounded-xl p-5">
              <h4 className="font-display font-semibold text-dq-gold text-xs uppercase tracking-widest mb-3">{section.title}</h4>
              <div className="space-y-2">
                {section.fields.map((f) => (
                  <div key={f.label} className="flex justify-between gap-4 text-sm">
                    <span className="text-dq-muted flex-shrink-0">{f.label}</span>
                    <span className="text-dq-text text-right">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-dq-faint text-xs text-center pt-2">
            By submitting, you agree that the information provided is accurate and that DataQuotes may contact you at the email provided.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-dq-border">
        {step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-dq-border text-dq-muted hover:text-white hover:border-dq-gold/40 text-sm font-display font-medium transition-all"
          >
            <ChevronLeft size={16} /> Back
          </button>
        ) : <div />}

        {step < 5 ? (
          <button
            type="button"
            onClick={nextStep}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-dq-gold text-black font-display font-semibold text-sm hover:bg-dq-gold-hover transition-all hover:scale-105 active:scale-95"
          >
            Continue <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-dq-gold text-black font-display font-bold text-sm hover:bg-dq-gold-hover transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <><Loader2 size={16} className="animate-spin" /> Submitting...</>
            ) : (
              <>Submit Application <ChevronRight size={16} /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
}