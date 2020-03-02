import * as React from 'react';

type Handler = (e: Event) => void;

export default function useEventListener(
  eventName: string,
  handler: Handler,
  element: Window | Document | HTMLElement = window,
) {
  const savedHandler: React.MutableRefObject<null | Handler> = React.useRef(null);

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const { current } = savedHandler;
    const eventListener = (event: Event) => {
      /* istanbul ignore else */
      if (current) {
        current!(event);
      }
    };

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [element, eventName]);
}
