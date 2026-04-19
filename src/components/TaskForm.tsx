import { useForm } from 'react-hook-form'
import type { Priority } from '../types/task'
import { IconPlus } from '@tabler/icons-react'

interface TaskFormProps {
  onAdd: (title: string, priority: Priority, description?: string) => void
}

interface FormValues {
  title: string
  priority: Priority | ''
  description: string
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { title: '', priority: '', description: '' },
  })

  function onSubmit(data: FormValues) {
    onAdd(data.title.trim(), data.priority as Priority, data.description.trim() || undefined)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-3">
      <div className="flex gap-2 items-start">
        <div className="flex-1 flex flex-col gap-1">
          <input
            type="text"
            placeholder="Nueva tarea..."
            {...register('title', { required: 'El título es obligatorio' })}
            className={`w-full border bg-gray-800 text-gray-100 rounded px-3 py-2 text-sm outline-none placeholder:text-gray-500 transition-colors ${
              errors.title ? 'border-red-500 focus:border-red-400' : 'border-gray-700 focus:border-gray-500'
            }`}
          />
          {errors.title && (
            <p className="text-red-400 text-xs">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <select
            {...register('priority', { required: 'Selecciona una prioridad' })}
            className={`border bg-gray-800 text-gray-100 rounded px-2 py-2 text-sm outline-none transition-colors ${
              errors.priority ? 'border-red-500 focus:border-red-400' : 'border-gray-700 focus:border-gray-500'
            }`}
          >
            <option value="" disabled>Prioridad</option>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
          {errors.priority && (
            <p className="text-red-400 text-xs">{errors.priority.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="flex items-center gap-1 bg-gray-100 text-gray-900 rounded px-3 py-2 text-sm hover:bg-white transition-colors font-medium self-start"
        >
          <IconPlus size={16} />
          Agregar
        </button>
      </div>
      <input
        type="text"
        placeholder="Descripción (opcional)"
        {...register('description')}
        className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-2 text-sm outline-none focus:border-gray-500 placeholder:text-gray-500"
      />
    </form>
  )
}
