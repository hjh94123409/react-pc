import { makeAutoObservable } from 'mobx'

import { http, setToken, getToken } from '@/utils'

class LoginStore {
    token = getToken() || ''
    constructor() {
        makeAutoObservable(this)
    }
    getToken = async ({ identifier, password }) => {
        const res = await http.post('auth/local', {
            identifier,
            password,
        })
        //存入token
        this.token = res.data.jwt
        //存入 localStorage
        setToken(res.data.jwt)
    }
}

export default LoginStore
