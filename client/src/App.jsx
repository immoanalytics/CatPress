import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSoundEngine } from './hooks/useSoundEngine';
import { useAutoClicker } from './hooks/useAutoClicker';
import { usePersistence } from './hooks/usePersistence';
import PointsDisplay from './components/PointsDisplay';
import TapArea from './components/TapArea';
import UpgradePanel from './components/UpgradePanel';
import MilestoneToast from './components/MilestoneToast';
import { formatNumber } from './utils/formatNumber';
import './styles/global.css';

export default function App() {
  const soundEngine = useSoundEngine();
  useAutoClicker();
  const { offlineEarnings, dismissOfflineEarnings } = usePersistence();
  const [showWelcome, setShowWelcome] = useState(false);

  // Initialize audio on first interaction
  useEffect(() => {
    const handleFirstTouch = () => {
      soundEngine.initialize();
      document.removeEventListener('touchstart', handleFirstTouch);
      document.removeEventListener('mousedown', handleFirstTouch);
    };
    document.addEventListener('touchstart', handleFirstTouch, { once: true });
    document.addEventListener('mousedown', handleFirstTouch, { once: true });
    return () => {
      document.removeEventListener('touchstart', handleFirstTouch);
      document.removeEventListener('mousedown', handleFirstTouch);
    };
  }, [soundEngine]);

  // Show welcome back toast
  useEffect(() => {
    if (offlineEarnings && offlineEarnings > 0) {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
        dismissOfflineEarnings();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [offlineEarnings, dismissOfflineEarnings]);

  return (
    <div className="game-background">
      <PointsDisplay />
      <TapArea soundEngine={soundEngine} />
      <UpgradePanel soundEngine={soundEngine} />
      <MilestoneToast soundEngine={soundEngine} />

      {/* Welcome back toast */}
      <AnimatePresence>
        {showWelcome && offlineEarnings > 0 && (
          <motion.div
            className="welcome-toast"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => { setShowWelcome(false); dismissOfflineEarnings(); }}
            style={{
              position: 'fixed',
              top: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, var(--bg-card), var(--bg-secondary))',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: 'var(--radius)',
              padding: '12px 24px',
              textAlign: 'center',
              zIndex: 50,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
              Welcome back!
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--accent-gold)' }}>
              +{formatNumber(offlineEarnings)} points earned
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
