import React, { Component, Fragment } from 'react';

import UserForm from '../component/UserForm';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className='App-header'>
          {this.props.match.params.user_id}
        </header>
        <div className='App-body'>
          <UserForm league={this.props.match.params.user_id} />
        </div>
      </Fragment>
    );
  }
}

export default App;
