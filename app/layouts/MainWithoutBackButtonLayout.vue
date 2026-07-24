<template>
  <div>
    <ion-app>
      <SideMenu @lang-clicked="showLang" />
      <div id="main-content" class="ion-page">
        <ion-header>
          <HeaderMenu
            :page-title="titleName"
            :is-show-timer="isShowTimer"
          />
        </ion-header>
        <ion-content>
          <slot />
        </ion-content>
        <DashboardChatWidget :enable-voice="true" />
        <ion-footer style="display: none">
          <ion-toolbar>
            <BottomMenu :is-visible="false" />
          </ion-toolbar>
        </ion-footer>
      </div>
    </ion-app>
    <Teleport to="body">
      <Language :is-show-lang="isShowLang" @close-clicked="showLang" />
    </Teleport>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const titleName = config.public.appHeaderTitle || ''
const isShowTimer = ref(false)
const isShowLang = ref(false)

function setShowTimer(bool) {
  isShowTimer.value = bool
}

function showLang() {
  isShowLang.value = !isShowLang.value
}

// Expose setShowTimer so child pages can call it if needed
defineExpose({ setShowTimer })
</script>
