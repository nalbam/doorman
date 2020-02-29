import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    let href = `/users/${this.props.item.user_id}`;

    return (
      <Fragment>
        <li>
          <div><a href={href}><img src={this.props.item.image_url} alt={this.props.item.user_name} /></a></div>
          <div>{this.props.item.real_name}</div>
        </li>
      </Fragment>
    );
  }
}

export default App;
