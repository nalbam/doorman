import React, { Component, Fragment } from 'react';

import { API } from 'aws-amplify'

import StackGrid from "react-stack-grid";

import GridItem from './GridItem';

class App extends Component {
  state = {
    items: [],
  }

  componentDidMount() {
    this.getUsers();
    this.intervalId = setInterval(this.getUsers.bind(this), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getUsers = async () => {
    const res = await API.get('users', '/items/' + this.props.user_type);
    if (res && res.length > 0) {
      this.reloaded(res);
    }
  }

  reloaded(res) {
    let items = res.sort(this.compare).reverse();

    console.log(items)

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
    const list = this.state.items.map(
      (item, index) => (<GridItem key={index} item={item} pathPrefix={this.props.pathPrefix} />)
    );

    return (
      <Fragment>
        <StackGrid columnWidth="50%">
          {list}
        </StackGrid>
      </Fragment>
    );
  }
}

export default App;
