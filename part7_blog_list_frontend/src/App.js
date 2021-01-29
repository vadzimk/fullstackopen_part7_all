import React, {useState, useEffect, useRef} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm.js";
import blogService from './services/blogs'
import loginService from "./services/login.js";
import BlogForm from "./components/BlogForm.js";
import Notification from "./components/Notification.js";
import Togglable from "./components/Togglable.js";
import {setUser} from "./reducers/usersReducer.js";
import Users from "./components/Users.js";
import {setNotification} from "./reducers/notificationReducer.js";

import {
    addBlogAndNotify,
    initBlogs,
    removeBlogAndNotify,
    updateBlogAndNotify
} from "./reducers/blogsReducer.js";

import {useDispatch, useSelector} from "react-redux";
import UserView from "./components/UserView.js";
import BlogView from "./components/BlogView.js";


const App = () => {
    // const [blogs, setBlogs] = useState([])
    // const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //const [notification, setNotification] = useState({message: '', isError: false})
    const newBlogRef = useRef(null)
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)
    const storeBlogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)


    /**
     * @param message is error if error is true, else just message
     * @param isError is true if notifies about error
     * */
    const notify = (message, isError = false) => {
        // setNotification({message, isError})
        // setTimeout(() => setNotification({message: '', isError: false}), 5000)
        dispatch(setNotification({message, isError}))

    }

    useEffect(() => {
        // blogService.getAll().then(blogs =>
        //     setBlogs(blogs)
        // )

        dispatch(initBlogs())
    }, [dispatch])

    const fetchUserFromStorage = () => {
        const json_user = window.localStorage.getItem("blogAppUser")
        const user = JSON.parse(json_user)
        dispatch(setUser(user))
        if (user && user.token) {
            blogService.setToken(user.token)
        }
    }

    useEffect(fetchUserFromStorage, [])  // dependencies [] - effect is executed only when the component is rendered for the first time

    const handleLogin = async (e) => {
        e.preventDefault()  // dont refresh page after form submit
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('blogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch(setUser(user))
            setUsername('')
            setPassword('')
            notify('Login successful')
            console.log("user from handleLogin", user)
        } catch (e) {
            notify(e, true)
        }
    }

    const handleLogOut = () => {
        try {
            window.localStorage.removeItem('blogAppUser')
            dispatch(setUser(null))
            notify('Logout successful')
        } catch (e) {
            notify(e, true)
        }

    }

    const handleCreateBlog = async (newBlog) => {
        try {
            // const blog = await blogService.createBlog(newBlog)
            // setBlogs(blogs.concat(blog))
            dispatch(addBlogAndNotify(newBlog))
            // notify(`Created: ${newBlog.title}`)
            newBlogRef.current.toggleVisibility()
        } catch (e) {
            notify(e, true)
        }
    }

    // const handleUpdateBlog = async (blog) => {
    //     // try {
    //     //     const result = await blogService.updateBlog(blog)
    //     //     setBlogs(blogs.map(b => b.id === result.id ? result : b))
    //     // } catch (e) {
    //     //     notify(e, true)
    //     // }
    //
    //     dispatch(updateBlogAndNotify(blog))
    // }

    // const handleRemoveBlog = async (blog) => {
    //     // try {
    //     //     const result = await blogService.removeBlog(blog)
    //     //     if (result.status === 204 ) {
    //     //         setBlogs(blogs.filter(b => b.id !== blog.id))
    //     //         notify(`Deleted: ${blog.title}`)
    //     //     } else{
    //     //         notify(result)
    //     //     }
    //     // } catch (e){
    //     //     notify(e, true)
    //     // }
    //     dispatch(removeBlogAndNotify(blog))
    // }

    const padding = {
        padding: 5
    }

    return (
        <div>
            <Router>
                <div>
                    <Link to="/" style={padding}>home</Link>
                    <Link to="/users" style={padding}>users</Link>

                </div>
                <Notification {...notification}/>
                {(user === null) ?
                    <div>
                        <h3>log in to application</h3>
                        <LoginForm
                            handleLogin={handleLogin}
                            username={username}
                            password={password}
                            setUserName={setUsername}
                            setPassword={setPassword}
                        />
                    </div>
                    :
                    <div>
                        <h2>blogs</h2>
                        <p>{user.name} is logged in</p>
                        <button onClick={handleLogOut}>logout</button>
                        <Switch>
                            <Route path="/users/:userid">
                                <UserView/>
                            </Route>
                            <Route path="/users">
                                <Users/>
                            </Route>
                            <Route path="/blogs/:blogid">
                                <BlogView/>
                            </Route>
                            <Route path="/">
                                <div>
                                    <Togglable buttonLabel={'new blog'} ref={newBlogRef}>
                                        <BlogForm handleCreateBlog={handleCreateBlog}/>
                                    </Togglable>
                                    {storeBlogs.sort((a, b) => (b.likes - a.likes)).map(blog =>
                                        <Blog
                                            key={blog.id}
                                            blog={blog}
                                            // handleUpdateBlog={handleUpdateBlog}
                                            // handleRemoveBlog={handleRemoveBlog}
                                        />
                                    )}
                                </div>
                            </Route>
                        </Switch>
                    </div>

                }


            </Router>
        </div>
    )
}

export default App