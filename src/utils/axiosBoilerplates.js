import axios from "axios";

const regApi = axios.create({
    baseURL: process.env.BACKEND_URL
})

export {regApi}