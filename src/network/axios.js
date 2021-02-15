import axios from 'axios'
import router from '../router/index'

// 请求拦截
axios.interceptors.request.use(config => {
    if (window.sessionStorage.eleToken) {
        // 登录之前拦截
        // 设置统一的请求头
        config.headers.Authorization = window.sessionStorage.eleToken
    }
    return config
}), error => {
    return Promise.reject(error)
}

// 响应拦截
axios.interceptors.response.use(
    response => {
        // console.log('response intercept 响应拦截器2');
        return response
    }, error => {
        // 获取错误状态码
        const {
            status
        } = error.response
        if (status == 401) {
            // 清除token
            window.sessionStorage.removeItem('eleToken')
            // 跳转到登录页面
            router.push('/login')
        }
        if (status == 400 || 404) {
            return error.response
        }
    }

)

export default axios