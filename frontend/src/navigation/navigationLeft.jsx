/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '@mui/material/AppBar'
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import Grid from "@mui/material/Grid"
import IconButton from '@mui/material/IconButton'
import OmegaLogo from "@/common/icon/omegaLogo"
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import {withMediaQuery} from "@/common/media";
import Divider from "@mui/material/Divider";
import map from 'lodash/map'

class NavigationLeft extends React.Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        documentation: PropTypes.object
    }

    static defaultProps = {
        documentation: null
    }

    state = {
        currentAvailableHeaders: []
    }

    // Update the componentDidUpdate method
    componentDidUpdate(prevProps) {
        // Check if the documentation prop has changed
        if (prevProps.documentation !== this.props.documentation) {
            // Calculate the new headers based on the updated documentation prop
            const newHeaders = this.determineHeaders(this.props.documentation);

            // Update the state with the new headers
            this.setState({
                currentAvailableHeaders: newHeaders,
            });
        }
    }

    componentDidMount() {
        const newHeaders = this.determineHeaders(this.props.documentation);
        // Update the state with the new headers
        this.setState({
            currentAvailableHeaders: newHeaders,
        });
    }

    render() {
        console.log('documentation: ', this.props.documentation)
        return this.renderNavigationSideMenu()
    }

    renderNavigationSideMenu = () =>
        <div>
            {this.renderAppBar()}
            {this.props.history.location.pathname === '/documentation' ?  this.renderDocumentationBar() : null}
        </div>

    renderAppBar = () =>
        <AppBar style={style.appBar.container}>
            <IconButton onClick={() => this.goToPage('dashboard')}>
                <OmegaLogo/>
            </IconButton>

            <div style={style.appBar.appsContainer}>
                <IconButton onClick={() => this.goToPage('documentation')}>
                    <AccountCircleIcon/>
                </IconButton>
                <IconButton onClick={() => this.goToPage('tasks')}>
                    <AccountCircleIcon/>
                </IconButton>
                <IconButton>
                    <AccountCircleIcon/>
                </IconButton>
            </div>
        </AppBar>

    renderDocumentationBar = () =>
        <AppBar style={style.documentationBar.container}>
            <div> Back button </div>

            <div>
                <h4>Header 1</h4>
                <Divider orientation="horizontal" sx={{width: '1px', background: '#fff'}}/>
                <div>
                    {console.log(this.state.currentAvailableHeaders)}
                    {map(this.state.currentAvailableHeaders, (header, index) => (
                        <h4 key={index}>{header}</h4>
                    ))}
                </div>
            </div>
        </AppBar>

    goToPage = (page) => {
        switch (page) {
            case 'documentation':
                this.props.history.push('/documentation')
                break
            case 'tasks':
                this.props.history.push('/tasks')
                break
            case 'dashboard':
                this.props.history.push('/dashboard')
                break

        }
    }

    determineHeaders = (currentDocumentation) => {
        if (currentDocumentation) {
            // Get the keys (field names) from the documentation object
            const headers = Object.keys(currentDocumentation);
            return headers;
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

export default connect((state) => ({
    documentation: state.application.documentation
}))(withCookies(withRouter(withMediaQuery(NavigationLeft))))
