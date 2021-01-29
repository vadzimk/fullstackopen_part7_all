import loginService from '../services/login.js'


// action creator
export const setUser=(user)=>{
    console.log("user from setUser", user)
    return (dispatch)=>{
        dispatch({
            type: 'SET_USER',
            user
        })
    }
}


const userReducer = (state=null, action)=>{

    switch (action.type){
        case 'SET_USER':
            return action.user
        default:
            return state
    }

}


export default userReducer