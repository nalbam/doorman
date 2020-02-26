import React, { Component, Fragment } from 'react';

import UserList from './component/UserList';

import './App.css';
import './pop.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className='person-detected'>
          <UserList user_type="detected" />
        </div>
        <div className='person-unknown'>
          <UserList user_type="unknown" />
        </div>
      </Fragment>
    );
  }
}

export default App;
