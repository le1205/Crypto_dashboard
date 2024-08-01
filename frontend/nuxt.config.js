export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "crypto-dashboard",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "https://global.transak.com/sdk/v1.1.10/transak.min.js" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/transak.js", mode: "client" },
    { src: "~/plugins/vue-native-websocket.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules

  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],

  axios: {
    baseURL: "http://192.168.105.60:5000",
    credentials: true,
    withCredentials: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  auth: {
    strategies: {
      local: {
        token: {
          property: "accessToken",
          global: true,
          type: "Bearer",
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: "/login", method: "post" },
          logout: false,
        },
      },
    },
  },

  server: {
    host: "0.0.0.0",
    port: 3000,
  },
};
