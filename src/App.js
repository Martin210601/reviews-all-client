import { Routes, Route } from 'react-router-dom';
import React from 'react'
import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './Layout/DefaultLayout/DefaultLayout';
import AuthContextProvider from './contexts/AuthContext';
import ProtectedRoute from './Components/routing/ProtectedRoute';
import PostContextProvider from './contexts/PostContext';
function App() {
    return (
        <PostContextProvider>
            <AuthContextProvider>
                < div className="App" >
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Layout = route.layout || DefaultLayout;
                            const Page = route.component
                            return (
                                <Route path={route.path} key={route.id} element={
                                    <Layout >
                                        <Page />
                                    </Layout>}>
                                </Route>)
                        })}
                    </Routes>
                    {
                        privateRoutes.map((route, index) => {
                            const Page = route.component
                            return (<ProtectedRoute path={route.path} key={route.id} element={Page}>
                            </ProtectedRoute>)
                        })
                    }
                </ div>
            </AuthContextProvider >
        </PostContextProvider>
    );
}

export default App;
