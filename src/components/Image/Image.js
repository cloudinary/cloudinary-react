import React, {Fragment} from 'react';
import cloudinary, {Util} from 'cloudinary-core';
import CloudinaryComponent from '../CloudinaryComponent';
import {debounce, firstDefined, closestAbove, requestAnimationFrame, isElement} from '../../Util';
import PropTypes from "prop-types";

const defaultBreakpoints = (width, steps = 100) => {
  return steps * Math.ceil(width / steps);
};

/**
 * A component representing a Cloudinary served image
 */
class Image extends CloudinaryComponent {
  constructor(props, context) {
    super(props, context);

    let options = this.getExtendedProps(props, context);
    let state = {responsive: false, url: undefined, breakpoints: defaultBreakpoints};
    this.state = {...state, ...this.prepareState(options)};
  }

  /**
   * Retrieve the window or default view of the current element
   * @returns {DocumentView|*}
   * @private
   */
  get window() {
    let windowRef = null;
    if (typeof window !== "undefined") {
      windowRef = window
    }
    return (this.element && this.element.ownerDocument) ? (this.element.ownerDocument.defaultView || windowRef) : windowRef;
  }

  /**
   * Merges context & props
   * @param props of this component
   * @param context of this component
   * @return {Object}
   */
  getExtendedProps = (props = this.props, context = this.getContext()) => {
    return CloudinaryComponent.normalizeOptions(context, props);
  };

  /**
   * Generates new state based on this Image's props & context.
   * @param options - props to consider when generating the new state
   * @return {Object}
   */
  prepareState = (options = this.getExtendedProps()) => {
    const placeholder = this.getChildPlaceholder(options.children);
    let url = this.getUrl(options);
    let placeholderUrl = placeholder ? this.getUrl({...options, placeholder: placeholder.props.type}) : null;
    let state = {};
    let updatedOptions = {};

    if (options.breakpoints !== undefined) {
      state.breakpoints = options.breakpoints;
    }
    if (options.responsive) {
      state.responsive = true;
      updatedOptions = this.cloudinaryUpdate(url, state);
      url = updatedOptions.url;
      if (placeholderUrl){
        placeholderUrl = this.cloudinaryUpdate(placeholderUrl, state).url;
      }
    }

    let currentState = this.state || {};

    state.width = updatedOptions.width;

    if (!Util.isEmpty(url) && url !== currentState.url) {
      state.url = url;
      state.placeholderUrl = placeholderUrl;
    }

    return state;
  };

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

  /**
   * Update this Image's state, called on resize event
   */
  handleResize = () => {
    if (!this.props.responsive || this.rqf) return;
    this.rqf = requestAnimationFrame(() => {
      this.rqf = null;
      let newState = this.prepareState();
      if (!Util.isEmpty(newState.url)) {
        this.setState(newState);
      }
    });
  };

  shouldLazyLoad = ({loading}) => {
    return loading === "lazy" || loading === "auto";
  }

  componentDidMount() {
    if (this.shouldLazyLoad(this.getExtendedProps())) {
      Util.detectIntersection(this.element, this.onIntersect);
    }
    // now that we have a this.element, we need to calculate the URL
    this.handleResize();
  }

  componentWillUnmount() {
    this.element = undefined;
    if (this.listener) {
      this.listener.cancel();
      this.window && this.window.removeEventListener('resize', this.listener);
    }
    this.listener = undefined;
  }

  /**
   * Updates this Image's isLoaded state,
   * And fires props.onLoad if exists.
   */
  handleImageLoaded = () => {
    const {onLoad} = this.props;
    this.setState({isLoaded: true}, ()=>{
      if (onLoad){
        onLoad();
      }
    });
  };

  componentDidUpdate(prevProps) {
    this.setState(this.prepareState());
    if (this.state.responsive) {
      const wait = firstDefined(this.props.responsiveDebounce, this.getContext().responsiveDebounce, 100);
      if (this.listener) {
        this.window && this.window.removeEventListener('resize', this.listener);
      }
      this.listener = debounce(this.handleResize, wait);
      this.window && this.window.addEventListener('resize', this.listener);
    }
  }

  /**
   * Gets props that will be passed to the underlying <img> element
   * @param extendedProps - combined context & props
   * @return {Object}
   */
  getImageProps = (extendedProps) => {
    const {publicId, responsive, responsiveDebounce, children, innerRef, ...options} = extendedProps;
    const attributes = cloudinary.Transformation.new(options).toHtmlAttributes();
    const {url, isInView} = this.state;
    const shouldRender = !this.shouldLazyLoad(options) || isInView;
    const srcAttributeName = shouldRender ? "src" : "data-src";

    let imageProps = {...attributes, ref: this.attachRef};
    imageProps[srcAttributeName] = url;

    return imageProps;
  }

  /**
   * Gets props that will be passed to the underlying placeholder's <img> element
   * @param imageProps - props of the underlying original image
   * @return {Object}
   */
  getPlaceholderProps = (imageProps) => {
    const placeholderProps = {...imageProps};
    delete placeholderProps['ref'];
    delete placeholderProps['onLoad'];
    const srcAttributeName = placeholderProps['data-src'] ? 'data-src' : 'src'

    placeholderProps[srcAttributeName] = this.state.placeholderUrl;
    return placeholderProps;
  }

