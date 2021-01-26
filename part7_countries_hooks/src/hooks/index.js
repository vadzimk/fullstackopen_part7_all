import {useEffect, useState} from "react";
import countryService from "../services/countryService.js";

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    useEffect(() => {
            if (name)
                countryService.fetchCountry(name).then((c) => {
                    setCountry(c);
                    console.log("c", c)
                })
        }, [name]  // need to use parameter to execute useEffect only when it is changed
    )
    return country
}