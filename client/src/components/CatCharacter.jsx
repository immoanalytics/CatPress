import { memo } from 'react';
import { motion } from 'framer-motion';
import { getCostumeForLevel } from '../data/costumes';
import './CatCharacter.css';

function CatCharacter({ totalLevel, isTapping }) {
  const costume = getCostumeForLevel(totalLevel);

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
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
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
          <filter id="voidMist">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <CatBody costumeId={costume.id} />
      </svg>
    </motion.div>
  );
}

/* ======================== DISPATCHER ======================== */

function CatBody({ costumeId }) {
  switch (costumeId) {
    case 'naked': return <NakedCat />;
    case 'bowtie': return <BowTieCat />;
    case 'wizard': return <WizardCat />;
    case 'pirate': return <PirateCat />;
    case 'royal': return <RoyalCat />;
    case 'astronaut': return <AstronautCat />;
    case 'rainbow': return <RainbowCat />;
    case 'void': return <VoidCat />;
    case 'golden': return <GoldenGodCat />;
    default: return <NakedCat />;
  }
}

/* ======================== TIER 0: TINY KITTEN ======================== */

function NakedCat() {
  return (
    <g>
      {/* Tail — short stubby */}
      <path
        d="M 140 215 Q 158 200 155 185"
        fill="none" stroke="#E8944D" strokeWidth="10" strokeLinecap="round"
        className="cat-tail cat-tail-kitten"
        style={{ transformOrigin: '140px 215px' }}
      />

      {/* Body — small round */}
      <ellipse cx="100" cy="210" rx="45" ry="50" fill="#F4A460" />
      <ellipse cx="100" cy="218" rx="30" ry="35" fill="#FFDAB9" />

      {/* Left ear — rounded */}
      <path d="M 62,95 Q 52,55 80,80" fill="#F4A460" />
      <path d="M 65,92 Q 57,62 77,82" fill="#FFB6C1" />
      {/* Right ear — rounded */}
      <path d="M 138,95 Q 148,55 120,80" fill="#F4A460" />
      <path d="M 135,92 Q 143,62 123,82" fill="#FFB6C1" />

      {/* Head — proportionally large */}
      <ellipse cx="100" cy="108" rx="48" ry="43" fill="#F4A460" />

      {/* Tabby stripes */}
      <g opacity="0.2">
        <path d="M 85 75 Q 100 68 115 75" fill="none" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 88 82 Q 100 76 112 82" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Eyes — extra large, anime kitten */}
      <ellipse cx="80" cy="103" rx="14" ry="15" fill="white" />
      <ellipse cx="120" cy="103" rx="14" ry="15" fill="white" />
      <ellipse cx="82" cy="105" rx="9" ry="10" fill="#2d2640" />
      <ellipse cx="122" cy="105" rx="9" ry="10" fill="#2d2640" />
      <circle cx="86" cy="99" r="4" fill="white" />
      <circle cx="126" cy="99" r="4" fill="white" />
      <circle cx="78" cy="107" r="2" fill="white" />
      <circle cx="118" cy="107" r="2" fill="white" />

      {/* Nose */}
      <polygon points="100,115 97,120 103,120" fill="#FF8C69" />
      {/* Mouth */}
      <path d="M 92 122 Q 96 128 100 122 Q 104 128 108 122" fill="none" stroke="#6b5b7b" strokeWidth="1.5" strokeLinecap="round" />

      {/* Whiskers */}
      <line x1="65" y1="115" x2="42" y2="112" stroke="#6b5b7b" strokeWidth="1" />
      <line x1="65" y1="119" x2="40" y2="122" stroke="#6b5b7b" strokeWidth="1" />
      <line x1="135" y1="115" x2="158" y2="112" stroke="#6b5b7b" strokeWidth="1" />
      <line x1="135" y1="119" x2="160" y2="122" stroke="#6b5b7b" strokeWidth="1" />

      {/* Paws — tiny round */}
      <ellipse cx="80" cy="252" rx="14" ry="10" fill="#F4A460" />
      <ellipse cx="120" cy="252" rx="14" ry="10" fill="#F4A460" />
    </g>
  );
}

/* ======================== TIER 1: DAPPER GENTLEMAN ======================== */

