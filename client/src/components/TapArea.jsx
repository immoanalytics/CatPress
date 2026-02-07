import { useState, useCallback, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import CatCharacter from './CatCharacter';
import FloatingNumber from './FloatingNumber';
import ParticleEmitter from './ParticleEmitter';
import './TapArea.css';

const PARTICLE_COLORS = ['#FFD700', '#FF6B9D', '#4ECDC4', '#A855F7', '#45B7D1', '#FFA94D'];
const MAX_FLOATERS = 20;
const MAX_PARTICLES = 50;

export default function TapArea({ soundEngine }) {
  const tap = useGameStore((s) => s.tap);
  const totalLevel = useGameStore((s) => s.autoClickerLevel + s.multiTapLevel + s.luckyDoubleLevel);

  const [isTapping, setIsTapping] = useState(false);
  const [floaters, setFloaters] = useState([]);
  const [particles, setParticles] = useState([]);
  const idRef = useRef(0);
  const tapTimeoutRef = useRef(null);
  const areaRef = useRef(null);

  const handleTap = useCallback((e) => {
    e.preventDefault();

    // Get tap position relative to the tap area
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;

    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Execute game tap
    const result = tap();

    // Play meow sound
    soundEngine?.playMeow();

    // Cat bounce
    setIsTapping(true);
    clearTimeout(tapTimeoutRef.current);
    tapTimeoutRef.current = setTimeout(() => setIsTapping(false), 150);

    // Add floating number
    const floatId = ++idRef.current;
    const jitterX = (Math.random() - 0.5) * 40;
    setFloaters((prev) => {
      const next = [...prev, { id: floatId, value: result.value, x: x + jitterX, y: y - 20, isLucky: result.isLucky }];
      return next.length > MAX_FLOATERS ? next.slice(-MAX_FLOATERS) : next;
    });

    // Clean up floater after animation
    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== floatId));
    }, 850);

    // Spawn particles
    const count = result.isLucky ? 10 : 6;
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
      const dist = 40 + Math.random() * 60;
      newParticles.push({
        id: ++idRef.current,
        x,
        y,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 20,
        size: 4 + Math.random() * 5,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        duration: 0.4 + Math.random() * 0.3,
      });
    }

    setParticles((prev) => {
      const next = [...prev, ...newParticles];
      return next.length > MAX_PARTICLES ? next.slice(-MAX_PARTICLES) : next;
    });

    // Clean up particles
    setTimeout(() => {
      const ids = new Set(newParticles.map((p) => p.id));
      setParticles((prev) => prev.filter((p) => !ids.has(p.id)));
    }, 800);
  }, [tap, soundEngine]);

  return (
    <div
      ref={areaRef}
      className="tap-area"
      onTouchStart={handleTap}
      onMouseDown={handleTap}
    >
      <CatCharacter totalLevel={totalLevel} isTapping={isTapping} />
      {floaters.map((f) => (
        <FloatingNumber key={f.id} {...f} />
      ))}
      <ParticleEmitter particles={particles} />
    </div>
  );
}
