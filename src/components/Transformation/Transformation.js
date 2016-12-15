import React, {Component, PropTypes} from 'react';
import cloudinary, {Util} from 'cloudinary-core';

const camelCase = cloudinary.Util.camelCase;

export default class Transformation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return null;
  }

}
Transformation.VALID_OPTIONS = cloudinary.Transformation.PARAM_NAMES.map( camelCase);
Transformation.propTypes = typesFrom(Transformation.VALID_OPTIONS);

/**
 * Create a React type definition object. All items are PropTypes.string.
 * @param {Array} configparams a list of parameter names
 * @returns {Object}
 */
function typesFrom(configparams) {
  configparams = configparams || [];
  const types = {};
  for (let key of configparams) {
    types[camelCase(key)] = PropTypes.string;
  }
  return types;
}

/**
 * Combine props to create an option Object that can be passed to Cloudinary methods.<br>
 *   All names are converted to snake_case.
 * @param props
 * @returns {{}}
 */
function getOptions(props) {
  var options = {};
  for(let key in props) {
    let value = props[key];
    if(value !== null && value !== undefined) {
      options[snakeCase(key)] = value;
    }
  }
  return options;
}
