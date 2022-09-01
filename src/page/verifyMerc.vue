<template>
  <div class="ordering">
    <!-- 搜索框 -->
    <div>
      <el-row class="searchInput">
        <el-col :span="5" />
        <el-col :span="11">
          <el-input
            placeholder="输入信息进行商户查找"
            v-model="searchItem.queryInfo"
            clearable
          />
        </el-col>
        <el-col :span="2">
          <el-select v-model="searchItem.selectInfo" placeholder="查询方式">
            <el-option
              v-for="item in searchItem.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button @click="findMerc">
            <el-icon>
              <search />
            </el-icon>
          </el-button>
        </el-col>
        <el-col :span="4" />
      </el-row>
    </div>
    <!-- 筛选按钮 -->
    <div>
      <el-button type="success" class="addAward" @click="getAllUnAuthenticatedMerc">
        筛选未审批的商户<el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
      <el-button type="primary" class="addAward" @click="getAllMerc">
        展示所有商户<el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </div>
    <!-- 奖品表格 -->
    <div class="table">
      <!-- 伪分页设计 芜湖 -->
      <el-table
        id="poolTable"
        :data="
          tableData.arr.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        style="width: 100%;"
        class="awa-tab"
        empty-text="未查询到相关数据"
      >
        <el-table-column prop="time" label="认证时间" min-width="150" />
        <el-table-column prop="mid" label="商户id" min-width="100" />
        <el-table-column prop="name" label="商户名称" min-width="100" />
        <!-- 状态栏 -->
        <el-table-column label="认证状态" min-width="180">
          <template #default="scope">
            <el-tag type="danger" v-if="scope.row.authenticated == '-1'">未认证</el-tag>
            <el-tag type="primary" v-else-if="scope.row.authenticated == '0'">认证中</el-tag>
            <el-tag type="success" v-else-if="scope.row.authenticated == '1'">已认证</el-tag>
            <el-tag type="warning" v-else-if="scope.row.authenticated == '2'">认证过期</el-tag>
            <el-tag type="info" v-else-if="scope.row.authenticated == '-2'">认证失败</el-tag>
          </template>
        </el-table-column>
        <!-- 操作栏 -->
        <el-table-column label="操作" min-width="150">
          <template #default="scope">
            <el-button size="small" @click="handleVerify(scope.$index)"
              >认证</el-button
            >


          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="tableData.arr.length"
        @current-change="handleChange"
        :hide-on-single-page="true"
        background
        :page-size="pageSize"
        v-model:current-page="currentPage"
      />
    </div>
  </div>
  <!-- 编辑视图 -->
  <el-dialog v-model="dialogVisible" title="商户认证" width="50%">
    <!-- 第一行 -->
    <el-row>
      <el-col :span="11">
        <div style="margin-top: 20px">商户id：
          <el-tag style="margin-right:50px; width:250px">{{formInline.now_merchant.mid}}</el-tag>

        </div>
      </el-col>
      <el-col :span="2" />
      <el-col :span="11">
        <div style="margin-top: 20px">商户名称：
          <el-tag style="margin-right:50px; width:250px">{{formInline.now_merchant.name}}</el-tag>

        </div>
      </el-col>
    </el-row>
    <!-- 第二行 -->
    <el-row>
      <el-col :span="11">
        <div style="margin-top: 20px">商户详情：
          <el-tag style="margin-right:50px; width:250px">{{formInline.now_merchant.info}}</el-tag>

        </div>
      </el-col>
      <el-col :span="2" />
      <el-col :span="11">
        <div style="margin-top: 20px">商户位置：
          <el-tag style="margin-right:50px; width:250px">{{formInline.now_merchant.location}}</el-tag>

        </div>
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-row>
     <div class="demo">商户许可证：
     </div>
    </el-row>
    <!-- 第四行 -->
    <el-row>
     <div class="demo-image__preview">

        <el-image
          style="width: 200px; height: 200px"
          :src="formInline.now_merchant.authentication"
          :preview-src-list="[formInline.now_merchant.authentication]"
          :initial-index="4"
          fit="cover"
        />
     </div>
    </el-row>

    <div class="dialog-foot">
      <el-button type="primary" @click="editSuccess">审核通过</el-button>
      <el-button type="primary" @click="editFail" margin-left="100px">审核失败</el-button>
    </div>
  </el-dialog>

</template>

<script>
import { ElMessage, ElNotification } from "element-plus";
import { Search} from "@element-plus/icons-vue";
import { markRaw, ref, reactive, onMounted } from "vue";
import {
  getAllUnAuthenticatedMerchants,
  getAllMerchants,
  addAward,
  checkAuthentication
} from "../../api/api";
import _ from "lodash"; //导入loadsh插件

