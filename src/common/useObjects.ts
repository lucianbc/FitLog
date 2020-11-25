import { useEffect, useRef, useState } from 'react';
import { useRealm } from '../components/RealmProvider';
import { cloneDeep } from 'lodash';

export function useObjects<T>(name: string) {
  const realm = useRealm();
  const query = useRef(realm.objects<T>(name));
  const [state, setState] = useState<readonly T[]>([...query.current]);
  useEffect(() => {
    const q = query.current;
    const callback = (data: readonly T[]) => {
      setState([...data]);
    };
    q.addListener(callback);
    return () => {
      q.removeListener(callback);
    };
  }, []);
  return state;
}

export function useClonedObjects<T>(name: string) {
  const realm = useRealm();
  const query = useRef(realm.objects<T>(name));
  const [state, setState] = useState<readonly T[]>(
    query.current.map((x) => deepCloneRealmObject(x)),
  );
  useEffect(() => {
    const q = query.current;
    const callback = (data: readonly (T & Realm.Object)[]) => {
      setState(data.map((x) => deepCloneRealmObject(x)));
    };
    q.addListener(callback);
    return () => {
      q.removeListener(callback);
    };
  }, []);
  return state;
}

function deepCloneRealmObject<T>(realmObject: T & Realm.Object): T {
  const clone: any = {};
  (realmObject.keys() as (keyof Realm.Object)[]).forEach((key) => {
    if (typeof realmObject[key] === 'object') {
      clone[key] = cloneDeep(realmObject[key]);
    } else {
      clone[key] = realmObject[key];
    }
  });

  return clone;
}
