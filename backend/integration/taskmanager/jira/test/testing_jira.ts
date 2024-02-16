const axios = require('axios')

// const execute = async (url: string, params, ...args): Promise<any> => {
//     if (isEmpty(params)) {
//         return await axios.get(url)
//             .then(getResponse)
//     }
//     return await axios.post(url, params, ...args)
//         .then(getResponse)
// }
//
// const formJiraUrlParams = (): string =>
//     ''

import fetch from 'node-fetch'

const jiraAccessToken = 'ATATT3xFfGF09ZDggJTihAoG7rBh3b8ExHKnFeSd_3o1zdHdNbUw9Xl_zOEFoOJuE9XO3rdJ8eUYg88AI58_d3D0QJskSJky-nt-QH_YGjHK4RiRuNiUaeqGaC_WgJNWImFTyOrO52aSZXTnV0-DvwjgGU2Pyp01daV3Uq6_WlL1bRukJq4HY-4=F15109A6'
// until 20 apr

const boardId = 2

// fetch('https://weareandrei.atlassian.net/rest/agile/1.0/board/'+boardId+'/sprint', {
// // fetch('https://weareandrei.atlassian.net/rest/agile/1.0/board', {
//     method: 'GET',
//     headers: {
//         'Authorization': 'Basic '+btoa('weareandrei@gmail.com:'+jiraAccessToken),
//         'Accept': 'application/json'
//     }
// })
//     .then(response => {
//         console.log(
//             `Response: ${response.status} ${response.statusText}`
//         );
//         return response.text();
//     })
//     .then(text => console.log(text))
//     .catch(err => console.error(err));

import {getCurrentSprint, getCurrentSprintIssues} from "../index"

const run = async () => {

    // const result = await axios.post(
    //     'https://accounts.zoho.com/oauth/v2/token',
    //     `code=${encodeURIComponent('1000.cac243f24208b0d4e08613ee7e9696e7.dd8573e7b08999fa9a33cf082de86edf')}&` +
    //     `client_id=${encodeURIComponent('1000.WCNP9UB36S5CYMGHZ3XJJ8NRGST0NW')}&` +
    //     `client_secret=${encodeURIComponent('0fb5427e112a41849f3b10a8098ef060eb1eb5e611')}&` +
    //     `redirect_uri=${encodeURIComponent('http://www.zoho.com/books')}&` +
    //     `grant_type=${encodeURIComponent('authorization_code')}`,
    //     {
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     }
    // )

    // 1000.cac243f24208b0d4e08613ee7e9696e7.dd8573e7b08999fa9a33cf082de86edf
    // console.log(result)
    getCurrentSprint('0', 2)
        .then(res => console.log(res))
        .catch(err => console.error(err))

    // getCurrentSprintIssues(0, 1)
    //     .then(res => console.log(res))
    //     .catch(err => console.error(err))
}

run()
