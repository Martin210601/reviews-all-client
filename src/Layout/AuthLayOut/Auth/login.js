import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import styles from './Auth.module.scss';
import AlertMessage from './AlertMessage';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)

function Login() {
    //Context
    const { loginUser } = useContext(AuthContext)
    //local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })

    /// state
    const { username, password } = loginForm
    const onChangeLoginForm = (event) => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    }
    const [alert, setAlert] = useState(null)
    // call api
    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                // navigation('/myblogs')
            } else {
                setAlert({ type: "danger", message: loginData.message })
                setTimeout(() => setAlert(null), 1000)
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form className={cx('form')} onSubmit={login}>
            <AlertMessage info={alert} />
            <h1 className={cx('text')}>Sign In</h1>
            <input className={cx('input')} type="text" value={username} onChange={onChangeLoginForm} name="username" placeholder='Username' required></input>
            <input className={cx('input')} type="password" value={password} onChange={onChangeLoginForm} name="password" placeholder='Password' required></input>
            <button className={cx('button')} type="submit">Login</button>
        </form>
    );
}

export default Login;