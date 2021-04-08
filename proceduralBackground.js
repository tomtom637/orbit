import { canvas, ctx } from './canvas.js';
import { camera } from './camera.js'

const starsCanvas = document.createElement('canvas');
const starsCtx = starsCanvas.getContext('2d');

starsCanvas.width = canvas.clientWidth * 1.5;
starsCanvas.height = canvas.clientHeight * 1.5;

const proceduralBackground = [];

function buildProceduralBackground() {
  for(let i = 0; i < 10000; i++) {
    proceduralBackground.push({
      x: (Math.random() * canvas.width * 3) - (Math.random() * canvas.width * 3),
      y: (Math.random() * canvas.height * 3) - (Math.random() * canvas.width * 3),
      radius: Math.random() * 3,
      color: `rgba(
                ${~~(Math.random() * 105) + 150},
                ${~~(Math.random() * 105) + 150},
                ${~~(Math.random() * 105) + 150},
                ${Math.random() * 0.4}
              )`
    });
  }
}
function drawProceduralBackground() {
  for(let dot of proceduralBackground) {
      starsCtx.beginPath();
      starsCtx.strokeStyle = dot.color;
      starsCtx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      starsCtx.stroke();
  }
}

buildProceduralBackground();
drawProceduralBackground();

export function updateProceduralBackground() {
  ctx.drawImage(starsCanvas, camera.x, camera.y, canvas.width, canvas.height);
}