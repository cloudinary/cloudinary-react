import React, {Component, PropTypes} from 'react';
import cloudinary, {Util} from 'cloudinary-core';
import CloudinaryComponent from '../CloudinaryComponent';

function firstDefined(...values){
  for(let value of values) {
    if(value !== undefined) return value;
  }
  return undefined;
}

function defaultBreakpoints(width, steps = 100) {
  return steps * Math.ceil(width / steps);
}

function closestAbove(list, value) {
  var i;
  i = list.length - 2;
  while (i >= 0 && list[i] >= value) {
    i--;
  }
  return list[i + 1];
}

export default class Image extends CloudinaryComponent {
  constructor(props, context) {
    super(props, context);
    console.log("Image constructor");
    let options = CloudinaryComponent.normalizeOptions(context, props);
    let url = this.getUrl(options);
    this.handleResize = this.handleResize.bind(this);

    let state = {responsive: false, url: "", breakpoints: defaultBreakpoints};
    this.state = Object.assign(state, this.prepareState(props, context));
    this.state = state;
    console.log(this);
  }

  get window() {
    return (this.element && this.element.ownerDocument) ? (this.element.ownerDocument.defaultView || window) : window;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log("componentWillReceiveProps",nextProps, nextContext);
    let state = this.prepareState(nextProps, nextContext);
    this.setState(state);
  }

  prepareState(props = this.props, context = this.context) {
    let options = CloudinaryComponent.normalizeOptions(context, props);
    let url = this.getUrl(options);
    let state = {};
    console.log("prepareState options ", options);
    if (options.breakpoints !== undefined) {
      state.breakpoints = options.breakpoints;
    }
    if (options.responsive) {
      console.log("prepareState - responsive");
      state.responsive = true;
      url = this.cloudinary_update(url, state);
    }

    let currentState = this.state || {};
    if (/* FIXME probably not needed */ Util.isEmpty(currentState.url) || url !== currentState.url) {
      console.log("prepareState setting url ", url);
      state.url = url;
    }
    return state;
  }

  componentWillMount() {
    console.log("componentWillMount");
    super.componentWillMount();
  }

  componentDidMount() {
    console.log("componentDidMount");
    super.componentDidMount();
    // now that we have a this.element, we need to calculate the URL
    let state = this.prepareState();
    if(state.url !== undefined){
      console.log("componentDidMount setting state");
      this.setState(state);
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    this.window.removeEventListener('resize', this.handleResize);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    // TODO check responsive. also check for responsive state change.
    console.log("componentWillUpdate", nextState);
    if(nextState.responsive){
      console.log("componentWillUpdate - setting listener");
      this.window.addEventListener('resize', this.handleResize);
    }

  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    console.log("componentDidUpdate");
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log("shouldComponentUpdate");
    return true;
  }

  handleResize(e){
    let options = CloudinaryComponent.normalizeOptions(this.context, this.props);
    let url = this.getUrl(options);
    if(this.state.responsive){
      url = this.cloudinary_update(url);
      let partialState = {url: url};
      this.setState(partialState);
    }
  }

  render() {
    var {public_id, responsive, children, ...options} = CloudinaryComponent.normalizeOptions(this.props, this.context);
    console.log("render image", this._reactInternalInstance._debugID, this.state.url, this.state.width);
    var attributes = cloudinary.Transformation.new(options).toHtmlAttributes();
    return (
      <img {...attributes} src={this.state.url} ref={(e)=>{this.element = e;}}/>
    );
  }

  // methods from cloudinary_js

  findContainerWidth() {
    var containerWidth, style;
    containerWidth = 0;
    let element = this.element;
    while (((element = element != null ? element.parentNode : void 0) instanceof Element) && !containerWidth) {
      style = this.window.getComputedStyle(element);
      if (!/^inline/.test(style.display)) {
        containerWidth = Util.width(element);
      }
    }
    console.log("findContainerWidth returning ", containerWidth);
    return containerWidth;
  };

  applyBreakpoints(tag, width, steps, options) {
    console.log("applyBreakpoints");
    var ref, ref1, ref2, responsive_use_breakpoints;
    options = CloudinaryComponent.normalizeOptions(this.context, this.props, options);
    responsive_use_breakpoints = options.responsiveUseBreakpoints;
    if ((!responsive_use_breakpoints) || (responsive_use_breakpoints === 'resize' && !options.resizing)) {
      return width;
    } else {
      return this.calc_breakpoint(tag, width, steps);
    }
  };

  calc_breakpoint(element, width, steps) {
    console.log("calc_breakpoint");
    var breakpoints, point;
    breakpoints = this.state.breakpoints || defaultBreakpoints;
    if (Util.isFunction(breakpoints)) {
      return breakpoints(width, steps);
    } else {
      if (Util.isString(breakpoints)) {
        breakpoints = ((function() {
          var j, len, ref, results;
          ref = breakpoints.split(',');
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            point = ref[j];
            results.push(parseInt(point));
          }
          return results;
        })()).sort(function(a, b) {
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
    console.log("updateDpr");
    return dataSrc.replace(/\bdpr_(1\.0|auto)\b/g, 'dpr_' + this.device_pixel_ratio(roundDpr));
  };

  maxWidth(requiredWidth) {
    var imageWidth;
    imageWidth = this.state.width || 0;
    if (requiredWidth > imageWidth) {
      imageWidth = requiredWidth;
      this.setState( {width: requiredWidth});
    }
    return imageWidth;
  };

  cloudinary_update(url, options = {}) {
    var requiredWidth;
    var match;
    let resultUrl = this.updateDpr(url, options.roundDpr);
    console.group("cloudinary_update", resultUrl);
    console.log("state", this.state);
    if(options.responsive || this.state && this.state.responsive) {
      console.log("responsive");
      let containerWidth = this.findContainerWidth();
      if (containerWidth !== 0) {
        if (/w_auto:breakpoints/.test(resultUrl)) {
            requiredWidth = this.maxWidth(containerWidth, this.element);
            resultUrl = resultUrl.replace(/w_auto:breakpoints([_0-9]*)(:[0-9]+)?/, "w_auto:breakpoints$1:" + requiredWidth);
        } else if (match = /w_auto(:(\d+))?/.exec(resultUrl)) {
            requiredWidth = this.applyBreakpoints(this.element, containerWidth, match[2], options);
            requiredWidth = this.maxWidth(requiredWidth, this.element);
            resultUrl = resultUrl.replace(/w_auto[^,\/]*/g, "w_" + requiredWidth);
        }
        // Util.removeAttribute(this.element, 'width');
        // if (!options.responsive_preserve_height) {
        //   Util.removeAttribute(this.element, 'height');
        // }
      } else {
        resultUrl = "";
      }

    }
    console.log("cloudinary_update returning", resultUrl);
    console.groupEnd();
    return resultUrl;
  }
}

Image.defaultProps = {};
Image.contextTypes = CloudinaryComponent.contextTypes;
Image.propTypes = CloudinaryComponent.propTypes;