<script setup>
const layout = "dashboard";
const supabase = useNuxtApp().$supabase;
const route = useRoute()
const markdownEditor = ref(null);
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
async function createNote(user_id, title, content) {
  const { data, error } = await supabase
    .from('user_notes')
    .insert([{ user_id, title, content }]);

  if (error) {
    console.error('Error creating note:', error);
  } else {
    console.log('Note created:', data);
  }
}

async function updateNote(note_id, newTitle, newContent) {
  const { data, error } = await supabase
    .from('user_notes')
    .update({ title: newTitle, content: newContent })
    .eq('id', note_id); // Match the note's unique id

  if (error) {
    console.error('Error updating note:', error);
  } else {
    console.log('Note updated:', data);
  }
}

async function saveNote(note_id, user_id, title, content) {
  if (note_id) {
    // If note_id exists, update the note
    await updateNote(note_id, title, content);
  } else {
    // If no note_id, create a new note
    await createNote(user_id, title, content);
  }
}
const title = ref("")
onMounted(async () => {
  // Initialize SimpleMDE and store the instance in markdownEditor
  markdownEditor.value = new SimpleMDE({
    element: document.getElementById("editor"),
    spellChecker: false,
  });
  fetchNoteById(route.params.id).then(
      (value) => {
        markdownEditor.value.value(value.content)
        title.value = value.title
      }
    )

      setInterval(() => {
        saveNote(route.params.id, userID, title.value, markdownEditor.value.value())
      }, 10000);
});
</script>

<template>
  <NuxtLayout :name="layout">
    <UInput
    color="primary" variant="outline"
    placeholder="Put the title here"
    class="w-full"
    v-model="title"
    :model-value="title"
    style="margin-bottom: 0.5rem;"
  />
    <div class="primary-textarea">
      <textarea id="editor"></textarea>
    </div>
  </NuxtLayout>
</template>

<style>
.primary-textarea {
  min-width: 80vw !important;
}
.editor-toolbar {
  background-color: #f7f7f7 !important;
}
.CodeMirror {
  background-color: #222 !important;
  color: white !important;
  width: 100%;
  caret-color: aqua !important;
}
.CodeMirror::selection {
  color: red;
  background: yellow;
}
</style>
