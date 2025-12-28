// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    routeRules: {
      "/**": { isr: true },
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
  ],

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  devtools: { enabled: true },

  routeRules: {
    "/": { cors: true, prerender: true, ssr: true },
    "/api/**": { cors: true },
    "https://equran.id/api/v2/**": { 
      cors: true,
      proxy: { to: "http:localhost:3000/**" }
    },
  },

  compatibilityDate: "2025-12-29"
})