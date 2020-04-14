import React from 'react';
import { render } from '@testing-library/react';
import checkPropTypes from 'check-prop-types';

import Congrats from './congrats';
import {checkProps} from '../test/utils';

describe('<Congrats/>', () => {

  const defaultProps = { success: false };
  /**
   * @function setup
   * @param {object} props
   * @returns {RenderResult}
   */
  const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props };
    return render(<Congrats {...setupProps} />);
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

  test('doesn not throw a warning with expected props', () => {
    const expectedProps = { success: false};
    checkProps(Congrats, expectedProps);
  })
});

