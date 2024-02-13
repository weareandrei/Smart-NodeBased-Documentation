// const axios = require('axios')

const jiraAccessToken = 'ATATT3xFfGF09ZDggJTihAoG7rBh3b8ExHKnFeSd_3o1zdHdNbUw9Xl_zOEFoOJuE9XO3rdJ8eUYg88AI58_d3D0QJskSJky-nt-QH_YGjHK4RiRuNiUaeqGaC_WgJNWImFTyOrO52aSZXTnV0-DvwjgGU2Pyp01daV3Uq6_WlL1bRukJq4HY-4=F15109A6'
// until 20 apr

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

fetch('https://weareandrei.atlassian.net/rest/agile/1.0/board', {
    method: 'GET',
    headers: {
        'Authorization': 'Basic '+btoa('weareandrei@gmail.com:'+jiraAccessToken),
        'Accept': 'application/json'
    }
})
    .then(response => {
        console.log(
            `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
