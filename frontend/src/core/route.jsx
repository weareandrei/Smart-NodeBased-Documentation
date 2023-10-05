import React from 'react'
import {Route, Switch} from 'react-router-dom'
import loadable from '@loadable/component'
import map from 'lodash/map'
import InnerContainer from '../common/innerContainer'

const MainPage = loadable(() => import(/*webpackChunkName: "store"*/'../main/main'))

const Routes = () =>
    <Switch>
        {map(routes, (route) => <Route key={route.path || 'nomatch'}
                                       {...route}/>)}
    </Switch>

const NoMatch = () =>
    <InnerContainer>
        <h3>Sorry the page is not found</h3>
    </InnerContainer>

const routes = [
    {exact: true, path: '/', component: MainPage},
    {exact: true, path: '/main', component: MainPage},
    {component: NoMatch}]

export default Routes
