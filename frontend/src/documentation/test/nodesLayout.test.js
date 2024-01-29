const NodesLayout = require('../util/nodesLayout')
const {nodes, nodesSizes} = require ('./exampleNodes.js')

const main = () => {
    const myNodesLayout = new NodesLayout(nodes, nodesSizes)
    myNodesLayout.buildLayout()
    console.log(myNodesLayout.nodesCoordinates)
}

main()