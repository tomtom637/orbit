import { canvas, ctx } from './canvas.js';
import { planetInstances, Planet } from './Planet.js';
import { camera, updateCamera } from './camera.js';

window.onresize = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

export const sun = new Planet({
  x: canvas.width / 2,
  y: canvas.height / 2,
  xs: 0,
  ys: 0,
  radius: 15,
  mass: 500,
  color: '#fff'
});

function drawBackground() {
  ctx.fillStyle = '#262626';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate(timestamp) {
  drawBackground();
  updateCamera();
  for(let planetInstance of planetInstances) { planetInstance.update(); }
  for(let planetInstance of planetInstances) { planetInstance.detectCollision(); }
  for(let planetInstance of planetInstances) { planetInstance.draw(); }

  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

window.addEventListener('click', addPlanet);

function addPlanet(e) {
  planetInstances[planetInstances.length] = new Planet({
    x: e.clientX - camera.x,
    y: e.clientY - camera.y,
    xs: 2,
    ys: 0,
    radius: 5,
    mass: 0.5,
    color: '#2af'
  });
}