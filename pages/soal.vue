<template>
    <NuxtLayout :name="layout">
        <main class="soal">
            <UContainer>
                <article class="input-group">
                    <UInput class="topic" color="primary" variant="outline" placeholder="Masukan soal yang ingin dibuat!" v-model="topic" />
                    <article class="submit-group">
                    <USelectMenu v-model="selectedLanguage" :options="languages">
                        <template #leading>
                        <UAvatar v-if="selectedLanguage.avatar" v-bind="(selectedLanguage.avatar as Avatar)" size="2xs" />
                        </template>
                    </USelectMenu>
                    <USelect v-model="questionCount" :options="questionCounts" />
                    <UButton color="primary" variant="solid" @click="displayQuestions">Buat Soal</UButton>
                    </article>
                </article>
                <section>
                    <UCard style="margin-top: 1rem;background-color: #2F3645;" v-for="question of questions">
                        <template #header>
                            {{ question.question }}?
                        </template>
                        <div class="space-y-3">
                            <URadio v-for="option of question.options" :key="option" v-model="selectedAnswer[question.number]" v-bind="option" />
                        </div>


                    </UCard>
                </section>
                <aside class="actions" v-show="questionReceived">
                    <UButton @click="show_answers">Cek Jawaban</UButton>
                </aside>
                <div v-show=showed_answer>
                    <section v-for="question of questions">
                        <UCard style="margin-top: 1rem; border: 1px solid green !important;" v-if="selectedAnswer[question.number] === question.answerKey">
                                <template #header>
                                    {{ question.question }}?
                                </template>
                                <div class="space-y-2">
                                    <URadio disabled v-for="option of question.options" :key="option" v-model="selectedAnswer[question.number]" v-bind="option" color="grey"/>
                                </div>
                                <template #footer>
                                    {{ question.answer }}
                                </template>
                        </UCard>
                        <UCard style="margin-top: 1rem; border: 1px solid red !important;" v-else>
                                <template #header>
                                    {{ question.question }}?
                                </template>
                                <div class="space-y-2">
                                    <URadio disabled v-for="option of question.options" :key="option" v-model="selectedAnswer[question.number]" v-bind="option" color="grey"/>
                                </div>
                                <template #footer>
                                    {{ question.answer }}
                                </template>
                        </UCard>
                    </section>
                </div>
            </Ucontainer>
        </main>
    </NuxtLayout>
</template>
<script setup lang="ts">
import type { Avatar } from '#ui/types'
//  v-if="selectedAnswer[question.number] === question.answer"
const languages = [{
  id: 'Bahasa Indonesia',
  label: 'Bahasa Indonesia',
  target: '_blank',
  avatar: { src: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg' }
}, {
  id: 'Bahasa Inggris',
  label: 'Bahasa Inggris',
  target: '_blank',
  avatar: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/United-states_flag_icon_round.svg/1024px-United-states_flag_icon_round.svg.png' }
},
]
const questionJsonFormat = `
  {
    "question": "put the question here?",
    "options": [{"value":"A","label":"A. put option A here"},{"value":"B","label":"B. put option B here"},{"value":"C","label":"C. put option C here"},{"value":"D","label":"put option D here"}],
    "answer": "put the right option here (there can only be one right options)",
    "answerKey": "For example the answer key is A"
  }

  and put the json object in list please
`
const topic = ref()
const questionReceived = ref(false)

const questionCounts = [5, 10, 15, 20, 25, 30, 40]
const questionCount = ref(questionCounts[0])
const questions = ref()
const selectedLanguage = ref(languages[1])
const showed_answer = ref(false)
const show_answers = ref(() => {
    showed_answer.value = !showed_answer.value
    console.log(selectedAnswer)
})

const selectedAnswer = ref([])
async function displayQuestions() {
    selectedAnswer.value = []
    const get_questions = await getQuestions()
    questions.value = get_questions
    questionReceived.value = true
    showed_answer.value = false
}
async function getQuestions() {
    const response: any = await $fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer pfS623hAge5hEPUKymOYIGaWYIO7ruiuLk8EDIlvwGWJGXGp"
        },
        body: JSON.stringify({
            model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
            max_tokens: 16384,
            top_p: 1,
            top_k: 40,
            presence_penalty: 0,
            frequency_penalty: 0,
            temperature: 0.6,
            messages: [{"role": "user", "content": `(Response in Indonesian Language) Make ${questionCount.value} questions about ${topic.value} with options in json format like this ${questionJsonFormat} and please response in pure json no text outside of the json`}]
        })
    });
    let modifiedResponse = JSON.parse(response.choices[0].message.content)
    modifiedResponse.forEach((element: any, index: Number) => {
        element.number = index;
    });
    console.log(modifiedResponse)
    return modifiedResponse
}

const layout = "basic";
</script>

<style>
.topic {
    margin-bottom: 0.5rem;
}
.soal {
    padding-top: 2rem;
    padding-left: 5vw;
    padding-right: 5vw;
}
.input-group {
    display: flex;
    flex-direction: column;
}
.submit-group {
    display: flex;
}
@media only screen and (max-width: 600px) {
    .submit-group {
        flex-direction: column;
        gap: 0.2rem;
    }
}
</style>

