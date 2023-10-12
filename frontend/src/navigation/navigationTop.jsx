/* eslint-disable max-lines */
import React from 'react'
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Divider from '@mui/material/Divider';

export default class NavigationTop extends React.Component {

    render() {
        return this.renderNavigationBar()
    }

    renderNavigationBar = () =>
        <AppBar style={style.container}>
            <div style={style.addressContainer}>
                <h2 style={style.projectNameHeader}>Project name</h2>
                <Divider orientation="vertical" sx={{width: '1px', background: '#fff'}}/>
                <div style={style.projectPathHeader}>Breadcrumbs</div>
            </div>

            <IconButton>
                <AccountCircleIcon/>
            </IconButton>
        </AppBar>

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
    }
}
