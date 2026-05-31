import { z } from "zod";

export const step1Schema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  college_email: z
    .string()
    .email("Enter a valid email address")
    .refine(
      (email) =>
        !["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"].includes(
          email.split("@")[1]
        ),
      "Please use your college/institutional email"
    ),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  date_of_birth: z.string().min(1, "Please select your date of birth"),
  city: z.string().min(2, "Enter your city or campus location"),
});

export const step2Schema = z.object({
  college_name: z.string().min(3, "Enter your college name"),
  degree: z.string().min(2, "Enter your degree"),
  year_of_study: z.coerce.number().min(1).max(6),
  graduation_year: z.coerce.number().min(2025).max(2032),
  branch: z.string().min(2, "Enter your branch or department"),
  current_semester: z.coerce.number().min(1).max(12),
});

export const step3Schema = z.object({
  linkedin_url: z
    .string()
    .url("Enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  instagram_handle: z.string().optional(),
  bio: z.string().min(50, "Write at least 50 characters about yourself"),
  areas_of_interest: z.array(z.string()).min(1, "Select at least one area"),
  social_platforms: z.string().min(10, "Describe your social media activity"),
});

export const step4Schema = z.object({
  why_ambassador: z.string().min(100, "Write at least 100 characters"),
  why_choose_you: z.string().min(100, "Write at least 100 characters"),
  leadership_experience: z.string().min(50, "Describe your leadership experience"),
  prior_experience: z.string().min(30, "Describe your prior experience"),
  hours_per_week: z.string().min(1, "Select your availability"),
  content_creation: z.boolean(),
});

export const fullApplicationSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

export type FullApplication = z.infer<typeof fullApplicationSchema>;

export const AREAS_OF_INTEREST = [
  "Data & Analytics",
  "Software Development",
  "Digital Marketing",
  "Content Creation",
  "Community Building",
  "Events & Workshops",
  "Student Leadership",
  "Design & Branding",
] as const;

export const HOURS_OPTIONS = [
  "2–4 hours",
  "4–6 hours",
  "6–8 hours",
  "8+ hours",
] as const;

export const DEGREE_OPTIONS = [
  "B.Tech / B.E.",
  "B.Sc",
  "BCA",
  "MBA",
  "MCA",
  "M.Tech",
  "M.Sc",
  "Other",
] as const;