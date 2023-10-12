/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Divider from "@mui/material/Divider"
import map from "lodash/map"
import get from "lodash/get"

import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import NavTreeItem from './component/navTreeItem'

export default class DocumentationBar extends React.Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        documentation: PropTypes.object.isRequired
    }

    state = {
        currentAvailableHeaders: []
    }

    componentDidUpdate(prevProps) {
        if (prevProps.documentation !== this.props.documentation) {
            const newHeaders = this.determineHeaders(this.props.documentation);

            this.setState({
                currentAvailableHeaders: newHeaders,
            });
        }
    }

    componentDidMount() {
        const newHeaders = this.determineHeaders(this.props.documentation);

        this.setState({
            currentAvailableHeaders: newHeaders,
        });
    }

    render() {
        return this.renderDocumentationBar()
    }

    renderDocumentationBar = () =>
        <AppBar style={style.documentationBar.container}>
            <div> Back button </div>

            <Divider orientation="horizontal" sx={{width: '2px', background: '#fff'}}/>

            <div>
                {this.renderDocumentationTree(this.state.currentAvailableHeaders)}
            </div>
        </AppBar>

    renderDocumentationTree = (headersTree) =>
        <div>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Documentation Headers
                    </ListSubheader>}>

                {map(this.state.currentAvailableHeaders, (child, index) =>
                    <NavTreeItem
                        title={child.title}
                        children={child.children}
                        childDepthLevel={1}/>)}

            </List>
        </div>


    determineHeaders = (currentDocumentation) => {
        if (currentDocumentation) {
            // if (get(currentDocumentation, '_id', false)) {
            //     currentDocumentation = currentDocumentation.doc
            // }
            //
            // const headers = map(currentDocumentation, (object) => object.title)

            return currentDocumentation.doc;
        }

        return [];
    }

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
