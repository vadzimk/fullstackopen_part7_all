import React from "react";
import {useParams} from 'react-router-dom'
import {useSelector} from "react-redux";


const UserView = () => {
    const {userid} = useParams()
    const blogs = useSelector(state => state.blogs)

    const getBlogsByUserId = () => {
        return blogs.filter(b => b.user.id === userid)
    }

    const blogsByUser = getBlogsByUserId()

    return (
        <div>
            {blogsByUser.map(b =>
                <li key={b.id}>{b.title}</li>)}
        </div>
    )
}

export default UserView