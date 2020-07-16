import React, {createRef, Fragment} from 'react';
import CloudinaryComponent from '../CloudinaryComponent';
import {extractCloudinaryProps, getImageTag, makeElementResponsive} from "../../Util";
import {Util} from "cloudinary-core";
import PropTypes from "prop-types";

const RESPONSIVE_OVERRIDE_WARNING = [
  `Warning: passing a number value for width cancels the 'responsive' prop's effect on the image transformation.`,
  `The 'responsive' prop affects the image transformation only when width === 'auto'.`,
  `Passing 'width="auto" responsive' will affect the actual image width that is fetched from Cloudinary.`,
  `The 'responsive' prop causes the Image component to request an image which width is equal to the width of it's container.`,
  `When passing 'width="auto" responsive', you can set the <img> element width by passing a 'style' prop`
].join('\n');

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
    const {responsive, width} = this.getExtendedProps();
    if (responsive && width !== 'auto') {
      console.warn(RESPONSIVE_OVERRIDE_WARNING);
    }

    return responsive && this.imgElement && this.imgElement.current;
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
   * @param additionalOptions - extra options to pass to cloudinary.url(), for example: placeholder
   * @return attributes for the underlying <img> element.
   */
  getAttributes = (additionalOptions = {}) => {
    const {isInView} = this.state;
    const {placeholder} = additionalOptions;
    const options = {...this.getOptions(), ...additionalOptions};
    const {nonCloudinaryProps} = extractCloudinaryProps(options);

    // React requires camelCase instead of snake_case attributes
    const attributes = ({...Util.withCamelCaseKeys(getImageTag(options).attributes()), ...nonCloudinaryProps});

    // We want to keep 'data-src' if it exists
    if (attributes.dataSrc) {
      attributes['data-src'] = attributes.dataSrc;
    }

    // Set placeholder Id
    if (placeholder && attributes.id) {
      attributes.id = attributes.id + '-cld-placeholder';
    }

    // Set data-src if lazy loading and not in view
    if (!isInView && this.shouldLazyLoad(options)) {
      attributes['data-src'] = attributes.dataSrc || attributes.src;
      delete attributes.src;
    }

    // Remove unneeded attributes,
    ['dataSrc', 'accessibility', 'placeholder', 'breakpoints'].forEach(attr => {
      delete attributes[attr];
    });

    return attributes;
  }

  /**
   * Update this image using cloudinary-core
   */
  update = () => {
    const {isInView} = this.state;

    if (this.isResponsive()) {
      const removeListener = makeElementResponsive(this.imgElement.current, this.getOptions());
      this.listenerRemovers.push(removeListener);
    }

    if (!isInView && this.shouldLazyLoad(this.getExtendedProps())) {
      Util.detectIntersection(this.imgElement.current, this.onIntersect);
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
  }

  /**
   * Invoked immediately after updating occurs. This method is not called for the initial render.
   */
  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.listenerRemovers.forEach(removeListener => {
      removeListener();
    });
  }

  /**
   * Updates this Image's isLoaded state,
   * And fires props.onLoad if exists.
   */
  handleImageLoaded = () => {
    const {onLoad} = this.props;
    this.setState({isLoaded: true}, () => {
      if (onLoad) {
        onLoad();
      }
    });
  };

  renderPlaceholder = (placeholder, attributes) => {
    attributes.style = {...(attributes.style || {}), opacity: 0, position: 'absolute'}
    attributes.onLoad = this.handleImageLoaded;
    const placeholderWrapperStyle = {display: 'inline'}
    const placeholderAttributes = this.getAttributes({placeholder: placeholder.props.type});

    return (
      <Fragment>
        {this.renderImage(attributes)}
        <div style={placeholderWrapperStyle}>
          <img {...placeholderAttributes}/>
        </div>
      </Fragment>
    );
  };

  renderImage = (attributes) => {
    return <img ref={this.attachRef} {...attributes}/>
  }

  render() {
    const {isLoaded} = this.state;
    const {children} = this.getExtendedProps();
    const placeholder = this.getChildPlaceholder(children);
    const attributes = this.getAttributes();

    //If image wasn't loaded and there's a child placeholder then we render it.
    if (!isLoaded && placeholder) {
      return this.renderPlaceholder(placeholder, attributes);
    }

    return this.renderImage(attributes);
  }
}

Image.defaultProps = {};
Image.propTypes = CloudinaryComponent.propTypes;
Image.propTypes.responsive = PropTypes.bool;
Image.propTypes.loading = PropTypes.string;
Image.propTypes.accessibility = PropTypes.string;

export default Image;
