import React from 'react'
import PropTypes from "prop-types"

import Divider from '@mui/material/Divider';

import get from "lodash/get"
import map from "lodash/map"
import isEmpty from "lodash/isEmpty"

import { Handle, Position } from 'reactflow'
import DescriptionIcon from '@mui/icons-material/Description'

import ForwardIcon from '@mui/icons-material/Forward'
import IconButton from '@mui/material/IconButton'
import AddTaskIcon from '@mui/icons-material/AddTask'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import DownloadIcon from '@mui/icons-material/Download'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CreateIcon from '@mui/icons-material/Create'
import BugReportIcon from '@mui/icons-material/BugReport'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import LockIcon from '@mui/icons-material/Lock'

// Header icons
import NotesIcon from '@mui/icons-material/Notes'
import LayersIcon from '@mui/icons-material/Layers'
import DataObjectIcon from '@mui/icons-material/DataObject'
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import Button from '@mui/material/Button'
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import Microlink from "@microlink/react"
import styled from 'styled-components'

import {calculateNodeSize, NODE_CONST_WIDTH} from "../util/sizeDeterminer"
import NodeIcon from "./nodeIcon";
import MenuItem from "@mui/material/MenuItem";
import {Menu} from "@mui/material";
  
export default class Node extends React.Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
    }

    static defaultProps = {

    }

    state = {
        lockShown: false,
        anchorEl: null,
        menuOpened: false
    }

    render = () => {
        const nodeSize = {
            partsHeight: calculateNodeSize(this.props.data),
            width: NODE_CONST_WIDTH
        }

        return this.renderNode(nodeSize)
    }

    renderNode = (nodeSize) => {
        // console.log('this.props.data', this.props.data)
        return (
            <div style={style.nodeContainer}
                 onMouseEnter={() => this.setState({lockShown: true})}
                 onMouseLeave={() => this.setState({lockShown: false})}>
                {
                    this.props.data.isChild ? <Handle type="target" position={Position.Top} id={this.props.data.id} style={style.nodeHandle} /> : null
                }
                {
                    this.renderNodeHeader(
                        this.props.data.type,
                        (this.props.data.type === 'page' || this.props.data.type === 'current page'),
                        nodeSize.width)
                }
                {
                    this.renderNodeAttributes(nodeSize.width)
                }
                {
                    get(this.props.data, 'body', null) !== null ?
                    this.renderNodeBody(this.props.data.type, this.props.data.body, nodeSize) : null
                }
                {
                    this.props.data.isParent ? <Handle type="source" position={Position.Bottom} id={this.props.data.id} style={style.nodeHandle} /> : null
                }
            </div>
        )
    }

    renderNodeHeader = (nodeType, isPage, width) =>
        <div style={style.nodeHeader(isPage, width)}>
            <NodeIcon nodeType={nodeType} type={'main'}/>
            {this.props.data.title}

            {this.renderNodeMenuIcons(get(this.props.data, 'layoutAttributes.locked', false))}

            <Menu
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.closeMenuButton}
            >
                <MenuItem key={'op1'} onClick={this.handleNodeMenuButton}>
                    <CreateIcon style={{marginRight: '12px', color: '#552CF6'}}
                    /> Create new task
                </MenuItem>
                <MenuItem key={'op2'} onClick={this.handleNodeMenuButton}>
                    <BugReportIcon style={{marginRight: '12px', color: '#552CF6'}}
                    /> Report bug
                </MenuItem>
            </Menu>
        </div>

    renderNodeMenuIcons = (locked) => {
        const islockShown = this.state.lockShown || locked

        return (
            <div style={{ marginLeft: 'auto' }}>
                {islockShown ? this.renderLockIcon(locked) : null}

                <IconButton
                    className="nodrag"
                    style={{ width: '27px', borderRadius: '5px', padding: '0px' }}
                    onClick={this.openMenuButton}>
                    <MoreVertIcon />
                </IconButton>
            </div>
        )
    }

    renderLockIcon = (locked) => {
        if (locked) {
            return (
                <IconButton
                    className="nodrag"
                    style={{ width: '27px', borderRadius: '5px', padding: '0px' }}
                    onClick={() => this.props.data.registerNodeUpdate({
                        id: this.props.data.id,
                        type: 'unlock'
                    })}>
                    <LockIcon style={{ width: '20px' }} />
                </IconButton>
            )
        } else {
            return (
                <IconButton
                    className="nodrag"
                    style={{ width: '27px', borderRadius: '5px', padding: '0px' }}
                    onClick={() => this.props.data.registerNodeUpdate({
                        id: this.props.data.id,
                        type: 'lock'
                    })}>
                    <LockOpenIcon style={{ width: '20px' }} />
                </IconButton>
            )
        }
    }

    openMenuButton = (event) => {
        this.setState({anchorEl: event.currentTarget})
        // this.setState({ menuOpened: !this.state.menuOpened })
    }

    closeMenuButton = (event) => {
        this.setState({anchorEl: null})
        // this.setState({ menuOpened: !this.state.menuOpened })
    }

    handleNodeMenuButton = (context) => {
        console.log('context', context)
    }

    renderNodeAttributes = (width) => {
        return (
            <div style={{position: 'relative'}}>
                {Object.keys(get(this.props.data, 'attributes', {})).map(
                    (attribute, index) => (
                        <div key={index} style={style.nodeAttribute(width, index)}>
                            {attribute}
                        </div>
                    ))}
            </div>
        )
    }

    customFetcher = async (url) => {
        const response = await fetch(`https://rlp-proxy.herokuapp.com/v2?url=${url}`)
        const json = await response.json()
        return json.metadata
    }

    renderNodeBody = (nodeType, body, nodeSize) => {
        // separate case
        if (nodeType === 'link') {
            // return <LinkPreview
            //     url={body.url}
            //     width={NODE_CONST_WIDTH}
            //     height={nodeSize.bodyHeight}
            //     fetcher={this.customFetcher}
            //     fallback={<div>Fallback</div>}
            // />
            return (
                <div style={style.nodeBody(nodeSize)}>
                    <Microlink
                        url={'https://stripe.com/gb'}
                        // contrast
                        fetchData
                        size="large"
                        loop={false}
                        media="logo"
                        autoPlay={false}
                    />
                </div>
                )
        }

        // otherwise
        const content = this.getBodyContent(nodeType, body)

        return (
            <div style={style.nodeBody(nodeSize)}>
                {content}
            </div>
        )
    }

    getBodyContent = (nodeType, body) => {
        switch (nodeType) {
            case 'note':
                return body.text
            case 'code snippet':
                return body.code
            case 'link':
                return body.url
        }
    }

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
                ...(bodyApplied ? { borderRadius: '0px'} : { borderRadius: '0px 0px 10px 10px'})
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
    nodeContainer: {
        position: 'relative',
        borderRadius: '15px',
    },
    nodeHeader: (isPage, width) => {
        const borderDefined =  isPage ? '1px' : '0px'
        return {
            position: 'absolute',
            zIndex: 1500,
            borderRadius: '15px',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
            height: '50px',
            width: width + 'px',
            padding: '13px 18px',
            background: '#fff',
            display: 'flex',
            flexDirection: 'row',
            fontWeight: 500,
            border: borderDefined + '#552CF6 solid'
        }
    },
    nodeAttribute: (width, yOffset) => ({
        position: 'relative',
        zIndex: 1500 - yOffset-1,
        top: yOffset * 50,
        height: '94px',
        width: width + 'px',
        padding: '63px 18px 13px 18px',
        borderRadius: '15px',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
        background: '#fff',
        color: '#938EA6',
        fontSize: '14px'
    }),
    nodeBody: (nodeSize) => ({
        position: 'relative',
        zIndex: 1450,
        top: '-25px',
        height: nodeSize.bodyHeight + 25 + 'px',
        width: nodeSize.width + 'px',
        padding: '38px 18px 13px 18px',
        borderRadius: '15px',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
        background: '#fff',
    }),
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

    nodeHandle: {
        width: '8px',
        height: '8px',
        boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.15)',
        background: '#fff',
        zIndex: '4000'
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
