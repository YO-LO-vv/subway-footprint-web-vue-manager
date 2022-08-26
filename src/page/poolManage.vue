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
        <!-- 新增按钮 -->
        <div>
            <el-button type="primary" class="addAward" @click="handleAdd">
                新增奖品<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
            
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
                        <el-button size="small" @click="handleEdit(scope.$index)"
                        >编辑</el-button
                        >
                        <el-button size="small" @click="handleUpDown(scope.$index)" 
                        type="success" v-if="scope.row.status==0"
                        >上架</el-button>
                        <el-button size="small" @click="handleUpDown(scope.$index)" 
                        type="info" v-else>下架</el-button>
                        <el-popconfirm title="确认要删除该奖品吗?" @confirm="handleDelete(scope.$index)">
                            <template #reference>
                                <el-button
                                size="small"
                                type="danger"
                                >删除</el-button
                                >
                            </template>
                        </el-popconfirm>
                        
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
    <!-- 编辑视图 -->
    <el-dialog
        v-model="dialogVisible"
        title="奖品详情"
        width="50%"
    >
    <!-- 第一行 -->
        <el-row>   
        <el-col :span="11">   
            <el-form  :model="formInline">
                <el-form-item label="奖品编号">
                    <el-input v-model="formInline.now_award.aid" placeholder="{{formInline.now_award.aid}}" disabled/>
                </el-form-item>
            </el-form>
        </el-col> 
        <el-col :span="2"/> 
        <el-col :span="11"> 
            <el-form>
                <el-form-item label="奖品类型">
                    <el-select v-model="formInline.now_award.variety" placeholder="{{formInline.now_award.variety}}">
                        <el-option label="实体物品" value="实体物品" />
                        <el-option label="系统称号" value="系统称号" />
                        <el-option label="碳积分" value="碳积分" />
                        <el-option label="优惠券" value="优惠券" />
                    </el-select>
                </el-form-item>
            </el-form>     
        </el-col> 
        </el-row> 
    <!-- 第二行 -->
        <el-row>   
        <el-col :span="11">   
            <el-form  :model="formInline">
                <el-form-item label="奖品名称">
                    <el-input v-model="formInline.now_award.name" placeholder="{{formInline.now_award.name}}" />
                </el-form-item>
            </el-form>
        </el-col> 
        <el-col :span="2"/> 
        <el-col :span="11"> 
            <el-form  :model="formInline">
                <el-form-item label="剩余数量">
                    <el-input v-model="formInline.now_award.num" placeholder="{{formInline.now_award.num}}" 
                    type="number" min="1" oninput ="value=value.replace(/[^\d]/g,'')"/>
                </el-form-item>
            </el-form>    
        </el-col> 
        </el-row> 
    <!-- 第三行 -->
        <el-row>   
        <el-col :span="11">   
            <el-form  :model="formInline">
                <el-form-item label="对应碳积分">
                    <el-input v-model="formInline.now_award.credit" placeholder="{{formInline.now_award.credit}}" 
                    type="number" min="1" oninput ="value=value.replace(/[^\d]/g,'')"/>
                </el-form-item>
            </el-form>
        </el-col> 
        <el-col :span="2"/> 
        <el-col :span="11"> 
            <el-form  :model="formInline">
                <el-form-item label="商户编号">
                    <el-input v-model="formInline.now_award.mid" placeholder="{{formInline.now_award.mid}}" 
                    disabled v-if="formInline.now_award.mid"/>
                    <el-input placeholder="系统提供" disabled v-else/>
                </el-form-item>
            </el-form>    
        </el-col> 
        </el-row>
    <!-- 第四行 -->
        <el-row>   
        <el-col :span="11">   
            <el-form  :model="formInline">
                <el-form-item label="提供日期">
                    <el-input v-model="formInline.now_award.fromdate" placeholder="{{formInline.now_award.fromdate}}" disabled/>
                </el-form-item>
            </el-form>
        </el-col> 
        <el-col :span="2"/> 
        <el-col :span="11"> 
            <el-form  :model="formInline">
                <el-form-item label="截止日期">
                    <!-- 日期选择器 拿下 -->
                    <el-date-picker
                        v-model="formInline.now_award.todate"
                        type="datetime"
                        placeholder="{{formInline.now_award.todate}}"
                        value-format="YYYY年MM月DD日hh:mm:ss" 
                    />
                </el-form-item>
            </el-form>    
        </el-col> 
        </el-row>
    <!-- 第五行 -->
    <el-form  :model="formInline">
        <el-form-item label="奖品内容">
            <el-input v-model="formInline.now_award.content" placeholder="{{formInline.now_award.content}}" 
            type="textarea" />
        </el-form-item>
    </el-form>

        <div class="dialog-foot">
            <el-button type="primary" @click="editDown" 
                    >确认</el-button
                    >
        </div>
    </el-dialog>


    <!-- 新增视图 -->
    <el-dialog
        v-model="dialogVisible2"
        title="新增奖品"
        width="50%"
    >
    <!-- 第一行 -->
        <el-row>   
        <el-col :span="11">   
            <el-form  :model="formInline">
                <el-form-item label="奖品编号">
                    <el-input v-model="formInline.now_award.aid" placeholder="系统分配" disabled/>
                </el-form-item>
            </el-form>
        </el-col> 
        <el-col :span="2"/> 
        <el-col :span="11"> 
            <el-form>
                <el-form-item label="奖品类型">
                    <el-select v-model="formInline.now_award.variety" >
                        <el-option label="实体物品" value="实体物品" />
                        <el-option label="系统称号" value="系统称号" />
                        <el-option label="碳积分" value="碳积分" />
                        <el-option label="优惠券" value="优惠券" />
                    </el-select>
                </el-form-item>
            </el-form>     
        </el-col> 
        </el-row> 
    <!-- 第二行 -->
        <el-row>   
        <el-col :span="11">   
            <el-form  :model="formInline">
                <el-form-item label="奖品名称">
                    <el-input v-model="formInline.now_award.name" />
                </el-form-item>
            </el-form>
        </el-col> 
        <el-col :span="2"/> 
        <el-col :span="11"> 
            <el-form  :model="formInline">
                <el-form-item label="奖品数量">
                    <el-input v-model="formInline.now_award.num"  type="number" min="1" oninput ="value=value.replace(/[^\d]/g,'')"/>
                </el-form-item>
            </el-form>    
        </el-col> 
        </el-row> 
    <!-- 第三行 -->
        <el-row>   
        <el-col :span="11">   
            <el-form  :model="formInline">
                <el-form-item label="对应碳积分">
                    <el-input v-model="formInline.now_award.credit" type="number" min="1" oninput ="value=value.replace(/[^\d]/g,'')"/>
                </el-form-item>
            </el-form>
        </el-col> 
        <el-col :span="2"/> 
        <el-col :span="11"> 
            <el-form  :model="formInline">
                <el-form-item label="商户编号">
                    <el-input placeholder="系统提供" disabled/>
                </el-form-item>
            </el-form>    
        </el-col> 
        </el-row>
    <!-- 第四行 -->
        <el-row>   
        <el-col :span="11">   
            <el-form  :model="formInline">
                <el-form-item label="提供日期">
                    <el-input v-model="formInline.now_award.fromdate" placeholder="系统提供" disabled/>
                </el-form-item>
            </el-form>
        </el-col> 
        <el-col :span="2"/> 
        <el-col :span="11"> 
            <el-form  :model="formInline">
                <el-form-item label="截止日期">
                    <!-- 日期选择器 拿下 -->
                    <el-date-picker
                        v-model="formInline.now_award.todate"
                        type="datetime"
                        placeholder="选择截止日期"
                        value-format="YYYY年MM月DD日hh:mm:ss" 
                    />
                </el-form-item>
            </el-form>    
        </el-col> 
        </el-row>
    <!-- 第五行 -->
     <el-form  :model="formInline">
        <el-form-item label="奖品内容">
            <el-input v-model="formInline.now_award.content" 
            type="textarea" />
        </el-form-item>
    </el-form>
    <!-- 确认按钮 -->
    <div class="dialog-foot">
        <el-button type="primary" @click="addDown" 
                >确认</el-button
                >
        </div>
    </el-dialog>
