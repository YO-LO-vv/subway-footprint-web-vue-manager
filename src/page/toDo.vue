<template>
    <div class="ordering">
        <el-button @click="fas">test</el-button>
    </div>
</template>

<script>

import {getAward} from '../../api/api'

export default{
    setup(){
        const fas = ()=>{
             getAward({
                aid:'1111'
             })
            .then((res) => {
            /*这里的res是响应成功是返回的数据，res.data说明获取报文
            中的data字段对应的值,我在setup声明使用的ref，所以赋值时
            需要使用captchaId.value的方式*/
            console.log(res.data);
            })
            //在这里处理错误
            .catch((err) => console.log(err));

        }
        
        return {fas}
    }
}
</script>

<style>

</style>