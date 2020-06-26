import React from 'react';
import CloudinaryComponent from '../CloudinaryComponent';
import {getImageTag, responsive} from "../../Util";

/**
 * A component representing a Cloudinary served image
 */
class Image extends CloudinaryComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {isResponsive: false};
    this.imgElement = null;
  }

  /**
   * Attach props.innerRef as ref to the given element
   * @param element - the element to attach a ref to
   */
  attachRef = (element) => {
    this.element = element;
    const {innerRef} = this.props;

    if (innerRef) {
      if (innerRef instanceof Function) {
        innerRef(element);
      } else {
        innerRef.current = element;
      }
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {isResponsive} = prevState;
    const {imgElement} = this;

    this.setState({
      isResponsive: this.props.responsive && imgElement && !isResponsive
    });

    // Run responsive() only when props.responsive is updated to truthy value
    if (isResponsive) {
      responsive(imgElement, $$props);
    }
  }

  render() {
    const {attachRef} = this;
    let options = this.getExtendedProps();
    options = {...options, ...this.getTransformation(options)};
    delete options.children;
    delete options.innerRef;
    const attributes = getImageTag(options).attributes();

    return <img ref={attachRef} {...attributes}/>
  }
}

Image.defaultProps = {};
Image.propTypes = CloudinaryComponent.propTypes;

export default Image;
