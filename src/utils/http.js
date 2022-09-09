import axios from 'axios'

import { getToken, history } from '@/utils'

const http = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
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
        return response.data
    },
    (error) => {
        console.dir(error)
        if (error.response.status === 401) {
            //跳回到登录
            history.push('/login')
        }
        return Promise.reject(error)
    }
)

export { http }
