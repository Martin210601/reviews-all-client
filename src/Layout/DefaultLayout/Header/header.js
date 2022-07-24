import React from 'react';
import Navbar from '~/Components/navbar/Navbar'
import classNames from 'classnames/bind';
import styles from './header.module.scss';

const cx = classNames.bind(styles)

const Header = () => {
    return (
        <div className={cx('header', 'grid', 'wide')}>
            <Navbar />
        </div>
    );
};

export default Header;
