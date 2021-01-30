import React, {useRef} from 'react'
import Togglable from "./Togglable.js";
import BlogForm from "./BlogForm.js";
import {addBlogAndNotify} from "../reducers/blogsReducer.js";
import {useDispatch} from "react-redux";


const BlogFormContainer = ()=>{
    const dispatch = useDispatch()
    const newBlogRef = useRef(null)

    const handleCreateBlog = (newBlog) => {
            dispatch(addBlogAndNotify(newBlog))
            newBlogRef.current.toggleVisibility()
    }

    return(
        <div>
            <Togglable buttonLabel={'new blog'} ref={newBlogRef}>
                <BlogForm handleCreateBlog={handleCreateBlog}/>
            </Togglable>
        </div>
    )
}

export default BlogFormContainer