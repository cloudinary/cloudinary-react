import React, {Component, PropTypes} from 'react';
import cloudinary from 'cloudinary-core';

const camelCase = cloudinary.Util.camelCase;
const snakeCase = cloudinary.Util.snakeCase;

export default class CloudinaryComponent extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    return {};
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    return null;
  }

  /**
   * Combine props and context to create an option Object that can be passed to Cloudinary methods.<br>
   *   All names are converted to snake_case.
   * @param props
   * @param context
   * @returns {{}}
   */
  getOptions(props, context) {
    var options = {};

    for(let key in context) {
      let value = context[key];
      if(value !== null && value !== undefined) {
        options[snakeCase(key)] = value;
      }
    }
    for(let key in props) {
      let value = props[key];
      if(value !== null && value !== undefined) {
        options[snakeCase(key)] = value;
      }
    }
    return options;
  }
}
CloudinaryComponent.VALID_OPTIONS = cloudinary.Configuration.CONFIG_PARAMS.concat(cloudinary.Transformation.new().PARAM_NAMES).map( camelCase);
CloudinaryComponent.contextTypes = typesFrom(CloudinaryComponent.VALID_OPTIONS);

CloudinaryComponent.propTypes = CloudinaryComponent.contextTypes ;

CloudinaryComponent.childContextTypes = {};

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

