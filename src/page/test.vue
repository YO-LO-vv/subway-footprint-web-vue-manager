<template>
    <div id="home" class="ordering">
      <section id="top-section">
        <label for="">svg路径：</label>
        <el-input v-model="svgPath" size="small"></el-input>
        <el-button type="primary" size="small" @click='loadSvgData()'>加载</el-button>
      </section>
      <article>
        <!-- svg图形显示容器 -->
        <section id="svg-container">
        </section>
        <!-- svg元件鼠标悬浮提示框 -->
        <div id="svgTipBox" v-show="svgTipBoxVisible && !svgControlBoxVisible"
        v-bind:style="{ left: svgTipBoxPositionX + 'px', top: svgTipBoxPositionY + 'px' }">
          {{svgTipBoxData}}
        </div>
      </article>
    </div>
  </template>
   
  <script>
  import axios from 'axios'
   
  export default {
    name: 'Home',
    data () {
      return {
        // svgPath: String.raw`E:\subway-footprint-web-vue\public\assets\test2.svg`, //svg文件路径
        svgPath: "", //svg文件路径
        svgData:'',  //svg文件内容
        svgTipBoxData:'',  //svg元件鼠标悬浮提示框内容
        svgTipBoxVisible:false, //svg元件鼠标悬浮提示框显示状态
        svgTipBoxPositionX:0,  //svg元件鼠标悬浮提示框x坐标
        svgTipBoxPositionY:0,  //svg元件鼠标悬浮提示框y坐标
      }
    },
    // 由于svg上添加的鼠标事件无法直接调用vue里的methods方法，需要将这些方法绑定到window下面，提供给外部调用
    async mounted() {
      // 将svgClick方法绑定到window下面，提供给外部调用
      window["handleClick"] = (evt, id) => {
        this.svgClick(evt, id);
      };
      // 将svgMouseOver方法绑定到window下面，提供给外部调用
      window["handleMouseOver"] = (evt, id) => {
        this.svgMouseOver(evt, id);
      };
      // 将svgMouseMove方法绑定到window下面，提供给外部调用ping 20.
      window["handleMouseMove"] = (evt, id) => {
        this.svgMouseMove(evt, id);
      };
      // 将svgMouseOut方法绑定到window下面，提供给外部调用
      window["handleMouseOut"] = (evt, id) => {
        this.svgMouseOut(evt, id);
      };
    },
    created() {
    },
    methods:{
      //加载按钮点击
      loadSvgData() {
        console.log("da")
        // ajax请求数据，并携带参数
        axios.get(this.svgPath)
         .then(response => {
           console.log(response.data)
           // 将svg平面图显示在制定容器中
           var svgContainer = document.getElementById('svg-container');
           svgContainer.innerHTML = response.data;
           // 遍历svg里面的元素，自动添加鼠标事件
           this.addMouseEvent(svgContainer);
         }, err => {
             console.log(err)
         })
         .catch((error) => {
             console.log(error)
         })
      },
      // 遍历svg里面的元素，自动添加鼠标事件
      addMouseEvent(parent) {
        for (var i = 0; i < parent.childNodes.length; i++) {   //循坏svg里面的元素
          var child = parent.childNodes[i];
          // 判断是不是g元素，并且具有id值，是的话，就添加鼠标事件
          if (child.tagName == 'g' && child.id != null && child.id.length > 0
           && child.id.indexOf("PD_")==0) {
            console.log(child.tagName + "：" + child.id);
            child.setAttribute("onclick", "handleClick(evt,'"+child.id+"')");
            child.setAttribute("onmouseover", "handleMouseOver(evt,'"+child.id+"')");
            child.setAttribute("onmousemove", "handleMouseMove(evt,'"+child.id+"')");
            child.setAttribute("onmouseout", "handleMouseOut(evt,'"+child.id+"')");
          }
          //继续递归遍历子元素
          this.addMouseEvent(child);
        }
      },
      // svg图元件点击事件
     svgClick(evt, id) {
        console.log(evt);
        alert(id);
     },
     // svg图元件鼠标移入事件
     svgMouseOver(evt, id) {
       console.log("svgMouseOver");
       console.log(evt);
       this.svgTipBoxData = id;
       this.svgTipBoxVisible = true;
     },
     // svg图元件鼠标移动事件
     svgMouseMove(evt, id) {
       console.log("svgMouseMove");
       console.log(evt);
       this.svgTipBoxPositionX = evt.pageX;
       this.svgTipBoxPositionY = evt.pageY - 50;
     },
     // svg图元件鼠标移出事件
     svgMouseOut(evt, id) {
       console.log("svgMouseOut");
       console.log(evt);
       this.svgTipBoxVisible = false;
     },
    }
  }
  </script>
   
  <style scoped>
    #home {
      padding: 22px 34px 22px 34px;
    }
    #top-section {
      width: 100%;
      margin-bottom: 20px;
    }
    #top-section label {
      font-size: 14px;
      line-height: 32px;
    }
    #top-section .el-input {
      margin-right: 20px;
      width: 200px;
    }
    #svgTipBox {
      position: absolute;
      padding: 10px;
      background: rgba(0, 0, 0, .8);
      color: #ffffff;
    }
    #svgControlBox {
      position: absolute;
    }
  </style>