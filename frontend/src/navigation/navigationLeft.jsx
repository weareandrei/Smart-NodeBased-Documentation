/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import OmegaLogo from "@/common/icon/omegaLogo"
import {connect} from "react-redux"
import {withCookies} from "react-cookie"
import {withRouter} from "react-router-dom"
import {withMediaQuery} from "@/common/media"
import ArticleIcon from '@mui/icons-material/Article'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import SmsIcon from '@mui/icons-material/Sms'
import * as actions from './action'

import DocumentationBar from './documentationBar'

class NavigationLeft extends React.Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        documentation: PropTypes.object,
        selectNode: PropTypes.func.isRequired
    }

    static defaultProps = {
        documentation: null
    }

    render() {
        return this.renderNavigationSideMenu()
    }

    renderNavigationSideMenu = () =>
        <div>
            {this.renderAppBar()}
            {this.props.history.location.pathname === '/documentation' ?
                <DocumentationBar
                    selectNode={this.props.selectNode}
                    history={this.props.history}
                    documentation={this.props.documentation.doc}/> : null}
        </div>

    renderAppBar = () =>
        <AppBar style={style.appBar.container}>
            <IconButton onClick={() => this.goToPage('dashboard')}>
                <OmegaLogo/>
            </IconButton>

            <div style={style.appBar.appsContainer}>
                <IconButton onClick={() => this.goToPage('documentation')}>
                    <ArticleIcon/>
                </IconButton>
                <IconButton onClick={() => this.goToPage('tasks')}>
                    <FactCheckIcon/>
                </IconButton>
                <IconButton>
                    <SmsIcon/>
                </IconButton>
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
}), actions)(withCookies(withRouter(withMediaQuery(NavigationLeft))))
