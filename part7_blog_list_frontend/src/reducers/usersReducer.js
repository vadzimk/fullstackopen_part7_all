
// action creator
export const setUser=(user)=>{

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