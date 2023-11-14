const { DocumentationModel } = require('./model')
const {mongoose} = require("mongoose")
const { ObjectId } = require('mongodb');
const {mapWithThrottle} = require("../util/mapWithThrottle")

const createNewEntity = async (req, res) => {
    const documentationId = req.body.id
    const newEntity = req.body.newEntity
    const entityPath = req.body.entityPath
    // For example, doc.children[0].children[4].children[1]

    const mongoString = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

    mongoose.connect(mongoString, { dbName: "documentation", useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database Connected')
        })
        .catch((error) => {
            console.error('Database Connection Error:', error)
        })

    const result = await DocumentationModel.findOneAndUpdate(
        { _id: documentationId },
        { $push: { [entityPath]: newEntity } },
        { new: true } // This option returns the updated document
    );
    console.log(result)

    res.json(result)
}

const updateExistingEntity = async (documentationId, updateParams) => {
    console.log('func -> updateExistingEntity, (params): \n', documentationId, updateParams)
    const mongoString = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

    mongoose.connect(mongoString, { dbName: "documentation", useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database Connected')
        })
        .catch((error) => {
            console.error('Database Connection Error:', error)
        })

    console.log('query :', JSON.stringify([
        {'_id': documentationId, 'doc.id': updateParams.nodeId},
        {$set: updateParams.updateValues}]))
    const result = await DocumentationModel.updateOne(
        {
            '_id': documentationId, 'doc.id': updateParams.nodeId
        },
        {
            $set: updateParams.updateValues
        })

    console.log('result ->', result)

    return result
}

const updateNodes = async (req, res) => {
    const documentationId = req.body.documentationId
    const nodeUpdates = req.body.nodeUpdates

    const result = await mapWithThrottle(nodeUpdates, async (updateParams) => {
        await updateExistingEntity(documentationId, updateParams)
    }, 10)

    console.log('result OVERALL ->', result)

    res.json(result)
}

module.exports = {
    createNewEntity,
    updateNodes
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