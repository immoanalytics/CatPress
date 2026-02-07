import { memo } from 'react';
import { motion } from 'framer-motion';
import { UPGRADES, getUpgradeCost, getUpgradeEffect } from '../data/upgrades';
import { formatNumber } from '../utils/formatNumber';
import './UpgradeButton.css';

function UpgradeButton({ upgradeId, level, points, onPurchase }) {
  const upgrade = UPGRADES[upgradeId];
  const cost = getUpgradeCost(upgradeId, level);
  const canAfford = points >= cost;
  const isMaxed = level >= upgrade.maxLevel;
  const effect = getUpgradeEffect(upgradeId, level);

  const handleClick = (e) => {
    e.stopPropagation();
    if (canAfford && !isMaxed) {
      onPurchase(upgradeId);
    }
  };

  return (
    <motion.button
      className={`upgrade-button ${canAfford && !isMaxed ? 'affordable' : 'locked'} ${isMaxed ? 'maxed' : ''}`}
      onClick={handleClick}
      whileTap={canAfford && !isMaxed ? { scale: 0.96 } : {}}
    >
      <div className="upgrade-left">
        <span className="upgrade-icon">{upgrade.icon}</span>
        <div className="upgrade-info">
          <div className="upgrade-name">{upgrade.name}</div>
          <div className="upgrade-effect">{effect}</div>
        </div>
      </div>
      <div className="upgrade-right">
        <div className="upgrade-level">Lv.{level}</div>
        {isMaxed ? (
          <div className="upgrade-cost maxed-text">MAX</div>
        ) : (
          <div className={`upgrade-cost ${canAfford ? 'can-afford' : ''}`}>
            ★ {formatNumber(cost)}
          </div>
        )}
      </div>
    </motion.button>
  );
}

export default memo(UpgradeButton);
