import React from 'react';
import { render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { checkProps} from "../test/utils";
import LanguagePicker from "./LanguagePicker";

describe('<LanguagePicker/>', () => {

  const mockSetLanguage = jest.fn();

  const setup = () => {
    return render(<LanguagePicker setLanguage={mockSetLanguage}/> );
  }

  test('renders without error', () => {
    const {queryByTestId} = setup();
    const component = queryByTestId('component-language-picker');
    expect(component).toBeTruthy();
  });

  test('does not throw warning with expected props', () => {
    checkProps(LanguagePicker, { setLanguage: jest.fn});
  });

  test('renders non-zero language icons', () => {
    const {queryAllByTestId} = setup();
    const component = queryAllByTestId('language-icon')
    expect(component.length).toBeGreaterThan(0)
  });

  describe('on click', () => {
    test('calls setLanguage', () => {
      const {queryAllByTestId} = setup();
      const firstIcon = queryAllByTestId('language-icon')[0];
      userEvent.click(firstIcon)
      expect(mockSetLanguage).toHaveBeenCalled()
    });
  })


});


