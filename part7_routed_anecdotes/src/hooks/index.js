import {useState} from "react";


export const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }

    return {name, value, onChange}
}
