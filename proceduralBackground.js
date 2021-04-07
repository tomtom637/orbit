import { canvas, ctx } from './canvas.js';
import { camera } from './camera.js'

const proceduralBackground = [];

export function buildProceduralBackground() {
  for(let i = 0; i < 1000; i++) {
    proceduralBackground.push({
      x: (Math.random() * canvas.width * 3) - (Math.random() * canvas.width * 3),
      y: (Math.random() * canvas.height * 3) - (Math.random() * canvas.width * 3),
      radius: Math.random(),
      color: `rgba(
                ${~~(Math.random() * 75) + 180},
                ${~~(Math.random() * 75) + 180},
                ${~~(Math.random() * 75) + 180},
                ${Math.random() * 0.4}
              )`
    });
  }
}
export function drawProceduralBackground() {
  for(let dot of proceduralBackground) {
      ctx.beginPath();
      ctx.strokeStyle = dot.color;
      ctx.arc(dot.x + camera.x, dot.y + camera.y, dot.radius, 0, Math.PI * 2);
      ctx.stroke();
  }
}