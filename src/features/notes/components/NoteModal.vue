<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6" @click.stop>
      <h3 class="text-lg font-medium text-gray-900 mb-4">Add New Note</h3>
      <form @submit.prevent="onSubmit">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              v-model="noteForm.title"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              v-model="noteForm.content"
              rows="4"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
          </div>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Save Note
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch } from 'vue'

interface NoteForm {
  title: string
  content: string
}

// Props: initial form data (optional)
const props = defineProps<{
  modelValue?: NoteForm
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', noteForm: NoteForm): void
}>()

const noteForm = reactive<NoteForm>({
  title: props.modelValue?.title ?? '',
  content: props.modelValue?.content ?? '',
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      noteForm.title = newVal.title
      noteForm.content = newVal.content
    }
  },
)

function onSubmit() {
  emit('save', { ...noteForm })
}
</script>
