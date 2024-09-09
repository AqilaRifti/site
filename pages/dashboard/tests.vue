<script setup>
const layout = "dashboard"
</script>

<template>
    <NuxtLayout :name="layout">
        <main class="tests">
            <UCard class="choice">
                <template #header>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/TOEFL_Logo.svg" alt="">
                </template>

                <Placeholder class="h-32" />
                <UButton target="_self" to="/dashboard/toefl" color="red" variant="solid">Kerjakan Latihan</UButton>
            </UCard>
            <UCard class="choice">
                <template #header>
                    <img src="https://www.perspectives.ie/wp-content/uploads/2021/01/mbti_trans.png" alt="">
                </template>

                <Placeholder class="h-32" />
                <UButton color="red" to="/dashboard/mbti-test" variant="solid">Ambil Tes</UButton>
            </UCard>
            <UCard class="choice">
                <template #header>
                    <img src="/Learning Types.png"alt="">
                </template>

                <Placeholder class="h-32" />
                <UButton color="red"  to="/dashboard/style-test"  variant="solid">Ambil Tes</UButton>
            </UCard>
        </main>
    </NuxtLayout>
</template>

<style>
.tests {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem
}
</style>