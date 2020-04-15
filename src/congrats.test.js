import React from 'react';
import { render } from '@testing-library/react';

import Congrats from './congrats';
import {checkProps} from '../test/utils';
import LanguageContext from "./contexts/LanguageContext";

describe('<Congrats/>', () => {

 // const defaultProps = { success: false };
  /**
   * @function setup
   * @param {object} testValues - Context values specific to this setup.
   * @returns {RenderResult}
   */
  const setup = ({ success, language}) => {
    language = language || 'en';
    success = success || false;
    return render(
      <LanguageContext.Provider value={language}>
        <Congrats success={success} />
      </LanguageContext.Provider>
    )
  }

  describe('languagePicker', () => {
    test('correctly renders congrats in english', () => {
      const { queryByTestId } = setup({success: true});
      const component = queryByTestId('congrats-message');
      expect(component.textContent).toBe('Congratulations! You guessed the word!');
    });

    test('correctly renders congrats in emoji', () => {
      const { queryByTestId } = setup({success: true, language: 'emoji'});
      const component = queryByTestId('congrats-message');
      expect(component.textContent).toBe('🎯🎉');
    });
  });
  test('renders without error', () =>{
    const { queryByTestId } = setup({success: false});
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

