import axios from 'axios';
import {API_URL} from "./costants";

const axiosApi = axios.create({
    baseURL: API_URL,
});

export default axiosApi;
