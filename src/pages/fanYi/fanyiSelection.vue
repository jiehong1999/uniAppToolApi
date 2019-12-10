<template>
    <view class="fanyi" @click="clean">
        <view class="topNav">
            <view class="NavButton" @click="goString">String</view>
            <view class="NavButton" @click="goMap">Map单选</view>
            <view class="NavButton actionButton">Map多选</view>
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
                    <view v-if="cList.length<=0">
                        请选择语言
                    </view>
                    <view v-for="(items,indexs) in langList" :key="indexs">
                        <view v-for="(item,index) in cList" :key="index">
                            {{items.uid==item?items.name:''}}
                        </view>
                    </view>
                </view>
                <view class="selectVal2Button" @click="resApi">确定</view>
            </view>
        </view>
        <view class="getVal">
            <text selectable="true">
                <rich-text type="text" class="getValtext" :nodes="getVal"></rich-text>
            </text>
            <view class="select2" v-show="show2">
                <checkbox-group @change="checkboxChange">
                    <view class="selectVal2"  v-for="(item,index) in langList" :key="index" @click.stop="tabLangs2(item,index)">
                        <label style=" display: flex;justify-content: space-between;align-items: center;">
                            <view>{{item.name}}</view><checkbox :value="item.uid"/>
                        </label>
                    </view>
                </checkbox-group>
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
                cList:[],
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
            },
            tabLangs2(val,index){
                // this.Langindex2=index;
                // this.to=val.uid;
                // if(!this.setVal||this.setVal==""){
                //     console.log("没有翻译内容")
                //     return;
                // }
            },
            resApi(){
                // uni.showToast({title:'功能暂未开放',icon:"none"});
                // return;
                if(!this.setVal||this.setVal==""){
                    console.log("没有翻译内容")
                    return;
                }
                if(this.cList.length<=0){
                    uni.showToast({title:'请选择翻译语言',icon:"none"});
                    return;
                }
                if(this.cList.length>5){
                    uni.showToast({title:'最多翻译五种语言',icon:"none"});
                    return;
                }
                var sal=this.setVal;
                if(sal.lastIndexOf("}")-1==sal.lastIndexOf(',')){
                    sal=sal.substring(0,sal.lastIndexOf(','));
                    sal=sal+"}";
                }
                var p={val:sal, fromList:this.from, toList:this.cList};
                uni.request({
                    url: 'http://47.98.241.180:8089/fanYiApiSelection',
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
            goMap(){
                uni.navigateTo({url:"/pages/fanYi/fanyiMap"})
            },
            checkboxChange(e){
                if(e.detail.value.length<=5){
                    this.cList=e.detail.value;
                }else{
                    uni.showToast({title:'最多翻译五种语言',icon:"none"});
                }
                console.log(this.cList);
            }
        }
    }
</script>

<style lang="less" type="text/less" scoped>
    .fanyi{
        width: 100%;
        background-color: #efefef;
        font-size: 15px;
        overflow: hidden;
    }
    .topNav{
        width:99%;
        background: #ffffff;
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
    .selectVal2Button{
        width: 100px;
        text-align: center;
        cursor: pointer;
        line-height: 20px;
        padding: 10px 1px;
        display: inline-block;
        background: #4395ff;
        color: #ffffff;
        position: absolute;
        right: 0px;
        bottom: 0px;
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
        position: relative;
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
        text-align:center;
        font-size: 14px;
        line-height: 30px;
        color: black;
        border-bottom: rgba(136, 138, 142, 0.17) 1px solid;
    }
    .selectVal2{
        text-align:left;
        font-size: 14px;
        line-height: 30px;
        color: black;
        border-bottom: rgba(136, 138, 142, 0.17) 1px solid;
    }
</style>