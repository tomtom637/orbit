import { canvas } from './canvas.js';
import { sun } from './app.js';

export const camera = {};

export function updateCamera() {
	camera.x = canvas.width / 2 - sun.x;
	camera.y = canvas.height / 2 - sun.y;
}