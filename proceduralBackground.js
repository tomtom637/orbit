import { canvas, ctx } from './canvas.js';
import { camera } from './camera.js';

export const starsCanvas = document.createElement('canvas');
const starsCtx = starsCanvas.getContext('2d');

starsCanvas.width = 600;
starsCanvas.height = 600;

const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;

const proceduralBackground = [];

function buildProceduralBackground() {
  for(let i = 0; i < 600; i++) {
    proceduralBackground.push({
      x: Math.random() * 600,
      y: Math.random() * 600,
      radius: Math.random() * 2,
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

const starsCanvasCoordonates = {x: canvas.width / 2, y: canvas.height / 2};

export function updateProceduralBackground() {
    let x = starsCanvasCoordonates.x + camera.x - starsCanvas.width / 2;
    let y = starsCanvasCoordonates.y + camera.y - starsCanvas.height / 2;

  ctx.drawImage(starsCanvas, x, y, 600, 600);
  
  if(x > 0) {
    ctx.drawImage(starsCanvas, x - starsCanvas.width, y, 600, 600);
  }
  if(x < canvas.width - starsCanvas.width) {
    ctx.drawImage(starsCanvas, x + starsCanvas.width, y, 600, 600); 
  }
  if(y > 0) {
    ctx.drawImage(starsCanvas, x, y - starsCanvas.height, 600, 600);
  }
  if(x < canvas.width - starsCanvas.width) {
    ctx.drawImage(starsCanvas, x, y + starsCanvas.height, 600, 600); 
  }
}