import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createBlog = async (blog) => {
    const res = await axios.post(baseUrl, blog, {headers: {Authorization: token}})
    return res.data
}

const updateBlog = async (blog) => {
    const res = await axios.put(`${baseUrl}/${blog.id}`, blog, {headers: {Authorization: token}})
    return res
}

const removeBlog = async (blog) => {
    const res = await axios.delete(`${baseUrl}/${blog.id}`, {headers: {Authorization: token}})
    return res
}

const addComment = async (comment, blogid)=>{
    const body = {comment}
    const res = await axios.post(`${baseUrl}/${blogid}/comments`, body)
    return res
}

const blogService = {getAll, createBlog, setToken, updateBlog, removeBlog, addComment}
export default blogService