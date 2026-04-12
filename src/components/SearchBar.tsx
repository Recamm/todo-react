import { IconSearch } from '@tabler/icons-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder="Buscar por título o descripción..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-3 py-2 pl-9 text-sm outline-none focus:border-gray-500 placeholder:text-gray-500"
      />
    </div>
  )
}
