const flatMap = require("lodash/flatMap")
const map = require("lodash/map")
const find = require("lodash/find")
const maxBy = require("lodash/maxBy")
const reduce = require("lodash/reduce")

const MAX_NODE_LEVELS_DISPLAYED = 3
const CELL_SIZE_PX = 25
const MAX_NODE_GRID_DEPTH = 2
const DISTANCE_BETWEEN_NODES_VERTICAL = 18
const DISTANCE_BETWEEN_NODES_HORIZONTAL = 18

// those sizes are in relative units. Each unit is multiplied by a given number in nodesLayout.js
// for example width = 5 means 5 cells occupied. And 5 cells can be 25px each.
const nodesSizes = require('../properties/nodesSizes.json')
const FlexibleGrid = require('./flexibleGrid.js')
const {determineNodeSizeAttributes} = require('../util/sizeDeterminer')

class NodesLayout {

    allNodes = []
    nodeStructure = []
    layoutGrid = new FlexibleGrid()
    nodeCoordinates = {}

    constructor(currentNode, allNodes) {
        this.allNodes = allNodes
        this.nodeStructure = this.unpackNode(currentNode, 1)
    }

    buildLayout = () => {
        this.produceLayout()
    }

    unpackNode = (node, currentLevel) => {
        const result = {
            id: node.id,
            size: this.findCorrespondingNodeSize(node/*, currentLevel*/),
            open: false,
            childrenNormal: [],
            childrenPages: []
        }

        if (node.type !== 'page') {
            return result
        }

        result.childrenNormal = flatMap(node.children, (childId) => {
            const unpackedChild = this.findNodeById(childId)
            if (unpackedChild.type !== 'page') {
                return {id: unpackedChild.id, size: this.findCorrespondingNodeSize(unpackedChild), open: false}
            } return[]
        })

        result.childrenPages = flatMap(node.children, (childId) => {
            const unpackedChild = this.findNodeById(childId)
            if (unpackedChild.type === 'page') {
                return this.unpackNode(unpackedChild, currentLevel+1)
            } return[]
        })

        return result
    }

    findNodeById = (id) =>
        find(this.allNodes, (node) => node.id === id)

    findCorrespondingNodeSize = (node) => {
        const sizeAttributes = determineNodeSizeAttributes(node)
        return {
            bodyHeight: nodesSizes[node.type].bodyHeight[sizeAttributes.bodyHeight],
            width: nodesSizes[node.type].width[sizeAttributes.width]
        }
    }

    produceLayout = () => {
        this.positionNodeColumn(0, 0, this.nodeStructure, 0)
    }

    positionNodeColumn = (initialX, initialY, node, depth) => {
        this.placeNodeOnCell({x:initialX,y:initialY}, node)
        initialY = initialY + node.size.bodyHeight + 55

        const columnWidth = this.findColumnWidth(node.childrenNormal)
        // Put everything in one column for now and wind max width of a node.
        this.placeChildNodesInColumn(node.childrenNormal, initialX, initialY)

        map(node.childrenPages, (childPage) => {
            if (depth < MAX_NODE_GRID_DEPTH) {
                this.positionNodeColumn(initialX+columnWidth+DISTANCE_BETWEEN_NODES_HORIZONTAL, initialY + DISTANCE_BETWEEN_NODES_VERTICAL, childPage, depth+1)
            }
            this.placeNodeOnCell({x: initialX+columnWidth+DISTANCE_BETWEEN_NODES_HORIZONTAL, y: initialY + DISTANCE_BETWEEN_NODES_VERTICAL}, childPage)
        })
    }

    // find widest node (from child nodes, not page nodes)
    findColumnWidth = (nodes) => {
        const nodeWithMaxWidth = maxBy(nodes, (node) => node.size.width)
        return nodeWithMaxWidth.size.width
    }

    placeChildNodesInColumn = (nodes, initialX, initialY) =>
        reduce(nodes, (accumulator, childNode) => {
            console.log('placeNodeOnCell node', childNode)
            console.log('placeNodeOnCell node BodyHeight', childNode.size.bodyHeight)

            this.placeNodeOnCell({x: accumulator.coordinateReached.x, y: accumulator.coordinateReached.y+DISTANCE_BETWEEN_NODES_VERTICAL}, childNode)
            return {
                coordinateReached: {
                    x: accumulator.coordinateReached.x, // Will use later
                    y: accumulator.coordinateReached.y + childNode.size.bodyHeight + 55
                }
            }
        }, {coordinateReached: {x: initialX, y: initialY}})

    placeNodeOnCell = (pos, node) => {
        const untilCell = {
            x: node.size.width/CELL_SIZE_PX,
            y: node.size.bodyHeight/CELL_SIZE_PX
        }
        this.nodeCoordinates[node.id] = {x: pos.x, y: pos.y}
        this.layoutGrid.setCells(pos, untilCell, node.id)
    }

    getNodeCoordinates = (nodeId) =>
        this.nodeCoordinates[nodeId]

    countColumns = (nodes) => {
        if (nodes.length < 5) {
            return 1
        } return 2
        //
        // const countNodes = (node) => {
        //     const total = [1 + get(node, 'childrenNormal', []).length + get(node, 'childrenPages', []).length]
        //     if (get(node, 'childrenPages', []).length !== 0) {
        //         total.push(flatMap(node.childrenPages, (page) => countNodes(page)))
        //     }
        //     return total
        // }
        //
        // const columns = countNodes(nodes)
        //
        // return flatMap(columns)
    }

    positionNodeBelowParent = (parentPos, nodeSize) => {
        if (/* this columns has too many nodes */ true) {
            // start new column
        }
    }

    positionNodeAsParent = (parentPos, nodeSize) => {

    }

    // findEmptyPositionTopLeft(size, parent) {
    //     for (let row = 0; row < this.positions.length; row++) {
    //         for (let col = 0; col < this.positions[row].length; col++) {
    //             if (this.isPositionEmpty(row, col, size)) {
    //                 return { row, col }
    //             }
    //         }
    //     }
    //
    //     const newRow = this.positions.length
    //     const newCol = 0
    //     this.positions.push([false])
    //     return { row: newRow, col: newCol }
    // }
    //
    // isPositionEmpty(row, col, size) {
    //     for (let i = row; i < row + size; i++) {
    //         if (!this.positions[i]) return false
    //         for (let j = col; j < col + size; j++) {
    //             if (this.positions[i][j] === true) {
    //                 return false
    //             }
    //         }
    //     }
    //     return true
    // }
    //
    // placeNodeOnGrid(node, position) {
    //     for (let i = position.row; i < position.row + node.size; i++) {
    //         if (!this.positions[i]) this.positions[i] = []
    //         for (let j = position.col; j < position.col + node.size; j++) {
    //             this.positions[i][j] = true
    //         }
    //     }
    //
    //     node.position = position
    // }
    //
    // getNodePosition(nodeId) {
    //     const node = this.nodes.find((n) => n.id === nodeId)
    //     return node ? node.position : null
    // }
    //
    // getAllNodePositions() {
    //     return this.nodes.map((node) => ({
    //         id: node.id,
    //         position: node.position
    //     }))
    // }
}

module.exports = NodesLayout