import firestore from '@react-native-firebase/firestore';
import { AddExerciseForm } from '../AddExerciseScreen';
import uuid from 'uuid-random';

export async function addExercise(exercise: AddExerciseForm) {
  const id = uuid();
  return firestore()
    .collection('Exercises')
    .doc(id)
    .set({ id, ...exercise });
}
