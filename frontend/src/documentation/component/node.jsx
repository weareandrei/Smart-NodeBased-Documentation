import React from 'react'
import {Container} from "@mui/material"
import PropTypes from "prop-types"
import map from "lodash/map"
import MainNode from "./mainNode"

export default class Node extends React.Component {

    static propTypes = {
        node: PropTypes.object.isRequired,
        firstLevel: PropTypes.bool
    }

    static defaultProps = {
        firstLevel: false
    }

    render = () =>
        <div>
            {this.props.firstLevel ?
                this.renderMainNode(this.props.node) :
                this.renderRegularNode(this.props.node)}
            <div style={style.nodeContainer}>
                {this.props.node.children &&
                    map(this.props.node.children, (nodeChild, index) =>
                        <Node key={index} node={nodeChild}></Node>)}
            </div>
        </div>

    renderMainNode = (node) =>
        <MainNode node={node}/>

    renderRegularNode = () =>
        <Container style={style.regularNode}>
            <div style={{color: '#fff'}}>{this.props.node.title}</div>
        </Container>
}

const style = {
    nodeContainer: {
        display: 'flex',
        flexDirection: 'horizontal',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    regularNode: {
        width: '180px',
        height: '86px',
        margin: '25px',
        padding: '16px',
        background: '#788390',
        borderRadius: '20px'
    }
}
