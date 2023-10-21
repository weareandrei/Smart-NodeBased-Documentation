const { DocumentationModel } = require('./model')
const {mongoose} = require("mongoose")

const loadDocumentation = async (req, res) => {
    const documentationId = req.query.documentationId

    const mongoString = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

    mongoose.connect(mongoString, { dbName: "documentation", useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database Connected')
        })
        .catch((error) => {
            console.error('Database Connection Error:', error)
        })

    mongoose.set("strictQuery", false)

    const result = await DocumentationModel.findOne({_id: documentationId})

    console.log(result)

    // const result = {
    //     "_id": {
    //         "$oid": "6523592fd730e1f9120fbef6"
    //     },
    //     "doc": {
    //             "nodeId" : 1,
    //             "title": 'Project X',
    //             "children": [
    //                 {
    //                     "nodeId" : 2,
    //                     "title": "Design",
    //                     "children": [
    //                         {
    //                             "nodeId" : 3,
    //                             "title": "IOS",
    //                             "type": "Type 1"
    //                         },
    //                         {
    //                             "nodeId" : 4,
    //                             "title": "PC Version",
    //                             "type": "Type 2",
    //                             "children": [
    //                                 {
    //                                     "nodeId" : 5,
    //                                     "title": "Sample Node 3",
    //                                     "type": "Type 1"
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 },
    //
    //                 {
    //                     "nodeId" : 6,
    //                     "title": "Programming",
    //                     "children": [
    //                         {
    //                             "nodeId" : 7,
    //                             "title": "Backend",
    //                             "type": "Type 1",
    //                             "children": [
    //                                 {
    //                                     "nodeId" : 8,
    //                                     "title": "Some function 1",
    //                                     "type": "Type 1"
    //                                 },
    //                                 {
    //                                     "nodeId" : 9,
    //                                     "title": "Some function 2",
    //                                     "type": "Type 1"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "nodeId" : 10,
    //                             "title": "Frontend",
    //                             "type": "Type 2",
    //                             "children": [
    //                                 {
    //                                     "nodeId" : 11,
    //                                     "title": "Navigation Component",
    //                                     "type": "Type 1"
    //                                 },
    //                                 {
    //                                     "nodeId" : 12,
    //                                     "title": "Component Definitions",
    //                                     "type": "Type 2",
    //                                     "children": [
    //                                         {
    //                                             "nodeId" : 13,
    //                                             "title": "Colours",
    //                                             "type": "Type 5",
    //                                         },
    //                                         {
    //                                             "nodeId" : 14,
    //                                             "title": "Font Sizes",
    //                                             "type": "Type 4",
    //                                         },
    //                                         {
    //                                             "nodeId" : 15,
    //                                             "title": "Buttons",
    //                                             "type": "Type 4",
    //                                         }
    //                                     ]
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    // }

    res.json(result);
}


module.exports = {
    loadDocumentation,
};
