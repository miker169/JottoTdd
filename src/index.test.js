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
    test('state updates with value of input box upon change', () => {
      const mockSetCurrentGuess = jest.fn();
      React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

      const { queryByTestId } = setup();
      const inputBox = queryByTestId('input-box');

      const mockEvent = { target: {value: 'train'}};

      fireEvent.change(inputBox, mockEvent);

      expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');

    })
  })
})
