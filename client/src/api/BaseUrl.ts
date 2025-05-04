import axios from 'axios'

export const baseRoute = process.env.REACT_APP_BASE_ROUTE || ''
const normalizedBaseRoute = baseRoute.endsWith('/') ? baseRoute.slice(0, -1) : baseRoute
export const baseUrl = (process.env.REACT_APP_HOST_BACKEND || '') + baseRoute
export const baseWsUrl = process.env.REACT_APP_HOST_BACKEND || ''
export const socketPath = `${normalizedBaseRoute}/demo/socket/`
export const apiCall = axios.create({ baseURL: baseUrl })
