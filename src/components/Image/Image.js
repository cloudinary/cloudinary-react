import React, {createRef} from 'react';
import CloudinaryComponent from '../CloudinaryComponent';
import {extractCloudinaryProps, getImageTag, makeElementResponsive} from "../../Util";

/**
 * A component representing a Cloudinary served image
 */
class Image extends CloudinaryComponent {
  constructor(props, context) {
    super(props, context);
    this.imgElement = createRef();
  }

  /**
   * @return true when this image element should be made responsive, false otherwise.
   */
  isResponsive = () => {
    return this.props.responsive && this.imgElement && this.imgElement.current;
  }

  /**
   * @return merged props & context with aggregated transformation, excluding children and innerRef.
   */
  getOptions = () => {
    const extendedProps = this.getExtendedProps();
    const {children, innerRef, ...options} = {...extendedProps, ...this.getTransformation(extendedProps)};

    return options;
  }

  /**
   * @return attributes for the underlying <img> element.
   */
  getAttributes = () => {
    const options = this.getOptions();
    const {nonCloudinaryProps} = extractCloudinaryProps(options);
    const attributes = getImageTag(options).attributes();
    return {...attributes, ...nonCloudinaryProps};
  }

  /**
   * Update this image using cloudinary-core
   */
  update = () => {
    if (this.isResponsive()){
      makeElementResponsive(this.imgElement.current, this.getOptions());
    }
  }

  /**
   * Attach both this.imgElement and props.innerRef as ref to the given element
   * @param imgElement - the element to attach a ref to
   */
  attachRef = (imgElement) => {
    const {innerRef} = this.props;
    this.imgElement.current = imgElement;

    if (innerRef) {
      if (innerRef instanceof Function) {
        innerRef(imgElement);
      } else {
        innerRef.current = imgElement;
      }
    }
  };

  /**
   * Invoked immediately after a component is mounted (inserted into the tree)
   */
  componentDidMount() {
    this.update();
  }

  /**
   * Invoked immediately after updating occurs. This method is not called for the initial render.
   */
  componentDidUpdate() {
    this.update();
  }

  render() {
    const {attachRef, getAttributes} = this;

    return <img ref={attachRef} {...getAttributes()}/>
  }
}

Image.defaultProps = {};
Image.propTypes = CloudinaryComponent.propTypes;

export default Image;
