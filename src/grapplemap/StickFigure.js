import * as THREE from 'three';
import { JointType, BoneConnections } from './Joint.js';

/**
 * StickFigure represents a grappler as a stick figure with joints and bones
 */
export class StickFigure {
  constructor(color = 0x00ff00) {
    this.color = color;
    this.joints = new Map();
    this.group = new THREE.Group();

    // Visual elements
    this.jointMeshes = new Map();
    this.boneMeshes = [];

    // Joint and bone sizing
    this.jointRadius = 0.04;
    this.boneRadius = 0.02;

    this.initializeJoints();
    this.createVisuals();
  }

  /**
   * Initialize all joints with default positions
   */
  initializeJoints() {
    // Set default standing position
    const defaultPositions = {
      [JointType.Core]: new THREE.Vector3(0, 1.0, 0),
      [JointType.Neck]: new THREE.Vector3(0, 1.4, 0),
      [JointType.Head]: new THREE.Vector3(0, 1.6, 0),

      [JointType.LeftShoulder]: new THREE.Vector3(-0.2, 1.3, 0),
      [JointType.LeftElbow]: new THREE.Vector3(-0.3, 0.9, 0),
      [JointType.LeftHand]: new THREE.Vector3(-0.35, 0.6, 0),

      [JointType.RightShoulder]: new THREE.Vector3(0.2, 1.3, 0),
      [JointType.RightElbow]: new THREE.Vector3(0.3, 0.9, 0),
      [JointType.RightHand]: new THREE.Vector3(0.35, 0.6, 0),

      [JointType.LeftHip]: new THREE.Vector3(-0.15, 0.9, 0),
      [JointType.LeftKnee]: new THREE.Vector3(-0.15, 0.5, 0),
      [JointType.LeftAnkle]: new THREE.Vector3(-0.15, 0.1, 0),
      [JointType.LeftFoot]: new THREE.Vector3(-0.15, 0, 0.1),

      [JointType.RightHip]: new THREE.Vector3(0.15, 0.9, 0),
      [JointType.RightKnee]: new THREE.Vector3(0.15, 0.5, 0),
      [JointType.RightAnkle]: new THREE.Vector3(0.15, 0.1, 0),
      [JointType.RightFoot]: new THREE.Vector3(0.15, 0, 0.1)
    };

    for (const [jointName, position] of Object.entries(defaultPositions)) {
      this.joints.set(jointName, position.clone());
    }
  }

  /**
   * Create visual representation (spheres for joints, cylinders for bones)
   */
  createVisuals() {
    const jointGeometry = new THREE.SphereGeometry(this.jointRadius, 8, 8);
    const jointMaterial = new THREE.MeshPhongMaterial({ color: this.color });

    // Create joint spheres
    for (const [jointName, position] of this.joints) {
      const mesh = new THREE.Mesh(jointGeometry, jointMaterial);
      mesh.position.copy(position);
      this.jointMeshes.set(jointName, mesh);
      this.group.add(mesh);
    }

    // Create bone cylinders
    const boneMaterial = new THREE.MeshPhongMaterial({ color: this.color });

    for (const [startJoint, endJoint] of BoneConnections) {
      const startPos = this.joints.get(startJoint);
      const endPos = this.joints.get(endJoint);

      if (startPos && endPos) {
        const bone = this.createBone(startPos, endPos, boneMaterial);
        this.boneMeshes.push({ mesh: bone, start: startJoint, end: endJoint });
        this.group.add(bone);
      }
    }
  }

  /**
   * Create a cylinder bone between two points
   */
  createBone(start, end, material) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      this.boneRadius,
      this.boneRadius,
      length,
      8
    );

    const bone = new THREE.Mesh(geometry, material);

    // Position at midpoint
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    bone.position.copy(midpoint);

    // Rotate to align with direction
    bone.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );

    return bone;
  }

  /**
   * Update joint positions
   */
  setJointPosition(jointName, position) {
    if (this.joints.has(jointName)) {
      this.joints.get(jointName).copy(position);
    }
  }

  /**
   * Set all joint positions from a position object
   */
  setPose(pose) {
    for (const [jointName, position] of Object.entries(pose)) {
      this.setJointPosition(jointName, new THREE.Vector3(
        position.x,
        position.y,
        position.z
      ));
    }
    this.updateVisuals();
  }

  /**
   * Update visual representation to match joint positions
   */
  updateVisuals() {
    // Update joint positions
    for (const [jointName, mesh] of this.jointMeshes) {
      const position = this.joints.get(jointName);
      if (position) {
        mesh.position.copy(position);
      }
    }

    // Update bone positions and orientations
    for (const boneData of this.boneMeshes) {
      const startPos = this.joints.get(boneData.start);
      const endPos = this.joints.get(boneData.end);

      if (startPos && endPos) {
        const direction = new THREE.Vector3().subVectors(endPos, startPos);
        const length = direction.length();

        // Update length
        boneData.mesh.scale.y = length / 1; // Assuming original length is 1

        // Update position
        const midpoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
        boneData.mesh.position.copy(midpoint);

        // Update rotation
        boneData.mesh.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction.normalize()
        );
      }
    }
  }

  /**
   * Get the three.js group for adding to scene
   */
  getGroup() {
    return this.group;
  }

  /**
   * Clean up resources
   */
  dispose() {
    // Dispose geometries and materials
    for (const mesh of this.jointMeshes.values()) {
      mesh.geometry.dispose();
      mesh.material.dispose();
    }

    for (const boneData of this.boneMeshes) {
      boneData.mesh.geometry.dispose();
      boneData.mesh.material.dispose();
    }

    // Remove from parent
    if (this.group.parent) {
      this.group.parent.remove(this.group);
    }
  }
}
