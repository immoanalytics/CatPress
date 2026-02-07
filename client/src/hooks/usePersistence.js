import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../store/gameStore';

const SAVE_KEY = 'catpress_save_v1';
const SAVE_DEBOUNCE_MS = 500;
const MAX_OFFLINE_SECONDS = 3600;

const PERSISTED_FIELDS = [
  'points', 'totalPointsEarned', 'totalTaps',
  'autoClickerLevel', 'multiTapLevel', 'luckyDoubleLevel',
  'currentCostumeId',
];

export function usePersistence() {
  const timerRef = useRef(null);
  const [offlineEarnings, setOfflineEarnings] = useState(null);

  // Load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);

        // Calculate offline earnings
        if (saved.lastSaved && saved.autoClickerLevel > 0) {
          const secondsAway = (Date.now() - saved.lastSaved) / 1000;
          if (secondsAway > 2) {
            const effectiveSeconds = Math.min(secondsAway, MAX_OFFLINE_SECONDS);
            const earned = Math.floor(saved.autoClickerLevel * effectiveSeconds);
            saved.points += earned;
            saved.totalPointsEarned += earned;
            setOfflineEarnings(earned);
          }
        }

        useGameStore.getState().loadSave(saved);
      }
    } catch (e) {
      console.warn('Failed to load save:', e);
    }
  }, []);

  // Subscribe and save with debounce
  useEffect(() => {
    const unsub = useGameStore.subscribe((state) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const toSave = {};
        for (const key of PERSISTED_FIELDS) {
          toSave[key] = state[key];
        }
        toSave.lastSaved = Date.now();
        try {
          localStorage.setItem(SAVE_KEY, JSON.stringify(toSave));
        } catch (e) {
          console.warn('Failed to save:', e);
        }
      }, SAVE_DEBOUNCE_MS);
    });
    return () => {
      unsub();
      clearTimeout(timerRef.current);
    };
  }, []);

  const dismissOfflineEarnings = () => setOfflineEarnings(null);

  return { offlineEarnings, dismissOfflineEarnings };
}
