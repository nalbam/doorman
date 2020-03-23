import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    let href = `/users/${this.props.item.user_id}`;

    let thermal = '';

    if (this.props.item.thermal === 'o') {
      let thermal_url = '';
      let item_count = this.props.item.image_url.split('/').length;
      if (item_count > 5) {
        if (this.props.user_type === 'detected') {
          thermal_url = this.props.item.image_url.replace(/detected\/[a-z0-9-]+/gi, 'thermal');
        } else if (this.props.user_type === 'unknown') {
          thermal_url = this.props.item.image_url.replace(/unknown\/[a-z0-9-]+/gi, 'thermal');
        }
      } else {
        if (this.props.user_type === 'detected') {
          thermal_url = this.props.item.image_url.replace(/detected/gi, 'thermal');
        } else if (this.props.user_type === 'unknown') {
          thermal_url = this.props.item.image_url.replace(/unknown/gi, 'thermal');
        }
      }
      if (thermal_url !== '') {
        thermal = <div><img src={thermal_url} alt={this.props.item.user_name} className='grid-thermal' /></div>
      }
    }

    return (
      <Fragment>
        <li className='grid-item'>
          {thermal}
          <div><a href={href}><img src={this.props.item.image_url} alt={this.props.item.user_name} className='grid-photo' /></a></div>
          <div className='grid-name'>{this.props.item.real_name}</div>
        </li>
      </Fragment>
    );
  }
}

export default App;
