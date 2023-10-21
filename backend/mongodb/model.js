const {mongoose} = require('mongoose');

const Schema = mongoose.Schema

const DocumentationModelSchema = new Schema({
    doc: {
        type: Object
    }
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
