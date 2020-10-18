import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExercisesScreen from './ExercisesScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

const Icons = () => <Icon name="plus" />;

const Navigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="exercises-index"
      component={ExercisesScreen}
      options={{
        title: 'Exercises',
        headerRight: Icons,
      }}
    />
  </Stack.Navigator>
);

export default Navigator;
