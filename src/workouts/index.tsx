import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Workouts from './WorkoutsScreen';

const Stack = createStackNavigator();

const Navigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="workouts-index"
      component={Workouts.default}
      options={Workouts.options}
    />
  </Stack.Navigator>
);

export default Navigator;
