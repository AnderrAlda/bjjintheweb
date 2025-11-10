import * as THREE from 'three';

/**
 * BJJ Position Database
 * Inspired by GrappleMap - defines various BJJ positions and transitions
 * Each position contains joint coordinates for both fighters
 */

/**
 * Helper function to create a position object from joint coordinates
 */
function createPosition(joints) {
  const position = {};
  Object.keys(joints).forEach(jointName => {
    position[jointName] = new THREE.Vector3(...joints[jointName]);
  });
  return position;
}

/**
 * Standing neutral position
 */
export const standingNeutral = {
  name: 'Standing Neutral',
  tags: ['standing', 'neutral'],
  description: 'Both fighters standing in neutral position',
  fighter1: createPosition({
    // Legs
    LeftToe: [0.15, 0, 0.3],
    RightToe: [-0.15, 0, 0.3],
    LeftHeel: [0.15, 0, 0.15],
    RightHeel: [-0.15, 0, 0.15],
    LeftAnkle: [0.15, 0.05, 0.2],
    RightAnkle: [-0.15, 0.05, 0.2],
    LeftKnee: [0.15, 0.5, 0.1],
    RightKnee: [-0.15, 0.5, 0.1],
    LeftHip: [0.15, 1.0, 0],
    RightHip: [-0.15, 1.0, 0],

    // Arms
    LeftShoulder: [0.3, 1.5, 0],
    RightShoulder: [-0.3, 1.5, 0],
    LeftElbow: [0.4, 1.2, 0.2],
    RightElbow: [-0.4, 1.2, 0.2],
    LeftWrist: [0.35, 0.95, 0.3],
    RightWrist: [-0.35, 0.95, 0.3],
    LeftHand: [0.35, 0.9, 0.35],
    RightHand: [-0.35, 0.9, 0.35],
    LeftFingers: [0.35, 0.85, 0.4],
    RightFingers: [-0.35, 0.85, 0.4],

    // Central
    Core: [0, 1.1, 0],
    Neck: [0, 1.6, 0],
    Head: [0, 1.8, 0]
  }),
  fighter2: createPosition({
    // Legs
    LeftToe: [0.15, 0, -0.3],
    RightToe: [-0.15, 0, -0.3],
    LeftHeel: [0.15, 0, -0.15],
    RightHeel: [-0.15, 0, -0.15],
    LeftAnkle: [0.15, 0.05, -0.2],
    RightAnkle: [-0.15, 0.05, -0.2],
    LeftKnee: [0.15, 0.5, -0.1],
    RightKnee: [-0.15, 0.5, -0.1],
    LeftHip: [0.15, 1.0, 0],
    RightHip: [-0.15, 1.0, 0],

    // Arms
    LeftShoulder: [0.3, 1.5, 0],
    RightShoulder: [-0.3, 1.5, 0],
    LeftElbow: [0.4, 1.2, -0.2],
    RightElbow: [-0.4, 1.2, -0.2],
    LeftWrist: [0.35, 0.95, -0.3],
    RightWrist: [-0.35, 0.95, -0.3],
    LeftHand: [0.35, 0.9, -0.35],
    RightHand: [-0.35, 0.9, -0.35],
    LeftFingers: [0.35, 0.85, -0.4],
    RightFingers: [-0.35, 0.85, -0.4],

    // Central
    Core: [0, 1.1, 0],
    Neck: [0, 1.6, 0],
    Head: [0, 1.8, 0]
  })
};

/**
 * Closed Guard position
 */
