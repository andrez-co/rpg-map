# Aventura RPG - Sistema de Navegación

## Descripción General

Este es un sistema de navegación para un juego de rol (RPG) desarrollado con React, TypeScript, Vite y Tailwind CSS. El proyecto implementa un sistema de exploración de salas utilizando React Router v7 para la navegación y Zustand para el manejo del estado global.

## Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.x | Framework principal |
| TypeScript | ~6.0.2 | Tipado estático |
| Vite | ^8.0.4 | Build tool y servidor de desarrollo |
| React Router DOM | ^7.14.1 | Sistema de rutas |
| Zustand | ^5.0.12 | Estado global |
| Tailwind CSS | ^4.2.2 | Estilos |

## Estructura del Proyecto

```
rpg-map/
├── src/
│   ├── components/
│   │   └── Layout.tsx        # Layout principal con navegación
│   ├── context/
│   │   └── ThemeContext.tsx  # Contexto para modo claro/oscuro
│   ├── data/
│   │   └── worldMap.ts       # Datos del mundo del juego (JSON)
│   ├── pages/
│   │   ├── Home.tsx          # Página de inicio (formulario jugador)
│   │   ├── Game.tsx          # Página de exploración
│   │   └── Map.tsx           # Página del mapa
│   ├── store/
│   │   └── gameStore.ts      # Store de Zustand
│   ├── App.tsx               # Componente principal con rutas
│   ├── root.tsx              # Punto de entrada
│   └── style.css             # Estilos globales
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Datos del Mundo (worldMap.ts)

El archivo `worldMap.ts` contiene la definición del mundo del juego como un array de objetos JSON:

```typescript
export interface Room {
  id: string;
  nombre: string;
  descripcion: string;
  direcciones: {
    norte: string | null;
    sur: string | null;
    este: string | null;
    oeste: string | null;
  };
}
```

### Salas del Juego

| ID | Nombre | Descripción |
|----|--------|-------------|
| entrada | Entrada de la Cueva | Un arco de piedra antiguo cubierto de musgo |
| pasillo | Pasillo de las Sombras | Un pasillo largo con antorchas que parpadean |
| biblioteca | Gran Biblioteca | Miles de libros polvorientos |
| celda | Celda Olvidada | Una habitación pequeña y húmeda |
| trono | Salón del Trono | Un salón majestuoso con un trono de hueso |

### Conexiones entre Salas

```
        [trono]
           |
[celda] -- [pasillo] -- [biblioteca]
           |
        [entrada]
```

## Estado Global (Zustand)

El store de Zustand (`gameStore.ts`) gestiona el estado del juego:

```typescript
interface GameState {
  playerName: string;
  currentLocationId: string;
  setPlayerName: (name: string) => void;
  move: (direction: 'norte' | 'sur' | 'este' | 'oeste') => boolean;
}
```

### Métodos del Store

- `setPlayerName(name)`: Establece el nombre del jugador
- `move(direction)`: Mueve al jugador en la dirección especificada. Retorna `true` si el movimiento fue exitoso, `false` si no hay sala en esa dirección

### Uso del Store en Componentes

```typescript
import { useGameStore } from './store/gameStore';

const MyComponent = () => {
  const playerName = useGameStore(state => state.playerName);
  const currentLocationId = useGameStore(state => state.currentLocationId);
  const move = useGameStore(state => state.move);
};
```

## Sistema de Rutas (React Router v7)

### Rutas Definidas

| Ruta | Componente | Protección |
|------|------------|------------|
| `/` | Home | No requiere protección |
| `/game` | Game | Requiere playerName |
| `/map` | Map | Requiere playerName |

### Protección de Rutas

Las rutas `/game` y `/map` están protegidas por el componente `ProtectedRoute`:

```typescript
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const playerName = useGameStore(state => state.playerName);
  
  if (!playerName) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};
```

Si un usuario intenta acceder a estas rutas sin un nombre de jugador, será redirigido automáticamente a la página de inicio.

## Tema Claro/Oscuro (ThemeContext)

El proyecto implementa un sistema de temas que persiste en `localStorage`:

### Valores del Tema

- **Light (Pergamino)**: Colores claros con tonos piedra y ámbar
- **Dark (Calabozo)**: Colores oscuros con tonos piedra oscuro y ámbar

### Implementación

```typescript
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
};
```

### Evita el Flicker

Para evitar el "flicker" al cargar la página, se añade la clase `dark` antes de renderizar React en `root.tsx`:

```typescript
const theme = localStorage.getItem('theme');
if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
}
```

### Uso del Hook useTheme

```typescript
import { useTheme } from './context/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  // ...
};
```

## Componentes

### Layout.tsx

Componente de diseño principal que incluye:
- Barra de navegación con enlaces a Inicio, Explorar y Mapa
- Botón de toggle para cambiar entre tema claro y oscuro
- Outlet de React Router para renderizar las páginas hijos

### Home.tsx

Página de inicio que contiene:
- Título "Aventura RPG"
- Formulario para ingresar el nombre del jugador
- Botón "Comenzar Aventura" que navega a `/game`

### Game.tsx

Página de exploración que muestra:
- Nombre de la sala actual
- Descripción de la sala
- 4 botones de dirección (Norte, Sur, Este, Oeste)
- Los botones se deshabilitan si no hay sala en esa dirección

### Map.tsx

Página del mapa que muestra:
- Lista de todas las salas del juego
- Resalta la sala actual con un borde ámbar y el indicador "🚩 ESTÁS AQUÍ"
- Muestra las conexiones de cada sala

## Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Vista previa del build
npm run preview
```

## Estilos (Tailwind CSS)

El proyecto utiliza Tailwind CSS v4 con la configuración de colores de piedra (stone) y ámbar:

### Colores Utilizados

- **stone-100 a stone-900**: Tonos de piedra para fondos y textos
- **amber-400 a amber-700**: Tonos de ámbar para acentos y elementos destacados

### Clases de Estilo Comunes

- `bg-stone-100 dark:bg-stone-900`: Fondo adaptativo al tema
- `text-amber-700 dark:text-amber-400`: Texto de título
- `hover:bg-amber-700`: Efecto hover en botones

## Funcionalidades

1. **Inicio de Sesión**: El jugador ingresa su nombre para comenzar la aventura
2. **Exploración**: Navegación entre salas usando botones direccionales
3. **Mapa**: Vista general de todas las salas con la ubicación actual resaltada
4. **Cambio de Tema**: Toggle entre modo claro y oscuro con persistencia
5. **Protección de Rutas**: Redirección automática si no hay nombre de jugador
6. **Transiciones Suaves**: Cambios de sala instantáneos con Zustand

## Mejores Prácticas Implementadas

- Código limpio sin variables globales fuera de los stores
- Componentes bien organizados y separados por responsabilidad
- Tipado estricto con TypeScript
- Persistencia del tema en localStorage
- Evitar el "flicker" del tema al cargar la página
- Uso de Link para navegación interna
- Rutas protegidas para páginas que requieren autenticación