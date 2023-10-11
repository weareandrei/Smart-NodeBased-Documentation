const express = require('express');
const {mongoose} = require('mongoose');
const cors = require('cors');

const {validateUserCredentials} = require('./auth/auth')
const {loadDocumentation} = require('./mongodb/get')

const mongoString = 'mongodb+srv://weareandrei:Andrews8208@omega.owkrpxa.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connected');
    })
    .catch((error) => {
        console.error('Database Connection Error:', error);
    });

mongoose.set("strictQuery", false);

const app = express();

app.use(express.json());
app.use(cors());

app.post('/validateUserCredentials', validateUserCredentials)
app.get('/loadDocumentation', loadDocumentation)

app.listen(8081, () => {
    console.log(`Server Started at ${8081}`)
})