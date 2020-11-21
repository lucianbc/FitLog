import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import * as PendingWorkout from './PendingWorkoutScreen';
import * as Exercises from './ExercisesList';
import CreateWorkoutProvider from './CreateWorkoutProvider';

const Stack = createStackNavigator();

const Navigator = () => (
  <CreateWorkoutProvider>
    <Stack.Navigator>
      <Stack.Screen
        name="exercises-index"
        component={PendingWorkout.default}
        options={PendingWorkout.options}
      />
      <Stack.Screen
        name="exercises-add-exercise"
        component={Exercises.default}
        options={Exercises.options}
      />
    </Stack.Navigator>
  </CreateWorkoutProvider>
);

export const options = {
  title: 'Create workout',
};

export default Navigator;
