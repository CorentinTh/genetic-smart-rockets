import { config } from '../config';
import { InterfaceManager } from '../interface/interface.type';
import { createRocket, crossoverRockets, mutateRocket } from '../rockets/rocket';
import { computeFitness, computeNormalizedFitness } from '../rockets/rockets.models';
import { Rocket } from '../rockets/rockets.types';
import { Target } from '../target/target.types';
import { getRandomFromArray } from '../utils/random.utils';

export { createGeneration, createNewGeneration };

function createGeneration({ populationSize = config.populationSize, initialPosition }: { populationSize?: number; initialPosition: Target['position'] }) {
  const rockets = Array.from({ length: populationSize }, () => createRocket({ position: initialPosition }));

  return {
    rockets,
    generationNumber: 0,
    iteration: 0,
  };
}

function createMatingPool({ rockets, target, interfaceManager }: { rockets: Rocket[]; target: Target; interfaceManager: InterfaceManager }) {
  const maxFitness = rockets.reduce((max, rocket) => Math.max(max, computeFitness({ rocket, target })), 0);
  const fastestClearTime = Math.min(...(rockets.filter((rocket) => rocket.hasReachedTarget).map((rocket) => rocket.iterationNumberOnTarget) as number[]));

  interfaceManager.setBestFitness({ bestFitness: maxFitness });

  const matingPool = rockets.reduce((pool, rocket) => {
    const fitness = computeNormalizedFitness({ rocket, target, maxFitness, isFastestRocket: rocket.iterationNumberOnTarget === fastestClearTime });

    return [...pool, ...Array.from({ length: fitness }, () => rocket)];
  }, [] as Rocket[]);

  console.log(matingPool.length);

  return matingPool;
}

function getParents({ matingPool }: { matingPool: Rocket[] }) {
  const parentA = getRandomFromArray(matingPool);
  const parentB = getRandomFromArray(matingPool);

  return { parentA, parentB };
}

function createNewGeneration({
  generation,
  target,
  initialPosition,
  interfaceManager,
}: {
  generation: ReturnType<typeof createGeneration>;
  target: Target;
  initialPosition: Target['position'];
  interfaceManager: InterfaceManager;
}) {
  const { rockets, generationNumber } = generation;

  const matingPool = createMatingPool({ rockets, target, interfaceManager });

  // const { rockets: newGeneration } = createGeneration({ initialPosition });

  const newGeneration = Array.from({ length: config.populationSize }, () => {
    const { parentA, parentB } = getParents({ matingPool });

    const child = crossoverRockets({ rocket1: parentA, rocket2: parentB });
    const mutatedChild = mutateRocket({ rocket: child });
    mutatedChild.position = initialPosition;

    return mutatedChild;
  });

  return {
    rockets: newGeneration,
    generationNumber: generationNumber + 1,
    iteration: 0,
  };
}
