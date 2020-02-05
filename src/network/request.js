import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // baseURL:'http://123.207.32.32:8000/api/hy',
    baseURL:'http://106.54.54.237:8000/api/hy',
    timeout:10000
  })
  return instance(config)
}
