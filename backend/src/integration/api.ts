import axios, {AxiosRequestConfig} from 'axios'
import isEmpty from 'lodash/isEmpty.js'

// eslint-disable-next-line max-params,max-lines-per-function
export const executeURL = async (url: string, params: any, headers?: AxiosRequestConfig['headers'], ...args: any[]): Promise<any> => {
    const config: AxiosRequestConfig = {
        headers
    }

    if (isEmpty(params)) {
        return await axios.get(url, config)
            .then(getResponse)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await axios.post(url, params, ...args)
        .then(getResponse)
}

const getResponse = (response: any): any =>
    response.data
