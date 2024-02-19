import {executeURL} from '../../api.js'
import {getAccessToken} from '../../index.js'

import {returnSuccess, returnError} from '../../../util/http/index.js'
import {Request, Response} from 'express'

export const getCurrentSprint = async (req: Request, res: Response): Promise<void> => {
    const userId = req.query.userId
    const boardId = req.query.boboardId

    await executeJiraUrl('https://weareandrei.atlassian.net/rest/agile/1.0/board/' + boardId.toString() + '/sprint', userId.toString())
        .then((result) => returnSuccess(res, result))
        .catch(returnError)
}

export const getCurrentSprintIssues = async (req: Request, res: Response): Promise<void> => {
    const userId = req.query.userId
    const sprintId = req.query.sprintId

    await executeJiraUrl('https://weareandrei.atlassian.net/rest/agile/1.0/sprint/' + sprintId.toString() + '/issue', userId.toString())
        .then((result) => returnSuccess(res, result))
        .catch(returnError)
}

const executeJiraUrl = async (url: string, userId: string): Promise<void> => {
    const accessToken = getAccessToken(userId, 'jira')
    await executeURL(url, {}, {
        Authorization: 'Basic ' + accessToken,
        Accept: 'application/json'
    })
}
