import { useEffect, useState } from 'react';

export function useRequest<T>(request: () => Promise<T>, defaultValue: T) {
  const [state, setState] = useState({
    value: defaultValue,
    error: null as any,
    isPending: true,
  });
  useEffect(() => {
    let isSubscribed = true;
    request()
      .then((value) => {
        if (isSubscribed) {
          setState({ value, error: null, isPending: false });
        }
      })
      .catch((error) => {
        if (isSubscribed) {
          setState({ value: defaultValue, error, isPending: false });
        }
      });
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return state;
}
