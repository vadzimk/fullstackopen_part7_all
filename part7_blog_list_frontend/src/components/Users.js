import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


const Users = () => {

    const uniqueUsers = ({blogs}) => {
        if (!blogs.length) {
            return null
        }
        const users = []

        users[0] = {
            id: blogs[0].user.id,
            name: blogs[0].user.name,
            numBlogs: 1
        }

        for (let i = 1; i < blogs.length; i++) {
            for (let j = 0; j < users.length; j++) {
                if (blogs[i].user.id === users[j].id) {
                    users[j].numBlogs += 1
                } else {
                    let user = {
                        id: blogs[i].user.id,
                        name: blogs[i].user.name,
                        numBlogs: 1
                    }
                    users.push(user)
                }
            }
        }
        return users
    }

    const userdata = useSelector(uniqueUsers)

    if (!userdata) {
        return null
    }

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
                        <tr key={u.id}>
                            <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
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