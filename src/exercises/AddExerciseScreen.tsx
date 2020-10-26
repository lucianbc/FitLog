import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'native-base';
import React, { useState } from 'react';
import Collection from '../components/Collection';
import { Element, TextField } from '../components/form';
import Picker from '../components/form/Picker';
import Screen from '../components/Screen';
import { BodyPart, BodyParts, Categories, Category } from '../model';
import { addExercise } from './service/addExercise';

export interface AddExerciseForm {
  name: string;
  category: Category;
  bodyPart: BodyPart;
}

const placeholders: AddExerciseForm = {
  name: 'Biceps Curl',
  category: Categories[0],
  bodyPart: BodyParts[0],
};

const AddExerciseScreen = () => {
  const [name, setName] = useState<string>();
  const [category, setCategory] = useState<Category>(placeholders.category);
  const [bodyPart, setBodyPart] = useState<BodyPart>(placeholders.bodyPart);
  const nav = useNavigation();

  const performOperation = async () => {
    if (name && category && bodyPart) {
      await addExercise({ name, category, bodyPart });
      nav.goBack();
    }
  };

  return (
    <Screen
      style={{
        flex: 1,
      }}>
      <Collection spacing={12}>
        <Element label="Exercise Name">
          <TextField
            style={styles.textField}
            placeholder={placeholders.name}
            value={name}
            onChangeText={setName}
          />
        </Element>
        <Element label="Category">
          <Picker
            choices={Categories}
            value={category || placeholders.category}
            title={'Category'}
            // @ts-ignore
            onPress={setCategory}
          />
        </Element>
        <Element label="Muscle Group">
          <Picker
            choices={BodyParts}
            value={bodyPart || placeholders.bodyPart}
            title={'Muscle Group'}
            // @ts-ignore
            onPress={setBodyPart}
          />
        </Element>
      </Collection>
      <Button full style={{ marginTop: 'auto' }} onPress={performOperation}>
        <Text>Save</Text>
      </Button>
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
