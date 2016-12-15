import React, {Component, PropTypes} from 'react';
import cloudinary, {Util} from 'cloudinary-core';

const camelCase = cloudinary.Util.camelCase;
const snakeCase = cloudinary.Util.snakeCase;


export default class Image extends React.Component {

  /**
   * Returns an object with all the transformation parameters based on the context and properties of this element
   * and any children.
   * @param options
   * @returns {object} a hash of transformation and configuration parameters
   */
  getTransformation(options) {
    let transformation;
    if (this.props.children != null) {
      let childrenOptions = React.Children.map(this.props.children, child =>{
        if (child.type && child.type.name === "Transformation"){
          return getOptions(child.props);
        } else {
          return {};
        }
      });
      if (!Util.isEmpty(childrenOptions)) {
        transformation = childrenOptions;
        return {...options, transformation};
      }
    }
    return {...options};
  }

  render() {
    let {public_id, children, ...options} = getOptions(this.getTransformation(this.props));
    let cl = cloudinary.Cloudinary.new(options);
    let transformation = cloudinary.Transformation.new(options);
    let url = cl.url(public_id, transformation);
    let attributes = transformation.toHtmlAttributes();
    return (
      <img {...attributes} src={url} />
    );
  }
}

let allParams = cloudinary.Configuration.CONFIG_PARAMS.concat(cloudinary.Transformation.PARAM_NAMES);
Image.VALID_OPTIONS = allParams.map( camelCase);
Image.propTypes = typesFrom(Image.VALID_OPTIONS);

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
 * Combine props and context to create an option Object that can be passed to Cloudinary methods.<br>
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
