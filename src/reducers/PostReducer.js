export const postReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'POST_LOADED_SUCCESS':
            return {
                ...state,
                posts: payload.posts,
                postsLoading: false,
                totalPost: payload.totalPost
            }
        case 'POST_LOADED_FAIL':
            return {
                ...state,
                posts: [],
                postsLoading: false,
            }
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, payload]
            }
        case 'SET_POST_LOADING':
            return {
                ...state,
                postLoading: true
            }
        case 'GET_MY_POST_SUCCESS':
            return {
                ...state,
                myPost: payload.myPost,
                postLoading: false,
                totalMyPost: payload.totalMyPost

            }
        case 'GET_POST_DATA_SUCCESS':
            return { ...state, postInfo: payload, postLoading: false }
        case 'DELETE_POST':
            return {
                ...state,
                myPost: state.myPost.filter(post => post._id !== payload)
            }
        case 'FIND_POST':
            return {
                ...state,
                post: payload
            }
        case 'UPDATE_POST':
            const newPost = state.myPost.map((post) => post._id === payload._id ? (payload) : (post))
            return { ...state, myPost: newPost }
        case 'LIKE_POST':
            return {
                ...state,
                favPost: [...state.favPost, payload]
            }

        case 'GET_FAV_POST':
            return { ...state, favPost: payload.favPostLimit, postsLoading: false, totalLikePost: payload.totalFavPost }
        default:
            return state;
    }
}
