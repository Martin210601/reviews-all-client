import styles from './create.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { PostContext } from '~/contexts/PostContext'
const cx = classNames.bind(styles)
function CreateBlog() {
    // Create new POST
    const navigate = useNavigate()
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        thumb: '',
        rate: '',
        uploadedImages: [],
        topic: 'TRAVEL',
    })
    const { title, description, rate, topic, } = newPost
    const onChangeNewPost = (event) => {
        setNewPost({ ...newPost, [event.target.name]: event.target.value })
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
        setNewPost({ ...newPost, thumb: file })

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
    //Context 
    const { createPost, getPost } = useContext(PostContext)
    /// Submit Create new Post

    const onSubmit = async (event) => {
        event.preventDefault()
        let formData = new FormData();
        formData.append('title', newPost.title);
        formData.append('description', newPost.description);
        formData.append('thumb', newPost.thumb);
        formData.append('topic', newPost.topic);
        formData.append('rate', newPost.rate);
        newPost.uploadedImages.forEach((file) => {
            formData.append('uploadedImages', file);
        })
        try {
            const { success } = await createPost(formData)
            if (success) {
                getPost()
                navigate('/myBlogs')
            }
        } catch (error) {
            alert('You have not entered enough information')
            console.log(error)
        }
    }
    // multiple file
    const onMultipleFileChange = async (e) => {
        const image = e.target.files
        setNewPost({ ...newPost, uploadedImages: Array.from(image) })
    }
    return (
        <>
            <div className={cx('header-create')}>
                <p className={cx('header-text')}>New Blog</p>
            </div>
            <form className={cx('container')} type="multipart/form-data" onSubmit={onSubmit} >
                <div className={cx('file-container')}>
                    <div className={cx('file-upload')}>
                        <img className={cx('img-preview')} src={preview || '/assets/img/logo3.png'} alt='logo' />
                        <input type="file" id="file" name='thumb' onChange={onFileChange}></input>
                        <label htmlFor="file" className={cx('upload-icon')}>
                            <FontAwesomeIcon icon={faPlus} />
                        </label>
                    </div>
                    <div className={cx('file-image')}>
                        <label htmlFor="uploadedImages" className={cx('files')}>
                            <FontAwesomeIcon icon={faPlus} />More Images
                        </label>
                        <input type="file" id="uploadedImages" className={cx('uploaded-images')} name='uploadedImages' onChange={onMultipleFileChange} multiple></input>
                    </div>
                </div>
                <div className={cx('content-upload')}>
                    <input type="text" name='title' placeholder='Title' maxLength='18' minLength='6' onChange={onChangeNewPost} value={title} required />
                    <textarea className={cx('content-upload-des')} spellCheck='false' type="text" value={description} name='description' onChange={onChangeNewPost} placeholder='Description' required style={{ height: '200px' }} />
                    <div className={cx('rate-and-select')}>
                        <div className={cx('rate-box')}>
                            <p className={cx('text-rate')}>Rate (max : 10 ) :</p>
                            <input value={rate} onChange={onChangeNewPost} className={cx('rate')} type='number' name='rate' min='1' max='10' required />
                            <FontAwesomeIcon className={cx('rate-icon')} icon={faStar} />
                        </div>
                        <div className={cx('select-box')}>
                            <label htmlFor="topic" className={cx('text-select')}>Topic :</label>
                            <select className={cx('select-topic')} onChange={onChangeNewPost} value={topic} name='topic' id="topic">
                                <option value="TRAVEL">TRAVEL</option>
                                <option value="FOOD">FOOD</option>
                            </select>
                        </div>
                    </div>
                    <button type='submit' className={cx('btn-submit')} >Create</button>
                </div>
            </form>
        </>);
}

export default CreateBlog;