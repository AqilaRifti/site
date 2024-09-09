<script setup lang="ts">
const isSidebarOpened = ref(false)
let isUserLoggedOut = ref(true)
const supabase: any = useNuxtApp().$supabase;

onMounted(async () => {
  const { data, error } = await supabase.auth.getSession();
  
  if (data.session) {
    isUserLoggedOut.value = false
  } else {
    await navigateTo('/login')
  }
});
const logout = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error logging out:', error.message);
  } else {
    console.log('User logged out successfully');
    // Optionally, redirect to login page or clear user state
    window.location.href = '/login'; // Redirect to login page
  }
};
</script>

<template>
    <nav class="navbar">
        <NuxtLink to="/"><img class="logo" src="/logo_air.png" alt="logo"  /></NuxtLink>
        <nav class="wrapper">
            <ul class="navigation">
            </ul>
            <ul class="authentication" v-show="isUserLoggedOut">
                <UButton label="Login" to="/login" target="_self" variant="outline">
                    <template #trailing>
                        <UIcon name="i-heroicons-arrow-right-end-on-rectangle-20-solid" class="w-5 h-6" />
                    </template>
                </UButton>
                <UButton label="Register" to="/login" target="_self" variant="solid">
                    <template #trailing>
                        <img src="/user-plus.svg" class="h-6 w-5" />
                    </template>
                </UButton>
            </ul>
            <UButton label="Dashboard" to="/dashboard" variant="solid" v-show="!isUserLoggedOut" target="_self">
                <template #trailing>
                    <UIcon name="i-heroicons-folder-open" class="w-5 h-6" />
                </template>
            </UButton>
        </nav>
        <UButton @click="isSidebarOpened = true" class="menu-button">
            <template #trailing>
                <UIcon name="i-heroicons-bars-3-solid" class="w-5 h-6" />
            </template>
        </UButton>
        
    </nav>
    <USlideover v-model="isSidebarOpened">
        <i class="ph ph-x close-sidebar-icon sidebar-item" @click="isSidebarOpened = false"></i> 
        <NuxtLink class="sidebar-item" to="/">Beranda</NuxtLink>
        <NuxtLink class="sidebar-item" to="/Soal">Pembuat Soal</NuxtLink>
        <NuxtLink class="sidebar-item" to="/ai">Kumpulan AI</NuxtLink>
        <NuxtLink class="sidebar-item" to="/personality-test">Tes Kepribadian</NuxtLink>
        <NuxtLink class="sidebar-item" to="/learning-path-test">Tes Jalur Belajar</NuxtLink>
        <hr class="sidebar-divider">
        <ul class="authentication sidebar-item" v-show="isUserLoggedOut">
            <UButton label="Login" to="/login" target="_self" variant="outline">
                <template #trailing>
                    <UIcon name="i-heroicons-arrow-right-end-on-rectangle-20-solid" class="w-5 h-6" />
                </template>
            </UButton>
            <UButton label="Register" to="/login" target="_self" variant="solid">
                <template #trailing>
                    <img src="/user-plus.svg" class="h-6 w-5" />
                </template>
            </UButton>
        </ul>
        <UButton class="sidebar-item" label="Dashboard" to="/dashboard" variant="solid" color="white" v-show="!isUserLoggedOut" target="_self">
            <template #trailing>
                <UIcon name="i-heroicons-folder-open" class="w-5 h-6" />
            </template>
        </UButton>
    </USlideover>
</template>

<style scoped>
.authentication {
    display: flex;
    gap: 0.4rem;
}

.close-sidebar-icon {
    font-size: 35px;
    color: white;
}
.sidebar-divider {
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.navbar {
    font-family: sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding: 15px;
    height: 60px;
    background-color: #2c3e50;
    position: sticky;
    border-bottom: #f7f7f7f7 solid 1px;
    top: 0;
    z-index: 2;
}

.navbar-item{
    list-style-type: none;
    padding: 15px;
    text-decoration: none;
    color: #fff;
    font-size: 20px;
    text-transform: capitalize;
}
.sidebar{
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: fixed;
    height: 100vh;
    width: 250px;
    z-index: 999;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}
.sidebar-item{
    list-style-type: none;
    padding: 15px;
    text-decoration: none;
    color: #fff;
    font-size: 25px;
    text-transform: capitalize;
}

.sidebar-item:hover{
    color: crimson;
    transition: all .3s ease-in-out;
}

.wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    width: 100%;
    height: 30px;
}

.brand{
    display: flex;
    flex-direction: row;
    font-size: 1.5em;
    padding: 15px;
    text-transform: capitalize;
}

.login-button{
    list-style-type: none;
    text-decoration: none;
    padding: 10px;
    color: white;
    background-color: crimson;
}
.register-button {
    color: white;
    margin-left: 5px;
    border: 1px solid crimson;
    padding: 10px;
    font-size: 20px;
    text-decoration: none;
    text-transform: capitalize;
}

.register-button:hover {
    color: crimson;
    transition: all .3s ease-in-out
}


.logo {
    width: 50px;
    height: 50px;
}


.active {
    background-color: crimson;
    color: white;
    padding: 10px;
}

.menu-button{
    display: none;
}

@media (max-width : 800px) {
    .wrapper{
        display: none;
    }

    .menu-button{
        display: block;
        color: #fff;
        font-size: 30px;
    }
}

@media (max-width : 400px) {
    .sidebar{
        width: 100%;
    }
    
}
</style>