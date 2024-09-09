<template>
    
    <UCarousel v-slot="{ item }" :items="items">
    <img :src="item" width="300" height="400" draggable="false">
  </UCarousel>
  </template>
<script setup lang="ts">
const imageExtension = ".jpeg"
const basePath = "/assets/learning-types"
  const items = [
    `${basePath}/auditori${imageExtension}`,
    `${basePath}/interpersonal${imageExtension}`,
    `${basePath}/intrapersonal${imageExtension}`,
    `${basePath}/kinestetik${imageExtension}`,
    `${basePath}/linguistik${imageExtension}`,
    `${basePath}/logical${imageExtension}`,
    `${basePath}/visual${imageExtension}`,
  ]
</script>