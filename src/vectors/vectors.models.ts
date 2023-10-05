import type { Vector } from './vectors.types';

export { addVectors, computeEuclideanDistance, createRandomVector, createVector, limitVector };

function createVector({ x = 0, y = 0 }: { x?: number; y?: number } = {}): Vector {
  return { x, y };
}

function createRandomVector({ max = 1 }: { max?: number } = {}): Vector {
  return createVector({ x: Math.random() * max - max / 2, y: Math.random() * max - max / 2 });
}

function addVectors(...vectors: Vector[]): Vector {
  return vectors.reduce((acc, vector) => ({ x: acc.x + vector.x, y: acc.y + vector.y }), createVector());
}

function limitVector({ vector, max }: { vector: Vector; max: number }): Vector {
  const { x, y } = vector;

  // Using squared magnitude to avoid expensive square root calculation
  const magnitudeSquared = x ** 2 + y ** 2;
  const maxSquared = max ** 2;

  if (magnitudeSquared > maxSquared) {
    const magnitude = Math.sqrt(magnitudeSquared);

    return createVector({ x: (x / magnitude) * max, y: (y / magnitude) * max });
  }

  return vector;
}

function computeEuclideanDistance({ vector1, vector2 }: { vector1: Vector; vector2: Vector }): number {
  const { x: x1, y: y1 } = vector1;
  const { x: x2, y: y2 } = vector2;

  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
