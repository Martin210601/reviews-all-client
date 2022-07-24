import styles from './loadOverlay.module.scss'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function LoadOverlay({ title, btn, loading }) {
    const navigate = useNavigate()
    return (

        <div className={cx('nav-overlay')}>
            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
            <span className={cx('text-overlay')}>{title} </span>
            {btn && (<button className={cx('btn')} onClick={() => navigate('/auth')}>Login</button>)}
        </div>
    );
}
LoadOverlay.propTypes = {
    title: PropTypes.string,
    btn: PropTypes.bool,
    loading: PropTypes.bool,
}
export default LoadOverlay;

