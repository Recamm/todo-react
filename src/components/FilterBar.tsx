import type { Status } from '../types/task'
import { IconArrowsSort, IconSortAscending, IconSortDescending } from '@tabler/icons-react'

type FilterStatus = 'all' | Status
type SortOrder = 'none' | 'asc' | 'desc'

interface FilterBarProps {
  filterStatus: FilterStatus
  onFilterChange: (status: FilterStatus) => void
  sortOrder: SortOrder
  onSortChange: (order: SortOrder) => void
}

const STATUS_LABELS: Record<FilterStatus, string> = {
  all: 'Todas',
  pending: 'Pendientes',
  completed: 'Completadas',
}

const SORT_CYCLE: Record<SortOrder, SortOrder> = {
  none: 'desc',
  desc: 'asc',
  asc: 'none',
}

const SORT_LABELS: Record<SortOrder, string> = {
  none: 'Prioridad',
  desc: 'Mayor primero',
  asc: 'Menor primero',
}

const SortIcon = ({ order }: { order: SortOrder }) => {
  if (order === 'desc') return <IconSortDescending size={15} />
  if (order === 'asc') return <IconSortAscending size={15} />
  return <IconArrowsSort size={15} />
}

export function FilterBar({ filterStatus, onFilterChange, sortOrder, onSortChange }: FilterBarProps) {
  const statuses: FilterStatus[] = ['all', 'pending', 'completed']

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex gap-1">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => onFilterChange(s)}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              filterStatus === s
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>
      <button
        onClick={() => onSortChange(SORT_CYCLE[sortOrder])}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
          sortOrder !== 'none'
            ? 'bg-gray-800 text-gray-100'
            : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
        }`}
      >
        <SortIcon order={sortOrder} />
        {SORT_LABELS[sortOrder]}
      </button>
    </div>
  )
}
