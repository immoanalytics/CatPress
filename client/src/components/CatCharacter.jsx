import { memo } from 'react';
import { motion } from 'framer-motion';
import { getCostumeForLevel } from '../data/costumes';
import './CatCharacter.css';

const COLOR_SCHEMES = {
  orange: { body: '#F4A460', belly: '#FFDAB9', earInner: '#FFB6C1', nose: '#FF8C69', tail: '#E8944D' },
  'purple-tint': { body: '#C9A0DC', belly: '#E8D5F0', earInner: '#DDA0DD', nose: '#D4789A', tail: '#B88BCF' },
  royal: { body: '#F4A460', belly: '#FFDAB9', earInner: '#FFB6C1', nose: '#FF8C69', tail: '#E8944D' },
  space: { body: '#E8E8E8', belly: '#F5F5F5', earInner: '#FFB6C1', nose: '#FF8C69', tail: '#D0D0D0' },
  rainbow: { body: 'url(#rainbowGrad)', belly: '#FFFFFF', earInner: '#FF6B9D', nose: '#FF6B9D', tail: 'url(#rainbowGrad)' },
  void: { body: '#1a1a2e', belly: '#16213e', earInner: '#2d1b4e', nose: '#4a2068', tail: '#1a1a2e' },
  gold: { body: '#FFD700', belly: '#FFF8DC', earInner: '#FFE44D', nose: '#FFA500', tail: '#E6C200' },
};

