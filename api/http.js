import request from './request'
const http = {
        get(url, params) {
            const config = {
                method: 'get',
                url: url
            } /*这里如果GET请求有参数，则携带上传入的参数，在
            URL中以？的方式放在请求链接中*/
            if (params) config.params = params
            
            return request(config)
        },
        post(url, params) {
            const config = {
                method: 'post',
                url: url
            }/*同理也是传入用户需要发送到后台的参数，这些参数
            放在报文中，载体表达标准是JSON*/
            if (params) config.data = params
            return request(config)
        },
        post_q(url, params) {
            const config = {
                method: 'post',
                url: url
            }/*同理也是传入用户需要发送到后台的参数，这些参数
            放在报文中，载体表达标准是JSON*/
            // if (params) config.data = params
            if (params) config.params = params
            
            return request(config)
        }
    }
    
//暴露接口，允许Vue文件或其他js,ts文件使用http结构体中的方法
export default http
