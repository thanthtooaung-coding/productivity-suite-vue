<template>
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-bold text-gray-900">Notes</h2>
    <button
      @click="showNoteModal = true"
      class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
    >
      <i class="fas fa-plus"></i>
      <span>New Note</span>
    </button>
  </div>

  <NoteModal v-if="showNoteModal" @close="showNoteModal = false" @save="addNote" />

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <NoteCard
      v-for="note in notesStore.notes"
      :key="note.id"
      :note="note"
      @delete-note="deleteNote(note.id)"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useNotesStore } from '../../stores/notes'
import NoteCard from './components/NoteCard.vue'
import NoteModal from './components/NoteModal.vue'
const notesStore = useNotesStore()
const showNoteModal = ref(false)

const addNote = (note: { title: string; content: string }) => {
  notesStore.addNote(note.title, note.content)
  showNoteModal.value = false
}

const deleteNote = (id: string) => {
  notesStore.deleteNote(id)
}
</script>
