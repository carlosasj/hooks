import * as React from 'react';

export default function useKeyPress(targetKey: string, element = window) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = React.useState(false);

  // If pressed key is our target key then set to true
  const downHandler = React.useCallback(
    ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    },
    [targetKey],
  );

  // If released key is our target key then set to false
  const upHandler = React.useCallback(
    ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey],
  );

  // Add event listeners
  React.useEffect(() => {
    element.addEventListener('keydown', downHandler);
    element.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      element.removeEventListener('keydown', downHandler);
      element.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, element, upHandler]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