function BowTieCat() {
  return (
    <g>
      {/* Tail — long elegant S-curve */}
      <path
        d="M 148 195 Q 175 165 170 135 Q 165 110 178 90 Q 185 80 180 75"
        fill="none" stroke="#E8944D" strokeWidth="10" strokeLinecap="round"
        className="cat-tail"
        style={{ transformOrigin: '148px 195px' }}
      />

      {/* Body — tall slim */}
      <ellipse cx="100" cy="195" rx="48" ry="68" fill="#F4A460" />
      <ellipse cx="100" cy="205" rx="30" ry="45" fill="#FFDAB9" />
      {/* White shirt front */}
      <ellipse cx="100" cy="165" rx="15" ry="20" fill="white" opacity="0.7" />

      {/* Left ear — tall pointed */}
      <polygon points="55,90 45,30 80,72" fill="#F4A460" />
      <polygon points="58,85 50,40 76,74" fill="#FFB6C1" />
      {/* Right ear */}
      <polygon points="145,90 155,30 120,72" fill="#F4A460" />
      <polygon points="142,85 150,40 124,74" fill="#FFB6C1" />

      {/* Head */}
      <ellipse cx="100" cy="105" rx="48" ry="42" fill="#F4A460" />

      {/* Tabby stripes */}
      <g opacity="0.15">
        <path d="M 85 72 Q 100 65 115 72" fill="none" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 88 80 Q 100 74 112 80" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Eyes — almond, half-lidded, slit pupils */}
      <ellipse cx="80" cy="100" rx="12" ry="11" fill="white" transform="rotate(-5, 80, 100)" />
      <ellipse cx="120" cy="100" rx="12" ry="11" fill="white" transform="rotate(5, 120, 100)" />
      <ellipse cx="81" cy="101" rx="4" ry="8" fill="#2d2640" />
      <ellipse cx="121" cy="101" rx="4" ry="8" fill="#2d2640" />
      {/* Eyelid line */}
      <path d="M 69 96 Q 80 92 91 96" fill="none" stroke="#D4954A" strokeWidth="2" strokeLinecap="round" />
      <path d="M 109 96 Q 120 92 131 96" fill="none" stroke="#D4954A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="84" cy="97" r="2.5" fill="white" />
      <circle cx="124" cy="97" r="2.5" fill="white" />

      {/* Nose */}
      <polygon points="100,110 96,116 104,116" fill="#FF8C69" />
      {/* Mouth */}
      <path d="M 90 119 Q 100 124 110 119" fill="none" stroke="#6b5b7b" strokeWidth="1.5" strokeLinecap="round" />

      {/* Whiskers */}
      <line x1="62" y1="112" x2="30" y2="108" stroke="#6b5b7b" strokeWidth="1.2" />
      <line x1="62" y1="116" x2="28" y2="119" stroke="#6b5b7b" strokeWidth="1.2" />
      <line x1="138" y1="112" x2="170" y2="108" stroke="#6b5b7b" strokeWidth="1.2" />
      <line x1="138" y1="116" x2="172" y2="119" stroke="#6b5b7b" strokeWidth="1.2" />

      {/* Bow tie */}
      <g transform="translate(100, 145)">
        <polygon points="-12,-6 0,-2 0,2 -12,6" fill="#E74C3C" />
        <polygon points="12,-6 0,-2 0,2 12,6" fill="#E74C3C" />
        <circle cx="0" cy="0" r="3" fill="#C0392B" />
      </g>

      {/* Paws with toe pads */}
      <ellipse cx="78" cy="252" rx="16" ry="11" fill="#F4A460" />
      <ellipse cx="122" cy="252" rx="16" ry="11" fill="#F4A460" />
      <circle cx="73" cy="254" r="3" fill="#FFB6C1" />
      <circle cx="78" cy="255" r="3" fill="#FFB6C1" />
      <circle cx="83" cy="254" r="3" fill="#FFB6C1" />
      <circle cx="117" cy="254" r="3" fill="#FFB6C1" />
      <circle cx="122" cy="255" r="3" fill="#FFB6C1" />
      <circle cx="127" cy="254" r="3" fill="#FFB6C1" />
    </g>
  );
}

/* ======================== TIER 2: ANCIENT MYSTIC ======================== */

