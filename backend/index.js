const express = require('express')
const cors = require('cors')

const {validateUserCredentials} = require('./auth/auth')
const {loadDocumentation} = require('./mongodb/get')
const {syncNodes} = require('./mongodb/post')

const { getCurrentSprint, getCurrentSprintIssues } = require('./integration/taskmanager/jira/index')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/taskmanager/jira/sprint/current', getCurrentSprint())
app.get('/taskmanager/jira/sprint/current/issues', getCurrentSprintIssues())
// app.get('/taskmanager/jira/sprint/{sprintId}/issues')

app.post('/validateUserCredentials', validateUserCredentials)
app.get('/loadDocumentation', loadDocumentation)
app.post('/syncNodes', syncNodes)

app.listen(8081, () => {
    console.log(`Server Started at ${8081}`)
})
