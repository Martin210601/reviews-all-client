import Alert from "react-bootstrap/Alert"
import styles from './Auth.module.scss'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles)
function AlertMessage({ info }) {
    return info == null ? null : (<Alert className={cx('alert-css')} variant={info.type}>{info.message}</Alert>);
}
AlertMessage.propTypes = {
    info: PropTypes.string
}
export default AlertMessage;