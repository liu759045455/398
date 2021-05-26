import axios from 'axios';
import {
    Message,
    Loading
} from "element-ui";

let loading = null;

let startLoading = () => {
    loading = Loading.service({
        lock: false,
        text: "加载中……",
        background: "rgba(255, 255, 255, 0.8)"
    })
}

//结束 取消loading加载
let endLoading = () => {
    loading.close();
};


let loadingCount = 0;

let showStartLoading = () => {
    if (loadingCount === 0) {
        startLoading();
    }
    loadingCount++;
}

let showEndLoading = () => {
    if (loadingCount <= 0) return;
    loadingCount--;
    if (loadingCount === 0) {
        endLoading();
    }
}

/*
    设置超时时间和跨域是否允许携带凭证
*/
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

//设置请求拦截器
axios.interceptors.request.use(
    config => {
        // showStartLoading();

        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

//响应拦截
axios.interceptors.response.use(
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

export default axios;