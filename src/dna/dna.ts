import { config } from '../config';
import { createRandomVector } from '../vectors/vectors.models';
import { Vector } from '../vectors/vectors.types';

export { createDna, crossoverDna, mutateDna };

function createDna({ dnaLength = config.lifespan }: { dnaLength?: number } = {}) {
  return Array.from({ length: dnaLength }, createRandomVector);
}

function crossoverDna({ dna1, dna2, dnaLength = config.lifespan }: { dna1: Vector[]; dna2: Vector[]; dnaLength?: number }) {
  return Array.from({ length: dnaLength }, (_, index) => {
    const parent = Math.random() < 0.5 ? dna1 : dna2;

    return parent[index] ?? createRandomVector();
  });
}

function mutateDna({ dna, mutationRate = config.mutationRate }: { dna: Vector[]; mutationRate?: number }) {
  return dna.map((gene) => (Math.random() < mutationRate ? createRandomVector() : gene));
}
