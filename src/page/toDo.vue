<template>
    <div class="ordering">
        <el-button @click="fas">test</el-button>
    </div>
</template>

<script>



export default{
    setup(){
        const fas = ()=>{
            var key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYW5hZ2VySUQiOiJDbGF5IiwiZXhwIjoxNjYyMDIwMzMzLCJhY2NvdW50IjoiQ2xheSJ9.WLQHOMV-_-hC7jSar7k-LvmyjrLYz-DRAQzEicNYjNI'
            localStorage.setItem('token',JSON.stringify(key))//缓存本地
        }
        
        return {fas}
    }
}
</script>

<style>

</style>