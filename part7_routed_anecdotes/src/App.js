import React, {useState} from 'react'
import {Link, Switch, Route, Redirect, useRouteMatch, useHistory} from 'react-router-dom'
import ViewOne from "./ViewOne.js";
import {useField} from "./hooks";

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link to={'/anecdotes'} style={padding}>anecdotes</Link>
            <Link to={'/create'} style={padding}>create new</Link>
            <Link to={'/about'} style={padding}>about</Link>
        </div>
    )
}

const AnecdoteList = ({anecdotes}) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map(anecdote => <li key={anecdote.id}><a
                href={`/anecdotes/${anecdote.id}`}>{anecdote.content}</a></li>)}
        </ul>
    </div>
)

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke
            laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea
            about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
)

const Footer = () => (
    <div>
        Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

        See <a
        href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for
        the source code.
    </div>
)



const CreateNew = (props) => {
    // const [content, setContent] = useState('')
    // const [author, setAuthor] = useState('')
    // const [info, setInfo] = useState('')
    const content = useField('content')
    const author = useField('author')
    const info = useField('info')

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("content", content)
        props.addNew({
            content: content.inputHandler.value,
            author: author.inputHandler.value,
            info: info.inputHandler.value,
            votes: 0
        })
        history.push('/anecdotes')
    }

    const resetFields =()=>{
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content.inputHandler}/>
                </div>
                <div>
                    author
                    <input {...author.inputHandler}/>
                </div>
                <div>
                    url for more info
                    <input {...info.inputHandler}/>
                </div>
                <button>create</button>
            </form>
            <button onClick={resetFields}>reset</button>
        </div>
    )

}

const Notification = ({message}) => {

    return message
        ? <div>{message}</div>
        : null
}

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ])

    const [notification, setNotification] = useState('')

    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        setAnecdotes(anecdotes.concat(anecdote))
        setNotification(`a new anecdote ${anecdote.content} created`)
        setTimeout(() => setNotification(''), 5000)
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    const match = useRouteMatch('/anecdotes/:id')
    const anecdote = match ? anecdoteById(match.params.id) : null


    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu/>
            <Notification message={notification}/>
            <Switch>
                <Route path={'/anecdotes/:id'}>
                    <ViewOne anecdote={anecdote}/>
                </Route>
                <Route path={'/anecdotes'}>
                    <AnecdoteList anecdotes={anecdotes}/>
                </Route>
                <Route path={'/about'}>
                    <About/>
                </Route>
                <Route path={'/create'}>
                    <CreateNew addNew={addNew}/>
                </Route>
                <Route path={'/'}>
                    <Redirect to={'/anecdotes'}/>
                </Route>
            </Switch>
            <Footer/>
        </div>
    )
}

export default App;
