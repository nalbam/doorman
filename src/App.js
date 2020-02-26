import React, { Component, Fragment } from 'react';

import UserList from './component/UserList';

import './App.css';
import './pop.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className='App-header'>
          <div className='logo'>
            <img alt='doorman' src='https://deepracer-logos.s3.ap-northeast-2.amazonaws.com/logo_deepracer.png' />
          </div>
        </header>
        <div className='App-body'>
          <UserList user_type="unknown" />
        </div>
        <div className='App-body'>
          <UserList user_type="trained" />
        </div>
        <div className='App-body'>
          <UserList user_type="detected" />
        </div>
      </Fragment>
    );
  }
}

export default App;
