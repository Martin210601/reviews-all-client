import classNames from 'classnames/bind';
import styles from './contentCpn.module.scss'
import { PostContext } from '~/contexts/PostContext';
import { useContext, useEffect } from 'react';
import Pagination from 'rc-pagination';
import '~/GlobalStyles/pagination.less'
import "rc-pagination/assets/index.css";
import UpdatePost from '~/content/updateBlog/updatePost'
import LoadOverlay from '~/Components/LoadOverlay';
import SinglePost from '~/Components/posts/singelPost';
const cx = classNames.bind(styles);
const MyBlogs = () => {
    const { postState: { post, myPost, totalMyPost, postLoading, pageSize }, getMyPost, currentMyPage, setCurrentMyPage, showUpdatePost, } = useContext(PostContext)
    useEffect(() => {
        getMyPost(currentMyPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMyPage, totalMyPost])
    const onChange = page => {
        setCurrentMyPage(page);
    };
    let body
    if (postLoading) { body = (<LoadOverlay loadingOverlay />) }
    else if (myPost.length === 0 && currentMyPage > 1) {
        setCurrentMyPage(currentMyPage - 1)
    }
    else if (myPost.length === 0 && currentMyPage === 1) {
        body = (<LoadOverlay title="
        You haven't posted anything yet" />)
    } else {
        body = (
            <>
                <div className={cx('content-container', 'wide', 'row')}>

                    {myPost.map((post) => (
                        <div key={post._id} className={cx('content-box', 'pc-4', 'tb-6', 'mb-6', 'mb-min-12')}>
                            <SinglePost privated post={post} />
                        </div>
                    ))
                    }
                </div>
                <Pagination onChange={onChange}
                    defaultPageSize={pageSize}
                    pageSize={pageSize}
                    current={currentMyPage}
                    total={totalMyPost}
                />
            </>
        )
    }
    return (<div className={cx('content', 'col-8')}>
        {showUpdatePost && post !== null ? <UpdatePost /> : body}

    </div>)
};

export default MyBlogs;
