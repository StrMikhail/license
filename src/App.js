import { Navigate, Route, Routes } from 'react-router-dom';
import moment from 'moment';
import Main from './pages/Main';
import Admin from './pages/Admin';
import RequireAuth from './hoc/RequireAuth';
import Login from './pages/Login';
import Layout from './components/Layout';

moment.locale('ru');
function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route
                    path="/admin"
                    element={
                        <RequireAuth>
                            <Admin />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
