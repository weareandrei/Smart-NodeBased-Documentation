import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'

import get from "lodash/get"

import { Handle, Position, useKeyPress } from 'reactflow'
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

import Button from '@mui/material/Button'
import { LinkPreview } from '@dhaiwat10/react-link-preview'
import Microlink from "@microlink/react"

import {calculateNodeSize, NODE_CONST_WIDTH} from "../util/sizeDeterminer"
import NodeIcon from "./nodeIcon"
import BlockTextEditor from "./editor/blockTextEditor"
import NodeMoreMenu from "./NodeMoreMenu"
  
const Node = ({data}) => {
    const [state, setState] = useState({
        lockShown: false
    })

    const nodeSize = {
        partsHeight: calculateNodeSize(data),
        width: NODE_CONST_WIDTH
    }

    return (
        <div style={style.nodeContainer}
             onMouseEnter={() => setState({...state, lockShown: true})}
             onMouseLeave={() => setState({...state, lockShown: false})}>
            {
                data.isChild ? <Handle type="target" position={Position.Top} id={data.id} style={style.nodeHandle} /> : null
            }
            {
                data.title === '' ?
                    renderNewbornNodeHeader(nodeSize.width, state)
                    :
                    renderNodeHeader(data.id, data.type, data.title, nodeSize.width, get(data, 'layoutAttributes', {}), data.registerNodeUpdate, state)
            }
            {
                renderNodeAttributes(nodeSize.width, get(data, 'attributes', {}))
            }
            {
                get(data, 'body', null) === null ? null :
                    renderNodeBody(data, nodeSize)
            }
            {
                data.isParent ? <Handle type="source" position={Position.Bottom} id={data.id} style={{...style.nodeHandle, bottom: '+22px'}} /> : null
            }
        </div>
    )

}

const renderNodeHeader = (id, nodeType, title, width, layoutAttributes, registerNodeUpdate, state) => {
    const isPage = nodeType === 'page' || nodeType === 'current page'
    const islockShown = state.lockShown || get(layoutAttributes, 'locked', false)

    return (
        <div style={style.nodeHeader(isPage, width)}>
            <NodeIcon nodeType={nodeType} type={'main'}/>
            {title}

            <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row'}}>
                {islockShown ? renderLockIcon(id, get(layoutAttributes, 'locked', false), registerNodeUpdate) : null}
                <NodeMoreMenu/>
            </div>
        </div>
    )
}

const renderNewbornNodeHeader = (width, state) =>
    <div style={style.nodeHeader(false, width, true)}>
        <NodeIcon nodeType={'none'} type={'main'}/>
        ...
        <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row'}}>
            <NodeMoreMenu/>
        </div>
    </div>


const renderLockIcon = (id, locked, registerNodeUpdate) => {
    console.log('registerNodeUpdate func: ', registerNodeUpdate)
    if (locked) {
        return (
            <IconButton
                className="nodrag"
                style={{ width: '27px', borderRadius: '5px', padding: '0px' }}
                onClick={() => registerNodeUpdate({
                    id: id,
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
                onClick={() => registerNodeUpdate({
                    id: id,
                    type: 'lock'
                })}>
                <LockOpenIcon style={{ width: '20px' }} />
            </IconButton>
        )
    }
}

const openMenuButton = (event) => {
    this.setState({anchorEl: event.currentTarget})
    // this.setState({ menuOpened: !this.state.menuOpened })
}

const closeMenuButton = (event) => {
    this.setState({anchorEl: null})
    // this.setState({ menuOpened: !this.state.menuOpened })
}

const handleNodeMenuButton = (context) => {
    console.log('context', context)
}

const renderNodeAttributes = (width, attributes) => {
    if (Object.keys(attributes).length === 0) {
        return null
    }

    return (
        <div style={style.nodeAttributes(width)}>
            {Object.keys(attributes).map((attribute, index) => (
                <div key={index} style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>{attribute}</span>
                    <span>{attributes[attribute]}</span>
                </div>
            ))}
        </div>
    )
}

const customFetcher = async (url) => {
    const response = await fetch(`https://rlp-proxy.herokuapp.com/v2?url=${url}`)
    const json = await response.json()
    return json.metadata
}

const renderNodeBody = (props, nodeSize) => {
    console.log('renderNodeBody props: ', props)

    return (
        <div style={style.nodeBody(nodeSize, get(props, 'attributes', {}))} className="nodrag">
            {/*<BlockTextEditor content={this.getBodyContent(nodeType, content)}*/}
            <BlockTextEditor content={props.content}
                             nodeId={props.id}
                             registerNodeUpdate={props.registerNodeUpdate}
                             createNewNode={props.createNewNode}/>
        </div>
    )

    // separate case
    if (props.type === 'link') {
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

    // // otherwise
    // const content = this.getBodyContent(nodeType, body)
    //
    // return (
    //     <div style={style.nodeBody(nodeSize)}>
    //         {content}
    //     </div>
    // )
}

const getBodyContent = (nodeType, body) => {
    switch (nodeType) {
        case 'note':
            return body.text
        case 'code snippet':
            return body.code
        case 'link':
            return body.url
    }
}

const renderHeaderTitle = (data) => {
    if (data.type === 'link') {
        return (<div style={style.headerTitle}>{data.linkURL}</div>)
    } else {
        return (<div style={style.headerTitle}>{data.title}</div>)
    }
}


const renderHeaderButtons = (type) => {
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

const displayBodyHeader = (title, bodyApplied) =>
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

const renderOpenArrow = () =>
    <div style={style.openArrowButtonContainer}>
        <IconButton sx={style.openArrowButton}>
            <ArrowBackIosNewIcon sx={{height: '5px', width: '5px', color:"#fff"}}/>
        </IconButton>
    </div>

const determineSizeFromAttributes = (nodeType, attributes) => {
    return {
        bodyHeight: attributes,
        width: attributes
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
    nodeHeader: (isPage, width, newBorn=false) => {
        const borderDefined =  isPage ? '1px' : '0px'
        return {
            position: 'relative',
            zIndex: 1500,
            borderRadius: '15px',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
            height: newBorn ? '30px' : '50px',
            width: width + 'px',
            padding: '0px 18px',
            background: '#fff',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 500,
            border: borderDefined + '#552CF6 solid',
            color: newBorn ? '#DFDFDF' : '#000',
        }
    },
    nodeAttributes: (width) => ({
        position: 'relative',
        top: '-25px',
        padding: '38px 18px 13px 18px',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
        background: '#fff',
        width: width + 'px',
        borderRadius: '15px',
        fontSize: '14px',
        color: '#938EA6',
        zIndex: 1500 - 1,
    }),
    nodeBody: (nodeSize, attributes) => ({
        position: 'relative',
        zIndex: 1450,
        top: Object.keys(attributes).length > 0 ? '-50px' : '-25px',
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

export default Node