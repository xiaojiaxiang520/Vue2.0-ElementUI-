import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: 'static/table.json',
        method: 'get',
        params: query
    });
};
// export const courseSelect = query=>{
//     return request({
//       url: '',
//       method:
//     });
// }
/*
*方式1：
* import {require} from './network/request'

require({
  url: '/home/multidata'
}, res => {
  console.log(res)
},err =>{
  console.log(err);
})
*
* */


/*
* 方式二：
*
*
export default {
  name: 'Login',
  methods: {
    test () {
       this.$axios.get("/hahceshi")
       //因为是测试，所以默认是登录成功的，这里省略了登录成功的判断
        //登录成功之后把token信息保存到sessionStorage中
        sessionStorage.setItem("token", 'heyufuToken');
    }
  },
  created () {
    this.test();
  }
 }
*
* */
