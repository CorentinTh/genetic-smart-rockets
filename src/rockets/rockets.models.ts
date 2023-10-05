import { Target } from '../target/target.types';
import { computeEuclideanDistance } from '../vectors/vectors.models';
import { Rocket } from './rockets.types';

export { checkTargetCollision, computeFitness, computeNormalizedFitness };

function checkTargetCollision({ rocket, target }: { rocket: Rocket; target: Target }) {
  const { position: rocketPosition } = rocket;
  const { position: targetPosition, radius: targetRadius } = target;

  const rocketX = rocketPosition.x;
  const rocketY = rocketPosition.y;
  const targetX = targetPosition.x;
  const targetY = targetPosition.y;

  return Math.sqrt(Math.pow(rocketX - targetX, 2) + Math.pow(rocketY - targetY, 2)) < targetRadius;
}

function computeFitness({ rocket, target, isFastestRocket }: { rocket: Rocket; target: Target; isFastestRocket?: boolean }): number {
  const { position, hasCrashed, hasReachedTarget } = rocket;
  const { position: targetPosition } = target;

  const distance = computeEuclideanDistance({ vector1: position, vector2: targetPosition }) ** 3;

  const score = 1 / (distance + 1);

  if (hasCrashed) {
    return score / 10;
  }

  if (hasReachedTarget) {
    return score * 10 * (isFastestRocket ? 10 : 1);
  }

  return score;
}

function computeNormalizedFitness({ rocket, target, maxFitness, isFastestRocket }: { rocket: Rocket; target: Target; maxFitness: number; isFastestRocket?: boolean }): number {
  const fitness = computeFitness({ rocket, target, isFastestRocket });

  return 100 * (fitness / maxFitness);
}
