import axios from "axios";

const api = axios.create({
    baseURL: "https://tastybites-backend-q0rg.onrender.com/api"
});

export default api;