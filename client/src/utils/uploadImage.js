import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadProfileImage = async (file) => {
  const imagefile = file.name + Math.random();
  const { error } = await supabase.storage
    .from("avatars")
    .upload(`public/${imagefile}`, file);
  const publicURL = supabase.storage
    .from("avatars")
    .getPublicUrl(`public/${imagefile}`);
  if (error) throw error;
  return publicURL.data.publicUrl;
};

export const uploadPostImage = async (file) => {
  const imagefile = file.name + Math.random();

  const { error } = await supabase.storage
    .from("posts")
    .upload(`public/${imagefile}`, file);
  const publicURL = supabase.storage
    .from("posts")
    .getPublicUrl(`public/${imagefile}`);
  if (error) throw error;
  return publicURL.data.publicUrl;
};

export const uploadPhotoImage = async (file) => {
  const imagefile = file.name + Math.random();

  const { error } = await supabase.storage
    .from("photos")
    .upload(`public/${imagefile}`, file);
  const publicURL = supabase.storage
    .from("photos")
    .getPublicUrl(`public/${imagefile}`);
  if (error) throw error;
  return publicURL.data.publicUrl;
};
