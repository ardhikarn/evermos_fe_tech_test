// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@nuxtjs/google-fonts", "@nuxt/icon", "@pinia/nuxt"],
  css: ["~/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
  googleFonts: {
    families: {
      Poppins: true,
      Inter: "200..900",
    },
  },
  devtools: { enabled: true },
  routeRules: {
    "/": { prerender: true },
  },
  devServer: {
    port: 3333,
  },
});
