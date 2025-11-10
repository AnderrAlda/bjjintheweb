import * as THREE from 'three';

/**
 * GameRenderer class - manages the three.js WebGL renderer
 */
export class GameRenderer {
  constructor(container) {
    this.container = container;

    // Create WebGL renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });

    this.setupRenderer();
    this.appendToContainer();
  }

  /**
   * Setup renderer properties
   */
  setupRenderer() {
    // Set size
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Set pixel ratio (limit to 2 for performance)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Enable shadows
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Set tone mapping for better colors
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;

    // Enable physically correct lighting
    this.renderer.useLegacyLights = false;
  }

  /**
   * Append renderer to container
   */
  appendToContainer() {
    if (this.container) {
      this.container.appendChild(this.renderer.domElement);
    } else {
      document.body.appendChild(this.renderer.domElement);
    }
  }

  /**
   * Render the scene
   */
  render(scene, camera) {
    this.renderer.render(scene, camera);
  }

  /**
   * Set renderer size
   */
  setSize(width, height) {
    this.renderer.setSize(width, height);
  }

  /**
   * Cleanup and dispose of resources
   */
  dispose() {
    if (this.renderer) {
      this.renderer.dispose();

      // Remove canvas from DOM
      if (this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }

    console.log('Renderer disposed');
  }
}
