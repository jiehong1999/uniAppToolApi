<template>
    <view class="fanyi" @click="clean">
        <view class="topNav">
            <view class="NavButton actionButton">String</view>
            <view class="NavButton" @click="goMap">Map单选</view>
            <view class="NavButton" @click="goSelection">Map多选</view>
        </view>
        <view class="setVal">
            <textarea placeholder-style="color:#dadada" maxlength="-1" placeholder="String数据" @blur="resApi" v-model="setVal"/>
            <view class="select1" v-if="show1">
                <view class="selectVal"  v-for="(item,index) in langList" :key="index" @click.stop="tabLangs1(item,index)">
                    {{item.name}}
                </view>
            </view>
        </view>
        <view class="tabLang">
            <view class="tabconten">
                <view class="bLang" @click.stop="show1=!show1">
                    {{langList[Langindex1].name}}
                </view>
                翻译==>
                <view class="bLang" style="float: right" @click.stop="show2=!show2">
                    {{langList[Langindex2].name}}
                </view>
            </view>
        </view>
        <view class="getVal">
            <text selectable="true">
                <rich-text type="text" class="getValtext" :nodes="getVal"></rich-text>
            </text>
            <view class="select2" v-if="show2">
                <view class="selectVal"  v-for="(item,index) in langList" :key="index" @click.stop="tabLangs2(item,index)">
                    {{item.name}}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data(){
            return{
                langList:[
                    {uid:'zh',name:'中文'},
                    {uid:'en',name:'英语'},
                    {uid:'yue',name:'粤语'},
                    {uid:'wyw',name:'文言文'},
                    {uid:'jp',name:'日语'},
                    {uid:'kor',name:'韩语'},
                    {uid:'fra',name:'法语'},
                    {uid:'spa',name:'西班牙语'},
                    {uid:'th',name:'泰语'},
                    {uid:'ara',name:'阿拉伯语'},
                    {uid:'ru',name:'俄语'},
                    {uid:'pt',name:'葡萄牙语'},
                    {uid:'de',name:'德语'},
                    {uid:'it',name:'意大利语'},
                    {uid:'el',name:'希腊语'},
                    {uid:'nl',name:'荷兰语'},
                    {uid:'pl',name:'波兰语'},
                    {uid:'bul',name:'保加利亚语'},
                    {uid:'est',name:'爱沙尼亚语'},
                    {uid:'dan',name:'丹麦语'},
                    {uid:'fin',name:'芬兰语'},
                    {uid:'cs',name:'捷克语'},
                    {uid:'rom',name:'罗马尼亚语'},
                    {uid:'slo',name:'斯洛文尼亚语'},
                    {uid:'swe',name:'瑞典语'},
                    {uid:'hu',name:'匈牙利语'},
                    {uid:'cht',name:'繁体中文'},
                    {uid:'vie',name:'越南语'},
                    ],
                Langindex1:0,
                Langindex2:1,
                show1:false,
                show2:false,
                from:"",
                to:"",
                getVal:"",
                setVal:"",
            }
        },
        onShow(){
            this.from=this.langList[this.Langindex1].uid;
            this.to=this.langList[this.Langindex2].uid;
            this.setVal="我爱你";
            console.log(this.from);
            console.log(this.to);
        },
        methods:{
            //关闭下拉选项
            clean(){
                this.show1=false;
                 this.show2=false;
            },
            //第一个下拉选项点击触发函数
            tabLangs1(val,index){
                this.Langindex1=index;
                this.show1=false;
                this.from=val.uid;
                console.log(this.from);
            },
            //第二个下拉选项点击触发函数
            tabLangs2(val,index){
                this.Langindex2=index;
                this.show2=false;
                this.to=val.uid;
                console.log(this.to);
                if(!this.setVal||this.setVal==""){
                    console.log("没有翻译内容")
                    return;
                }else{
                    this.resApi();
                }
            },
            //请求API函数
            resApi(){
                uni.showToast({title:'功能暂未开放',icon:"none"});
                return;
                if(!this.setVal||this.setVal==""){
                    console.log("没有翻译内容")
                    return;
                }
                var p={val:this.setVal, from:this.from, to:this.to};
                uni.request({
                    url: 'http://47.98.241.180:8089/fanYiApiString',
                    data:p,
                    method:'POST',

                    header: {
                        'Content-type': 'application/json',
                        'Content-type':'application/x-www-form-urlencoded'
                    },
                    dataType:'json',
                    success: (res) => {
                        if(res.data){
                            this.getVal =res.data;
                        }else{
                            uni.showToast({title:'系统错误',icon:"none"})
                        }
                    }
                });
            },
            goMap(){
                uni.navigateTo({url:"/pages/fanYi/fanyiMap"})
            },
            goSelection(){
                uni.navigateTo({url:"/pages/fanYi/fanyiSelection"})
            }
        }
    }
</script>

<style scoped>
    .topNav{
        width:99%;
        background: #fffff;
    }
    .NavButton{
        width: 100px;
        text-align: center;
        cursor: pointer;
        line-height: 20px;
        padding: 10px 1px;
        display: inline-block;

    }
    .actionButton{
        background: #4395ff;
        color: #ffffff;
    }
    .fanyi{
        width: 100%;
        background-color: #efefef;
        font-size: 15px;
        overflow: hidden;
    }
    .setVal{
        width: 39%;
        background-color: #ffffff;
        border: 1px #4395ff solid;
        min-height: 600px;
        float: left;
        position: relative;
    }
    .tabLang{
        width: 20%;
        float: left;
        min-height: 600px;
        background-color: #ffffff;
        border: 1px #4395ff solid;
    }
    .getVal{
        width: 40%;
        background-color: #ffffff;
        border: 1px #4395ff solid;
        height: 600px;
        float: left;
        position: relative;
        overflow-y: auto;
    }
    textarea{
        width: 100%;
        min-height: 600px;
    }
    .getValtext{
        width: 100%;
        min-height: 600px;
    }
    .tabconten{
        width: 100%;
        margin-top: 150px;
        left: 100px;
        text-align: center;
        font-size: 15px;
        overflow: hidden;
        line-height: 50px;
    }
    .bLang{
        font-size: 12px;
        border-radius: 5px;
        border: 1px #ead9d9 solid;
        background-color: #ffffff;
        text-align: center;
        width:80px;
        line-height: 50px;
        float: left;
        color: black;
    }
    .select1{
        width: 140px;
        border: 1px solid whitesmoke;
        background-color: #ffffff;
        position: absolute;
        top: 0px;
        right: 0px;
        height:690px;
        overflow-y: auto;
    }
    .select2{
        width: 140px;
        border: 1px solid whitesmoke;
        background-color: #ffffff;
        position: absolute;
        top: 0px;
        left: 0px;
    }
    .selectVal{
        text-align: center;
        font-size: 14px;
        line-height: 30px;
        color: black;
        border-bottom: rgba(136, 138, 142, 0.17) 1px solid;
    }
</style>