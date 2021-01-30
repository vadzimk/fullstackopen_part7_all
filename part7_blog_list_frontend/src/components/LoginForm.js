import React from 'react'
import {TextField, Button} from '@material-ui/core'


const LoginForm = ({handleLogin, username, password, setUserName, setPassword}) => {

    return (
        <div>
            <h3>log in to application</h3>
            <form onSubmit={handleLogin}>
                <div><TextField
                    label="username"
                    type="text"
                    name="Username"
                    value={username}
                    onChange={e => {
                        setUserName(e.target.value)
                    }}
                />
                </div>
                <div>
                    <TextField label="password"
                        type="password"
                        name="Password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value)
                        }}/>
                </div>
                <Button type="submit" variant="contained" color="primary">login</Button>
            </form>
        </div>
    )
}

export default LoginForm