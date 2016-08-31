import React, {Component, PropTypes} from 'react';

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      <div>Video Not Implemented yet.<video></video></div>
    );
  }
}
Video.propTypes = {initialCount: React.PropTypes.number};
Video.defaultProps = {initialCount: 0};
Video.contextTypes = {};