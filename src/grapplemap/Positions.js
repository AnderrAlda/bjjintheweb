import * as THREE from 'three';
import { JointType } from './Joint.js';

/**
 * GrappleMap position database
 * Each position defines the pose of two fighters
 */

/**
 * Helper to create a position object
 */
function createPosition(name, description, player1Pose, player2Pose, tags = []) {
  return {
    id: name.toLowerCase().replace(/\s+/g, '_'),
    name,
    description,
    tags,
    player1: player1Pose,
    player2: player2Pose
  };
}

/**
 * Helper to create Vector3
 */
const v = (x, y, z) => ({ x, y, z });

/**
 * Define basic BJJ positions
 */
export const POSITIONS = {
  // Standing position (neutral)
  STANDING_NEUTRAL: createPosition(
    'Standing Neutral',
    'Both fighters standing, facing each other',
    {
      [JointType.Core]: v(-1.5, 1.0, 0),
      [JointType.Neck]: v(-1.5, 1.4, 0),
      [JointType.Head]: v(-1.5, 1.6, 0),
      [JointType.LeftShoulder]: v(-1.7, 1.3, 0),
      [JointType.LeftElbow]: v(-1.8, 0.95, 0.2),
      [JointType.LeftHand]: v(-1.85, 0.7, 0.3),
      [JointType.RightShoulder]: v(-1.3, 1.3, 0),
      [JointType.RightElbow]: v(-1.2, 0.95, 0.2),
      [JointType.RightHand]: v(-1.15, 0.7, 0.3),
      [JointType.LeftHip]: v(-1.65, 0.9, 0),
      [JointType.LeftKnee]: v(-1.65, 0.5, 0),
      [JointType.LeftAnkle]: v(-1.65, 0.1, 0),
      [JointType.LeftFoot]: v(-1.65, 0, 0.1),
      [JointType.RightHip]: v(-1.35, 0.9, 0),
      [JointType.RightKnee]: v(-1.35, 0.5, 0),
      [JointType.RightAnkle]: v(-1.35, 0.1, 0),
      [JointType.RightFoot]: v(-1.35, 0, 0.1)
    },
    {
      [JointType.Core]: v(1.5, 1.0, 0),
      [JointType.Neck]: v(1.5, 1.4, 0),
      [JointType.Head]: v(1.5, 1.6, 0),
      [JointType.LeftShoulder]: v(1.3, 1.3, 0),
      [JointType.LeftElbow]: v(1.2, 0.95, 0.2),
      [JointType.LeftHand]: v(1.15, 0.7, 0.3),
      [JointType.RightShoulder]: v(1.7, 1.3, 0),
      [JointType.RightElbow]: v(1.8, 0.95, 0.2),
      [JointType.RightHand]: v(1.85, 0.7, 0.3),
      [JointType.LeftHip]: v(1.35, 0.9, 0),
      [JointType.LeftKnee]: v(1.35, 0.5, 0),
      [JointType.LeftAnkle]: v(1.35, 0.1, 0),
      [JointType.LeftFoot]: v(1.35, 0, 0.1),
      [JointType.RightHip]: v(1.65, 0.9, 0),
      [JointType.RightKnee]: v(1.65, 0.5, 0),
      [JointType.RightAnkle]: v(1.65, 0.1, 0),
      [JointType.RightFoot]: v(1.65, 0, 0.1)
    },
    ['standing', 'neutral']
  ),

  // Closed Guard
  CLOSED_GUARD: createPosition(
    'Closed Guard',
    'Bottom player has legs wrapped around top player',
    {
      // Bottom player (on back)
      [JointType.Core]: v(0, 0.15, 0),
      [JointType.Neck]: v(0, 0.3, 0),
      [JointType.Head]: v(0, 0.45, -0.1),
      [JointType.LeftShoulder]: v(-0.25, 0.25, 0),
      [JointType.LeftElbow]: v(-0.4, 0.3, 0.2),
      [JointType.LeftHand]: v(-0.3, 0.5, 0.3),
      [JointType.RightShoulder]: v(0.25, 0.25, 0),
      [JointType.RightElbow]: v(0.4, 0.3, 0.2),
      [JointType.RightHand]: v(0.3, 0.5, 0.3),
      [JointType.LeftHip]: v(-0.15, 0.1, 0),
      [JointType.LeftKnee]: v(-0.3, 0.3, 0.5),
      [JointType.LeftAnkle]: v(-0.2, 0.5, 0.8),
      [JointType.LeftFoot]: v(-0.1, 0.5, 0.85),
      [JointType.RightHip]: v(0.15, 0.1, 0),
      [JointType.RightKnee]: v(0.3, 0.3, 0.5),
      [JointType.RightAnkle]: v(0.2, 0.5, 0.8),
      [JointType.RightFoot]: v(0.1, 0.5, 0.85)
    },
    {
      // Top player (in guard)
      [JointType.Core]: v(0, 0.55, 0.4),
      [JointType.Neck]: v(0, 0.75, 0.3),
      [JointType.Head]: v(0, 0.9, 0.25),
      [JointType.LeftShoulder]: v(-0.2, 0.7, 0.3),
      [JointType.LeftElbow]: v(-0.3, 0.4, 0.1),
      [JointType.LeftHand]: v(-0.35, 0.15, 0.05),
      [JointType.RightShoulder]: v(0.2, 0.7, 0.3),
      [JointType.RightElbow]: v(0.3, 0.4, 0.1),
      [JointType.RightHand]: v(0.35, 0.15, 0.05),
      [JointType.LeftHip]: v(-0.15, 0.5, 0.45),
      [JointType.LeftKnee]: v(-0.3, 0.25, 0.6),
      [JointType.LeftAnkle]: v(-0.35, 0.05, 0.65),
      [JointType.LeftFoot]: v(-0.35, 0, 0.7),
      [JointType.RightHip]: v(0.15, 0.5, 0.45),
      [JointType.RightKnee]: v(0.3, 0.25, 0.6),
      [JointType.RightAnkle]: v(0.35, 0.05, 0.65),
      [JointType.RightFoot]: v(0.35, 0, 0.7)
    },
    ['guard', 'closed_guard', 'bottom_supine', 'top_kneeling']
  ),

  // Side Control
  SIDE_CONTROL: createPosition(
    'Side Control',
    'Top player controls from the side',
    {
      // Bottom player (on back)
      [JointType.Core]: v(0, 0.1, 0),
      [JointType.Neck]: v(0, 0.25, 0),
      [JointType.Head]: v(0.05, 0.38, 0),
      [JointType.LeftShoulder]: v(-0.25, 0.2, 0),
      [JointType.LeftElbow]: v(-0.35, 0.25, -0.2),
      [JointType.LeftHand]: v(-0.4, 0.3, -0.3),
      [JointType.RightShoulder]: v(0.25, 0.2, 0),
      [JointType.RightElbow]: v(0.35, 0.1, 0.1),
      [JointType.RightHand]: v(0.4, 0.05, 0.15),
      [JointType.LeftHip]: v(-0.15, 0.05, 0),
      [JointType.LeftKnee]: v(-0.2, 0.1, -0.3),
      [JointType.LeftAnkle]: v(-0.25, 0.05, -0.5),
      [JointType.LeftFoot]: v(-0.25, 0, -0.55),
      [JointType.RightHip]: v(0.15, 0.05, 0),
      [JointType.RightKnee]: v(0.25, 0.15, -0.2),
      [JointType.RightAnkle]: v(0.3, 0.05, -0.35),
      [JointType.RightFoot]: v(0.3, 0, -0.4)
    },
    {
      // Top player (side control)
      [JointType.Core]: v(0.1, 0.45, -0.5),
      [JointType.Neck]: v(0.15, 0.6, -0.35),
      [JointType.Head]: v(0.2, 0.72, -0.25),
      [JointType.LeftShoulder]: v(-0.05, 0.58, -0.4),
      [JointType.LeftElbow]: v(-0.15, 0.35, -0.2),
      [JointType.LeftHand]: v(-0.2, 0.2, -0.1),
      [JointType.RightShoulder]: v(0.3, 0.55, -0.35),
      [JointType.RightElbow]: v(0.4, 0.3, -0.15),
      [JointType.RightHand]: v(0.45, 0.15, 0),
      [JointType.LeftHip]: v(0, 0.35, -0.55),
      [JointType.LeftKnee]: v(-0.15, 0.15, -0.7),
      [JointType.LeftAnkle]: v(-0.25, 0.05, -0.8),
      [JointType.LeftFoot]: v(-0.3, 0, -0.85),
      [JointType.RightHip]: v(0.2, 0.35, -0.5),
      [JointType.RightKnee]: v(0.35, 0.15, -0.5),
      [JointType.RightAnkle]: v(0.45, 0.05, -0.55),
      [JointType.RightFoot]: v(0.5, 0, -0.6)
    },
    ['side_control', 'bottom_supine', 'top_on_side']
  ),

  // Mount
  MOUNT: createPosition(
    'Mount',
    'Top player mounted on bottom player',
    {
      // Bottom player (on back)
      [JointType.Core]: v(0, 0.1, 0),
      [JointType.Neck]: v(0, 0.25, 0),
      [JointType.Head]: v(0, 0.4, 0),
      [JointType.LeftShoulder]: v(-0.3, 0.2, 0),
      [JointType.LeftElbow]: v(-0.4, 0.15, -0.2),
      [JointType.LeftHand]: v(-0.45, 0.12, -0.35),
      [JointType.RightShoulder]: v(0.3, 0.2, 0),
      [JointType.RightElbow]: v(0.4, 0.15, -0.2),
      [JointType.RightHand]: v(0.45, 0.12, -0.35),
      [JointType.LeftHip]: v(-0.15, 0.05, 0),
      [JointType.LeftKnee]: v(-0.2, 0.12, -0.25),
      [JointType.LeftAnkle]: v(-0.22, 0.05, -0.45),
      [JointType.LeftFoot]: v(-0.22, 0, -0.5),
      [JointType.RightHip]: v(0.15, 0.05, 0),
      [JointType.RightKnee]: v(0.2, 0.12, -0.25),
      [JointType.RightAnkle]: v(0.22, 0.05, -0.45),
      [JointType.RightFoot]: v(0.22, 0, -0.5)
    },
    {
      // Top player (mount)
      [JointType.Core]: v(0, 0.55, -0.15),
      [JointType.Neck]: v(0, 0.75, -0.1),
      [JointType.Head]: v(0, 0.9, -0.05),
      [JointType.LeftShoulder]: v(-0.22, 0.7, -0.1),
      [JointType.LeftElbow]: v(-0.3, 0.45, 0.05),
      [JointType.LeftHand]: v(-0.32, 0.25, 0.1),
      [JointType.RightShoulder]: v(0.22, 0.7, -0.1),
      [JointType.RightElbow]: v(0.3, 0.45, 0.05),
      [JointType.RightHand]: v(0.32, 0.25, 0.1),
      [JointType.LeftHip]: v(-0.18, 0.4, -0.1),
      [JointType.LeftKnee]: v(-0.35, 0.2, 0.1),
      [JointType.LeftAnkle]: v(-0.45, 0.08, 0.15),
      [JointType.LeftFoot]: v(-0.5, 0, 0.15),
      [JointType.RightHip]: v(0.18, 0.4, -0.1),
      [JointType.RightKnee]: v(0.35, 0.2, 0.1),
      [JointType.RightAnkle]: v(0.45, 0.08, 0.15),
      [JointType.RightFoot]: v(0.5, 0, 0.15)
    },
    ['mount', 'bottom_supine', 'top_sitting']
  ),

  // Back Control
  BACK_CONTROL: createPosition(
    'Back Control',
    'Top player has back control with hooks',
    {
      // Bottom player (sitting, back taken)
      [JointType.Core]: v(0, 0.35, 0),
      [JointType.Neck]: v(0, 0.5, 0),
      [JointType.Head]: v(0, 0.65, 0.05),
      [JointType.LeftShoulder]: v(-0.25, 0.45, 0.05),
      [JointType.LeftElbow]: v(-0.35, 0.35, 0.2),
      [JointType.LeftHand]: v(-0.4, 0.4, 0.3),
      [JointType.RightShoulder]: v(0.25, 0.45, 0.05),
      [JointType.RightElbow]: v(0.35, 0.35, 0.2),
      [JointType.RightHand]: v(0.4, 0.4, 0.3),
      [JointType.LeftHip]: v(-0.15, 0.25, 0),
      [JointType.LeftKnee]: v(-0.25, 0.15, 0.3),
      [JointType.LeftAnkle]: v(-0.3, 0.08, 0.5),
      [JointType.LeftFoot]: v(-0.32, 0, 0.55),
      [JointType.RightHip]: v(0.15, 0.25, 0),
      [JointType.RightKnee]: v(0.25, 0.15, 0.3),
      [JointType.RightAnkle]: v(0.3, 0.08, 0.5),
      [JointType.RightFoot]: v(0.32, 0, 0.55)
    },
    {
      // Top player (back control with hooks)
      [JointType.Core]: v(0, 0.45, -0.3),
      [JointType.Neck]: v(0, 0.6, -0.25),
      [JointType.Head]: v(0, 0.75, -0.2),
      [JointType.LeftShoulder]: v(-0.22, 0.58, -0.25),
      [JointType.LeftElbow]: v(-0.15, 0.5, 0),
      [JointType.LeftHand]: v(-0.1, 0.55, 0.1),
      [JointType.RightShoulder]: v(0.22, 0.58, -0.25),
      [JointType.RightElbow]: v(0.15, 0.5, 0),
      [JointType.RightHand]: v(0.1, 0.55, 0.1),
      [JointType.LeftHip]: v(-0.18, 0.35, -0.3),
      [JointType.LeftKnee]: v(-0.3, 0.25, -0.05),
      [JointType.LeftAnkle]: v(-0.35, 0.2, 0.15),
      [JointType.LeftFoot]: v(-0.35, 0.15, 0.25),
      [JointType.RightHip]: v(0.18, 0.35, -0.3),
      [JointType.RightKnee]: v(0.3, 0.25, -0.05),
      [JointType.RightAnkle]: v(0.35, 0.2, 0.15),
      [JointType.RightFoot]: v(0.35, 0.15, 0.25)
    },
    ['back_control', 'bottom_sitting', 'top_sitting', 'hooks']
  )
};