  render() {
    const {placeholderUrl, isLoaded} = this.state;
    const extendedProps = this.getExtendedProps();
    const imageProps = this.getImageProps(extendedProps);

    //If image wasn't loaded and there's a placeholder then we render it alongside the image.
    if (!isLoaded && placeholderUrl) {
      const placeHolderProps = this.getPlaceholderProps(imageProps);
      const placeholderStyle = {display: isLoaded ? 'none' : 'inline'}
      let imageStyle = imageProps.style || {};
      imageStyle = {...imageStyle, opacity: 0, position: 'absolute'}
      imageProps.onLoad = this.handleImageLoaded;
      imageProps.style = imageStyle;

      return (
        <Fragment>
          <img {...imageProps} />
          <div style={placeholderStyle}>
            <img {...placeHolderProps}/>
          </div>
        </Fragment>
      );
    }

    return <img {...imageProps} />;
  }
  /*
  render() {
    const {isLoaded} = this.state;
    const extendedProps = this.getExtendedProps();
    const imageProps = this.getImageProps(extendedProps);
    const placeholder = this.getChildPlaceholder(extendedProps.children);

    //If image wasn't loaded and there's a placeholder then we render it alongside the image.
    if (!isLoaded && placeholder) {
      const placeHolderProps = this.getPlaceholderProps(imageProps);
      const placeholderStyle = {display: isLoaded ? 'none' : 'inline'}
      let imageStyle = imageProps.style || {};

      if (!isLoaded) {
        imageStyle = {...imageStyle, opacity: 0, position: 'absolute'}
        imageProps.onLoad = this.handleImageLoaded;
        imageProps.style = imageStyle;
      }

      return (
        <Fragment>
          <img {...imageProps} />
          <div style={placeholderStyle}>
            <img {...placeHolderProps} src={this.getPlaceholderUrl(extendedProps, placeholder.props.type)}/>
          </div>
        </Fragment>
      );
    }

    return <img {...imageProps} />;
  }
   */

  // Methods from cloudinary_js

  findContainerWidth() {
    var containerWidth, style;
    containerWidth = 0;
    let element = this.element;
    while (isElement((element = element != null ? element.parentNode : void 0)) && !containerWidth) {
      style = this.window ? this.window.getComputedStyle(element) : '';
      if (!/^inline/.test(style.display)) {
        containerWidth = Util.width(element);
      }
    }
    return Math.round(containerWidth);
  };

  applyBreakpoints(width, steps, options) {
    options = CloudinaryComponent.normalizeOptions(this.getContext(), this.props, options);
    let responsiveUseBreakpoints = options.responsiveUseBreakpoints;
    if ((!responsiveUseBreakpoints) || (responsiveUseBreakpoints === 'resize' && !options.resizing)) {
      return width;
    } else {
      return this.calc_breakpoint(width, steps);
    }
  };

  calc_breakpoint(width, steps) {
    var breakpoints, point;
    breakpoints = (this.state && this.state.breakpoints) || defaultBreakpoints;
    if (Util.isFunction(breakpoints)) {
      return breakpoints(width, steps);
    } else {
      if (Util.isString(breakpoints)) {
        breakpoints = ((function () {
          var j, len, ref, results;
          ref = breakpoints.split(',');
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            point = ref[j];
            results.push(parseInt(point));
          }
          return results;
        })()).sort(function (a, b) {
          return a - b;
        });
      }
      return closestAbove(breakpoints, width);
    }
  };

  device_pixel_ratio(roundDpr = true) {
    var dpr, dprString;
    dpr = (typeof this.window !== "undefined" && this.window !== null ? this.window.devicePixelRatio : void 0) || 1;
    if (roundDpr) {
      dpr = Math.ceil(dpr);
    }
    if (dpr <= 0 || isNaN(dpr)) {
      dpr = 1;
    }
    dprString = dpr.toString();
    if (dprString.match(/^\d+$/)) {
      dprString += '.0';
    }
    return dprString;
  };

  updateDpr(dataSrc, roundDpr) {
    return dataSrc.replace(/\bdpr_(1\.0|auto)\b/g, 'dpr_' + this.device_pixel_ratio(roundDpr));
  };

  maxWidth(requiredWidth) {
    return Math.max((this.state && this.state.width) || 0, requiredWidth);
  };

  cloudinaryUpdate(url, options = {}) {
    var requiredWidth;
    var match;
    let resultUrl = this.updateDpr(url, options.roundDpr);
    if (options.responsive || (this.state && this.state.responsive)) {
      let containerWidth = this.findContainerWidth();
      if (containerWidth !== 0) {
        if (/w_auto:breakpoints/.test(resultUrl)) {
          requiredWidth = this.maxWidth(containerWidth, this.element);
          resultUrl = resultUrl.replace(/w_auto:breakpoints([_0-9]*)(:[0-9]+)?/,
            "w_auto:breakpoints$1:" + requiredWidth);
        } else {
          match = /w_auto(:(\d+))?/.exec(resultUrl);
          if (match) {
            requiredWidth = this.applyBreakpoints(containerWidth, match[2], options);
            requiredWidth = this.maxWidth(requiredWidth, this.element);
            resultUrl = resultUrl.replace(/w_auto[^,\/]*/g, "w_" + requiredWidth);
          }
        }
      } else {
        resultUrl = "";
      }
    }
    return {url: resultUrl, width: requiredWidth};
  }
}

Image.defaultProps = {};
Image.propTypes = {
  ...CloudinaryComponent.propTypes,
  placeholder: PropTypes.string,
  accessibility: PropTypes.string
}

export default Image;
