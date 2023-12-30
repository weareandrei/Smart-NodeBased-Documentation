/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import IconButton from "@mui/material/IconButton"

import {ExpandLess, ExpandMore} from "@mui/icons-material"
import Typography from "@mui/material/Typography"
import NodeIcon from "../../../documentation/component/nodeIcon";

export default class MaxNodeNav extends React.Component {

    static propTypes = {
        label: PropTypes.string.isRequired,
        nodeId: PropTypes.string.isRequired,
        nodeType: PropTypes.string.isRequired,
        onExpanded: PropTypes.func,
        onClick: PropTypes.func.isRequired,
        isParent: PropTypes.bool
    }

    static defaultProps = {
        isParent: false
    }

    state = {
        isExpanded: false,
        expandClicked: false
    }

    render = () => {
        return (
            <React.Fragment>
                <IconButton
                    style={style.iconButton(this.props.nodeType)}
                    onClick={this.selectClicked}
                >
                    <NodeIcon nodeType={this.props.nodeType} type={'nav'} sx={{flexShrink: 0}}/>
                    <Typography style={style.buttonLabel(this.props.nodeType)}>{this.props.label}</Typography>
                    {this.props.isParent && this.renderExpandIcon()}
                </IconButton>

            </React.Fragment>
        )
    }

    renderExpandIcon = () =>
        this.state.isExpanded ?
            <ExpandLess style={style.expandIconButton}
                        onClick={this.nodeExpandButtonClicked}/>
                :
            <ExpandMore style={style.expandIconButton}
                        onClick={this.nodeExpandButtonClicked}/>

    selectClicked = () => {
        this.props.onClick(this.props.nodeId)
    }

    nodeExpandButtonClicked = (event) => {
        // Stop event propagation to prevent
        //   the parent IconButton click
        event.stopPropagation()

        this.state.isExpanded ?
            this.nodeExpandOff() :
            this.nodeExpandOn()
    }


    nodeExpandOn = () => {
        this.setState({isExpanded: true})
        this.props.onExpanded(this.props.nodeId, true)
    }

    nodeExpandOff = () => {
        this.setState({isExpanded: false})
        this.props.onExpanded(this.props.nodeId, false)
    }
}

const style = {
    iconButton: (nodeType) => ({
        width: '100%',
        height: nodeType === 'backButton' ? '30px' : '45px',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        borderRadius: '8px',
        border: '1px #DFDFDF solid'
    }),
    buttonLabel: (nodeType) => ({
        fontSize: '13px',
        fontWeight: '400',
        color: nodeType === 'backButton' ? '#938EA6' : '#000',
        marginLeft: '10px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }),
    expandIconButton: {
        marginLeft: 'auto'
    }
}
