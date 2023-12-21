/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy'
import {connect} from "react-redux"
import {withCookies} from "react-cookie"
import {withRouter} from "react-router-dom"
import {withMediaQuery} from "../common/media"
import ArticleIcon from '@mui/icons-material/Article'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import SmsIcon from '@mui/icons-material/Sms'
import * as actions from './action'

class NavigationMenu extends React.Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
    }

    render = () =>
        <AppBar style={style.appBar.container}>
            <div onClick={() => this.goToPage('dashboard')}
                 style={style.logo} >
                <TheaterComedyIcon sx={{color: '#552CF6'}}/>
            </div>

            <div style={style.appBar.appsContainer}>
                <IconButton onClick={() => this.goToPage('documentation')}
                            style={style.appBar.navItem}>
                    <ArticleIcon/>
                </IconButton>
                <IconButton onClick={() => this.goToPage('tasks')}
                            style={style.appBar.navItem}>
                    <FactCheckIcon/>
                </IconButton>
                <IconButton>
                    <SmsIcon style={style.appBar.navItem}/>
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

const style = {
    appBar: {
        container: {
            height: '100vh',
            left: 0,
            right: 'auto',
            display: 'flex',
            alignItems: 'center',
            width: '77px',
            background: '#2F2B43',
            padding: '30px 0px',
            zIndex: '10002'
        },
        appsContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        },
        navItem: {
            marginTop: '40px',
            color: '#938EA6'
        }
    },
    logo: {
        height: '42px',
        width: '42px',
        borderRadius: '8px',
        boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff',
        padding: '7px'
    }
}

export default connect((state) => ({
}), actions)(withCookies(withRouter(withMediaQuery(NavigationMenu))))