function WizardCat() {
  return (
    <g>
      {/* Tail — wispy spiral with glow tip */}
      <path
        d="M 150 205 Q 175 170 168 140 Q 162 115 170 92 Q 175 78 168 72"
        fill="none" stroke="#B88BCF" strokeWidth="9" strokeLinecap="round"
        className="cat-tail"
        style={{ transformOrigin: '150px 205px' }}
      />
      <circle cx="168" cy="72" r="5" fill="#9B59B6" opacity="0.6" filter="url(#glow)" />

      {/* Body — pear-shaped */}
      <ellipse cx="100" cy="210" rx="52" ry="55" fill="#C9A0DC" />
      <ellipse cx="100" cy="185" rx="40" ry="30" fill="#C9A0DC" />
      <ellipse cx="100" cy="215" rx="33" ry="38" fill="#E8D5F0" />

      {/* Body sparkles */}
      <circle cx="80" cy="195" r="2" fill="#F1C40F" className="star-twinkle" />
      <circle cx="118" cy="210" r="1.5" fill="#F1C40F" className="star-twinkle" style={{ animationDelay: '0.5s' }} />
      <circle cx="95" cy="225" r="2" fill="#F1C40F" className="star-twinkle" style={{ animationDelay: '1s' }} />

      {/* Left ear — long drooping */}
      <path d="M 58,98 Q 30,42 78,75" fill="#C9A0DC" />
      <path d="M 62,93 Q 38,48 75,77" fill="#DDA0DD" />
      {/* Right ear */}
      <path d="M 142,98 Q 170,42 122,75" fill="#C9A0DC" />
      <path d="M 138,93 Q 162,48 125,77" fill="#DDA0DD" />

      {/* Head */}
      <ellipse cx="100" cy="108" rx="48" ry="40" fill="#C9A0DC" />

      {/* Eyes — narrow wise horizontals */}
      <ellipse cx="80" cy="103" rx="13" ry="8" fill="white" />
      <ellipse cx="120" cy="103" rx="13" ry="8" fill="white" />
      <ellipse cx="81" cy="103" rx="7" ry="6" fill="#6C3483" />
      <ellipse cx="121" cy="103" rx="7" ry="6" fill="#6C3483" />
      {/* Star highlights */}
      <polygon points="84,100 85,102 87,102 85.5,103.5 86,106 84,104.5 82,106 82.5,103.5 81,102 83,102" fill="#F1C40F" className="star-twinkle" />
      <polygon points="124,100 125,102 127,102 125.5,103.5 126,106 124,104.5 122,106 122.5,103.5 121,102 123,102" fill="#F1C40F" className="star-twinkle" />

      {/* Nose */}
      <polygon points="100,113 97,118 103,118" fill="#D4789A" />
      {/* Mouth — knowing smirk */}
      <path d="M 90 121 Q 96 126 100 121 Q 105 127 112 120" fill="none" stroke="#6b5b7b" strokeWidth="1.5" strokeLinecap="round" />

      {/* Whiskers */}
      <line x1="62" y1="115" x2="32" y2="112" stroke="#6b5b7b" strokeWidth="1" />
      <line x1="62" y1="119" x2="30" y2="122" stroke="#6b5b7b" strokeWidth="1" />
      <line x1="138" y1="115" x2="168" y2="112" stroke="#6b5b7b" strokeWidth="1" />
      <line x1="138" y1="119" x2="170" y2="122" stroke="#6b5b7b" strokeWidth="1" />

      {/* Wizard hat */}
      <polygon points="100,5 60,75 140,75" fill="#6C3483" />
      <polygon points="100,5 63,73 137,73" fill="#7D3C98" />
      <rect x="52" y="70" width="96" height="10" rx="5" fill="#6C3483" />
      <polygon points="100,20 103,30 113,30 105,36 108,46 100,40 92,46 95,36 87,30 97,30" fill="#F1C40F" className="star-twinkle" />

      {/* Paws — thin bony with fur tufts */}
      <ellipse cx="78" cy="255" rx="15" ry="9" fill="#C9A0DC" />
      <ellipse cx="122" cy="255" rx="15" ry="9" fill="#C9A0DC" />
      <path d="M 68 250 L 70 247 L 72 250" fill="none" stroke="#C9A0DC" strokeWidth="1.5" />
      <path d="M 84 250 L 86 247 L 88 250" fill="none" stroke="#C9A0DC" strokeWidth="1.5" />
      <path d="M 112 250 L 114 247 L 116 250" fill="none" stroke="#C9A0DC" strokeWidth="1.5" />
      <path d="M 128 250 L 130 247 L 132 250" fill="none" stroke="#C9A0DC" strokeWidth="1.5" />
    </g>
  );
}

/* ======================== TIER 3: SCARRED BRAWLER ======================== */

function PirateCat() {
  return (
    <g>
      {/* Tail — thick kinked */}
      <path
        d="M 155 200 Q 178 175 172 150 L 175 135 Q 170 115 182 100"
        fill="none" stroke="#E8944D" strokeWidth="14" strokeLinecap="round"
        className="cat-tail"
        style={{ transformOrigin: '155px 200px' }}
      />

      {/* Body — wide barrel-chested */}
      <ellipse cx="100" cy="195" rx="58" ry="60" fill="#F4A460" />
      <ellipse cx="100" cy="205" rx="38" ry="42" fill="#FFDAB9" />

      {/* Shoulder X-marking */}
      <g opacity="0.15">
        <line x1="60" y1="168" x2="72" y2="180" stroke="#8B4513" strokeWidth="2" />
        <line x1="72" y1="168" x2="60" y2="180" stroke="#8B4513" strokeWidth="2" />
      </g>

      {/* Left ear — torn/notched */}
      <polygon points="55,92 42,38 52,52 48,42 78,72" fill="#F4A460" />
      <polygon points="58,86 48,48 55,55 52,48 74,74" fill="#FFB6C1" />
      {/* Right ear — intact */}
      <polygon points="145,92 158,38 122,72" fill="#F4A460" />
      <polygon points="142,86 152,45 125,74" fill="#FFB6C1" />

      {/* Head — slightly wider */}
      <ellipse cx="100" cy="105" rx="52" ry="42" fill="#F4A460" />

      {/* Face scar */}
      <line x1="75" y1="85" x2="115" y2="112" stroke="#CC8866" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />

      {/* Right eye — narrowed tough with thick eyebrow */}
      <path d="M 112 90 Q 120 87 128 90" fill="none" stroke="#2d2640" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="120" cy="100" rx="10" ry="9" fill="white" />
      <ellipse cx="121" cy="101" rx="3.5" ry="7" fill="#2d2640" />
      <circle cx="124" cy="97" r="2" fill="white" />

      {/* Left eye — eyepatch */}
      <ellipse cx="80" cy="100" rx="14" ry="15" fill="#1a1a1a" />
      <line x1="80" y1="86" x2="120" y2="78" stroke="#1a1a1a" strokeWidth="2.5" />

      {/* Nose */}
      <polygon points="100,110 96,116 104,116" fill="#FF8C69" />
      {/* Mouth — cocky smirk with fang */}
      <path d="M 88 120 Q 95 128 100 120 Q 108 129 115 118" fill="none" stroke="#6b5b7b" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="112,119 114,125 110,125" fill="white" opacity="0.9" />

      {/* Whiskers (right side only) */}
      <line x1="138" y1="110" x2="170" y2="106" stroke="#6b5b7b" strokeWidth="1.5" />
      <line x1="138" y1="115" x2="172" y2="118" stroke="#6b5b7b" strokeWidth="1.5" />

      {/* Skull badge */}
      <g transform="translate(100, 198)">
        <circle cx="0" cy="0" r="10" fill="white" opacity="0.8" />
        <circle cx="-3" cy="-2" r="2.5" fill="#1a1a1a" />
        <circle cx="3" cy="-2" r="2.5" fill="#1a1a1a" />
        <rect x="-4" y="4" width="8" height="2" rx="1" fill="#1a1a1a" />
        <line x1="-8" y1="10" x2="8" y2="10" stroke="white" strokeWidth="2.5" opacity="0.8" />
      </g>

      {/* Paws — chunky with claws */}
      <ellipse cx="75" cy="250" rx="20" ry="13" fill="#F4A460" />
      <ellipse cx="125" cy="250" rx="20" ry="13" fill="#F4A460" />
      <polygon points="60,246 62,240 64,246" fill="white" opacity="0.7" />
      <polygon points="68,244 70,238 72,244" fill="white" opacity="0.7" />
      <polygon points="76,243 78,237 80,243" fill="white" opacity="0.7" />
      <polygon points="120,243 122,237 124,243" fill="white" opacity="0.7" />
      <polygon points="128,244 130,238 132,244" fill="white" opacity="0.7" />
      <polygon points="136,246 138,240 140,246" fill="white" opacity="0.7" />
    </g>
  );
}

