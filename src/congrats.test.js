import React from 'react';
import { render } from '@testing-library/react';

import Congrats from './congrats';

describe('<Congrats/>', () => {

  /**
   * @function setup
   * @param {object} props
   * @returns {RenderResult}
   */
  const setup = (props = {}) => {
    return render(<Congrats {...props} />);
  }
  test('renders without error', () =>{
    const { queryByTestId } = setup();
    const component = queryByTestId('component-congrats')
    expect(component).toBeTruthy();
  });

  test('renders no text when `success` prop is false', () => {
    const { queryByTestId } = setup({success: false});
    const component = queryByTestId('component-congrats')
    expect(component.textContent).toBe('');
  });

  test('render non-empty congrats message when `success` prop is true', () => {
    const { queryByTestId } = setup({success: true});
    const message = queryByTestId('congrats-message');
    expect(message.textContent.length).not.toBe(0);
  });
});

