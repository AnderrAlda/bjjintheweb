import * as THREE from 'three';
import { StickFigure } from './StickFigure.js';
import { POSITIONS, getPositionById, getTransition } from './Positions.js';

/**
 * GrappleMapScene manages the visualization of two fighters
 * and handles transitions between positions
 */
export class GrappleMapScene {
  constructor(scene) {
    this.scene = scene;

    // Create two fighters with different colors
    this.player1 = new StickFigure(0x00ff00); // Green
    this.player2 = new StickFigure(0xff0000); // Red

    // Add to scene
    this.scene.add(this.player1.getGroup());
    this.scene.add(this.player2.getGroup());

    // Animation state
    this.isAnimating = false;
    this.animationProgress = 0;
    this.animationDuration = 2.0;
    this.startPosition = null;
    this.targetPosition = null;
    this.onAnimationComplete = null;

    // Current position
    this.currentPosition = null;

    // Set initial position
    this.setPosition(POSITIONS.STANDING_NEUTRAL.id, false);
  }

  /**
   * Set position by ID (with optional animation)
   */
  setPosition(positionId, animate = true) {
    const position = getPositionById(positionId);
    if (!position) {
      console.error(`Position ${positionId} not found`);
      return;
    }

    if (animate && this.currentPosition) {
      this.startTransition(this.currentPosition, positionId);
    } else {
      this.applyPosition(position);
      this.currentPosition = positionId;
    }
  }

  /**
   * Start a transition animation between two positions
   */
  startTransition(fromPositionId, toPositionId, onComplete = null) {
    if (this.isAnimating) {
      console.warn('Animation already in progress');
      return;
    }

    const transition = getTransition(fromPositionId, toPositionId);
    if (!transition) {
      console.warn(`No transition found from ${fromPositionId} to ${toPositionId}, using direct interpolation`);
      this.animationDuration = 2.0;
    } else {
      this.animationDuration = transition.duration;
    }

    this.startPosition = getPositionById(fromPositionId);
    this.targetPosition = getPositionById(toPositionId);
    this.isAnimating = true;
    this.animationProgress = 0;
    this.onAnimationComplete = onComplete;

    console.log(`Starting transition: ${this.startPosition.name} → ${this.targetPosition.name}`);
  }

  /**
   * Apply a position directly without animation
   */
  applyPosition(position) {
    this.player1.setPose(position.player1);
    this.player2.setPose(position.player2);
  }

  /**
   * Interpolate between two poses
   */
  interpolatePose(pose1, pose2, t) {
    const result = {};
    for (const jointName in pose1) {
      const p1 = pose1[jointName];
      const p2 = pose2[jointName];
      result[jointName] = {
        x: p1.x + (p2.x - p1.x) * t,
        y: p1.y + (p2.y - p1.y) * t,
        z: p1.z + (p2.z - p1.z) * t
      };
    }
    return result;
  }

  /**
   * Update animation
   */
  update(deltaTime) {
    if (!this.isAnimating) return;

    this.animationProgress += deltaTime / this.animationDuration;

    if (this.animationProgress >= 1.0) {
      // Animation complete
      this.animationProgress = 1.0;
      this.isAnimating = false;
      this.applyPosition(this.targetPosition);
      this.currentPosition = this.targetPosition.id;

      console.log(`Transition complete: ${this.targetPosition.name}`);

      if (this.onAnimationComplete) {
        this.onAnimationComplete();
        this.onAnimationComplete = null;
      }
    } else {
      // Interpolate between positions using easing
      const t = this.easeInOutCubic(this.animationProgress);

      const player1Pose = this.interpolatePose(
        this.startPosition.player1,
        this.targetPosition.player1,
        t
      );
      const player2Pose = this.interpolatePose(
        this.startPosition.player2,
        this.targetPosition.player2,
        t
      );

      this.player1.setPose(player1Pose);
      this.player2.setPose(player2Pose);
    }
  }

  /**
   * Easing function for smoother animation
   */
  easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /**
   * Get current position ID
   */
  getCurrentPosition() {
    return this.currentPosition;
  }

  /**
   * Check if currently animating
   */
  getIsAnimating() {
    return this.isAnimating;
  }

  /**
   * Cleanup
   */
  dispose() {
    this.player1.dispose();
    this.player2.dispose();
  }
}
