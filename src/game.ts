import { CollisionManager } from './collisions/collision.types';
import { createCollisionManager } from './collisions/collisions';
import { config } from './config';
import { createGeneration, createNewGeneration } from './generation/generation';
import { setupInterfaceManager } from './interface/interface';
import { drawRocket, updateRocket } from './rockets/rocket';
import { Rocket } from './rockets/rockets.types';
import { renderTarget } from './target/target';
import { Target } from './target/target.types';
import { createVector } from './vectors/vectors.models';

export { setupGameEngine };

export type GameState = {
  generation: {
    generationNumber: number;
    iteration: number;
    rockets: Rocket[];
  };
  target: Target;
};

function updateLoop({
  gameState,
  collisionManager,
  width,
  height,
  interfaceManager,
}: {
  gameState: GameState;
  collisionManager: CollisionManager;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  interfaceManager: ReturnType<typeof setupInterfaceManager>;
}) {
  const { target, generation } = gameState;
  const { rockets, iteration } = generation;

  rockets.forEach((rocket) => updateRocket({ rocket, target, iteration, collisionManager }));

  gameState.generation.iteration++;
  interfaceManager.setIteration({ iteration: gameState.generation.iteration });

  if (gameState.generation.iteration >= config.lifespan) {
    gameState.generation = createNewGeneration({ generation, target, initialPosition: createVector({ x: width / 2, y: height - 100 }), interfaceManager });
    interfaceManager.setGeneration({ generationNumber: gameState.generation.generationNumber + 1 });
  }
}

function setupGameEngine({ ctx, fps = 60 }: { ctx: CanvasRenderingContext2D; fps?: number }) {
  const { canvas } = ctx;
  const { width, height } = canvas;

  const collisionManager = createCollisionManager({ canvas });
  const interfaceManager = setupInterfaceManager({ collisionManager });

  const gameState: GameState = {
    generation: createGeneration({ initialPosition: createVector({ x: width / 2, y: height - 50 }) }),
    target: {
      position: createVector({ x: width / 2, y: 100 }),
      radius: 10,
    },
  };

  function renderLoop() {
    const { canvas } = ctx;
    const { width, height } = canvas;
    const { target, generation } = gameState;
    const { rockets } = generation;

    ctx.fillStyle = config.colors.background;
    ctx.fillRect(0, 0, width, height);

    collisionManager.renderObstacles({ ctx });

    renderTarget({ target, ctx });

    ctx.fillStyle = config.colors.rocket;
    // rockets.forEach((rocket) => drawRocket({ rocket, ctx }));
    for (const rocket of rockets) {
      drawRocket({ rocket, ctx });
    }

    requestAnimationFrame(renderLoop);
  }

  return {
    start() {
      setInterval(() => updateLoop({ gameState, collisionManager, canvas, interfaceManager, width, height }), 1000 / fps);
      requestAnimationFrame(renderLoop);
    },
  };
}
