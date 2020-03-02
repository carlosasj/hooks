import * as React from 'react';

interface Options {
  async?: boolean;
  defer?: boolean;
  id?: string;
}

export default function useScript(src: string, options: Options = {}) {
  const canUseDOM = typeof window === 'object';

  const [state, setState] = React.useState({
    loaded: false,
    error: false,
  });

  React.useEffect(
    () => {
      if (!canUseDOM) {
        return undefined;
      }
      const id = options.id || src;

      // If script already loaded, skip
      if (document.getElementById(id)) {
        setState({
          loaded: true,
          error: false,
        });

        return undefined;
      }

      // Create script
      const script = document.createElement('script');
      script.async = options.async || true;
      script.defer = options.defer || false;
      script.id = id;
      script.src = src;

      // Script event listener callbacks for load and error
      const onScriptLoad = () => {
        setState({
          loaded: true,
          error: false,
        });
      };

      const onScriptError = () => {
        script.remove();

        setState({
          loaded: true,
          error: true,
        });
      };

      script.addEventListener('load', onScriptLoad);
      script.addEventListener('error', onScriptError);

      // Add script to document body
      document.body.appendChild(script);

      // Remove event listeners on cleanup
      return () => {
        script.removeEventListener('load', onScriptLoad);
        script.removeEventListener('error', onScriptError);
      };
    },
    [canUseDOM, options, src], // Only re-run effect if script src changes
  );

  return [state.loaded, state.error];
}
