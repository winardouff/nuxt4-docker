import { defineCustomElement as defineIonTabBar } from '@ionic/core/components/ion-tab-bar.js'
import { defineCustomElement as defineIonTabButton } from '@ionic/core/components/ion-tab-button.js'
import { defineCustomElement as defineIonTabs } from '@ionic/core/components/ion-tabs.js'
import { defineCustomElements as PwaLoader } from '@ionic/pwa-elements/loader'

export default defineNuxtPlugin({
  name: 'ionic-pwa-elements',
  setup() {
    [defineIonTabs, defineIonTabBar, defineIonTabButton]
      .forEach(defineCustomElement => defineCustomElement())

    PwaLoader(window)
  }
})
