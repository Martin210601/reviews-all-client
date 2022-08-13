import Auth from '~/Layout/AuthLayOut/Auth/Auth';
import MyBlogs from '~/content/myBlogs';
import Favorite from '~/content/favoriteBlog';
import AllBlogs from '~/content/allBlogs';
import CreateBlog from '~/content/createBlog/createBlog';
import AuthLayout from '~/Layout/AuthLayOut';
import Post from '~/content/blogInfo/Post'
import SearchPost from '~/content/searchBlog'
const publicRoutes = [
    {
        id: 1, path: '/', component: AllBlogs
    },
    {
        id: 2, path: '/auth', component: Auth, layout: AuthLayout
    },
    {
        id: 3, path: '/blog/:slug', component: Post,
    },
    {
        id: 4, path: '/search', component: SearchPost,
    },
]
const privateRoutes = [
    {
        id: 5, path: '/myBlogs', component: MyBlogs
    },
    {
        id: 6, path: '/create', component: CreateBlog
    },
    {
        id: 7, path: 'favorite', component: Favorite
    }

]

export { publicRoutes, privateRoutes }