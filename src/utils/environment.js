/**
 * Utility for accessing environment variables
 */

// API URL from environment variables
export const API_URL = import.meta.env.VITE_API_URL

// Base URL from environment variables
export const BASE_URL = import.meta.env.VITE_BASE_URL

// Environment name
export const APP_ENV = import.meta.env.VITE_APP_ENV || 'development'

// Helper function to check current environment
export const isProduction = () => APP_ENV === 'production'
export const isDevelopment = () => APP_ENV === 'development'

// For debugging purposes - log the current environment
console.log(`Environment: ${APP_ENV}`)
console.log(`API URL: ${API_URL}`)
console.log(`Base URL: ${BASE_URL}`)
