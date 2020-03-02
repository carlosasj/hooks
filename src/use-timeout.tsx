import * as React from 'react';

type Callback = () => void;

export default function useTimeout(callback: Callback, ms = 1000) {
  const savedCallback: React.MutableRefObject<null | Callback> = React.useRef(null);
  const timeout: React.MutableRefObject<null | number> = React.useRef(null);

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  React.useEffect(() => {
    timeout.current = window.setTimeout(() => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, ms);

    return () => {
      clearTimeout(timeout.current!);
    };
  }, [ms]);

  return React.useCallback(() => {
    clearTimeout(timeout.current!);
  }, []);
}
