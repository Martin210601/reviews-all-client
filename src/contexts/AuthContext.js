import { createContext, useReducer, } from "react";
import axios from "axios";
import { authReducer } from "~/reducers/AuthReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from '~/utils/setAuthToken'
import { useEffect } from "react";
// import { postReducer } from '~/reducers/PostReducer'
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        userInfo: { id: Math.random(), name: 'computer' },
    })

    const checkUserLogin = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if (response.data.success) {
                dispatch({
                    type: 'SET AUTH',
                    payload: { isAuthenticated: true, user: response.data.user }
                })
            } else {
                dispatch({ type: 'SET AUTH FAIL', payload: { isAuthenticated: false } })

            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({ type: 'SET AUTH FAIL', payload: { isAuthenticated: false } })
        }
    }


    useEffect(() => {
        checkUserLogin()
    }, [])


    //login

    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            }
            await checkUserLogin()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }


    //register user
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            }
            await checkUserLogin()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }

    //logoutUser
    const logoutUser = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        await dispatch({ ...this.state, type: 'SET AUTH', payload: { isAuthenticated: false, user: { _id: Math.random(), name: 'computer' } } })
        // await checkUserLogin()
    }

    useEffect(() => {
        checkUserLogin()
    }, [])


    //Context data
    const AuthContextData = { loginUser, authState, registerUser, logoutUser, checkUserLogin }
    return (
        <AuthContext.Provider value={AuthContextData}>{children}</AuthContext.Provider>
    )
}
export default AuthContextProvider
