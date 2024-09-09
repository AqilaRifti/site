<script setup lang="ts">
  // You might choose this based on an API call or logged-in status
  const layout = "default";
</script>

<template>
  <NuxtPwaManifest />
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>