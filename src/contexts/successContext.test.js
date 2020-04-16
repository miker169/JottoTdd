import React from "react";
import { render} from "@testing-library/react";

import successContext from "./successContext";

const FunctionalComponent = () => {
  successContext.useSuccess();
  return (
    <div></div>
  )
}

test('useSuccess Throws error when outside a success provider', () => {
  expect(() => {
    const mock = jest.fn();
    console.error = mock;
    render(<FunctionalComponent/>)
    }

  ).toThrow('useSuccess much be used within a SuccessProvider');
});

test('useSuccess does not throw error when wrapped in SuccessProvider', () => {
  expect(() => {
    render(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    )
  }).not.toThrow();
});
