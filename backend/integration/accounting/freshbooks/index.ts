import { executeURL } from '../../api'
import { getAccessToken } from '../../index'

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

export const getProfitAndLossesReport = (accountId: string, businessUuid: string) => {
    const accessToken = getAccessToken(accountId, 'freshbooks')
    const result = executeURL(
        'https://api.freshbooks.com/accounting/businesses/'+businessUuid+'/reports/profit_and_loss?start_date=2023-01-01&end_date=2023-12-31',
        {}, {
            'Authorization': 'Bearer ' + accessToken,
            // 'Api-Version': 'alpha',
            // 'Accept': 'application/json'
        })
    return result
}
