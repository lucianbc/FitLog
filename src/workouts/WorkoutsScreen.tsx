import { Button, Text } from 'native-base';
import React from 'react';
import Screen from '../components/Screen';

const WorkoutsScreen = ({ navigation }: any) => (
  <Screen>
    <Button onPress={() => navigation.navigate('create-workout')}>
      <Text>Create Workout</Text>
    </Button>
  </Screen>
);

export const options = {
  title: 'Workouts',
};

export default WorkoutsScreen;
