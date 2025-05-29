<!-- App.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
    <!-- Include Font Awesome -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />

    <!-- Header -->
    <Header :tabs="tabs" v-model:activeTab="activeTab" />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Notes Section -->
      <div v-if="activeTab === 'notes'" class="space-y-6">
        <NoteIndex />
      </div>

      <!-- Todo Section -->
      <div v-if="activeTab === 'todos'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-900">Todo List</h2>
          <div class="flex items-center space-x-3">
            <select
              v-model="todoFilter"
              class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <!-- Add Todo Form -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form @submit.prevent="addTodo" class="flex space-x-3">
            <input
              v-model="newTodo"
              type="text"
              placeholder="Add a new task..."
              class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <button
              type="submit"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Add
            </button>
          </form>
        </div>

        <!-- Todo List -->
        <div class="space-y-3">
          <div
            v-for="todo in filteredTodos"
            :key="todo.id"
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center space-x-4 card-hover"
          >
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="toggleTodo(todo.id)"
              class="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span
              :class="['flex-1', todo.completed ? 'text-gray-500 line-through' : 'text-gray-900']"
            >
              {{ todo.text }}
            </span>
            <button
              @click="deleteTodo(todo.id)"
              class="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Budget Section -->
      <div v-if="activeTab === 'budget'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-900">Budget Management</h2>
          <button
            @click="showBudgetModal = true"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <i class="fas fa-plus"></i>
            <span>Add Transaction</span>
          </button>
        </div>

        <!-- Budget Summary -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <i class="fas fa-arrow-up text-green-600"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Income</p>
                <p class="text-2xl font-bold text-green-600">
                  ${{ budgetStore.totalIncome.toFixed(2) }}
                </p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="p-2 bg-red-100 rounded-lg">
                <i class="fas fa-arrow-down text-red-600"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Expenses</p>
                <p class="text-2xl font-bold text-red-600">
                  ${{ budgetStore.totalExpenses.toFixed(2) }}
                </p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <i class="fas fa-wallet text-blue-600"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Balance</p>
                <p
                  class="text-2xl font-bold"
                  :class="budgetStore.balance >= 0 ? 'text-blue-600' : 'text-red-600'"
                >
                  ${{ budgetStore.balance.toFixed(2) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Transactions -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Recent Transactions</h3>
          </div>
          <div class="divide-y divide-gray-200">
            <div
              v-for="transaction in budgetStore.recentTransactions"
              :key="transaction.id"
              class="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
            >
              <div class="flex items-center space-x-4">
                <div
                  :class="[
                    'p-2 rounded-lg',
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100',
                  ]"
                >
                  <i
                    :class="[
                      'fas',
                      transaction.type === 'income'
                        ? 'fa-arrow-up text-green-600'
                        : 'fa-arrow-down text-red-600',
                    ]"
                  ></i>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ transaction.description }}</p>
                  <p class="text-sm text-gray-500">{{ transaction.category }}</p>
                </div>
              </div>
              <div class="text-right">
                <p
                  :class="[
                    'font-semibold',
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600',
                  ]"
                >
                  {{ transaction.type === 'income' ? '+' : '-' }}${{
                    transaction.amount.toFixed(2)
                  }}
                </p>
                <p class="text-xs text-gray-400">{{ formatDate(transaction.date) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Budget Modal -->
    <div
      v-if="showBudgetModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="showBudgetModal = false"
    >
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6" @click.stop>
        <h3 class="text-lg font-medium text-gray-900 mb-4">Add Transaction</h3>
        <form @submit.prevent="addTransaction">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                v-model="transactionForm.type"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                v-model="transactionForm.description"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                v-model="transactionForm.category"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                v-model="transactionForm.amount"
                type="number"
                step="0.01"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="showBudgetModal = false"
              class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodosStore } from './stores/todos'
import { useBudgetStore } from './stores/budget'
import Header from './components/Header.vue'
import NoteIndex from './features/notes/NoteIndex.vue'

const todosStore = useTodosStore()
const budgetStore = useBudgetStore()

// Active tab
const activeTab = ref('notes')

// Tab configuration
const tabs = [
  { id: 'notes', name: 'Notes', icon: 'fas fa-sticky-note' },
  { id: 'todos', name: 'Todos', icon: 'fas fa-list-check' },
  { id: 'budget', name: 'Budget', icon: 'fas fa-dollar-sign' },
]

// Todos
const newTodo = ref('')
const todoFilter = ref('all')

const addTodo = () => {
  if (newTodo.value.trim()) {
    todosStore.addTodo(newTodo.value.trim())
    newTodo.value = ''
  }
}

const toggleTodo = (id: string) => {
  todosStore.toggleTodo(id)
}

const deleteTodo = (id: string) => {
  todosStore.deleteTodo(id)
}

const filteredTodos = computed(() => {
  const todos = todosStore.todos
  if (todoFilter.value === 'completed') {
    return todos.filter((todo) => todo.completed)
  } else if (todoFilter.value === 'pending') {
    return todos.filter((todo) => !todo.completed)
  }
  return todos
})

// Budget
const showBudgetModal = ref(false)
const transactionForm = ref({
  type: 'expense',
  description: '',
  category: '',
  amount: 0,
})

const addTransaction = () => {
  budgetStore.addTransaction(
    transactionForm.value.type as 'income' | 'expense',
    transactionForm.value.description,
    transactionForm.value.category,
    transactionForm.value.amount,
  )
  transactionForm.value = {
    type: 'expense',
    description: '',
    category: '',
    amount: 0,
  }
  showBudgetModal.value = false
}

// Utility function
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

<style>
@import 'tailwindcss';

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
