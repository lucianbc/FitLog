import React from 'react';
import { Text } from 'react-native';
import IconButton from '../components/IconButton';
import Screen from '../components/Screen';
import { NavParams } from '../navigation/types';

const ExercisesScreen = () => (
  <Screen>
    <Text>Exercises</Text>
  </Screen>
);

const Icons: React.FC<{ onPlus: () => void }> = ({ onPlus }) => {
  return <IconButton name="plus" onPress={onPlus} />;
};

export const options = ({ navigation }: NavParams) => {
  return {
    title: 'Exercises',
    headerRight: () => (
      <Icons onPlus={() => navigation.navigate('exercises-add-exercise')} />
    ),
  };
};

export default ExercisesScreen;
