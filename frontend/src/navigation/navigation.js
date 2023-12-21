/* eslint-disable max-lines */
import React from 'react'
import * as actions from './action'

import {connect} from 'react-redux'
import {withCookies} from 'react-cookie'
import {withMediaQuery} from '../common/media'
import {withRouter} from 'react-router-dom'

import NavigationMenu from './navigationMenu'
import PropTypes from "prop-types"
import DocumentationNavBar from "./documentation/documentationNavBar"

class Navigation extends React.Component {

    static propTypes = {
        signOut: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,

        // documentation props
        allNodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired,
        selectedNode: PropTypes.object
    }

    static defaultProps = {
        selectedNode: null
    }

    render = () => {
        return (
            <div className='fixed'>
                <NavigationMenu history={this.props.history}/>
                {this.props.history.location.pathname === '/documentation' && this.renderDocumentationNavBar()}
                {this.props.history.location.pathname === '/tasks' && this.renderTasksNavBar()}
                {this.props.history.location.pathname === '/assistant' && this.renderAssistantNavBar()}
            </div>
        )
    }

    renderDocumentationNavBar = () =>
        <DocumentationNavBar
            allNodes={this.props.allNodes}
            selectNode={this.props.selectNode}
            selectedNode={this.props.selectedNode}/>

    renderTasksNavBar = () => {

    }

    renderAssistantNavBar = () => {

    }


}

const style = {
    navigationContainer: {
        position: 'fixed'
    }
}

export default connect((state) => ({
    isMobile: false,
    allNodes: state.documentation.allNodes,
    selectedNode: state.documentation.selectedNode,
    selectedChildNodes: state.documentation.selectedChildNodes
}), actions)(withCookies(withRouter(withMediaQuery(Navigation))))
