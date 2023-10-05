import { Rocket } from '../rockets/rockets.types';
import { Obstacle } from './collision.types';

export { isColliding };

function isColliding({ rocket, obstacle }: { rocket: Rocket; obstacle: Obstacle }) {
  const { position: rocketPosition } = rocket;
  const { position: obstaclePosition, size: obstacleSize } = obstacle;

  const rocketX = rocketPosition.x;
  const rocketY = rocketPosition.y;
  const obstacleX = obstaclePosition.x;
  const obstacleY = obstaclePosition.y;
  const obstacleWidth = obstacleSize.x;
  const obstacleHeight = obstacleSize.y;

  return rocketX > obstacleX && rocketX < obstacleX + obstacleWidth && rocketY > obstacleY && rocketY < obstacleY + obstacleHeight;
}
