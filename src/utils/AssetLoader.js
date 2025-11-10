import * as THREE from 'three';

/**
 * AssetLoader - utility class for loading 3D models, textures, and other assets
 */
export class AssetLoader {
  constructor() {
    this.loadingManager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);

    // Setup loading callbacks
    this.setupLoadingCallbacks();
  }

  /**
   * Setup loading manager callbacks
   */
  setupLoadingCallbacks() {
    this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
      console.log(`Started loading: ${url} (${itemsLoaded}/${itemsTotal})`);
    };

    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progress = (itemsLoaded / itemsTotal) * 100;
      console.log(`Loading: ${progress.toFixed(0)}%`);

      // Update loading UI
      this.updateLoadingUI(progress);
    };

    this.loadingManager.onLoad = () => {
      console.log('All assets loaded');
    };

    this.loadingManager.onError = (url) => {
      console.error(`Error loading: ${url}`);
    };
  }

  /**
   * Update loading UI
   */
  updateLoadingUI(progress) {
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');

    if (loadingBar) {
      loadingBar.style.width = `${progress}%`;
    }

    if (loadingText) {
      loadingText.textContent = `${Math.round(progress)}%`;
    }
  }

  /**
   * Load a texture
   */
  async loadTexture(path) {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        path,
        (texture) => resolve(texture),
        undefined,
        (error) => reject(error)
      );
    });
  }

  /**
   * Load multiple textures
   */
  async loadTextures(paths) {
    const promises = paths.map(path => this.loadTexture(path));
    return Promise.all(promises);
  }

  /**
   * Load a GLTF/GLB model
   * Note: Requires GLTFLoader from three/examples/jsm/loaders/GLTFLoader.js
   */
  async loadGLTF(path) {
    // Placeholder - implement when GLTFLoader is added
    console.warn('GLTF loading not yet implemented. Add GLTFLoader dependency.');
    return null;
  }

  /**
   * Preload common assets
   */
  async preloadAssets() {
    // Add your assets to preload here
    const texturePaths = [
      // '/textures/example.jpg',
    ];

    try {
      if (texturePaths.length > 0) {
        await this.loadTextures(texturePaths);
      }
      console.log('Asset preloading complete');
    } catch (error) {
      console.error('Error preloading assets:', error);
    }
  }
}
