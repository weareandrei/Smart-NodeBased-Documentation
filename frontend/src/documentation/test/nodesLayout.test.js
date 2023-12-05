const NodesLayout = require('../util/nodesLayout')
const nodes = require ('./exampleNodes.json')

const main = () => {
    const myNodesLayout = new NodesLayout(nodes[0], nodes)
    myNodesLayout.buildLayout()
    console.log(myNodesLayout.nodeCoordinates)
}

main()