import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import type { Status, Priority } from './types/task'
import { Header } from './components/Header'
import { TaskForm } from './components/TaskForm'
import { SearchBar } from './components/SearchBar'
import { FilterBar } from './components/FilterBar'
import { TaskList } from './components/TaskList'

type FilterStatus = 'all' | Status
type SortOrder = 'none' | 'asc' | 'desc'

const PRIORITY_VALUE: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
}

export default function App() {
  const { tasks, addTask, deleteTask, toggleTask } = useTasks()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('none')

  const filteredTasks = tasks
    .filter(task => {
      const query = searchQuery.toLowerCase()
      return (
        task.title.toLowerCase().includes(query) ||
        (task.description?.toLowerCase().includes(query) ?? false)
      )
    })
    .filter(task => {
      if (filterStatus === 'all') return true
      return task.status === filterStatus
    })
    .sort((a, b) => {
      if (sortOrder === 'none') return 0
      const diff = PRIORITY_VALUE[a.priority] - PRIORITY_VALUE[b.priority]
      return sortOrder === 'desc' ? -diff : diff
    })

  return (
    <div className="min-h-screen bg-gray-950">
      <Header taskCount={filteredTasks.length} />
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <TaskForm onAdd={addTask} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterBar
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
        <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
      </main>
    </div>
  )
}