export const closedGuard = {
  name: 'Closed Guard',
  tags: ['guard', 'bottom_supine', 'top_kneeling'],
  description: 'Bottom player has closed guard on top player',
  fighter1: createPosition({
    // Bottom player on back
    // Legs wrapped around top player
    LeftToe: [0.4, 0.6, -0.5],
    RightToe: [-0.4, 0.6, -0.5],
    LeftHeel: [0.35, 0.55, -0.4],
    RightHeel: [-0.35, 0.55, -0.4],
    LeftAnkle: [0.35, 0.5, -0.3],
    RightAnkle: [-0.35, 0.5, -0.3],
    LeftKnee: [0.4, 0.4, 0.2],
    RightKnee: [-0.4, 0.4, 0.2],
    LeftHip: [0.2, 0.3, 0],
    RightHip: [-0.2, 0.3, 0],

    // Arms controlling
    LeftShoulder: [0.3, 0.5, 0],
    RightShoulder: [-0.3, 0.5, 0],
    LeftElbow: [0.4, 0.4, 0.1],
    RightElbow: [-0.4, 0.4, 0.1],
    LeftWrist: [0.2, 0.5, 0.3],
    RightWrist: [-0.2, 0.5, 0.3],
    LeftHand: [0.15, 0.55, 0.35],
    RightHand: [-0.15, 0.55, 0.35],
    LeftFingers: [0.1, 0.6, 0.4],
    RightFingers: [-0.1, 0.6, 0.4],

    // Central - on back
    Core: [0, 0.35, 0],
    Neck: [0, 0.55, 0],
    Head: [0, 0.65, 0]
  }),
  fighter2: createPosition({
    // Top player in closed guard
    // Legs kneeling
    LeftToe: [0.3, 0, 0.3],
    RightToe: [-0.3, 0, 0.3],
    LeftHeel: [0.3, 0.1, 0.15],
    RightHeel: [-0.3, 0.1, 0.15],
    LeftAnkle: [0.3, 0.05, 0.2],
    RightAnkle: [-0.3, 0.05, 0.2],
    LeftKnee: [0.3, 0.15, 0.3],
    RightKnee: [-0.3, 0.15, 0.3],
    LeftHip: [0.2, 0.4, 0.1],
    RightHip: [-0.2, 0.4, 0.1],

    // Arms posting
    LeftShoulder: [0.35, 0.8, 0.05],
    RightShoulder: [-0.35, 0.8, 0.05],
    LeftElbow: [0.45, 0.5, 0.15],
    RightElbow: [-0.45, 0.5, 0.15],
    LeftWrist: [0.4, 0.25, 0.15],
    RightWrist: [-0.4, 0.25, 0.15],
    LeftHand: [0.4, 0.2, 0.15],
    RightHand: [-0.4, 0.2, 0.15],
    LeftFingers: [0.4, 0.15, 0.15],
    RightFingers: [-0.4, 0.15, 0.15],

    // Central - leaning forward
    Core: [0, 0.55, 0.1],
    Neck: [0, 0.85, 0.15],
    Head: [0, 0.95, 0.2]
  })
};

/**
 * Mount position
 */
