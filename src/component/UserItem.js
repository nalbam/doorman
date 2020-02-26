import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className='lb-row'>
          <div><img src={this.props.item.image_url} alt='logo' className='icon-logo' /></div>
          <div>{this.props.item.real_name}</div>
          <div>{this.props.item.user_name}</div>
        </div>
      </Fragment>
    );
  }
}

export default App;
