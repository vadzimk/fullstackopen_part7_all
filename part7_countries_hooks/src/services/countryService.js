import axios from "axios";

const baseUrl = 'https://restcountries.eu/rest/v2'


const fetchCountry = (name) => {
    console.log("request name", name)
    return axios.get(`${baseUrl}/name/${name}?fullText=true`)
        .then(res => {
            console.log("res.status", res.status)
            return {
                found: res.status === 200,
                data: res.data[0]
            }
        }).catch((e) => {
            console.log("catch res", e.response.status)
            return {
                found: false,
                data: e.response.data
            }
        })
}

const countryService = {fetchCountry}

export default countryService