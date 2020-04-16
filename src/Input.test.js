import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Input from "./input";
import { checkProps} from "../test/utils";
import LanguageContext from "./contexts/LanguageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

describe('Input', () => {
  const setup = ({secretWord, language, success}) => {
    secretWord = secretWord || 'party';
    language = language || 'en';
    success = success || false;
    return render(
      <LanguageContext.Provider value={language}>
        <successContext.SuccessProvider value={[success, jest.fn()]}>
          <guessedWordsContext.GuessedWordsProvider>
            <Input  secretWord={secretWord}/>
          </guessedWordsContext.GuessedWordsProvider>
        </successContext.SuccessProvider>
      </LanguageContext.Provider>
    )
  }

  test('renders without error', () => {
    const { queryByTestId } = setup({});
    const component = queryByTestId('component-input');
    expect(component).toBeTruthy();
  });

  test('Does not throw a warning with expected props', () => {
    checkProps(Input, {secretWord: 'party'});
  });

  describe('state controlled input field', () => {
    let mockSetCurrentGuess = jest.fn();;
    let queryByTestId;
    beforeEach(()=> {
      mockSetCurrentGuess.mockClear();
      React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
      ({ queryByTestId } = setup({}));
    });
    test('state updates with value of input box upon change', () => {
      const inputBox = queryByTestId('input-box');
      const mockEvent = { target: {value: 'train'}};

      fireEvent.change(inputBox, mockEvent);

      expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');

    })
    test('sets currentGuess to an empty string when called', () => {
      const submitBtn = queryByTestId('submit-button');
      userEvent.click(submitBtn, { preventDefault() {}});

      expect(mockSetCurrentGuess).toHaveBeenCalledWith('');

    })
  });

  describe('languagepicker', () => {
    test('Correctly renders submit string in english', () => {
      const {queryByTestId } = setup({});
      const component = queryByTestId('submit-button');
      expect(component.textContent).toBe('Submit');
    });

    test('Correctly renders submit string in emoji', () => {
      const {queryByTestId } = setup({secretWord: 'party', language: 'emoji'});
      const component = queryByTestId('submit-button');
      expect(component.textContent).toBe('🚀');
    });

    test('Correctly renders the placeholder in english', () =>{
      const {queryByTestId } = setup({});
      const component = queryByTestId('input-box');
      expect(component.placeholder).toBe('enter guess');
    });

    test('Correctly renders placeholder string in emoji', () => {
      const {queryByTestId } = setup({secretWord: 'party', language: 'emoji'});
      const component = queryByTestId('input-box');
      expect(component.placeholder).toBe('⌨️🤔');
    });
  });

  test('input component does not show when success is true', ()=> {
    const {queryByTestId} = setup({secretWord: 'party', success:true});
    expect(queryByTestId('component-input')).toBeFalsy();
  })

});
