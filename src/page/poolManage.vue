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
            <!-- 伪分页设计 芜湖 -->
            <el-table id="poolTable" :data="tableData.arr.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
            style="width: 100%" class="awa-tab">
                <el-table-column prop="aid" label="Aid" min-width="100"/>
                <el-table-column prop="variety" label="种类" min-width="100"/>
                <el-table-column prop="name" label="名称" min-width="100"/>
                <el-table-column prop="num" label="数量" min-width="100"/>
                <el-table-column
                    prop="status"
                    label="状态"
                    min-width="100"
                    :filters="[
                        { text: '上架中', value: 'On' },
                        { text: '未上架', value: 'Off' },
                    ]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end"
                    >
                    <template #default="scope">
                        <el-tag
                        :type="scope.row.tag === 'Home' ? '' : 'success'"
                        disable-transitions
                        >{{ scope.row.tag }}</el-tag
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :total="tableData.arr.length" 
            @current-change="handleChange" :hide-on-single-page='true'
            background :page-size="pageSize" v-model:current-page="currentPage"/>
        </div>
    </div>
</template>

<script>
import {Search} from '@element-plus/icons-vue'
import { markRaw,ref,reactive,onMounted} from 'vue';
import {getAllAwards} from '../../api/api'
export default {
    components:{     
        Search:markRaw(Search),
    },
    setup() {
        //挂载
        onMounted(()=>{
            console.log("mounted")
            sync()
        })
        
        const queryInfo=ref('')
        const tableData = reactive({
            arr:[
           ]})
        const findGood=()=>{
            console.log(queryInfo.value)
        }
        //页码更换
        //const totalPage=ref(tableData.length)
        const currentPage=ref(1)
        const pageSize=ref(5)
        const handleChange=()=>{
            console.log(currentPage.value)
            console.log(tableData.value)
        }
        //数据更新
        
        function sync(){
            getAllAwards({
             })
            .then((res) => {
                console.log(res);
                console.log(res.data.data);
                tableData.arr=res.data.data
            })
            .catch((err) => console.log(err));
        }

        return{queryInfo,findGood,tableData,currentPage,pageSize,handleChange}
    },
}
</script>

<style>

</style>