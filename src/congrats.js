import React from 'react';
import PropTypes from 'prop-types';

import languageContext from './contexts/LanguageContext';
import stringsModule from "./helpers/strings";
import successContext from "./contexts/successContext";

/**
 * Functional react component for congratulatory message
 * @function
 * @returns {JSX.Element} - Rendered component (or null if 'success prop is false'
 */
const Congrats = () => {
  const language = React.useContext(languageContext);
  const [success] = successContext.useSuccess();
  return (
    <>
      {success
        ?  <div data-testid="component-congrats" className="alert alert-success">
              <span data-testid="congrats-message">
                {stringsModule.getStringByLanguage(language, 'congrats' )}
              </span>
            </div>
        : <div data-testid="component-congrats"></div>
      }
    </>
  )
}

export default Congrats;
