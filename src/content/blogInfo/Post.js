import { PostContext } from "~/contexts/PostContext";
import { useContext, useEffect } from "react";
import { useNavigate, } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './post.module.scss'
import ImagesSlider from "~/Components/imagesSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles)
function Post() {
    let navigate = useNavigate();
    const { postState: { postInfo, postLoading }, } = useContext(PostContext)
    useEffect(() => {
    }, [postLoading])
    let body
    if (postInfo !== null) {
        var { title, views, description, like, rate, thumb, uploadedImages, topic, } = postInfo
        const images = [thumb, ...uploadedImages]
        body = (
            <div className={cx('post-container')}>
                <div className={cx('header-title')}>
                    {title}
                </div>
                <div className={cx('container')}>
                    <div className={cx('header-images')}>
                        {images.length >= 1 && images !== [''] && images !== '' ? (<ImagesSlider images={images} />) : (
                            <img src={`/assets/img/logo1.png`} alt='thumb' className={cx('images')}></img>
                        )}
                    </div>

                    <div className={cx('header-body')}>
                        <div className={cx('body-info')}>
                            <div className={cx('like-rate')}>
                                <div className={cx('like')}>Like: {like.length}
                                    <FontAwesomeIcon className={cx('body-icon')} icon={faHeart} />
                                </div>
                                <div className={cx('rate')}>Rate: {rate}
                                    <FontAwesomeIcon className={cx('body-icon')} icon={faStar}></FontAwesomeIcon>
                                </div>
                            </div>
                            <div className={cx('status-views')}>
                                <div className={cx('status')}>Topic :{topic}</div>
                                <div className={cx('views')}>Views: {views}</div>
                            </div>
                        </div>
                        <div className={cx('description')}>
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        )

    } else {
        navigate('/#')
    }

    return (<div className={cx('container-post')}>
        <button onClick={e => navigate(-1)} className={cx('icon-back')}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {body}
    </div>);
}

export default Post;
