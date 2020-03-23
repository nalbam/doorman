import React, { Component, Fragment } from 'react';

import { API } from 'aws-amplify'

import StackGrid from "react-stack-grid";

import HistoryItem from './HistoryItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.getHistory();
  }

  state = {
    items: [],
  }

  getHistory = async () => {
    const res = await API.get('history', '/items/' + this.props.user_id);
    if (res && res.length > 0) {
      let items = res.sort(this.compare).reverse();

      console.log(items)

      this.setState({ items: items });
    } else {
      this.setState({ items: [] });
    }
    setTimeout(this.getHistory, 5000);
  }

  compare(a, b) {
    let a1 = a.visited;
    let b1 = b.visited;
    if (a1 < b1) {
      return -1;
    } else if (a1 > b1) {
      return 1;
    }
    return 0;
  }

  render() {
    const list = this.state.items.map(
      (item, index) => (<HistoryItem key={index} item={item} user_id={this.props.user_id} />)
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
