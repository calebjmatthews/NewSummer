import React, { Component } from 'react';

import { utils } from '../models/utils';

export default class ParticleEmitter extends Component {
  props: ParticleEmitterProps;
  state: ParticleEmitterState;
  interval: NodeJS.Timeout;

  constructor(props: ParticleEmitterProps) {
    super(props);

    this.state = { particleMap: {} };
  }

  componentDidMount() {
    this.initialBurst();
    this.interval = setInterval(() => this.emit(),
      Math.floor(Math.random() * 25 + 238));
  }

  componentWillUnmount() {
    Object.keys(this.state.particleMap).map((particleId) => {
      let particle: Particle = this.state.particleMap[particleId];
      clearTimeout(particle.ageTimeout);
      clearTimeout(particle.animationTimeout);
    });
    this.setState({ particleMap: {} });
    clearInterval(this.interval);
  }

  createParticles(type: string, count: number): Particle[] {
    let particles: Particle[] = [];

    const baseStyles = {
      'sparkle': {
        position: 'relative',
        width: '4px',
        height: '4px',
        background: '#fff',
        boxShadow: '0 0 1px 1px #fff',
        transform: 'translate(0px, 0px)',
        opacity: '1',
        transition: 'transform 1s ease-out, opacity 1s ease-out'
      }
    }

    switch(type) {
      case ('sparkle'):
        utils.range(count).map(() => {
          let particleId = Math.floor(Math.random() * 1000000);
          let startingStyle: any = Object.assign({}, baseStyles[type]);
          let startingPoint = [
            Math.floor(Math.random() * this.props.width),
            Math.floor(Math.random() * this.props.height)
          ];
          startingStyle.left = (startingPoint[0] + 'px');
          startingStyle.top = (startingPoint[1] + 'px');

          let newParticle = new Particle({
            id: particleId,
            type: type,
            style: startingStyle,
            animationTimeout: setTimeout(() => {
              let newStyle = Object.assign({}, startingStyle);
              newStyle.opacity = '0';
              let endingPoint: number[] = [];
              if (this.props.direction == 'up' || this.props.direction == 'down') {
                endingPoint[0] = Math.floor(Math.random() * 300 - 150);
              }
              if (this.props.direction == 'up') {
                endingPoint[1] = Math.floor(Math.random() * 150 - 150);
              }
              else if (this.props.direction == 'down') {
                endingPoint[1] = Math.floor(Math.random() * 150);
              }
              newStyle.transform =  ( 'translate('
                + endingPoint[0] + 'px, ' + endingPoint[1] + 'px)');
              this.setStyle(particleId, newStyle);
            }, 10),
            ageTimeout: setTimeout(() => {
              this.ageOut(particleId);
            }, 1000)
          });
          particles.push(newParticle);
        });
        break;
    }
    return particles;
  }

  initialBurst() {
    let particleMap: {[id: number] : Particle} = {};
    let particles = this.createParticles(this.props.type, 10);
    particles.map((particle) => {
      particleMap[particle.id] = particle;
    })
    this.setState({ particleMap: particleMap });
  }

  emit() {
    let particleMap = this.state.particleMap;
    let particles = this.createParticles(this.props.type, 1);
    particles.map((particle) => {
      particleMap[particle.id] = particle;
    })
    this.setState({ particleMap: particleMap });
  }

  setStyle(particleId: number, style: any) {
    let particleMap = this.state.particleMap;
    particleMap[particleId].style = style;
    this.setState({ particleMap: particleMap });
  }

  ageOut(particleId: number) {
    let particleMap = this.state.particleMap;
    delete particleMap[particleId];
    this.setState({ particleMap: particleMap });
  }

  render() {
    let style = {
      'top': this.props.top,
      'left': this.props.left,
      'width': this.props.width,
      'height': this.props.height
    }
    return (
      <div className="particle-emitter" style={style}>
        {Object.keys(this.state.particleMap).map((particleId) => {
          let particle = this.state.particleMap[particleId];
          return (
            <div key={particleId} className={particle.type}
              style={particle.style}></div>
          );
        })}
      </div>
    );
  }
}

interface ParticleEmitterProps {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  type: string;
  direction?: string;
}

interface ParticleEmitterState {
  particleMap: {[id: number] : Particle};
}

class Particle {
  id: number;
  type: string;
  style: any;
  animationTimeout: NodeJS.Timeout;
  ageTimeout: NodeJS.Timeout;

  constructor(particle: Particle) {
    Object.assign(this, particle);
  }
}
