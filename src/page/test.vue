<template>
    <div class="ordering">
      <div>
        <el-row>
          <el-col :span="16" />
          <el-col :span="5">
            <el-select
              v-model="xxx.cityChoice"
              placeholder="请选择城市"
              @change="handleChange"
            >
              <el-option
                v-for="item in xxx.cityList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-button @click="test">test</el-button>
          </el-col>
        </el-row>
      </div>
      <svg id="mobile-svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <g id="g-box" font-size="10"></g>
      </svg>
    </div>
  </template>
  
  <script>
  import $ from "jquery";
  
  
  import { getAllSubways } from "../../api/api";
  import { onMounted, reactive, ref } from "vue";
  import { svgPanZoom } from "svg-pan-zoom";
  
  import _ from "lodash"; //导入loadsh插件
  
  import {svg} from "../lib/limitTextNum.js";
  import "../lib/jquery.js";
  import "../lib/svg-pan-zoom.js";
  import "../lib/hammer.min.js";
  
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
        cityList: [
          {
            value: 131,
            label: "北京",
          },
          {
            value: 289,
            label: "上海",
          },
        ],
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
            draw();
          })
          .catch((err) => console.log(err));
      }
      const imgSrc = null;
      //绘制地铁图
      function draw() {
        var l = xxx.subInfo.l;
        //地铁线路
        for (var i = 0; i < l.length; i++) {
          //console.log(i);
          var { l_xmlattr, p } = l[i];
          var { lb, loop, uid } = l_xmlattr;
          // if (!uid) { //暂未开通
          //     break;
          // }
          var dStr = ""; //地铁线路点
          var isLb = false; //是否圆润拐点
          for (var j = 0; j < p.length; j++) {
            var { x, y, lb, st, ex, rc } = p[j].p_xmlattr;
            if (isLb) {
              isLb = false;
              dStr += x + " " + y + " ";
            } else {
              if (rc) {
                isLb = true;
                dStr += "Q" + x + " " + y + " ";
              } else {
                if (j == 0) {
                  dStr += "M" + x + " " + y + " ";
                } else {
                  dStr += "L" + x + " " + y + " ";
                }
                if (j == p.length - 1) {
                  if (loop) {
                    dStr += "Z";
                  }
                }
              }
            }
          }
  
          var { lb, lc, lbx, lby } = l_xmlattr[0];
          //console.log("lc-------------" + lc);
          var path = $.svg("path").appendTo("#g-box");
          //var path = $.load("path").appendTo("#g-box");
          if (lc) {
            var lc_ = lc.split("x")[1];
          }
          path
            .attr({
              d: $.trim(dStr),
              lb: lb,
            })
            .css("stroke", "#" + lc_);
          var text = $.svg("text")
            //var text = $.load("text")
            .appendTo("#g-box")
            .html(lb)
            .addSvgClass("subway-name");
          if (lc) {
            var lc_ = lc.split("x")[1];
          }
          text
            .attr({
              x: lbx - 10,
              y: lby + 15,
            })
            .css("fill", "#" + lc_);
        }
  
        var repeatStr = ""; //uid字符串判断重复点
        for (var i = 0; i < l.length; i++) {
          var { l_xmlattr, p } = l[i];
          // if (!l_xmlattr.uid) { //暂未开通
          //     break;
          // }
          for (var j = 0; j < p.length; j++) {
            var { x, y, rx, ry, lb, ex, rc, st, uid } = p[j].p_xmlattr;
            if (st) {
              if (ex) {
                if (!repeatStr.includes(uid)) {
                  var image = $.svg("image").appendTo("#g-box");
                  // var image = $.load("image").appendTo("#g-box");
                  image.attr({
                    width: "20",
                    height: "20",
                    x: x - 10,
                    y: y - 10,
                  });
                  if (image.length) image[0].href.baseVal = imgSrc;
                }
              } else {
                var circle = $.svg("circle").appendTo("#g-box");
                // var circle = $.load("circle").appendTo("#g-box");
                if (lc) {
                  var lc_ = l_xmlattr[0].lc.split("x")[1];
                }
                circle
                  .attr({
                    cx: x,
                    cy: y,
                    r: 4,
                  })
                  .css("stroke", "#" + lc_);
              }
              if (!repeatStr.includes(uid)) {
                var text = $.svg("text")
                  // var text = $.load("text")
                  .appendTo("#g-box")
                  .html(lb)
                  .addSvgClass("station-name");
                text.attr({
                  x: x + rx + 2,
                  y: y + ry + 12,
                });
                repeatStr += uid;
              }
            }
          }
        }
  
        // var eventsHandler = {
        //   haltEventListeners: [
        //     "touchstart",
        //     "touchend",
        //     "touchmove",
        //     "touchleave",
        //     "touchcancel",
        //   ],
        //   init: function (options) {
        //     var instance = options.instance,
        //       initialScale = 1,
        //       pannedX = 0,
        //       pannedY = 0;
        //     this.hammer = Hammer(options.svgElement, {
        //       inputClass: Hammer.SUPPORT_POINTER_EVENTS
        //         ? Hammer.PointerEventInput
        //         : Hammer.TouchInput,
        //     });
        //     this.hammer.get("pinch").set({
        //       enable: true,
        //     });
        //     this.hammer.on("doubletap", function (ev) {
        //       instance.zoomIn();
        //     });
        //     this.hammer.on("panstart panmove", function (ev) {
        //       if (ev.type === "panstart") {
        //         pannedX = 0;
        //         pannedY = 0;
        //       }
        //       instance.panBy({
        //         x: ev.deltaX - pannedX,
        //         y: ev.deltaY - pannedY,
        //       });
        //       pannedX = ev.deltaX;
        //       pannedY = ev.deltaY;
        //     });
        //     this.hammer.on("pinchstart pinchmove", function (ev) {
        //       if (ev.type === "pinchstart") {
        //         initialScale = instance.getZoom();
        //         instance.zoomAtPoint(initialScale * ev.scale, {
        //           x: ev.center.x,
        //           y: ev.center.y,
        //         });
        //       }
        //       instance.zoomAtPoint(initialScale * ev.scale, {
        //         x: ev.center.x,
        //         y: ev.center.y,
        //       });
        //     });
        //     options.svgElement.addEventListener("touchmove", function (e) {
        //       e.preventDefault();
        //     });
        //   },
        //   destroy: function () {
        //     this.hammer.destroy();
        //   },
        // };
  
        window.panZoom = svgPanZoom("#mobile-svg", {
          zoomEnabled: true,
          controlIconsEnabled: false,
          fit: 1,
          center: 1,
          // customEventsHandler: eventsHandler,
        });
  
        alert("接口调用成功！");
      }
      const test = () => {
        console.log(xxx.cityChoice);
      };
      return { xxx, test, handleChange };
    },
  };
  </script>
  
  <style>
  
  </style>
  