import React, { useCallback, useContext, useState } from 'react';
import { Exercise, ExerciseRecord } from '../../model';

type MaybeString = string | undefined;
type UpdateString = (value: MaybeString) => void;

interface WorkoutOps {
  readonly exercises: ExerciseRecord[];
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exercise: Exercise) => void;
  updateRecord: (action: {
    previous: ExerciseRecord;
    update: ExerciseRecord;
  }) => void;
  name: MaybeString;
  setName: UpdateString;
  notes: MaybeString;
  setNotes: UpdateString;
}

const defaultFn = () => {};

const defaultOps: WorkoutOps = {
  addExercise: defaultFn,
  removeExercise: defaultFn,
  updateRecord: defaultFn,
  exercises: [],
  name: undefined,
  setName: () => {},
  notes: undefined,
  setNotes: () => {},
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
    (e: Exercise) => setExercises((ex) => [...ex, e]),
    [setExercises],
  );
  const removeExercise = useCallback(
    (e: Exercise) => setExercises((ex) => ex.filter((crt) => crt !== e)),
    [setExercises],
  );
  const updateRecord: WorkoutOps['updateRecord'] = useCallback(
    ({ previous, update }) => {
      const newState = exercises.map((e) => (e === previous ? update : e));
      setExercises(newState);
    },
    [exercises],
  );
  const [name, setName] = useState<MaybeString>();
  const [notes, setNotes] = useState<MaybeString>();
  return (
    <CreateWorkoutCtx.Provider
      value={{
        addExercise,
        removeExercise,
        updateRecord,
        exercises,
        name,
        setName,
        notes,
        setNotes,
      }}>
      {children}
    </CreateWorkoutCtx.Provider>
  );
};

export default CreateWorkoutProvider;
