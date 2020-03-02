import * as React from 'react';

export default function usePrevious(value: any): any {
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
