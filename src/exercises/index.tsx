import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Exercises from './ExercisesScreen';
import * as AddExercise from './AddExerciseScreen';

const Stack = createStackNavigator();

const Navigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="exercises-index"
      component={Exercises.default}
      options={Exercises.options}
    />
    <Stack.Screen
      name="exercises-add-exercise"
      component={AddExercise.default}
      options={AddExercise.options}
    />
  </Stack.Navigator>
);

export default Navigator;
