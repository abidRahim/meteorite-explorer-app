/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import './Loader2.css';

class Loader extends Component {
  render() {
    return (
      <>
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </>
    );
  }
}

export default Loader;
