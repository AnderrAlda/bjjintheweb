/**
 * Joint definitions for stick figure
 * Based on GrappleMap's stick figure model
 */

export const JointType = {
  // Core/Torso
  Core: 'Core',
  Neck: 'Neck',
  Head: 'Head',

  // Left arm
  LeftShoulder: 'LeftShoulder',
  LeftElbow: 'LeftElbow',
  LeftHand: 'LeftHand',

  // Right arm
  RightShoulder: 'RightShoulder',
  RightElbow: 'RightElbow',
  RightHand: 'RightHand',

  // Left leg
  LeftHip: 'LeftHip',
  LeftKnee: 'LeftKnee',
  LeftAnkle: 'LeftAnkle',
  LeftFoot: 'LeftFoot',

  // Right leg
  RightHip: 'RightHip',
  RightKnee: 'RightKnee',
  RightAnkle: 'RightAnkle',
  RightFoot: 'RightFoot'
};

/**
 * Defines bone connections (parent -> child relationships)
 */
export const BoneConnections = [
  // Spine
  [JointType.Core, JointType.Neck],
  [JointType.Neck, JointType.Head],

  // Left arm
  [JointType.Neck, JointType.LeftShoulder],
  [JointType.LeftShoulder, JointType.LeftElbow],
  [JointType.LeftElbow, JointType.LeftHand],

  // Right arm
  [JointType.Neck, JointType.RightShoulder],
  [JointType.RightShoulder, JointType.RightElbow],
  [JointType.RightElbow, JointType.RightHand],

  // Left leg
  [JointType.Core, JointType.LeftHip],
  [JointType.LeftHip, JointType.LeftKnee],
  [JointType.LeftKnee, JointType.LeftAnkle],
  [JointType.LeftAnkle, JointType.LeftFoot],

  // Right leg
  [JointType.Core, JointType.RightHip],
  [JointType.RightHip, JointType.RightKnee],
  [JointType.RightKnee, JointType.RightAnkle],
  [JointType.RightAnkle, JointType.RightFoot]
];
