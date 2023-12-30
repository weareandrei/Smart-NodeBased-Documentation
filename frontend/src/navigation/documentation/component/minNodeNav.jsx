/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"
import IconButton from "@mui/material/IconButton"

import AccountTreeIcon from '@mui/icons-material/AccountTree'
import NodeIcon from "../../../documentation/component/nodeIcon";

export default class MinNodeNav extends React.Component {

    static propTypes = {
        nodeType: PropTypes.string.isRequired
    }

    render = () =>
        <IconButton style={style.iconButton}>
            <NodeIcon nodeType={this.props.nodeType} type={'nav'}/>
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
    }
}
