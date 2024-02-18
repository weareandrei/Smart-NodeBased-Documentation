const {mongoose} = require('mongoose')

const Schema = mongoose.Schema

const DocumentationModelSchema = new Schema({
    projects: [{
        id: String,
        title: String
    }],
    nodes: [{
        id: String,
        projectId: String,
        type: {type: String},
        title: String,
        attributes: Object,
        body: Object,
        content: String,
        layoutAttributes: {
            locked: Boolean,
            position: {
                x: Number,
                y: Number
            },
        }
    }]
})

const UserModelSchema = new Schema({
    documentationId : {
        type: String
    },
    password : {
        type: String
    },
    username : {
        type: String
    }
})

module.exports = {
    DocumentationModel: mongoose.model("documentation", DocumentationModelSchema, 'documentation'),
    UserModel: mongoose.model("User", UserModelSchema, 'User')
}
