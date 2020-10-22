import React from 'react';
import { Text, TextInput, TextProps } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Collection from '../components/Collection';
import Screen from '../components/Screen';

const Label: React.FC<TextProps & { text: string }> = (props) => (
  <Text {...props} style={[styles.label, [props.style]]}>
    {props.text}
  </Text>
);

const Element: React.FC<{ label: string; children?: React.ReactNode }> = ({
  label,
  children,
}) => (
  <>
    <Label text={label} style={{ marginBottom: 4 }} />
    {children}
  </>
);

const Picker = () => {
  return (
    <TouchableWithoutFeedback
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextInput
        style={[
          styles.textField,
          {
            borderBottomWidth: 0,
            flex: 1,
          },
        ]}
        placeholder="ASD"
        editable={false}
      />
      <Icon name="downcircle" size={16} />
    </TouchableWithoutFeedback>
  );
};

const AddExerciseScreen = () => {
  return (
    <Screen>
      <Collection spacing={12}>
        <Element label="Exercise Name">
          <TextInput style={styles.textField} placeholder="Biceps Curl" />
        </Element>
        <Element label="Category">
          <Picker />
        </Element>
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
