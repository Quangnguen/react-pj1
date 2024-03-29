import Home from '../components/Home';
import { Route, Routes, Link } from 'react-router-dom';
import Login from '../components/Login';
import PrivateRoute from './PrivateRoutes';
import TableUsers from '../components/TableUsers';
const AppRoutes = () => {
    return (
        <>
        <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route
            path='/users'
            element={
                <PrivateRoute>
                    <TableUsers />
                </PrivateRoute>
            }
        />   
        </Routes>     
        </>
    )
}


export default AppRoutes