const { DocumentationModel } = require('./model')
const {mongoose} = require("mongoose")
const { ObjectId } = require('mongodb');
const {mapWithThrottle} = require("../util/mapWithThrottle")

const createNewEntity = async (documentationId, updateNode, parentId) => {
    console.log('func -> createNewEntity, (params): \n', documentationId, updateNode)
    const mongoString = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

    mongoose.connect(mongoString, { dbName: "documentation", useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database Connected')
        })
        .catch((error) => {
            console.error('Database Connection Error:', error)
        })

    const resultPushNode = await DocumentationModel.updateOne(
        {
            '_id': documentationId
        },
        {
            $push: {
                doc: updateNode.updateValues
            }
        })

    console.log('resultPushNode ->', resultPushNode)

    console.log('query 2 : ', [{
        '_id': documentationId, 'doc.id': parentId
    },
        {
            $push: {
                'doc.$.children': updateNode.updateValues.id
            }
        }])
    const resultPushChild = await DocumentationModel.updateOne(
        {
            '_id': documentationId, 'doc.id': parentId
        },
        {
            $push: {
                'doc.$.children': updateNode.updateValues.id
            }
        })

    console.log('resultPushChild ->', resultPushChild)

    return {resultPushNode: resultPushNode, resultPushChild: resultPushChild}
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
            await createNewEntity(documentationId, updateParams.node, updateParams.parentId)
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
