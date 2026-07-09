<template>
  <div class="callback-wrapper">
    <div class="callback-content">{{ errorMsg }}</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute()
const { login } = useAuth()

const errorMsg = ref('')

onMounted(async () => {
  const code = route.query.code as string
  if (!code) {
    errorMsg.value = 'No authorization code provided'
    await navigateTo('/login')
    return
  }
  await login('auth/login', code)
})
</script>

<style scoped lang="css">
.callback-wrapper {
  display: flex;
  height: 100vh;
  justify-content: center;
}

.callback-content {
  display: flex;
  align-items: center;
}
</style>
