import { useState } from 'react'
import type { Task, Priority } from '../types/task'

const STORAGE_KEY = 'todo-tasks'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as Task[]) : []
  } catch {
    return []
  }
}

function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  function addTask(title: string, priority: Priority, description?: string) {
    const newTask: Task = {
      id: generateId(),
      title,
      description,
      priority,
      status: 'pending',
    }
    setTasks(prev => {
      const updated = [...prev, newTask]
      saveTasks(updated)
      return updated
    })
  }

  function deleteTask(id: string) {
    setTasks(prev => {
      const updated = prev.filter(task => task.id !== id)
      saveTasks(updated)
      return updated
    })
  }

  function toggleTask(id: string) {
    setTasks(prev => {
      const updated = prev.map(task =>
        task.id === id
          ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
          : task
      ) as Task[]
      saveTasks(updated)
      return updated
    })
  }

  return { tasks, addTask, deleteTask, toggleTask }
}
