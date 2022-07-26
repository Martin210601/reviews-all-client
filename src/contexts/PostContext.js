import { createContext, useReducer, useState } from "react";
import { postReducer } from '~/reducers/PostReducer'
import { apiUrl } from "./constants";
import axios from "axios";
import { useEffect } from "react";


export const PostContext = createContext()

const PostContextProvider = ({ children }) => {

    const [postState, dispatch] = useReducer(postReducer, {
        postInfo: null,
        post: null,
        posts: [],
        postLoading: true,
        myPost: [],
        favPost: [],
        totalPost: 0,
        totalMyPost: 0,
        totalLikePost: 0,
        pageSize: 6

    })

    // action show modal
    const [showUpdatePost, setShowUpdatePost] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const [currentMyPage, setCurrentMyPage] = useState(1)
    const [currentLikePage, setCurrentLikePage] = useState(1)



    // GET ALL POST
    const getPost = async (pageNumber) => {
        try {
            const response = await axios.get(`${apiUrl}/news/all?page=${pageNumber || 1}`)
            if (response.data.success) {
                dispatch({ type: 'POST_LOADED_SUCCESS', payload: response.data })
            } else {
                dispatch({ type: 'POST_LOADED_FAIL' })
            }
        } catch (error) {
            dispatch({ type: 'POST_LOADED_FAIL' })
        }
    }

    // GET My Post

    const getMyPost = async (pageNumber) => {
        try {
            const response = await axios.get(`${apiUrl}/post/profile?page=${pageNumber || 1}`)
            if (response.data.success) {
                dispatch({ type: 'GET_MY_POST_SUCCESS', payload: response.data })
            }
            else {
                dispatch({ type: 'POST_LOADED_FAIL' })
            }
        } catch (error) {
            dispatch({ type: 'POST_LOADED_FAIL' })
        }
    }

    const getPostInfo = async (slug) => {
        dispatch({ type: 'SET_POST_LOADING' })
        try {
            const response = await axios.get(`${apiUrl}/post/${slug}`)
            if (response.data.success) {
                dispatch({ type: 'GET_POST_DATA_SUCCESS', payload: response.data.postInfo })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // ADD new post

    const createPost = async (formData) => {
        dispatch({ type: "SET_POST_LOADING" })
        try {
            const response = await axios.post(`${apiUrl}/post/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if (response.data.success) {
                dispatch({ type: "ADD_POST", payload: response.data.newPost })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'server error' }
        }
    }

    /// Delete post 
    const deletePost = async (_id) => {
        try {
            const response = await axios.delete(`${apiUrl}/post/delete/${_id}`)
            if (response.data.success) {
                dispatch({ type: 'DELETE_POST', payload: _id })
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Find post when user want update post
    const findPost = (postId) => {
        const post = postState.myPost.find(post => post._id === postId)
        dispatch({ type: 'FIND_POST', payload: post })

    }

    // LIKE post 
    const likePost = async (postId) => {
        try {
            const response = await axios.put(`${apiUrl}/post/${postId}/like`, postId)
            if (response.data.success) {
                dispatch({ type: 'LIKE_POST', payload: response.data.post })
                return response.data.post
            }
        } catch (error) {
            console.log(error)
        }
    }
    // GET LIKE post data

    const getLikePost = async (pageNumber) => {
        try {
            const response = await axios.get(`${apiUrl}/post/favorite?page=${pageNumber}`)
            if (response.data.success) {
                dispatch({ type: 'GET_FAV_POST', payload: response.data })
            }
        } catch (error) {
            console.log(error)
        }

    }


    // UPDATE POST request

    const changePost = async (formDataUpdate, updatePostID) => {
        try {
            const response = await axios.put(`${apiUrl}/post/update/${updatePostID}`, formDataUpdate, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if (response.data.success) {
                dispatch({ type: 'UPDATE_POST', payload: response.data.post })
                return response.data.post
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getPost()
        getMyPost()
    }, [])

    /// POST DATA 
    const PostContextData = {
        postState,
        getPostInfo,
        getPost,
        likePost,
        getLikePost,
        createPost,
        getMyPost,
        deletePost,
        findPost,
        changePost,
        showUpdatePost,
        setShowUpdatePost,
        currentPage,
        setCurrentPage,
        currentMyPage,
        setCurrentMyPage,
        currentLikePage,
        setCurrentLikePage,
    }

    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider