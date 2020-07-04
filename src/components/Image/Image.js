import React, {createRef, Fragment} from 'react';
import CloudinaryComponent from '../CloudinaryComponent';
import {extractCloudinaryProps, getImageTag, makeElementResponsive, getConfiguredCloudinary} from "../../Util";
import {Util} from "cloudinary-core";

/**
 * A component representing a Cloudinary served image
 */
class Image extends CloudinaryComponent {
  constructor(props, context) {
    super(props, context);
    this.imgElement = createRef();
    this.state = {isLoaded: false}
    this.listenerRemovers = [];
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
  getAttributes = (additionalOptions={}) => {
    const options = {...this.getOptions(), ...additionalOptions};
    const {nonCloudinaryProps} = extractCloudinaryProps(options);
    let attributes = getImageTag(options).attributes();
    attributes = {...attributes, ...nonCloudinaryProps};
    attributes.src = getConfiguredCloudinary(options).url(options.publicId, options);

    const {isInView} = this.state;
    const shouldRender = isInView || !this.shouldLazyLoad(this.getExtendedProps());
    const srcAttributeName = shouldRender ? "src" : "data-src";
    const url = attributes.src;
    delete attributes.src;
    attributes[srcAttributeName] = url;

    if (additionalOptions.placeholder){
      delete attributes.placeholder;
    }

    if (options.accessibility){
      delete attributes.accessibility;
    }

    return attributes;
  }

  /**
   * Update this image using cloudinary-core
   */
  update = () => {
    if (this.isResponsive()){
      const removeListener = makeElementResponsive(this.imgElement.current, this.getOptions());
      this.listenerRemovers.push(removeListener);
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

  shouldLazyLoad = ({loading}) => {
    return loading === "lazy" || loading === "auto";
  }

  /**
   * Invoked immediately after a component is mounted (inserted into the tree)
   */
  componentDidMount() {
    this.update();

    if (this.shouldLazyLoad(this.getExtendedProps())) {
      Util.detectIntersection(this.element, this.onIntersect);
    }
  }

  /**
   * Invoked immediately after updating occurs. This method is not called for the initial render.
   */
  componentDidUpdate() {
    this.update();

    if (this.shouldLazyLoad(this.getExtendedProps())) {
      Util.detectIntersection(this.element, this.onIntersect);
    }
  }

  componentWillUnmount() {
    this.listenerRemovers.forEach(removeListener=>{
      removeListener();
    });
  }

  render2() {
    const {attachRef, getAttributes} = this;

    return <img ref={attachRef} {...getAttributes()}/>
  }

  render() {
    const {attachRef, getAttributes} = this;
    const {children} = this.getExtendedProps();
    const placeholder = this.getChildPlaceholder(children);
    const {isLoaded} = this.state;

    const attributes = getAttributes();

    //If image wasn't loaded and there's a placeholder then we render it alongside the image.
    if (!isLoaded && placeholder) {
      const placeholderStyle = {display: isLoaded ? 'none' : 'inline'}
      attributes.style = {...(attributes.style || {}), opacity: 0, position: 'absolute'}
      attributes.onLoad = this.handleImageLoaded;
      const placeholderAttributes = getAttributes({placeholder: placeholder.props.type});

      return (
        <Fragment>
          <img {...attributes} />
          <div style={placeholderStyle}>
            <img {...placeholderAttributes}/>
          </div>
        </Fragment>
      );
    }

    return <img ref={attachRef} {...attributes}/>
  }
}

Image.defaultProps = {};
Image.propTypes = CloudinaryComponent.propTypes;

export default Image;
