import { ref } from 'vue'

import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<
    Array<{
      id: string
      title: string
      content: string
      createdAt: Date
    }>
  >([])

  const addNote = (title: string, content: string) => {
    notes.value.push({
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date(),
    })
  }

  const deleteNote = (id: string) => {
    const index = notes.value.findIndex((note) => note.id === id)
    if (index > -1) {
      notes.value.splice(index, 1)
    }
  }

  return { notes, addNote, deleteNote }
})
