// types/index.ts

export interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
}

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  completedAt?: Date
}

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  description: string
  category: string
  amount: number
  date: Date
}

export interface Tab {
  id: string
  name: string
  icon: string
}

export interface CategorySummary {
  [category: string]: {
    income: number
    expense: number
    total: number
  }
}

export type FilterType = 'all' | 'pending' | 'completed'
export type TransactionType = 'income' | 'expense'
