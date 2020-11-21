import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Workouts from './WorkoutsScreen';
import * as CreateWorkout from './create';

const Stack = createStackNavigator();

const Navigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="workouts-index"
      component={Workouts.default}
      options={Workouts.options}
    />
    <Stack.Screen
      name="create-workout"
      component={CreateWorkout.default}
      options={CreateWorkout.options}
    />
  </Stack.Navigator>
);

export default Navigator;
