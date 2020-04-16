import React from 'react';
import { render } from '@testing-library/react';

import Congrats from './congrats';
import LanguageContext from "./contexts/LanguageContext";
import successContext from "./contexts/successContext";

describe('<Congrats/>', () => {

  /**
   * @function setup
   * @param {object} testValues - Context values specific to this setup.
   * @returns {RenderResult}
   */
  const setup = ({ success, language}) => {
    language = language || 'en';
    return render(
      <LanguageContext.Provider value={language}>
        <successContext.SuccessProvider value={[success, jest.fn()]}>
          <Congrats />
        </successContext.SuccessProvider>
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

  test('renders no text when `success` is false', () => {
    const { queryByTestId } = setup({success: false});
    const component = queryByTestId('component-congrats')
    expect(component.textContent).toBe('');
  });

  test('render non-empty congrats message when `success` is true', () => {
    const { queryByTestId } = setup({success: true});
    const message = queryByTestId('congrats-message');
    expect(message.textContent.length).not.toBe(0);
  });

});

