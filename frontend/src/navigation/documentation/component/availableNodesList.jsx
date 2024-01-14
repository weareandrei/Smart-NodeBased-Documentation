/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import MaxNodeNav from "./maxNodeNav"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"
import Collapse from '@mui/material/Collapse'
import filter from "lodash/filter"
import find from "lodash/find"
import List from "@mui/material/List"
import map from "lodash/map"
import get from "lodash/get"
import Typography from "@mui/material/Typography"
import {ListItem} from "@mui/material"
import NodeIcon from "../../../documentation/component/nodeIcon"
import IconButton from "@mui/material/IconButton"
import {selectParentNode} from "../../../documentation/action";

const MAX_NODES_LEVEL = 3

export default class AvailableNodesList extends React.Component {

    static propTypes = {
        allNodes: PropTypes.array.isRequired,
        selectedNodeChildren: PropTypes.array.isRequired,
        selectedNode: PropTypes.object,
        selectNode: PropTypes.func.isRequired,
        selectParentNode: PropTypes.func.isRequired
    }

    static defaultProps = {
        selectedNode: null
    }

    state = {
        expandedNodesList: []
    }

    render = () => {
        const pageNodes = filter(this.props.selectedNodeChildren, (node) => (node.type === 'page' || node.type === 'current page'))
        // console.log('this.props.selectedNode', this.props.selectedNode)
        // console.log('this.props.selectedNodeChildren', this.props.selectedNodeChildren)
        // console.log('pageNodes', pageNodes)
        const initialPageNodes = this.findInitialNodes(pageNodes)
        const previousParent = this.findGlobalParent(get(initialPageNodes, '[0].id', 'id non-existent')) // check if parent exists out of given bounds of selectedNodeChildren

        return (
            <div style={style.mainContainer}>
                <Typography style={{color: '#938EA6', fontSize: '16px', fontWeight: 500}}>Available</Typography>
                <div style={{marginTop: '10px'}}>
                    {this.props.selectedNode !== null && this.displayBackButton(previousParent)}
                    {this.displayNodesTree(initialPageNodes, 0)}
                </div>
            </div>
        )
    }

    displayNodesTree = (nodes, level) => {
        return (
            <List disablePadding style={style.nodesListContainer(level)}>
                {map(nodes, (node) =>
                    this.displayNode(node, level))}
            </List>
        )
    }

    displayNode = (node, level) => {
        const nodesChildrenPages = this.findNodesFromIdsThatArePages(get(node, 'children', []))
        if (nodesChildrenPages.length > 0 && level <= MAX_NODES_LEVEL) {
            return (
                <ListItem style={style.nodesListItem}>
                    <MaxNodeNav label={node.title}
                                nodeType={node.type}
                                nodeId={node.id}
                                onExpanded={this.nodeExpanded}
                                onClick={this.nodeClicked}
                                isParent={true}/>
                    <Collapse in={this.isNodeExpanded(node.id)}
                              timeout="auto"
                              unmountOnExit
                              style={style.nodesListContainer(0)}>
                        {this.displayNodesTree(nodesChildrenPages, level+1)}
                    </Collapse>
                </ListItem>
            )
        } else {
            return (
                <ListItem style={style.nodesListItem}>
                    <MaxNodeNav label={node.title}
                                nodeType={node.type}
                                nodeId={node.id}
                                onExpanded={this.nodeExpanded}
                                onClick={this.nodeClicked}/>
                </ListItem>

            )
        }

    }

    displayBackButton = (previousParent) => {
        if (previousParent === undefined) {
            return (
                <MaxNodeNav label={'Return to origin'}
                            nodeType={'backButton'}
                            nodeId={'root'}
                            onClick={this.backButtonClicked}/>
            )
        }

        return (
            <MaxNodeNav label={previousParent.title}
                        nodeType={'backButton'}
                        nodeId={previousParent.id}
                        onClick={this.backButtonClicked}/>
        )
    }


    backButtonClicked = () => {
        this.props.selectParentNode()
    }

    isNodeExpanded = (consideredNodeId) => {
        return find(this.state.expandedNodesList, (nodeId) => nodeId === consideredNodeId) !== undefined
    }

    nodeClicked = (nodeId) => {
        const node = find(this.props.allNodes, (node) => node.id === nodeId)
        this.props.selectNode(node)
    }

    nodeExpanded = (nodeId, expanded) => {
        if (expanded) {
            // Add nodeId to the expandedNodesList
            this.setState(prevState => ({
                expandedNodesList: [...prevState.expandedNodesList, nodeId]
            }))
        } else {
            // Remove nodeId from the expandedNodesList
            this.setState(prevState => ({
                expandedNodesList: filter(prevState.expandedNodesList, (id) => id !== nodeId)
            }))
        }
    }

    findNodesFromIdsThatArePages = (ids) => {
        const nodesFound = filter(this.props.allNodes, (node) => ids.includes(node.id))
        const pages = filter(nodesFound, (node) => node.type === 'page' || node.type === 'current page')
        return pages
    }

    findInitialNodes = (givenNodes) =>
        filter(givenNodes, (node) => {
            const nodeId = node.id

            // find its parent
            const parent = find(givenNodes, (node) => {
                const nodesChildren = get(node, 'children', [])
                if (nodesChildren.includes(nodeId)) {
                    // then this is not an initial node
                    return true
                }
            })

            if (!parent) {
                return true
            }
            return false
        })

    findGlobalParent = (nodeId) =>
        find(this.props.allNodes, (node) => {
            const nodesChildren = get(node, 'children', [])
            if (nodesChildren.includes(nodeId)) {
                // then this is not an initial node
                return true
            }
        })

}

const style = {
    mainContainer: {
        width: '100%',
        marginTop: '15px'
    },
    nodesListContainer: (level) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'left',
        width: '100%',
        paddingLeft: level * 10 + 'px',
    }),
    nodesListItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'left',
        padding: '0px'
    }
}