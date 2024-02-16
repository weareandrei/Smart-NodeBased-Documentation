import { executeURL } from '../../api'
import { getAccessToken } from '../../index'

export const getCurrentSprint = (userId: string, boardId: number) => {
    const accessToken = getAccessToken(userId, 'jira')
    const result = executeURL(
        'https://weareandrei.atlassian.net/rest/agile/1.0/board/'+boardId+'/sprint',
        {}, {
                'Authorization': 'Basic ' + accessToken,
                'Accept': 'application/json'
            })
    return result
}

export const getCurrentSprintIssues = (userId: string, sprintId: number) => {
    const accessToken = getAccessToken(userId, 'jira')
    const result = executeURL(
        'https://weareandrei.atlassian.net/rest/agile/1.0/sprint/'+sprintId+'/issue',
        {}, {
            'Authorization': 'Basic ' + accessToken,
            'Accept': 'application/json'
        })
    return result
}
