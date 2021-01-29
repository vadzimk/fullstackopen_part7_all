import React, {useEffect} from "react";
import {useSelector} from "react-redux";


const Users = () => {
    const blogs = useSelector(state => state.blogs)

    console.log("blogs", blogs)

    const uniqueUsers = () => {
        const users = []

        for (let i = 0; i < blogs.length; i++) {
            if (users.length === 0) {
                users[0] = {
                    username: blogs[i].user.username,
                    name: blogs[i].user.name,
                    numBlogs: 1
                }
            }
            for (let j = 0; j < users.length; j++) {
                if (blogs[i].user.username === users[j].username) {
                    users[j].numBlogs += 1
                }
            }
        }

        console.log("unique users", users)
        return users
    }

    const userdata = uniqueUsers()

    return (
        <div>
            <h3>Users</h3>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Blogs created</th>
                </tr>
                </thead>
                <tbody>
                {
                    userdata.map((u) =>
                        <tr key={u.username}>
                            <td>{u.name}</td>
                            <td>{u.numBlogs}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>

        </div>
    )
}

export default Users