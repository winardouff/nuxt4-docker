<template>
  <ion-tabs>
    <ion-tab-bar v-show="isVisible" selected slot="bottom">
      <template v-for="(item, i) in menus" :key="i">
        <ion-tab-button :tab="item.name" @click="goToPage(item)">
          <ion-icon :icon="menuIcon(item)" />
          <ion-label>{{ item.name }}</ion-label>
        </ion-tab-button>
      </template>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script setup lang="ts">
import { menu, chatbox, document, home, person } from 'ionicons/icons'
// TODO: Import your bottom menu definition
// import MenuBottom from '~/api/menubottom'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true,
  },
})

const router = useRouter()

const iconMap: Record<string, any> = {
  menu,
  chatbox,
  document,
  home,
  person,
}

// TODO: Replace with actual menu data
const menus = ref<any[]>([])
// const menus = ref(MenuBottom)

function menuIcon(item: any) {
  return iconMap[item.icon] || null
}

function goToPage(item: any) {
  if (item.href != null) {
    router.push(item.href)
  }
}
</script>

<style scoped>
ion-tab-button {
  --color: #928e8e;
  --color-selected: #29337a;
}
</style>
