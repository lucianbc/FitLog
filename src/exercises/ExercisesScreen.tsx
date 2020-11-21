import React from 'react';
import { FlatList, Text, View } from 'react-native';
import {
  PanGestureHandler,
  State,
  TouchableHighlight,
} from 'react-native-gesture-handler';
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
import Box from '../components/Box';
import IconButton from '../components/IconButton';
import { useRealm } from '../components/RealmProvider';
import Screen from '../components/Screen';
import { NavParams } from '../navigation/types';
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from 'react-native-redash';
import { Button, Text as NativeText } from 'native-base';
import { Exercise } from '../model';
import { useObjects } from '../common/useObjects';

const snapPoints = [-100, 0];

const AnimatedItem: React.FC<
  {
    item: Exercise;
    onRemove: () => void;
  } & Props
> = ({ item, onRemove, onItemSelected }) => {
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
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <ExerciseItem item={item} onItemSelected={onItemSelected} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const ExerciseItem: React.FC<{ item: Exercise } & Props> = ({
  item,
  onItemSelected,
}) => {
  return (
    <TouchableHighlight
      onPress={onItemSelected ? () => onItemSelected(item) : undefined}>
      <Box
        ph
        pv={12}
        style={{ flexDirection: 'row', backgroundColor: 'white' }}>
        <View style={{ marginRight: 16 }}>
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: '#4b95fe',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 25, color: 'white' }}>
              {item.bodyPart[0]}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{ fontSize: 20 }}>{`${item.name} (${item.category})`}</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, color: '#5a5a5a' }}>
            {item.bodyPart}
          </Text>
        </View>
      </Box>
    </TouchableHighlight>
  );
};

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
          <AnimatedItem
            item={item}
            onItemSelected={onItemSelected}
            onRemove={() => {
              realm.write(() => {
                realm.delete(item);
              });
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
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
