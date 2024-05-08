import axios from "axios"

export const flag = async() => {
    let res = await axios.get("https://restcountries.com/v3.1/all");
    return res.data
}