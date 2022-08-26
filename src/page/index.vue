<template>
    <div id="backcont">
        <el-container class="big-box">
            <el-header class="top-bar">
                <p class="lt-title">地铁足迹系统管理员端</p>
                <div>
                    <el-menu 
                    :default-active="activeIndex"
                    class="top-menu"
                    mode="horizontal"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @select="handleSelect"
                    >
                        <div v-for="(item,index) in menu" :key="index">
                            <router-link :to="{path:item.router}">
                                <el-menu-item :index="item.id" >
                                    <el-icon>
                                        <!-- 展示组件 -->
                                        <component v-if="item.icon!=''" :is="item.icon">
                                        </component>
                                    </el-icon>
                                    <span>{{item.title}}</span>
                                </el-menu-item>
                            </router-link>
                        </div>
                    </el-menu>
                    </div>   
                <el-button type="danger" @click="exit" >退出登录</el-button>
            </el-header>
            <el-main class="body-part">
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import {reactive, ref,markRaw,onMounted} from 'vue'
import {Setting,Histogram,Search,Avatar, Finished,Cpu} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
export default{
    components:{
        Setting:markRaw(Setting),
        Avatar:markRaw(Avatar),
        Search:markRaw(Search),
        Histogram:markRaw(Histogram),
        Finished:markRaw(Finished),
        Cpu:markRaw(Cpu)
    },
    setup(){
        const router=useRouter()
        //菜单激活回调
        const activeIndex = ref('0')
        const handleSelect = (key, keyPath) => {
            console.log(key, keyPath)
            localStorage.setItem('menuid',JSON.stringify(key))//缓存本地
        }
        onMounted(()=>{
            activeIndex.value = JSON.parse(localStorage.getItem('menuid'))
        })
        //菜单条目
        const menuArray = [
            {
                id:'0',
                icon:Finished,
                title:'代办事项',
                router:'toDo',
                Subclass:[]
            },
            {
                id:'1',
                icon:Setting,
                title:'奖池管理',
                router:'poolManage',
                Subclass:[]
            },
            {
                id:'2',
                icon:Cpu,
                title:'系统运维',
                router:'systemTend',
                Subclass:[]
            },
            {
                id:'3',
                icon:Search,
                title:'商户认证',
                router:'verifyMerc',
                Subclass:[]
            },
            {
                id:'4',
                icon:'',
                title:'敬请期待',
                router:'',
                Subclass:[]
            }
        ]

        const exit = ()=>{
            router.push({name:'login'})
        }
        const menu=reactive(menuArray)
        return{activeIndex,handleSelect,menu,exit}
    }
}
</script>

<style>


</style>