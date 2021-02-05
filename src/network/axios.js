import axios from 'axios'
import router from '../router/index'

// 请求拦截
axios.interceptors.request.use(config => {
    if(window.sessionStorage.eleToken) {
        // 登录之前拦截
        // 设置统一的请求头
        config.headers.Authorization = window.sessionStorage.eleToken
    }
    return config
}), error => {

    // 获取错误状态码
    const  { status } = error.response
    if(status == 401) {
        console.log('token失效，请重新登录');
        // 清除token
        window.sessionStorage.removeItem('eleToken')
        // 跳转到登录页面
        router.push('/login')
    }

    return Promise.reject(error)
}
// 响应拦截


export default axios