"use server";

import { createClient } from "@/lib/supabase/server";
import { generateReferenceId } from "@/lib/utils";
import { fullApplicationSchema } from "@/types/application";

export async function submitApplication(formData: unknown) {
  const parsed = fullApplicationSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, error: "Validation failed. Please check your inputs." };
  }

  const supabase = await createClient();
  const referenceId = generateReferenceId();

  const { error } = await supabase.from("applications").insert({
    reference_id: referenceId,
    full_name: parsed.data.full_name,
    college_email: parsed.data.college_email,
    mobile: parsed.data.mobile,
    date_of_birth: parsed.data.date_of_birth,
    city: parsed.data.city,
    college_name: parsed.data.college_name,
    degree: parsed.data.degree,
    year_of_study: parsed.data.year_of_study,
    graduation_year: parsed.data.graduation_year,
    branch: parsed.data.branch,
    current_semester: parsed.data.current_semester,
    linkedin_url: parsed.data.linkedin_url || null,
    instagram_handle: parsed.data.instagram_handle || null,
    bio: parsed.data.bio,
    areas_of_interest: parsed.data.areas_of_interest,
    social_platforms: parsed.data.social_platforms,
    why_ambassador: parsed.data.why_ambassador,
    why_choose_you: parsed.data.why_choose_you,
    leadership_experience: parsed.data.leadership_experience,
    prior_experience: parsed.data.prior_experience,
    hours_per_week: parsed.data.hours_per_week,
    content_creation: parsed.data.content_creation,
    status: "new",
    source: "website",
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: "Submission failed. Please try again." };
  }

  return { success: true, referenceId };
}