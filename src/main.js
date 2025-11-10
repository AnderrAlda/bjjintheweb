import { Game } from './game/Game.js';

// Wait for DOM to be ready
window.addEventListener('DOMContentLoaded', () => {
  // Initialize the game
  const game = new Game({
    container: document.getElementById('canvas-container'),
    debug: import.meta.env.MODE === 'development'
  });

  // Start the game
  game.start();

  // Handle window resize
  window.addEventListener('resize', () => {
    game.onResize();
  });

  // Handle visibility change (pause when tab is hidden)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      game.pause();
    } else {
      game.resume();
    }
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    game.dispose();
  });

  // Make game accessible from console for debugging
  if (import.meta.env.MODE === 'development') {
    window.game = game;
  }
});
