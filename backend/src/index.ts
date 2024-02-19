/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express, {type Express} from 'express'
import cors from 'cors'

// import {validateUserCredentials} from './auth/auth.js'
// import {loadDocumentation} from './mongodb/get.js'
// import {syncNodes} from './mongodb/post.js'

import {getCurrentSprint, getCurrentSprintIssues} from './integration/taskmanager/jira/index.js'

const app: Express = express()
app.use(express.json())
app.use(cors())

app.get('/taskmanager/jira/sprint/current/issues', getCurrentSprintIssues)
app.get('/taskmanager/jira/sprint/current', getCurrentSprint)
// app.get('/taskmanager/jira/sprint/{sprintId}/issues');

// app.post('/validateUserCredentials', validateUserCredentials)
// app.get('/loadDocumentation', loadDocumentation)
// app.post('/syncNodes', syncNodes)

app.listen(8081, () => {
    console.log(`Server Started at ${8081}`)
})
