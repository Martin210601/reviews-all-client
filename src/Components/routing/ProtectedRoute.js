import React, { useContext } from 'react'
import { AuthContext } from '~/contexts/AuthContext';
import { Routes, Route } from 'react-router-dom'
import DefaultLayout from '~/Layout/DefaultLayout/DefaultLayout';
import LoadOverlay from '../LoadOverlay';
function ProtectedRoute({ element: Element, ...rest }) {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
    if (authLoading) {
        return (<LoadOverlay loading title="Loading..." />)
    }
    return (
        <Routes >
            <Route {...rest} element={
                isAuthenticated ? (<>
                    <DefaultLayout><Element {...rest}></Element></DefaultLayout>
                </>) : <LoadOverlay btn title='You need to ' />
            }>
            </Route>
        </Routes>
    );
}

export default ProtectedRoute;



