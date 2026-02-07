import { create } from 'zustand';
import { UPGRADES, getUpgradeCost } from '../data/upgrades';
import { getCostumeForLevel } from '../data/costumes';

const INITIAL_STATE = {
  points: 0,
  totalPointsEarned: 0,
  totalTaps: 0,

  autoClickerLevel: 0,
  multiTapLevel: 0,
  luckyDoubleLevel: 0,

  lastTapValue: 0,
  lastTapWasLucky: false,
  currentCostumeId: 'naked',
  newCostumeUnlocked: null,

  lastSaved: null,
};

function getTotalLevel(state) {
  return state.autoClickerLevel + state.multiTapLevel + state.luckyDoubleLevel;
}

export const useGameStore = create((set, get) => ({
  ...INITIAL_STATE,

  tap: () => {
    const state = get();
    const base = 1 + state.multiTapLevel;
    const isLucky = Math.random() < (state.luckyDoubleLevel * 0.03);
    const value = base * (isLucky ? 2 : 1);

    const newTotalLevel = getTotalLevel(state);
    const newCostume = getCostumeForLevel(newTotalLevel);
    const costumeChanged = newCostume.id !== state.currentCostumeId;

    set({
      points: state.points + value,
      totalPointsEarned: state.totalPointsEarned + value,
      totalTaps: state.totalTaps + 1,
      lastTapValue: value,
      lastTapWasLucky: isLucky,
      currentCostumeId: newCostume.id,
      newCostumeUnlocked: costumeChanged ? newCostume : null,
    });

    return { value, isLucky };
  },

  autoTick: (deltaSeconds) => {
    const state = get();
    if (state.autoClickerLevel === 0) return;
    const earned = state.autoClickerLevel * deltaSeconds;
    set({
      points: state.points + earned,
      totalPointsEarned: state.totalPointsEarned + earned,
    });
  },

  purchaseUpgrade: (upgradeType) => {
    const state = get();
    const levelKey = `${upgradeType}Level`;
    const level = state[levelKey];
    const upgradeDef = UPGRADES[upgradeType];

    if (!upgradeDef) return false;
    if (level >= upgradeDef.maxLevel) return false;

    const cost = getUpgradeCost(upgradeType, level);
    if (state.points < cost) return false;

    const newState = { points: state.points - cost, [levelKey]: level + 1 };

    const newTotalLevel = getTotalLevel({ ...state, ...newState });
    const newCostume = getCostumeForLevel(newTotalLevel);
    const costumeChanged = newCostume.id !== state.currentCostumeId;

    newState.currentCostumeId = newCostume.id;
    if (costumeChanged) {
      newState.newCostumeUnlocked = newCostume;
    }

    set(newState);
    return true;
  },

  dismissMilestone: () => set({ newCostumeUnlocked: null }),

  loadSave: (savedState) => set({ ...savedState }),

  resetGame: () => set({ ...INITIAL_STATE }),

  getTotalLevel: () => getTotalLevel(get()),
}));
