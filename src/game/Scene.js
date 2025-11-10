import * as THREE from 'three';

/**
 * GameScene class - manages the three.js scene and lighting
 */
export class GameScene {
  constructor(debug = false) {
    this.debug = debug;
    this.scene = new THREE.Scene();

    this.setupScene();
    this.setupLighting();

    if (this.debug) {
      this.addHelpers();
    }
  }

  /**
   * Setup basic scene properties
   */
  setupScene() {
    // Set background color - neutral gray like GrappleMap
    this.scene.background = new THREE.Color(0x2a2a2a); // Dark gray

    // Add a simple ground plane to represent the mat
    const matGeometry = new THREE.PlaneGeometry(6, 6);
    const matMaterial = new THREE.MeshLambertMaterial({
      color: 0x1a1a1a,
      side: THREE.DoubleSide
    });
    const mat = new THREE.Mesh(matGeometry, matMaterial);
    mat.rotation.x = -Math.PI / 2;
    mat.position.y = 0;
    mat.receiveShadow = true;
    this.scene.add(mat);
  }

  /**
   * Setup scene lighting
   */
  setupLighting() {
    // Ambient light for overall illumination - brighter for clear visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    // Directional light for definition
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(3, 5, 4);
    this.scene.add(directionalLight);

    // Add a second light from another angle for better visibility
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-3, 3, -2);
    this.scene.add(fillLight);

    // Store reference for later access
    this.directionalLight = directionalLight;
  }

  /**
   * Add debug helpers
   */
  addHelpers() {
    // Axes helper
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20);
    this.scene.add(gridHelper);

    // Light helper
    if (this.directionalLight) {
      const lightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 1);
      this.scene.add(lightHelper);
    }

    console.log('Debug helpers added to scene');
  }

  /**
   * Add an object to the scene
   */
  add(object) {
    this.scene.add(object);
  }

  /**
   * Remove an object from the scene
   */
  remove(object) {
    this.scene.remove(object);
  }

  /**
   * Cleanup and dispose of resources
   */
  dispose() {
    // Traverse and dispose of all geometries and materials
    this.scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose();
      }

      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }

      if (object.texture) {
        object.texture.dispose();
      }
    });

    console.log('Scene disposed');
  }
}
