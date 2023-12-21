/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"
import IconButton from "@mui/material/IconButton"

import AccountTreeIcon from '@mui/icons-material/AccountTree'

export default class MinNodeNav extends React.Component {

    static propTypes = {
    }

    render = () =>
        <IconButton style={style.iconButton}>
            <AccountTreeIcon style={style.icon}/>
        </IconButton>

}

const style = {
    iconButton: {
        height: '45px',
        width: '45px',
        marginRight: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        border: '1px #DFDFDF solid'
    },
    icon: {
        height: '25px',
        color: '#552CF6'
    }
}
