import Auth from '~/Layout/AuthLayOut/Auth/Auth';
import MyBlogs from '~/content/myBlogs';
import Favorite from '~/content/favoriteBlog';
import AllBlogs from '~/content/allBlogs';
import CreateBlog from '~/content/createBlog/createBlog';
import AuthLayout from '~/Layout/AuthLayOut';
import Post from '~/content/blogInfo/Post'
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
]
const privateRoutes = [
    {
        id: 3, path: '/myBlogs', component: MyBlogs
    },
    {
        id: 4, path: '/create', component: CreateBlog
    },
    {
        id: 5, path: 'favorite', component: Favorite
    }

]

export { publicRoutes, privateRoutes }