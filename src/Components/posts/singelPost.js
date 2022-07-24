import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPen, faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import styles from './singelPost.module.scss'
import classNames from 'classnames/bind';
import { AuthContext } from '~/contexts/AuthContext';
import { PostContext } from '~/contexts/PostContext';
const cx = classNames.bind(styles);
function SinglePost({ post, privated, liked }) {
    const { authState: { isAuthenticated, userInfo } } = useContext(AuthContext)
    const { postState: { favPost }, deletePost, findPost, setShowUpdatePost, likePost, getPostInfo } = useContext(PostContext)
    const { title, thumb, description, rate, user, _id, slug } = post
    const [likeCount, setLikeCount] = useState(post.like.length)
    const [likeIcon, setLikeIcon] = useState(liked ? true : false)
    useEffect(() => {
        const isLiked = favPost.some((obj) => {
            return obj._id === post._id
        })
        if (isLiked || (post.like.includes(userInfo._id) && isAuthenticated)) {
            setLikeIcon(true)
            if (likeCount === 0) {
                setLikeCount(likeCount + 1)
            }
        } else {
            setLikeIcon(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [post._id])
    const onChangeIcon = (postId) => {
        if (isAuthenticated) {
            setLikeIcon(!likeIcon)
            if (likeIcon === true) {
                setLikeCount(likeCount - 1)
                likePost(postId)
            } else {
                setLikeCount(likeCount + 1)
                likePost(postId)
            }

        } else {
            alert("Please login to like this post")
        }
    }
    const handleUpdate = (postId) => {
        findPost(postId)
        setShowUpdatePost(true)
    }
    return (
        <div className={cx('post-box')}>
            {privated && (
                <div className={cx('Fix-Delete')} >
                    <FontAwesomeIcon onClick={deletePost.bind(this, _id)} className={cx('Delete-icon')} icon={faTrashCan} />
                    <FontAwesomeIcon onClick={handleUpdate.bind(this, _id)} className={cx('Fix-icon')} icon={faPen} />
                </div>
            )}
            <div className={cx('box-img')}>{
                post.thumb === '' ? (<img className={cx('img')} src='/assets/img/logo3.png' alt="thumb " />) :
                    <img className={cx('img')} src={thumb} alt="thumb " />
            }
            </div>
            <div className={cx('box-body')}>
                <div className={cx('box-body-header')}>
                    <Link to={`/blog/${slug}`} onClick={async (e) => await getPostInfo(slug)} className={cx('body-title')}>{title}</Link>
                    <span className={cx('like-icon')} onClick={onChangeIcon.bind(this, _id)}>
                        <p className={cx('text-like')}>{likeCount}</p>{
                            likeIcon ? (<FontAwesomeIcon className={cx('icon-like', 'actived')} icon={faHeart} />) :
                                <FontAwesomeIcon className={cx('icon-like')} icon={faHeart} />
                        }
                    </span>
                </div>
                <p className={cx('box-body-desc')}>{description}</p>
                <div className={cx('box-body-footer')}>
                    <div className={cx('box-body-footer-rate')}>RATE : {rate}/10 <FontAwesomeIcon className={cx('icon-rate')} icon={faStar} /></div>
                    <a href="/#" className={cx('box-body-footer-user')}>@{user.username}</a>
                </div>
            </div>
        </div>
    );
}
SinglePost.propsTypes = {
    post: PropTypes.node.isRequired,
    privated: PropTypes.string,
    liked: PropTypes.bool
}

export default SinglePost;