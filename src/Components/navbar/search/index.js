import styles from './search.module.scss'
import classNames from 'classnames/bind';
import { useNavigate } from "react-router-dom";
import { PostContext } from '~/contexts/PostContext';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Search() {
    const navigate = useNavigate()
    const { getSearchPost, currentSearchPage } = useContext(PostContext)
    const [keyword, setKeyword] = useState('')
    const [displayBtn, setDisplayBtn] = useState(true)
    useEffect(() => {
        getSearchPost(keyword, currentSearchPage)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSearchPage])
    const onSearchChange = (event) => {
        setKeyword(event.target.value)
        event.target.value.length > 0 ? setDisplayBtn(false) : setDisplayBtn(true)
    }
    const onSubmitSearch = () => {
        getSearchPost(keyword, 1)
        navigate('/search')
    }
    return (<div className={cx('search-container')}>
        <input onChange={onSearchChange} value={keyword} spellCheck="false" className={cx('search-input')} placeholder="Search" type="text" ></input>
        <button disabled={displayBtn} onClick={onSubmitSearch} className={cx('submit-btn')}>
            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
        </button>
    </div>);
}

export default Search;