import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
// import Blog from './components/Blog'
import LoginForm from "./components/LoginForm.js";
import blogService from './services/blogs'
import loginService from "./services/login.js";
// import BlogForm from "./components/BlogForm.js";
import Notification from "./components/Notification.js";
// import Togglable from "./components/Togglable.js";
import {setUser} from "./reducers/usersReducer.js";
import Users from "./components/Users.js";
import {setNotification} from "./reducers/notificationReducer.js";

import {initBlogs} from "./reducers/blogsReducer.js";

import {useDispatch, useSelector} from "react-redux";
import UserView from "./components/UserView.js";
import BlogView from "./components/BlogView.js";
import BlogFormContainer from "./components/BlogFormContainer.js";
import BlogList from "./components/BlogList.js";
import {AppBar, Button, Container, Toolbar} from "@material-ui/core";


const App = () => {
    // const [blogs, setBlogs] = useState([])
    // const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //const [notification, setNotification] = useState({message: '', isError: false})

    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)

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

    const colorWhite = {"color": "rgb(255, 255, 255)"}

    return (
        <Router>

            <Container>

                <AppBar position="sticky">
                    <Toolbar>
                        <Button component={Link} to="/blogs" style={colorWhite}>blogs</Button>
                        <Button component={Link} to="/users" style={colorWhite}>users</Button>
                        {user &&
                            <>
                                <div style={colorWhite}>{user ? user.name : ""} is logged in</div>
                                <Button variant="outlined" size="small" onClick={handleLogOut}
                                        style={colorWhite}>logout</Button>
                            </>

                        }


                    </Toolbar>


                </AppBar>

                <Notification {...notification}/>
                {(user === null) ?
                    <div>

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
                            <Route path="/blogs">
                                <div>
                                    <BlogFormContainer/>
                                    <BlogList/>
                                </div>
                            </Route>
                            <Route path="/">
                                <Redirect to="/blogs"/>
                            </Route>
                        </Switch>
                    </div>
                }

            </Container>
        </Router>
    )
}

export default App