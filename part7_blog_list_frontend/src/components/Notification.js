import React from "react";
import {Alert} from '@material-ui/lab'

const Notification = ({message, isError}) => {
    // const msgStyle = {
    //     color: "green",
    //     border: "1px green solid",
    //     borderRadius: 10,
    //     textAlign: "center",
    //     padding: 5,
    //     marginBottom: 10
    // }
    //
    // const errStyle = {
    //     ...msgStyle,
    //     color: "red",
    //     borderColor: "red",
    //
    // }

    let msg
    if(isError && message.response){
       msg =  message.response.data.error ? message.response.data.error : message.message
    } else {
        msg = message
    }

    return (
        !message ?
            null
            :
            <Alert severity={isError ? "error" : "success"}>
                {msg}
            </Alert>
    )
}

export default Notification