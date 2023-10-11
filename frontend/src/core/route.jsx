import React from 'react'
import {Route, Switch} from 'react-router-dom'
import loadable from '@loadable/component'

const Dashboard = loadable(() => import(/*webpackChunkName: "store"*/'../dashboard/dashboard'))
const Auth = loadable(() => import(/*webpackChunkName: "store"*/'../auth/auth'))
const Documentation = loadable(() => import(/*webpackChunkName: "store"*/'../documentation/documentation'))
const Tasks = loadable(() => import(/*webpackChunkName: "store"*/'../tasks/tasks'))

const Routes = () =>
    <Switch>
        <Route exact path="/" component={Auth} />
        <Route path={`/auth`} component={Auth} />
        <Route path={`/dashboard`} component={Dashboard} />
        <Route path={`/documentation`} component={Documentation} />
        <Route path={`/tasks`} component={Tasks} />
    </Switch>

export default Routes
