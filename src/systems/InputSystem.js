/**
 * InputSystem - handles keyboard, mouse, and touch input
 */
export class InputSystem {
  constructor() {
    // Keyboard state
    this.keys = new Map();
    this.keysPressed = new Set();
    this.keysReleased = new Set();

    // Mouse state
    this.mouse = {
      x: 0,
      y: 0,
      deltaX: 0,
      deltaY: 0,
      buttons: new Set()
    };

    // Touch state
    this.touches = new Map();

    // Bind event handlers
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    // Add event listeners
    this.addEventListeners();

    // Make accessible globally for simple key checks
    window.inputSystem = this;
  }

  /**
   * Add event listeners
   */
  addEventListeners() {
    // Keyboard
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    // Mouse
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);

    // Touch
    window.addEventListener('touchstart', this.onTouchStart, { passive: false });
    window.addEventListener('touchmove', this.onTouchMove, { passive: false });
    window.addEventListener('touchend', this.onTouchEnd);
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
  }

  /**
   * Keyboard event handlers
   */
  onKeyDown(event) {
    if (!this.keys.has(event.code)) {
      this.keysPressed.add(event.code);
    }
    this.keys.set(event.code, true);
  }

  onKeyUp(event) {
    this.keys.set(event.code, false);
    this.keysReleased.add(event.code);
  }

  /**
   * Mouse event handlers
   */
  onMouseMove(event) {
    this.mouse.deltaX = event.movementX;
    this.mouse.deltaY = event.movementY;
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  onMouseDown(event) {
    this.mouse.buttons.add(event.button);
  }

  onMouseUp(event) {
    this.mouse.buttons.delete(event.button);
  }

  /**
   * Touch event handlers
   */
  onTouchStart(event) {
    event.preventDefault();
    for (const touch of event.changedTouches) {
      this.touches.set(touch.identifier, {
        x: touch.clientX,
        y: touch.clientY,
        startX: touch.clientX,
        startY: touch.clientY
      });
    }
  }

  onTouchMove(event) {
    event.preventDefault();
    for (const touch of event.changedTouches) {
      if (this.touches.has(touch.identifier)) {
        const touchData = this.touches.get(touch.identifier);
        touchData.x = touch.clientX;
        touchData.y = touch.clientY;
      }
    }
  }

  onTouchEnd(event) {
    for (const touch of event.changedTouches) {
      this.touches.delete(touch.identifier);
    }
  }

  /**
   * Update input state (call once per frame)
   */
  update() {
    // Clear per-frame state
    this.keysPressed.clear();
    this.keysReleased.clear();
    this.mouse.deltaX = 0;
    this.mouse.deltaY = 0;
  }

  /**
   * Check if a key is currently down
   */
  isKeyDown(keyCode) {
    return this.keys.get(keyCode) === true;
  }

  /**
   * Check if a key was just pressed this frame
   */
  isKeyPressed(keyCode) {
    return this.keysPressed.has(keyCode);
  }

  /**
   * Check if a key was just released this frame
   */
  isKeyReleased(keyCode) {
    return this.keysReleased.has(keyCode);
  }

  /**
   * Check if a mouse button is down
   */
  isMouseButtonDown(button) {
    return this.mouse.buttons.has(button);
  }

  /**
   * Get mouse position
   */
  getMousePosition() {
    return { x: this.mouse.x, y: this.mouse.y };
  }

  /**
   * Get mouse delta
   */
  getMouseDelta() {
    return { x: this.mouse.deltaX, y: this.mouse.deltaY };
  }

  /**
   * Cleanup
   */
  dispose() {
    this.removeEventListeners();
    this.keys.clear();
    this.keysPressed.clear();
    this.keysReleased.clear();
    this.mouse.buttons.clear();
    this.touches.clear();

    if (window.inputSystem === this) {
      delete window.inputSystem;
    }
  }
}
