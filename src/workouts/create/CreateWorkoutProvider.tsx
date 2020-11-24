import React, { useCallback, useContext, useState } from 'react';
import { Exercise, ExerciseRecord } from '../../model';

interface WorkoutOps {
  readonly exercises: ExerciseRecord[];
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exercise: Exercise) => void;
  updateRecord: (action: {
    previous: ExerciseRecord;
    update: ExerciseRecord;
  }) => void;
}

const defaultFn = () => {};

const defaultOps: WorkoutOps = {
  addExercise: defaultFn,
  removeExercise: defaultFn,
  updateRecord: defaultFn,
  exercises: [],
};

const CreateWorkoutCtx = React.createContext<WorkoutOps>(defaultOps);

export function useWorkoutOps() {
  const ctx = useContext(CreateWorkoutCtx);
  return ctx;
}

const CreateWorkoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const addExercise = useCallback(
    (e: Exercise) =>
      setExercises((ex) =>
        ex.find((crt) => crt.id === e.id) ? ex : [...ex, e],
      ),
    [setExercises],
  );
  const removeExercise = useCallback(
    (e: Exercise) => setExercises((ex) => ex.filter((crt) => crt !== e)),
    [setExercises],
  );
  const updateRecord: WorkoutOps['updateRecord'] = useCallback(
    ({ previous, update }) => {
      console.debug('Updating -', previous, update);
      const newState = exercises.map((e) => (e === previous ? update : e));

      setExercises(newState);
    },
    [exercises],
  );
  return (
    <CreateWorkoutCtx.Provider
      value={{ addExercise, removeExercise, updateRecord, exercises }}>
      {children}
    </CreateWorkoutCtx.Provider>
  );
};

export default CreateWorkoutProvider;
