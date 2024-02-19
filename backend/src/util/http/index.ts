import {Response} from 'express'
import get from 'lodash/get.js'

export const returnSuccess = (res: Response, response: any): void => {
    res.statusCode = 200
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    res.json(response)
}

export const returnError = (res: Response, error: {status?: number, statusText?: string} = {}): void => {
    res.statusCode = get(error, 'status', 200)
    const errorMessage = {error: JSON.stringify(error), statusText: error.statusText}
    console.log(errorMessage)
    res ? res.json(errorMessage) : console.log(errorMessage)
}
