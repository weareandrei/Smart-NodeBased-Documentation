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
        nodesSyncQueue: PropTypes.array.isRequired,
        registerNodeUpdate: PropTypes.func.isRequired,
        registerNodeCreate: PropTypes.func.isRequired,
        syncNodes: PropTypes.func.isRequired,

        // documentation props
        documentation: PropTypes.object.isRequired,
        selectNode: PropTypes.func.isRequired,
        selectedNode: PropTypes.object,
        selectedNodeChildren: PropTypes.array.isRequired
    }

    render() {
        return (
            <div style={{height: '100vh', paddingLeft: '300px', background: '#F7F5FA'}}>
                {this.renderNodesGridSurface()}
            </div>
        )
    }

    renderNodesGridSurface = () => {
        return (
            <NodesGridSurface nodes={this.props.selectedNodeChildren}
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
    nodesSyncQueue: state.documentation.nodesSyncQueue,

    // documentation
    documentation: state.documentation.documentation,
    selectedNode: state.documentation.selectedNode,
    selectNode: PropTypes.func.isRequired,
    selectedNodeChildren: state.documentation.selectedNodeChildren
}), actions)(withCookies(withRouter(withMediaQuery(Documentation))))
