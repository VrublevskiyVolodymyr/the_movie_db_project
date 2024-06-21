import axios from "axios";
import {access, baseURL} from "../configs";


const apiService = axios.create({baseURL})

apiService.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${access}`
    return config
})


export {apiService}