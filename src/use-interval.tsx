import * as React from 'react';

type Callback = () => void;

export default function useInterval(callback: Callback, ms: number) {
  const savedCallback: React.MutableRefObject<null | Callback> = React.useRef(null);
  const interval: React.MutableRefObject<null | number> = React.useRef(null);

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    interval.current = window.setInterval(() => {
      /* istanbul ignore else */
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, ms);

    return () => {
      clearInterval(interval.current!);
    };
  }, [ms]);

  return React.useCallback(() => {
    clearInterval(interval.current!);
  }, []);
}
