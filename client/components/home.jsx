import React, { Component } from 'react';

const sohoImg = require('../asset/image/soho.gif')

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <div>I Love BeiJing. See? The beautiful WangJing SOHO.</div>
          <img alt="SOHO" src={sohoImg} style={{ width: '100%' }} />
        </div>
      </div>
    )
  }
}
