<template>
    <view class="fanyi" @click="clean">
        <view class="topNav">
            <view class="NavButton" @click="goString">String</view>
            <view class="NavButton actionButton">Map单选</view>
            <view class="NavButton" @click="goSelection">Map多选</view>
        </view>
        <view class="setVal">
            <textarea placeholder-style="color:#dadada" maxlength="-1" placeholder="Map数据" @blur="resApi" v-model="setVal"/>
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
            this.setVal='{"我": "我"}';
            console.log(this.from);
            console.log(this.to);
        },
        methods:{
            clean(){
                this.show1=false;
                this.show2=false;
            },
            tabLangs1(val,index){
                this.Langindex1=index;
                this.show1=false;
                this.from=val.uid;
                console.log(this.from);
            },
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
            resApi(){
                if(!this.setVal||this.setVal==""){
                    console.log("没有翻译内容")
                    return;
                }
                var sal=this.setVal;
                if(sal.lastIndexOf("}")-1==sal.lastIndexOf(',')){
                    sal=sal.substring(0,sal.lastIndexOf(','));
                    sal=sal+"}";
                }
                var p={val:sal, from:this.from, to:this.to};
                uni.request({
                    url: 'http://47.98.241.180:8089/fanYiApi',
                    data:p,
                    method:'POST',

                    header: {
                        'Content-type': 'application/json',
                        'Content-type':'application/x-www-form-urlencoded'
                    },
                    dataType:'json',
                    success: (res) => {
                        console.log(res.data);
                        if(res.data!=null){
                            var val="<div>{<br/>";
                            for(var key in res.data){
                                val+='"'+key+'":"'+res.data[key]+'",<br/>';
                            }
                            val+="<br/>}</div>";
                            console.log(val);
                            this.getVal =val;
                        }else{
                            this.getVal ="系统错误";
                        }

                    }
                });
            },
            goString(){
                uni.navigateTo({url:"/pages/fanYi/fanYi"})
            },
            goSelection(){
                uni.navigateTo({url:"/pages/fanYi/fanyiSelection"})
            }
        }
    }
</script>

<style scoped>
    .fanyi{
        width: 100%;
        background-color: #efefef;
        font-size: 15px;
        overflow: hidden;
    }
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