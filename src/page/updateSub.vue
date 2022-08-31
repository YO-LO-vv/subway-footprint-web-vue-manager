<template>
  <div id="dz1">
    <div>
      <el-row>
        <el-col :span="21" />
        <el-col :span="3">
          <el-button @click="test">更新地铁图</el-button>
        </el-col>
      </el-row>
    </div>
    <div id="foot">
      <iframe
        src="/static/xxx.html"
        id="iFrameC"
        name="myiframe"
        frameborder="0"
        width="100%"
        scrolling="no"
        style="min-height: 500px;"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { getAllSubways } from "../../api/api";
import { onMounted, reactive, ref } from "vue";
import _ from "lodash"; //导入loadsh插件

export default {
  setup() {
    //挂载
    onMounted(() => {
      console.log("mounted");
      //getSub(131);
    });
    //城市选择
    const xxx = reactive({
      subInfo: {},
      cityChoice: null,
    });
    const handleChange = () => {
      console.log(xxx.cityChoice);
      getSub(xxx.cityChoice);
    };
    //获取地铁数据
    function getSub(cityCode) {
      getAllSubways({
        code: cityCode,
      })
        .then((res) => {
          console.log(res);
          xxx.subInfo = _.cloneDeep(res.data);
          console.log(xxx.subInfo);
        })
        .catch((err) => console.log(err));
    }
    const imgSrc = null;

    const test = () => {
      console.log(xxx.cityChoice);
    };
    return { xxx, test, handleChange };
  },
};
</script>

<style>
#dz1 {
  background-color:white;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  padding: 10px 0;
  margin: 0 auto;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  bottom: 0px;
}
#iFrameC{
  height: 100%;
}
#foot{
  height: 100%;
}
</style>
