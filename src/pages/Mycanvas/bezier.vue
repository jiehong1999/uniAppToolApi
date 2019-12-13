<template>
    <view class="canvasBody">
        <scroll-view scroll-x="true">
            <view class="nav" >
                <view class="topNav" @click="goImg">
                    绘画图片
                </view>
                <view class="topNav" @click="getbezier">
                    三次方贝塞尔曲线
                </view>
            </view>
        </scroll-view>
        <view class="cover" :style="'height:'+bHeight+'px'">
            <canvas style="width:100%;height:100%;" canvas-id="firstCanvas2" @touchstart="touchstarts" @touchmove="touchmoves"></canvas>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                bHeight:document.body.scrollHeight,
                canvasId:"firstCanvas2",
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
                arcX:0,
                arcY:0,
            }
        },
        onShow(){
            this.getbezier();
        },
        methods: {
            //去画图片
            goImg(){
                uni.navigateTo({url:"/pages/Mycanvas/canvas"})
            },
            //三次方贝塞尔曲线
            getbezier(){
                const ctx = uni.createCanvasContext(this.canvasId)
                ctx.beginPath()
                ctx.arc(10, 10, 2, 0, 2 * Math.PI);
                ctx.setFillStyle('red');
                ctx.fill();
                ctx.moveTo(this.P0x, this.P0y);
                ctx.bezierCurveTo(this.P1x, this.P1y, this.P2x, this.P2y, this.P3x, this.P3y);
                ctx.setStrokeStyle('black');
                ctx.stroke();
                ctx.draw();
                this.forTime();
            },
            //计时器渲染
            forTime(){
                const ctx = uni.createCanvasContext(this.canvasId);
                this.ct=this.ct+1;
                this.t=this.ct/100;

                if(this.ct>100){
                    // cancelAnimationFrame(this.time);
                    this.t=0;
                    this.ct=0;
                    // return
                }
                var x =this.easeinOutExpoX(this.t,this.P0x,this.P1x,this.P2x,this.P3x);
                var y =this.easeinOutExpoY(this.t,this.P0y,this.P1y,this.P2y,this.P3y);
                this.arcX=x;
                this.arcY=y;
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 5 * Math.PI);
                ctx.setFillStyle('red')
                ctx.fill();
                ctx.moveTo(this.P0x, this.P0y);
                ctx.bezierCurveTo(this.P1x, this.P1y, this.P2x, this.P2y, this.P3x, this.P3y);
                ctx.setStrokeStyle('black');
                ctx.stroke();
                ctx.draw();
                this.time= requestAnimationFrame(()=>{
                    this.forTime();
                });

            },
            //计算三次方贝塞尔曲线X值
            easeinOutExpoX(t,P0x,P1x,P2x,P3x){
                return  P0x*(1-t)**3+3*P1x*t*(1-t)**2+3*P2x*t**2*(1-t)+P3x*t**3;
            },
            //计算三次方贝塞尔曲线Y值
            easeinOutExpoY(t,P0y,P1y,P2y,P3y){
                return P0y*(1-t)**3+3*P1y*t*(1-t)**2+3*P2y*t**2*(1-t)+P3y*t**3;
            },
            touchmoves(e){
                // console.log(e.touches[0].x);
            },
            touchstarts(e){
                var x=e.touches[0].x;
                var y=e.touches[0].y;
                if((x>this.arcX-5&&x<this.arcX+5)&&(y>this.arcY-5&&y<this.arcY+5)){
                    uni.showToast({title:"点中了",icon:"none"});
                    cancelAnimationFrame(this.time);
                }else{

                }

            }
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
        background: #ffffff;
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
