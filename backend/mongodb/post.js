const { DocumentationModel } = require('./model')
const {mongoose} = require("mongoose")
const { ObjectId } = require('mongodb');
const {mapWithThrottle} = require("../util/mapWithThrottle")

const createNewEntity = async (documentationId, updateNode) => {
    console.log('func -> createNewEntity, (params): \n', documentationId, updateNode)
    const mongoString = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

    mongoose.connect(mongoString, { dbName: "documentation", useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database Connected')
        })
        .catch((error) => {
            console.error('Database Connection Error:', error)
        })

    const result = await DocumentationModel.updateOne(
        {
            '_id': documentationId
        },
        {
            $push: {
                doc: updateNode.updateValues
            }
        })

    console.log('result ->', result)

    return result
}

const updateExistingEntity = async (documentationId, updateNode) => {
    console.log(' -- func -> updateExistingEntity, (params): \n', documentationId, updateNode)
    const mongoString = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

    mongoose.connect(mongoString, { dbName: "documentation", useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database Connected')
        })
        .catch((error) => {
            console.error('Database Connection Error:', error)
        })

    const result = await DocumentationModel.updateOne(
        {
            '_id': documentationId, 'doc.id': updateNode.nodeId
        },
        {
            $set: updateNode.updateValues
        })

    console.log('result ->', result)

    return result
}

const syncNodes = async (req, res) => {
    const documentationId = req.body.documentationId
    const nodeUpdates = req.body.nodeUpdates

    console.log('\n')
    console.log(' --- CALLED API : /syncNodes')
    console.log('       with documentationId = ', documentationId)
    console.log('       with nodeUpdates = ', nodeUpdates)

    const result = await mapWithThrottle(nodeUpdates, async (updateParams) => {
        if (updateParams.action === 'create') {
            await createNewEntity(documentationId, updateParams.node)
        } if (updateParams.action === 'update') {
            await updateExistingEntity(documentationId, updateParams.node)
        } else {
            console.log('Invalid updateParams.action assigned')
        }
    }, 1)

    console.log('result OVERALL ->', result)

    res.json(result)
}

module.exports = {
    syncNodes
}

/* ----------------------- API USAGE EXAMPLES ----------------------- */

// createNewEntity({
//     body: {
//         id: '6523592fd730e1f9120fbef6',
//         newEntity: {
//             "title": "Sample Node 16",
//             "type": "Type 16"
//         },
//         entityPath: 'doc.children'
//     }
// })

// updateExistingEntity({
//     body: {
//         id: '6523592fd730e1f9120fbef6',
//         updatedValue: {
//             "title": "Updated Title",
//             "type": "Updated Type"
//         },
//         valuePath: 'doc.children[0]'
//     }
// });