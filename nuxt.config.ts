// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      publicSupabaseKey: process.env.PUBLIC_SUPABASE_KEY,
      supabaseURL: process.env.SUPABASE_URL
    },
    privateRuntimeConfig: {
      privateSupabaseKey: process.env.PRIVATE_SUPABASE_KEY,
    }
  },
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt', '@nuxt/ui', "@nuxt/icon"],
  pwa: {
    name: "Asisten Pelajar Indonesia",
    short_name: "API",
    start_url: "/?home=True",
    display: "fullscreen",
    orientation: "portrait",
    theme_color: "#fff",
    background_color: "#222",
    description: "Asisten pelajar untuk indonesia",
    icons: [
      {
        "src": "pwa-64x64.png",
        "sizes": "64x64",
        "type": "image/png"
      },
      {
        "src": "pwa-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "pwa-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      },
      {
        "src": "maskable-icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      }
    ]
  }
  
  
})