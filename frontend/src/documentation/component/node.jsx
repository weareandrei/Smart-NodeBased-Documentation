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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import DownloadIcon from '@mui/icons-material/Download'

import NodeBody from "./nodeBody"

export default class Node extends React.Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        nodeSize: PropTypes.string.isRequired
    }

    static defaultProps = {
        nodeSize: 'normal' // smaller / normal / ... ?
        // smaller when it's a second level child
    }

    render = () =>
        this.renderNode()

    renderNode = () =>
        <div style={style.nodeContainer(this.props.data.type)}>
            <div style={style.nodeHeader}>

                <div style={style.leftPart}>
                    {!this.isPage(this.props.data.type) &&
                        this.renderHeaderTitle(this.props.data)}

                    {this.renderHeaderButtons(this.props.data.type)}
                </div>

                <div style={style.rightPart}>
                    <div style={style.nodeLabel(this.props.data.type)}>
                        {this.props.data.type}
                    </div>
                </div>

            </div>

            {this.isPage && this.displayBodyHeader(this.props.data.title)}

            {get(this.props.data, 'body', false) && this.renderBody(this.props.data.body)}

            {this.props.data.type === 'page' && this.renderOpenArrow()}
        </div>

    renderBody = (body) =>
        <div style={style.nodeBody}>
            <NodeBody body={body}/>
        </div>

    isPage = (type) =>
        ['page', 'current page'].includes(type)

    renderHeaderTitle = (data) => {
        if (data.type === 'link') {
            return (<div style={style.headerTitle}>{data.linkURL}</div>)
        } else {
            return (<div style={style.headerTitle}>{data.title}</div>)
        }
    }


    renderHeaderButtons = (type) => {
        switch (type) {
            case 'page':
                return (
                    <div style={style.leftPart}>
                        <IconButton sx={style.functionalButton}>
                            <AddTaskIcon sx={{height: '12px', color:"#fff"}}/>
                        </IconButton>
                        <IconButton sx={{...style.functionalButton, background: '#FF4332'}}>
                            <BugReportIcon sx={{height: '12px', color:"#fff"}}/>
                        </IconButton>
                    </div>
                )

            case 'current page':
                return (
                    <div style={style.leftPart}>
                        <IconButton sx={style.functionalButton}>
                            <AddTaskIcon sx={{height: '12px', color:"#fff"}}/>
                        </IconButton>
                        <IconButton sx={{...style.functionalButton, background: '#FF4332'}}>
                            <BugReportIcon sx={{height: '12px', color:"#fff"}}/>
                        </IconButton>
                    </div>
                )

            case 'link':
                return (
                    <div style={style.leftPart}>
                        <IconButton sx={{...style.functionalButton, background: '#379AE2'}}>
                            <OpenInNewIcon sx={{height: '12px', color:"#D3D3D3"}}/>
                        </IconButton>
                    </div>
                )

            case 'code snippet':
                return (
                    <div style={style.leftPart}>
                        <IconButton sx={{...style.functionalButton, background: '#3284FF'}}>
                            <DownloadIcon sx={{height: '12px', color:"#fff"}}/>
                        </IconButton>
                        <IconButton sx={{...style.functionalButton, background: '#FF4332'}}>
                            <BugReportIcon sx={{height: '12px', color:"#fff"}}/>
                        </IconButton>
                    </div>
                )

            default:
                return (
                    <div style={style.leftPart}>

                    </div>
                )
        }
    }

    displayBodyHeader = (title) =>
        <div style={style.nodeMainHeader}>
            <div style={style.nodeMainHeaderLabel}>
                {title}
            </div>
            <div style={style.rightPart}>
                <IconButton>
                    <ForwardIcon sx={{height: '10px', color:"#000"}}/>
                </IconButton>
            </div>

        </div>

    renderOpenArrow = () =>
        <div>
            <IconButton sx={{background: '#000'}}>
                <ArrowBackIosNewIcon sx={{height: '10px', color:"#fff"}}/>
            </IconButton>
        </div>
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
            case 'page':
                backgroundColor = '#5B6BBA'
                break;
            case 'current page':
                backgroundColor = '#4E4899'
                break;
            case 'note':
                backgroundColor = '#595F67'
                break;
            case 'link':
                backgroundColor = '#2F80BA'
                break;
            case 'code snippet':
                backgroundColor = '#3B7F5E'
                break;
            default:
                backgroundColor = '#000'
                break;
        }

        return {
            background: backgroundColor,
            borderRadius: '10px',
            display: 'flex',
            // padding: '2px',
            flexDirection: 'column',
            minWidth: '200px',
            maxWidth: '350px',
        }
    },
    nodeHeader: {
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
    headerTitle: {
        color: '#fff',
        overflow: 'hidden'
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
    nodeLabel: (type) => {
        let backgroundColor

        switch (type) {
            case 'page':
                backgroundColor = '#7283E1'
                break;
            case 'current page':
                backgroundColor = '#635CC5'
                break;
            case 'note':
                backgroundColor = '#707882'
                break;
            case 'link':
                backgroundColor = '#379AE2'
                break;
            case 'code snippet':
                backgroundColor = '#2F684C'
                break;
            default:
                backgroundColor = '#000'
                break;
        }

        return {
            ...leftPart,
            fontSize: '11px',
            background: backgroundColor,
            borderRadius: '10px',
            padding: '2px 8px',
            color: '#D3D3D3',
        }
    },
    nodeMainHeaderLabel: {
        ...leftPart,
        fontSize: '15px',
        color: '#000'
    },

    leftPart: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        // width: 'fit-content'
    },
    rightPart: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        // width: 'fit-content'
    }
}
