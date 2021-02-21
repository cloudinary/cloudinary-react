import React from 'react';
import PropTypes from 'prop-types';
import CloudinaryComponent from "../CloudinaryComponent";

/**
 * Placeholder used by parent Image component, renders nothing on it's own.
 * @param type - type of placeholder 'blur'|'pixelate'|'predominant-color'|'vectorize',
 * @return {null}
 * @constructor
 */
class Placeholder extends CloudinaryComponent {}

Placeholder.propTypes = {
  type: PropTypes.string
};

Placeholder.defaultProps = {
  type: 'blur'
};

Placeholder.displayName = "CloudinaryPlaceholder";

export default Placeholder;
