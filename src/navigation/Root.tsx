import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TabNavigator from './Tabs';
import CreateWorkout from '../workouts/create';

const Stack = createStackNavigator();

const Root = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="index" component={TabNavigator} />
    <Stack.Screen name="create-workout" component={CreateWorkout} />
  </Stack.Navigator>
);

export default Root;
