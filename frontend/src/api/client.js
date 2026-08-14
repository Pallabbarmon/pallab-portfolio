import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const api = axios.create({ baseURL: API_URL })

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem('admin_token', token)
  } else {
    delete api.defaults.headers.common['Authorization']
    localStorage.removeItem('admin_token')
  }
}

const savedToken = localStorage.getItem('admin_token')
if (savedToken) setAuthToken(savedToken)