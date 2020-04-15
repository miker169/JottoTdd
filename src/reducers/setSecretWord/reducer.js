import React from 'react';

/**
 * reducer to update state
 * @param state {Object}
 * @param type {String}
 * @param payload {String}
 *
 * return {Object} = new state
 */
export const reducer = (state, {type, payload}) => {
  switch(type){
    case "setSecretWord":
      return {...state, secretWord: payload}
    case "setLanguage":
      return { ...state, language: payload}
    default:
      throw new Error(`Invalid action type: ${type}`)
  }
}
