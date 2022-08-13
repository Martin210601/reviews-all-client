import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect, useContext } from 'react'
import { PostContext } from '~/contexts/PostContext'
import classNames from 'classnames/bind';
import styles from '../createBlog/create.module.scss'
const cx = classNames.bind(styles);
function UpdatePost() {
    //context
    const { postState: { post }, setShowUpdatePost, changePost } = useContext(PostContext)
    // update post 
    const [updatePost, setUpdatePost] = useState(post)
    const { title, description, rate, topic } = updatePost
    const onChangeUpdatePost = (event) => {
        setUpdatePost({ ...updatePost, [event.target.name]: event.target.value })
    }
    const HandleUpdatePost = async (event) => {
        event.preventDefault()
        let formDataUpdate = new FormData();
        if (!updatePost.thumb) {
            formDataUpdate.append('thumb', post.thumb);
        } else {
            formDataUpdate.append('thumb', updatePost.thumb);
        }
        console.log(formDataUpdate)
        formDataUpdate.append('title', updatePost.title);
        formDataUpdate.append('description', updatePost.description);
        formDataUpdate.append('topic', updatePost.topic);
        formDataUpdate.append('rate', updatePost.rate);
        updatePost.uploadedImages.forEach((file) => {
            formDataUpdate.append('uploadedImages', file);
        })
        try {

            await changePost(formDataUpdate, updatePost._id)

        } catch (error) {
            console.log(error)
        }
    }

    /// PREVIEW IMAGE
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!file) {
            setPreview(undefined)

            return
        }
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
        setUpdatePost({ ...updatePost, thumb: file })
        console.log(updatePost)
        // free memory when ever this component is unmounted
        return () => {
            URL.revokeObjectURL(objectUrl)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file])

    const onFileChange = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setFile(undefined)
            return
        }
        setFile(e.target.files[0])
    }
    const onMultipleFileChange = async (e) => {
        const image = e.target.files
        setUpdatePost({ ...updatePost, uploadedImages: Array.from(image) })
        console.log(Array.from(image))
    }


    return (
        <div className={cx('update-overlay')}>
            <div className={cx('header-create')}>
                <p className={cx('header-text')}>Update</p>
            </div>
            <button onClick={e => setShowUpdatePost(false)} className={cx('show-off')}>
                <FontAwesomeIcon className={cx('show-off-icon')} icon={faXmark} />
            </button>
            <form className={cx('container')} type="multipart/form-data" onSubmit={HandleUpdatePost}  >
                <div className={cx('file-container')}>
                    <div className={cx('file-upload')}>
                        {post.thumb ? (
                            <img className={cx('img-preview')} src={preview || `${post.thumb}`} alt='thumb' />

                        ) : (
                            <img className={cx('img-preview')} src={preview || `/assets/img/logo3.png`} alt='thumb' />

                        )}
                        <input type="file" id="file" name='thumb' onChange={onFileChange} ></input>
                        <label htmlFor="file" className={cx('upload-icon')}>
                            <FontAwesomeIcon icon={faPlus} />
                        </label>
                    </div>
                    <div className={cx('file-image')}>
                        <label htmlFor="uploadedImages" className={cx('files')}>
                            <FontAwesomeIcon icon={faPlus} />Update More Images
                        </label>
                        <input type="file" id="uploadedImages" className={cx('uploaded-images')} name='uploadedImages' onChange={onMultipleFileChange} multiple></input>
                    </div>
                </div>
                <div className={cx('content-upload')}>
                    <input type="text" name='title' placeholder='Title' maxLength='18' minLength='6' onChange={onChangeUpdatePost} value={title} required />
                    <textarea spellCheck="false" type="text" value={description} name='description' onChange={onChangeUpdatePost} placeholder='Description' required style={{ height: '200px' }} />
                    <div className={cx('rate-and-select')}>
                        <div className={cx('rate-box')}>
                            <p className={cx('text-rate')}>Rate (max : 10 ) :</p>
                            <input value={rate} onChange={onChangeUpdatePost} className={cx('rate')} type='number' name='rate' min='1' max='10' required />
                            <FontAwesomeIcon className={cx('rate-icon')} icon={faStar} />
                        </div>
                        <div className={cx('select-box')}>
                            <label htmlFor="topic" className={cx('text-select')}>Topic :</label>
                            <select className={cx('select-topic')} onChange={onChangeUpdatePost} value={topic} name='topic' id="topic">
                                <option value="TRAVEL">TRAVEL</option>
                                <option value="FOOD">FOOD</option>
                            </select>
                        </div>
                    </div>
                    <button type='submit' onClick={() => window.location.reload(false)} className={cx('btn-submit')} >Update</button>
                </div>

            </form>
        </div>
    );
}

export default UpdatePost