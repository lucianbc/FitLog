import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TabNavigator from './Tabs';

const Stack = createStackNavigator();

const Root = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="index" component={TabNavigator} />
  </Stack.Navigator>
);

export default Root;
