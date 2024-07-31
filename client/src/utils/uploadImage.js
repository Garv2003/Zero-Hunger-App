import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadProfileImage = async (file) => {
  const { error } = await supabase.storage
    .from("avatars")
    .upload(`public/${file.name}`, file);
  const publicURL = supabase.storage
    .from("avatars")
    .getPublicUrl(`public/${file.name}`);
  if (error) throw error;
  return publicURL.data.publicUrl;
};

export const uploadPostImage = async (file) => {
  const { error } = await supabase.storage
    .from("posts")
    .upload(`public/${file.name}`, file);
  const publicURL = supabase.storage
    .from("posts")
    .getPublicUrl(`public/${file.name}`);
  if (error) throw error;
  return publicURL.data.publicUrl;
};
