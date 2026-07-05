import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api" // Create an Axios Instance instead of writing full url path all the time
});
// works only when your backend server is running on:8080 / api
api.interceptors.request.use((config) => { // An interceptor runs before every request to set config.   Request -> Interceptor -> Server

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization =
            `Bearer ${token}`; // Add Authorization Header
    }

    return config;
});

export default api;