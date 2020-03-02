import * as React from 'react';

export default function useWindowSize() {
  const canUseDOM = typeof window === 'object';

  const getSize = React.useCallback(
    () => ({
      width: canUseDOM ? window.innerWidth : undefined,
      height: canUseDOM ? window.innerHeight : undefined,
    }),
    [canUseDOM],
  );

  const [windowSize, setWindowSize] = React.useState(getSize);

  React.useEffect(() => {
    if (!canUseDOM) {
      return undefined;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [canUseDOM, getSize]); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
