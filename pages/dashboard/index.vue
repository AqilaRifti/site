<script setup lang="ts">
const layout = "dashboard"
import { ref, onMounted } from 'vue';
const supabase: any = useNuxtApp().$supabase;

// Reactive variable to store the current user
const user = ref(null);

onMounted(async () => {
  const { data, error } = await supabase.auth.getSession();
  
  if (data.session) {
    user.value = data.session.user; // User is logged in
  } else {
    await navigateTo('/login')
  }
});
</script>

<template>
  <NuxtLayout :name="layout">
    
      <article>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </article>
  </NuxtLayout>
</template>
