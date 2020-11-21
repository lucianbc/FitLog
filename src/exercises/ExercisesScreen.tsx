import React from 'react';
import { FlatList } from 'react-native';
import IconButton from '../components/IconButton';
import { useRealm } from '../components/RealmProvider';
import Screen from '../components/Screen';
import { NavParams } from '../navigation/types';
import { Exercise } from '../model';
import { useObjects } from '../common/useObjects';
import { DeleteExerciseItem } from '../components/exercises/DeleteExerciseItem';
import ListSeparator from '../components/ListSeparator';

interface Props {
  onItemSelected?: (item: Exercise) => void;
}

const ExercisesScreen: React.FC<Props> = ({ onItemSelected }) => {
  const realm = useRealm();
  const exercises = useObjects<Exercise>('Exercise');
  return (
    <Screen ph={0} pv={0}>
      <FlatList
        style={{ height: '100%' }}
        data={exercises}
        renderItem={({ item }) => (
          <DeleteExerciseItem
            item={item}
            onItemSelected={onItemSelected}
            onRemove={() => {
              realm.write(() => {
                realm.delete(item);
              });
            }}
          />
        )}
        ItemSeparatorComponent={ListSeparator}
      />
    </Screen>
  );
};

const MenuIcons: React.FC<{ onPlus: () => void }> = ({ onPlus }) => {
  return <IconButton name="plus" onPress={onPlus} />;
};

export const options = ({ navigation }: NavParams) => {
  return {
    title: 'Exercises',
    headerRight: () => (
      <MenuIcons onPlus={() => navigation.navigate('exercises-add-exercise')} />
    ),
  };
};

export default ExercisesScreen;
