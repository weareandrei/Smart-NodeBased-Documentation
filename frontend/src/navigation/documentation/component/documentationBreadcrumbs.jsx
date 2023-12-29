/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import {Breadcrumbs, Link} from "@mui/material"
import Typography from "@mui/material/Typography"
import map from "lodash/map"
import find from "lodash/find"
import get from "lodash/get"
import flatten from "lodash/flatten"

export default class DocumentationBreadcrumbs extends React.Component {

    static propTypes = {
        allNodes: PropTypes.array.isRequired,
        project: PropTypes.object.isRequired,
        selectedNode: PropTypes.object,
        selectNode: PropTypes.func.isRequired
    }

    render = () => {
        const selectedNodePath = this.findNodeParentChain(get(this.props, 'selectedNode.id', ''))
        console.log('BREADCRUMBS', selectedNodePath)
        return (
            <div style={style.mainContainer}>
                <Breadcrumbs aria-label="breadcrumb" style={style.breadcrumbsContainer}>
                    <Link underline="hover" color="#938EA6" style={{...style.breadcrumb, fontWeight: '600'}}>
                        {this.props.project.title}
                    </Link>
                    {this.renderBreadCrumbs(selectedNodePath)}
                </Breadcrumbs>
            </div>
        )
    }

    renderBreadCrumbs = (selectedNodePath) =>
        map(selectedNodePath, (node) => {
            // if last node id
            // <Typography color="text.primary">Breadcrumbs</Typography>
            return (
                <Link underline="hover"
                      color="#938EA6"
                      onClick={() => this.props.selectNode(node.id)}
                      style={style.breadcrumb}>
                    {node.title}
                </Link>
            )
        })

    findNodeParentChain = (nodeId) => {
        if (nodeId === '') {
            return []
        }

        const nodeParent = this.findNodeParent(nodeId)

        if (!nodeParent) {
            return []
        } else {
            return flatten([nodeParent, this.findNodeParentChain(nodeParent.id)])
        }
    }

    findNodeParent = (nodeId) =>
        find(this.props.allNodes, (node) => get(node, 'children', []).includes(nodeId))

}

const style = {
    mainContainer: {
        width: '100%'
    },
    breadcrumbsContainer: {
        fontSize: '12px',
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto'
    },
    breadcrumb: {
        flex: '1',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }
}
