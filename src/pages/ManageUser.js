import React, { Component, Fragment } from 'react';

import { withAuthenticator, Authenticator } from 'aws-amplify-react'

import signUpConfig from '../config/signUpConfig'

import UserForm from '../component/UserForm';

import './pop.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className='App-header auth'>
          <Authenticator usernameAttributes='email' />
        </header>
        <div className='App-body'>
          <UserForm user_id={this.props.match.params.user_id} />
        </div>
      </Fragment>
    );
  }
}

export default withAuthenticator(App, { usernameAttributes: 'email', signUpConfig });
