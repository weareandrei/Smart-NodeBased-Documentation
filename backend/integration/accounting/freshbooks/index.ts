import { executeURL } from '../../api'
import { getAccessToken, getRefreshTokenToken } from '../../index'

export const listAllInvoices = (accountId: string) => {
    const accessToken = getAccessToken(accountId, 'freshbooks')
    const result = executeURL(
        'https://api.freshbooks.com/accounting/account/'+accountId+'/invoices/invoices',
        {}, {
            'Authorization': 'Bearer ' + accessToken,
            'Api-Version': 'alpha',
            'Accept': 'application/json'
        })
    return result
}

export const getProfitAndLossesReport = async (accountId: string, businessUuid: string): Promise<any> => {
    try {
        let accessToken = getAccessToken(accountId, 'freshbooks')
        const result = await executeURL(
            `https://api.freshbooks.com/accounting/businesses/${businessUuid}/reports/profit_and_loss?start_date=2023-01-01&end_date=2023-12-31`,
            {},
            {
                'Authorization': 'Bearer ' + accessToken
            }
        )

        return result
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            // Token refresh required
            try {
                const newAccessToken = await refreshAccessToken(accountId)
                // updateAccessToken(newAccessToken, 'freshbooks')
                console.log('new access token: ', newAccessToken.access_token)
                console.log('new refresh token: ', newAccessToken.refresh_token)
                // Retry the function with the new access token
                return getProfitAndLossesReport(accountId, businessUuid)
            } catch (refreshError) {
                console.log('error persists after updating access_token', refreshError)
                throw refreshError
            }
        } else {
            console.log('other error', error)
            throw error
        }
    }
}

const refreshAccessToken = async (accountId: string): Promise<any> => {
    const refreshToken = getRefreshTokenToken(accountId, 'freshbooks')
    const newAccessToken = await executeURL(
        'https://api.freshbooks.com/auth/oauth/token',
        {
            'grant_type': 'refresh_token',
            'client_id': '9a4eeb680559b8861d4dae58f78b6d1405300575da8d028909040418cee138c9',
            'client_secret': 'b06005599b24e0f60a4e3d99a01ff0fe3df497281b95bd66d05d9ab976dd76c9',
            'refresh_token': refreshToken,
            'redirect_uri': 'https://www.freshbooks.com/api/start'
        }, {})

    return {
        access_token: newAccessToken.access_token,
        refresh_token: newAccessToken.refresh_token
    }
}
