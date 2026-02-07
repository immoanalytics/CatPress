export const COSTUMES = [
  {
    id: 'naked',
    name: 'Naked Cat',
    minLevel: 0,
    colorScheme: 'orange',
    accessories: [],
    description: 'Just a happy cat!',
  },
  {
    id: 'bowtie',
    name: 'Bow Tie Cat',
    minLevel: 3,
    colorScheme: 'orange',
    accessories: ['bowtie'],
    description: 'Looking dapper!',
  },
  {
    id: 'wizard',
    name: 'Wizard Cat',
    minLevel: 8,
    colorScheme: 'purple-tint',
    accessories: ['wizard-hat', 'sparkle-eyes'],
    description: 'A magical meow-gician!',
  },
  {
    id: 'pirate',
    name: 'Pirate Cat',
    minLevel: 15,
    colorScheme: 'orange',
    accessories: ['eyepatch', 'skull-badge'],
    description: 'Yarr, me-ow!',
  },
  {
    id: 'royal',
    name: 'Royal Cat',
    minLevel: 25,
    colorScheme: 'royal',
    accessories: ['crown', 'cape', 'rosy-cheeks'],
    description: 'His Royal Meow-jesty!',
  },
  {
    id: 'astronaut',
    name: 'Astronaut Cat',
    minLevel: 35,
    colorScheme: 'space',
    accessories: ['helmet', 'suit', 'flag'],
    description: 'One small step for cat...',
  },
  {
    id: 'rainbow',
    name: 'Rainbow Cat',
    minLevel: 50,
    colorScheme: 'rainbow',
    accessories: ['halo', 'sparkle-trail'],
    description: 'Nyan nyan nyan!',
  },
  {
    id: 'void',
    name: 'Void Cat',
    minLevel: 70,
    colorScheme: 'void',
    accessories: ['cosmic-aura', 'glow-eyes'],
    description: 'From the cosmic void...',
  },
  {
    id: 'golden',
    name: 'Golden God Cat',
    minLevel: 100,
    colorScheme: 'gold',
    accessories: ['diamond-crown', 'light-rays', 'shimmer'],
    description: 'The ultimate cat!',
  },
];

export function getCostumeForLevel(totalLevel) {
  return [...COSTUMES].reverse().find(c => totalLevel >= c.minLevel) || COSTUMES[0];
}
