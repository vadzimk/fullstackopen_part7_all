import React from 'react'
import Blog from "./Blog.js";
import {useSelector} from "react-redux";

const BlogList = () => {

    const storeBlogs = useSelector(state => state.blogs)

    return (
        <div>
            {storeBlogs.sort((a, b) => (b.likes - a.likes)).map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                />
            )}
        </div>
    )
}

export default BlogList