</template>

<script>
import {ElMessage,ElNotification} from 'element-plus'
import {Search,Upload} from '@element-plus/icons-vue'
import {markRaw,ref,reactive,onMounted} from 'vue';
import {getAllAwards,getAward,getMerchantAwards,deleteAward,addAward,updateAward} from '../../api/api'
import _ from 'lodash' //导入loadsh插件

export default {
    components:{     
        Search:markRaw(Search),
        Upload:markRaw(Upload)
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
        const currentPage=ref(1)
        const pageSize=ref(5)
        const handleChange=()=>{
            // console.log(currentPage.value)
            // console.log(tableData.arr[formInline.which_one])
        }
        //数据同步
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
        //数据更新
        function upda(){
            let dz=formInline.which_one;
            console.log(dz)
            updateAward({
                aid:tableData.arr[dz].aid,
                variety: tableData.arr[dz].variety, 
                num: tableData.arr[dz].num,
                name: tableData.arr[dz].name, 
                content: tableData.arr[dz].content, 
                credit: tableData.arr[dz].credit,
                todate: tableData.arr[dz].todate, 
                mid: tableData.arr[dz].mid,
                status: tableData.arr[dz].status
             })
            .then((res) => {
                console.log(tableData.arr[dz])
                console.log(res);
                sync()
            })
            .catch((err) => console.log(err));
        }
        //奖品增加
        const handleAdd=()=>{
            dialogVisible2.value=true;
            formInline.which_one=-1
            formInline.now_award={}
            
        }

        const addDown=()=>{
            addAward({
                variety: formInline.now_award.variety, 
                num: formInline.now_award.num,
                name: formInline.now_award.name, 
                content: formInline.now_award.content, 
                credit: formInline.now_award.credit,
                todate: formInline.now_award.todate 
             })
            .then((res) => {
                console.log(res);
                sync()
            })
            .catch((err) => console.log(err));
            console.log(formInline.now_award)
            dialogVisible2.value=false
            formInline.which_one=-1
            formInline.now_award={}
        }

        //奖品删除
        const handleDelete=(index)=>{

            formInline.which_one=index+(pageSize.value)*(currentPage.value-1)
            let delID=tableData.arr[formInline.which_one].aid
            console.log(delID)
            deleteAward({
                aid:delID
             })
            .then((res) => {
                console.log(res);
                sync()
            })
            .catch((err) => console.log(err));
        }

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
            upda()
            ElMessage({
                message: '信息编辑成功',
                type: 'success',
            })
        }
        
        //上下架处理
        const handleUpDown=(index)=>{
            formInline.which_one=index+(pageSize.value)*(currentPage.value-1)
            tableData.arr[formInline.which_one].status=tableData.arr[formInline.which_one].status==1? 0:1
            upda()
            ElMessage({
                message: tableData.arr[formInline.which_one].status==0?'下架成功':'上架成功',
                type: 'success',
            })
        }

        //编辑页面 被选中奖品
        const dialogVisible = ref(false)
        const dialogVisible2 = ref(false)
        const formInline = reactive({
            which_one:0,
            now_award:{}
        })
        
        
        return{searchItem,findGood,tableData,currentPage,pageSize,handleChange,handleEdit,addDown,
        dialogVisible,dialogVisible2,formInline,editDown,handleUpDown,handleAdd,handleDelete}


    },
}
</script>

<style>


</style>