import axios from 'axios';

export const findByAll = async () => {
    try {
        return await axios.get(`https://5366l3-8080.csb.app/top_gainers`)
    } catch (e) {
        console.log(e)
    }
}

export const findByAllTime = async () => {
    try {
        return await axios.get(`https://5366l3-8080.csb.app/timeSeries`)
    } catch (e) {
        console.log(e)
    }
}