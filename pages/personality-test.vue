<template>
    
    <UCarousel v-slot="{ item }" :items="items">
    <img :src="item" width="300" height="400" draggable="false">
  </UCarousel>
  </template>
<script setup lang="ts">
const imageExtension = ".jpeg"
const basePath = "/assets/mbti"
  const items = [
    `${basePath}/enfj${imageExtension}`,
    `${basePath}/enfp${imageExtension}`,
    `${basePath}/entj${imageExtension}`,
    `${basePath}/entp${imageExtension}`,
    `${basePath}/esfj${imageExtension}`,
    `${basePath}/esfp${imageExtension}`,
    `${basePath}/estj${imageExtension}`,
    `${basePath}/estp${imageExtension}`,
    `${basePath}/infj${imageExtension}`,
    `${basePath}/infp${imageExtension}`,
    `${basePath}/intj${imageExtension}`,
    `${basePath}/intp${imageExtension}`,
    `${basePath}/isfj${imageExtension}`,
    `${basePath}/isfp${imageExtension}`,
    `${basePath}/istj${imageExtension}`,
    `${basePath}/istp${imageExtension}`,
  ]
</script>