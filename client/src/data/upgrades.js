export const UPGRADES = {
  autoClicker: {
    id: 'autoClicker',
    name: 'Auto Clicker',
    icon: '🤖',
    description: '+1 point/sec per level',
    baseCost: 50,
    scaleFactor: 1.4,
    maxLevel: 50,
  },
  multiTap: {
    id: 'multiTap',
    name: 'Multi Tap',
    icon: '👆',
    description: '+1 point/tap per level',
    baseCost: 100,
    scaleFactor: 1.5,
    maxLevel: 50,
  },
  luckyDouble: {
    id: 'luckyDouble',
    name: 'Lucky Double',
    icon: '🍀',
    description: '+3% double chance per level',
    baseCost: 200,
    scaleFactor: 1.6,
    maxLevel: 20,
  },
};

export function getUpgradeCost(upgradeId, currentLevel) {
  const upgrade = UPGRADES[upgradeId];
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.scaleFactor, currentLevel));
}

export function getUpgradeEffect(upgradeId, level) {
  switch (upgradeId) {
    case 'autoClicker':
      return `${level} pts/sec`;
    case 'multiTap':
      return `+${level + 1} per tap`;
    case 'luckyDouble':
      return `${level * 3}% chance`;
    default:
      return '';
  }
}
