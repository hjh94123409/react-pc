import axios from 'axios'

import { getToken } from '@/utils'

const http = axios.create({
    baseURL: 'http://localhost:1337/api/',
    timeout: 5000,
})

//请求拦截器
http.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

//响应拦截器
http.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export { http }
