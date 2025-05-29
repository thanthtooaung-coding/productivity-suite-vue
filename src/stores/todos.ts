// stores/todos.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  completedAt?: Date
}

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([
    // Sample data
    {
      id: '1',
      text: 'Set up productivity suite',
      completed: true,
      createdAt: new Date('2024-01-15T09:00:00'),
      completedAt: new Date('2024-01-15T09:30:00'),
    },
    {
      id: '2',
      text: 'Create first note',
      completed: false,
      createdAt: new Date('2024-01-15T09:30:00'),
    },
    {
      id: '3',
      text: 'Add budget tracking',
      completed: false,
      createdAt: new Date('2024-01-15T10:00:00'),
    },
  ])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    }
    todos.value.unshift(newTodo) // Add to beginning for newest first
  }

  const toggleTodo = (id: string) => {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
      todo.completedAt = todo.completed ? new Date() : undefined
    }
  }

  const deleteTodo = (id: string) => {
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  }

  const updateTodo = (id: string, text: string) => {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) {
      todo.text = text
    }
  }

  // Computed properties
  const completedTodos = computed(() => todos.value.filter((todo) => todo.completed))

  const pendingTodos = computed(() => todos.value.filter((todo) => !todo.completed))

  const totalTodos = computed(() => todos.value.length)

  const completionRate = computed(() => {
    if (totalTodos.value === 0) return 0
    return Math.round((completedTodos.value.length / totalTodos.value) * 100)
  })

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    completedTodos,
    pendingTodos,
    totalTodos,
    completionRate,
  }
})
