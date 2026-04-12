import type { Task, Priority } from '../types/task'
import { IconTrash, IconCheck } from '@tabler/icons-react'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const PRIORITY_STYLES: Record<Priority, string> = {
  high:   'bg-red-950 text-red-400 border border-red-800',
  medium: 'bg-amber-950 text-amber-400 border border-amber-800',
  low:    'bg-gray-800 text-gray-400 border border-gray-600',
}

const PRIORITY_LABELS: Record<Priority, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="flex items-start gap-3 py-3 px-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors group">
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.status === 'completed' ? 'Marcar pendiente' : 'Marcar completada'}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
          task.status === 'completed'
            ? 'bg-gray-100 border-gray-100 text-gray-900'
            : 'border-gray-600 hover:border-gray-400'
        }`}
      >
        {task.status === 'completed' && <IconCheck size={12} strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-snug ${task.status === 'completed' ? 'line-through text-gray-600' : 'text-gray-100'}`}>
          {task.title}
        </p>
        {task.description && (
          <p className={`text-xs mt-0.5 ${task.status === 'completed' ? 'text-gray-600' : 'text-gray-400'}`}>
            {task.description}
          </p>
        )}
      </div>

      <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded font-medium ${PRIORITY_STYLES[task.priority]}`}>
        {PRIORITY_LABELS[task.priority]}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        aria-label="Eliminar tarea"
        className="flex-shrink-0 mt-0.5 text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
      >
        <IconTrash size={16} />
      </button>
    </li>
  )
}
