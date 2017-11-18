import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import logo from './asset/image/ar@64x64-white.png';
const { Sider } = Layout;

export default class AntSideBar extends Component {
  render() {
    return (
      <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <div className="logo">
          <img className='banner' src={logo} />
          AutoResume
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link className="item" to={`/`}>
              <Icon type="home" />
              <span className="nav-text">Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link className="item" to={`/resumes`}>
              <Icon type="user" />
              <span className="nav-text">Resumes</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link className="item" to={`/templates`}>
              <Icon type="video-camera" />
              <span className="nav-text">Templates</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}