import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    let diff = (Date.now() - this.props.item.visited) / 1000;

    if (diff < 60) {
      diff = parseInt(diff) + '초 전';
    } else if (diff < 60 * 60) {
      diff = parseInt(diff / 60) + '분 전';
    } else if (diff < 60 * 60 * 24) {
      diff = parseInt(diff / (60 * 60)) + '시간 전';
    } else {
      diff = parseInt(diff / (60 * 60 * 24)) + '일 전';
    }

    return (
      <Fragment>
        <li className='grid-item'>
          <div><img src={this.props.item.image_url} alt={this.props.item.user_name} className='grid-photo' /></div>
          <div className='grid-name'>{diff}</div>
        </li>
      </Fragment>
    );
  }
}

export default App;
