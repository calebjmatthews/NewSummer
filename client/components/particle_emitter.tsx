import React, { Component } from 'react';

import { utils } from '../models/utils';

export default class ParticleEmitter extends Component {
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  particleMap: {[id: number] : Particle} = {};
  particleCreationInterval: number = 100;
  particleCreatedLast: number = 0;

  componentDidMount() {
    window.requestAnimationFrame((timestamp) => {
      this.createParticles(200, timestamp);
      this.manageDrawing(timestamp)
    });
  }

  manageDrawing(timestamp: number) {
    let canvas: any = document.getElementById('particle-canvas');
    if (canvas != null) {
      if (this.particleCreatedLast < (timestamp - this.particleCreationInterval)) {
        this.createParticle(timestamp);
      }

      this.moveParticles(timestamp);

      let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      Object.keys(this.particleMap).map((id, index) => {
        let particle = this.particleMap[id];
        ctx.fillRect(
          (particle.x - particle.width),
          (particle.y - particle.height),
          particle.width,
          particle.height
        )
      });

      requestAnimationFrame((timestamp) => {
        this.manageDrawing(timestamp)
      });
    }
  }

  createParticles(count: number, timestamp: number) {
    utils.range(count).map(() => {
      this.createParticle(timestamp);
    });
  }

  createParticle(timestamp: number) {
    let velocityX = (((this.width / 2) / 1000) * Math.random())
      * (Math.random()*0.5 + 0.5);
    let velocityY = (((this.width / 2) / 1000) - velocityX)
      * (Math.random()*0.5 + 0.5);
    let diceRoll = Math.random();
    if (diceRoll < 0.5 && diceRoll >= 0.25) {
      velocityX *= -1;
    }
    else if (diceRoll < 0.75 && diceRoll >= 0.5) {
      velocityY *= -1;
    }
    else if (diceRoll >= 0.75) {
      velocityX *= -1;
      velocityY *= -1;
    }
    let newParticle = new Particle({
      id: Math.floor(Math.random() * 1000000),
      type: 'sparkle',
      startingTime: timestamp,
      x: (this.width / 2),
      y: (this.height / 2),
      width: 4,
      height: 4,
      velocityX: velocityX,
      velocityY: velocityY
    });
    this.particleMap[newParticle.id] = newParticle;
  }

  moveParticles(timestamp: number) {
    Object.keys(this.particleMap).map((id, index) => {
      let particle = this.particleMap[id];
      let timeElapsed = timestamp - particle.startingTime;
      let newX = (this.width / 2) + (particle.velocityX * (timeElapsed));
      let newY = (this.height / 2) + (particle.velocityY * (timeElapsed));

      if (newX < (0 - (particle.width / 2))
        || newX > (this.width + (particle.width / 2))
        || newY < (0 - (particle.height / 2))
        || newY > (this.height + (particle.height / 2))) {
        this.destroyParticle(particle);
      }
      else {
        particle.x = newX;
        particle.y = newY;
      }
    });
  }

  destroyParticle(particle: Particle) {
    delete this.particleMap[particle.id];
  }

  render() {
    return (
      <canvas id="particle-canvas" width={this.width} height={this.height}></canvas>
    );
  }
}

class Particle {
  id: number;
  type: string;
  startingTime: number;
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;

  constructor(particle: Particle) {
    Object.assign(this, particle);
  }
}
