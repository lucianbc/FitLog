import React, { useState } from 'react';
import { Text } from 'react-native';
import IconButton from '../components/IconButton';
import { useRealm } from '../components/RealmProvider';
import Screen from '../components/Screen';
import { NavParams } from '../navigation/types';
import { AddExerciseForm } from './AddExerciseScreen';

const ExercisesScreen = () => {
  const realm = useRealm();
  const [exercises] = useState(realm.objects<AddExerciseForm>('Exercise'));
  return (
    <Screen>
      <Text>Exercises</Text>
      {exercises.map((v) => (
        <Text key={v.name}>{v.name}</Text>
      ))}
    </Screen>
  );
};

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
