import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    let href = `/users/${this.props.item.user_id}`;

    return (
      <Fragment>
        <li className='grid-item'>
          <div><a href={href}><img src={this.props.item.image_url} alt={this.props.item.user_name} className='grid-photo' /></a></div>
          <div className='grid-name'>{this.props.item.real_name}</div>
        </li>
      </Fragment>
    );
  }
}

export default App;
