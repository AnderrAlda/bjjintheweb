import { getAllPositions, getTransitionsFrom } from './Positions.js';

/**
 * UI controller for GrappleMap position and transition selection
 */
export class GrappleMapUI {
  constructor(grappleMapScene) {
    this.grappleMapScene = grappleMapScene;
    this.container = null;
    this.positionsList = null;
    this.transitionsList = null;
    this.currentPositionDisplay = null;

    this.createUI();
    this.updateUI();
  }

  /**
   * Create the UI elements
   */
  createUI() {
    // Create main container
    this.container = document.createElement('div');
    this.container.id = 'grapplemap-ui';
    this.container.style.cssText = `
      position: absolute;
      top: 80px;
      left: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      max-width: 350px;
      max-height: calc(100vh - 120px);
      overflow-y: auto;
      pointer-events: auto;
      z-index: 100;
    `;

    // Title
    const title = document.createElement('h2');
    title.textContent = 'GrappleMap';
    title.style.cssText = `
      margin: 0 0 15px 0;
      font-size: 20px;
      color: #4CAF50;
    `;
    this.container.appendChild(title);

    // Current position display
    const currentPosSection = document.createElement('div');
    currentPosSection.style.cssText = 'margin-bottom: 20px;';

    const currentLabel = document.createElement('div');
    currentLabel.textContent = 'Current Position:';
    currentLabel.style.cssText = 'font-weight: bold; margin-bottom: 5px; color: #aaa;';
    currentPosSection.appendChild(currentLabel);

    this.currentPositionDisplay = document.createElement('div');
    this.currentPositionDisplay.style.cssText = `
      background: rgba(76, 175, 80, 0.2);
      padding: 10px;
      border-radius: 4px;
      border-left: 3px solid #4CAF50;
    `;
    currentPosSection.appendChild(this.currentPositionDisplay);
    this.container.appendChild(currentPosSection);

    // Transitions section
    const transitionsSection = document.createElement('div');
    transitionsSection.style.cssText = 'margin-bottom: 20px;';

    const transitionsLabel = document.createElement('div');
    transitionsLabel.textContent = 'Available Transitions:';
    transitionsLabel.style.cssText = 'font-weight: bold; margin-bottom: 10px; color: #aaa;';
    transitionsSection.appendChild(transitionsLabel);

    this.transitionsList = document.createElement('div');
    this.transitionsList.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
    transitionsSection.appendChild(this.transitionsList);
    this.container.appendChild(transitionsSection);

    // All positions section
    const positionsSection = document.createElement('div');

    const positionsLabel = document.createElement('div');
    positionsLabel.textContent = 'All Positions:';
    positionsLabel.style.cssText = 'font-weight: bold; margin-bottom: 10px; color: #aaa;';
    positionsSection.appendChild(positionsLabel);

    this.positionsList = document.createElement('div');
    this.positionsList.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

    // Add all positions
    const positions = getAllPositions();
    positions.forEach(position => {
      const button = this.createPositionButton(position);
      this.positionsList.appendChild(button);
    });

    positionsSection.appendChild(this.positionsList);
    this.container.appendChild(positionsSection);

    // Add to document
    document.body.appendChild(this.container);
  }

  /**
   * Create a button for a position
   */
  createPositionButton(position) {
    const button = document.createElement('button');
    button.textContent = position.name;
    button.title = position.description;
    button.style.cssText = `
      background: rgba(100, 100, 100, 0.5);
      border: 1px solid #666;
      color: white;
      padding: 10px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
      font-size: 13px;
    `;

    button.addEventListener('mouseenter', () => {
      button.style.background = 'rgba(76, 175, 80, 0.3)';
      button.style.borderColor = '#4CAF50';
    });

    button.addEventListener('mouseleave', () => {
      button.style.background = 'rgba(100, 100, 100, 0.5)';
      button.style.borderColor = '#666';
    });

    button.addEventListener('click', () => {
      if (!this.grappleMapScene.getIsAnimating()) {
        this.grappleMapScene.setPosition(position.id, true);
        this.updateUI();
      }
    });

    return button;
  }

  /**
   * Create a button for a transition
   */
  createTransitionButton(transition) {
    const button = document.createElement('button');
    button.textContent = transition.name;
    button.title = transition.description;
    button.style.cssText = `
      background: rgba(76, 175, 80, 0.3);
      border: 1px solid #4CAF50;
      color: white;
      padding: 10px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
      font-size: 13px;
      font-weight: bold;
    `;

    button.addEventListener('mouseenter', () => {
      button.style.background = 'rgba(76, 175, 80, 0.5)';
      button.style.transform = 'translateX(5px)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.background = 'rgba(76, 175, 80, 0.3)';
      button.style.transform = 'translateX(0)';
    });

    button.addEventListener('click', () => {
      if (!this.grappleMapScene.getIsAnimating()) {
        this.grappleMapScene.setPosition(transition.to, true);
        // Update UI after animation completes
        setTimeout(() => this.updateUI(), transition.duration * 1000 + 100);
      }
    });

    return button;
  }

  /**
   * Update UI to reflect current state
   */
  updateUI() {
    const currentPosId = this.grappleMapScene.getCurrentPosition();
    const allPositions = getAllPositions();
    const currentPos = allPositions.find(p => p.id === currentPosId);

    if (currentPos) {
      // Update current position display
      this.currentPositionDisplay.innerHTML = `
        <div style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">${currentPos.name}</div>
        <div style="font-size: 12px; color: #ccc;">${currentPos.description}</div>
        <div style="font-size: 11px; color: #888; margin-top: 5px;">
          Tags: ${currentPos.tags.join(', ')}
        </div>
      `;

      // Update transitions list
      this.transitionsList.innerHTML = '';
      const transitions = getTransitionsFrom(currentPosId);

      if (transitions.length > 0) {
        transitions.forEach(transition => {
          const button = this.createTransitionButton(transition);
          this.transitionsList.appendChild(button);
        });
      } else {
        const noTransitions = document.createElement('div');
        noTransitions.textContent = 'No transitions from this position';
        noTransitions.style.cssText = 'color: #888; font-style: italic; padding: 10px;';
        this.transitionsList.appendChild(noTransitions);
      }
    }
  }

  /**
   * Show/hide UI
   */
  setVisible(visible) {
    this.container.style.display = visible ? 'block' : 'none';
  }

  /**
   * Cleanup
   */
  dispose() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
