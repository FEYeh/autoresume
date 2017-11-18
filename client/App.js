import React from 'react';
import Home from './components/home'
import Resumes from './components/resumes'
import Templates from './components/templates'
import Layout from './layout'
import NotFound from './notfound'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const AppLayout = () => (
  <Layout>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/resumes" component={Resumes} />
        <Route path="/templates" component={Templates} />
    </Switch>
  </Layout>
)

export default () =>
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>