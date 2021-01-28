// action creator
import blogService from "../services/blogs.js";
import {setNotification} from "./notificationReducer.js";


export const initBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            blogs
        })
    }
}

export const addBlog = (blog) => {
    return async (dispatch) => {
        const addedBlog = await blogService.createBlog(blog)
        dispatch({
            type: 'ADD_BLOG',
            blog: addedBlog
        })
    }
}

export const addBlogAndNotify = (blog) => {
    return async (dispatch, getState) => {
        dispatch(addBlog(blog)).then(() => {
            const createdBlog = getState().blogs.find(b => b.title === blog.title)
            if (createdBlog) {
                dispatch(setNotification({message: `Created: ${blog.title}`, isError: false}))
            } else {
                dispatch(setNotification({message: `error, not created ${blog.title}`, isError: true}))
            }
        })

    }
}

const removeBlog=(blog)=>{
    return (dispatch)=>{
        dispatch({
            type: 'REMOVE_BLOG',
            blog
        })
    }
}


export const removeBlogAndNotify = (blog) => {
    return async (dispatch) => {
        const res = await blogService.removeBlog(blog)
        if (res.status === 204) {
            dispatch(removeBlog(blog))
            // bc previous removeBlog is synchronous it doesnt return a promise, so we don't need then here
            dispatch(setNotification({message: `Deleted: ${blog.title}`, isError: false}))
        } else {
            dispatch(setNotification({message: `Error status: ${res.status}`}))
        }
    }
}


const updateBlog = (blog)=>{
    return (dispatch)=> {
        dispatch({
            type: 'UPDATE_BLOG',
            blog
        })
    }
}
export const updateBlogAndNotify = (blog)=>{
    return async (dispatch)=>{
        const res = await blogService.updateBlog(blog)

        if (res.status === 200){
            dispatch(updateBlog(blog))
            dispatch(setNotification({message: `Updated ${blog.title}`, isError: false}))
        } else {
            dispatch(setNotification({message: `Error status: ${res.status}`, isError: true}))
        }
    }
}


//reducer
const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.blogs
        case 'ADD_BLOG':
            return state.concat(action.blog)
        case 'REMOVE_BLOG':
            return state.filter(b => b !== action.blog)
        case 'UPDATE_BLOG':
            return state.map(b => b.id === action.blog.id ? action.blog : b)
        default:
            return state
    }
}


export default blogsReducer