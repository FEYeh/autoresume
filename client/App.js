import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home'
import Resumes from './components/resumes'
import ResumeHTML from './components/resumeHTML'
import CreateResume from './components/createResume'
import Templates from './components/templates'
import Layout from './layout'
import NotFound from './notfound'

const routes = [{
  path: '/create/:name',
  component: CreateResume,
}]
const AppLayout = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/resumes" component={Resumes} />
      <Route exact path="/resumes/:name" component={ResumeHTML} />
      <Route exact path="/create/:name" component={CreateResume} />
      <Route exact path="/templates" component={Templates} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
)

export default () => (
  <HashRouter>
    <AppLayout />
  </HashRouter>
)