export default {
  components: {
    Search: markRaw(Search),
  },
  setup() {
    //挂载
    onMounted(() => {
      console.log("mounted");
      sync();
    });
    //表格数据
    const tableData = reactive({
      arr: [],
    });
    //商品查找
    const searchItem = reactive({
      queryInfo: "",
      selectInfo: "",
      options: [
        {
          value: "商户id",
          label: "商户id",
        },
        {
          value: "商户名称",
          label: "商户名称",
        },
      ],
    });
    const findMerc = () => {
      var i = 0;
      var isSuccess = 0;
      var temp;
      if (searchItem.queryInfo == "") {
        sync();
        return;
      }
      if (searchItem.selectInfo == "商户id") {
        for(i=0;i<tableData.arr.length;i++){
          if(tableData.arr[i].mid == searchItem.queryInfo){
            isSuccess = 1;
            break;
          }
        }
        if(isSuccess){
          temp = tableData.arr[i];
          tableData.arr = [];
          tableData.arr[i] = temp;
        }else{
          tableData.arr = [];
        }
      } else if (searchItem.selectInfo == "商户名称") {
        for(i=0;i<tableData.arr.length;i++){
          if(tableData.arr[i].name == searchItem.queryInfo){
            isSuccess = 1;
            break;
          }
        }
        if(isSuccess){
          temp = tableData.arr[i];
          tableData.arr = [];
          tableData.arr[i] = temp;
        }else{
          tableData.arr = [];
        }
      } else {
        ElNotification({
          title: "注意！",
          message: "请选择查找模式",
          type: "warning",
        });
        return;
      }
    };
    //页码更换
    const currentPage = ref(1);
    const pageSize = ref(5);
    const handleChange = () => {
      // console.log(currentPage.value)
      // console.log(tableData.arr[formInline.which_one])
    };
    //数据同步
    function sync() {
      getAllMerchants({})
        .then((res) => {
          console.log(res);
          console.log(res.data.data);
          console.log(typeof res.data.data);
          tableData.arr = _.cloneDeep(res.data.data);
        })
        .catch((err) => console.log(err));
    }

    const addDown = () => {
      addAward({
        variety: formInline.now_merchant.variety,
        num: formInline.now_merchant.num,
        name: formInline.now_merchant.name,
        content: formInline.now_merchant.content,
        credit: formInline.now_merchant.credit,
        todate: formInline.now_merchant.todate,
      })
        .then((res) => {
          console.log(res);
          sync();
        })
        .catch((err) => console.log(err));
      console.log(formInline.now_merchant);
      dialogVisible2.value = false;
      formInline.which_one = -1;
      formInline.now_merchant = {};
    };

    //认证操作
    const handleVerify = (index) => {
      formInline.which_one = index + pageSize.value * (currentPage.value - 1);
      formInline.now_merchant = _.cloneDeep(tableData.arr[formInline.which_one]);
      if(formInline.now_merchant.authenticated==0) {
        dialogVisible.value = true;
        console.log("开始编辑");
        console.log(formInline.which_one);
        console.log(formInline.now_merchant);
      }else{
        switch(formInline.now_merchant.authenticated){
          case -2:ElMessage.error("该商户认证失败，请等待再次提交");break;
          case -1:ElMessage.error("该商户未提交认证，请等待提交");break;
          case 1:ElMessage.error("该商户已认证成功，操作无效");break;
          case 2:ElMessage.error("该商户认证过期，请等待其最新提交信息");break;
        }
      }
    };
    const editSuccess = () => {
      console.log("完成编辑");
      dialogVisible.value = false;
      checkAuthentication({
        mid: formInline.now_merchant.mid,
        isApproved: true
      }).then((res) => {
        if(res.data.code==200){
          ElMessage.success(res.data.message);
          dialogVisible.value = false;
          sync();
        }else{
          ElMessage.error(res.data.message);
          dialogVisible.value = false;
        }
      })
    };
    const editFail = () => {
      console.log("完成编辑");
      dialogVisible.value = false;
      checkAuthentication({
        mid: formInline.now_merchant.mid,
        isApproved: false
      }).then((res) => {
        if(res.data.code==200){
          ElMessage.success(res.data.message);
          dialogVisible.value = false;
          sync();
        }else{
          ElMessage.error(res.data.message);
          dialogVisible.value = false;
        }
      })
    };
    const getAllUnAuthenticatedMerc = () =>{
      getAllUnAuthenticatedMerchants({})
      .then((res) => {
          console.log(res);
          console.log(res.data.data);
          console.log(typeof res.data.data);
          tableData.arr = _.cloneDeep(res.data.data);
        })
            .catch((err) => console.log(err));
    }
    const getAllMerc = () =>{
      sync();
    }
    //编辑页面 被选中奖品
    const dialogVisible = ref(false);
    const dialogVisible2 = ref(false);
    const formInline = reactive({
      which_one: 0,
      now_merchant: {},
    });

    return {
      getAllUnAuthenticatedMerc,
      getAllMerc,
      editFail,
      searchItem,
      findMerc,
      tableData,
      currentPage,
      pageSize,
      handleChange,
      handleVerify,
      addDown,
      dialogVisible,
      dialogVisible2,
      formInline,
      editSuccess,
    };
  },
};
</script>

<style>
.demo{
  margin-top: 20px;
  margin-left: 200px;
}
.demo-image__preview{
  margin-top: 20px;
  margin-left: 200px;
}
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
