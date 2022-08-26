<template>
    <div class="ordering">
        <!-- 搜索框 -->
        <div>
            <el-row class="searchInput">
                <el-col :span="5"/>
                <el-col :span="11">
                    <el-input placeholder="输入信息进行奖品查找" v-model="searchItem.queryInfo" clearable/>        
                </el-col>
                <el-col :span="2">
                    <el-select v-model="searchItem.selectInfo"  placeholder="查询方式" >
                        <el-option
                            v-for="item in searchItem.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                    </el-select>
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
            style="width: 100%" class="awa-tab" empty-text="未查询到相关数据">
                <el-table-column prop="aid" label="奖品编号" min-width="100"/>
                <el-table-column prop="variety" label="奖品种类" min-width="100"/>
                <el-table-column prop="name" label="奖品名称" min-width="100"/>
                <el-table-column prop="num" label="剩余数量" min-width="100"/>
                <!-- 状态栏 -->
                <el-table-column label="当前状态" min-width="180">
                    <template #default="scope">       
                        <el-tag type="info" v-if="scope.row.status== '0'">未上架</el-tag>   
                        <el-tag  v-else>已上架</el-tag>   
                    </template>
                </el-table-column>
                <!-- 操作栏 -->
                <el-table-column label="操作" min-width="150">
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
import {ElMessage,ElNotification} from 'element-plus'
import {Search} from '@element-plus/icons-vue'
import {markRaw,ref,reactive,onMounted} from 'vue';
import {getAllAwards,getAward,getMerchantAwards} from '../../api/api'
import _ from 'lodash' //导入loadsh插件

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
        //表格数据
        const tableData = reactive({
            arr:[]
            })
        //商品查找
        const searchItem=reactive({
            queryInfo:'',
            selectInfo:'',
            options:[
                {
                    value: '奖品编号',
                    label: '奖品编号',
                },
                {
                    value: '商户编号',
                    label: '商户编号',
                },        
            ]
        })
        const findGood=()=>{
            if(searchItem.queryInfo==''){
                sync()
                return
            }
            if(searchItem.selectInfo=='奖品编号'){
                getAward({
                    aid:searchItem.queryInfo
                })
                .then((res) => {
                    console.log(res);
                    console.log(res.data.data);
                    console.log(typeof(res.data.data));
                    if(null==res.data.data){
                        tableData.arr=[]
                    }
                    else{
                        tableData.arr=[_.cloneDeep(res.data.data)]
                    }
                })
                .catch((err) => console.log(err));
            }
            else if(searchItem.selectInfo=='商户编号'){
                getMerchantAwards({
                    mid:searchItem.queryInfo
                 })
                .then((res) => {
                    console.log(res);
                    console.log(res.data.data);
                    console.log(typeof(res.data.data));
                    if(null==res.data.data){
                        tableData.arr=[]
                    }
                    else{
                        tableData.arr=_.cloneDeep(res.data.data)
                    }
                })
                .catch((err) => console.log(err));
            }
            else{
                ElNotification({
                    title: '注意！',
                    message: '请选择查找模式',
                    type: 'warning',
                })
                return
            }
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
                console.log(typeof(res.data.data));
                tableData.arr=_.cloneDeep(res.data.data)
            })
            .catch((err) => console.log(err));
        }

        //数据同步


        //编辑操作
        const handleEdit = (index) => {
            dialogVisible.value=true
            formInline.which_one=index+(pageSize.value)*(currentPage.value-1)
            formInline.now_award=_.cloneDeep(tableData.arr[formInline.which_one])
            console.log('开始编辑')
            console.log(formInline.which_one)
            console.log(formInline.now_award)
        }
        const editDown = ()=>{
            console.log('完成编辑')
            dialogVisible.value = false
            tableData.arr[formInline.which_one]=formInline.now_award
            ElMessage({
                message: '信息编辑成功',
                type: 'success',
            })
        }
        
        //上下架处理
        const handleUpDown=(index)=>{
            formInline.which_one=index+(pageSize.value)*(currentPage.value-1)
            tableData.arr[formInline.which_one].status=tableData.arr[formInline.which_one].status==1? 0:1
            ElMessage({
                message: tableData.arr[formInline.which_one].status==0?'下架成功':'上架成功',
                type: 'success',
            })
        }

        //编辑页面 被选中奖品
        const dialogVisible = ref(false)
        const formInline = reactive({
            which_one:0,
            now_award:{}
        })
        return{searchItem,findGood,tableData,currentPage,pageSize,handleChange,handleEdit,
        dialogVisible,formInline,editDown,handleUpDown}



        return{queryInfo,findGood,tableData,currentPage,pageSize,handleChange}
    },
}
</script>

<style>

</style>