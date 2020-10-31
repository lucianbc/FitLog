import { useCallback, useEffect, useRef, useState } from 'react';

type Operation<T> = () => Promise<T>;

function useAsyncOperation<T>(
  operation: Operation<T>,
): [boolean, Operation<[boolean, T]>] {
  const isMounted = useRef(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const trigger = useCallback(async () => {
    setIsSending(true);
    try {
      const result = await operation();
      if (isMounted.current) {
        setIsSending(false);
      }
      return [isMounted.current, result] as [boolean, T];
    } catch (e) {
      if (isMounted.current) {
        setIsSending(false);
      }
      throw e;
    }
  }, [operation]);

  return [isSending, trigger];
}

export { useAsyncOperation };
