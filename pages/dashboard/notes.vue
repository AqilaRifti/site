<script setup>
import { ref, onMounted } from 'vue';
const layout = "dashboard"
const supabase = useNuxtApp().$supabase;
const notes = ref([]); // To store fetched notes
async function fetchUserId() {
  const { data, error } = await supabase.auth.getUser(); // Retrieve the user session

  if (error) {
    console.error('Error fetching user:', error);
  } else if (data?.user) {
    return data.user.id;
  }
}
const userID = await fetchUserId()
async function fetchNoteById(noteId) {
  const { data, error } = await supabase
    .from('user_notes')
    .select('id, title, content, created_at') // Specify the fields you want
    .eq('id', noteId) // Filter by the specific ID
    .single(); // Use single() if you expect only one result

  if (error) {
    console.error('Error fetching note:', error);
    return null;
  } else {
    return data;
  }
}
// Function to fetch all notes from Supabase
async function fetchNotes() {
  const { data, error } = await supabase
    .from('user_notes')
    .select('id, title, created_at').eq('user_id', userID);

  if (error) {
    console.error('Error fetching notes:', error);
  } else {
    notes.value = data; // Store the fetched notes
  }
}

// Fetch notes when the component is mounted
onMounted(() => {
  fetchNotes();
});
async function createNote(user_id, title, content) {
  const { data, error } = await supabase
    .from('user_notes')
    .insert([{ user_id, title, content }]).select('id').single();

  if (error) {
    console.error('Error creating note:', error);
  } else {
    console.log(data)
    return data;
  }
}
const newNote = () => {
  createNote(userID, "Catatan Baru", "# Hello World").then(
    async (value) => {await navigateTo(`/dashboard/write/${value.id}`)
    }
  )
}
const deleteNote = async (note_id) => {
  const { data, error } = await supabase
  .from('user_notes')
  .delete()
  .eq('id', note_id);  // Replace 'note_id' with the actual ID of the note to delete
  window.location.reload()
}
const duplicateNote = (note_id) => {
  fetchNoteById(note_id).then((value) =>
  createNote(userID, `Duplikat dari ${value.title}`, value.content))
  window.location.reload()
}
const connectToAI = () => {
  
}
</script>

<template>
  <NuxtLayout :name="layout">
    <UDivider>
      <UButton label="Buat Catatan" v-on:click="newNote">
        <template #trailing>
          <UIcon name="i-heroicons-plus"></UIcon>
        </template>
      </UButton>
      <UButton color="blue" style="margin-left: 0.5rem ;" label="Sambung Ke AI" v-on:click="">
        <template #trailing>
          <UIcon name="i-heroicons-link"></UIcon>
        </template>
      </UButton>
    </UDivider>
      <UDivider label="Kumpulan Catatan" size="sm" />
        <div class="notes-container">
            <UCard v-for="note in notes" :key="note.id">
                <template #header>
                    <h3>{{ note.title }}</h3>
                </template>
        
                <h6>{{new Date(note.created_at).toLocaleString()}}</h6>
        
                <template #footer>
                    <section class="cta-container">
                        <UButton color="primary" :to="`/dashboard/write/${note.id}`">
                            <template #trailing>
                                <UIcon name="i-heroicons-pencil-square" class="w-5 h-6" />
                            </template>
                        </UButton>
                        <UButton color="blue" variant="solid" :to="`/dashboard/read/${note.id}`" target="_self">
                            <template #trailing>
                                <UIcon name="i-heroicons-book-open" class="w-5 h-6" />
                            </template>
                        </UButton>
                        <UButton color="white" variant="solid" v-on:click="duplicateNote(note.id)">
                            <template #trailing>
                                <UIcon name="i-heroicons-document-duplicate" class="w-5 h-6" />
                            </template>
                        </UButton>
                        <UButton color="red" v-on:click="deleteNote(note.id)">
                            <template #trailing>
                                <UIcon name="i-heroicons-trash" class="w-5 h-6" />
                            </template>
                        </UButton>
                    </section>
                </template>
            </UCard>
        </div>
    </NuxtLayout>
</template>

<style>
.notes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}
.cta-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>
