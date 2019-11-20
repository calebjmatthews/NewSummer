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
    this.interval = setInterval(() => this.emit(), 100);
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
        top: '0px',
        left: '0px',
        width: '1px',
        height: '1px',
        background: '#fff',
        boxShadow: '0 0 3px 3px #fff',
        transform: 'translate(0px, 0px)',
        opacity: '1',
        transition: 'transform 1s ease-out, opacity 1s ease-out'
      }
    }

    switch(type) {
      case ('sparkle'):
        utils.range(count).map(() => {
          let particleId = Math.floor(Math.random() * 1000000);
          let newParticle = new Particle({
            id: particleId,
            type: type,
            style: baseStyles[type],
            animationTimeout: setTimeout(() => {
              let newStyle = Object.assign({}, baseStyles[type]);
              newStyle.opacity = '0';
              newStyle.transform =  ( 'translate('
                + Math.floor(Math.random() * 600 - 300) + 'px, '
                + Math.floor(Math.random() * 600 - 300) + 'px)');
              this.setStyle(particleId, newStyle);
            }, 10),
            ageTimeout: setTimeout(() => {
              this.ageOut(particleId)
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
    return (
      <div className="particle-emitter">
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
  width?: string;
  height?: string;
  type: string;
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
