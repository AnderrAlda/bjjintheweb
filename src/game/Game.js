import * as THREE from 'three';
import { GameScene } from './Scene.js';
import { GameCamera } from './Camera.js';
import { GameRenderer } from './Renderer.js';
import { InputSystem } from '../systems/InputSystem.js';
import { GrappleMapScene } from '../grapplemap/GrappleMapScene.js';
import { GrappleMapUI } from '../grapplemap/GrappleMapUI.js';

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

    // GrappleMap
    this.grappleMapScene = null;
    this.grappleMapUI = null;

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

    // Initialize camera controls (requires renderer to be created first)
    this.camera.initController(this.inputSystem, this.renderer.renderer.domElement);

    // Create GrappleMap scene and UI
    this.grappleMapScene = new GrappleMapScene(this.scene.scene);
    this.grappleMapUI = new GrappleMapUI(this.grappleMapScene);

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

    // Update GrappleMap animation
    if (this.grappleMapScene) {
      this.grappleMapScene.update(deltaTime);
    }

    // Update camera
    this.camera.update(deltaTime, null);
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

    // Dispose GrappleMap
    if (this.grappleMapUI) {
      this.grappleMapUI.dispose();
    }
    if (this.grappleMapScene) {
      this.grappleMapScene.dispose();
    }

    // Dispose camera
    if (this.camera) {
      this.camera.dispose();
    }

    // Dispose systems
    if (this.inputSystem) {
      this.inputSystem.dispose();
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
