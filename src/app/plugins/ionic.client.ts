import { IonicVue } from '@ionic/vue'
import { defineCustomElements as PwaLoader } from '@ionic/pwa-elements/loader'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(IonicVue)
  PwaLoader(window)
})
