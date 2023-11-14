import React from 'react'
import {connect} from 'react-redux'
import {withCookies} from "react-cookie"
import {withRouter} from "react-router-dom"
import {withMediaQuery} from "../common/media"
import * as actions from './action'
import PropTypes from "prop-types"
import isEmpty from "lodash/isEmpty"

import NodesGridSurface from './component/nodesGridSurface'

class Documentation extends React.Component {

    static propTypes = {
        documentation: PropTypes.object.isRequired,
        selectedNode: PropTypes.object.isRequired,
        displayedNodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired,
        nodesSyncQueue: PropTypes.array.isRequired,
        registerNodeUpdate: PropTypes.func.isRequired,
        syncNodes: PropTypes.func.isRequired,
    }

    render() {
        return (
            <div className={'h-full w-full'} style={{paddingLeft: '250px'}}>
                {!isEmpty(this.props.displayedNodes) && this.renderNodesGrid()}
            </div>
        )
    }

    renderNodesGrid = () => {
        console.log('this.props.displayedNodes :', this.props.displayedNodes)
        return (
            <NodesGridSurface nodes={this.props.displayedNodes}
                              selectNode={this.props.selectNode}
                              nodeModified={this.nodeModified}/>
        )
    }

    nodeModified = (node) => {
        this.props.registerNodeUpdate(this.props.documentation, node)
        this.props.syncNodes()

    }

}

export default connect((state) => ({
    documentation: state.documentation.documentation,
    selectedNode: state.documentation.selectedNode,
    displayedNodes: state.documentation.displayedNodes,
    nodesSyncQueue: state.documentation.nodesSyncQueue
}), actions)(withCookies(withRouter(withMediaQuery(Documentation))))
