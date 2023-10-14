/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Divider from "@mui/material/Divider"
import map from "lodash/map"

import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import NavTreeItem from './component/navTreeItem'

export default class DocumentationBar extends React.Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        documentation: PropTypes.object.isRequired,
        selectNode: PropTypes.func.isRequired
    }

    state = {
        currentAvailableNodes: []
    }

    componentDidUpdate(prevProps) {
        if (prevProps.documentation !== this.props.documentation) {
            const newNodes = this.props.documentation.children
            console.log('newHeaders', newNodes)
            this.setState({
                currentAvailableNodes: newNodes,
            })
        }
    }

    componentDidMount() {
        console.log('this.props.documentation, ', this.props.documentation)
        const newNodes = this.props.documentation.children

        this.setState({
            currentAvailableNodes: newNodes,
        })
    }

    render() {
        return this.props.documentation && this.renderDocumentationBar()
    }

    renderDocumentationBar = () =>
        <AppBar style={style.documentationBar.container}>
            <div> Back button </div>

            <Divider orientation="horizontal" sx={{width: '2px', background: '#fff'}}/>

            <div>
                {this.renderDocumentationTree(this.state.currentAvailableNodes)}
            </div>
        </AppBar>

    renderDocumentationTree = (nodesTree) =>
        <div>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Documentation Headers
                    </ListSubheader>}>

                {
                    map(nodesTree, (node) =>
                    <NavTreeItem
                        key={node.nodeId}
                        title={node.title}
                        childDepthLevel={1}
                        node={node}
                        onClick={this.props.selectNode}/>)}
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
            paddingTop: '60px',
            left: '68px',
            width: '200px',
            background: '#fff',
            color: '#111',
            zIndex: '1000'
        }
    }
}
