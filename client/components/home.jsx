import React, { Component } from 'react';

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
        I Love BeiJing
      </div>
    )
  }
}
