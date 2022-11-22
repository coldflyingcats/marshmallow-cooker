export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'マシュマロクッカー',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'マシュマロの枠の色を変えるためのツールです。' },
      { name: 'format-detection', content: 'telephone=no' },

      { hid: 'og:site_name', property: 'og:site_name', content: 'マシュマロクッカー' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://marshmallow-cooker.web.app/' },
      { hid: 'og:title', property: 'og:title', content: 'マシュマロクッカー' },
      { hid: 'og:description', property: 'og:description', content: 'マシュマロの枠の色を変えるためのツールです。' },
      { hid: 'og:image', property: 'og:image', content: 'https://marshmallow-cooker.web.app/ogp.png' },
      { name: 'twitter:card', content: 'summary' }//　twitterの画像サイズ
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/Konva.js',
    '~/plugins/Verte.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyAoJegl-q4ar2_vkxR8HIvapNQ26QzCWRU",
          authDomain: "marshmallow-cooker.firebaseapp.com",
          projectId: "marshmallow-cooker",
          storageBucket: "marshmallow-cooker.appspot.com",
          messagingSenderId: "725549031603",
          appId: "1:725549031603:web:8371fcb6946077e34a10c6",
          measurementId: "G-CN5TC4CWYF",
        },
        services: {
          auth: true // Just as example. Can be any other service.
        }
      }
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend: ({ module, output }) => {
      // rulesの先頭に追加
      module.rules.unshift({
        test: /\.worker\.js$/,
        loader: 'worker-loader'
      });

      // HMR時にWebWorkerでwindow is not definedになる問題対策
      output.globalObject = 'this';
    }
  }
}
