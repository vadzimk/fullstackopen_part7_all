import React from 'react'
import {Link} from 'react-router-dom'
import {removeBlogAndNotify} from "../reducers/blogsReducer.js";
import {useDispatch} from "react-redux";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";


const style = makeStyles({
    btnRight: {
        float: "right",
        top: "50%",
        height: 30,
        position: "relative",
        margin: 0,
        transform: "translateY(-50%)"
    }
})

const Blog = ({blog, handleUpdateBlog, handleRemoveBlog}) => {
    const dispatch = useDispatch()
    // const [showDetails, setShowDetails] = useState(false)


    // Blog.Schema = {title: '', author: '', url: '', likes: 0, user: ''}

    const blogStyle = {
        paddingTop: 18,
        paddingBottom: 15,
        paddingLeft: 2,
        border: 'solid 1px gray',
        marginBottom: 5,
        borderRadius: 5
    }

    const classes =style()

    // const right = {
    //     float: "right",
    //     verticalAlign: "center",
    //     margin: 0
    // }


    // const detailsStyle = {
    //     display: showDetails ? '' : 'none'
    // }

    // const updateBlog = (blog) => {
    //     blog.likes += 1
    //     handleUpdateBlog(blog)
    // }
    //
    // const removeBlog = (blog) => {
    //     window.confirm(`delete ${blog.title} ?`)
    //     handleRemoveBlog(blog)
    // }

    // // expands blog when clicking view button
    // return (
    //     <div style={blogStyle} className="blog">
    //         <div>{blog.title} {blog.author}
    //             <button onClick={() => {
    //                 setShowDetails(!showDetails)
    //             }}>{showDetails ? 'hide' : 'view'}</button>
    //         </div>
    //         <div style={detailsStyle} className="details">
    //             <div>{blog.url}</div>
    //             <div><span>likes {blog.likes}</span>
    //                 <button id="likebutton" onClick={() => {
    //                     updateBlog(blog)
    //                 }}>like
    //                 </button>
    //             </div>
    //             <div>{blog.author}</div>
    //             <button onClick={() => {
    //                 removeBlog(blog)
    //             }}>remove
    //             </button>
    //         </div>
    //     </div>
    // )

    const removeBlog = (blog) => {
        window.confirm(`delete ${blog.title} ?`)
        dispatch(removeBlogAndNotify(blog))
    }


    return (
        <div style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            <Button size="small" variant="outlined" className={classes.btnRight} onClick={() => {
                removeBlog(blog)
            }}>remove
            </Button>
        </div>
    )
}

export default Blog