/* ======================== TIER 4: PLUMP MONARCH ======================== */

function RoyalCat() {
  return (
    <g>
      {/* Cape */}
      <path d="M 50 145 Q 38 185 32 248 L 52 252 Q 55 200 60 165 Z" fill="#C0392B" opacity="0.9" />
      <path d="M 150 145 Q 162 185 168 248 L 148 252 Q 145 200 140 165 Z" fill="#C0392B" opacity="0.9" />
      <path d="M 50 145 Q 40 180 35 242 L 45 245 Q 50 195 55 160 Z" fill="#E8D5F0" opacity="0.35" />
      <path d="M 150 145 Q 160 180 165 242 L 155 245 Q 150 195 145 160 Z" fill="#E8D5F0" opacity="0.35" />

      {/* Tail — fluffy puffball */}
      <g className="cat-tail-royal" style={{ transformOrigin: '155px 200px' }}>
        <circle cx="158" cy="195" r="10" fill="#F4A460" />
        <circle cx="163" cy="188" r="8" fill="#F4A460" />
        <circle cx="166" cy="180" r="6" fill="#F4A460" />
        <circle cx="167" cy="174" r="5" fill="#FFDAB9" />
      </g>

      {/* Body — very round */}
      <ellipse cx="100" cy="200" rx="60" ry="60" fill="#F4A460" />
      <ellipse cx="100" cy="210" rx="40" ry="42" fill="#FFDAB9" />

      {/* Fluffy neck ruff */}
      <ellipse cx="100" cy="150" rx="52" ry="14" fill="#F4A460" />
      <ellipse cx="100" cy="150" rx="48" ry="10" fill="#FFDAB9" opacity="0.4" />

      {/* Left ear — tiny rounded nub */}
      <path d="M 65,92 Q 58,72 78,84" fill="#F4A460" />
      <path d="M 67,90 Q 62,76 76,85" fill="#FFB6C1" />
      {/* Right ear */}
      <path d="M 135,92 Q 142,72 122,84" fill="#F4A460" />
      <path d="M 133,90 Q 138,76 124,85" fill="#FFB6C1" />

      {/* Head */}
      <ellipse cx="100" cy="108" rx="48" ry="42" fill="#F4A460" />

      {/* Eyes — small, heavy-lidded, imperious */}
      <ellipse cx="82" cy="102" rx="10" ry="8" fill="white" />
      <ellipse cx="118" cy="102" rx="10" ry="8" fill="white" />
      <path d="M 72 99 Q 82 94 92 99" fill="#D4954A" stroke="#D4954A" strokeWidth="1" />
      <path d="M 108 99 Q 118 94 128 99" fill="#D4954A" stroke="#D4954A" strokeWidth="1" />
      <ellipse cx="83" cy="104" rx="5" ry="6" fill="#2d2640" />
      <ellipse cx="119" cy="104" rx="5" ry="6" fill="#2d2640" />
      <circle cx="85" cy="101" r="2" fill="white" />
      <circle cx="121" cy="101" r="2" fill="white" />
      {/* Arched eyebrows */}
      <path d="M 73 88 Q 82 84 91 88" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 109 88 Q 118 84 127 88" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" />

      {/* Nose */}
      <polygon points="100,112 97,117 103,117" fill="#FF8C69" />
      {/* Mouth — pursed disapproving */}
      <path d="M 94 120 Q 97 118 100 120 Q 103 118 106 120" fill="none" stroke="#6b5b7b" strokeWidth="1.5" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <circle cx="68" cy="112" r="8" fill="#FF6B9D" opacity="0.3" />
      <circle cx="132" cy="112" r="8" fill="#FF6B9D" opacity="0.3" />

      {/* Whiskers */}
      <line x1="62" y1="112" x2="35" y2="108" stroke="#6b5b7b" strokeWidth="1.2" />
      <line x1="62" y1="116" x2="33" y2="119" stroke="#6b5b7b" strokeWidth="1.2" />
      <line x1="138" y1="112" x2="165" y2="108" stroke="#6b5b7b" strokeWidth="1.2" />
      <line x1="138" y1="116" x2="167" y2="119" stroke="#6b5b7b" strokeWidth="1.2" />

      {/* Crown */}
      <polygon points="68,52 75,72 85,57 100,74 115,57 125,72 132,52 135,77 65,77" fill="#FFD700" />
      <circle cx="100" cy="64" r="4" fill="#E74C3C" />

      {/* Bow tie at neck ruff */}
      <g transform="translate(100, 148)">
        <polygon points="-10,-5 0,-2 0,2 -10,5" fill="#E74C3C" />
        <polygon points="10,-5 0,-2 0,2 10,5" fill="#E74C3C" />
        <circle cx="0" cy="0" r="2.5" fill="#C0392B" />
      </g>

      {/* Paws — small dainty */}
      <ellipse cx="78" cy="252" rx="15" ry="10" fill="#F4A460" />
      <ellipse cx="122" cy="252" rx="15" ry="10" fill="#F4A460" />
      <circle cx="75" cy="254" r="3" fill="#FFB6C1" />
      <circle cx="81" cy="254" r="3" fill="#FFB6C1" />
      <circle cx="119" cy="254" r="3" fill="#FFB6C1" />
      <circle cx="125" cy="254" r="3" fill="#FFB6C1" />
    </g>
  );
}

