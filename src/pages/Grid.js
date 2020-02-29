import React, { Component, Fragment } from 'react';

import GridList from './component/GridList';

import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className='person-detected'>
          <GridList user_type="detected" />
        </div>
        <div className='person-unknown'>
          <GridList user_type="unknown" />
        </div>
      </Fragment>
    );
  }
}

export default App;
