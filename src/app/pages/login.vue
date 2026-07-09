<template>
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['not-authenticated'],
})

const route = useRoute()
const { login } = useKeycloak()

onMounted(() => {
  // Store redirect path if provided
  if (route.query.path_url) {
    localStorage.setItem('path_url', route.query.path_url as string)
  }

  // Redirect to Keycloak login
  login()
})
</script>
