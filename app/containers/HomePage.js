// @flow
import React, { Component } from 'react';
import Categories from '../components/Categories';
import { connect } from 'react-redux';

type Props = {
  data: any
};

class HomePage extends Component<Props> {
  props: Props;

  render() {
    return "HELLO"//<Categories {...this.props}/>;
  }
}

function mapStateToProps(state) {
  return {
    data: state.data
  };
}

export default connect(
  mapStateToProps,
)(HomePage);
