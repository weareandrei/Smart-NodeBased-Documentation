import React from 'react'
import {connect} from 'react-redux'
import {withCookies} from "react-cookie"
import {withRouter} from "react-router-dom"
import {withMediaQuery} from "../common/media"
import {Container} from "@mui/material"
import * as actions from './action'
import PropTypes from "prop-types"
import isEmpty from "lodash/isEmpty"

import NodesGridSurface from './component/nodesGridSurface'

class Documentation extends React.Component {

    static propTypes = {
        selectedNode: PropTypes.object.isRequired,
        displayedNodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired,
        updateNode: PropTypes.func.isRequired
    }

    static defaultProps = {
        displayedNodes: []
    }

    render() {
        return (
            <div className={'h-full w-full'} style={{paddingLeft: '250px'}}>

                {/*Hello World*/}
                {/*<div style={{background: 'red', width: '100%', height: '100%'}}></div>*/}
                {!isEmpty(this.props.displayedNodes) && this.renderNodesGrid()}
            </div>
        )
    }

    renderNodesGrid = () =>
        <NodesGridSurface nodes={this.props.displayedNodes}
                          selectNode={this.props.selectNode}
                          updateNode={this.props.updateNode}/>

}

export default connect((state) => ({
    selectedNode: state.documentation.selectedNode,
    displayedNodes: state.documentation.displayedNodes
}), actions)(withCookies(withRouter(withMediaQuery(Documentation))))
