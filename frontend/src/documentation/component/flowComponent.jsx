import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from "prop-types"
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    ReactFlowProvider
} from 'reactflow'

import 'reactflow/dist/style.css'
import './overview.css'
import NodeSelector from "./nodeSelector"
import Node from "./node"
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";

const nodeTypes = {
    'page': Node,
    'code snippet': Node,
    'note': Node,
    'link': Node
}

const getNextId = (nodes) => {
    const maxId = Math.max(...nodes.map(node => parseInt(node.id))) || 0
    return (maxId + 1).toString()
}

export default function FlowComponent(props) {
    const minimapStyle = {
        height: 120,
    }

    const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges)
    const [reactFlowInstance, setReactFlowInstance] = useState(null)

    useEffect(() => {
        setNodes(props.nodes)
        setEdges(props.edges)
    }, [props.nodes, props.edges])

    // useEffect(() => {
    //     if (reactFlowInstance) {
    //         reactFlowInstance.fitView();
    //     }
    // }, [nodes, reactFlowInstance]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

    // console.log('FlowComponent nodes(props): ', props.nodes)
    // console.log('FlowComponent edges(props): ', props.edges)
    // console.log('FlowComponent nodes: ', nodes)

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move'
    }, [])

    const onDrop = useCallback(
        (event) => {
            event.preventDefault()

            const type = event.dataTransfer.getData('application/reactflow')

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            })
            const newNode = {
                id: getNextId(nodes),
                type,
                position,
                size: {
                    width: 150,
                    height: 60
                },
                data: { label: `${type} node` },
            }

            setNodes((nds) => nds.concat(newNode))

            // props.registerNodeUpdate(newNode)
        },
        [reactFlowInstance],
    )

    return (
        <ReactFlowProvider>
            <ReactFlow
                nodes={nodes}
                edges={edges}

                    // Whenever we do anything to a node, drag, or click or else...
                onNodesChange={(event) => {
                    onNodesChange(event) // DON'T TOUCH
                    props.registerNodeUpdate(event[0])
                }}
                // panOnDrag={true}

                onEdgesChange={onEdgesChange}
                onConnect={onConnect}

                //     // Whenever we stop dragging node and release mouse button
                // onNodeDragStop={(mouseEvent, node) => {
                //     // console.log('onNodeDragStop, node:', node)
                //     // We can see all the data about the node.
                //     //   We are not given the update specifically
                //     // props.registerNodeUpdate(node)
                // }}

                // onElementClick={()=>console.log("onElementClick")}
                fitView
                onInit={setReactFlowInstance}
                // onDrop={(event) => {
                //     console.log('onDrop')
                //     onDrop(event)
                // }}
                // onDragOver={(event) => {
                //     console.log('onDragOver')
                //     onDragOver(event)
                // }}
                style={{margin: '0.5rem'}}
                nodeTypes={nodeTypes}
            >
                <Background color="#aaa" gap={16} />
                <MiniMap style={minimapStyle} zoomable pannable />
                <Controls />
            </ReactFlow>
            {/*<NodeSelector/>*/}
            <IconButton
                style={{ boxShadow: '0 0 2px 1px rgba(0, 0, 0, 0.08)', left: '23px', bottom: '175px', width: '27px', borderRadius: '3px', padding: '0px', background: '#fff'}}
                onClick={props.autoLayoutActivated}
                >
                <AutoAwesomeMosaicIcon style={{ width: '18px', color: '#000'}} />
            </IconButton>
        </ReactFlowProvider>
    )
}

FlowComponent.defaultProps = {
    nodes: [],
    edges: [],
    registerNodeUpdate: null
}
