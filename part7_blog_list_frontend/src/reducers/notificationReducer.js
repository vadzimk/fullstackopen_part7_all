// // regular action creator returns an action object
// export const setNotification = ({message, isError}) => {
//     return {
//         type: 'SET_NOTIFICATION',
//         message,
//         isError
//     }
// }

let timerHandle
// redux-thunk action creator
export const setNotification = ({message, isError}) => {
    return async (dispatch) => {
        if (timerHandle) {
            clearTimeout(timerHandle)
            timerHandle = undefined
        }

        dispatch({
            type: 'SET_NOTIFICATION',
            message,
            isError
        })

        timerHandle = setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                message: ''
            })
        }, 5000)
    }
}
const notificationReducer = (state = {message: '', isError: false}, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return state = {message: action.message, isError: action.isError}
        default:
            return state
    }
}

export default notificationReducer