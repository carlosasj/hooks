import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import useLocalStorage from '../src/use-local-storage';

describe('useLocalStorage', () => {
  const Component = () => {
    const [storedValue, setValue] = useLocalStorage('data', { a: 1 });

    const handleClick = React.useCallback(() => {
      setValue({ b: 2 });
    }, [setValue]);

    return (
      <div>
        <h1>{JSON.stringify(storedValue, null, 2)}</h1>
        <button type="button" onClick={handleClick}>
          Update
        </button>
      </div>
    );
  };

  const { container } = render(<Component />);

  it('should render the data and re-render when updated', () => {
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(container.querySelector('button')!);

    expect(container.firstChild).toMatchSnapshot();
  });
});
