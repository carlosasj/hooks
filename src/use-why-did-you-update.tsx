import { useEffect, useRef, useState } from 'react';

type Changes<T> = {
  [K in keyof T]?: {
    from: any;
    to: any;
  };
};

interface Options {
  name?: string;
  skipLog?: boolean;
}

export default function useWhyDidYouUpdate<K extends keyof T, T extends object = any>(
  props: T,
  options: string | Options = {},
) {
  const [changes, setChanges] = useState<Changes<T>>({});
  const previousProps = useRef<T>();

  const { name, skipLog = false } = typeof options === 'string' ? { name: options } : options;

  useEffect(() => {
    const { current } = previousProps;

    setChanges({});

    if (current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props }) as K[];

      // Use this object to keep track of changed props
      const changesObj = {};

      // Iterate through keys
      allKeys.forEach(key => {
        if (current[key] !== props[key]) {
          // @ts-ignore
          changesObj[key] = {
            from: current[key],
            to: props[key],
          };
        }
      });

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        setChanges(changesObj);

        if (!skipLog) {
          console.log(`[why-did-you-update${name ? `: ${name}}` : ''}]`, changesObj); //eslint-disable-line no-console
        }
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  }, [name, props, skipLog]);

  return Object.keys(changes).length ? changes : false;
}
