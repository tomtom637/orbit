import { ctx } from './canvas.js';
import { camera } from './camera.js';

export const planetInstances = [];

export class Planet {
	constructor({
		x=200,
		y=200,
		xs=7,
		ys=0,
		radius=5,
		mass,
		color='#fff'
	}) {
		this.x = x;
		this.y = y;
		this.xs = xs;
		this.ys = ys;
		this.radius = radius;
		this.mass = mass;
		this.color = color;
		this.init();
	}
	init() {
		planetInstances.push(this);
	}
	calcDistance(planetInstance) {
		const xDistance = planetInstance.x - this.x;
		const yDistance = planetInstance.y - this.y;
		return Math.sqrt(xDistance*xDistance + yDistance*yDistance);
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.fillStyle = '#262626';
		ctx.lineWidth = 3;
		ctx.arc(
				this.x + camera.x,
				this.y + camera.y,
				this.radius,
				0,
				2 * Math.PI
			);
		ctx.stroke();
		ctx.fill();
	}
	update() {
		for(let planetInstance of planetInstances) {
			const r = this.calcDistance(planetInstance);
			const normalizedVectorX = (planetInstance.x - this.x) / r;
  	 		const normalizedVectorY = (planetInstance.y - this.y) / r;
  	 		if(r !== 0) {
  	 			const force = this.mass * planetInstance.mass / (r*r);
  	 			const acceleration = force / this.mass;
  	 			const ax = acceleration * normalizedVectorX;
	  	 		const ay = acceleration * normalizedVectorY;

	  	 		this.xs += ax;
	  	 		this.ys += ay;
  	 		}
		}
		this.x += this.xs;
 		this.y += this.ys;
	}
	detectCollision() {
		for(let planetInstance of planetInstances) {
			if(planetInstance === this) return;
			const r = this.calcDistance(planetInstance);
			if(r <= this.radius + planetInstance.radius) {
				
				planetInstance.xs = (this.xs * this.mass + planetInstance.xs * planetInstance.mass) / (this.mass + planetInstance.mass);
				planetInstance.ys = (this.ys * this.mass + planetInstance.ys * planetInstance.mass) / (this.mass + planetInstance.mass);
				planetInstance.radius = (this.radius * 0.2) + planetInstance.radius;
				planetInstance.mass = this.mass + planetInstance.mass;

				planetInstances.splice(planetInstances.indexOf(this), 1);
			}
		}
	}
}