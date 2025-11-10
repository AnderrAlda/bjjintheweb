import * as THREE from 'three';

/**
 * Joint definitions matching GrappleMap structure
 * 22 joints per fighter
 */
export const JointType = {
  // Legs
  LeftToe: 'LeftToe',
  RightToe: 'RightToe',
  LeftHeel: 'LeftHeel',
  RightHeel: 'RightHeel',
  LeftAnkle: 'LeftAnkle',
  RightAnkle: 'RightAnkle',
  LeftKnee: 'LeftKnee',
  RightKnee: 'RightKnee',
  LeftHip: 'LeftHip',
  RightHip: 'RightHip',

  // Arms
  LeftShoulder: 'LeftShoulder',
  RightShoulder: 'RightShoulder',
  LeftElbow: 'LeftElbow',
  RightElbow: 'RightElbow',
  LeftWrist: 'LeftWrist',
  RightWrist: 'RightWrist',
  LeftHand: 'LeftHand',
  RightHand: 'RightHand',
  LeftFingers: 'LeftFingers',
  RightFingers: 'RightFingers',

  // Central
  Core: 'Core',
  Neck: 'Neck',
  Head: 'Head'
};

/**
 * Bone connections for stick figure rendering
 */
const BoneConnections = [
  // Spine
  ['Core', 'Neck'],
  ['Neck', 'Head'],

  // Left Leg
  ['Core', 'LeftHip'],
  ['LeftHip', 'LeftKnee'],
  ['LeftKnee', 'LeftAnkle'],
  ['LeftAnkle', 'LeftHeel'],
  ['LeftAnkle', 'LeftToe'],

  // Right Leg
  ['Core', 'RightHip'],
  ['RightHip', 'RightKnee'],
  ['RightKnee', 'RightAnkle'],
  ['RightAnkle', 'RightHeel'],
  ['RightAnkle', 'RightToe'],

  // Left Arm
  ['Neck', 'LeftShoulder'],
  ['LeftShoulder', 'LeftElbow'],
  ['LeftElbow', 'LeftWrist'],
  ['LeftWrist', 'LeftHand'],
  ['LeftHand', 'LeftFingers'],

  // Right Arm
  ['Neck', 'RightShoulder'],
  ['RightShoulder', 'RightElbow'],
  ['RightElbow', 'RightWrist'],
  ['RightWrist', 'RightHand'],
  ['RightHand', 'RightFingers'],

  // Hips connection
  ['LeftHip', 'RightHip'],

  // Shoulders connection
  ['LeftShoulder', 'RightShoulder']
];

/**
 * Fighter class - represents a BJJ fighter as a stick figure
 * Inspired by GrappleMap's visualization
 */
export class Fighter {
  constructor(scene, color = 0x00ff00, name = 'Fighter') {
    this.scene = scene;
    this.color = color;
    this.name = name;

    // Joint positions (3D vectors)
    this.joints = {};

    // Visual elements
    this.jointMeshes = {};
    this.boneMeshes = [];
    this.group = new THREE.Group();
    this.group.name = name;

    // Animation
    this.currentPosition = null;
    this.targetPosition = null;
    this.animationProgress = 0;
    this.animationDuration = 1.0; // seconds
    this.isAnimating = false;

    this.initJoints();
    this.createVisuals();
    this.scene.add(this.group);
  }

  /**
   * Initialize all joints with default positions
   */
  initJoints() {
    // Initialize all joints to origin
    Object.values(JointType).forEach(jointName => {
      this.joints[jointName] = new THREE.Vector3(0, 0, 0);
    });
  }

  /**
   * Create visual representation (stick figure)
   */
  createVisuals() {
    // Create joint spheres
    const jointGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const jointMaterial = new THREE.MeshBasicMaterial({ color: this.color });

    Object.keys(this.joints).forEach(jointName => {
      const mesh = new THREE.Mesh(jointGeometry, jointMaterial);
      mesh.position.copy(this.joints[jointName]);
      this.jointMeshes[jointName] = mesh;
      this.group.add(mesh);
    });

    // Create bone lines
    const boneMaterial = new THREE.LineBasicMaterial({
      color: this.color,
      linewidth: 2
    });

    BoneConnections.forEach(([joint1, joint2]) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        0, 0, 0,
        0, 0, 0
      ]);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const line = new THREE.Line(geometry, boneMaterial);
      line.userData = { joint1, joint2 };
      this.boneMeshes.push(line);
      this.group.add(line);
    });

    this.updateVisuals();
  }

  /**
   * Update visual representation based on current joint positions
   */
  updateVisuals() {
    // Update joint spheres
    Object.keys(this.joints).forEach(jointName => {
      if (this.jointMeshes[jointName]) {
        this.jointMeshes[jointName].position.copy(this.joints[jointName]);
      }
    });

    // Update bone lines
    this.boneMeshes.forEach(line => {
      const { joint1, joint2 } = line.userData;
      const pos1 = this.joints[joint1];
      const pos2 = this.joints[joint2];

      const positions = line.geometry.attributes.position.array;
      positions[0] = pos1.x;
      positions[1] = pos1.y;
      positions[2] = pos1.z;
      positions[3] = pos2.x;
      positions[4] = pos2.y;
      positions[5] = pos2.z;

      line.geometry.attributes.position.needsUpdate = true;
    });
  }

  /**
   * Set the fighter to a specific position (instantly)
   */
  setPosition(position) {
    Object.keys(position).forEach(jointName => {
      if (this.joints[jointName]) {
        this.joints[jointName].copy(position[jointName]);
      }
    });

    this.currentPosition = position;
    this.updateVisuals();
  }

  /**
   * Animate to a target position smoothly
   */
  animateToPosition(targetPosition, duration = 1.0) {
    this.targetPosition = targetPosition;
    this.animationDuration = duration;
    this.animationProgress = 0;
    this.isAnimating = true;

    // Store starting position
    this.startPosition = {};
    Object.keys(this.joints).forEach(jointName => {
      this.startPosition[jointName] = this.joints[jointName].clone();
    });
  }

  /**
   * Update animation
   */
  update(deltaTime) {
    if (!this.isAnimating || !this.targetPosition) return;

    this.animationProgress += deltaTime / this.animationDuration;

    if (this.animationProgress >= 1.0) {
      // Animation complete
      this.animationProgress = 1.0;
      this.isAnimating = false;
    }

    // Smooth interpolation (ease-in-out)
    const t = this.smoothstep(this.animationProgress);

    // Interpolate all joints
    Object.keys(this.joints).forEach(jointName => {
      if (this.startPosition[jointName] && this.targetPosition[jointName]) {
        this.joints[jointName].lerpVectors(
          this.startPosition[jointName],
          this.targetPosition[jointName],
          t
        );
      }
    });

    this.updateVisuals();

    if (!this.isAnimating) {
      this.currentPosition = this.targetPosition;
    }
  }

  /**
   * Smooth step function for ease-in-out animation
   */
  smoothstep(t) {
    return t * t * (3 - 2 * t);
  }

  /**
   * Set visibility
   */
  setVisible(visible) {
    this.group.visible = visible;
  }

  /**
   * Cleanup
   */
  dispose() {
    this.scene.remove(this.group);

    // Dispose geometries and materials
    Object.values(this.jointMeshes).forEach(mesh => {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });

    this.boneMeshes.forEach(line => {
      line.geometry.dispose();
      line.material.dispose();
    });
  }
}
