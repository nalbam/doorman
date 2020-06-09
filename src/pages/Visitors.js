import React, { Component, Fragment } from 'react';

// import { API } from 'aws-amplify'

import StackGrid from "react-stack-grid";

import UserItem from '../component/UserItem';
import HistoryItem from '../component/HistoryItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.getUsers();
  }

  state = {
    users: [],
    history: [],
  }

  getUsers = async () => {
    const apiName = 'https://zio9pumsm3.execute-api.ap-northeast-2.amazonaws.com'
    const path = `/demo/users`

    fetch(`${apiName}${path}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            users: result.users,
            history: result.history,
          });
        },
        (error) => {
          this.setState({
            users: [],
            history: [],
          });
        }
      );

    setTimeout(this.getUsers, 5000);
  }

  render() {
    const users = this.state.users.map(
      (item, index) => (<UserItem key={index} item={item} />)
    );

    const history = this.state.history.map(
      (item, index) => (<HistoryItem key={index} item={item} />)
    );

    return (
      <Fragment>
        <div className='grid-user'>
          <StackGrid columnWidth="100%">
            {users}
          </StackGrid>
        </div>
        <div className='grid-history'>
          <StackGrid columnWidth="100%">
            {history}
          </StackGrid>
        </div>
      </Fragment>
    );
  }
}

export default App;
