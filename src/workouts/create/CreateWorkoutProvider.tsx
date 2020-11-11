import React, { useCallback, useContext, useState } from 'react';
import { Exercise } from '../../model';

interface WorkoutOps {
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exercise: Exercise) => void;
  readonly exercises: Exercise[];
}

const defaultFn = () => {};

const defaultOps: WorkoutOps = {
  addExercise: defaultFn,
  removeExercise: defaultFn,
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
  return (
    <CreateWorkoutCtx.Provider
      value={{ addExercise, removeExercise, exercises }}>
      {children}
    </CreateWorkoutCtx.Provider>
  );
};

export default CreateWorkoutProvider;
