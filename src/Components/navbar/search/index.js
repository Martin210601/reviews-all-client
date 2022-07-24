import styles from './search.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Search() {
    return (<div className={cx('search-container')}>
        <input spellCheck="false" className={cx('search-input')} placeholder="Search" type="text" ></input>
        <button className={cx('submit-btn')}>
            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
        </button>
    </div>);
}

export default Search;