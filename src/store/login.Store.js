import { makeAutoObservable } from 'mobx'

import { http, setToken, getToken, removeToken } from '@/utils'

class LoginStore {
    token = getToken() || ''
    constructor() {
        makeAutoObservable(this)
    }
    loginIn = async ({ mobile, code }) => {
        console.log(mobile, code)
        const res = await http.post('/authorizations', {
            mobile,
            code,
        })
        //  13811111111
        //  246810
        // console.log(res.data.data.token)
        //存入token
        this.token = res.data.data.token
        //存入 localStorage
        setToken(res.data.data.token)
    }
    loginOut = () => {
        this.token = ''
        removeToken()
    }
}

export default LoginStore
