import React from 'react'
import {connect} from 'react-redux'
import {withCookies} from "react-cookie"
import {withRouter} from "react-router-dom"
import {withMediaQuery} from "../common/media"
import {Container} from "@mui/material"
import * as actions from './action'
import PropTypes from "prop-types"

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
            <Container style={style.gridBackground}>
                <NodesGridSurface initialNodes={this.props.displayedNodes}
                                  selectNode={this.props.selectNode}
                                  updateNode={this.props.updateNode}/>
            </Container>
        )
    }

}

const style = {
    gridBackground: {
        background: 'white',
        backgroundImage: 'radial-gradient(#9C9C9C 1px, transparent 0)',
        backgroundSize: '20px 20px',
        backgroundPosition: '-19px -19px',
        height: '100vh',
        width: '100vw'
    }
}

export default connect((state) => ({
    selectedNode: state.documentation.selectedNode,
    displayedNodes: state.documentation.displayedNodes
}), actions)(withCookies(withRouter(withMediaQuery(Documentation))))
