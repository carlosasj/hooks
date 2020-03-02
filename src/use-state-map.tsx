import { useCallback, useState } from 'react';

type Updater<T> = (input: Partial<T>) => void;

export default function useStateMap<T extends object = any>(initialState: T): [T, Updater<T>] {
  const [state, setState] = useState(initialState);

  const updateState = useCallback(input => {
    setState(s => ({
      ...s,
      ...input,
    }));
  }, []);

  return [state, updateState];
}
