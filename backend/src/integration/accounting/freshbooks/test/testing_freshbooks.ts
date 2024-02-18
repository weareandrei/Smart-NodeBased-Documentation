import { listAllInvoices, getProfitAndLossesReport } from "../index.js"

const axios = require('axios')

const accountId = 'KEA1py'
const businessUuid = '14d564b5-f747-404d-b717-db408f5becbe'

const run = async () => {

    // listAllInvoices(accountId)
    //     .then(res => console.log(res))
    //     .catch(err => console.error(err))

    await getProfitAndLossesReport(accountId, businessUuid)
        .then((res: any) => console.log(res))
        .catch((err: any) => console.error(err))
}

run()
