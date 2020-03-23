import React, { Component, Fragment } from 'react';

import { API } from 'aws-amplify'

import StackGrid from "react-stack-grid";

import UserItem from '../component/UserItem';
import HistoryList from '../component/HistoryList';

class App extends Component {
  constructor(props) {
    super(props);

    this.getUsers();
  }

  state = {
    user_id: "",
    user_type: "unknown",
    items: [],
  }

  getUsers = async () => {
    console.log('users', this.state.user_type);

    if (this.state.user_type !== '') {
      const res = await API.get('users', '/items/' + this.state.user_type);
      console.log('users', res);

      if (res && res.length > 0) {
        let items = res.sort(this.compare).reverse();

        this.setState({
          items: items,
          user_id: items[0].user_id,
        });
      }
      else {
        this.setState({
          items: [],
          user_id: "",
        });
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
      (item, index) => (<UserItem key={index} item={item} user_type={this.state.user_type} />)
    );

    return (
      <Fragment>
        <div className='grid-visited'>
          <StackGrid columnWidth="100%">
            {list}
          </StackGrid>
        </div>
        <div className='grid-history'>
          <HistoryList user_id={this.state.user_id} grid_width="100%" />
        </div>
      </Fragment>
    );
  }
}

export default App;
