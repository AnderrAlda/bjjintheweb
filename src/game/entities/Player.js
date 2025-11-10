import * as THREE from 'three';

/**
 * Player entity - represents the player character
 */
export class Player {
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;
    this.velocity = new THREE.Vector3();
    this.speed = 5;
    this.rotationSpeed = 3;

    this.init();
  }

  /**
   * Initialize player geometry and materials
   */
  init() {
    // Create a simple capsule-like player (using cylinder and spheres)
    const bodyGeometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x4CAF50,
      roughness: 0.7,
      metalness: 0.2
    });

    this.mesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.set(0, 1.5, 0);

    // Add to scene
    this.scene.add(this.mesh);

    // Create a simple ground plane
    this.createGround();
  }

  /**
   * Create ground plane
   */
  createGround() {
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.8,
      metalness: 0.2
    });

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.position.y = 0;

    this.scene.add(ground);
  }

  /**
   * Update player state
   */
  update(deltaTime) {
    // Handle basic keyboard input
    const input = this.getInput();

    // Reset velocity
    this.velocity.set(0, 0, 0);

    // Apply movement
    if (input.forward) this.velocity.z -= 1;
    if (input.backward) this.velocity.z += 1;
    if (input.left) this.velocity.x -= 1;
    if (input.right) this.velocity.x += 1;

    // Normalize velocity for consistent diagonal movement
    if (this.velocity.length() > 0) {
      this.velocity.normalize();

      // Apply speed and delta time
      this.velocity.multiplyScalar(this.speed * deltaTime);

      // Update position
      this.mesh.position.add(this.velocity);

      // Rotate to face movement direction
      const angle = Math.atan2(this.velocity.x, this.velocity.z);
      this.mesh.rotation.y = angle;
    }

    // Keep player on ground
    this.mesh.position.y = 1.5;
  }

  /**
   * Get keyboard input
   */
  getInput() {
    return {
      forward: this.isKeyPressed('KeyW') || this.isKeyPressed('ArrowUp'),
      backward: this.isKeyPressed('KeyS') || this.isKeyPressed('ArrowDown'),
      left: this.isKeyPressed('KeyA') || this.isKeyPressed('ArrowLeft'),
      right: this.isKeyPressed('KeyD') || this.isKeyPressed('ArrowRight')
    };
  }

  /**
   * Check if a key is pressed
   */
  isKeyPressed(keyCode) {
    // This is a simple implementation; in production, use InputSystem
    return window.inputSystem && window.inputSystem.isKeyDown(keyCode);
  }

  /**
   * Cleanup and dispose of resources
   */
  dispose() {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
      this.scene.remove(this.mesh);
    }
  }
}
