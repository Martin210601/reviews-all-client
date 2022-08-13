import styles from './contentCpn.module.scss'
import classNames from 'classnames/bind';
import { PostContext } from '~/contexts/PostContext';
import { useContext, useEffect } from 'react';
import Pagination from 'rc-pagination';
import '~/GlobalStyles/pagination.less'
import "rc-pagination/assets/index.css";
import LoadOverlay from '~/Components/LoadOverlay';
import SinglePost from '~/Components/posts/singelPost';
const cx = classNames.bind(styles);
const SearchBlog = () => {
    const { postState: { searchPost, totalSearchPost, pageSize }, currentSearchPage, setCurrentSearchPage } = useContext(PostContext)
    useEffect(() => {
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSearchPage])
    const onChange = page => {
        setCurrentSearchPage(page);
        window.scrollTo(0, 0)
    };
    let body
    if (searchPost.length === 0) {
        body = (<LoadOverlay title="No result matched" />)
    } else {
        body = (
            <>
                <div className={cx('content-container', 'wide', 'row')}>
                    {searchPost.map((post, index) => {
                        return (<div href='/#' key={index} className={cx('content-box', 'pc-4', 'tb-6', 'mb-6', 'mb-min-12')}>
                            <SinglePost post={post} />
                        </div>
                        )
                    }
                    )}
                </div>
                {totalSearchPost > 6 && (<Pagination className={cx('pagination')} onChange={onChange}
                    defaultPageSize={pageSize}
                    pageSize={pageSize}
                    current={currentSearchPage}
                    total={totalSearchPost}
                />)}
            </>
        )
    }
    return (
        <div className={cx('content', 'grid', 'wide')}>{body}</div>
    );
};
export default SearchBlog;
