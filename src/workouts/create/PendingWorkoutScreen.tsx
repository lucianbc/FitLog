import {
  Button,
  Input,
  Item,
  Text,
  Label,
  Textarea,
  View,
  H3,
} from 'native-base';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import Collection from '../../components/Collection';
import Screen from '../../components/Screen';
import { ExerciseRecord } from '../../model';
import { useWorkoutOps } from './CreateWorkoutProvider';

const PendingWorkoutScreen = ({ navigation }: any) => {
  const workoutOps = useWorkoutOps();
  return (
    <Screen
      style={{
        flexDirection: 'column',
        flex: 1,
      }}>
      <FlatList
        ListHeaderComponent={() => (
          <Collection atEnd spacing={8}>
            <Item stackedLabel>
              <Label>Workout Name</Label>
              <Input />
            </Item>

            <Textarea
              rowSpan={5}
              placeholder="Workout notes"
              underline
              bordered
            />

            <Button
              bordered
              full
              onPress={() => {
                navigation.navigate('exercises-add-exercise');
              }}>
              <Text>Add Exercise</Text>
            </Button>
          </Collection>
        )}
        data={workoutOps.exercises}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => (
          <ExerciseWidget exercise={item} updateFn={workoutOps.updateRecord} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={SaveButton}
      />
    </Screen>
  );
};

const SaveButton = () => {
  const workoutOps = useWorkoutOps();
  if (workoutOps.exercises.length === 0) {
    return null;
  }
  return (
    <Button full style={{ marginTop: 12 }}>
      <Text>Save</Text>
    </Button>
  );
};

const ExerciseWidget: React.FC<{
  exercise: ExerciseRecord;
  updateFn: ReturnType<typeof useWorkoutOps>['updateRecord'];
}> = ({ exercise, updateFn }) => {
  const triggerUpdate = useCallback(
    (change: (x: number) => ExerciseRecord) => (value: string) => {
      try {
        const x = parseInt(value, 10);
        const newInstance = change(x);
        console.debug('Previous', exercise);
        console.debug('Update', newInstance);
        updateFn({ previous: exercise, update: newInstance });
      } catch {}
    },
    [exercise, updateFn],
  );
  return (
    <View>
      <H3>{`${exercise.name} - ${exercise.category}`}</H3>
      <Item inlineLabel>
        <Label>Sets</Label>
        <Input
          keyboardType="numeric"
          value={exercise.sets?.toString()}
          onChangeText={triggerUpdate((x) => ({ ...exercise, sets: x }))}
        />
      </Item>
      <Item inlineLabel>
        <Label>Reps</Label>
        <Input
          keyboardType="numeric"
          value={exercise.reps?.toString()}
          onChangeText={triggerUpdate((x) => ({ ...exercise, reps: x }))}
        />
      </Item>
      <Item inlineLabel>
        <Label>Rest between sets</Label>
        <Input
          keyboardType="numeric"
          value={exercise.restBetweenSets?.toString()}
          onChangeText={triggerUpdate((x) => ({
            ...exercise,
            restBetweenSets: x,
          }))}
        />
      </Item>
      <Item inlineLabel>
        <Label>Rest between reps</Label>
        <Input
          keyboardType="numeric"
          value={exercise.restBetweenReps?.toString()}
          onChangeText={triggerUpdate((x) => ({
            ...exercise,
            restBetweenReps: x,
          }))}
        />
      </Item>
    </View>
  );
};

export const options = {
  title: 'Create',
};

export default PendingWorkoutScreen;
