import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatNumber } from '../utils/formatNumber';
import './PointsDisplay.css';

export default function PointsDisplay() {
  const points = useGameStore((s) => s.points);
  const multiTapLevel = useGameStore((s) => s.multiTapLevel);
  const autoClickerLevel = useGameStore((s) => s.autoClickerLevel);
  const luckyDoubleLevel = useGameStore((s) => s.luckyDoubleLevel);

  const [displayedPoints, setDisplayedPoints] = useState(points);

  useEffect(() => {
    const diff = points - displayedPoints;
    if (Math.abs(diff) < 1) {
      setDisplayedPoints(points);
      return;
    }
    const step = Math.max(1, Math.ceil(Math.abs(diff) / 8));
    const timer = setTimeout(() => {
      setDisplayedPoints((prev) => {
        if (points > prev) return Math.min(prev + step, points);
        return Math.max(prev - step, points);
      });
    }, 25);
    return () => clearTimeout(timer);
  }, [points, displayedPoints]);

  const perTap = 1 + multiTapLevel;
  const perSec = autoClickerLevel;
  const luckyChance = luckyDoubleLevel * 3;

  return (
    <div className="points-display">
      <div className="points-main">
        <span className="points-star">★</span>
        <span className="points-value">{formatNumber(Math.floor(displayedPoints))}</span>
      </div>
      <div className="points-stats">
        <span className="stat">+{perTap}/tap</span>
        {perSec > 0 && <span className="stat">{perSec}/sec</span>}
        {luckyChance > 0 && <span className="stat stat-lucky">{luckyChance}% ×2</span>}
      </div>
    </div>
  );
}
