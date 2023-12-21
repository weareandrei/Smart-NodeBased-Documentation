import React from 'react'
import {connect} from 'react-redux'
import {withCookies} from "react-cookie"
import {withRouter} from "react-router-dom"
import {withMediaQuery} from "../common/media"
import * as actions from './action'
import PropTypes from "prop-types"
import isEmpty from "lodash/isEmpty"
import find from "lodash/find"

import NodesGridSurface from './component/nodesGridSurface'

class Documentation extends React.Component {

    static propTypes = {
        documentation: PropTypes.object.isRequired,
        selectedNode: PropTypes.object.isRequired,
        displayedNodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired,
        nodesSyncQueue: PropTypes.array.isRequired,
        registerNodeUpdate: PropTypes.func.isRequired,
        registerNodeCreate: PropTypes.func.isRequired,
        syncNodes: PropTypes.func.isRequired,
    }

    render() {
        return (
            <div className={'h-full w-full'} style={{paddingLeft: '300px+77px', background: '#F7F5FA'}}>
                {/*{!isEmpty(this.props.displayedNodes) && this.renderNodesGrid()}*/}
            </div>
        )
    }

    renderNodesGrid = () => {
        return (
            <NodesGridSurface nodes={this.props.displayedNodes}
                              allNodes = {this.props.documentation.doc}
                              selectNode={this.props.selectNode}
                              nodeModified={this.nodeModified}/>
        )
    }

    nodeModified = (node) => {
        this.isNewNode(node) ?
            this.props.registerNodeCreate(this.props.documentation, node, this.props.selectedNode.id) :
            this.props.registerNodeUpdate(this.props.documentation, node)
        this.props.syncNodes()

    }

    isNewNode = (thisNode) => {
        const nodes = this.props.documentation.doc
        const nodeFound = find(nodes, (node) => node.id === thisNode.id)

        console.log(' -- isNewNode ? ', thisNode.id, '->', nodeFound)
        if (nodeFound === undefined) {
            return true
        }

        return false
    }

}

export default connect((state) => ({
    documentation: state.documentation.documentation,
    selectedNode: state.documentation.selectedNode,
    displayedNodes: state.documentation.displayedNodes,
    nodesSyncQueue: state.documentation.nodesSyncQueue
}), actions)(withCookies(withRouter(withMediaQuery(Documentation))))
