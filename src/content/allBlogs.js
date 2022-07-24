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
const AllBlogs = () => {
    const { postState: { posts, totalPost, pageSize }, getPost, currentPage, setCurrentPage } = useContext(PostContext)
    useEffect(() => {
        getPost(currentPage)
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])
    const onChange = page => {
        setCurrentPage(page);
        window.scrollTo(0, 0)

    };
    let body
    if (posts.length === 0) {
        body = (<LoadOverlay title="No posts have been posted yet" />)
    } else {
        body = (
            <>
                <div className={cx('content-container', 'wide', 'row')}>
                    {posts.map((post, index) => {
                        return (<div href='/#' key={index} className={cx('content-box', 'pc-4', 'tb-6', 'mb-6', 'mb-min-12')}>
                            <SinglePost post={post} />
                        </div>
                        )
                    }
                    )}
                </div>
                <Pagination onChange={onChange}
                    defaultPageSize={pageSize}
                    pageSize={pageSize}
                    current={currentPage}
                    total={totalPost}
                />
            </>
        )
    }

    return (
        <div className={cx('content', 'grid', 'wide')}>{body}</div>
    );
};

export default AllBlogs;
