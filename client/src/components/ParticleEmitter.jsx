import { memo } from 'react';
import './ParticleEmitter.css';

function ParticleEmitter({ particles }) {
  return (
    <div className="particle-layer">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.x,
            top: p.y,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            '--size': `${p.size}px`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default memo(ParticleEmitter);
