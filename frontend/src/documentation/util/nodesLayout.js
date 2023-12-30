const map = require("lodash/map")
const find = require("lodash/find")
const get = require("lodash/get")
const filter = require("lodash/filter")
const flatten = require("lodash/flatten")

const FlexibleGrid = require('./flexibleGrid.js')
const {calculateNodeSize, NODE_CONST_WIDTH} = require("./sizeDeterminer")

class NodesLayout {

    nodes = []
    unpackedNodes = []
    nodesTree = []
    // layoutGrid = new FlexibleGrid()
    nodesColumns = []
    nodesCoordinates = {}

    constructor(nodes) {
        this.nodes = nodes
        this.unpackedNodes = this.unpackNodes(nodes)
        // console.log('----- unpackedNodes', this.unpackedNodes)
        // For now, all nodes have same width. Just different heights
    }

    buildLayout = () => {
        this.splitNodesIntoTree()
        // console.log('----- nodesTree', this.nodesTree)
        this.putNodesIntoColumns()
        // console.log('----- nodesColumns 1', this.nodesColumns)
        this.nodesColumns = map(this.nodesColumns, (column) => flatten(column))
        // console.log('----- nodesColumns 2', this.nodesColumns)
        this.calculateNodesCoordinates()

    }

    // All nodes have children arrays, but they might be empty
    unpackNodes = (nodes) =>
        map(nodes, (node) => {
            if (node.type === 'page' && get(node, 'children', []).length > 0) {
                const children = this.unpackChildrenNodes(node)
                return {
                    id: node.id,
                    childrenNormal: map(children.childrenNormal, (child) => child.id),
                    childrenPages: map(children.childrenPages, (child) => child.id)
                }
            }

            return {
                id: node.id,
                childrenNormal: [],
                childrenPages: []
            }
        })

    unpackChildrenNodes = (node) => {
        const nodeChildren = map(node.children, (childId) => this.findNodeById(childId, false))

        const childrenNormal = filter(nodeChildren, (child) => {
            if (child.type !== 'page') {
                return true
            }
        })

        const childrenPages = filter(nodeChildren, (child) => {
            if (child.type === 'page') {
                return true
            }
        })

        return {childrenNormal: childrenNormal, childrenPages: childrenPages}
    }

    findNodeById = (id, unpacked = false) => {
        return unpacked ? find(this.unpackedNodes, (node) => node.id.toString() === id.toString()) :
            find(this.nodes, (node) => node.id.toString() === id.toString())
    }

    calculateNodesCoordinates = () => {
        for (let colCount = 0; colCount < this.nodesColumns.length; colCount++) {
            this.calculateColumnCoordinates(this.nodesColumns[colCount], colCount * NODE_CONST_WIDTH + (colCount * 50), colCount)
        }
    }

    calculateColumnCoordinates = (columnNodes, xOffset, columnNumber) => {
        let yReached = 0
        for (let i = 0; i < columnNodes.length; i++) {
            if (columnNodes[i] == '') {
                yReached = this.calculateColumnEmptySpaceHeight(columnNumber, i) + 50
                continue
            }
            const node = this.findNodeById(columnNodes[i])
            const nodeHeights = calculateNodeSize(node)
            const nodeTotalHeight = nodeHeights.headerHeight + nodeHeights.attributesHeight + nodeHeights.bodyHeight
            this.nodesCoordinates[node.id.toString()] = {x: xOffset, y: yReached}
            yReached = yReached + nodeTotalHeight + 50
        }
    }

    calculateColumnEmptySpaceHeight = (columnNumber, nodeNumber) => {
        const node = this.findNodeById(this.nodesColumns[columnNumber-1][nodeNumber])
        const nodeHeights = calculateNodeSize(node)
        return nodeHeights.headerHeight + nodeHeights.attributesHeight + nodeHeights.bodyHeight
    }

    splitNodesIntoTree = () => {
        const initialUnpackedNodes = this.findInitialUnpackedNodes()
        this.nodesTree = map(initialUnpackedNodes, (node) => this.growTreeFromNode(node))
    }

    growTreeFromNode = (node) => {
        const result = node
        result.childrenNormal = map(node.childrenNormal, (nodeId) => this.findNodeById(nodeId))
        result.childrenPages = map(node.childrenPages, (nodeId) => this.growTreeFromNode(this.findNodeById(nodeId, true)))
        return result
    }

    findInitialUnpackedNodes = () =>
        filter(this.unpackedNodes, (node) => {
            const nodeId = node.id

            // find its parent
            const parent = find(this.nodes, (node) => {
                const nodesChildren = get(node, 'children', [])
                if (nodesChildren.includes(nodeId)) {
                    // then this is not an initial node
                    return true
                }
            })

            if (!parent) {
                return true
            }
            return false
        })

    putNodesIntoColumns = () => {
        map(this.nodesTree, (rootNode) => {
            // console.log('putIntoNewColumn, rootNode - ', rootNode)
            this.putIntoNewColumn(rootNode, 0, false)
        })
    }

    putIntoNewColumn = (node, level, useLastExistingColumn) => {
        const newColumn = []
        for (let i = 0; i < level; i++) {
            newColumn.push("")
        }
        newColumn.push(node.id)

        if (node.childrenNormal.length === 0 && node.childrenPages.length === 0) {
            this.nodesColumns.push([node.id])
        }

        if (node.childrenNormal.length > 0) {
            const childrenToAdd = map(node.childrenNormal, (childNormal) => childNormal.id)

            if (useLastExistingColumn) {
                this.nodesColumns[this.nodesColumns.length-1].push(node.id)
                this.nodesColumns[this.nodesColumns.length-1].push(childrenToAdd)
            } else {
                newColumn.push(childrenToAdd)
                this.nodesColumns.push(newColumn)
            }

            map(node.childrenPages, (childPage) => this.putIntoNewColumn(childPage, level+1, false))
        } else {
            map(node.childrenPages, (childPage) => this.putIntoNewColumn(childPage, level, true))
        }
    }

    getNodeCoordinates = (id) =>
        this.nodesCoordinates[id]

}

module.exports = NodesLayout
