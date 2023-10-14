import React from 'react'
import {connect} from 'react-redux'
import {withCookies} from "react-cookie"
import {withRouter} from "react-router-dom"
import {withMediaQuery} from "@/common/media"
import {Container} from "@mui/material"
import * as actions from './action'
import PropTypes from "prop-types"
import isEmpty from "lodash/isEmpty"
import map from "lodash/map"
import Node from './component/node'

class Documentation extends React.Component {

    static propTypes = {
        selectedNode: PropTypes.object.isRequired,
        selectNode: PropTypes.func.isRequired
    }

    render() {
        return (
            <Container style={style.gridBackground}
                       ref={this.containerRef}>
                {
                    !isEmpty(this.props.selectedNode.children) &&
                    // this.calculateNodesPosition(this.props.selectedNode.children) &&
                    map(this.props.selectedNode.children, (nodeChild, index) =>
                        <Node key={index} node={nodeChild} firstLevel={true}></Node>
                    )
                }
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
        width: '100vw',
        display: 'flex',
        flexDirection: 'horizontal',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
}

export default connect((state) => ({
    selectedNode: state.documentation.selectedNode
}), actions)(withCookies(withRouter(withMediaQuery(Documentation))))
