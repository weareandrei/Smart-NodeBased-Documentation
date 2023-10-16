/* eslint-disable max-lines */
import React from 'react'
import AppBar from '@mui/material/AppBar'
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import IconButton from "@mui/material/IconButton"
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import PropTypes from "prop-types"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
export default class NavigationTop extends React.Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        signOut: PropTypes.func.isRequired
    }

    render() {
        return this.renderNavigationBar()
    }

    renderNavigationBar = () =>
        <AppBar style={style.container}>
            <div style={style.addressContainer}>
                <h2 style={style.projectNameHeader}>Project name</h2>

                <Divider orientation="vertical" sx={{width: '1px', background: '#fff'}}/>

                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        MUI
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/">
                        Core
                    </Link>
                </Breadcrumbs>
            </div>

            <Button variant="text"
                    style={style.signOutButton}
                    onClick={this.signOut}>
                <p style={{textAlign: 'center', width: '100%'}}>Sign out</p>
            </Button>

            <IconButton>
                <AccountCircleIcon/>
            </IconButton>
        </AppBar>

    signOut = () => {
        this.props.history.push('/auth')
        this.props.signOut()
    }

}

const style = {
    container: {
        padding: '10px',
        paddingLeft: '80px',
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '60px',
        background: '#788390',
        zIndex: '1001'
    },
    addressContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    projectNameHeader: {
        fontSize: '22px',
        margin: '8px 20px'
    },
    projectPathHeader: {
        fontSize: '16px',
        margin: '8px 20px'
    },
    signOutButton: {
        fontSize: '12px',
        color: '#fff',
        width: '130px'
    }
}
