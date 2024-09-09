<script setup lang="ts">
const supabase: any = useNuxtApp().$supabase;

const getEmail = async () => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();  // Wait until session is fetched
    const email = sessionData?.session?.user?.email;

    if (email) {
      const username = email.split('@')[0];
      console.log('Username:', username);
      return username;
    } else {
      console.log('Email not available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
};

const displayname = ref("USERNAME")
// Call the function
getEmail().then((username) => {
  if (username) {
    // Proceed with username
    displayname.value = username;
  } else {
    // Handle case where email is not available
  }
});

const links = [[{
  label: displayname,
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/739984?v=4'
  },
  badge: "Pelajar"
}], [{
  label: 'Beranda',
  icon: 'i-heroicons-home-20-solid',
  to: '/dashboard'
}, {
  label: 'Catatan',
  icon: 'i-heroicons-pencil-square',
  to: `/dashboard/notes`
}, {
  label: 'Soal',
  icon: 'i-heroicons-question-mark-circle',
  to: '/dashboard/questions'
},
{
  label: 'Chat',
  icon: 'i-heroicons-command-line',
  to: '/dashboard/chat'
},
{
  label: 'Tes',
  icon: 'i-heroicons-rectangle-stack',
  to: '/dashboard/tests'
},
{
  label: 'Analisis',
  icon: 'i-heroicons-chart-bar',
  to: '/dashboard/analysis'
},
{
  label: 'Pengaturan',
  icon: 'i-heroicons-cog-6-tooth',
  to: '/dashboard/settings'
}
]]
const breadCrumbLinks = [{
  label: 'Dashboard',
  icon: 'i-heroicons-home',
  to: '/dashboard'
}, {
  label: useRoute().path.split("/")[2],
  icon: "i-heroicons-square-3-stack-3d"
}]
</script>

<template>
  <AppNavbar />
  <main class="dashboard-group">
        <UVerticalNavigation :links="links" />
        <slot />
    </main>
</template>

<style>
.dashboard-group {
    display: flex;
    gap: 2vw;
}
* {
    margin: 0;
    padding: 0;
}
body {
    height: 100vh;
}
</style>