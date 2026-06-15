"use server";

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
  : null;

export async function insertLead(payload: {
  full_name: string;
  instagram_handle: string;
  followers: number;
  niche_industry: string;
  email: string;
  created_at?: string;
}) {
  if (!supabaseAdmin) {
    console.error("Supabase Admin client not configured.");
    return { error: "Database configuration missing" };
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("creator model")
      .insert([payload])
      .select();

    if (error) {
      console.error("Supabase admin insert error:", error);
      return { error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Server action exception:", err);
    return { error: err.message || "Internal server error" };
  }
}
