import React from "react";
import {reducer} from "./reducer";

describe('reducer', () => {
  test('secretword state updates for action "setSecretWord"', () => {
    const oldState = { secretWord: '', language: 'en' };
    const action = { type: 'setSecretWord', payload: 'newSecretWord'};
    const newState = reducer(oldState, action);
    expect(newState).toMatchObject({secretWord: 'newSecretWord', language: 'en'});
  })
})
