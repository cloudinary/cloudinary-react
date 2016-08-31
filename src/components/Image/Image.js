import React, {Component, PropTypes} from 'react';
import cloudinary from 'cloudinary-core';

export default class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bar: props.initialBar};
    // this.foo = this.foo.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    var config = {};
    cloudinary.Configuration.CONFIG_PARAMS.forEach((param)=> {
      if(nextProps[param]){
        config[param] = nextProps[param];
      }
    });

    this.setState({
      url: ""
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
    let cl = cloudinary.Cloudinary.new({cloud_name: "demo"});
    var {publicId, transformation, ...other} = this.props;
    var url = cl.url(publicId, transformation);
    return (
      <img {...other} src={url} />
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
    PropTypes.arrayOf(React.PropTypes.object)
  ]),
  handleLoad: PropTypes.func,
  breakpoints: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(React.PropTypes.number)
  ])

};
Image.defaultProps = {};
Image.contextTypes = {
  config: React.PropTypes.object
};