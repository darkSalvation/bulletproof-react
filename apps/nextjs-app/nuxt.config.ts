// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
  ],

  srcDir: 'src/',

  dir: {
    pages: 'pages',
    layouts: 'layouts',
    assets: 'assets',
    public: '../public',
  },

  css: ['~/assets/css/globals.css'],

  tailwindcss: {
    cssPath: '~/assets/css/globals.css',
    configPath: '../tailwind.config.cjs',
  },

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:8080/api',
      enableApiMocking: process.env.NUXT_PUBLIC_ENABLE_API_MOCKING === 'true',
      appUrl: process.env.NUXT_PUBLIC_URL || 'http://localhost:3000',
      mockApiPort: process.env.NUXT_PUBLIC_MOCK_API_PORT || '8080',
    },
  },

  typescript: {
    strict: true,
  },

  compatibilityDate: '2024-11-01',
});