export const mount = {
  name: 'Mount',
  tags: ['mount', 'top_sitting', 'bottom_supine'],
  description: 'Top player in mount position',
  fighter1: createPosition({
    // Bottom player on back
    // Legs on ground
    LeftToe: [0.5, 0, 0.2],
    RightToe: [-0.5, 0, 0.2],
    LeftHeel: [0.45, 0, 0.1],
    RightHeel: [-0.45, 0, 0.1],
    LeftAnkle: [0.45, 0.05, 0.15],
    RightAnkle: [-0.45, 0.05, 0.15],
    LeftKnee: [0.4, 0.25, 0.1],
    RightKnee: [-0.4, 0.25, 0.1],
    LeftHip: [0.2, 0.2, 0],
    RightHip: [-0.2, 0.2, 0],

    // Arms defending
    LeftShoulder: [0.25, 0.35, 0],
    RightShoulder: [-0.25, 0.35, 0],
    LeftElbow: [0.35, 0.25, 0.15],
    RightElbow: [-0.35, 0.25, 0.15],
    LeftWrist: [0.3, 0.4, 0.3],
    RightWrist: [-0.3, 0.4, 0.3],
    LeftHand: [0.25, 0.45, 0.35],
    RightHand: [-0.25, 0.45, 0.35],
    LeftFingers: [0.2, 0.5, 0.4],
    RightFingers: [-0.2, 0.5, 0.4],

    // Central - on back
    Core: [0, 0.25, 0],
    Neck: [0, 0.4, 0],
    Head: [0, 0.5, 0]
  }),
  fighter2: createPosition({
    // Top player sitting on bottom
    // Legs controlling
    LeftToe: [0.2, 0, -0.1],
    RightToe: [-0.2, 0, -0.1],
    LeftHeel: [0.25, 0, 0],
    RightHeel: [-0.25, 0, 0],
    LeftAnkle: [0.25, 0.05, -0.05],
    RightAnkle: [-0.25, 0.05, -0.05],
    LeftKnee: [0.3, 0.35, 0.1],
    RightKnee: [-0.3, 0.35, 0.1],
    LeftHip: [0.15, 0.55, 0.05],
    RightHip: [-0.15, 0.55, 0.05],

    // Arms controlling
    LeftShoulder: [0.3, 0.95, 0.05],
    RightShoulder: [-0.3, 0.95, 0.05],
    LeftElbow: [0.35, 0.7, 0.15],
    RightElbow: [-0.35, 0.7, 0.15],
    LeftWrist: [0.25, 0.5, 0.25],
    RightWrist: [-0.25, 0.5, 0.25],
    LeftHand: [0.2, 0.45, 0.3],
    RightHand: [-0.2, 0.45, 0.3],
    LeftFingers: [0.15, 0.4, 0.35],
    RightFingers: [-0.15, 0.4, 0.35],

    // Central - sitting upright on opponent
    Core: [0, 0.65, 0.05],
    Neck: [0, 1.0, 0.1],
    Head: [0, 1.15, 0.15]
  })
};

/**
 * Side Control position
 */
export const sideControl = {
  name: 'Side Control',
  tags: ['side_control', 'top_on_side', 'bottom_supine'],
  description: 'Top player in side control',
  fighter1: createPosition({
    // Bottom player on back
    LeftToe: [0.5, 0, -0.3],
    RightToe: [-0.5, 0, 0.3],
    LeftHeel: [0.45, 0, -0.2],
    RightHeel: [-0.45, 0, 0.2],
    LeftAnkle: [0.45, 0.05, -0.25],
    RightAnkle: [-0.45, 0.05, 0.25],
    LeftKnee: [0.35, 0.2, -0.15],
    RightKnee: [-0.35, 0.2, 0.15],
    LeftHip: [0.2, 0.2, -0.05],
    RightHip: [-0.2, 0.2, 0.05],

    // Arms defending
    LeftShoulder: [0.25, 0.35, 0],
    RightShoulder: [-0.25, 0.35, 0],
    LeftElbow: [0.15, 0.3, -0.2],
    RightElbow: [-0.35, 0.4, 0.3],
    LeftWrist: [0.1, 0.45, -0.3],
    RightWrist: [-0.4, 0.5, 0.4],
    LeftHand: [0.05, 0.5, -0.35],
    RightHand: [-0.4, 0.55, 0.45],
    LeftFingers: [0, 0.55, -0.4],
    RightFingers: [-0.4, 0.6, 0.5],

    // Central - on back
    Core: [0, 0.25, 0],
    Neck: [0, 0.4, 0],
    Head: [-0.1, 0.5, 0]
  }),
  fighter2: createPosition({
    // Top player on side
    LeftToe: [-0.3, 0, -0.4],
    RightToe: [-0.5, 0, 0.1],
    LeftHeel: [-0.25, 0, -0.3],
    RightHeel: [-0.45, 0, 0],
    LeftAnkle: [-0.25, 0.05, -0.35],
    RightAnkle: [-0.45, 0.05, 0.05],
    LeftKnee: [-0.15, 0.3, -0.25],
    RightKnee: [-0.35, 0.25, 0.15],
    LeftHip: [-0.05, 0.5, -0.1],
    RightHip: [-0.2, 0.45, 0.15],

    // Arms controlling
    LeftShoulder: [0.15, 0.75, -0.05],
    RightShoulder: [-0.35, 0.7, 0.1],
    LeftElbow: [0.3, 0.5, 0],
    RightElbow: [-0.25, 0.45, 0.25],
    LeftWrist: [0.25, 0.3, 0],
    RightWrist: [-0.15, 0.25, 0.3],
    LeftHand: [0.2, 0.25, 0],
    RightHand: [-0.1, 0.2, 0.3],
    LeftFingers: [0.15, 0.2, 0],
    RightFingers: [-0.05, 0.15, 0.3],

    // Central - on side
    Core: [-0.1, 0.55, 0.05],
    Neck: [0, 0.75, 0],
    Head: [0.1, 0.85, -0.05]
  })
};

