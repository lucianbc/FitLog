import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../home/HomeScreen';
import ExercisesScreen from '../exercises';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="home" component={HomeScreen} />
    <Tab.Screen name="exercises" component={ExercisesScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
