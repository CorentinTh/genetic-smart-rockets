import '@unocss/reset/normalize.css';
import 'virtual:uno.css';
import './style.css';

import { setupGameEngine } from './game';

function setupRenderingContext({ canvasId = 'canvas' }: { canvasId?: string } = {}) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

  if (!canvas) {
    throw new Error(`Canvas with id "${canvasId}" not found`);
  }

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get 2d context from canvas');
  }

  return {
    canvas,
    ctx,
  };
}

function main() {
  const { ctx } = setupRenderingContext();

  const { start } = setupGameEngine({ ctx });

  start();
}

main();
