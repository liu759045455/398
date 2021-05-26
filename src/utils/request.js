import axios from 'axios'
 
console.log(process.env.VUE_APP_BASE_URL);
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout:10000
})

service.defaults.withCredentials = true;
//设置请求拦截器
service.interceptors.request.use(
    config => {
        // showStartLoading();
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

//响应拦截
service.interceptors.response.use(
    response => {
        // showEndLoading();
        if (response.data.code === 500) {
            Message({
                type: 'error',
                message: response.data.msg,
                center: true
            })
        }
        return response.data;
    },
    error => {
        let {
            response
        } = error;
        if (response) {
            <van-loading size="24px" vertical>加载中...</van-loading>
            switch (response.status) {
                case 401: //当前请求需要用户验证(一般未登录)
                    break;
                case 403: //服务器已经理解请求，但是拒绝执行 (一般token过期了)
                    break;
                case 404: //找不到页面
                    break;
            }
        } else {
            // 服务器连结果都没返回
            if (!window.navigator.onLine) {
                // 断网处理：可以跳转到断网页面
                return;
            }
            //   服务器崩了
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
)

export default service