/* ======================== TIER 5: SLEEK EXPLORER ======================== */

function AstronautCat() {
  return (
    <g>
      {/* Tail — straight floating upward (zero-G) */}
      <path
        d="M 148 200 Q 168 175 172 148 Q 175 125 170 105"
        fill="none" stroke="#D0D0D0" strokeWidth="11" strokeLinecap="round"
        className="cat-tail cat-tail-float"
        style={{ transformOrigin: '148px 200px' }}
      />

      {/* Body — slim with suit outline */}
      <ellipse cx="100" cy="200" rx="48" ry="62" fill="#E8E8E8" />
      <ellipse cx="100" cy="200" rx="50" ry="64" fill="none" stroke="#A0A0A0" strokeWidth="1.5" />
      <ellipse cx="100" cy="208" rx="30" ry="40" fill="#F5F5F5" />

      {/* Suit panel lines */}
      <line x1="100" y1="165" x2="100" y2="240" stroke="#C0C0C0" strokeWidth="0.8" opacity="0.4" />
      <line x1="85" y1="170" x2="85" y2="235" stroke="#C0C0C0" strokeWidth="0.5" opacity="0.3" />
      <line x1="115" y1="170" x2="115" y2="235" stroke="#C0C0C0" strokeWidth="0.5" opacity="0.3" />

      {/* Mission patch */}
      <circle cx="115" cy="185" r="7" fill="#4169E1" opacity="0.7" />
      <polygon points="115,180 116.5,183 119.5,183 117,185 118,188 115,186 112,188 113,185 110.5,183 113.5,183" fill="white" opacity="0.8" />

      {/* Left ear — semi-transparent behind helmet */}
      <polygon points="55,90 45,35 80,72" fill="#E8E8E8" opacity="0.4" />
      <polygon points="58,85 50,42 76,74" fill="#FFB6C1" opacity="0.3" />
      {/* Right ear */}
      <polygon points="145,90 155,35 120,72" fill="#E8E8E8" opacity="0.4" />
      <polygon points="142,85 150,42 124,74" fill="#FFB6C1" opacity="0.3" />

      {/* Head */}
      <ellipse cx="100" cy="105" rx="48" ry="42" fill="#E8E8E8" />

      {/* Eyes — wide alert, wonder */}
      <ellipse cx="80" cy="100" rx="12" ry="14" fill="white" />
      <ellipse cx="120" cy="100" rx="12" ry="14" fill="white" />
      <ellipse cx="81" cy="101" rx="8" ry="9" fill="#2d3a60" />
      <ellipse cx="121" cy="101" rx="8" ry="9" fill="#2d3a60" />
      <circle cx="84" cy="96" r="3" fill="white" />
      <circle cx="124" cy="96" r="3" fill="white" />
      {/* Star highlights */}
      <polygon points="77,104 78,106 80,106 78.5,107.5 79,109 77,108 75,109 75.5,107.5 74,106 76,106" fill="white" opacity="0.7" />
      <polygon points="117,104 118,106 120,106 118.5,107.5 119,109 117,108 115,109 115.5,107.5 114,106 116,106" fill="white" opacity="0.7" />

      {/* Nose */}
      <polygon points="100,112 97,117 103,117" fill="#FF8C69" />
      {/* Mouth — open wow */}
      <ellipse cx="100" cy="122" rx="5" ry="3.5" fill="#2d2640" />

      {/* Whiskers */}
      <line x1="62" y1="112" x2="35" y2="108" stroke="#A0A0A0" strokeWidth="1" />
      <line x1="62" y1="116" x2="33" y2="119" stroke="#A0A0A0" strokeWidth="1" />
      <line x1="138" y1="112" x2="165" y2="108" stroke="#A0A0A0" strokeWidth="1" />
      <line x1="138" y1="116" x2="167" y2="119" stroke="#A0A0A0" strokeWidth="1" />

      {/* Helmet */}
      <ellipse cx="100" cy="100" rx="58" ry="50" fill="none" stroke="#B0B0B0" strokeWidth="4" />
      <ellipse cx="100" cy="100" rx="56" ry="48" fill="rgba(200,230,255,0.15)" />
      <ellipse cx="85" cy="90" rx="20" ry="15" fill="url(#helmetGlare)" />
      <line x1="100" y1="52" x2="100" y2="35" stroke="#B0B0B0" strokeWidth="2" />
      <circle cx="100" cy="33" r="4" fill="#E74C3C" className="antenna-blink" />

      {/* Paws — gloved */}
      <ellipse cx="78" cy="252" rx="18" ry="12" fill="#E0E0E0" />
      <ellipse cx="122" cy="252" rx="18" ry="12" fill="#E0E0E0" />
      <ellipse cx="78" cy="252" rx="19" ry="13" fill="none" stroke="#A0A0A0" strokeWidth="1" />
      <ellipse cx="122" cy="252" rx="19" ry="13" fill="none" stroke="#A0A0A0" strokeWidth="1" />
    </g>
  );
}

