import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Exercises, { options as exercisesOptions } from './ExercisesScreen';
import AddExercise from './AddExerciseScreen';

const Stack = createStackNavigator();

const Navigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="exercises-index"
      component={Exercises}
      options={exercisesOptions}
    />
    <Stack.Screen
      name="exercises-add-exercise"
      component={AddExercise}
      options={{
        title: 'Hasa',
      }}
    />
  </Stack.Navigator>
);

export default Navigator;
