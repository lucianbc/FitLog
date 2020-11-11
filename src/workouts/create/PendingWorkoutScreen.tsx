import { Button, Text } from 'native-base';
import React from 'react';
import Screen from '../../components/Screen';
import { useWorkoutOps } from './CreateWorkoutProvider';

const PendingWorkoutScreen = ({ navigation }: any) => {
  const workoutOps = useWorkoutOps();
  return (
    <Screen>
      {workoutOps.exercises.map((e) => (
        <Text key={e.id}>{e.name}</Text>
      ))}
      <Button
        onPress={() => {
          navigation.navigate('exercises-add-exercise');
        }}>
        <Text>Add Exercise</Text>
      </Button>
    </Screen>
  );
};

export const options = {
  title: 'Create',
};

export default PendingWorkoutScreen;
