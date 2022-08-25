<template>
    <div class="ordering">
        <!-- 搜索框 -->
        <div>
            <el-row class="searchInput">
                <el-col :span="5"/>
                <el-col :span="13">
                    <el-input placeholder="输入待查询奖品" v-model="queryInfo" clearable/>        
                </el-col>
                <el-col :span="2">
                    <el-button @click="findGood">
                            <el-icon>
                                <search/>
                            </el-icon>
                        </el-button>
                </el-col>
                <el-col :span="4"/>
            </el-row>
        </div>
        <!-- 奖品表格 -->
        <div class="table">
            <el-table id="poolTable" :data="tableData" style="width: 100%" class="awa-tab" >
                <el-table-column prop="aid" label="Aid" min-width="100"/>
                <el-table-column prop="variety" label="种类" min-width="100"/>
                <el-table-column prop="name" label="名称" min-width="100"/>
                <el-table-column prop="num" label="数量" min-width="100"/>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :total="1000" 
            @current-change="handleChange" :hide-on-single-page='true'
            background :page-size="7" v-model:current-page="currentPage"/>
        </div>
    </div>
</template>

<script>
import {Search} from '@element-plus/icons-vue'
import { markRaw,ref,reactive,onMounted} from 'vue';
export default {
    components:{     
        Search:markRaw(Search),
    },
    setup() {
        //请求数据
        onMounted
        
        const queryInfo=ref('')
        const tableData = reactive([
            {
                aid:'2',
                variety:'1',
                name:'ce',
                num:'23'
            },
            {
                aid:'2',
                variety:'1',
                name:'ce',
                num:'23'
            },
            {
                aid:'2',
                variety:'1',
                name:'ce',
                num:'23'
            },
            {
                aid:'2',
                variety:'1',
                name:'ce',
                num:'23'
            },
            {
                aid:'2',
                variety:'1',
                name:'ce',
                num:'23'
            }
            
        ])
        const findGood=()=>{
            console.log(queryInfo.value)
        }
        //页码更换
        const currentPage=ref(1)
        const handleChange=()=>{
            console.log(currentPage.value)
        }
        return{queryInfo,findGood,tableData,currentPage,handleChange}
    },
}
</script>

<style>

</style>