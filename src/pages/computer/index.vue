<template>
    <view class="computerList">
        <view class="header">
            <view class="box_List" v-for="(item,index) in groupLis" :key="index" @click="go(item.url)">
                <view class="title">
                    {{item.title}}
                </view>
                <view class="icon">
                    <img :src="item.img">
                </view>
            </view>
        </view>
        <view class="cover" :style="'height:'+bHeight+'px'">
            <canvas style="width:100%;height:100%;" canvas-id="firstCanvas"></canvas>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                groupLis:[
                    {title:"翻译",url:"/pages/fanYi/fanYi",img:"../../static/img/index/Live2D.png"},
                    {title:"翻译",url:"/pages/fanYi/fanYi",img:"../../static/img/index/Live2D.png"},
                ],
                bHeight:document.body.scrollHeight-173,
            }
        },
        onShow() {
        },
        onReady(){
            var context = uni.createCanvasContext('firstCanvas');
        },
        methods: {
            go(url){
                 uni.navigateTo({url:url});
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
        background: #333333;
    }
</style>
