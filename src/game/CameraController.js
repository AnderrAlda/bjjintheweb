import * as THREE from 'three';

/**
 * CameraController - handles camera movement via mouse drag and zoom
 */
export class CameraController {
  constructor(camera, inputSystem, domElement) {
    this.camera = camera;
    this.inputSystem = inputSystem;
    this.domElement = domElement;

    // Orbit controls state
    this.target = new THREE.Vector3(0, 0.8, 0); // Center of orbit
    this.spherical = new THREE.Spherical();
    this.sphericalDelta = new THREE.Spherical();

    // Distance from target
    this.minDistance = 2;
    this.maxDistance = 20;
    this.distance = 5;

    // Rotation constraints
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    // Rotation sensitivity
    this.rotateSpeed = 0.5;
    this.zoomSpeed = 0.1;

    // Mouse state
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    // Bind methods
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onWheel = this.onWheel.bind(this);

    // Add event listeners
    this.addEventListeners();

    // Initialize spherical coordinates from camera position
    this.updateSphericalFromCamera();
  }

  /**
   * Add event listeners
   */
  addEventListeners() {
    this.domElement.addEventListener('mousedown', this.onMouseDown);
    this.domElement.addEventListener('mousemove', this.onMouseMove);
    this.domElement.addEventListener('mouseup', this.onMouseUp);
    this.domElement.addEventListener('wheel', this.onWheel, { passive: false });
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    this.domElement.removeEventListener('mousedown', this.onMouseDown);
    this.domElement.removeEventListener('mousemove', this.onMouseMove);
    this.domElement.removeEventListener('mouseup', this.onMouseUp);
    this.domElement.removeEventListener('wheel', this.onWheel);
  }

  /**
   * Mouse event handlers
   */
  onMouseDown(event) {
    // Only start dragging on left mouse button
    if (event.button === 0) {
      this.isDragging = true;
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
      this.domElement.style.cursor = 'grabbing';
    }
  }

  onMouseMove(event) {
    if (!this.isDragging) return;

    const deltaX = event.clientX - this.lastMouseX;
    const deltaY = event.clientY - this.lastMouseY;

    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;

    // Rotate camera (simplified calculation for better responsiveness)
    this.rotateLeft(deltaX * this.rotateSpeed * 0.01);
    this.rotateUp(deltaY * this.rotateSpeed * 0.01);
  }

  onMouseUp(event) {
    if (event.button === 0) {
      this.isDragging = false;
      this.domElement.style.cursor = 'grab';
    }
  }

  onWheel(event) {
    event.preventDefault();

    if (event.deltaY < 0) {
      this.zoomIn();
    } else if (event.deltaY > 0) {
      this.zoomOut();
    }
  }

  /**
   * Rotate left (around vertical axis)
   */
  rotateLeft(angle) {
    this.sphericalDelta.theta -= angle;
  }

  /**
   * Rotate up (around horizontal axis)
   */
  rotateUp(angle) {
    this.sphericalDelta.phi -= angle;
  }

  /**
   * Zoom in
   */
  zoomIn() {
    this.distance *= (1 - this.zoomSpeed);
    this.distance = Math.max(this.minDistance, this.distance);
  }

  /**
   * Zoom out
   */
  zoomOut() {
    this.distance *= (1 + this.zoomSpeed);
    this.distance = Math.min(this.maxDistance, this.distance);
  }

  /**
   * Update spherical coordinates from camera position
   */
  updateSphericalFromCamera() {
    const offset = new THREE.Vector3();
    offset.copy(this.camera.position).sub(this.target);
    this.spherical.setFromVector3(offset);
    this.distance = this.spherical.radius;
  }

  /**
   * Update camera position from spherical coordinates
   */
  update() {
    // Apply rotation delta
    this.spherical.theta += this.sphericalDelta.theta;
    this.spherical.phi += this.sphericalDelta.phi;

    // Reset delta
    this.sphericalDelta.set(0, 0, 0);

    // Restrict phi to be between minPolarAngle and maxPolarAngle
    this.spherical.phi = Math.max(
      this.minPolarAngle,
      Math.min(this.maxPolarAngle, this.spherical.phi)
    );

    // Ensure phi is not exactly at poles (causes gimbal lock)
    this.spherical.phi = Math.max(0.001, Math.min(Math.PI - 0.001, this.spherical.phi));

    // Update radius
    this.spherical.radius = this.distance;

    // Calculate new camera position
    const offset = new THREE.Vector3();
    offset.setFromSpherical(this.spherical);

    // Update camera position
    this.camera.position.copy(this.target).add(offset);

    // Look at target
    this.camera.lookAt(this.target);
  }

  /**
   * Set the target point to orbit around
   */
  setTarget(x, y, z) {
    this.target.set(x, y, z);
  }

  /**
   * Get the current target
   */
  getTarget() {
    return this.target.clone();
  }

  /**
   * Enable/disable controls
   */
  setEnabled(enabled) {
    if (enabled) {
      this.domElement.style.cursor = 'grab';
    } else {
      this.domElement.style.cursor = 'default';
      this.isDragging = false;
    }
  }

  /**
   * Cleanup
   */
  dispose() {
    this.removeEventListeners();
  }
}
