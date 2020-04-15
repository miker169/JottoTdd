import React from "react";
import { render } from '@testing-library/react'

import App from "./App";
import hookActions from "./actions/hookActions";

const mockGetSecretWord = jest.fn();

/**
 * Setup function for app component
 * @param {string } secretWord -desired secretWord state for value of test
 * @returns {RenderResult}
 */
const setup = (secretWord="party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn()
    .mockReturnValue([
      { secretWord, language: 'en' },
      jest.fn()
    ]);

    React.useReducer = mockUseReducer;

  return render(<App/>);
}

describe('App', () => {

  test('it renders without crashing', () => {
    const {queryByTestId} = setup();
    const component = queryByTestId('component-app');
    expect(component).toBeTruthy();
  });

  describe('getSecretWord', () => {
    test('Gets called on App mount', () => {
      setup();
      // check to see if secret word was updated.
      expect(mockGetSecretWord).toHaveBeenCalled();
    });
    test('Does not get on rerender', () => {
      // App is rendered and mockGetSecretWord gets calles
      const { rerender} = setup();
      // Clear down our mock
      mockGetSecretWord.mockClear();
      // Rerender the app with the same props
      rerender(<App/>);
      expect(mockGetSecretWord).not.toHaveBeenCalledWith();
    });
  });

  describe('When secretWord is not  null', () => {
    let queryByTestId;
    beforeEach(() => {
      ({queryByTestId} = setup("party"));
    });
    test('renders app', () => {
      const appComponent = queryByTestId('component-app');
      expect(appComponent).toBeTruthy();
    });
    test('does not render spinner', () => {
      const spinnerComponent = queryByTestId('component-spinner');
      expect(spinnerComponent).toBeFalsy();
    });
  })

  describe('When secretWord is null', () => {
    let queryByTestId;
    beforeEach(() => {
      ({queryByTestId} = setup(null));
    });

    test('does not render app', () => {
      const appComponent = queryByTestId('component-app');
      expect(appComponent).toBeFalsy();
    });

    test('renders spinner', () => {
      const spinnerComponent = queryByTestId('spinner');
      expect(spinnerComponent).toBeTruthy();
    });
  })

  describe('languagePicker', () => {

  });

});
