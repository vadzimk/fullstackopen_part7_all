import React from "react";
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {removeBlogAndNotify, updateBlogAndNotify} from "../reducers/blogsReducer.js";

const BlogView = () => {

    const {blogid} = useParams()
    const blog = useSelector(state => state.blogs.find(b => b.id === blogid))
    const dispatch = useDispatch()


    const updateBlog = (blog) => {
        blog.likes += 1
        dispatch(updateBlogAndNotify(blog))
    }



    if (!blog) {
        return null
    }

    return (
        <div>
            <h3>{blog.title}</h3>
            <a href={blog.url}>{blog.url}</a>
            <div><span>likes {blog.likes}</span>
                <button id="likebutton" onClick={() => {
                    updateBlog(blog)
                }}>like
                </button>
            </div>
            <div>Added by {blog.user.name}</div>
        </div>
    )
}

export default BlogView