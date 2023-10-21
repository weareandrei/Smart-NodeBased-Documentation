const { DocumentationModel } = require('./model')
const {mongoose} = require("mongoose");

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

const updateExistingEntity = async (req, res) => {
    const documentationId = req.body.id
    const updatedValue = req.body.updatedValue
    const valuePath = req.body.valuePath
    // For example, doc.children[0].children[4].children[1].title

    const mongoString = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

    mongoose.connect(mongoString, { dbName: "documentation", useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database Connected')
        })
        .catch((error) => {
            console.error('Database Connection Error:', error)
        })

    const result = DocumentationModel.update( { _id: documentationId} , {$set: { valuePath : updatedValue  }} )

    console.log(result)

    res.json(result)
}

// const updateExistingEntity = async (req, res) => {
//     const documentationId = req.body.id
//     const updatedValue = req.body.updatedValue
//     const valuePath = req.body.valuePath
//
//     const mongoString = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
//
//     try {
//         await mongoose.connect(mongoString, { dbName: "documentation", useNewUrlParser: true, useUnifiedTopology: true })
//         console.log('Database Connected')
//
//         const filter = { _id: documentationId }
//         const update = {}
//
//         // Use the positional operator ($) to update a specific nested field within an array
//         update[valuePath] = updatedValue
//
//         const result = await DocumentationModel.updateOne(filter, { $set: update })
//
//         console.log(result)
//         res.json(result)
//     } catch (error) {
//         console.error('Database Connection Error:', error)
//         res.status(500).json({ error: 'Database Connection Error' })
//     }
// }

module.exports = {
    createNewEntity,
    updateExistingEntity
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