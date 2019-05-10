import Loader from 'react-loader-spinner';
import React from 'react';
export default class Loading extends React.Component {
  //other logic
  render() {
    return <Loader type="ThreeDots" color="#4c9f70" height="200" width="200" />;
  }
}
