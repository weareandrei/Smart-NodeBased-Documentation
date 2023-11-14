/* eslint-disable max-lines */
import React from 'react'
import * as actions from './action'

import {connect} from 'react-redux'
import {withCookies} from 'react-cookie'
import {withMediaQuery} from '../common/media'
import {withRouter} from 'react-router-dom'

import NavigationTop from './navigationTop'
import NavigationLeft from './navigationLeft'
import PropTypes from "prop-types"

class Navigation extends React.Component {

    static propTypes = {
        signOut: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        fullNav: PropTypes.bool.isRequired,
        documentation: PropTypes.object.isRequired,
        selectNode: PropTypes.func.isRequired,
        displayedNodes: PropTypes.array.isRequired
    }

    render = () =>
        this.props.fullNav ? this.renderFullNavigation() : this.renderMiniNavigation()

    renderFullNavigation = () => {
        return (
            <div className='fixed'>
                <NavigationTop history={this.props.history} signOut={this.props.signOut}/>
                <NavigationLeft
                    history={this.props.history}
                    documentation={this.props.documentation}
                    selectNode={this.props.selectNode}
                    displayedNodes={this.props.displayedNodes}/>
            </div>
        )
    }

    renderMiniNavigation = () => <NavigationTop/>

}

const style = {
    navigationContainer: {
        position: 'fixed'
    }
}

export default connect((state) => ({
    isMobile: false,
    documentation: state.documentation.documentation,
    displayedNodes: state.documentation.displayedNodes,
}), actions)(withCookies(withRouter(withMediaQuery(Navigation))))
