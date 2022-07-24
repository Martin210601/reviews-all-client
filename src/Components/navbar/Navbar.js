import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '~/contexts/AuthContext';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './navbar.module.scss'
import Search from './search'
const cx = classNames.bind(styles);
const Navbar = () => {
    const { authState: { isAuthenticated } } = useContext(AuthContext)
    const { logoutUser } = useContext(AuthContext)
    const [navbarMenu, setNavbarMenu] = useState(isAuthenticated)
    useEffect(() => {
        setNavbarMenu(!!isAuthenticated)
    }, [isAuthenticated])
    const logout = () => logoutUser()
    return (
        <div className={cx('navbar')}>
            <a href='/' className={cx('navbar-logo')}>
                <img className={cx('navbar-img')} src='/assets/img/logo3.png' alt='logo'></img>
            </a>
            <div className={cx('navbar-search')}>
                <Search></Search>
            </div>
            {navbarMenu === true
                ? (<a href='/' className={cx('text-logout')}><button onClick={logout} className={cx('navbar-logout')}>Logout</button></a>)

                : (<Link to='/Auth' className={cx('navbar-login')}> Login</Link>)}
        </div>
    )
}

export default Navbar