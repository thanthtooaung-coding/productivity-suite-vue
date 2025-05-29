<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 card-hover"
  >
    <div class="flex justify-between items-start mb-3">
      <h3 class="font-semibold text-gray-900 truncate">{{ note.title }}</h3>
      <button
        @click="emit('delete-note', note.id)"
        class="text-gray-400 hover:text-red-500 transition-colors duration-200"
      >
        <i class="fas fa-trash text-sm"></i>
      </button>
    </div>
    <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ note.content }}</p>
    <div class="text-xs text-gray-400">
      {{ formatDate(note.createdAt) }}
    </div>
  </div>
</template>
<script setup lang="ts">
// import { formatDate } from '@/utils/dateUtils';
import type { Note } from '@/types'
import { defineEmits } from 'vue'

defineProps<{
  note: Note
}>()
const emit = defineEmits<{
  (e: 'delete-note', id: string): void
}>()

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
</script>