function CatCharacter({ totalLevel, isTapping }) {
  const costume = getCostumeForLevel(totalLevel);
  const colors = COLOR_SCHEMES[costume.colorScheme] || COLOR_SCHEMES.orange;

  return (
    <motion.div
      className={`cat-container cat-costume-${costume.id}`}
      animate={isTapping ? { scale: [1, 0.88, 1.06, 1] } : { scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <svg viewBox="0 0 200 280" className="cat-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="20%" stopColor="#FFA94D" />
            <stop offset="40%" stopColor="#FFD93D" />
            <stop offset="60%" stopColor="#6BCB77" />
            <stop offset="80%" stopColor="#4D96FF" />
            <stop offset="100%" stopColor="#9B59B6" />
          </linearGradient>
          <radialGradient id="helmetGlare" cx="35%" cy="35%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="goldShimmer">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Void cosmic aura */}
        {costume.id === 'void' && <VoidAura />}

        {/* Golden light rays */}
        {costume.id === 'golden' && <GoldenRays />}

        {/* Royal cape */}
        {costume.id === 'royal' && <RoyalCape />}

        {/* Tail */}
        <path
          d={`M 155 200 Q 180 170 175 140 Q 170 115 185 100`}
          fill="none"
          stroke={colors.tail}
          strokeWidth="12"
          strokeLinecap="round"
          className="cat-tail"
        />

        {/* Body */}
        <ellipse cx="100" cy="195" rx="55" ry="65" fill={colors.body} />

        {/* Belly */}
        <ellipse cx="100" cy="205" rx="35" ry="45" fill={colors.belly} />

        {/* Left ear */}
        <polygon points="55,95 40,35 80,75" fill={colors.body} />
        <polygon points="58,88 48,45 75,78" fill={colors.earInner} />

        {/* Right ear */}
        <polygon points="145,95 160,35 120,75" fill={colors.body} />
        <polygon points="142,88 152,45 125,78" fill={colors.earInner} />

        {/* Head */}
        <ellipse cx="100" cy="105" rx="50" ry="42" fill={colors.body} />

        {/* Eyes */}
        {costume.id === 'void' ? (
          <>
            <ellipse cx="80" cy="100" rx="8" ry="9" fill="#9B59B6" filter="url(#glow)" className="void-eye" />
            <ellipse cx="120" cy="100" rx="8" ry="9" fill="#9B59B6" filter="url(#glow)" className="void-eye" />
            <ellipse cx="80" cy="100" rx="4" ry="5" fill="#D4A5FF" />
            <ellipse cx="120" cy="100" rx="4" ry="5" fill="#D4A5FF" />
          </>
        ) : (
          <>
            {/* Eye whites */}
            <ellipse cx="80" cy="100" rx="12" ry="13" fill="white" />
            <ellipse cx="120" cy="100" rx="12" ry="13" fill="white" />
            {/* Pupils */}
            <ellipse cx="82" cy="101" rx="7" ry="8" fill="#2d2640" />
            <ellipse cx="122" cy="101" rx="7" ry="8" fill="#2d2640" />
            {/* Eye shine */}
            <circle cx="85" cy="97" r="3" fill="white" />
            <circle cx="125" cy="97" r="3" fill="white" />
          </>
        )}

        {/* Pirate eye patch */}
        {costume.id === 'pirate' && <PirateEyepatch />}

        {/* Wizard sparkle eyes */}
        {costume.id === 'wizard' && <WizardSparkleEyes />}

        {/* Nose */}
        <polygon points="100,110 95,117 105,117" fill={colors.nose} />

        {/* Mouth */}
        <path d="M 90 120 Q 95 127 100 120 Q 105 127 110 120" fill="none" stroke="#6b5b7b" strokeWidth="1.5" strokeLinecap="round" />

        {/* Whiskers */}
        <line x1="60" y1="110" x2="30" y2="105" stroke="#6b5b7b" strokeWidth="1.5" />
        <line x1="60" y1="115" x2="28" y2="118" stroke="#6b5b7b" strokeWidth="1.5" />
        <line x1="140" y1="110" x2="170" y2="105" stroke="#6b5b7b" strokeWidth="1.5" />
        <line x1="140" y1="115" x2="172" y2="118" stroke="#6b5b7b" strokeWidth="1.5" />

        {/* Paws */}
        <ellipse cx="75" cy="250" rx="18" ry="12" fill={colors.body} />
        <ellipse cx="125" cy="250" rx="18" ry="12" fill={colors.body} />
        {/* Paw pads */}
        <circle cx="70" cy="252" r="4" fill={colors.earInner} />
        <circle cx="80" cy="252" r="4" fill={colors.earInner} />
        <circle cx="120" cy="252" r="4" fill={colors.earInner} />
        <circle cx="130" cy="252" r="4" fill={colors.earInner} />

        {/* Stripes (for orange cats) */}
        {(costume.colorScheme === 'orange' || costume.colorScheme === 'royal') && (
          <g opacity="0.2">
            <path d="M 85 72 Q 100 65 115 72" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
            <path d="M 88 80 Q 100 74 112 80" fill="none" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 90 88 Q 100 83 110 88" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* Bow tie */}
        {(costume.id === 'bowtie' || costume.id === 'royal') && <BowTie />}

        {/* Wizard hat */}
        {costume.id === 'wizard' && <WizardHat />}

        {/* Pirate skull badge */}
        {costume.id === 'pirate' && <PirateSkull />}

        {/* Royal crown */}
        {(costume.id === 'royal' || costume.id === 'golden') && <Crown isGolden={costume.id === 'golden'} />}

        {/* Royal rosy cheeks */}
        {costume.id === 'royal' && (
          <>
            <circle cx="68" cy="115" r="8" fill="#FF6B9D" opacity="0.3" />
            <circle cx="132" cy="115" r="8" fill="#FF6B9D" opacity="0.3" />
          </>
        )}

        {/* Astronaut helmet */}
        {costume.id === 'astronaut' && <AstronautHelmet />}

        {/* Rainbow halo */}
        {costume.id === 'rainbow' && <RainbowHalo />}

        {/* Golden shimmer overlay */}
        {costume.id === 'golden' && (
          <ellipse cx="100" cy="195" rx="55" ry="65" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" filter="url(#goldShimmer)" className="shimmer" />
        )}
      </svg>
    </motion.div>
  );
}

function BowTie() {
  return (
    <g transform="translate(100, 142)">
      <polygon points="-12,-6 0,-2 0,2 -12,6" fill="#E74C3C" />
      <polygon points="12,-6 0,-2 0,2 12,6" fill="#E74C3C" />
      <circle cx="0" cy="0" r="3" fill="#C0392B" />
    </g>
  );
}

function WizardHat() {
  return (
    <g>
      <polygon points="100,5 65,70 135,70" fill="#6C3483" />
      <polygon points="100,5 68,68 132,68" fill="#7D3C98" />
      <rect x="58" y="65" width="84" height="10" rx="5" fill="#6C3483" />
      {/* Star on hat */}
      <polygon
        points="100,20 103,30 113,30 105,36 108,46 100,40 92,46 95,36 87,30 97,30"
        fill="#F1C40F"
        className="star-twinkle"
      />
    </g>
  );
}

function WizardSparkleEyes() {
  return (
    <>
      <circle cx="80" cy="97" r="2" fill="#F1C40F" className="star-twinkle" />
      <circle cx="120" cy="97" r="2" fill="#F1C40F" className="star-twinkle" />
    </>
  );
}

function PirateEyepatch() {
  return (
    <g>
      <ellipse cx="80" cy="100" rx="14" ry="15" fill="#1a1a1a" />
      <line x1="80" y1="86" x2="120" y2="75" stroke="#1a1a1a" strokeWidth="2.5" />
    </g>
  );
}

function PirateSkull() {
  return (
    <g transform="translate(100, 195)">
      <circle cx="0" cy="0" r="10" fill="white" opacity="0.8" />
      <circle cx="-3" cy="-2" r="2.5" fill="#1a1a1a" />
      <circle cx="3" cy="-2" r="2.5" fill="#1a1a1a" />
      <rect x="-4" y="4" width="8" height="2" rx="1" fill="#1a1a1a" />
      <line x1="-8" y1="10" x2="8" y2="10" stroke="white" strokeWidth="2.5" opacity="0.8" />
    </g>
  );
}

function Crown({ isGolden }) {
  const color = isGolden ? '#FFD700' : '#FFD700';
  const gemColor = isGolden ? '#00D4FF' : '#E74C3C';
  return (
    <g>
      <polygon
        points="68,50 75,70 85,55 100,72 115,55 125,70 132,50 135,75 65,75"
        fill={color}
        filter={isGolden ? 'url(#goldShimmer)' : undefined}
      />
      <circle cx="100" cy="62" r="4" fill={gemColor} />
      {isGolden && (
        <>
          <circle cx="85" cy="66" r="2.5" fill="#FF69B4" />
          <circle cx="115" cy="66" r="2.5" fill="#FF69B4" />
        </>
      )}
    </g>
  );
}

function RoyalCape() {
  return (
    <g>
      <path
        d="M 55 145 Q 45 180 40 240 L 55 245 Q 60 200 65 165 Z"
        fill="#C0392B"
        opacity="0.9"
      />
      <path
        d="M 145 145 Q 155 180 160 240 L 145 245 Q 140 200 135 165 Z"
        fill="#C0392B"
        opacity="0.9"
      />
      {/* Cape lining */}
      <path
        d="M 55 145 Q 47 175 42 235 L 50 238 Q 55 195 60 160 Z"
        fill="#E8D5F0"
        opacity="0.4"
      />
      <path
        d="M 145 145 Q 153 175 158 235 L 150 238 Q 145 195 140 160 Z"
        fill="#E8D5F0"
        opacity="0.4"
      />
    </g>
  );
}

function AstronautHelmet() {
  return (
    <g>
      {/* Helmet outer */}
      <ellipse cx="100" cy="100" rx="58" ry="50" fill="none" stroke="#B0B0B0" strokeWidth="4" />
      <ellipse cx="100" cy="100" rx="56" ry="48" fill="rgba(200,230,255,0.15)" />
      {/* Visor glare */}
      <ellipse cx="85" cy="90" rx="20" ry="15" fill="url(#helmetGlare)" />
      {/* Antenna */}
      <line x1="100" y1="52" x2="100" y2="35" stroke="#B0B0B0" strokeWidth="2" />
      <circle cx="100" cy="33" r="4" fill="#E74C3C" className="antenna-blink" />
    </g>
  );
}

function RainbowHalo() {
  return (
    <g>
      <ellipse cx="100" cy="42" rx="30" ry="8" fill="none" stroke="url(#rainbowGrad)" strokeWidth="4" opacity="0.8" className="halo-float" />
    </g>
  );
}

function VoidAura() {
  return (
    <g className="void-aura">
      <circle cx="60" cy="120" r="3" fill="#9B59B6" opacity="0.4" className="void-particle vp1" />
      <circle cx="145" cy="150" r="2" fill="#8E44AD" opacity="0.5" className="void-particle vp2" />
      <circle cx="50" cy="200" r="2.5" fill="#A569BD" opacity="0.3" className="void-particle vp3" />
      <circle cx="155" cy="100" r="2" fill="#BB8FCE" opacity="0.4" className="void-particle vp4" />
      <circle cx="75" cy="240" r="1.5" fill="#9B59B6" opacity="0.5" className="void-particle vp5" />
      <circle cx="130" cy="230" r="2" fill="#8E44AD" opacity="0.3" className="void-particle vp6" />
      {/* Outer aura glow */}
      <ellipse cx="100" cy="170" rx="80" ry="100" fill="none" stroke="#9B59B6" strokeWidth="1" opacity="0.15" filter="url(#glow)" />
    </g>
  );
}

function GoldenRays() {
  return (
    <g className="golden-rays" opacity="0.2">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1="100"
          y1="170"
          x2={100 + Math.cos((angle * Math.PI) / 180) * 120}
          y2={170 + Math.sin((angle * Math.PI) / 180) * 120}
          stroke="#FFD700"
          strokeWidth="2"
          className="ray"
        />
      ))}
    </g>
  );
}

export default memo(CatCharacter, (prev, next) =>
  prev.totalLevel === next.totalLevel && prev.isTapping === next.isTapping
);