/**
 * Rear Naked Choke position
 */
export const rearNakedChoke = {
  name: 'Rear Naked Choke',
  tags: ['back', 'rear_naked_choke', 'submission', 'top_sitting', 'bottom_seated'],
  description: 'Top player attempting rear naked choke',
  fighter1: createPosition({
    // Bottom player seated, being choked
    LeftToe: [0.4, 0, 0.4],
    RightToe: [-0.4, 0, 0.4],
    LeftHeel: [0.35, 0, 0.3],
    RightHeel: [-0.35, 0, 0.3],
    LeftAnkle: [0.35, 0.05, 0.35],
    RightAnkle: [-0.35, 0.05, 0.35],
    LeftKnee: [0.3, 0.3, 0.25],
    RightKnee: [-0.3, 0.3, 0.25],
    LeftHip: [0.15, 0.45, 0.05],
    RightHip: [-0.15, 0.45, 0.05],

    // Arms defending the choke
    LeftShoulder: [0.25, 0.7, 0],
    RightShoulder: [-0.25, 0.7, 0],
    LeftElbow: [0.15, 0.75, 0.15],
    RightElbow: [-0.15, 0.75, 0.15],
    LeftWrist: [0.05, 0.8, 0.15],
    RightWrist: [-0.05, 0.8, 0.15],
    LeftHand: [0, 0.82, 0.15],
    RightHand: [0, 0.82, 0.15],
    LeftFingers: [0, 0.84, 0.15],
    RightFingers: [0, 0.84, 0.15],

    // Central
    Core: [0, 0.55, 0],
    Neck: [0, 0.75, 0],
    Head: [0, 0.85, 0.05]
  }),
  fighter2: createPosition({
    // Top player behind, applying choke
    LeftToe: [0.2, 0, -0.2],
    RightToe: [-0.2, 0, -0.2],
    LeftHeel: [0.25, 0, -0.3],
    RightHeel: [-0.25, 0, -0.3],
    LeftAnkle: [0.25, 0.05, -0.25],
    RightAnkle: [-0.25, 0.05, -0.25],
    LeftKnee: [0.3, 0.3, -0.15],
    RightKnee: [-0.3, 0.3, -0.15],
    LeftHip: [0.15, 0.5, -0.05],
    RightHip: [-0.15, 0.5, -0.05],

    // Arms applying choke
    LeftShoulder: [0.25, 0.8, -0.05],
    RightShoulder: [-0.25, 0.8, -0.05],
    LeftElbow: [0.15, 0.85, 0.1],
    RightElbow: [-0.3, 0.75, 0],
    LeftWrist: [0.05, 0.8, 0.15],
    RightWrist: [-0.2, 0.8, -0.15],
    LeftHand: [0, 0.78, 0.18],
    RightHand: [-0.15, 0.82, -0.1],
    LeftFingers: [-0.02, 0.76, 0.2],
    RightFingers: [-0.1, 0.84, -0.05],

    // Central - behind opponent
    Core: [0, 0.6, -0.05],
    Neck: [0, 0.85, 0],
    Head: [0, 0.95, 0.05]
  })
};

