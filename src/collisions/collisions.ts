import { config } from '../config';
import { Rocket } from '../rockets/rockets.types';
import { createVector } from '../vectors/vectors.models';
import { isColliding } from './coliisions.models';
import { Obstacle } from './collision.types';

export { createCollisionManager };

function createCollisionManager({ canvas }: { canvas: HTMLCanvasElement }) {
  const obstacles: Obstacle[] = [];

  const { width, height } = canvas;

  return {
    resetObstacles() {
      obstacles.length = 0;
    },

    addObstacle({ obstacle }: { obstacle: Obstacle }) {
      obstacles.push(obstacle);
    },

    isColliding({ rocket }: { rocket: Rocket }): boolean {
      const isOutOfBounds = rocket.position.x < 0 || rocket.position.x > width || rocket.position.y < 0 || rocket.position.y > height;

      if (isOutOfBounds) {
        return true;
      }

      return obstacles.some((obstacle) => isColliding({ rocket, obstacle }));
    },

    renderObstacles({ ctx }: { ctx: CanvasRenderingContext2D }) {
      ctx.fillStyle = config.colors.obstacle;

      for (const obstacle of obstacles) {
        ctx.fillRect(obstacle.position.x, obstacle.position.y, obstacle.size.x, obstacle.size.y);
      }
    },

    setSimpleObstacle() {
      this.resetObstacles();

      const obstacleWidth = Math.min(width - 200, 400);

      this.addObstacle({
        obstacle: {
          position: createVector({ x: width / 2 - obstacleWidth / 2, y: height / 2 }),
          size: createVector({ x: obstacleWidth, y: 10 }),
        },
      });
    },

    setRandomObstacles() {
      this.resetObstacles();

      // Density is function of the canvas size
      const numberOfObstacles = Math.floor((width * height) / 5000);

      for (let i = 0; i < numberOfObstacles; i++) {
        this.addObstacle({
          obstacle: {
            position: createVector({ x: Math.random() * canvas.width, y: Math.random() * canvas.height }),
            size: createVector({ x: 10, y: 10 }),
          },
        });
      }
    },

    setConcaveObstacles() {
      this.resetObstacles();

      const obstacleWidth = Math.min(width - 100, 800);
      const y = height / 4;
      const borderHeight = Math.min(height / 2, 500);

      this.addObstacle({
        obstacle: {
          position: createVector({ x: width / 2 - obstacleWidth / 2, y }),
          size: createVector({ x: obstacleWidth, y: 10 }),
        },
      });

      this.addObstacle({
        obstacle: {
          position: createVector({ x: width / 2 - obstacleWidth / 2, y }),
          size: createVector({ x: 10, y: borderHeight }),
        },
      });

      this.addObstacle({
        obstacle: {
          position: createVector({ x: width / 2 + obstacleWidth / 2 - 10, y }),
          size: createVector({ x: 10, y: borderHeight }),
        },
      });
    },
  };
}
