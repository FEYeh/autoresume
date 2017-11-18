import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Sider from './sider'

const { Header, Content, Footer } = Layout;

export default class AntLayout extends Component {
  render() {
    return (
      <Layout>
        <Sider />
        <Layout style={{ marginLeft: 200, height: '100vh' }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: '500px' }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            AutoResume ©2017 Created by FEYeh
          </Footer>
        </Layout>
      </Layout>
    )
  }
}