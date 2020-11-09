import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../home/HomeScreen';
import ExercisesScreen from '../exercises';
import WorkoutsScreen from '../workouts';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="workouts" component={WorkoutsScreen} />
    <Tab.Screen name="exercises" component={ExercisesScreen} />
    <Tab.Screen name="home" component={HomeScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
