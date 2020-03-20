import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    let href = `/users/${this.props.item.user_id}`;

    let thermal = '';

    if (this.props.item.thermal === 'o') {
      let thermal_url = this.props.item.image_url.replace(/detected\/[a-z0-9-]+/gi, 'thermal');
      thermal = <div><img src={thermal_url} alt={this.props.item.user_name} className='grid-thermal' /></div>
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
