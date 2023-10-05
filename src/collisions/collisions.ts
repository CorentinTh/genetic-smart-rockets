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
      obstacles.forEach((obstacle) => {
        ctx.fillStyle = config.colors.obstacle;
        ctx.fillRect(obstacle.position.x, obstacle.position.y, obstacle.size.x, obstacle.size.y);
      });
    },

    setSimpleObstacle() {
      this.resetObstacles();

      const obstacleWidth = Math.min(width - 100, 400);

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

      console.log('numberOfObstacles', numberOfObstacles);

      for (let i = 0; i < numberOfObstacles; i++) {
        this.addObstacle({
          obstacle: {
            position: createVector({ x: Math.random() * canvas.width, y: Math.random() * canvas.height }),
            size: createVector({ x: 10, y: 10 }),
          },
        });
      }
    },
  };
}
