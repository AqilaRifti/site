import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  
  // Create and provide the Supabase client globally
  const supabase = createClient(config.public.supabaseURL, config.public.publicSupabaseKey);
  
  // Provide Supabase globally through Nuxt
  nuxtApp.provide('supabase', supabase);
});
