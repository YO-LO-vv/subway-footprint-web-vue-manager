<template>
    <div id="backcont">
        <el-container>
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
                    show-overflow-toolt
                    >
                        <!-- <el-menu-item index="1">
                            <el-icon><Setting /></el-icon>
                            <span>奖池管理</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <el-icon><Search /></el-icon>
                            <span>信息查询</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <el-icon><Avatar /></el-icon>
                            <span>商户认证</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <el-icon><Histogram /></el-icon>
                            <span>参数修改</span>
                        </el-menu-item>
                         <el-menu-item index="5">
                            
                            <span>更多</span>
                        </el-menu-item> -->
                        <div v-for="(item,index) in menu" :key="index">
                            <el-menu-item :index="item.id">
                                <el-icon>
                                    <!-- 展示组件 -->
                                    <component v-if="item.icon!=''" :is="item.icon">
                                    </component>
                                </el-icon>
                                <span>{{item.title}}</span>
                            </el-menu-item>
                        </div>
                    </el-menu>
                    </div>   
                <el-button type="danger" >退出登录</el-button>
            </el-header>
            <el-main>Main</el-main>
        </el-container>
    </div>
</template>

<script>
import {reactive, ref,markRaw} from 'vue'
import {Setting,Histogram,Search,Avatar} from '@element-plus/icons-vue'
export default{
    components:{
        Setting:markRaw(Setting),
        Avatar:markRaw(Avatar),
        Search:markRaw(Search),
        Histogram:markRaw(Histogram)
    },
    setup(){
        const activeIndex = ref('1')
        const handleSelect = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const menuArray = [
            {
                id:'1',
                icon:Setting,
                title:'奖池管理',
                router:'',
                Subclass:[]
            },
            {
                id:'2',
                icon:Avatar,
                title:'信息查询',
                router:'',
                Subclass:[]
            },
            {
                id:'3',
                icon:Search,
                title:'商户认证',
                router:'',
                Subclass:[]
            },
            {
                id:'4',
                icon:Histogram,
                title:'信息修改',
                router:'',
                Subclass:[]
            },
            {
                id:'5',
                icon:'',
                title:'敬请期待',
                router:'',
                Subclass:[]
            }
        ]
        const menu=reactive(menuArray)
        return{activeIndex,handleSelect,menu}
    }
}
</script>

<style>


</style>