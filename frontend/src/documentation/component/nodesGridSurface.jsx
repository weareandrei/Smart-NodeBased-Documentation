import React from "react"
import map from "lodash/map"
import find from "lodash/find"
import random from "lodash/random"
import RGL, { WidthProvider } from "react-grid-layout"
import PropTypes from "prop-types"
import Node from "./node"
import Button from '@mui/material/Button';

const ReactGridLayout = WidthProvider(RGL)

export default class NodesGridSurface extends React.PureComponent {

    static propTypes = {
        nodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired,

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
        onLayoutChange: function() {},
        cols: 25
    }

    state = {
        dragging: false
    }

    render() {
        const layout = this.getNodesGridLayout(this.props.nodes)
        console.log(layout)
        return (
            <ReactGridLayout
                layout={layout}
                onLayoutChange={this.onLayoutChange}
                onResize={this.onResize}
                onDrag={this.onDrag}  // Add this line
                onDragStop={this.onDragStop}  // Add this line
                { ... {
                    isDraggable: this.props.isDraggable,
                    isResizable: this.props.isResizable,
                    rowHeight: this.props.rowHeight,
                    onLayoutChange: this.props.onLayoutChange,
                    cols: this.props.cols}}>
                {map(this.props.nodes, (node) => {
                    // return this.renderNode(node)
                    return <div key={node.id}>
                                <Node node={node}
                                      onClick={() => this.handleClick(node)}
                                      firstLevel={true}
                                      size={this.getNodeSize(layout, node.id)}/>
                            </div>
                })}
            </ReactGridLayout>
        )
    }

    getNodesGridLayout = (nodes) =>
        map(nodes, (node) => ({
            i: node.id,
            ...node.size
        }))

    // Layout example :
    // ---------------------------
    // [
    //     { i: "1", x: 0, y: 0, w: 2, h: 2/*, static: true*/ },
    //     { i: "2", x: 2, y: 0, w: 3, h: 2/*, minW: 2, maxW: 4*/ },
    //     { i: "3", x: 5, y: 0, w: 2, h: 2 },
    //     { i: "4", x: 7, y: 0, w: 2, h: 2 }
    // ]

    getNodeSize = (layout, nodeId) => {
        const thisNodeSize = find(layout, (node) => node.i === nodeId)
        return {
            width: thisNodeSize.w * 50,
            height: thisNodeSize.h * 30
        }
    }

    onDrag = () => {
        console.log('dragging')
        this.setState({ dragging: true })
    }

    onDragStop = () => {
        console.log('stopped dragging');
        // Clear any existing timers
        if (this.dragStopTimer) {
            clearTimeout(this.dragStopTimer);
        }
        // Set a timer to update dragging to false after 0.05 seconds
        this.dragStopTimer = setTimeout(() => {
            this.setState({ dragging: false });
        }, 50); // 50 milliseconds (0.05 seconds)
    }

    handleClick = (node) => {
        console.log('handleClick, dragging: ', this.state.dragging )
        if (!this.state.dragging) {
            this.props.selectNode(node)
        }
    }

    // determineDataGrid = (node, index) => ({
    //     x: (index * 2) % 12,
    //     y: Math.floor(index / 6),
    //     w: random(1, 2),
    //     h: random(1, 3),
    //     node: node,
    //     title: node.title
    // })

    // generateDOM() {
    //     // Generate items with properties from the layout, rather than pass the layout directly
    //     const nodes = this.generateNodes();
    //     return map(nodes, (node) => {
    //         return (
    //             <div key={node.title} data-grid={node}>
    //
    //             </div>
    //         )
    //     })
    // }

    // generateNodes() {
    //     console.log('this.props.selectedNode', this.props.selectedNode)
    //     return map(this.props.selectedNode.children, (node, index) => {
    //         const w = random(1, 2)
    //         const h = random(1, 3)
    //         return {
    //             x: (index * 2) % 12,
    //             y: Math.floor(index / 6),
    //             w: w,
    //             h: h,
    //             node: node,
    //             title: node.title
    //         }
    //     })
    // }

    // onLayoutChange(layout) {
    //     this.props.onLayoutChange(layout);
    // }
    //
    // onResize(layout, oldLayoutItem, layoutItem, placeholder) {
    //     // `oldLayoutItem` contains the state of the item before the resize.
    //     // You can modify `layoutItem` to enforce constraints.
    //
    //     if (layoutItem.h < 3 && layoutItem.w > 2) {
    //         layoutItem.w = 2;
    //         placeholder.w = 2;
    //     }
    //
    //     if (layoutItem.h >= 3 && layoutItem.w < 2) {
    //         layoutItem.w = 2;
    //         placeholder.w = 2;
    //     }
    // }

}
