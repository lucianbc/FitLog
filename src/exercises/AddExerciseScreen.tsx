import { Button, Text } from 'native-base';
import React, { useState } from 'react';
import Collection from '../components/Collection';
import { Element, TextField } from '../components/form';
import Picker from '../components/form/Picker';
import Screen from '../components/Screen';
import { BodyPart, BodyParts, Categories, Category } from '../model';

interface AddExerciseForm {
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
  const [category, setCategory] = useState<Category>();
  const [bodyPart, setBodyPart] = useState<BodyPart>();

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
      <Button full style={{ marginTop: 'auto' }}>
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
