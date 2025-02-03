import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44350',
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

export default axiosInstance
