import { Vector } from '../vectors/vectors.types';
import { createCollisionManager } from './collisions';

export type Obstacle = {
  position: Vector;
  size: Vector;
};

export type CollisionManager = ReturnType<typeof createCollisionManager>;
