# BJJ in the Web - Three.js Game

A modern three.js-based web game built with best practices for performance, maintainability, and scalability.

## Features

- **Modern Architecture**: Clean, modular code structure with separation of concerns
- **Three.js**: Powered by the latest three.js library for 3D rendering
- **Vite**: Fast build tool with hot module replacement for rapid development
- **Input System**: Comprehensive keyboard, mouse, and touch input handling
- **Entity System**: Easy-to-extend entity-based architecture
- **Performance Optimized**: Following three.js best practices for optimal performance

## Project Structure

```
bjjintheweb/
├── src/
│   ├── game/              # Core game logic
│   │   ├── Game.js        # Main game orchestrator
│   │   ├── Scene.js       # Scene management
│   │   ├── Camera.js      # Camera controller
│   │   ├── Renderer.js    # WebGL renderer setup
│   │   └── entities/      # Game entities
│   │       └── Player.js  # Player entity
│   ├── systems/           # Game systems
│   │   └── InputSystem.js # Input handling
│   ├── utils/             # Utility functions
│   │   └── AssetLoader.js # Asset loading utilities
│   └── main.js            # Application entry point
├── public/                # Static assets
│   ├── models/            # 3D models (.gltf, .glb)
│   ├── textures/          # Texture files
│   └── audio/             # Sound files
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration
├── claude.md              # Three.js best practices guide
└── package.json           # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The game will open automatically in your browser at `http://localhost:3000`

### Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Controls

- **WASD** or **Arrow Keys**: Move the player
- The camera follows the player automatically

## Development Guide

### Adding New Entities

1. Create a new file in `src/game/entities/`
2. Extend the base entity pattern (see `Player.js`)
3. Add the entity to the game in `src/game/Game.js`

### Adding New Systems

1. Create a new file in `src/systems/`
2. Implement initialization, update, and disposal methods
3. Integrate the system in `src/game/Game.js`

### Loading Assets

Use the `AssetLoader` utility in `src/utils/AssetLoader.js`:

```javascript
import { AssetLoader } from './utils/AssetLoader.js';

const loader = new AssetLoader();
const texture = await loader.loadTexture('/textures/example.jpg');
```

## Best Practices

See `claude.md` for comprehensive three.js best practices including:
- Performance optimization techniques
- Memory management
- Asset loading strategies
- Scene organization
- And much more!

## Technology Stack

- **three.js** - 3D rendering engine
- **Vite** - Build tool and dev server
- **ESM** - Modern JavaScript modules

## Contributing

1. Follow the architecture patterns established in the codebase
2. Maintain the separation of concerns (entities, systems, utilities)
3. Dispose of resources properly to prevent memory leaks
4. Test on multiple devices and browsers

## License

MIT

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [Vite Documentation](https://vitejs.dev/)
