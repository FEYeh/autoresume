import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import logo from './asset/image/ar@64x64-white.png';

const { Sider } = Layout;

const Menus = [{
  key: 1,
  title: 'Dashboard',
  to: '/',
  icon: 'home',
}, {
  key: 2,
  title: 'Resumes',
  to: '/resumes',
  icon: 'bars',
}, {
  key: 3,
  title: 'Templates',
  to: '/templates',
  icon: 'appstore',
}]
export default () => {
  const pathHash = window.location.hash;
  const current = Menus
    .filter(m => pathHash === `#${m.to}`)
    .map(m => `${m.key}`);
  return (
    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
      <div className="logo">
        <img className="banner" src={logo} alt="AutoResume" />
        AutoResume
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={current}>
        {
          Menus.map(m => (
            <Menu.Item key={m.key}>
              <Link className="item" to={m.to}>
                <Icon type={m.icon} />
                <span className="nav-text">{m.title}</span>
              </Link>
            </Menu.Item>
          ))
        }
      </Menu>
    </Sider>
  )
}
