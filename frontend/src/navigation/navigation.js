/* eslint-disable max-lines */
import React from 'react'
import * as actions from './action'
import {connect} from 'react-redux'
import {withCookies} from 'react-cookie'
import {withMediaQuery} from '../common/media'
import {withRouter} from 'react-router-dom'

import Box from '@mui/material/Box'

import NavigationTop from './navigationTop'
import NavigationLeft from './navigationLeft'

class Navigation extends React.Component {

    render() {
        return this.renderNavigation()
    }

    renderNavigation = () =>
        <div style={style.navigationContainer}>
            <NavigationTop/>
            <NavigationLeft/>
        </div>

}

const style = {
    navigationContainer: {
        position: 'fixed'
    }
}

export default connect((state) => ({
    isMobile: false
}), actions)(withCookies(withRouter(withMediaQuery(Navigation))))
