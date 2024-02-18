import { executeURL } from '../../api.js'
import { getAccessToken } from '../../index.js'

const getCurrentSprint = (userId: string, boardId: number) => {
    const accessToken = getAccessToken(userId, 'jira')
    const result = executeURL(
        'https://weareandrei.atlassian.net/rest/agile/1.0/board/'+boardId+'/sprint',
        {}, {
                'Authorization': 'Basic ' + accessToken,
                'Accept': 'application/json'
            })
    return result
}

const getCurrentSprintIssues = (userId: string, sprintId: number) => {
    const accessToken = getAccessToken(userId, 'jira')
    const result = executeURL(
        'https://weareandrei.atlassian.net/rest/agile/1.0/sprint/'+sprintId+'/issue',
        {}, {
            'Authorization': 'Basic ' + accessToken,
            'Accept': 'application/json'
        })
    return result
}

module.exports = {
    getCurrentSprint,
    getCurrentSprintIssues
}
