import * as THREE from 'three';

/**
 * GameCamera class - manages the three.js camera
 */
export class GameCamera {
  constructor(fov = 75, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 1000) {
    // Create perspective camera
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Set initial position - good viewing angle for BJJ positions
    // Position camera to view the mat from a side/elevated angle
    this.camera.position.set(2, 1.5, 3);
    this.camera.lookAt(0, 0.6, 0);
  }

  /**
   * Update camera position (called each frame)
   */
  update(deltaTime) {
    // Static camera for now - could add rotation/zoom controls later
  }

  /**
   * Get the camera instance
   */
  getCamera() {
    return this.camera;
  }

  /**
   * Set camera position
   */
  setPosition(x, y, z) {
    this.camera.position.set(x, y, z);
  }

  /**
   * Set camera rotation/look-at point
   */
  lookAt(x, y, z) {
    this.camera.lookAt(x, y, z);
  }
}
