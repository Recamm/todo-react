import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Priority } from '../types/task'
import { IconPlus } from '@tabler/icons-react'

interface TaskFormProps {
  onAdd: (title: string, priority: Priority, description?: string) => void
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed, priority, description.trim() || undefined)
    setTitle('')
    setDescription('')
    setPriority('medium')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="flex-1 border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-2 text-sm outline-none focus:border-gray-500 placeholder:text-gray-500"
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
          className="border border-gray-700 bg-gray-800 text-gray-100 rounded px-2 py-2 text-sm outline-none focus:border-gray-500"
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        <button
          type="submit"
          className="flex items-center gap-1 bg-gray-100 text-gray-900 rounded px-3 py-2 text-sm hover:bg-white transition-colors font-medium"
        >
          <IconPlus size={16} />
          Agregar
        </button>
      </div>
      <input
        type="text"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-2 text-sm outline-none focus:border-gray-500 placeholder:text-gray-500"
      />
    </form>
  )
}
