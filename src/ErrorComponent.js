/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: my-app
 * Date:  15.06.2017
 * Time: 22:27
 */


'use strict';

import React from 'react';


class ErrorComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      color: '#ffffff',
      background: '#F44336',
      display: 'block',
      padding: '10px',
    };
    return (
      <div style={style} className="error-message">
        { this.props.error.message }
      </div>
    );
  }

}


export default ErrorComponent;