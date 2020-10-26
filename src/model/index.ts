export type Category =
  | 'Barbell'
  | 'Dumbbell'
  | 'Cables'
  | 'Machine'
  | 'Bands'
  | 'Bodyweight'
  | 'Reps Only'
  | 'Cardio'
  | 'Duration';

export const Categories: Category[] = [
  'Barbell',
  'Dumbbell',
  'Cables',
  'Machine',
  'Bands',
  'Bodyweight',
  'Reps Only',
  'Cardio',
  'Duration',
];

export const BodyParts: BodyPart[] = [
  'Core',
  'Biceps',
  'Triceps',
  'Shoulders',
  'Back',
  'Chest',
  'Legs',
  'Full Body',
  'Cardio',
];

export type BodyPart =
  | 'Core'
  | 'Biceps'
  | 'Triceps'
  | 'Shoulders'
  | 'Back'
  | 'Chest'
  | 'Legs'
  | 'Full Body'
  | 'Cardio';
