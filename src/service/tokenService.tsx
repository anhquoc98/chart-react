import axios from 'axios';

export const findByAll = async () => {
    try {
        return await axios.get(`http://localhost:8080/top_gainers`)
    } catch (e) {
        console.log(e)
    }
}

export const findByAllTime = async () => {
    try {
        return await axios.get(`http://localhost:8080/timeSeries`)
    } catch (e) {
        console.log(e)
    }
}