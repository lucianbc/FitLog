import React from 'react';
import { Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import IconButton from '../components/IconButton';
import { NavParams } from '../navigation/types';

const ExercisesScreen = () => (
  <SafeAreaView>
    <Text>Exercises</Text>
  </SafeAreaView>
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
