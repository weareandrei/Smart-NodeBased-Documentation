import axios, { AxiosRequestConfig } from 'axios'
import isEmpty from 'lodash/isEmpty'

export const executeURL = async (url: string, params: any, headers?: AxiosRequestConfig['headers'], ...args: any[]): Promise<any> => {
    const config: AxiosRequestConfig = {
        headers,
    }

    if (isEmpty(params)) {
        return await axios.get(url, config)
            .then(getResponse)
    }
    return await axios.post(url, params, ...args)
        .then(getResponse)
}

const getResponse = (response: any): any =>
    response.data
