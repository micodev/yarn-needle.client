import axios from 'axios'
// Replace require with dynamic import or use a browser-compatible approach
import https from 'https'
export const API_URL = import.meta.env.VITE_API_URL
export const APP_ENV = import.meta.env.VITE_APP_ENV || 'development'

const axiosInstance = axios.create({
    baseURL: API_URL,
    // Using a browser-compatible approach for HTTPS configuration
    // In a browser environment, we need to handle this differently than in Node
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

// Response interceptor
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Handle unauthorized
            localStorage.removeItem('token')
        }
        return Promise.reject(error)
    }
)

console.log(`API is configured to use: ${API_URL} (${APP_ENV} environment)`)

export default axiosInstance
