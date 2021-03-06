// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Placeholder used by parent Image component, renders nothing on it's own.
 * @param type - type of placeholder 'blur'|'pixelate'|'predominant-color'|'vectorize',
 * @return {null}
 * @constructor
 */
// eslint-disable-next-line no-unused-vars
const Placeholder = ({ type }) => null;

Placeholder.propTypes = {
  type: PropTypes.string
};

Placeholder.defaultProps = {
  type: 'blur'
};

Placeholder.displayName = 'CloudinaryPlaceholder';

export default Placeholder;
