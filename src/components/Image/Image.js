import React, {Component} from 'react';
import cloudinary, {Util} from 'cloudinary-core';
import CloudinaryComponent from '../CloudinaryComponent';
import {debounce, firstDefined, closestAbove, requestAnimationFrame, isElement} from '../../Util';

/**
 * A component representing a Cloudinary served image
 */
class Image extends CloudinaryComponent {
  constructor(props, context) {
    function defaultBreakpoints(width, steps = 100) {
      return steps * Math.ceil(width / steps);
    }

    super(props, context);
    this.handleResize = this.handleResize.bind(this);

    let state = {responsive: false, url: undefined, breakpoints: defaultBreakpoints};
    this.state = Object.assign(state, this.prepareState(props, context));
  }

  /**
   * Retrieve the window or default view of the current element
   * @returns {DocumentView|*}
   * @private
   */
  get window() {
    let windowRef = null;
    if(typeof window !== "undefined"){
      windowRef = window
    }
    return (this.element && this.element.ownerDocument) ? (this.element.ownerDocument.defaultView || windowRef) : windowRef;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let state = this.prepareState(nextProps, nextContext);
    this.setState(state);
  }

  /**
   * Generate update state of this element
   * @param {Object} [props=this.props]
   * @param {Object} [context=this.context]
   * @returns {Object} state updates
   * @private
   */
  prepareState(props = this.props, context = this.context) {
    let extendedProps = CloudinaryComponent.normalizeOptions(context, props);
    let url = this.getUrl(extendedProps);
    let state = {};
    if (extendedProps.breakpoints !== undefined) {
      state.breakpoints = extendedProps.breakpoints;
    }
    if (extendedProps.responsive) {
      state.responsive = true;
      url = this.cloudinary_update(url, state);
    }

    let currentState = this.state || {};
    if (!Util.isEmpty(url) && url !== currentState.url) {
      state.url = url;
    }
    return state;
  }

  handleResize(e) {
    if (this.rqf) return;
    this.rqf = requestAnimationFrame(() => {
      this.rqf = null;
      let newState = this.prepareState();
      if(!Util.isEmpty(newState.url)) {
        this.setState(newState);
      }
    });
  }

  componentDidMount() {
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

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextState.responsive) {
      const wait = firstDefined(nextProps.responsiveDebounce, nextContext.responsiveDebounce, 100);
      if (this.listener) {
        this.window && this.window.removeEventListener('resize', this.listener);
      }
      this.listener = debounce(this.handleResize, wait);
      this.window && this.window.addEventListener('resize', this.listener);
    }
  }

  render() {
    var {publicId, responsive, responsiveDebounce, children, ...options} = CloudinaryComponent.normalizeOptions(this.props,
      this.context);
    var attributes = cloudinary.Transformation.new(options).toHtmlAttributes();
    return (
      <img {...attributes} src={this.state.url} ref={(e)=> {this.element = e;}}/>
    );
  }

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
    return containerWidth;
  };

  applyBreakpoints(width, steps, options) {
    var responsive_use_breakpoints;
    options = CloudinaryComponent.normalizeOptions(this.context, this.props, options);
    responsive_use_breakpoints = options.responsive_use_breakpoints;
    if ((!responsive_use_breakpoints) || (responsive_use_breakpoints === 'resize' && !options.resizing)) {
      return width;
    } else {
      return this.calc_breakpoint(width, steps);
    }
  };

  calc_breakpoint(width, steps) {
    var breakpoints, point;
    breakpoints = this.state.breakpoints || defaultBreakpoints;
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
    var imageWidth;
    imageWidth = this.state.width || 0;
    if (requiredWidth > imageWidth) {
      imageWidth = requiredWidth;
      this.setState({width: requiredWidth});
    }
    return imageWidth;
  };

  cloudinary_update(url, options = {}) {
    var requiredWidth;
    var match;
    let resultUrl = this.updateDpr(url, options.roundDpr);
    if (options.responsive || this.state && this.state.responsive) {
      let containerWidth = this.findContainerWidth();
      if (containerWidth !== 0) {
        if (/w_auto:breakpoints/.test(resultUrl)) {
          requiredWidth = this.maxWidth(containerWidth, this.element);
          resultUrl = resultUrl.replace(/w_auto:breakpoints([_0-9]*)(:[0-9]+)?/,
            "w_auto:breakpoints$1:" + requiredWidth);
        } else if (match = /w_auto(:(\d+))?/.exec(resultUrl)) {
          requiredWidth = this.applyBreakpoints(containerWidth, match[2], options);
          requiredWidth = this.maxWidth(requiredWidth, this.element);
          resultUrl = resultUrl.replace(/w_auto[^,\/]*/g, "w_" + requiredWidth);
        }
      } else {
        resultUrl = "";
      }
    }
    return resultUrl;
  }
}

Image.defaultProps = {};
Image.contextTypes = CloudinaryComponent.contextTypes;
Image.propTypes = CloudinaryComponent.propTypes;

export default Image;
