import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    let diff = (Date.now() - this.props.item.latest) / 1000;

    if (diff < 60) {
      diff = parseInt(diff) + '초 전';
    } else if (diff < 60 * 60) {
      diff = parseInt(diff / 60) + '분 전';
    } else if (diff < 60 * 60 * 24) {
      diff = parseInt(diff / (60 * 60)) + '시간 전';
    } else {
      diff = parseInt(diff / (60 * 60 * 24)) + '일 전';
    }

    let temp = '';

    if (this.props.item.temperature) {
      temp = ` (${this.props.item.temperature}) `;
    }

    let thermal = '';

    if (this.props.item.thermal === 'o') {
      let thermal_url = '';
      let item_count = this.props.item.image_url.split('/').length;
      if (item_count > 5) {
        if (this.props.user_type === 'detected') {
          thermal_url = this.props.item.image_url.replace(/detected\/[a-z0-9-]+/gi, 'thermal');
        } else {
          thermal_url = this.props.item.image_url.replace(/unknown\/[a-z0-9-]+/gi, 'thermal');
        }
      } else {
        if (this.props.user_type === 'detected') {
          thermal_url = this.props.item.image_url.replace(/detected/gi, 'thermal');
        } else {
          thermal_url = this.props.item.image_url.replace(/unknown/gi, 'thermal');
        }
      }
      if (thermal_url !== '') {
        thermal = <div><img src={thermal_url} alt={this.props.item.visited} className='grid-thermal' /></div>
      }
    }

    return (
      <Fragment>
        <li className='grid-item'>
          {thermal}
          <div><img src={this.props.item.image_url} alt={this.props.item.visited} className='grid-photo' /></div>
          <div className='grid-name'>{diff} {temp}<br />{this.props.item.device_id}</div>
        </li>
      </Fragment>
    );
  }
}

export default App;
