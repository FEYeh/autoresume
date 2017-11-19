import React, { Component } from 'react';
import { Button } from 'antd'

export default class Templates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  render() {
    return (
      <div>
        <Button type="primary">Templates</Button>
      </div>
    )
  }
}
