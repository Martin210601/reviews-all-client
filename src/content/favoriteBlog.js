import classNames from 'classnames/bind';
import styles from './contentCpn.module.scss'
import { PostContext } from '~/contexts/PostContext';
import { useContext, useEffect } from 'react';
import LoadOverlay from '~/Components/LoadOverlay';
import SinglePost from '~/Components/posts/singelPost';
import Pagination from 'rc-pagination';
import '~/GlobalStyles/pagination.less'
import "rc-pagination/assets/index.css";
const cx = classNames.bind(styles);
function Favorite() {
    const { postState: { postLoading, favPost, totalLikePost, pageSize }, getLikePost, currentLikePage, setCurrentLikePage } = useContext(PostContext)
    useEffect(() => {
        getLikePost(currentLikePage)
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [totalLikePost, currentLikePage])
    const onChange = page => {
        setCurrentLikePage(page);
        window.scrollTo(0, document.body.scrollHeight)

    };
    let body
    if (postLoading) { body = (<LoadOverlay loadingOverlay />) }
    else if (favPost.length === 0) {
        body = (<LoadOverlay title="
        You haven't like anything yet" />)
    } else {
        body = (
            <>
                <div className={cx('content-container', 'wide', 'row')}>
                    {favPost.map((post) => (
                        <div key={post._id} className={cx('content-box', 'pc-4', 'tb-6', 'mb-6', 'mb-min-12')}>
                            <SinglePost liked post={post} />
                        </div>
                    ))}
                </div>
                {totalLikePost > 6 && (<Pagination className={cx('pagination')}
                    onChange={onChange}
                    defaultPageSize={pageSize}
                    pageSize={pageSize}
                    current={currentLikePage}
                    total={totalLikePost}
                />)}
            </>
        )
    }
    return (<div className={cx('content', 'col-8')}>
        {body}
    </div>);
}

export default Favorite;