# TODO App

Aplicacion web para gestionar tareas, desarrollada con React y TypeScript. Implementa las iteraciones 1 y 2 del trabajo practico.

---

## Stack tecnologico

| Tecnologia | Version | Uso |
|---|---|---|
| Vite | 6.x | Bundler / servidor de desarrollo |
| React | 19.x | Libreria de UI |
| TypeScript | 5.x | Tipado estatico |
| Tailwind CSS | 3.x | Estilos utilitarios |
| @tabler/icons-react | 3.x | Iconos |

---

## Instalacion y ejecucion

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para produccion
npm run build
```

El servidor de desarrollo se levanta en http://localhost:5173 por defecto.

---

## Funcionalidades

### Iteracion 0 - Base

- **Agregar tareas**: formulario con titulo, descripcion opcional y seleccion de prioridad.
- **Visualizar tareas**: lista vertical compacta con titulo, descripcion, badge de prioridad y estado visual.
- **Marcar como completada**: click en el checkbox alterna el estado entre `pending` y `completed`. Las tareas completadas aparecen con texto tachado.

### Iteracion 1 - Funciones avanzadas

- **Buscar**: input filtra en tiempo real por titulo y/o descripcion.
- **Filtrar por estado**: botones para mostrar todas, solo pendientes o solo completadas.
- **Ordenar por prioridad**: alterna entre sin orden, mayor primero (Alta > Media > Baja) y menor primero.
- **Eliminar**: boton que aparece al hacer hover sobre una tarea (icono de papelera).

---

## Estructura del proyecto

```
src/
+-- components/
�   +-- Header.tsx       � Barra superior con titulo y contador
�   +-- TaskForm.tsx     � Formulario para agregar tareas
�   +-- SearchBar.tsx    � Input de busqueda
�   +-- FilterBar.tsx    � Filtros de estado + boton de ordenamiento
�   +-- TaskItem.tsx     � Fila individual de una tarea
�   +-- TaskList.tsx     � Renderiza la lista de TaskItems
+-- hooks/
�   +-- useTasks.ts      � Estado y operaciones sobre tareas
+-- types/
�   +-- task.ts          � Tipos e interfaces TypeScript
+-- App.tsx              � Composicion principal, logica de filtrado
+-- main.tsx             � Punto de entrada React
+-- index.css            � Directivas Tailwind
```

---

## Tipos e interfaces

```typescript
// src/types/task.ts

type Priority = 'low' | 'medium' | 'high'
type Status   = 'pending' | 'completed'

interface Task {
  id:           string       // identificador unico (generado automaticamente)
  title:        string       // titulo de la tarea
  description?: string       // descripcion opcional
  priority:     Priority     // prioridad: baja, media o alta
  status:       Status       // estado: pendiente o completada
}
```

---

## Logica de filtrado (App.tsx)

El array `filteredTasks` se recalcula en cada render a partir de `tasks`:

1. **Busqueda**: `title` o `description` contienen el `searchQuery` (case-insensitive).
2. **Filtro de estado**: mantiene solo las tareas cuyo `status` coincide con `filterStatus` (o todas si es `all`).
3. **Ordenamiento**: segun `sortOrder`, ordena por valor numerico de prioridad (high=3, medium=2, low=1) de forma ascendente o descendente.

---

## Separacion de responsabilidades

| Archivo | Responsabilidad |
|---|---|
| `useTasks.ts` | Estado de tareas: addTask, deleteTask, toggleTask |
| `App.tsx` | Estado de UI (busqueda, filtro, orden) + calculo de filteredTasks + composicion |
| `TaskForm.tsx` | Captura de datos para nueva tarea |
| `SearchBar.tsx` | Input controlado de busqueda |
| `FilterBar.tsx` | Seleccion de filtro de estado y orden |
| `TaskList.tsx` | Renderizado de la coleccion de tareas |
| `TaskItem.tsx` | Presentacion e interaccion de una tarea individual |