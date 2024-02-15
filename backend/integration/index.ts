const jiraAccessToken = 'ATATT3xFfGF09ZDggJTihAoG7rBh3b8ExHKnFeSd_3o1zdHdNbUw9Xl_zOEFoOJuE9XO3rdJ8eUYg88AI58_d3D0QJskSJky-nt-QH_YGjHK4RiRuNiUaeqGaC_WgJNWImFTyOrO52aSZXTnV0-DvwjgGU2Pyp01daV3Uq6_WlL1bRukJq4HY-4=F15109A6'

export const getAccessToken = (userId: number, appName: string) => {
    if (appName === 'jira') {
        return btoa('weareandrei@gmail.com:'+jiraAccessToken)
    }
}
