import * as THREE from 'three';

/**
 * GameCamera class - manages the three.js camera
 */
export class GameCamera {
  constructor(fov = 75, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 1000) {
    // Create perspective camera
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Set initial position - optimized for GrappleMap view
    this.camera.position.set(0, 2, 5);
    this.camera.lookAt(0, 0.8, 0);

    // Camera follow settings
    this.followTarget = null;
    this.followOffset = new THREE.Vector3(0, 5, 10);
    this.followSmoothness = 0.1;

    // Camera target position (for smooth following)
    this.targetPosition = new THREE.Vector3();
  }

  /**
   * Set the target for the camera to follow
   */
  setFollowTarget(target, offset = null) {
    this.followTarget = target;

    if (offset) {
      this.followOffset.copy(offset);
    }
  }

  /**
   * Update camera position (called each frame)
   */
  update(deltaTime, player = null) {
    // Simple camera follow logic
    if (player && player.mesh) {
      // Calculate target position
      this.targetPosition.copy(player.mesh.position);
      this.targetPosition.add(this.followOffset);

      // Smoothly interpolate camera position
      this.camera.position.lerp(this.targetPosition, this.followSmoothness);

      // Look at the player
      this.camera.lookAt(player.mesh.position);
    }
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
