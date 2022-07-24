import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import AlertMessage from './AlertMessage';

const cx = classNames.bind(styles)

function Register() {
    //Context
    const { registerUser } = useContext(AuthContext)
    //local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
    })
    /// state
    const { username, password, passwordConfirm } = registerForm
    const onChangeRegisterForm = (event) => {
        setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })
    }
    const [alert, setAlert] = useState(null)
    // call api
    const register = async event => {
        event.preventDefault()
        if (password !== passwordConfirm) {
            setAlert({ type: "danger", message: "Password do not match" })
            setTimeout(() => setAlert(null), 3000)
        } else {
            try {
                const registerData = await registerUser(registerForm)
                if (!registerData.success) {
                    setAlert({ type: "danger", message: registerData.message })
                    setTimeout(() => setAlert(null), 3000)
                }

            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <form className={cx('form')} onSubmit={register}>
            <AlertMessage info={alert} />
            <h1 className={cx('text')}>Sign Up</h1>
            <input className={cx('input')} minLength="6" maxLength="12" type="text" value={username} onChange={onChangeRegisterForm} name="username" placeholder='Username' required></input>
            <input className={cx('input')} minLength="6" maxLength="12" type="password" value={password} onChange={onChangeRegisterForm} name="password" placeholder='Password' required></input>
            <input className={cx('input')} minLength="6" maxLength="12" type="password" value={passwordConfirm} onChange={onChangeRegisterForm} name="passwordConfirm" placeholder='Confirm Password' required></input>
            <button className={cx('button')} type="submit">Register</button>
        </form>
    );
}

export default Register;