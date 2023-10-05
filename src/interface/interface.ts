import { CollisionManager } from '../collisions/collision.types';
import { config } from '../config';

export { setupInterfaceManager };

function bindTo({ id, onChange, initialValue }: { id: string; onChange?: (value: string) => void; initialValue: string | number }) {
  const input = document.getElementById(id) as HTMLInputElement;
  const storedValue = localStorage.getItem(id);
  const baseValue = storedValue ?? String(initialValue);

  if (!input) {
    throw new Error(`Could not find input with id "${id}"`);
  }

  input.value = baseValue;

  if (onChange) {
    input.addEventListener('change', (event) => {
      const { value } = event.target as HTMLInputElement;

      onChange(value);
      localStorage.setItem(id, value);
    });

    onChange(baseValue);
  }

  return {
    set: (value: string | number) => {
      input.value = String(value);
    },
  };
}

function bindToSelect({ id, onChange, initialValue }: { id: string; onChange: (value: string) => void; initialValue: string }) {
  const select = document.getElementById(id) as HTMLSelectElement;
  const storedValue = localStorage.getItem(id);
  const value = storedValue ?? initialValue;

  if (!select) {
    throw new Error(`Could not find select with id "${id}"`);
  }

  select.value = value;

  select.addEventListener('change', (event) => {
    const { value } = event.target as HTMLSelectElement;

    onChange(value);
    localStorage.setItem(id, value);
  });

  onChange(value);
}

function setupInterfaceManager({ collisionManager }: { collisionManager: CollisionManager }) {
  bindTo({
    id: 'mutationRate',
    onChange: (value) => (config.mutationRate = Number(value)),
    initialValue: config.mutationRate,
  });

  bindTo({
    id: 'populationSize',
    onChange: (value) => (config.populationSize = Number(value)),
    initialValue: config.populationSize,
  });

  bindTo({
    id: 'lifespan',
    onChange: (value) => (config.lifespan = Number(value)),
    initialValue: config.lifespan,
  });

  const generationNumberBind = bindTo({
    id: 'generationCount',
    initialValue: 0,
  });

  const iterationNumberBind = bindTo({
    id: 'iterationCount',
    initialValue: 0,
  });

  const bestFitnessBind = bindTo({
    id: 'bestFitness',
    initialValue: 0,
  });

  bindToSelect({
    id: 'obstacle',
    initialValue: 'simple',
    onChange: (value) => {
      if (value === 'none') {
        collisionManager.resetObstacles();
        return;
      }

      if (value === 'simple') {
        collisionManager.setSimpleObstacle();
        return;
      }

      if (value === 'random') {
        collisionManager.setRandomObstacles();
        return;
      }
    },
  });

  return {
    setGeneration: ({ generationNumber }: { generationNumber: number }) => {
      generationNumberBind.set(generationNumber);
    },
    setIteration: ({ iteration }: { iteration: number }) => {
      iterationNumberBind.set(iteration);
    },
    setBestFitness: ({ bestFitness }: { bestFitness: number }) => {
      bestFitnessBind.set(bestFitness);
    },
  };
}
