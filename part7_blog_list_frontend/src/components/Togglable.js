import React, {useState, useImperativeHandle} from "react";
import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";

const Togglable = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)



    const childrendivstyle = {
        display: visible ? '' : 'none'
    }
    const buttondivstyle = {
        display: visible ? 'none' : ''
    }

    const createHandle = ()=>{
        return{
            toggleVisibility: ()=>{
                setVisible(!visible)
            }
        }
    }
    useImperativeHandle(ref,createHandle)

    return (
        <div>
            <div>
                <Button variant="contained" color="primary" size="small" style={buttondivstyle} onClick={() => {
                    setVisible(true)
                }}>
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={childrendivstyle}>
                {props.children}
                <Button variant="contained" color="secondary" size="small" onClick={() => {
                    setVisible(false)
                }}>cancel
                </Button>
            </div>

        </div>
    )
})


Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'

export default Togglable