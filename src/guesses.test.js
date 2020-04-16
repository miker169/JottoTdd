import React from 'react';
import {fireEvent, render} from "@testing-library/react";

import Input from "./input";
import GuessedWords from "./GuessedWords";

import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import userEvent from "@testing-library/user-event";

describe('Simulated guesses', () => {

  const setup = (guessedWordsStrings=[],secretWord="party") => {
    const {queryByTestId, queryAllByTestId} =render(
      <guessedWordsContext.GuessedWordsProvider>
        <successContext.SuccessProvider>
          <Input secretWord={secretWord} />
          <GuessedWords />
        </successContext.SuccessProvider>
      </guessedWordsContext.GuessedWordsProvider>
      )
      const inputBox = queryByTestId('input-box');
      const submitButton = queryByTestId('submit-button');

      guessedWordsStrings.map(word => {
        const mockEvent = {target: {value: word}};
        fireEvent.change(inputBox, mockEvent);
        userEvent.click(submitButton);
      })

      return [ inputBox, submitButton, queryByTestId, queryAllByTestId];
  }


  describe('test word guess', () => {

    describe('non empty guessed words', () => {
      let inputBox, submitButton, queryByTestId, queryAllByTestId

      beforeEach(() => {
        [ inputBox, submitButton, queryByTestId, queryAllByTestId] = setup(["agile"], "party");
      })

      describe('correct guess', () => {
        beforeEach(() => {
          const mockEvent = { target: { value: 'party'}};
          fireEvent.change(inputBox, mockEvent);
          userEvent.click(submitButton);
        });

        test('Input component contains no children', () => {
          const inputComponent = queryByTestId('component-input');
          expect(inputComponent).toBeFalsy();
        });

        test('GuessedWords table row count reflects updated guess', () => {
          const guessedWordsTableRows = queryAllByTestId('guessed-word');
          expect(guessedWordsTableRows.length).toBe(2);
        });
      });

      describe('incorrect guess', () => {
        beforeEach(() => {
          const mockEvent = { target: {value: 'train'}};
          fireEvent.change(inputBox, mockEvent);
          userEvent.click(submitButton);
        })

        test('Input box remains', () => {
          expect(inputBox).toBeTruthy();
        });

        test('GuessedWords table row count reflects updated guess', () => {
          const guessedWordsTableRows = queryAllByTestId('guessed-word');
          expect(guessedWordsTableRows.length).toBe(2);
        });
      });
    });

    describe('empty guessed words', () => {
      let inputBox, submitButton ,queryByTestId, queryAllByTestId;

      beforeEach(() => {
        [inputBox, submitButton, queryByTestId, queryAllByTestId]
          = setup([], 'party')
      })

      describe('correct guess', () => {
        beforeEach(() => {
          const mockEvent = {target: { value: 'party'}};
          fireEvent.change(inputBox, mockEvent);
          userEvent.click(submitButton);
        });

        test('Input component gets removed', () => {
          const inputComponent = queryByTestId('component-input');
          expect(inputComponent).toBeFalsy();
        });

        test('GuessedWords contains one row', () => {
          const guessedWordRows = queryAllByTestId('guessed-word');
          expect(guessedWordRows.length).toBe(1);
        });
      })

      describe('incorrect guess', () => {
        beforeEach(() => {
          const mockEvent = {target: { value: 'train'}};
          fireEvent.change(inputBox, mockEvent);
          userEvent.click(submitButton);
        });

        test('Input Component still exists', () => {
          const inputComponent = queryByTestId('component-input');
          expect(inputComponent).toBeTruthy();
        });

        test('GuessedWords contains one row', () => {
          const guessedWordRows = queryAllByTestId('guessed-word');
          expect(guessedWordRows.length).toBe(1);
        });
      })
    });



  })


});
