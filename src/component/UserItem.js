import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    let href = `/users/${this.props.item.user_id}`;

    return (
      <Fragment>
        <div className='person-item'>
          <div><a href={href}><img src={this.props.item.image_url} alt={this.props.item.user_name} className='person-photo' /></a></div>
          <div className='person-name'>{this.props.item.real_name}</div>
        </div>
      </Fragment>
    );
  }
}

export default App;
