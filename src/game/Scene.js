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
    // Set background color
    this.scene.background = new THREE.Color(0x87ceeb); // Sky blue

    // Add fog for depth perception
    this.scene.fog = new THREE.Fog(0x87ceeb, 10, 50);
  }

  /**
   * Setup scene lighting
   */
  setupLighting() {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Directional light for shadows and definition
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;

    // Configure shadow properties
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;

    this.scene.add(directionalLight);

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
