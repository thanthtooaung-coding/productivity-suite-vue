// stores/budget.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  description: string
  category: string
  amount: number
  date: Date
}

export const useBudgetStore = defineStore('budget', () => {
  const transactions = ref<Transaction[]>([
    // Sample data
    {
      id: '1',
      type: 'income',
      description: 'Salary',
      category: 'Work',
      amount: 5000,
      date: new Date('2024-01-01T00:00:00'),
    },
    {
      id: '2',
      type: 'expense',
      description: 'Rent',
      category: 'Housing',
      amount: 1200,
      date: new Date('2024-01-02T00:00:00'),
    },
    {
      id: '3',
      type: 'expense',
      description: 'Groceries',
      category: 'Food',
      amount: 150,
      date: new Date('2024-01-03T00:00:00'),
    },
    {
      id: '4',
      type: 'income',
      description: 'Freelance Project',
      category: 'Work',
      amount: 800,
      date: new Date('2024-01-05T00:00:00'),
    },
    {
      id: '5',
      type: 'expense',
      description: 'Gas',
      category: 'Transportation',
      amount: 60,
      date: new Date('2024-01-06T00:00:00'),
    },
  ])

  const addTransaction = (
    type: 'income' | 'expense',
    description: string,
    category: string,
    amount: number,
  ) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      description,
      category,
      amount,
      date: new Date(),
    }
    transactions.value.unshift(newTransaction) // Add to beginning for newest first
  }

  const deleteTransaction = (id: string) => {
    const index = transactions.value.findIndex((transaction) => transaction.id === id)
    if (index > -1) {
      transactions.value.splice(index, 1)
    }
  }

  const updateTransaction = (
    id: string,
    type: 'income' | 'expense',
    description: string,
    category: string,
    amount: number,
  ) => {
    const transaction = transactions.value.find((t) => t.id === id)
    if (transaction) {
      transaction.type = type
      transaction.description = description
      transaction.category = category
      transaction.amount = amount
    }
  }

  // Computed properties
  const totalIncome = computed(() => {
    return transactions.value
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  })

  const totalExpenses = computed(() => {
    return transactions.value
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  })

  const balance = computed(() => {
    return totalIncome.value - totalExpenses.value
  })

  const incomeTransactions = computed(() => transactions.value.filter((t) => t.type === 'income'))

  const expenseTransactions = computed(() => transactions.value.filter((t) => t.type === 'expense'))

  const categorySummary = computed(() => {
    const summary: Record<string, { income: number; expense: number; total: number }> = {}

    transactions.value.forEach((transaction) => {
      if (!summary[transaction.category]) {
        summary[transaction.category] = { income: 0, expense: 0, total: 0 }
      }

      if (transaction.type === 'income') {
        summary[transaction.category].income += transaction.amount
        summary[transaction.category].total += transaction.amount
      } else {
        summary[transaction.category].expense += transaction.amount
        summary[transaction.category].total -= transaction.amount
      }
    })

    return summary
  })

  const recentTransactions = computed(
    () => transactions.value.slice(0, 10), // Get last 10 transactions
  )

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    totalIncome,
    totalExpenses,
    balance,
    incomeTransactions,
    expenseTransactions,
    categorySummary,
    recentTransactions,
  }
})
