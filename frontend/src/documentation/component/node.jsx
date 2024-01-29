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
import InputBase from '@mui/material/InputBase'

import { LinkPreview } from '@dhaiwat10/react-link-preview'
import Microlink from "@microlink/react"

import NodeIcon from "./nodeIcon"
import BlockTextEditor from "./editor/blockTextEditor"
import NodeMoreMenu from "./NodeMoreMenu"
import NodeTypeSelect from "./nodeTypeSelect"
  
const Node = ({data}) => {
    const [state, setState] = useState({
        lockShown: false
    })

    return (
        <div style={style.nodeContainer}
             onMouseEnter={() => setState({...state, lockShown: true})}
             onMouseLeave={() => setState({...state, lockShown: false})}>
            {
                data.isChild ? <Handle type="target" position={Position.Top} id={data.id} style={style.nodeHandle} /> : null
            }
            {
                renderNodeHeader(data.id, data.type, data.title, get(data, 'layoutAttributes', {}), data.performNodeUpdate, state)
            }
            {
                renderNodeAttributes(get(data, 'attributes', {}))
            }
            {
                get(data, 'body', null) === null ? null :
                    renderNodeBody(data)
            }
            {
                data.isParent ? <Handle type="source" position={Position.Bottom} id={data.id} style={{...style.nodeHandle, bottom: '+22px'}} /> : null
            }
        </div>
    )

}

const renderNodeHeader = (id, nodeType, title, layoutAttributes, performNodeUpdate, state) => {
    const isPage = nodeType === 'page' || nodeType === 'current page'
    const islockShown = state.lockShown || get(layoutAttributes, 'locked', false)
    const newBorn = (title === '')

    return (
        <div style={style.nodeHeader(isPage, newBorn)}>
            <NodeTypeSelect selectedType={nodeType}
                            selectType={(typeName) => performNodeUpdate({
                                id: id,
                                type: 'type',
                                typeName: typeName
                            })}/>
            {/*<NodeIcon nodeType={newBorn ? 'none' : nodeType} type={'main'}/>*/}

            <InputBase fullWidth
                       placeholder={'...'}
                       value={title}
                       onChange={(event) => performNodeUpdate({
                           id: id,
                           type: 'title',
                           title: event.target.value
                       })}
                       sx={style.nodeHeaderTitleInput(title === '')}/>

            <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row'}}>
                {islockShown ? renderLockIcon(id, get(layoutAttributes, 'locked', false), performNodeUpdate) : null}
                <NodeMoreMenu/>
            </div>
        </div>
    )
}

const renderLockIcon = (id, locked, performNodeUpdate) => {
    if (locked) {
        return (
            <IconButton
                className="nodrag"
                style={{ width: '27px', borderRadius: '5px', padding: '0px' }}
                onClick={() => performNodeUpdate({
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
                onClick={() => performNodeUpdate({
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

const renderNodeAttributes = (attributes) => {
    if (Object.keys(attributes).length === 0) {
        return null
    }

    return (
        <div style={style.nodeAttributes()}>
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

const renderNodeBody = (props) => {
    return (
        <div style={style.nodeBody(get(props, 'attributes', {}))} className="nodrag">
            {/*<BlockTextEditor content={this.getBodyContent(nodeType, content)}*/}
            <BlockTextEditor content={props.content}
                             nodeId={props.id}
                             performNodeUpdate={props.performNodeUpdate}
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
            <div style={style.nodeBody()}>
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
    nodeHeader: (isPage, newBorn=false) => {
        const borderDefined =  isPage ? '1px' : '0px'
        return {
            position: 'relative',
            zIndex: 1500,
            borderRadius: '15px',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
            height: newBorn ? '30px' : '50px',
            width: '350px',
            padding: '0px 18px',
            background: '#fff',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            border: borderDefined + '#552CF6 solid'
        }
    },
    nodeHeaderTitleInput: (newBorn) => ({
        fontWeight: newBorn ? '800' : '600',
        color: newBorn ? '#DFDFDF' : '#000',
        marginLeft: '10px'
    }),
    nodeAttributes: () => ({
        position: 'relative',
        top: '-25px',
        padding: '38px 18px 13px 18px',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
        background: '#fff',
        width: '350px',
        borderRadius: '15px',
        fontSize: '14px',
        color: '#938EA6',
        zIndex: 1500 - 1,
    }),
    nodeBody: (attributes) => ({
        position: 'relative',
        zIndex: 1450,
        top: Object.keys(attributes).length > 0 ? '-50px' : '-25px',
        // height: nodeSize.bodyHeight + 25 + 'px',
        width: '350px',
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