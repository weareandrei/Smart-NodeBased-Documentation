/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import IconButton from "@mui/material/IconButton"

import AccountTreeIcon from '@mui/icons-material/AccountTree'
import {ExpandLess, ExpandMore} from "@mui/icons-material"
import Typography from "@mui/material/Typography";

export default class MaxNodeNav extends React.Component {

    static propTypes = {
        label: PropTypes.string.isRequired,
        nodeId: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        isParent: PropTypes.bool
    }

    static defaultProps = {
        isParent: false
    }

    state = {
        isOpen: false
    }

    render = () => {
        return (
            <IconButton
                style={style.iconButton}
                onClick={this.nodeClicked}
            >
                <AccountTreeIcon style={style.icon}/>
                <Typography style={style.buttonLabel}>{this.props.label}</Typography>
                {this.props.isParent && this.renderExpandIcon()}
            </IconButton>
        )
    }

    renderExpandIcon = () =>
        this.state.isOpen ? <ExpandLess sx={{marginLeft: 'auto'}}/> : <ExpandMore sx={{marginLeft: 'auto'}}/>

    nodeClicked = () => {
        this.state.isOpen ?
            this.nodeCollapsed() : this.nodeExpanded()
    }

    nodeExpanded = () => {
        this.setState({isOpen: true})
        this.props.onClick(this.props.nodeId, true)
    }

    nodeCollapsed = () => {
        this.setState({isOpen: false})
        this.props.onClick(this.props.nodeId, false)
    }
}

const style = {
    iconButton: {
        width: '100%',
        height: '45px',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        borderRadius: '8px',
        border: '1px #DFDFDF solid'
    },
    icon: {
        height: '25px',
        color: '#552CF6',
        flexShrink: 0,
    },
    buttonLabel: {
        fontSize: '13px',
        fontWeight: '400',
        color: '#000',
        marginLeft: '10px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
}
