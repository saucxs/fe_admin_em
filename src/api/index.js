import axios from 'axios'
import store from 'store'
const service = axios.create({
  baseURL: '/risk',
  timeout: 10000
})

service.interceptors.request.use(config => {
  // Do something before request is sent
  if (!config.baseURL) {
    config.baseURL = sessionStorage.getItem('systemUrl') || ''
  }
  if (store.getters.token) {
    config.params = Object.assign(config.params || {}, {accessToken: store.getters.token})
  }
  return config
}, error => {
  // Do something with request error
  window.alert(error.message)
  // Promise.reject(error)
  Promise.resolve(error)
})

service.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data.body
  }

  return Promise.reject(new Error())
}, error => {
  return Promise.reject(error)
  // return Promise.resolve(error)
})

export default service
