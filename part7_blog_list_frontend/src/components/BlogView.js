import React, {useState} from "react";
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {updateBlogAndNotify} from "../reducers/blogsReducer.js";
import {addCommentToBlogAndNotify} from "../reducers/blogsReducer.js";

const BlogView = () => {

    const {blogid} = useParams()
    const blog = useSelector(state => state.blogs.find(b => b.id === blogid))
    const dispatch = useDispatch()

    const [comment, setComment] = useState('')

    const updateBlog = (blog) => {
        blog.likes += 1
        dispatch(updateBlogAndNotify(blog))
    }

    const handleNewComment = (e) => {
        e.preventDefault()
        dispatch(addCommentToBlogAndNotify(comment, blogid))
        setComment('')
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

            <div>
                <h4>comments</h4>
                <form onSubmit={handleNewComment}>
                    <input value={comment} onChange={(e) => {
                        e.preventDefault()
                        setComment(e.target.value)
                    }}/>
                    <button type="submit">add comment</button>
                </form>
                <ul>{blog.comments &&
                blog.comments.map((c, i) =>
                    <li key={i}>{c}</li>
                )
                }</ul>
            </div>

        </div>
    )
}

export default BlogView