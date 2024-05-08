import axios from "axios"

export const flag = async() => {
    try {
        
        let res = await axios.get("https://restcountries.com/v3.1/all");
        return res.data
    } catch (error) {
        return null
    }
}