import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'native-base';
import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useClonedObjects } from '../../common/useObjects';
import Box from '../../components/Box';
import { ExerciseItem } from '../../components/exercises/ExerciseItem';
import ListSeparator from '../../components/ListSeparator';
import Screen from '../../components/Screen';
import { Exercise } from '../../model';
import { useWorkoutOps } from './CreateWorkoutProvider';

const Exercises = () => {
  type M = Exercise;
  const workout = useWorkoutOps();
  const navigation = useNavigation();
  const exercises = useClonedObjects<M>('Exercise');

  const [selectedExercises, setSelectedExercises] = useState<M[]>([]);

  const isSelected = useCallback(
    (itemId: string) => !!selectedExercises.find((v) => v.id === itemId),
    [selectedExercises],
  );

  return (
    <Screen ph={0} pv={0} style={{ flex: 1 }}>
      <FlatList
        style={{ height: '100%' }}
        contentContainerStyle={{ paddingBottom: 100 }}
        data={exercises}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => {
          const itemSelected = isSelected(item.id);
          return (
            <ExerciseItem
              item={item}
              onItemSelected={
                itemSelected
                  ? (i) =>
                      setSelectedExercises((ex) =>
                        ex.filter((v) => v.id !== i.id),
                      )
                  : (i) => setSelectedExercises((ex) => [...ex, i])
              }
              style={itemSelected ? { backgroundColor: '#a4e2ff' } : undefined}
            />
          );
        }}
        ItemSeparatorComponent={ListSeparator}
      />

      {selectedExercises.length > 0 && (
        <Box ph pv style={{ width: '100%', position: 'absolute', bottom: 0 }}>
          <Button
            full
            onPress={() => {
              selectedExercises.forEach(workout.addExercise);
              navigation.goBack();
            }}>
            <Text>{`Save (${selectedExercises.length})`}</Text>
          </Button>
        </Box>
      )}
    </Screen>
  );
};

export default Exercises;
