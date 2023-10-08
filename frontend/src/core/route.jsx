import React from 'react'
import {Route, Switch} from 'react-router-dom'
import loadable from '@loadable/component'

const MainPage = loadable(() => import(/*webpackChunkName: "store"*/'../main/main'))
const Auth = loadable(() => import(/*webpackChunkName: "store"*/'../auth/auth'))

const Routes = () =>
    <Switch>
        <Route exact path="/" component={Auth} />
        <Route path={`/auth`} component={Auth} />
        <Route path={`/main`} component={MainPage} />
    </Switch>

export default Routes
