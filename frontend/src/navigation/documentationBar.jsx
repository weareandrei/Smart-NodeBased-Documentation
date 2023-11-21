/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Divider from "@mui/material/Divider"

import map from "lodash/map"
import isEmpty from "lodash/isEmpty"
import get from "lodash/get"

import List from '@mui/material/List'
import NavTreeItem from './component/navTreeItem'
import Button from "@mui/material/Button";

export default class DocumentationBar extends React.Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        documentation: PropTypes.object.isRequired,
        displayedNodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired
    }

    // state = {
    //     currentAvailableNodes: []
    // }
    //
    // componentDidUpdate(prevProps) {
    //     if (prevProps.documentation !== this.props.documentation) {
    //         const newNodes = this.props.documentation.doc
    //         this.setState({
    //             currentAvailableNodes: newNodes,
    //         })
    //     }
    // }
    //
    // componentDidMount() {
    //     const newNodes = this.props.documentation.doc
    //
    //     this.setState({
    //         currentAvailableNodes: newNodes,
    //     })
    // }

    render() {
        return !isEmpty(this.props.displayedNodes) && this.renderDocumentationBar()
    }

    renderDocumentationBar = () =>
        <AppBar style={style.documentationBar.container}>
            <Button variant="text"
                    style={style.goBackButton}
                    onClick={() => this.props.selectNode(this.props.documentation)}>
                <p style={{margin: '0', padding: '7px', textAlign: 'center', width: '100%'}}>
                    Go back...
                </p>
            </Button>
            <Divider orientation="horizontal" sx={{width: '2px', background: '#fff'}}/>

            <div>
                {this.renderDocumentationTree(this.props.displayedNodes)}
            </div>
        </AppBar>

    renderDocumentationTree = (nodes) =>
        <div>
            <List
                sx={{ width: '100%', maxWidth: 360, bgColor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                // subheader={
                //     <ListSubheader component="div" id="nested-list-subheader">
                //         Documentation Headers
                //     </ListSubheader>}
            >
                {map(nodes, (node) => {
                    // Create a new object without the 'children' property
                    const nodeWithoutChildren = { ...node, children: undefined }
                    if (get(node, 'title', false) !== false) {
                        return (
                            <NavTreeItem
                                key={node.id}
                                title={node.title}
                                childDepthLevel={1}
                                node={nodeWithoutChildren}
                                onClick={this.props.selectNode}
                            />
                        )
                    }
                })}
            </List>
        </div>

}

const navContainer = {
    right: 'auto',
    height: '100vh',
}

const style = {
    appBar: {
        container: {
            ...navContainer,
            left: 0,
            display: 'flex',
            flexDirection: 'vertical',
            padding: '14px',
            width: '68px',
            background: '#788390',
            zIndex: '1002'
        },
        appsContainer: {
            display: 'flex',
            flexDirection: 'column-reverse',
            height: '100%'
        },
        logoImage: {
            width: '100%',
            objectFit: 'contain'
        },
        icon: {
            fontSize: '30'
        }
    },
    documentationBar: {
        container: {
            ...navContainer,
            padding: '15px',
            paddingTop: '60px',
            left: '4rem',
            width: '250px',
            background: '#fff',
            color: '#111',
            zIndex: '1000'
        }
    },
    goBackButton: {
        marginTop: '10px',
        fontSize: '14px',
        color: '#000',
        width: '100%'
    }
}
