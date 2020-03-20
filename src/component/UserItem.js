import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    let href = `/users/${this.props.item.user_id}`;

    let thermal = '';

    // if (this.props.item.thermal === 'o') {
    //   console.log('thermal_url: ' + this.props.item.thermal);
    //   // https://s3.amazonaws.com/detected/ffee21-c55d2c/1584691059.jpg
    //   let thermal_url = this.props.item.image_url;
    //   const regex = /detected\/[a-z0-9-]+/gi;
    //   thermal_url.replace(regex, 'thermal');
    //   console.log('thermal_url: ' + thermal_url);
    //   thermal = <div className='person-thermal'><img src={thermal_url} alt={this.props.item.user_name} /></div>
    // }

    return (
      <Fragment>
        <div className='person-item'>
          {thermal}
          <div><a href={href}><img src={this.props.item.image_url} alt={this.props.item.user_name} className='person-photo' /></a></div>
          <div className='person-name'>{this.props.item.real_name}</div>
        </div>
      </Fragment>
    );
  }
}

export default App;
