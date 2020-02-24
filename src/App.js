import React, { Component, Fragment } from 'react';

import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className='App-header'>
          <div className='logo'>
            <img alt='doorman' src='https://deepracer-logos.s3.ap-northeast-2.amazonaws.com/logo_deepracer.png' />
          </div>
        </header>
        <div className='center'>
          <a href='/manage' className='btn-link'>Manage</a>
        </div>
      </Fragment>
    );
  }
}

export default App;
