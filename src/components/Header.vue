<template>
  <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
          >
            <span class="text-white font-bold text-sm">PS</span>
          </div>
          <h1
            class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Productivity Suite
          </h1>
        </div>
        <nav class="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="$emit('update:activeTab', tab.id)"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
            ]"
          >
            <i :class="tab.icon" class="mr-2"></i>
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  tabs: { id: string; name: string; icon: string }[]
  activeTab: string
}>()

defineEmits<{
  (e: 'update:activeTab', id: string): void
}>()
</script>
