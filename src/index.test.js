import React from 'react';
import { render } from '@testing-library/react';
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
})
