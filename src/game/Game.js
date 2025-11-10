import * as THREE from 'three';
import { GameScene } from './Scene.js';
import { GameCamera } from './Camera.js';
import { GameRenderer } from './Renderer.js';
import { InputSystem } from '../systems/InputSystem.js';
import { Fighter } from './entities/Fighter.js';
import { positionsDatabase } from '../data/positions.js';
import { PositionSelector } from '../ui/PositionSelector.js';

/**
 * Main Game class - orchestrates all game systems and the game loop
 */
export class Game {
  constructor(options = {}) {
    this.container = options.container;
    this.debug = options.debug || false;

    // Game state
    this.isRunning = false;
    this.isPaused = false;

    // Time tracking
    this.clock = new THREE.Clock();
    this.deltaTime = 0;
    this.elapsedTime = 0;
    this.fps = 0;
    this.frameCount = 0;
    this.fpsUpdateTime = 0;

    // Core components
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    // Systems
    this.inputSystem = null;

    // Entities
    this.entities = [];
    this.fighter1 = null;
    this.fighter2 = null;

    // Position system
    this.positionSelector = null;
    this.currentPosition = null;

    // Animation frame ID
    this.animationFrameId = null;

    // Initialize
    this.init();
  }

  /**
   * Initialize all game systems
   */
  init() {
    // Create scene
    this.scene = new GameScene(this.debug);

    // Create camera
    this.camera = new GameCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Create renderer
    this.renderer = new GameRenderer(this.container);

    // Initialize systems
    this.inputSystem = new InputSystem();

    // Create fighters
    this.fighter1 = new Fighter(this.scene.scene, 0x00ff00, 'Fighter 1');
    this.fighter2 = new Fighter(this.scene.scene, 0xff0000, 'Fighter 2');
    this.entities.push(this.fighter1);
    this.entities.push(this.fighter2);

    // Create position selector UI
    this.positionSelector = new PositionSelector(
      positionsDatabase,
      (position, index) => this.onPositionSelected(position, index)
    );

    // Set initial position
    this.setPosition(positionsDatabase[0], false);

    // Hide loading screen
    this.hideLoadingScreen();

    console.log('Game initialized');
  }

  /**
   * Start the game loop
   */
  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.clock.start();
    this.animate();

    console.log('Game started');
  }

  /**
   * Pause the game
   */
  pause() {
    if (!this.isRunning || this.isPaused) return;

    this.isPaused = true;
    this.clock.stop();

    console.log('Game paused');
  }

  /**
   * Resume the game
   */
  resume() {
    if (!this.isRunning || !this.isPaused) return;

    this.isPaused = false;
    this.clock.start();

    console.log('Game resumed');
  }

  /**
   * Main game loop
   */
  animate() {
    if (!this.isRunning) return;

    this.animationFrameId = requestAnimationFrame(() => this.animate());

    if (this.isPaused) return;

    // Calculate delta time
    this.deltaTime = this.clock.getDelta();
    this.elapsedTime = this.clock.getElapsedTime();

    // Update FPS counter
    this.updateFPS();

    // Update game state
    this.update(this.deltaTime);

    // Render the scene
    this.render();
  }

  /**
   * Update game state
   */
  update(deltaTime) {
    // Update input system
    this.inputSystem.update();

    // Update all entities
    for (const entity of this.entities) {
      entity.update(deltaTime);
    }

    // Update camera (if it has follow logic, etc.)
    this.camera.update(deltaTime);
  }

  /**
   * Handle position selection from UI
   */
  onPositionSelected(position, index) {
    this.setPosition(position, true);
  }

  /**
   * Set fighters to a specific position
   */
  setPosition(position, animate = false) {
    this.currentPosition = position;

    if (animate) {
      // Animate to the new position
      this.fighter1.animateToPosition(position.fighter1, 1.0);
      this.fighter2.animateToPosition(position.fighter2, 1.0);
    } else {
      // Set position instantly
      this.fighter1.setPosition(position.fighter1);
      this.fighter2.setPosition(position.fighter2);
    }

    console.log(`Position set to: ${position.name}`);
  }

  /**
   * Render the scene
   */
  render() {
    this.renderer.render(this.scene.scene, this.camera.camera);
  }

  /**
   * Handle window resize
   */
  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update camera
    this.camera.camera.aspect = width / height;
    this.camera.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(width, height);
  }

  /**
   * Update FPS counter
   */
  updateFPS() {
    this.frameCount++;

    if (this.elapsedTime - this.fpsUpdateTime >= 1.0) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.fpsUpdateTime = this.elapsedTime;

      // Update UI
      const fpsCounter = document.getElementById('fps-counter');
      if (fpsCounter) {
        fpsCounter.textContent = `FPS: ${this.fps}`;
      }
    }
  }

  /**
   * Hide loading screen
   */
  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 500);
    }
  }

  /**
   * Cleanup and dispose of resources
   */
  dispose() {
    console.log('Disposing game...');

    this.isRunning = false;

    // Cancel animation frame
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // Dispose entities
    for (const entity of this.entities) {
      entity.dispose();
    }
    this.entities = [];

    // Dispose systems
    if (this.inputSystem) {
      this.inputSystem.dispose();
    }

    // Dispose UI
    if (this.positionSelector) {
      this.positionSelector.dispose();
    }

    // Dispose scene
    if (this.scene) {
      this.scene.dispose();
    }

    // Dispose renderer
    if (this.renderer) {
      this.renderer.dispose();
    }

    console.log('Game disposed');
  }
}
