import { useCallback, useState } from "react"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

enum RequestStatuses {
    'INITIAL' = 'INITIAL',
    'LOADING' = 'LOADING',
    'FAILURE' = 'FAILURE',
    'SUCCESS' = 'SUCCESS',
}
export const useFetch = ({ url, method, ...rest }: AxiosRequestConfig) => {
    const [data, setState] = useState<AxiosResponse | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [status, setStatus] = useState<RequestStatuses>(RequestStatuses.INITIAL)
    const request = useCallback(() => {
        setStatus(RequestStatuses.LOADING)
        axios({
            url: url,
            method: method,
            ...rest,

        }).then(res => {
            setState(res);
            setStatus(RequestStatuses.SUCCESS)


        }).catch(e => {
            setError(e);
            setStatus(RequestStatuses.FAILURE)
        })

    }, [])

    return {
        request,
        data,
        status,
        error,
    }
}