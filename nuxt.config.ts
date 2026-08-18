import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
 compatibilityDate: '2025-07-15',

 devtools: {
   enabled: true,
 },

 css: ['~/assets/css/main.css'],

 vite: {
   plugins: [
     tailwindcss(),
   ],
 },

 runtimeConfig: {
    googleBooksApiKey: '',
  },

//  modules: ['@nuxtjs/storybook'], getting error while running storybook command, so commented it out for now.
})