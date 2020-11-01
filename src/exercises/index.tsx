import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Exercises from './ExercisesScreen';
import * as AddExercise from './AddExerciseScreen';
import RealmProvider from '../components/RealmProvider';

const Stack = createStackNavigator();

const Navigator = () => (
  <RealmProvider>
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
  </RealmProvider>
);

export default Navigator;
