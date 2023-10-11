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

class NavigationLeft extends React.Component {

    static propTypes = {
        // history: PropTypes.object.isRequired
    }

    render() {
        return this.renderNavigationSideMenu()
    }

    renderNavigationSideMenu = () =>
        <div>
            {this.renderAppBar()}
            {this.renderDocumentationBar()}
        </div>

    renderAppBar = () =>
        <AppBar style={style.appBar.container}>
            <IconButton>
                <OmegaLogo/>
            </IconButton>

            <div style={style.appBar.appsContainer}>
                <IconButton onClick={this.goToDocumentation()}>
                    <AccountCircleIcon/>
                </IconButton>
                <IconButton>
                    <AccountCircleIcon/>
                </IconButton>
                <IconButton>
                    <AccountCircleIcon/>
                </IconButton>
            </div>
        </AppBar>

    renderDocumentationBar = () =>
        <AppBar style={style.documentationBar.container}>
            <Grid direction='column'
                  alignItems='center'
                  container
                  justify='space-between'>
                Tree Structure
            </Grid>
        </AppBar>

    goToDocumentation = () => {
        // return this.props.history.push('/documentation')
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
}))(withCookies(withRouter(withMediaQuery(NavigationLeft))))
