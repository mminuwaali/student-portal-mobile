import axios from "axios";
import Constants from "expo-constants";
import { getAuthToken } from "./storage";

const serverIp = Constants.expoConfig?.hostUri?.split(":").shift();
const instance = axios.create({ baseURL: `http://${serverIp}:8000/api` });

instance.interceptors.request.use(async (config) => {
    const token = await getAuthToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
}, Promise.reject);

export default instance;