/**
 * Define transitions between positions
 */
export const TRANSITIONS = [
  {
    id: 'standing_to_guard',
    name: 'Pull to Closed Guard',
    from: POSITIONS.STANDING_NEUTRAL.id,
    to: POSITIONS.CLOSED_GUARD.id,
    duration: 2.0,
    description: 'Bottom player pulls top into closed guard'
  },
  {
    id: 'guard_to_mount',
    name: 'Guard Pass to Mount',
    from: POSITIONS.CLOSED_GUARD.id,
    to: POSITIONS.MOUNT.id,
    duration: 3.0,
    description: 'Top player passes guard and achieves mount'
  },
  {
    id: 'guard_to_side',
    name: 'Guard Pass to Side Control',
    from: POSITIONS.CLOSED_GUARD.id,
    to: POSITIONS.SIDE_CONTROL.id,
    duration: 2.5,
    description: 'Top player passes guard to side control'
  },
  {
    id: 'side_to_mount',
    name: 'Side Control to Mount',
    from: POSITIONS.SIDE_CONTROL.id,
    to: POSITIONS.MOUNT.id,
    duration: 2.0,
    description: 'Top player transitions from side control to mount'
  },
  {
    id: 'mount_to_back',
    name: 'Mount to Back Control',
    from: POSITIONS.MOUNT.id,
    to: POSITIONS.BACK_CONTROL.id,
    duration: 2.5,
    description: 'Top player takes the back from mount'
  },
  {
    id: 'side_to_back',
    name: 'Side Control to Back',
    from: POSITIONS.SIDE_CONTROL.id,
    to: POSITIONS.BACK_CONTROL.id,
    duration: 3.0,
    description: 'Top player takes the back from side control'
  }
];

/**
 * Get all available positions
 */
export function getAllPositions() {
  return Object.values(POSITIONS);
}

/**
 * Get position by ID
 */
export function getPositionById(id) {
  return Object.values(POSITIONS).find(pos => pos.id === id);
}

/**
 * Get transitions from a position
 */
export function getTransitionsFrom(positionId) {
  return TRANSITIONS.filter(t => t.from === positionId);
}

/**
 * Get specific transition
 */
export function getTransition(fromId, toId) {
  return TRANSITIONS.find(t => t.from === fromId && t.to === toId);
}
