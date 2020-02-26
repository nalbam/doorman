import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className='person-item'>
          <div><img src={this.props.item.image_url} alt={this.props.item.user_name} className='person-photo' /></div>
          <div>{this.props.item.real_name}</div>
        </div>
      </Fragment>
    );
  }
}

export default App;
