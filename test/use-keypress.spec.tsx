import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import useKeyPress from '../src/use-keypress';

describe('useKeyPress', () => {
  const Component = () => {
    const happyPress = useKeyPress('h');
    const sadPress = useKeyPress('s');

    return (
      <div>
        {happyPress && 'happy'}
        {sadPress && 'sad'}
      </div>
    );
  };

  const { container } = render(<Component />);

  it('should re-render when the key is pressed', () => {
    expect(container.querySelector('div')).toHaveTextContent('');

    fireEvent.keyDown(window, { key: 'h' });
    expect(container.querySelector('div')).toHaveTextContent('happy');
    fireEvent.keyUp(window, { key: 'h' });

    fireEvent.keyDown(window, { key: 's' });
    expect(container.querySelector('div')).toHaveTextContent('sad');
    fireEvent.keyUp(window, { key: 's' });

    expect(container.querySelector('div')).toHaveTextContent('');
  });
});
