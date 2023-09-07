import axios,
{
    AxiosHeaders,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios'
import { AuthResponse } from '../../services/AuthService/types/AuthResponse'
import { LocalStorageItems } from 'shared/types/localStorageItems'

export const API_URL = 'http://localhost:5010/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    if (config.headers) {
        (config.headers as AxiosHeaders).set(
            'Authorization',
            `Bearer ${localStorage.getItem(LocalStorageItems.TOKEN)}`
        )
    }
    return config
})

$api.interceptors.response.use((config: AxiosResponse) => {
    return config
}, async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<AuthResponse>(
                `${API_URL}/auth/refresh`,
                { withCredentials: true }
            )
            localStorage.setItem(LocalStorageItems.TOKEN, response.data.accessToken)
            return await $api.request(originalRequest)
        } catch (e) {
            // console.log('Не авторизован')
        }
    }
    throw error
})

export default $api
