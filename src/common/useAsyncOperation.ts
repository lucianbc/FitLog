import { useCallback, useEffect, useRef, useState } from 'react';

function useAsyncOperation<R, T extends (...args: any[]) => Promise<R>>(
  operation: T,
): [boolean, (...args: Parameters<typeof operation>) => Promise<[boolean, R]>] {
  const isMounted = useRef(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const trigger = useCallback(
    async (...args: Parameters<typeof operation>) => {
      setIsSending(true);
      try {
        const result = await operation(...args);
        if (isMounted.current) {
          setIsSending(false);
        }
        return [isMounted.current, result] as [boolean, R];
      } catch (e) {
        if (isMounted.current) {
          setIsSending(false);
        }
        throw e;
      }
    },
    [operation],
  );

  return [isSending, trigger];
}

export { useAsyncOperation };
