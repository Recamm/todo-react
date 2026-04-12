interface HeaderProps {
  taskCount: number
}

export function Header({ taskCount }: HeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-gray-900 px-6 py-4">
      <div className="max-w-2xl mx-auto flex items-baseline gap-3">
        <h1 className="text-xl font-semibold tracking-tight text-gray-100">Tareas</h1>
        <span className="text-sm text-gray-500">{taskCount} elemento{taskCount !== 1 ? 's' : ''}</span>
      </div>
    </header>
  )
}
