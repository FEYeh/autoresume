import React, { Component } from 'react';
import { debounce } from 'lodash';

import App from './App';

export default class ResizeIndex extends Component {
  // 窗口大小改变回调
  static resizeCallback() {
    let style = document.getElementById('custom-style');
    const height = window.innerHeight - 205;
    if (style) {
      style.innerText = `.ui.dimmer .ui.modal .content{max-height:${height}px !important;}`;
    } else {
      style = document.createElement('style');
      style.type = 'text/css';
      style.id = 'custom-style';
      style.innerText = `.ui.dimmer .ui.modal .content{max-height:${height}px !important;}`;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }
  componentDidMount() {
    this.resizeHandler = debounce(ResizeIndex.resizeCallback, 50);
    window.addEventListener('resize', this.resizeHandler);
    ResizeIndex.resizeCallback();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }
  render() {
    return <App />
  }
}
