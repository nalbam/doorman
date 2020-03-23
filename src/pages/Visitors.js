import React, { Component, Fragment } from 'react';

import { API } from 'aws-amplify'

import StackGrid from "react-stack-grid";

import UserItem from '../component/UserItem';
import HistoryItem from '../component/HistoryItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.getUsers();
  }

  state = {
    user_id: "",
    user_type: "unknown",
    users: [],
    history: [],
  }

  getUsers = async () => {
    console.log('users', this.state.user_type)

    const res = await API.get('users', '/items/' + this.state.user_type);
    if (res && res.length > 0) {
      let items = res.sort(this.compare).reverse();

      console.log('users', items)

      this.setState({ users: items });
      this.setState({ user_id: items[0].user_id });
    }
    else {
      this.setState({ users: [] });
      this.setState({ user_id: "" });
    }
    this.getHistory()
    setTimeout(this.getUsers, 5000);
  }

  getHistory = async () => {
    console.log('history', this.state.user_id)

    const res = API.get('history', '/items/' + this.state.user_id);
    if (res && res.length > 0) {
      let items = res.sort(this.compare).reverse();

      console.log('history', items)

      this.setState({ history: items });
    } else {
      this.setState({ history: [] });
    }
  }

  compare(a, b) {
    let a1 = a.latest;
    let b1 = b.latest;
    if (a1 < b1) {
      return -1;
    } else if (a1 > b1) {
      return 1;
    }
    return 0;
  }

  render() {
    const users = this.state.users.map(
      (item, index) => (<UserItem key={index} item={item} user_type={this.state.user_type} />)
    );

    const history = this.state.history.map(
      (item, index) => (<HistoryItem key={index} item={item} user_id={this.state.user_id} />)
    );

    return (
      <Fragment>
        <div className='grid-visited'>
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
