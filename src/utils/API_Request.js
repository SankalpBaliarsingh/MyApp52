import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Promise_Timeout from "./Promise_Timeout";
import { Variables } from "./Common_Configs";
import { Force_Logout } from "./Auth_Manager";

const Axios_Instance = axios.create({
    baseURL: Variables.BACKEND_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

Axios_Instance.interceptors.request.use(
    async (config) => {
        // 🛑 Skip token logic for login API
        const Is_Login_Request =
            config.url?.endsWith("users/login/mobile") &&
            config.method?.toLowerCase() === "post";
        if (Is_Login_Request) return config;

        const token = await Promise_Timeout(
            AsyncStorage.getItem(Variables.JWT_Token),
            Variables.Internal_Promise_Timeout_Duration
        );
        if (!token) await Force_Logout(); // clear storage + navigate to Login
        if (token) config.headers.Authorization = token;
        return config;
    },
    (error) => Promise.reject(error)
);

// 🔐 Response interceptor – handle auth errors globally
Axios_Instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.message;

        const should_logout = error?.response?.data?.data?.log_out === true;
        if (should_logout) await Force_Logout();

        return Promise.reject(error);
    }
);

/**
 * Generic API Request Handler
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param {string} url - API endpoint URL
 * @param {object} options - Request options
 * @param {object} options.params - Query parameters
 * @param {object} options.body - Request body (for POST/PUT/PATCH)
 * @param {number} options.timeout - Custom timeout duration
 * @returns {Promise<{success: boolean, message: string, data: any}>}
 */
const API_Request = async (method, url, options = {}) => {
    const {
        params = null,
        body = null,
        timeout = Variables.Network_Promise_Timeout_Duration
    } = options;

    try {
        // Build Axios config
        const config = {
            method: method.toUpperCase(),
            url,
            ...(params && { params }),
            ...(body && { data: body })
        };

        // Make request with timeout
        const response = await Promise_Timeout(
            Axios_Instance(config),
            timeout
        );

        // Handle timeout
        if (response === false) {
            return {
                success: false,
                message: "Request timed out. Please try again.",
                data: null
            };
        }

        // Return successful response
        return response.data;

    } catch (error) {
        // Extract server error message or use fallback
        const serverMessage = error.response?.data?.message;
        const statusCode = error.response?.status;

        return {
            success: false,
            message: serverMessage || `Request failed${statusCode ? ` (${statusCode})` : ''}`,
            data: null
        };
    }
};

export default API_Request;