/* ======================== TIER 6: ETHEREAL SPIRIT ======================== */

function RainbowCat() {
  return (
    <g>
      {/* Fairy wings */}
      <path d="M 55 175 Q 30 145 40 120 Q 50 135 60 155 Z" fill="white" opacity="0.2" className="flutter-wings" />
      <path d="M 145 175 Q 170 145 160 120 Q 150 135 140 155 Z" fill="white" opacity="0.2" className="flutter-wings" style={{ animationDelay: '0.3s' }} />

      {/* Tail — long ribbon filled shape */}
      <path
        d="M 148 200 Q 172 170 165 140 Q 158 110 170 85 Q 178 68 190 65 L 185 70 Q 175 72 165 88 Q 155 112 160 140 Q 167 168 145 198 Z"
        fill="url(#rainbowGrad)" opacity="0.8"
        className="cat-tail-flow"
        style={{ transformOrigin: '148px 200px' }}
      />

      {/* Body — slender elegant */}
      <ellipse cx="100" cy="195" rx="45" ry="65" fill="url(#rainbowGrad)" />
      <ellipse cx="100" cy="195" rx="45" ry="65" fill="white" opacity="0.15" />
      <ellipse cx="100" cy="205" rx="28" ry="42" fill="white" opacity="0.3" />

      {/* Sparkle particles */}
      <circle cx="60" cy="175" r="2" fill="#FFD700" className="star-twinkle" />
      <circle cx="140" cy="185" r="1.5" fill="#FF6B9D" className="star-twinkle" style={{ animationDelay: '0.3s' }} />
      <circle cx="70" cy="215" r="2" fill="#4ECDC4" className="star-twinkle" style={{ animationDelay: '0.6s' }} />
      <circle cx="135" cy="220" r="1.5" fill="#A855F7" className="star-twinkle" style={{ animationDelay: '0.9s' }} />
      <circle cx="85" cy="165" r="1.5" fill="#45B7D1" className="star-twinkle" style={{ animationDelay: '1.2s' }} />

      {/* Left ear — tall elegant */}
      <path d="M 58,90 Q 42,35 80,72" fill="url(#rainbowGrad)" opacity="0.9" />
      <path d="M 62,86 Q 48,42 77,74" fill="#FF6B9D" opacity="0.5" />
      {/* Right ear */}
      <path d="M 142,90 Q 158,35 120,72" fill="url(#rainbowGrad)" opacity="0.9" />
      <path d="M 138,86 Q 152,42 123,74" fill="#FF6B9D" opacity="0.5" />

      {/* Head */}
      <ellipse cx="100" cy="105" rx="48" ry="42" fill="url(#rainbowGrad)" />
      <ellipse cx="100" cy="105" rx="48" ry="42" fill="white" opacity="0.1" />

      {/* Eyes — closed serene arcs */}
      <path d="M 68 102 Q 80 95 92 102" fill="none" stroke="#6b3a7b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 108 102 Q 120 95 132 102" fill="none" stroke="#6b3a7b" strokeWidth="2.5" strokeLinecap="round" />
      {/* Lashes */}
      <line x1="68" y1="102" x2="65" y2="98" stroke="#6b3a7b" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="92" y1="102" x2="95" y2="98" stroke="#6b3a7b" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="108" y1="102" x2="105" y2="98" stroke="#6b3a7b" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="132" y1="102" x2="135" y2="98" stroke="#6b3a7b" strokeWidth="1.5" strokeLinecap="round" />

      {/* Nose */}
      <polygon points="100,112 97,117 103,117" fill="#FF6B9D" />
      {/* Mouth — gentle serene smile */}
      <path d="M 92 119 Q 100 125 108 119" fill="none" stroke="#6b3a7b" strokeWidth="1.5" strokeLinecap="round" />

      {/* Whiskers */}
      <line x1="62" y1="114" x2="38" y2="110" stroke="#9b7bab" strokeWidth="0.8" />
      <line x1="62" y1="118" x2="36" y2="120" stroke="#9b7bab" strokeWidth="0.8" />
      <line x1="138" y1="114" x2="162" y2="110" stroke="#9b7bab" strokeWidth="0.8" />
      <line x1="138" y1="118" x2="164" y2="120" stroke="#9b7bab" strokeWidth="0.8" />

      {/* Rainbow halo */}
      <ellipse cx="100" cy="42" rx="30" ry="8" fill="none" stroke="url(#rainbowGrad)" strokeWidth="4" opacity="0.8" className="halo-float" />

      {/* Paws */}
      <ellipse cx="80" cy="252" rx="15" ry="10" fill="url(#rainbowGrad)" />
      <ellipse cx="120" cy="252" rx="15" ry="10" fill="url(#rainbowGrad)" />
    </g>
  );
}

