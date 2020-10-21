import React from 'react';
import { Text, TextInput, TextProps } from 'react-native';
import Collection from '../components/Collection';
import Screen from '../components/Screen';

const Label: React.FC<TextProps & { text: string }> = (props) => (
  <Text {...props} style={[styles.label, [props.style]]}>
    {props.text}
  </Text>
);

const AddExerciseScreen = () => {
  return (
    <Screen>
      <Collection spacing={4}>
        <Label text="Exercise Name" />
        <TextInput style={styles.textField} placeholder="Biceps Curl" />
        <Label text="Category" />
      </Collection>
    </Screen>
  );
};

const styles = {
  label: {
    fontSize: 16,
  },
  textField: {
    width: '100%',
    fontSize: 24,
    borderBottomWidth: 1,
  },
};

export const options = {
  title: 'Add Exercise',
};

export default AddExerciseScreen;
