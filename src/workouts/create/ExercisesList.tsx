import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'native-base';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useObjects } from '../../common/useObjects';
import Box from '../../components/Box';
import { ExerciseItem } from '../../components/exercises/ExerciseItem';
import ListSeparator from '../../components/ListSeparator';
import Screen from '../../components/Screen';
import { Exercise } from '../../model';
import { useWorkoutOps } from './CreateWorkoutProvider';

const Exercises = () => {
  const workout = useWorkoutOps();
  const navigation = useNavigation();
  const exercises = useObjects<Exercise>('Exercise');

  const isSelected = useCallback(
    (itemId: string) => !!workout.exercises.find((v) => v.id === itemId),
    [workout.exercises],
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
                itemSelected ? workout.removeExercise : workout.addExercise
              }
              style={itemSelected ? { backgroundColor: '#a4e2ff' } : undefined}
            />
          );
        }}
        ItemSeparatorComponent={ListSeparator}
      />

      {workout.exercises.length > 0 && (
        <Box ph pv style={{ width: '100%', position: 'absolute', bottom: 0 }}>
          <Button full onPress={navigation.goBack}>
            <Text>{`Save (${workout.exercises.length})`}</Text>
          </Button>
        </Box>
      )}
    </Screen>
  );
};

export default Exercises;
