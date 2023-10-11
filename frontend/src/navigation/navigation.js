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
import PropTypes from "prop-types";

class Navigation extends React.Component {

    static propTypes = {
        // history: PropTypes.object.isRequired,
        fullNav: PropTypes.bool.isRequired
    }

    render = () =>
        this.props.fullNav ? this.renderFullNavigation() : this.renderMiniNavigation()

    renderFullNavigation = () =>
        <div style={style.navigationContainer}>
            <NavigationTop/>
            <NavigationLeft/>
        </div>

    renderMiniNavigation = () => <NavigationTop/>

}

const style = {
    navigationContainer: {
        position: 'fixed'
    }
}

export default connect((state) => ({
    isMobile: false
}), actions)(withCookies(withRouter(withMediaQuery(Navigation))))
