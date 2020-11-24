import { AddExerciseForm } from '../exercises/AddExerciseScreen';

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

export type ExerciseValue = AddExerciseForm;

export type Entity<T extends object> = T & { id: string };

export type Exercise = Entity<ExerciseValue>;

export type ExerciseRecord = Exercise & {
  sets?: number;
  reps?: number;
  restBetweenSets?: number;
  restBetweenReps?: number;
};
