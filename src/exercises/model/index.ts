import Realm from 'realm';
import uuid from 'uuid-random';
import { AddExerciseForm } from '../AddExerciseScreen';

const ExerciseSchema: Realm.ObjectSchema = {
  name: 'Exercise',
  properties: {
    name: 'string',
    category: 'string',
    bodyPart: 'string',
    id: 'string',
  },
  primaryKey: 'id',
};

export const saveExercise = async (exercise: AddExerciseForm) => {
  const id = uuid();
  const realm = await Realm.open({ schema: [ExerciseSchema] });

  const value = { ...exercise, id };

  try {
    realm.write(() => {
      realm.create(ExerciseSchema.name, value);
    });
  } finally {
    realm.close();
  }
};
