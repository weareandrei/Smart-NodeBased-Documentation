const express = require('express')
const cors = require('cors')

const {validateUserCredentials} = require('./auth/auth')
const {loadDocumentation} = require('./mongodb/get')
const {createNewEntity} = require('./mongodb/post')
const {updateNodes} = require('./mongodb/post')

const app = express()
app.use(express.json())
app.use(cors())

app.post('/validateUserCredentials', validateUserCredentials)
app.post('/loadDocumentation', createNewEntity)
app.post('/updateNodes', updateNodes)
app.get('/loadDocumentation', loadDocumentation)

app.listen(8081, () => {
    console.log(`Server Started at ${8081}`)
})