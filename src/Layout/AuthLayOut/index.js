import Auth from "./Auth/Auth";
import { Link } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AuthLayout.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function AuthLayout() {
    return (<div className={cx('auth-layout')}>
        <Link to=".." className={cx('icon-back')}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <p className={cx('text-back')}> Go To Home</p>
        </Link>
        <Auth></Auth>
    </div>);
}

export default AuthLayout;