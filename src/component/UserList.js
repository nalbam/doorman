import React, { Component, Fragment } from 'react';

import { API } from 'aws-amplify'

import StackGrid from "react-stack-grid";

import UserItem from './UserItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.getUsers();
  }

  state = {
    items: [],
  }

  getUsers = async () => {
    console.log('users', this.props.user_type);

    if (this.props.user_type !== '') {
      const res = await API.get('users', '/items/' + this.props.user_type);
      console.log('users', res);

      if (res && res.length > 0) {
        let items = res.sort(this.compare).reverse();

        this.setState({ items: items });
      } else {
        this.setState({ items: [] });
      }
    }

    setTimeout(this.getUsers, 5000);
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
    const list = this.state.items.map(
      (item, index) => (<UserItem key={index} item={item} user_type={this.props.user_type} />)
    );

    return (
      <Fragment>
        <StackGrid columnWidth={this.props.grid_width}>
          {list}
        </StackGrid>
      </Fragment>
    );
  }
}

export default App;
