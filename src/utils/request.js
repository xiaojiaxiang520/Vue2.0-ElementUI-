import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    baseURL: "http://localhost:8080",
    timeout: 5000
});


//请求拦截器（在请求之前进行一些配置）
service.interceptors.request.use(

    config => {
        //比如是否需要设置token
        // config.headers.token='12345';
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);
//响应了拦截器（在响应之后对数据进行一些处理 ）
//或者let data= response.data
service.interceptors.response.use(
    //成功执行
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
        //失败异常的拦截
    },error => {
        console.log(error);
        return Promise.reject();
    }

);

export default service;
