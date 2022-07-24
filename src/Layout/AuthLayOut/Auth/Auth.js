import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import { Navigate } from 'react-router-dom'
import styles from './Auth.module.scss';
import Register from './register';
import Login from './login';
import classNames from 'classnames/bind';
import LoadOverlay from '~/Components/LoadOverlay';
const cx = classNames.bind(styles)
const Auth = () => {
    // animation state
    const [addClass, setAddClass] = useState('')
    //context
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)

    // Navigate
    let body
    if (authLoading) {
        body = (<LoadOverlay loadingOverlay />)
    } else if (isAuthenticated) {
        return <Navigate to="/myblogs"></Navigate>
    }
    else {

        body = (
            <>
                <div className={cx('form-container', 'sign-in-container')}>
                    <Login></Login>
                </div>
                <div className={cx('form-container', 'sign-up-container')}>
                    <Register></Register>
                </div>
            </>
        )
    }

    return (
        <div className={cx('container', `${addClass}`)}>
            {body}
            <div className={cx('overlay-container')}>
                <div className={cx('overlay')}>
                    <div className={cx('overlay-panel', 'overlay-left')}>
                        <div className={cx('text-auth')}>Already Have an Account ?</div>
                        <button className={cx('ghost', 'button')} id="signIn" onClick={() => setAddClass('')}>
                            Sign In
                        </button>
                    </div>
                    <div className={cx('overlay-panel', 'overlay-right')}>
                        <div className={cx('text-auth')}>Don't Have an Account ?</div>
                        <button className={cx('ghost', 'button')} id='signUp' onClick={() => setAddClass('right-panel-active')}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>

        </div>)
}

export default Auth;
