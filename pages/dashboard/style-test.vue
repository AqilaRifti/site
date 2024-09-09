<template>
    <NuxtLayout :name="layout">
        <main class="soal">
            <UDivider>
                <UButton v-on:click="displayQuestions">Start</UButton>

             </UDivider>
            <UContainer>
                <section>
                    <UCard style="margin-top: 1rem;background-color: #2F3645;" v-for="question of questions">
                            {{ question.question }}
                        <template #footer>
                        <div class="space-y-3">
                            <URadio v-for="option of question.options" :key="option" v-model="selectedAnswer[question.number]" v-bind="option" />
                        </div>
                    </template>
                </UCard>
                <UTextarea color="primary" v-model="essay" variant="outline" placeholder="Describe your learning as detail as possible in here" style="margin-top: 0.5rem!important;margin-bottom: 0.5rem!important" />
                <aside class="actions" v-show="questionReceived">
                    <UButton @click="show_answers">Cek MBTI</UButton>
                </aside>
                </section>
            </Ucontainer>
        </main>
    </NuxtLayout>
</template>
<script setup lang="ts">
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
    "options": [{"value":"A. put option A here"","label":"A. put option A here"},{"value":"B. put option B here","label":"B. put option B here"},{"value":"C. put option C here","label":"C. put option C here"},{"value":"D. put option D here","label":"put option D here"}],
  }

  and put the json object in list please
`
const topic = ref()
const questionReceived = ref(false)
const essay = ref("")
const questionCounts = [5, 10, 15, 20, 25, 30, 40]
const questionCount = ref(questionCounts[4])
const questions = ref()
const selectedLanguage = ref(languages[1])
const showed_answer = ref(false)
const show_answers = ref(async () => {
    const response: any = await $fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer fw_3ZQCex4kceQGgfweNB7bF1Wk"
        },
        body: JSON.stringify({
            model: "accounts/fireworks/models/llama-v3p1-405b-instruct",
            max_tokens: 16384,
            top_p: 1,
            top_k: 40,
            presence_penalty: 0,
            frequency_penalty: 0,
            temperature: 0.6,
            messages: [{"role": "user", "content": `(Respond in Indonesian Language) Make ${questionCount.value} multiple choice Learning style (Auditori/Visual/Kinestetik) questions to determine learning style with options in json format like this ${questionJsonFormat} and please response in pure json no text outside of the json`}, {"role": "assistant", "content": `${questions.value}`}, {"role": "user", "content": `I will now respond with my result and you have to tell me whats my learnings style (auditori/visual/kinestetik)) in one word. here is the result ${selectedAnswer.value}. and here is my essay about my self ${essay.value}`}]
        })
    });
    console.log(response)
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
    console.log("call")
    const response: any = await $fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer fw_3ZQCex4kceQGgfweNB7bF1Wk"
        },
        body: JSON.stringify({
            model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
            max_tokens: 16384,
            top_p: 1,
            top_k: 40,
            presence_penalty: 0,
            frequency_penalty: 0,
            temperature: 0.6,
            messages: [{"role": "user", "content": `(Respond in Indonesian Language) Make ${questionCount.value} multiple choice Learning style (Auditori/Visual/Kinestetik) questions to determine learning style with options in json format like this ${questionJsonFormat} and please response in pure json no text outside of the json`}]
        })
    });
    let modifiedResponse = JSON.parse(response.choices[0].message.content)
    modifiedResponse.forEach((element: any, index: Number) => {
        element.number = index;
    });
    console.log(modifiedResponse)
    return modifiedResponse
}
const layout = "dashboard";
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

