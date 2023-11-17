import React from 'react'
import PropTypes from "prop-types"
import Button from '@mui/material/Button'
import get from "lodash/get"
import map from "lodash/map"
import isEmpty from "lodash/isEmpty"
import { Handle, Position } from 'reactflow'
import ForwardIcon from '@mui/icons-material/Forward'
import IconButton from '@mui/material/IconButton'
import BugReportIcon from '@mui/icons-material/BugReport'
import AddTaskIcon from '@mui/icons-material/AddTask'

export default class Node extends React.Component {

    static propTypes = {
        data: PropTypes.object.isRequired
    }

    static defaultProps = {
    }

    render = () =>
        this.renderMainNode(this.props.node)

    renderMainNode = () =>
        <div style={style.nodeContainer(this.props.data.type)}>
            <div style={style.nodeFunctionalHeader}>
                <div style={style.nodeLabel}>
                    {this.props.data.type}
                </div>
                {this.renderFunctionalButtons(this.props.data.type)}
            </div>

            <div style={style.nodeMainHeader}>
                <div style={style.headerLabel}>
                    {this.props.data.label}
                </div>
                <div style={style.rightPart}>
                    <ForwardIcon/>
                </div>
            </div>

            <div style={style.nodeBody}>
                Body here
            </div>
        </div>

    renderFunctionalButtons = (type) => {
        switch (type) {
            case 'Page':
                return (
                    <div style={style.rightPart}>
                        <IconButton sx={style.functionalButton}>
                            <AddTaskIcon sx={{height: '12px', color:"#fff"}}/>
                        </IconButton>
                        <IconButton sx={{...style.functionalButton, background: '#FF4332'}}>
                            <BugReportIcon sx={{height: '12px', color:"#fff"}}/>
                        </IconButton>
                    </div>
                )

            case 'Current page':
                return (
                    <div style={style.rightPart}>
                        <IconButton sx={style.functionalButton}>
                            <AddTaskIcon sx={{height: '12px', color:"#fff"}}/>
                        </IconButton>
                        <IconButton sx={{...style.functionalButton, background: '#FF4332'}}>
                            <BugReportIcon sx={{height: '12px', color:"#fff"}}/>
                        </IconButton>
                    </div>
                )

            default:
                return (
                    <div style={style.rightPart}>

                    </div>
                )
        }
    }
}

const leftPart = {
    width: 'fit-content',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
}

const style = {
    nodeContainer: (type) => {
        let backgroundColor

        switch (type) {
            case 'Page':
                backgroundColor = '#5B6CC2'
                break;
            case 'Current page':
                backgroundColor = '#4E4899'
                break;
            case 'Note':
                backgroundColor = '#595F67'
                break;
            default:
                backgroundColor = '#000'
                break;
        }

        return {
            background: backgroundColor,
            borderRadius: '10px',
            display: 'flex',
            padding: '2px',
            flexDirection: 'column',
            minWidth: '200px',
            maxWidth: '350px',
        }
    },
    nodeFunctionalHeader: {
        // height: 'fit-content',
        padding: ' 2px 6px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nodeMainHeader: {
        background: '#fff',
        height: 'fit-content',
        padding: '3px 8px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nodeBody: {
        background: '#fff',
        height: 'fit-content',
        padding: ' 8px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px'
    },

    functionalButton: {
        height: '9px',
        width:'9px',
        background: '#3284FF',
        margin: '1px 0px 1px 6px ',
        borderRadius: '3px'
    },

    nodeLabel: {
        ...leftPart,
        fontSize: '11px',
        color: '#fff',
        // lineHeight: '2px'
    },
    headerLabel: {
        ...leftPart,
        fontSize: '15px',
        color: '#000'
    },

    rightPart: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        width: 'fit-content'
    }
}
