import React, {Component, PropTypes} from 'react';
import cloudinary from 'cloudinary-core';

export default class Image extends React.Component {
  constructor(props, context) {
    super(props, context);
    var options = Object.assign({}, context, props);
    var options2 = this.snakeCase(options);
    let cl = cloudinary.Cloudinary.new(options2);
    // let tr = cloudinary.Transformation.new(options);
    //
    console.log("trying url", props, options2);
    var url = cl.url(props.publicId, options2);
    console.log(url);
    this.state = {url: url};
    // this.foo = this.foo.bind(this);
  }

  snakeCase(options) {
    let res = {};
    for(let key of Object.keys(options)) {
      res[cloudinary.Util.snakeCase(key)] = options[key];
    }
    return res;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    var options = Object.assign({}, nextContext, nextProps);

    let cl = cloudinary.Cloudinary.new(options);
    let tr = cloudinary.Transformation.new(options);
    var url = cl.url(this.props.publicId, options);
    console.log(url);
    var transformation = tr.toString();
    console.log(transformation);
    this.setState({
      url: url,
      transformation: transformation
    })
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }

  render() {
    var options = Object.assign({}, this.context, this.props);
    var {publicId, transformation, ...other} = this.props;
    var attributes = cloudinary.Transformation.new(options).toHtmlAttributes();
    return (
      <img {...attributes} src={this.state.url} />
    );
  }
}

Image.propTypes = {
  publicId: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  transformation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  handleLoad: PropTypes.func,
  breakpoints: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.number)
  ])

};
Image.defaultProps = {};
Image.contextTypes = {
  cloudName: PropTypes.string,
  angle: PropTypes.string
};