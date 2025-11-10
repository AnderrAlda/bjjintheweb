# Three.js Game Development Best Practices

## Project Overview
This is a three.js-based web game project following modern best practices for maintainability, performance, and scalability.

## Architecture & Structure

### Directory Structure
```
/
├── src/
│   ├── game/              # Core game logic
│   │   ├── Game.js        # Main game class
│   │   ├── Scene.js       # Scene setup and management
│   │   ├── Camera.js      # Camera configuration
│   │   ├── Renderer.js    # Renderer setup
│   │   └── entities/      # Game entities (player, enemies, etc.)
│   ├── systems/           # Game systems (physics, input, audio)
│   ├── utils/             # Utility functions and helpers
│   ├── assets/            # Asset loaders and managers
│   └── main.js            # Entry point
├── public/                # Static assets
│   ├── models/            # 3D models (.gltf, .glb)
│   ├── textures/          # Texture files
│   └── audio/             # Sound files
└── dist/                  # Build output
```

## Best Practices

### 1. Performance Optimization

#### Geometry Management
- **Reuse geometries**: Create once, instance multiple times
- **Dispose properly**: Always call `.dispose()` on geometries, materials, and textures when no longer needed
- **Use BufferGeometry**: Prefer `BufferGeometry` over legacy `Geometry`
- **Merge geometries**: Combine static meshes to reduce draw calls

#### Materials & Textures
- **Texture compression**: Use compressed texture formats (KTX2, basis)
- **Mipmapping**: Enable for textures viewed at different distances
- **Material reuse**: Share materials across objects when possible
- **Texture atlases**: Combine multiple textures into atlases
- **Power-of-two textures**: Use 512x512, 1024x1024, 2048x2048, etc.

#### Rendering
- **Frustum culling**: Enabled by default, ensure proper bounding boxes
- **Level of Detail (LOD)**: Use `THREE.LOD` for complex objects
- **Instancing**: Use `InstancedMesh` for many similar objects
- **Shadow optimization**: Limit shadow-casting objects, adjust shadow map size
- **Post-processing**: Use selectively, can be expensive

### 2. Scene Management

#### Object Organization
- **Use groups**: Organize related objects with `THREE.Group`
- **Scene graph hierarchy**: Keep logical parent-child relationships
- **Naming convention**: Use descriptive names for debugging
- **Layer system**: Use layers for selective rendering/raycasting

#### Lighting
- **Minimize lights**: Each light increases computation
- **Ambient + Directional**: Good starting combination
- **Baked lighting**: Pre-bake for static scenes
- **Light helpers**: Use in development, remove in production

### 3. Asset Management

#### Loading
- **Loading manager**: Use `THREE.LoadingManager` for progress tracking
- **Async loading**: Load assets asynchronously
- **Preload critical assets**: Load essential assets before game starts
- **Progressive loading**: Load non-critical assets during gameplay
- **Error handling**: Always handle loading errors gracefully

#### Model Formats
- **Prefer glTF/GLB**: Industry standard, well-supported
- **Draco compression**: For smaller file sizes
- **Optimize models**: Use Blender/tools to reduce poly count before export

### 4. Code Organization

#### Class Structure
```javascript
// Example: Entity base class
class Entity {
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;
    this.init();
  }

  init() {
    // Setup geometry, material, mesh
  }

  update(deltaTime) {
    // Per-frame updates
  }

  dispose() {
    // Cleanup resources
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
      this.scene.remove(this.mesh);
    }
  }
}
```

#### Game Loop
- **Use requestAnimationFrame**: Never use setInterval
- **Delta time**: Use for frame-rate independent movement
- **Clock**: Use `THREE.Clock` for timing
- **Fixed timestep**: For physics calculations

### 5. Input Handling

#### Best Practices
- **Event delegation**: Add listeners to window/document
- **Cleanup listeners**: Remove on dispose
- **Normalize input**: Abstract keyboard/touch/gamepad
- **Input buffering**: For responsive controls

### 6. Camera Control

#### Types
- **Perspective**: For realistic 3D games
- **Orthographic**: For isometric/2D-style games
- **Use controls**: `OrbitControls`, `FirstPersonControls`, or custom

