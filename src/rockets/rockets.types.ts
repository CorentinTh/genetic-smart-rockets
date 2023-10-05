import { Vector } from '../vectors/vectors.types';

export type Rocket = {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  dna: Vector[];
  hasReachedTarget: boolean;
  hasCrashed: boolean;
  iterationNumberOnTarget: number | undefined;
};