/* ======================== TIER 7: COSMIC HORROR ======================== */

function VoidCat() {
  return (
    <g>
      {/* Dark mist at base */}
      <ellipse cx="100" cy="260" rx="70" ry="15" fill="#1a1a2e" opacity="0.5" filter="url(#voidMist)" />

      {/* Cosmic aura particles */}
      <circle cx="55" cy="120" r="3" fill="#9B59B6" opacity="0.4" className="void-particle vp1" />
      <circle cx="150" cy="150" r="2" fill="#8E44AD" opacity="0.5" className="void-particle vp2" />
      <circle cx="45" cy="200" r="2.5" fill="#A569BD" opacity="0.3" className="void-particle vp3" />
      <circle cx="160" cy="100" r="2" fill="#BB8FCE" opacity="0.4" className="void-particle vp4" />
      <circle cx="70" cy="245" r="1.5" fill="#9B59B6" opacity="0.5" className="void-particle vp5" />
      <circle cx="135" cy="235" r="2" fill="#8E44AD" opacity="0.3" className="void-particle vp6" />
      <ellipse cx="100" cy="170" rx="80" ry="100" fill="none" stroke="#9B59B6" strokeWidth="1" opacity="0.12" filter="url(#glow)" />

      {/* Tail — very long whip, multi-segment */}
      <path d="M 145 205 Q 172 180 170 150" fill="none" stroke="#1a1a2e" strokeWidth="10" strokeLinecap="round" className="cat-tail" style={{ transformOrigin: '145px 205px' }} />
      <path d="M 170 150 Q 168 120 178 95" fill="none" stroke="#1a1a2e" strokeWidth="6" strokeLinecap="round" />
      <path d="M 178 95 Q 185 70 192 55" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="192" cy="55" r="2" fill="#9B59B6" opacity="0.4" className="void-particle vp1" />
      <circle cx="188" cy="60" r="1.5" fill="#8E44AD" opacity="0.3" className="void-particle vp3" />

      {/* Body — elongated alien */}
      <ellipse cx="100" cy="200" rx="42" ry="72" fill="#1a1a2e" />
      <ellipse cx="100" cy="200" rx="43" ry="73" fill="none" stroke="#9B59B6" strokeWidth="0.5" opacity="0.3" />
      <ellipse cx="100" cy="210" rx="25" ry="45" fill="#16213e" />

      {/* Constellation dots */}
      <circle cx="90" cy="185" r="1" fill="#9B59B6" opacity="0.5" />
      <circle cx="110" cy="200" r="1.2" fill="#A569BD" opacity="0.4" />
      <circle cx="95" cy="220" r="0.8" fill="#BB8FCE" opacity="0.5" />
      <circle cx="105" cy="175" r="1" fill="#8E44AD" opacity="0.4" />
      <circle cx="88" cy="210" r="0.8" fill="#9B59B6" opacity="0.3" />

      {/* Left ear — very tall bat-like */}
      <path d="M 60,95 Q 25,15 82,70" fill="#1a1a2e" />
      <path d="M 63,90 Q 32,22 79,72" fill="#2d1b4e" />
      {/* Right ear */}
      <path d="M 140,95 Q 175,15 118,70" fill="#1a1a2e" />
      <path d="M 137,90 Q 168,22 121,72" fill="#2d1b4e" />

      {/* Head */}
      <ellipse cx="100" cy="105" rx="48" ry="42" fill="#1a1a2e" />

      {/* Eyes — glowing purple, no whites */}
      <ellipse cx="80" cy="100" rx="9" ry="11" fill="#9B59B6" filter="url(#glow)" className="void-eye" />
      <ellipse cx="120" cy="100" rx="9" ry="11" fill="#9B59B6" filter="url(#glow)" className="void-eye" />
      <ellipse cx="80" cy="100" rx="4" ry="5" fill="#D4A5FF" />
      <ellipse cx="120" cy="100" rx="4" ry="5" fill="#D4A5FF" />

      {/* NO nose, NO mouth, NO whiskers — featureless void */}

      {/* Paws — elongated tapered claws */}
      <path d="M 62 250 Q 58 244 62 238 Q 78 236 92 250 Q 82 258 62 254 Z" fill="#1a1a2e" />
      <path d="M 138 250 Q 142 244 138 238 Q 122 236 108 250 Q 118 258 138 254 Z" fill="#1a1a2e" />
    </g>
  );
}

