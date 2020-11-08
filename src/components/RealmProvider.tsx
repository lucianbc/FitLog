import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { openRealm } from '../exercises/model';

const ExercisesCtx = React.createContext<{ realm?: Realm }>({
  realm: undefined,
});

export function useRealm() {
  const ctx = useContext(ExercisesCtx);
  if (!ctx.realm) {
    throw Error(
      'Realm is undefined. Make sure you are using the useRealm hook inside a Provider',
    );
  }
  return ctx.realm!;
}

const RealmProvider = ({ children }: { children: any }) => {
  const realmRef = useRef<Realm>();
  const [initialised, setInitialised] = useState(false);
  useEffect(() => {
    console.debug('Realm initialising');
    let isMounted = true;
    async function loadRealm() {
      realmRef.current = await openRealm();
      if (!isMounted) {
        realmRef.current.close();
        return;
      }
      setInitialised(true);
    }
    loadRealm();
    return () => {
      console.debug('Realm cleanup');
      if (realmRef.current && !realmRef.current.isClosed) {
        console.debug('Realm actually closed');
        realmRef.current.close();
      }
      isMounted = false;
    };
  }, []);

  if (initialised) {
    return (
      <ExercisesCtx.Provider value={{ realm: realmRef.current }}>
        {children}
      </ExercisesCtx.Provider>
    );
  } else {
    return (
      <View>
        <Text>Loading realm</Text>
      </View>
    );
  }
};

export default RealmProvider;
