import React from 'react';
import PropTypes from 'prop-types';

import languageContext from './contexts/LanguageContext';
import stringsModule from "./helpers/strings";

/**
 * Functional react component for congratulatory message
 * @function
 * @param {object props} React props.
 * @returns {JSX.Element} - Rendered component (or null if 'success prop is false'
 */
const Congrats = ({success}) => {
  const language = React.useContext(languageContext);

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

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
}

export default Congrats;
