import React, { Component, Fragment } from 'react';

import { API } from 'aws-amplify'

import UserItem from './UserItem';

class App extends Component {
  state = {
    items: [],
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const res = await API.get('users', '/items/' + this.props.user_type);
    if (res && res.length > 0) {
      this.reloaded(res);
    }
  }

  reloaded(res) {
    let items = res.sort(this.compare).reverse();

    this.setState({ items: items });
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
    const userList = this.state.items.map(
      (item, index) => (<UserItem key={index} item={item} pathPrefix={this.props.pathPrefix} />)
    );

    return (
      <Fragment>
        <div className='lb-items'>
          <div className='lb-header lb-rank0'>
            <div>Photo</div>
            <div>Realname</div>
            <div>Username</div>
          </div>
          {userList}
        </div>
      </Fragment>
    );
  }
}

export default App;
