import React from 'react'
import PropTypes from "prop-types"

import Divider from '@mui/material/Divider';

import get from "lodash/get"
import map from "lodash/map"
import isEmpty from "lodash/isEmpty"

import { Handle, Position } from 'reactflow'
import DescriptionIcon from '@mui/icons-material/Description';

import ForwardIcon from '@mui/icons-material/Forward'
import IconButton from '@mui/material/IconButton'
import BugReportIcon from '@mui/icons-material/BugReport'
import AddTaskIcon from '@mui/icons-material/AddTask'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import DownloadIcon from '@mui/icons-material/Download'

import Button from '@mui/material/Button'

import NodeBody from "./nodeBody"
const nodesSizes = require('../properties/nodesSizes.json')
const {determineNodeSizeAttributes} = require('../util/sizeDeterminer')

export default class Node extends React.Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
    }

    static defaultProps = {
    }

    render = () => {
        const sizeAttributes = determineNodeSizeAttributes(this.props.data)
        const nodeSize = {
            bodyHeight: nodesSizes[this.props.data.type].bodyHeight[sizeAttributes.bodyHeight],
            width: nodesSizes[this.props.data.type].width[sizeAttributes.width]
        }
        console.log('renderNode, '+this.props.data.type+', size:', nodeSize)
        return this.renderNode(nodeSize)
    }

    renderNode = (nodeSize) => {
        const bodyApplied = get(this.props.data, 'body', false) ||
            (this.props.data.type === 'link' ||
                this.props.data.type === 'page' ||
                this.props.data.type === 'current page')

        return (
            <div style={style.nodeContainer(this.props.data.type, nodeSize.width)}>
                <div style={style.nodeHeaderContainer}>

                    <div style={{...style.leftPart, maxWidth: '75%'}}>
                        {!this.isPage(this.props.data.type) &&
                            this.renderHeaderTitle(this.props.data)}

                        {this.renderHeaderButtons(this.props.data.type)}
                    </div>

                    <div style={{...style.rightPart, maxWidth: '25%'}}>
                        <div style={style.nodeLabel(this.props.data.type)}>
                            {this.props.data.type}
                        </div>
                    </div>

                </div>

                {this.isPage(this.props.data.type) && this.displayBodyHeader(this.props.data.title, bodyApplied)}
                {this.isPage(this.props.data.type) && bodyApplied && <Divider sx={{height: '3px', background: '#E4E4E4', border: 0}}/>}

                { bodyApplied &&
                    <NodeBody body={this.props.data.body}
                              type={this.props.data.type}
                              height={nodeSize.bodyHeight}/> }
                {this.props.data.type === 'page' && this.renderOpenArrow()}
            </div>
        )
    }

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

    displayBodyHeader = (title, bodyApplied) =>
        <Button
            onClick={() => {
                alert('clicked')
            }}
            style={{
                ...style.nodeMainHeader,
                ...(bodyApplied ? { borderRadius: '10px 10px 0px 0px'} : { borderRadius: '10px', })
            }}
        >
            <div style={style.nodeMainTitle}>
                <DescriptionIcon sx={{height: '16px', width: '16px', color:"#000", marginRight: '5px'}}/>
                {title}
            </div>
            <div style={style.rightPart}>
                <ForwardIcon sx={{height: '16px', width: '16px', color:"#000"}}/>
            </div>
        </Button>

    renderOpenArrow = () =>
        <div style={style.openArrowButtonContainer}>
            <IconButton sx={style.openArrowButton}>
                <ArrowBackIosNewIcon sx={{height: '5px', width: '5px', color:"#fff"}}/>
            </IconButton>
        </div>

    determineSizeFromAttributes = (nodeType, attributes) => {
        return {
            bodyHeight: attributes,
            width: attributes
        }
    }
}

const straightText = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
}

const style = {
    nodeContainer: (type, width) => {
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
            // border: backgroundColor+ ' solid',
            display: 'flex',
            padding: '2px',
            flexDirection: 'column',
            width: width+'px'
        }
    },
    nodeHeaderContainer: {
        // height: 'fit-content',
        padding: ' 0px 6px 2px 6px',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '100%'
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
        ...straightText,
        fontSize: '11px',
        color: '#fff',
        overflow: 'hidden',
        marginRight: '6px'
    },

    functionalButton: {
        height: '9px',
        width:'9px',
        background: '#3284FF',
        margin: '0px 6px 0px 0px',
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
            ...straightText,
            fontSize: '10px',
            background: backgroundColor,
            borderRadius: '10px',
            padding: '0px 10px',
            marginLeft: '6px ',
            color: '#D3D3D3',
        }
    },
    nodeMainTitle: {
        ...straightText,
        fontSize: '15px',
        color: '#000',
        textTransform: 'none',
        textAlign: 'left',
        maxWidth: '85%'
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
    },


    openArrowButtonContainer: {
        position: 'relative',
    },
    openArrowButton: {
        position: 'absolute',
        left: '50%',
        width: '10px',
        height: '30px',
        borderRadius: '7px',
        padding: '5px',
        transform: 'translateX(-50%) translateY(-50%) rotate(-90deg)',
        background: '#000'
    }
}
