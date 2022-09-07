import {
    // BrowserRouter,
    Route,
    Routes,
    unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import Login from '@/pages/Login'
import AuthComponent from './components/AuthComponent'
import Home from './pages/Home'
import Publish from './pages/Publish'
import Article from './pages/Article'
import { history } from '@/utils'

function App() {
    return (
        <HistoryRouter history={history}>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <AuthComponent>
                                <Layout />
                            </AuthComponent>
                        }
                    >
                        <Route index element={<Home />} />
                        <Route path="publish" element={<Publish />} />
                        <Route path="article" element={<Article />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </HistoryRouter>
    )
}

export default App
