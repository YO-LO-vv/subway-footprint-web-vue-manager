<template>
<div class="ordering">
  <div class="boxshow" v-if="hideFlag">
    <div class="qrcode" ref="qrcodeContainer"></div>
  </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2' // 引入qrcode
import { stringify } from 'qs'
export default {
   data(){
    return{
        name: 'test',
  deliveryCode:'',
  hideFlag:true,
    }
   } ,
  
   props: {
    QRCodetext: {
      type: String,//类型限定
      default: '' //默认
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.qrcode()
    })
    if(this.timer){
        clearInterval(this.timer)
    }
    else{
        this.timer= setInterval(()=>{
            this.qrcode(new Date().getTime())
            },3000
        )
    }
  },
  unmounted(){
    clearInterval(this.timer)
  },
    
  methods: {
    
    qrcode(time) {
    if(this.$refs.qrcodeContainer) this.$refs.qrcodeContainer.innerHTML = ""
    this.deliveryCode='123'+time
      let qrcode = new QRCode(this.$refs.qrcodeContainer, {
        width: 100,// 二维码的宽
        height: 100,// 二维码的高
        
        text: this.QRCodetext ? this.QRCodetext : "https://thelittlestar.cn:8088/scanSuccess/"+this.deliveryCode, // 二维码的内容
        colorDark: '#000',// 二维码的颜色
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.H
      })
      this.initWebSocket();
    },
     initWebSocket(){ //初始化websocket
                if(typeof(WebSocket) === "undefined"){
                    alert("您的浏览器不支持socket")
                }else {
                    const wsuri = "wss://thelittlestar.cn:8088/websocket/"+this.deliveryCode;
                    this.websock = new WebSocket(wsuri);
                    this.websock.onmessage = this.websocketonmessage;
                    this.websock.onopen = this.websocketonopen;
                    this.websock.onerror = this.websocketonerror;
                    this.websock.onclose = this.websocketclose;
                }
            },
            websocketonopen(){ //连接建立之后执行send方法发送数据
                console.log("websocket连接成功")
                this.websocketsend("你在吗？？")
                //alert("成功");
            },
            websocketonerror(){//连接建立失败重连
                this.initWebSocket();
            },
            websocketonmessage(e){ //数据接收
                console.log("收到消息："+e.data);
                //只要接收到消息就置灰二维码
                this.hideFlag=false;
                if(this.timer){
                    clearInterval(this.timer)
                }
                alert("二维码已被扫描");
            },
            websocketsend(Data){//数据发送
                this.websock.send(Data);
            },
            websocketclose(e){  //关闭
                console.log('websocket断开连接',e);
                //alert("失败");
            },
  }
}
</script>
