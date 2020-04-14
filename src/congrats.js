import React from 'react';


/**
 * Functional react component for congratulatory message
 * @function
 * @param {object props} React props.
 * @returns {JSX.Element} - Rendered component (or null if 'success prop is false'
 */
const Congrats = ({success}) => {

  return (
    <>
      {success
        ?  <div data-testid="component-congrats">
              <span data-testid="congrats-message">
                Congratulations! You guessed the word
              </span>
            </div>
        : <div data-testid="component-congrats"></div>
      }
    </>
  )
}

export default Congrats;