/* ======================== TIER 8: SUPREME DEITY ======================== */

function GoldenGodCat() {
  return (
    <g>
      {/* Light rays */}
      <g className="golden-rays" opacity="0.2">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <line
            key={angle}
            x1="100" y1="170"
            x2={100 + Math.cos((angle * Math.PI) / 180) * 130}
            y2={170 + Math.sin((angle * Math.PI) / 180) * 130}
            stroke="#FFD700" strokeWidth="2.5"
          />
        ))}
      </g>

      {/* Divine wings */}
      <path d="M 48 175 Q 18 140 25 105 Q 35 125 48 155 Z" fill="#FFD700" opacity="0.5" className="flutter-wings" />
      <path d="M 152 175 Q 182 140 175 105 Q 165 125 152 155 Z" fill="#FFD700" opacity="0.5" className="flutter-wings" style={{ animationDelay: '0.3s' }} />

      {/* Tail — grand flame shape */}
      <path
        d="M 152 190 Q 180 160 175 125 Q 172 95 185 70 Q 190 55 182 50 Q 175 48 172 58 Q 168 78 165 100 Q 160 128 170 158 Q 175 178 150 192 Z"
        fill="#FFD700"
        className="cat-tail golden-flame"
        style={{ transformOrigin: '152px 190px' }}
      />
      <path
        d="M 155 188 Q 177 160 173 128 Q 170 100 180 78 Q 184 65 178 60 Q 174 58 172 65 Q 168 82 165 102 Q 162 130 168 158 Q 172 175 153 190 Z"
        fill="#FFF8DC" opacity="0.5"
      />

      {/* Body — largest of all */}
      <ellipse cx="100" cy="190" rx="60" ry="70" fill="#FFD700" />
      <ellipse cx="100" cy="190" rx="61" ry="71" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" filter="url(#goldShimmer)" className="shimmer" />
      <ellipse cx="100" cy="200" rx="38" ry="48" fill="#FFF8DC" />

      {/* Left ear — broad with golden shimmer */}
      <polygon points="52,88 38,28 82,70" fill="#FFD700" />
      <polygon points="56,84 44,38 78,72" fill="#FFE44D" />
      {/* Right ear */}
      <polygon points="148,88 162,28 118,70" fill="#FFD700" />
      <polygon points="144,84 156,38 122,72" fill="#FFE44D" />

      {/* Head */}
      <ellipse cx="100" cy="105" rx="50" ry="44" fill="#FFD700" />

      {/* Golden halo */}
      <ellipse cx="100" cy="40" rx="28" ry="7" fill="none" stroke="#FFD700" strokeWidth="3" filter="url(#goldShimmer)" className="halo-float" />

      {/* Forehead gem / third eye */}
      <polygon points="100,78 103,84 100,90 97,84" fill="#00D4FF" className="star-twinkle" />

      {/* Eyes — glowing cyan, divine */}
      <ellipse cx="80" cy="100" rx="10" ry="12" fill="#00D4FF" filter="url(#glow)" className="eye-divine" />
      <ellipse cx="120" cy="100" rx="10" ry="12" fill="#00D4FF" filter="url(#glow)" className="eye-divine" />
      <ellipse cx="80" cy="100" rx="3" ry="4" fill="white" />
      <ellipse cx="120" cy="100" rx="3" ry="4" fill="white" />

      {/* Nose */}
      <polygon points="100,112 97,117 103,117" fill="#FFA500" />
      {/* Mouth — serene all-knowing */}
      <path d="M 90 120 Q 100 127 110 120" fill="none" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" />

      {/* Whiskers — golden */}
      <line x1="62" y1="112" x2="32" y2="108" stroke="#B8860B" strokeWidth="1.5" />
      <line x1="62" y1="116" x2="30" y2="119" stroke="#B8860B" strokeWidth="1.5" />
      <line x1="138" y1="112" x2="168" y2="108" stroke="#B8860B" strokeWidth="1.5" />
      <line x1="138" y1="116" x2="170" y2="119" stroke="#B8860B" strokeWidth="1.5" />

      {/* Diamond crown */}
      <polygon points="65,48 72,70 82,53 100,72 118,53 128,70 135,48 138,75 62,75" fill="#FFD700" filter="url(#goldShimmer)" />
      <circle cx="100" cy="62" r="4" fill="#00D4FF" />
      <circle cx="85" cy="66" r="2.5" fill="#FF69B4" />
      <circle cx="115" cy="66" r="2.5" fill="#FF69B4" />

      {/* Paws — large powerful with glow */}
      <ellipse cx="75" cy="250" rx="20" ry="14" fill="#FFD700" />
      <ellipse cx="125" cy="250" rx="20" ry="14" fill="#FFD700" />
      <circle cx="70" cy="252" r="4" fill="#FFE44D" />
      <circle cx="80" cy="252" r="4" fill="#FFE44D" />
      <circle cx="120" cy="252" r="4" fill="#FFE44D" />
      <circle cx="130" cy="252" r="4" fill="#FFE44D" />
    </g>
  );
}

export default memo(CatCharacter, (prev, next) =>
  prev.totalLevel === next.totalLevel && prev.isTapping === next.isTapping
);
