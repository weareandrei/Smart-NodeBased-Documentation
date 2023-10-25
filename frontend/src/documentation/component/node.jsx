import React from 'react'
import PropTypes from "prop-types"
import Button from '@mui/material/Button'
import {ArcherElement} from 'react-archer'
import get from "lodash/get";
import map from "lodash/map"
import isEmpty from "lodash/isEmpty";

export default class Node extends React.Component {

    static propTypes = {
        node: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired,
        firstLevel: PropTypes.bool,
        size: PropTypes.object.isRequired
    }

    static defaultProps = {
        firstLevel: false
    }

    render = () =>
        this.props.firstLevel ?
            this.renderMainNode(this.props.node) :
            this.renderRegularNode(this.props.node)

    renderMainNode = (node) => {
        const arrowRelations = this.getArrowRelations(node)
        return (
            <ArcherElement
                id={'node' + node.id}
                { ... arrowRelations }>
                <Button id={'node' + node.id} key={node.id} style={style.nodeButtonContainer}
                        onClick={() => this.props.onClick(node)}>
                    <div style={style.node(true)}>{node.title}</div>
                </Button>
            </ArcherElement>
        )
    }

    renderRegularNode = (node) =>
        <ArcherElement id={'node'+node.id}>
            <Button key={node.id} style={style.nodeButtonContainer}  onClick={() => this.props.onClick(node)}>
                <div style={style.node(false)}>{node.title}</div>
            </Button>
        </ArcherElement>

    getArrowRelations = (node) => {
        const arrowDirections = []

        if (get(node, 'children', false) && !isEmpty(node.children)) {
            map(node.children, (child) => {
                arrowDirections.push({
                    targetId: 'node' + child.id,
                    targetAnchor: 'top',
                    sourceAnchor: 'bottom',
                    style: {strokeDasharray: '5,5'}
                })
            })
        }

        return isEmpty(arrowDirections) ? {} : {arrowDirections}
    }
}

const style = {
    nodeButtonContainer: {
        width: '100%',
        height: '100%',
        background: '#3E4854'
    },
    node: (main) =>
        main ? {
            width: '100%',
            // background: '#3E4854',
            // borderRadius: '20px'
    } : {
            width: '100%',
            // background: '#788390',
            // borderRadius: '20px'
    }
}
