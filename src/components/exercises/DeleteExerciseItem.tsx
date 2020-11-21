import React from 'react';
import { Exercise } from '../../model';
import { ExerciseItem } from './ExerciseItem';
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from 'react-native-redash';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  add,
  call,
  clockRunning,
  cond,
  eq,
  not,
  set,
  useCode,
} from 'react-native-reanimated';
import { View } from 'react-native';
import { Button, Text as NativeText } from 'native-base';

const snapPoints = [-100, 0];

export const DeleteExerciseItem: React.FC<{
  item: Exercise;
  onRemove: () => void;
  onItemSelected?: (item: Exercise) => void;
}> = ({ item, onRemove, onItemSelected }) => {
  const {
    gestureHandler,
    translation,
    state,
    velocity,
  } = usePanGestureHandler();
  const translateX = useValue(0);
  const offsetX = useValue(0);
  const to = snapPoint(translateX, velocity.x, snapPoints);
  const shouldRemove = useValue<number>(0);
  const clock = useClock();
  const height = useValue<number>(-1);
  const measuredHeight = useValue<number>(0);
  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(translateX, add(offsetX, translation.x, 0)),
      ),
      cond(eq(state, State.END), [
        set(translateX, timing({ from: translateX, to })),
        set(offsetX, translateX),
      ]),
      cond(eq(shouldRemove, 1), [
        set(height, timing({ from: measuredHeight, to: 0, clock })),
        cond(not(clockRunning(clock)), [
          call([], onRemove),
          set(shouldRemove, 0),
        ]),
      ]),
    ],
    [onRemove],
  );
  return (
    <Animated.View
      style={{ height, overflow: 'hidden' }}
      onLayout={(e) => {
        measuredHeight.setValue(e.nativeEvent.layout.height);
      }}>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          height: '100%',
        }}>
        <Button
          danger
          style={{ height: '100%', borderRadius: 0 }}
          onPress={() => shouldRemove.setValue(1)}>
          <NativeText>Delete</NativeText>
        </Button>
      </View>
      <PanGestureHandler {...gestureHandler} activeOffsetX={-20}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <ExerciseItem item={item} onItemSelected={onItemSelected} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
