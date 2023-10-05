import { config } from '../config';
import { Target } from './target.types';

export { renderTarget };

function renderTarget({ target, ctx }: { target: Target; ctx: CanvasRenderingContext2D }) {
  const { position, radius } = target;
  ctx.beginPath();
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = config.colors.target;
  ctx.fill();
}
