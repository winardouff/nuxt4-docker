<template>
  <ion-toolbar>
    <ion-buttons slot="start" @click="openMenu()">
      <ion-icon slot="icon-only" :icon="menuIcon"></ion-icon>
    </ion-buttons>
    <ion-title>{{ pageTitle }}</ion-title>
    <ion-title v-show="isShowTimer" slot="end">{{ time }}</ion-title>
  </ion-toolbar>
</template>

<script setup lang="ts">
import { menu as menuIcon } from 'ionicons/icons'

const props = defineProps({
  pageTitle: {
    type: String,
    default: 'UNIFAM',
  },
  isShowTimer: {
    type: Boolean,
    default: false,
  },
})

const time = ref('')
let timerInterval: ReturnType<typeof setInterval> | null = null

watch(() => props.isShowTimer, (newVal) => {
  if (newVal && !timerInterval) {
    timerInterval = setInterval(getTimeLog, 1000)
  } else if (!newVal && timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
})

async function openMenu() {
  const menu = document.querySelector('ion-menu[menu-id="side-menu"]') as any
  if (menu) {
    await menu.open()
  }
}

function getTimeLog() {
  const today = new Date()
  const date =
    today.getFullYear() +
    '-' +
    ('0' + (today.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + today.getDate()).slice(-2)
  const t =
    ('0' + today.getHours()).slice(-2) +
    ':' +
    ('0' + today.getMinutes()).slice(-2) +
    ':' +
    ('0' + today.getSeconds()).slice(-2)

  time.value = date + ' ' + t
}

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<style>
ion-buttons {
  padding-left: 10px;
}
</style>
