export const postReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'POST_LOADED_SUCCESS':
            return {
                ...state,
                posts: payload.posts,
                postLoading: false,
                totalPost: payload.totalPost
            }
        case 'POST_LOADED_FAIL':
            return {
                ...state,
                posts: [],
                postLoading: false,
            }
        case 'ADD_POST':
            return {
                ...state,
                postLoading: false,
                posts: [...state.posts, payload]
            }
        case 'SEARCH_POST_SUCCESS':
            return {
                ...state,
                postLoading: false,
                searchPost: payload.result,
                totalSearchPost: payload.totalSearchMatch
            }
        case 'POST_SEARCH_FAIL':
            return {
                ...state,
                postLoading: false,
                searchPost: [],
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
            return { ...state, favPost: payload.favPostLimit, postLoading: false, totalLikePost: payload.totalFavPost }
        default:
            return state;
    }
}

