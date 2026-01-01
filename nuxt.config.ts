// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  css: [],

  modules: ["@nuxt/eslint"],

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  imports: {
    dirs: ["composables"],
  },

  typescript: {
    strict: true,
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    public: {},
  },
});
