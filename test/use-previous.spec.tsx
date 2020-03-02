import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import usePrevious from '../src/use-previous';

const mockCallback = jest.fn();

describe('usePrevious', () => {
  const Component = ({ cb }: any) => {
    const [id, setId] = React.useState(1241);
    const previousId = usePrevious(id);

    React.useEffect(() => {
      if (previousId && previousId === 1241) {
        cb();
      }
    }, [id, previousId]);

    const handleClick = React.useCallback(() => {
      setId(1192);
    }, []);

    return (
      <div>
        <h1>{id}</h1>
        <button type="button" onClick={handleClick}>
          Update
        </button>
      </div>
    );
  };

  const { getByText } = render(<Component cb={mockCallback} />);

  it('should re-render the id has changed', () => {
    fireEvent.click(getByText('Update'));
    expect(mockCallback).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText('Update'));
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
