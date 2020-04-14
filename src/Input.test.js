import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Input from "./input";
import { checkProps} from "../test/utils";

describe('Input', () => {
  const defaultProps = {
    secretWord: 'party'
  };
  const setup = (secretWord='party') => {

    return render(<Input  secretWord={secretWord}/>)
  }

  test('renders without error', () => {
    const { queryByTestId } = setup();
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
      ({ queryByTestId } = setup());
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

});
