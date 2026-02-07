import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import UpgradeButton from './UpgradeButton';
import './UpgradePanel.css';

export default function UpgradePanel({ soundEngine }) {
  const [isOpen, setIsOpen] = useState(false);
  const points = useGameStore((s) => s.points);
  const autoClickerLevel = useGameStore((s) => s.autoClickerLevel);
  const multiTapLevel = useGameStore((s) => s.multiTapLevel);
  const luckyDoubleLevel = useGameStore((s) => s.luckyDoubleLevel);
  const purchaseUpgrade = useGameStore((s) => s.purchaseUpgrade);

  const handlePurchase = useCallback((upgradeId) => {
    const success = purchaseUpgrade(upgradeId);
    if (success) {
      soundEngine?.playUpgrade();
    }
  }, [purchaseUpgrade, soundEngine]);

  const togglePanel = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          className="upgrade-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.div
        className="upgrade-panel"
        animate={{ y: isOpen ? 0 : 'calc(100% - 52px)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="upgrade-handle" onClick={togglePanel}>
          <div className="handle-bar" />
          <span className="handle-text">Upgrades</span>
          <span className={`handle-chevron ${isOpen ? 'open' : ''}`}>▲</span>
        </div>

        <div className="upgrade-list">
          <UpgradeButton
            upgradeId="autoClicker"
            level={autoClickerLevel}
            points={points}
            onPurchase={handlePurchase}
          />
          <UpgradeButton
            upgradeId="multiTap"
            level={multiTapLevel}
            points={points}
            onPurchase={handlePurchase}
          />
          <UpgradeButton
            upgradeId="luckyDouble"
            level={luckyDoubleLevel}
            points={points}
            onPurchase={handlePurchase}
          />
        </div>
      </motion.div>
    </>
  );
}
