import React, {Component, PropTypes} from 'react';
import {Cloudinary, Configuration, Transformation, Util} from 'cloudinary-core';

const camelCase = Util.camelCase;
const snakeCase = Util.snakeCase;

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

  getUrl(props, context = {}) {
    var options = this.getOptions(props, context);
    let cl = Cloudinary.new(options);
    return  cl.url(props.publicId, options);
  }

}
CloudinaryComponent.VALID_OPTIONS = Configuration.CONFIG_PARAMS.concat(Transformation.new().PARAM_NAMES).map( camelCase);
CloudinaryComponent.contextTypes = typesFrom(CloudinaryComponent.VALID_OPTIONS);

CloudinaryComponent.propTypes = CloudinaryComponent.contextTypes ;

CloudinaryComponent.childContextTypes = {};

/**
 * Create a React type definition object. All items are PropTypes.string.
 * @param {Array} configParams a list of parameter names
 * @returns {Object}
 */
function typesFrom(configParams) {
  configParams = configParams || [];
  const types = {};
  for (let key of configParams) {
    types[camelCase(key)] = PropTypes.string;
  }
  return types;
}

