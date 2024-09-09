<script setup>
const layout = "dashboard";
const supabase = useNuxtApp().$supabase;
const route = useRoute()
const markdownEditor = ref(null);

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

onMounted(async () => {
  // Initialize SimpleMDE and store the instance in markdownEditor
  markdownEditor.value = new SimpleMDE({
    element: document.getElementById("editor"),
    spellChecker: false,
    toolbar: false, // Disable the toolbar
    status: false, // Disable the status bar if you want
    readOnly: true // Set the editor to read-only mode
  });
  fetchNoteById(route.params.id).then(
      (value) => {
        markdownEditor.value.value(value.content)
      }
    )
});

</script>

<template>
  <NuxtLayout :name="layout">
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
