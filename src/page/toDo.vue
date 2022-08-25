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
            // 发送请求标准流程
             getAward({
                aid:'1111'
             })
            .then((res) => {

            console.log(res.data);
            })
            .catch((err) => console.log(err));

        }
        
        return {fas}
    }
}
</script>

<style>

</style>