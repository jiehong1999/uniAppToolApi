<template>
    <view class="canvasBody">
        <scroll-view scroll-x="true">
            <view class="nav" >
                <view class="topNav" @click="saveImg">
                    保存了当前画布
                </view>
                <view class="topNav" @click="getImageData">
                    生成粒子
                </view>
                <view class="topNav" @click="cleanCover">
                    清除画布
                </view>
                <view class="topNav" @click="coverImg">
                    绘画图片
                </view>
                <view class="topNav" @click="animation">
                    执行动画
                </view>
                <view class="topNav" @click="getrichTextData">
                    标签粒子
                </view>
                <view class="topNav" @click="forTime">
                    三次方贝塞尔曲线动画
                </view>
                <view class="topNav" @click="gobezier">
                    去画三次方贝塞尔曲线
                </view>
            </view>
        </scroll-view>
        <view class="cover" :style="'height:'+bHeight+'px'">
            <canvas style="width:100%;height:100%;" canvas-id="firstCanvas" @touchstart="touchmoves"></canvas>
        </view>
        <view class="richText">
            <rich-text type="text" style="width: 100%;height: 100%" :nodes="richTextData">

            </rich-text>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                // bHeight:document.body.scrollHeight,
                bHeight:500,
                canvasId:"firstCanvas",
                //图片绘画x位置
                imgX:0,
                //图片绘画y位置
                imgY:0,
                //图片绘画宽度
                imgWidth:150,
                //图片绘画高度
                imgHeigt:150,
                //粒子数据
                curr_particles:[],
                //定时器
                requestId:null,
                contexts:uni.createCanvasContext("firstCanvas"),
                richTextData:"",
                animationData:"",

                P0x:10,
                P0y:10,
                P1x:20,
                P1y:100,
                P2x:200,
                P2y:100,
                P3x:200,
                P3y:50,
                ct:0,
                t:0,
                time:null,
            }
        },
        onReady(){
            var context = uni.createCanvasContext(this.canvasId);
            //画图片的数据
            context.drawImage("../../static/img/index/Live2D.png", this.imgX, this.imgY,this.imgWidth,this.imgHeigt);
            //画出来
            context.draw();
            // //不清除原来的绘画并且绘画出新的绘画
            // // context.draw(true);

        },
        methods: {
            touchmoves(){
                //获取画布的数据

            },
            //获取区域绘画数据
            getImageData(){
                var that =this;
                uni.canvasGetImageData({
                    canvasId:that.canvasId,
                    x: that.imgX,
                    y: that.imgY,
                    width: that.imgWidth,
                    height: that.imgHeigt,
                    success(res) {
                        //获取当前画布数据
                        console.log("获取当前画布的数据--高度"+res.width);
                        console.log("获取当前画布的数据--宽度"+res.height);
                        console.log(res);
                        //执行绘画粒子函数并将值穿过去
                        that.calculate(res);
                    },
                    fail(res){
                        console.log(res.errMsg);
                    }
                });
            },
            //粒子绘画函数
            calculate(data){
                var that =this;
                //只保存图片多少高宽度像素值
                //这里默认赋值
                var cols=this.imgWidth,rows=this.imgHeigt;
                var s_width =parseInt(data.height/cols);
                var s_height=parseInt(data.height/rows);
                //存储rgba四个值的索引
                var Rij = 0, Gij = 0, Bij = 0, Aij = 0;
                var datas=data.data;
                //保存粒子数据数据
                var particles=[];
                //循环高宽的xy位置像素
                for(var i=1;i<=cols;i++){
                    for(var j=1;j<=rows;j++){
                            Rij = [(j*s_height-1)*data.width+(i*s_width)]*4;
                            Gij = [(j*s_height-1)*data.width+(i*s_width)]*4 + 1;
                            Bij = [(j*s_height-1)*data.width+(i*s_width)]*4 + 2;
                            Aij = [(j*s_height-1)*data.width+(i*s_width)]*4 + 3;
                        //判断抓a值数据透明度不为零的都抓
                        if(datas[Aij]>0){
                            //生成粒子的位置和颜色数据
                            var num= (parseInt(Math.random()*(20-(-20)+1)+(-20),10))*10;
                            var particle={
                                x:that.imgX+i*s_width+(Math.random() -0.5)*5,//x值的位置
                                y:that.imgY+j*s_height+(Math.random() -0.5)*5,//y值的位置
                                fillStyle:'rgba('+datas[Rij]+','+datas[Gij]+','+datas[Bij]+','+datas[Aij]+')',//颜色
                                Px:(that.imgX+i*s_width+(Math.random() -0.5)*5)+num,
                                Py:(that.imgY+j*s_height+(Math.random() -0.5)*5)+num,
                            }
                            //把别个粒子存到数组
                            particles.push(particle);
                        }
                    }
                }
                that.curr_particles=particles
                var len =particles.length,contexts=uni.createCanvasContext(this.canvasId);
                //循环粒子效果
                for(var i=0;i<len;i++){
                    contexts.fillStyle=particles[i].fillStyle;
                    contexts.fillRect(particles[i].x,particles[i].y,1,1);
                }
                contexts.draw();
            },
            //保存画布内容存储为图片
            saveImg(){
                console.log("保存了当前画布");
                uni.canvasToTempFilePath({
                    x: this.imgX,
                    y: this.imgY,
                    width: this.imgWidth,
                    height: this.imgHeigt,
                    destWidth: 100,
                    destHeight: 100,
                    canvasId: this.canvasId,
                    success: function(res) {
                        console.log(res.tempFilePath)
                    }
                })
            },
            //清除画布函数
            cleanCover(){
                var contexts=uni.createCanvasContext(this.canvasId);
                contexts.draw();
            },
            //绘画图片函数
            coverImg(){
                var context = uni.createCanvasContext(this.canvasId);
                //画图片的数据
                context.drawImage("../../static/img/index/Live2D.png", this.imgX, this.imgY,this.imgWidth,this.imgHeigt);
                //画出来
                context.draw();
                // //不清除原来的绘画并且绘画出新的绘画
                // // context.draw(true);
            },
            //粒子动画
            animation(){
                for(var i=0;i<this.curr_particles.length;i++){
                    if(this.curr_particles[i].y<this.imgHeigt){
                        this.curr_particles[i].y=this.curr_particles[i].y+0.5;
                        this.contexts.fillStyle=this.curr_particles[i].fillStyle;
                        this.contexts.fillRect(this.curr_particles[i].x,this.curr_particles[i].y,1,1);
                    }else{
                        cancelAnimationFrame(this.requestId);
                    }

                }
                this.contexts.draw();
                if(this.curr_particles[this.curr_particles.length-1].y<this.imgHeigt){
                    this.requestId=requestAnimationFrame(()=>{
                        this.animation();
                    })
                }

            },
            easeinOutExpo(t,b,c,d){
                t/=d/2;
                if(t<1)return c/2 * Math.pow(2,10*(t-1))+b;
                t--;
                return c/2*(-Math.pow(2,-10*t)+2)+b;
            },
            //标签输出粒子
            getrichTextData(){
                var data="<div style='position: relative;'>";
                for(var i=0;i<this.curr_particles.length;i++){
                    data+="<div style='position: absolute;left:"+this.curr_particles[i].x+"px;top:"+this.curr_particles[i].y+"px;background:"+this.curr_particles[i].fillStyle+";width:1px;height:1px'></div>"
                    // this.contexts.fillRect(this.curr_particles[i].x,this.curr_particles[i].y,1,1);
                }
                this.richTextData=data+"</div>";
            },
            //去画三次方贝塞尔曲线
            gobezier(){
                uni.navigateTo({url:"/pages/Mycanvas/bezier"})
            },

            //三次方贝塞尔曲线动画
            forTime(){
                const ctx = uni.createCanvasContext(this.canvasId);
                this.ct=this.ct+1;
                this.t=this.ct/100;
                if(this.ct>100){
                    cancelAnimationFrame(this.time);
                    this.t=0;
                    this.ct=0;
                    return
                }
                for(var i=0;i<this.curr_particles.length;i++){
                    this.P1x=this.curr_particles[i].Px;
                    this.P2y=this.curr_particles[i].Py;
                    var x =this.easeinOutExpoX(this.curr_particles[i].x,this.t,this.P0x,this.P1x,this.P2x,this.P3x);
                    var y =this.easeinOutExpoY(this.curr_particles[i].y,this.t,this.P0y,this.P1y,this.P2y,this.P3y);
                    ctx.fillStyle=this.curr_particles[i].fillStyle;
                    ctx.fillRect(x,y,1,1);
                }

                ctx.draw();
                this.time= requestAnimationFrame(()=>{
                    this.forTime();
                });

            },
            //计算三次方贝塞尔曲线X值
            easeinOutExpoX(x,t,P0x,P1x,P2x,P3x){
                P0x=0;
                return P0x*(1-t)**3+3*P1x*t*(1-t)**2+3*P2x*t**2*(1-t)+P3x*t**3+x;
            },
            //计算三次方贝塞尔曲线Y值
            easeinOutExpoY(y,t,P0y,P1y,P2y,P3y){
                P0y=0;
                return P0y*(1-t)**3+3*P1y*t*(1-t)**2+3*P2y*t**2*(1-t)+P3y*t**3+y;
            },
        }
    }
</script>

<style scoped>
    uni-page-body{
        height:100%;
    }
    .computerList{
        width:100%;
        height:100%;
        font-size: 15px;
    }
    .header{
        border-bottom: 1px solid #c0c0c0;
    }
    .box_List{
        display: inline-block;
        width: 100px;
        height: 100px;
        border: 1px solid #c0c0c0;
        background: rgba(67, 149, 255, 0.7);
        cursor: pointer;
        margin: 10px;
        border-radius:3px;
    }
    .box_List .title{
        line-height: 25px;
        font-size: 15px;
        text-align: center;
        color: #ffffff;
    }
    .box_List .icon{
        margin: auto;
        width: 70px;
        height: 70px;
    }
    .icon img{
        width: 100%;
        height: 100%;
    }
    .cover{
        height: 100%;
        width: 100%;
        background: #333333;
    }
    .canvasBody{
    }
    .nav{
        background: rgba(255,255,255,0.7);
        height: 40px;
        width: 100%;
        display: -webkit-box;
    }
    .topNav{
        line-height: 35px;
        text-align: center;
        font-size: 14px;
        padding: 5px;
    }
    .richText{
        width: 100%;
        height: 500px;
        background: #efefef;
    }
</style>
