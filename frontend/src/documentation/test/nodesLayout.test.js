const NodesLayout = require('../util/nodesLayout')
const nodes = require ('./exampleNodes.json')

const main = () => {
    const myNodesLayout = new NodesLayout(nodes)
    myNodesLayout.buildLayout()
    console.log(myNodesLayout.nodeCoordinates)
}

main()