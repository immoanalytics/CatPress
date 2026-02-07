import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

const TICK_INTERVAL_MS = 100;

export function useAutoClicker() {
  const lastTickRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const deltaSeconds = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;
      useGameStore.getState().autoTick(deltaSeconds);
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);
}
