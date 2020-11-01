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

export const saveExercise = (realm: Realm) => async (
  exercise: AddExerciseForm,
) => {
  const id = uuid();

  const value = { ...exercise, id };

  realm.write(() => {
    realm.create(ExerciseSchema.name, value);
  });
};

export const openRealm = () => Realm.open({ schema: [ExerciseSchema] });
