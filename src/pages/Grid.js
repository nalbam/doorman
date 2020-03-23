import React, { Component, Fragment } from 'react';

import GridList from '../component/GridList';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className='grid-detected'>
          <GridList user_type="detected" />
        </div>
        <div className='grid-unknown'>
          <GridList user_type="unknown" />
        </div>
      </Fragment>
    );
  }
}

export default App;
