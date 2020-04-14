import React from "react";
import { render } from '@testing-library/react'

import App from "./App";

const setup = () => {
  return render(<App/>);
}

test('it renders without crashing', () => {
  const {queryByTestId} = setup();
  const component = queryByTestId('component-app');
  expect(component).toBeTruthy();
})
