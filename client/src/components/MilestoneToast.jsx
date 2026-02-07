import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import './MilestoneToast.css';

export default function MilestoneToast({ soundEngine }) {
  const milestone = useGameStore((s) => s.newCostumeUnlocked);
  const dismiss = useGameStore((s) => s.dismissMilestone);
  const lastPlayedRef = useRef(null);

  useEffect(() => {
    if (milestone && soundEngine && milestone.id !== lastPlayedRef.current) {
      lastPlayedRef.current = milestone.id;
      soundEngine.playMilestone();
    }
  }, [milestone, soundEngine]);

  return (
    <AnimatePresence>
      {milestone && (
        <motion.div
          className="milestone-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        >
          <motion.div
            className="milestone-toast"
            initial={{ scale: 0.5, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: -50 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="milestone-confetti">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`confetti-piece cp${i % 6}`} style={{
                  '--angle': `${(360 / 12) * i}deg`,
                  '--dist': `${60 + Math.random() * 40}px`,
                  animationDelay: `${i * 0.05}s`,
                }} />
              ))}
            </div>
            <div className="milestone-emoji">🎉</div>
            <div className="milestone-title">New Costume!</div>
            <div className="milestone-name">{milestone.name}</div>
            <div className="milestone-desc">{milestone.description}</div>
            <button className="milestone-dismiss" onClick={dismiss}>Nice!</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
