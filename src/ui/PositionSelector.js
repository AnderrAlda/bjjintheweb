/**
 * PositionSelector - UI component for selecting BJJ positions
 * Creates a simple list-based selector inspired by GrappleMap
 */
export class PositionSelector {
  constructor(positions, onPositionSelected) {
    this.positions = positions;
    this.onPositionSelected = onPositionSelected;
    this.selectedIndex = 0;

    this.container = null;
    this.createUI();
  }

  /**
   * Create the UI elements
   */
  createUI() {
    // Create container
    this.container = document.createElement('div');
    this.container.id = 'position-selector';
    this.container.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      min-width: 250px;
      max-height: 80vh;
      overflow-y: auto;
      z-index: 100;
    `;

    // Create title
    const title = document.createElement('h2');
    title.textContent = 'BJJ Positions';
    title.style.cssText = `
      margin: 0 0 15px 0;
      font-size: 18px;
      border-bottom: 2px solid #4CAF50;
      padding-bottom: 10px;
    `;
    this.container.appendChild(title);

    // Create position list
    const list = document.createElement('div');
    list.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

    this.positions.forEach((position, index) => {
      const item = this.createPositionItem(position, index);
      list.appendChild(item);
    });

    this.container.appendChild(list);

    // Create controls info
    const controls = document.createElement('div');
    controls.style.cssText = `
      margin-top: 20px;
      padding-top: 15px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
    `;
    controls.innerHTML = `
      <div style="margin-bottom: 5px;"><strong>Controls:</strong></div>
      <div>Click position to view</div>
      <div>Animations are smooth</div>
    `;
    this.container.appendChild(controls);

    // Add to document
    document.body.appendChild(this.container);
  }

  /**
   * Create a position list item
   */
  createPositionItem(position, index) {
    const item = document.createElement('div');
    item.className = 'position-item';
    item.dataset.index = index;

    const isSelected = index === this.selectedIndex;

    item.style.cssText = `
      padding: 12px;
      background: ${isSelected ? '#4CAF50' : 'rgba(255, 255, 255, 0.1)'};
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    `;

    // Position name
    const name = document.createElement('div');
    name.textContent = position.name;
    name.style.cssText = `
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 4px;
    `;
    item.appendChild(name);

    // Position tags
    if (position.tags && position.tags.length > 0) {
      const tags = document.createElement('div');
      tags.textContent = position.tags.join(', ');
      tags.style.cssText = `
        font-size: 11px;
        color: rgba(255, 255, 255, 0.7);
        font-style: italic;
      `;
      item.appendChild(tags);
    }

    // Hover effect
    item.addEventListener('mouseenter', () => {
      if (index !== this.selectedIndex) {
        item.style.background = 'rgba(76, 175, 80, 0.3)';
      }
    });

    item.addEventListener('mouseleave', () => {
      if (index !== this.selectedIndex) {
        item.style.background = 'rgba(255, 255, 255, 0.1)';
      }
    });

    // Click handler
    item.addEventListener('click', () => {
      this.selectPosition(index);
    });

    return item;
  }

  /**
   * Select a position
   */
  selectPosition(index) {
    if (index === this.selectedIndex) return;

    // Update previous item
    const prevItem = this.container.querySelector(`[data-index="${this.selectedIndex}"]`);
    if (prevItem) {
      prevItem.style.background = 'rgba(255, 255, 255, 0.1)';
    }

    // Update new item
    const newItem = this.container.querySelector(`[data-index="${index}"]`);
    if (newItem) {
      newItem.style.background = '#4CAF50';
    }

    this.selectedIndex = index;

    // Notify callback
    if (this.onPositionSelected) {
      this.onPositionSelected(this.positions[index], index);
    }
  }

  /**
   * Show/hide the selector
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
