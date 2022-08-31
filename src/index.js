import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import './index.scss'

import 'antd/dist/antd.min.css'

import { Button } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Button type="primary">哈哈</Button>
        <App />
    </React.StrictMode>
)
