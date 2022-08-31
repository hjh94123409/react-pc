import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import Layout from './pages/Layout'

import Login from '@/pages/Login'
import AuthComponent from './components/AuthComponent'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Link to="/">首页</Link>
                <Link to="/login">登录页</Link>
                <hr />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <AuthComponent>
                                <Layout />
                            </AuthComponent>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
