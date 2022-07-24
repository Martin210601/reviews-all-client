import Header from "./Header/header";
import SideBar from './sideBar/sideBar'
import styles from './DefaultLayout.module.scss'
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import React from 'react'
const cx = classNames.bind(styles)
function DefaultLayout({ children }) {
    return (
        <>
            <div className={cx('header-wrapper')}>
                <Header />
            </div>
            <div className={cx('container', 'grid', 'wide')}>
                <div className={cx('sideBar', 'pc-3', 'tb-3')}><SideBar></SideBar></div>
                <div className={cx('content', 'pc-9', 'tb-9', 'mb-12')}>{children}</div>
            </div>
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}
export default DefaultLayout;