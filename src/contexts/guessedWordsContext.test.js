import React from 'react';
import { render } from '@testing-library/react';

import guessedWordsContext from './guessedWordsContext';

const FunctionalComponent  = () => {
  guessedWordsContext.useGuessedWordsContext();
  return <div></div>
}

test('useGuessedWordsContext throws an error if not used in a provider', () => {
  const mock = jest.fn();
  console.error = mock;
  expect(() => render(<FunctionalComponent/>)).toThrow('useGuessedWordsContext must be used within a GuessedWordsProvider');
});

test('useGuessedWordsContext does not throw error when wrapped in GuessedWordsProver', () => {
  expect(() => {
    render(
      <guessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    )
  }).not.toThrow();
});
