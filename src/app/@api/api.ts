import axios from 'axios'

const api = axios.create({
    baseURL: 'https://7wcqc54f-3000.inc1.devtunnels.ms/',
})
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_tokens')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
export default api
