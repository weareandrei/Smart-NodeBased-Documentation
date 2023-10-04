import React from 'react'
import {Route, Switch} from 'react-router-dom'
import loadable from '@loadable/component'
import map from 'lodash/map'
import InnerContainer from '../common/innerContainer'

const Store = loadable(() => import(/*webpackChunkName: "store"*/'../store/store'))
const FeaturedStore = loadable(() => import(/*webpackChunkName: "featuredStore"*/'../featuredstore/featuredStore'))

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
    {exact: true, path: '/store', component: FeaturedStore},
    {exact: true, path: '/store/:slug', component: Store},
    {component: NoMatch}]

export default Routes
