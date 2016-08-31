import React, {Component, PropTypes} from 'react';

export default class CloudinaryContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    return {cloud_name: "demo"};
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    return (
      <span>CloudinaryContext Not Implemented yet</span>
    );
  }
}
CloudinaryContext.propTypes = {initialCount: React.PropTypes.number};
CloudinaryContext.defaultProps = {initialCount: 0};
CloudinaryContext.contextTypes = {
  cloud_name: PropTypes.string.isRequired
};
CloudinaryContext.childContextTypes = {
  cloud_name: PropTypes.string.isRequired
};