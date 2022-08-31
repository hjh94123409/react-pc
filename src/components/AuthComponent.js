import React from 'react'

import { Navigate } from 'react-router-dom'

import { getToken } from '@/utils'

const AuthComponent = ({ children }) => {
    const isToken = getToken()
    if (isToken) {
        return <>{children}</>
    } else {
        return <Navigate to={'/login'} replace />
    }
}

export default AuthComponent
