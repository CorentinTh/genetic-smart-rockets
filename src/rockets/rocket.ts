import { CollisionManager } from '../collisions/collision.types';
import { config } from '../config';
import { createDna, crossoverDna, mutateDna } from '../dna/dna';
import { Target } from '../target/target.types';
import { addVectors, createVector, limitVector } from '../vectors/vectors.models';
import { Vector } from '../vectors/vectors.types';
import { checkTargetCollision } from './rockets.models';
import { Rocket } from './rockets.types';

export { createRocket, crossoverRockets, drawRocket, mutateRocket, updateRocket };

function drawRocket({ rocket, ctx }: { rocket: Rocket; ctx: CanvasRenderingContext2D }) {
  const rocketWidth = 10;
  const rocketHeight = 20;
  const opacity = 0.5;

  ctx.save();
  ctx.translate(rocket.position.x, rocket.position.y);
  ctx.rotate(Math.atan2(rocket.velocity.y, rocket.velocity.x) + Math.PI / 2);
  ctx.fillStyle = config.colors.rocket;
  ctx.globalAlpha = opacity;
  ctx.fillRect(-rocketWidth / 2, -rocketHeight / 2, rocketWidth, rocketHeight);
  ctx.restore();
}

function updateRocket({ rocket, collisionManager, target, iteration }: { rocket: Rocket; collisionManager: CollisionManager; target: Target; iteration: number }) {
  if (rocket.hasReachedTarget || rocket.hasCrashed) {
    return;
  }

  const { position, velocity, dna } = rocket;
  const frameForce = dna[iteration];

  if (!frameForce) {
    return;
  }

  rocket.hasCrashed = collisionManager.isColliding({ rocket });
  rocket.hasReachedTarget = checkTargetCollision({ rocket, target });

  if (rocket.hasReachedTarget) {
    rocket.iterationNumberOnTarget = iteration;
  }

  const newVelocity = limitVector({ vector: addVectors(velocity, frameForce), max: 6 });
  const newPosition = addVectors(position, newVelocity);

  rocket.velocity = newVelocity;
  rocket.position = newPosition;
}

function createRocket({ position = createVector(), dna = createDna() }: { position?: Vector; dna?: Vector[] } = {}): Rocket {
  return {
    dna,
    position,
    velocity: createVector(),
    acceleration: createVector(),
    hasReachedTarget: false,
    hasCrashed: false,
    iterationNumberOnTarget: undefined,
  };
}

function crossoverRockets({ rocket1, rocket2 }: { rocket1: Rocket; rocket2: Rocket }): Rocket {
  const newDna = crossoverDna({ dna1: rocket1.dna, dna2: rocket2.dna });

  return createRocket({ dna: newDna });
}

function mutateRocket({ rocket }: { rocket: Rocket }) {
  const newDna = mutateDna({ dna: rocket.dna });

  return createRocket({ dna: newDna });
}