#### Tips
- **Smooth movement**: Use lerping for camera transitions
- **FOV considerations**: 45-75 degrees typical
- **Near/far planes**: Set appropriately to avoid z-fighting

### 7. Physics Integration

#### Options
- **cannon.js**: Full physics engine
- **ammo.js**: Port of Bullet physics
- **rapier**: Modern, WebAssembly-based
- **Custom**: Simple collisions can be handled manually

#### Tips
- **Separate visual/physics**: Physics runs at fixed timestep
- **Broadphase optimization**: Use spatial partitioning
- **Sleep inactive objects**: Reduce computation

### 8. State Management

#### Game States
```javascript
const GameStates = {
  LOADING: 'loading',
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver'
};
```

#### State Machine
- **Clear transitions**: Define allowed state changes
- **State enter/exit**: Cleanup and setup on transitions
- **Pause handling**: Pause animations, physics, input

### 9. Debugging & Development

#### Tools
- **Stats.js**: FPS and memory monitoring
- **dat.GUI**: Runtime parameter tweaking
- **THREE.js DevTools**: Browser extension
- **Console helpers**: Add debug visualization

#### Development Mode
```javascript
const DEBUG = import.meta.env.MODE === 'development';
if (DEBUG) {
  // Add helpers, stats, GUI
}
```

### 10. Build & Optimization

#### Vite Configuration
- **Code splitting**: Split vendor/game code
- **Tree shaking**: Remove unused three.js modules
- **Minification**: Enable for production
- **Source maps**: For debugging production issues

#### Production Checklist
- [ ] Remove all console.log statements
- [ ] Remove debug helpers (AxesHelper, GridHelper, etc.)
- [ ] Optimize asset sizes
- [ ] Enable compression (gzip/brotli)
- [ ] Test on target devices/browsers
- [ ] Monitor bundle size

### 11. Common Pitfalls

#### Memory Leaks
- **Forgetting dispose()**: Always cleanup
- **Event listeners**: Remove when done
- **Animation loops**: Stop when switching scenes
- **Texture/geometry references**: Clear when not needed

#### Performance Issues
- **Too many draw calls**: Merge/instance objects
- **Unoptimized shadows**: Reduce shadow map size/casters
- **Complex shaders**: Simplify or optimize
- **Real-time reflections**: Use sparingly

#### Z-Fighting
- **Adjust near/far planes**: Don't make range too large
- **Offset overlapping geometry**: Slight position adjustment
- **Use logarithmic depth buffer**: For large scenes

### 12. Responsive Design

#### Window Resize
```javascript
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

#### Device Considerations
- **Mobile performance**: Reduce quality settings
- **Touch controls**: Add touch event handlers
- **Pixel ratio**: Use `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`

### 13. Accessibility

#### Considerations
- **Keyboard controls**: Always support keyboard
- **Color blindness**: Don't rely solely on color
- **Motion sickness**: Avoid rapid camera movements
- **Pause functionality**: Allow players to pause

### 14. Version Control

#### Git Best Practices
- **Ignore build artifacts**: Add `dist/`, `node_modules/` to .gitignore
- **Large files**: Use Git LFS for large assets
- **Binary files**: Consider external hosting for very large assets
- **Commit messages**: Clear descriptions of changes

## Technology Stack

### Core Dependencies
- **three.js**: 3D rendering engine
- **Vite**: Build tool and dev server
- **ESM modules**: Modern JavaScript modules

### Optional Libraries
- **@tweenjs/tween.js**: Smooth animations
- **howler.js**: Audio management
- **stats.js**: Performance monitoring
- **dat.gui**: Debug UI (development)

## Getting Started

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview  # Preview production build locally
```

## Resources

### Documentation
- [Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [Three.js Journey Course](https://threejs-journey.com/)

### Community
- [Three.js Discourse](https://discourse.threejs.org/)
- [Three.js GitHub](https://github.com/mrdoob/three.js/)

### Performance Tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebGL Insights](https://webglinsights.github.io/)

## Notes

- Always test on target devices early and often
- Profile before optimizing - measure, don't guess
- Start simple, add complexity gradually
- Keep three.js updated for bug fixes and performance improvements
- Consider WebGPU (three.js r152+) for future-proofing