/**
 * Triangle Choke position
 */
export const triangleChoke = {
  name: 'Triangle Choke',
  tags: ['guard', 'triangle', 'submission', 'bottom_supine'],
  description: 'Bottom player attempting triangle choke',
  fighter1: createPosition({
    // Bottom player applying triangle
    LeftToe: [0.15, 0.8, -0.2],
    RightToe: [-0.4, 0.3, 0.3],
    LeftHeel: [0.1, 0.75, -0.15],
    RightHeel: [-0.35, 0.25, 0.2],
    LeftAnkle: [0.1, 0.75, -0.15],
    RightAnkle: [-0.35, 0.3, 0.25],
    LeftKnee: [0.2, 0.6, 0.1],
    RightKnee: [-0.3, 0.4, 0.15],
    LeftHip: [0.15, 0.4, 0],
    RightHip: [-0.15, 0.4, 0],

    // Arms pulling
    LeftShoulder: [0.25, 0.5, 0],
    RightShoulder: [-0.25, 0.5, 0],
    LeftElbow: [0.15, 0.55, 0.2],
    RightElbow: [-0.3, 0.4, 0.15],
    LeftWrist: [0.05, 0.65, 0.3],
    RightWrist: [-0.15, 0.65, 0.25],
    LeftHand: [0, 0.7, 0.35],
    RightHand: [-0.1, 0.7, 0.3],
    LeftFingers: [0, 0.75, 0.4],
    RightFingers: [-0.05, 0.75, 0.35],

    // Central - on back pulling
    Core: [0, 0.45, 0],
    Neck: [0, 0.6, 0.05],
    Head: [0, 0.7, 0.1]
  }),
  fighter2: createPosition({
    // Top player being triangled
    LeftToe: [0.3, 0, 0.3],
    RightToe: [-0.3, 0, 0.3],
    LeftHeel: [0.3, 0.1, 0.2],
    RightHeel: [-0.3, 0.1, 0.2],
    LeftAnkle: [0.3, 0.05, 0.25],
    RightAnkle: [-0.3, 0.05, 0.25],
    LeftKnee: [0.25, 0.2, 0.25],
    RightKnee: [-0.25, 0.2, 0.25],
    LeftHip: [0.15, 0.45, 0.15],
    RightHip: [-0.15, 0.45, 0.15],

    // Arms - one trapped
    LeftShoulder: [0.3, 0.75, 0.15],
    RightShoulder: [-0.3, 0.75, 0.15],
    LeftElbow: [0.1, 0.6, 0.25],
    RightElbow: [-0.4, 0.5, 0.2],
    LeftWrist: [0.05, 0.5, 0.3],
    RightWrist: [-0.4, 0.3, 0.2],
    LeftHand: [0.03, 0.45, 0.32],
    RightHand: [-0.4, 0.25, 0.2],
    LeftFingers: [0.01, 0.4, 0.34],
    RightFingers: [-0.4, 0.2, 0.2],

    // Central - bent forward in triangle
    Core: [0, 0.55, 0.2],
    Neck: [0, 0.8, 0.25],
    Head: [0, 0.88, 0.3]
  })
};

/**
 * All positions database
 */
export const positionsDatabase = [
  standingNeutral,
  closedGuard,
  mount,
  sideControl,
  rearNakedChoke,
  triangleChoke
];

/**
 * Get position by name
 */
export function getPositionByName(name) {
  return positionsDatabase.find(pos => pos.name === name);
}

/**
 * Get all position names
 */
export function getAllPositionNames() {
  return positionsDatabase.map(pos => pos.name);
}
