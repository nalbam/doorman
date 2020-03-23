import React, { Component, Fragment } from 'react';

import UserList from '../component/UserList';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className='grid-detected'>
          <UserList user_type="detected" grid_width="50%" />
        </div>
        <div className='grid-unknown'>
          <UserList user_type="unknown" grid_width="50%" />
        </div>
      </Fragment>
    );
  }
}

export default App;
