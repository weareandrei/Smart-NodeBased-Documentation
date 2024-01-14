const { DocumentationModel } = require('./model')
const {mongoose} = require("mongoose")
const {mapWithThrottle} = require("../util/mapWithThrottle")
const map = require("lodash/map")
const ObjectId = require('mongodb').ObjectId;

const createNewEntity = async (documentationId, nodeCreateRecord) => {
    console.log('func -> createNewEntity, (params): \n', documentationId, nodeCreateRecord)
    const mongoString = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
    return
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

const updateExistingEntity = async (documentationId, nodeUpdateRecord) => {
    console.log(' -- func -> updateExistingEntity, (params): \n', documentationId, nodeUpdateRecord)
    const mongoString = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

    mongoose.connect(mongoString, { dbName: "documentation", useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database Connected')
        })
        .catch((error) => {
            console.error('Database Connection Error:', error)
        })

    const updateStatements = map(nodeUpdateRecord.updates, (updateRecord) => ({
        updateOne: {
            filter: { '_id': documentationId, 'nodes.id': nodeUpdateRecord.id },
            update: prepareUpdateObject(updateRecord)
        }
    }))
    console.log('update statements:', JSON.stringify(updateStatements))

    const resultUpdate = await DocumentationModel.bulkWrite(updateStatements)

    console.log('result ->', resultUpdate)

    return resultUpdate
}

const prepareUpdateObject = (record) => {
    console.log('prepareUpdateObject', record)
    switch (record.type) {
        case 'position':
            return {
                $set: {
                    'nodes.$.layoutAttributes.position.x': record.value.x,
                    'nodes.$.layoutAttributes.position.y': record.value.y
                }
            }
        case 'lock':
            return {
                $set: {
                    'nodes.$.layoutAttributes.locked': record.value
                }
            }
        // Add other cases for different update types if needed
    }
}


const syncNodes = async (req, res) => {

    console.log('\n')
    console.log('req.body', JSON.stringify(req.body))
    const documentationId = req.body.documentationId
    const creates = req.body.documentationChanges.create
    const updates = req.body.documentationChanges.update

    console.log('\n')
    console.log(' --- CALLED API : /syncNodes')
    console.log('       with documentationId = ', documentationId)
    console.log('       with creates = ', creates)
    console.log('       with updates = ', updates)

    const createsResult = await mapWithThrottle(creates, async (nodeCreateRecord) => {
        await createNewEntity(documentationId, nodeCreateRecord)
    }, 1)

    const updatesResult = await mapWithThrottle(updates, async (nodeUpdateRecord) => {
        await updateExistingEntity(documentationId, nodeUpdateRecord)
    }, 1)

    console.log('result CREATES ->', JSON.stringify(createsResult))
    console.log('result UPDATES ->', JSON.stringify(updatesResult))

    res.json({
        creates: createsResult,
        updates: updatesResult
    })

    console.log('\n')
}

module.exports = {
    syncNodes
}
