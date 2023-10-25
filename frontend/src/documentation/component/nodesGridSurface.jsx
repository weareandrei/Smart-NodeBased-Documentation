import React from "react"
import map from "lodash/map"
import filter from "lodash/filter"
import find from "lodash/find"
import RGL, { WidthProvider } from "react-grid-layout"
import PropTypes from "prop-types"
import Node from "./node"
import get from "lodash/get"
import isEmpty from "lodash/isEmpty"
import { ArcherContainer, ArcherElement } from 'react-archer';
import ReactFlow from 'reactflow';

const ReactGridLayout = WidthProvider(RGL)

export default class NodesGridSurface extends React.PureComponent {

    static propTypes = {
        nodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired,
        updateNode: PropTypes.func.isRequired,

        isDraggable: PropTypes.bool,
        isResizable: PropTypes.bool,
        rowHeight: PropTypes.number,
        onLayoutChange: PropTypes.func,
        cols: PropTypes.number
    }

    static defaultProps = {
        isDraggable: true,
        isResizable: true,
        rowHeight: 30,
        cols: 25
    }

    state = {
        dragging: false,
        previousLayout: [],
        nodesRendered: false
    }

    componentDidMount() {
        // Set a timeout to ensure nodes are fully rendered
        setTimeout(() => {
            this.setState({ nodesRendered: true })
        }, 0)
    }

    render() {
        const layout = this.getNodesGridLayout(this.props.nodes)
        return (
            <ArcherContainer strokeColor="blue">
                <ReactGridLayout
                    layout={layout}
                    onLayoutChange={this.onLayoutChange}
                    onResize={this.onResize}
                    onDrag={this.onDrag}
                    onDragStop={this.onDragStop}
                    { ... {
                        isDraggable: this.props.isDraggable,
                        isResizable: this.props.isResizable,
                        rowHeight: this.props.rowHeight,
                        cols: this.props.cols,
                        preventCollision: true,
                        verticalCompact: false}}>
                    {this.renderNodes(this.props.nodes, layout)}
                </ReactGridLayout>
                {/*{this.state.nodesRendered && this.renderArrows(this.props.nodes)}*/}
            </ArcherContainer>
        )
    }

    getNodesGridLayout = (nodes) => {
        const layout = map(nodes, (node) => ({
            i: node.id,
            ...node.size
        }))

        this.state.previousLayout = layout
        return layout
    }

    renderNodes = (nodes, layout) =>
        map(nodes, (node) =>
            <div key={node.id}>
                <Node node={node}
                      onClick={() => this.handleClick(node)}
                      firstLevel={true}
                      size={this.getNodeSize(layout, node.id)}/>
            </div>)

    // renderArrows = (nodes) =>
    //     map(nodes, (node) => {
    //         if (get(node, 'children', false) && !isEmpty(node.children)) {
    //             return map(node.children, (child) =>
    //                 </ArcherElement>
    //             )
    //         }
    //         return null
    //     })

    getNodeSize = (layout, nodeId) => {
        const thisNodeSize = find(layout, (node) => node.i === nodeId)
        return {
            width: thisNodeSize.w * 50,
            height: thisNodeSize.h * 30
        }
    }

    onDrag = () => {
        this.setState({ dragging: true })
    }

    onDragStop = () => {
        // Clear any existing timers
        if (this.dragStopTimer) {
            clearTimeout(this.dragStopTimer)
        }
        // Set a timer to update dragging to false after 0.05 seconds
        this.dragStopTimer = setTimeout(() => {
            this.setState({ dragging: false })
        }, 50); // 50 milliseconds (0.05 seconds)
    }

    handleClick = (node) => {
        if (!this.state.dragging) {
            this.props.selectNode(node)
        }
    }

    onLayoutChange = (updatedLayout) => {
        const modifiedNodes = this.findModifiedNodes(this.state.previousLayout, updatedLayout)
        // do a throttle and update entire object for those nodes
    }

    findModifiedNodes = (previousLayout, updatedLayout) => {
        const modifiedNodes = filter(previousLayout, (previousNode, index) => !this.nodesEqual(previousNode, updatedLayout[index]))
        if (!modifiedNodes) {
            return
        }
        console.log('modifiedNode',modifiedNodes)
        this.state.previousLayout = updatedLayout
        return modifiedNodes
    }

    nodesEqual = (node1, node2) => {
        if (node1.w !== node2.w ||
            node1.h !== node2.h ||
            node1.x !== node2.x ||
            node1.y !== node2.y) {
            return false
        }

        return true
    }

}
