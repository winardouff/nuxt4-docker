import { IonicVue } from '@ionic/vue'
import { defineCustomElements as PwaLoader } from '@ionic/pwa-elements/loader'

// Import Ionic Vue CSS utilities
import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
import '@ionic/vue/css/ionic.bundle.css'

export default defineNuxtPlugin({ 
  name: 'ionic',
  enforce: 'pre',
  setup(nuxtApp) {
    nuxtApp.vueApp.use(IonicVue)
    PwaLoader(window)
  }
})
