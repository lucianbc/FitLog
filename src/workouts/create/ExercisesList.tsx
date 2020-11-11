import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as ExercisesScreen from '../../exercises/ExercisesScreen';
import { useWorkoutOps } from './CreateWorkoutProvider';

const Exercises = () => {
  const wokrout = useWorkoutOps();
  const navigation = useNavigation();
  return (
    <ExercisesScreen.default
      onItemSelected={(e) => {
        wokrout.addExercise(e);
        navigation.goBack();
      }}
    />
  );
};

export const options = ExercisesScreen.options;

export default Exercises;
