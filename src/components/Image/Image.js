import React, {createRef, Fragment} from 'react';
import CloudinaryComponent from '../CloudinaryComponent';
import {CLOUDINARY_REACT_PROPS, extractCloudinaryProps, getImageTag, makeElementResponsive} from "../../Util";
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
    this.placeholderElement = createRef();
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

    return responsive && this.element && this.element.current;
  }

  /**
   * @return merged props & context with aggregated transformation, excluding children and innerRef.
   */
  getOptions = () => {
    const extendedProps = this.getExtendedProps();
    const {children, innerRef, ...options} = {...extendedProps, ...this.getTransformation(extendedProps)};

    if (!this.shouldLazyLoad()){
      delete options.loading;
    }

    return options;
  }

  /**
   * @param additionalOptions - extra options to pass to cloudinary.url(), for example: placeholder
   * @return attributes for the underlying <img> element.
   */
  getAttributes = (additionalOptions = {}) => {
    const {placeholder} = additionalOptions;
    const options = extractCloudinaryProps({...this.getOptions(), ...additionalOptions});
    const {cloudinaryProps, nonCloudinaryProps, cloudinaryReactProps} = options;
    const imageTag = getImageTag({...cloudinaryProps, ...cloudinaryReactProps});
    const cloudinaryAttributes = Util.withCamelCaseKeys(imageTag.attributes());

    // React requires camelCase instead of snake_case attributes
    const attributes = ({...cloudinaryAttributes, ...nonCloudinaryProps});

    // We want to keep 'data-src' if it exists
    if (attributes.dataSrc) {
      attributes['data-src'] = attributes.dataSrc;
    }

    // Set placeholder Id
    if (placeholder && attributes.id) {
      attributes.id = attributes.id + '-cld-placeholder';
    }

    // Set data-src if lazy loading and not in view
    if (this.shouldLazyLoad()) {
      attributes['data-src'] = attributes.dataSrc || attributes.src;
      delete attributes.src;
    }

    // Remove unneeded attributes,
    CLOUDINARY_REACT_PROPS.forEach(attr => {
      delete attributes[attr];
    });

    return attributes;
  }

  /**
   * Update this image using cloudinary-core
   */
  update = () => {
    // Handle lazy loading
    if (this.shouldLazyLoad()) {
      // Will set this.state.isInView = true when in view
      Util.detectIntersection(this.element.current, this.onIntersect);
    } else {
      // Handle responsive only if lazy loading wasn't requested or already handled
      if (this.isResponsive()) {
        const options = this.getOptions();
        const placeholder = this.getPlaceholderType();

        // Make placeholder responsive
        if (placeholder) {
          const removePlaceholderListener = makeElementResponsive(this.placeholderElement.current, {...options, placeholder});
          this.listenerRemovers.push(removePlaceholderListener);
        }

        // Make original image responsive
        const removeImgListener = makeElementResponsive(this.element.current, options);
        this.listenerRemovers.push(removeImgListener);
      }
    }
  }

  shouldLazyLoad = () => {
    const {loading} = this.getExtendedProps();
    const {isInView} = this.state;
    return !isInView && (loading === "lazy" || loading === "auto");
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
    const placeholderAttributes = this.getAttributes({placeholder});

    return (
      <Fragment>
        {this.renderImage(attributes)}
        <div style={placeholderWrapperStyle}>
          <img ref={this.placeholderElement} {...placeholderAttributes}/>
        </div>
      </Fragment>
    );
  };

  renderImage = (attributes) => {
    return <img ref={this.attachRef} {...attributes}/>
  }

  getPlaceholderType = () => {
    const {children} = this.getExtendedProps();
    const placeholder = this.getChildPlaceholder(children);

    return placeholder ? placeholder.props.type : null;
  }

  render() {
    const {isLoaded} = this.state;
    const attributes = this.getAttributes();
    const placeholder = this.getPlaceholderType();

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
