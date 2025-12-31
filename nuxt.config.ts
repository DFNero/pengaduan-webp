// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  modules: ['@nuxt/eslint'],

  // 🔥 INI YANG KAMU KURANG
  imports: {
    dirs: ['composables']
  },

  typescript: {
    strict: true
  },

  runtimeConfig: {
    public: {
      supabaseUrl: '',
      supabaseAnonKey: ''
    }
  }
})

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
})

export default defineNuxtConfig({
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET
  }
})
