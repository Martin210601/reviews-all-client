import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './imagesSlider.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles)
function ImagesSlider({ images }) {
    const [current, setCurrent] = useState(0)
    const length = images.length
    const nextSlice = () => {
        setCurrent(current === (length - 1) ? 0 : current + 1)

    }
    const prevSlice = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }
    let body
    if (length === 1 && images[0] === '') {
        body = (<img src='/assets/img/logo3.png' alt="thumb" className={cx('slider-image-default')}></img>)
    }
    else if (length === 1 && images[0] !== '') {
        body = (<img src={images[0]} alt="thumb" className={cx('slider-image')}></img>)
    } else if (length > 1 && images[0] === '') {
        images.shift();
        body = (
            <div className={cx('slider-box-images')}>
                <FontAwesomeIcon icon={faArrowLeft} className={cx('prev-icon')} onClick={prevSlice} />
                <FontAwesomeIcon icon={faArrowRight} className={cx('next-icon')} onClick={nextSlice} />
                {images.map((image, index) => {
                    return (
                        <div key={index} className={index === current ? cx('slide-active') : cx('slide')}>
                            {index === current && (<img className={cx('image')} src={image} alt='img'></img>)}
                        </div>
                    )
                })}
            </div>
        )
    } else {
        body = (
            <div className={cx('slider-box-images')}>
                <FontAwesomeIcon icon={faArrowLeft} className={cx('prev-icon')} onClick={prevSlice} />
                <FontAwesomeIcon icon={faArrowRight} className={cx('next-icon')} onClick={nextSlice} />
                {images.map((image, index) => {
                    return (
                        <div key={index} className={index === current ? cx('slide-active') : cx('slide')}>
                            {index === current && (<img className={cx('image')} src={image} alt='img'></img>)}
                        </div>
                    )
                })}
            </div>
        )
    }
    return (
        <section className={cx('slider')}>
            {body}
        </section>
    );
}
ImagesSlider.propTypes = {
    images: PropTypes.array
}
export default ImagesSlider;