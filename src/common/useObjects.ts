import { useEffect, useRef, useState } from 'react';
import { useRealm } from '../components/RealmProvider';

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
