import React from 'react';
import { render } from '@testing-library/react';

import GuessedWords from "./GuessedWords";
import { checkProps } from "../test/utils";

describe('<GuessedWords/>', () => {

  const defaultProps = {
   guessedWords: [{guessedWord: 'train', letterMatchCount: 3}],
  };

  const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props};
    return render(<GuessedWords {...setupProps }/>);
  }

  test('does not throw warning with expected props', () => {
    checkProps(GuessedWords, defaultProps);
  });

  describe('if there are no words guessed', () => {
    let queryByTestId;
    beforeEach(() => {
      queryByTestId = setup({guessedWords: []}).queryByTestId;
    });
    test('renders without error', () => {
      const component = queryByTestId('component-guessed-words');
      expect(component).toBeTruthy()
    })

    test('renders instructions to guess a word', () => {
      const instructions = queryByTestId('guess-instructions');
      expect(instructions.textContent.length).not.toBe(0)
    });
  });

  describe('if there are words guessed', () => {

  });
});
