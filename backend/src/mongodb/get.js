import { DocumentationModel } from './model.js';
import mongoose from 'mongoose';

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
    res.json(result)
}


module.exports = {
    loadDocumentation,
}
