<template>
  <div>
    <div class="bgimg"></div>

    <div class="content-w center" align="center">
      <div class="">
        <h1 class="color-text">Welcome To Unifam</h1>
      </div>
      <div class="">
        <img src="/ic_apps.png" width="150px" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main-without-back-button-layout',
  middleware: ['authenticateds']
})

const networkStatus = ref('')

// Network status using native browser API
function checkNetwork() {
  networkStatus.value = navigator.onLine ? 'online' : 'offline'
}

function handleOnline() {
  networkStatus.value = 'online'
}

function handleOffline() {
  networkStatus.value = 'offline'
}

function doRefresh() {
  setTimeout(() => {
    window.location.reload()
  }, 1000)
}

// Toast composable
const toast = useToast()

function installApp() {
  const store = useAppStore()
  if (!store.deferredPrompt) return

  store.deferredPrompt.prompt()
  store.deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      toast.show('Installation started!')
    } else {
      toast.show('Installation canceled!')
    }
  })
}

onMounted(() => {
  checkNetwork()
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
})

onUnmounted(() => {
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('offline', handleOffline)
})
</script>

<style scoped>
.color-text {
  color: var(--ion-color-apps);
  font-weight: bold;
}

.content-w {
  margin-top: 37vh;
}

.bgimg {
  z-index: -1;
  position: absolute;
  top: 0;
  background-image: url('/ic_bg.jpg');
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
}
</style>
