(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-fanYi-fanYi"],{"07d3":function(t,e,a){"use strict";var n=a("fe2a"),i=a.n(n);i.a},"59b7":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"fanyi",on:{click:function(e){e=t.$handleEvent(e),t.clean(e)}}},[a("v-uni-view",{staticClass:"setVal"},[a("v-uni-textarea",{attrs:{"placeholder-style":"color:#dadada",maxlength:"-1",placeholder:"Map数据"},on:{blur:function(e){e=t.$handleEvent(e),t.resApi(e)}},model:{value:t.setVal,callback:function(e){t.setVal=e},expression:"setVal"}}),t.show1?a("v-uni-view",{staticClass:"select1"},t._l(t.langList,(function(e,n){return a("v-uni-view",{key:n,staticClass:"selectVal",on:{click:function(a){a.stopPropagation(),a=t.$handleEvent(a),t.tabLangs1(e,n)}}},[t._v(t._s(e.name))])})),1):t._e()],1),a("v-uni-view",{staticClass:"tabLang"},[a("v-uni-view",{staticClass:"tabconten"},[a("v-uni-view",{staticClass:"bLang",on:{click:function(e){e.stopPropagation(),e=t.$handleEvent(e),t.show1=!t.show1}}},[t._v(t._s(t.langList[t.Langindex1].name))]),t._v("翻译==>"),a("v-uni-view",{staticClass:"bLang",staticStyle:{float:"right"},on:{click:function(e){e.stopPropagation(),e=t.$handleEvent(e),t.show2=!t.show2}}},[t._v(t._s(t.langList[t.Langindex2].name))])],1)],1),a("v-uni-view",{staticClass:"getVal"},[a("v-uni-text",{attrs:{selectable:"true"}},[a("v-uni-rich-text",{staticClass:"getValtext",attrs:{type:"text",nodes:t.getVal}})],1),t.show2?a("v-uni-view",{staticClass:"select2"},t._l(t.langList,(function(e,n){return a("v-uni-view",{key:n,staticClass:"selectVal",on:{click:function(a){a.stopPropagation(),a=t.$handleEvent(a),t.tabLangs2(e,n)}}},[t._v(t._s(e.name))])})),1):t._e()],1)],1)},i=[];a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return i}))},"6bee":function(t,e,a){"use strict";var n=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("bd86")),o={name:"fanYi",data:function(){return{langList:[{uid:"zh",name:"中文"},{uid:"en",name:"英语"},{uid:"yue",name:"粤语"},{uid:"wyw",name:"文言文"},{uid:"jp",name:"日语"},{uid:"kor",name:"韩语"},{uid:"fra",name:"法语"},{uid:"spa",name:"西班牙语"},{uid:"th",name:"泰语"},{uid:"ara",name:"阿拉伯语"},{uid:"ru",name:"俄语"},{uid:"pt",name:"葡萄牙语"},{uid:"de",name:"德语"},{uid:"it",name:"意大利语"},{uid:"el",name:"希腊语"},{uid:"nl",name:"荷兰语"},{uid:"pl",name:"波兰语"},{uid:"bul",name:"保加利亚语"},{uid:"est",name:"爱沙尼亚语"},{uid:"dan",name:"丹麦语"},{uid:"fin",name:"芬兰语"},{uid:"cs",name:"捷克语"},{uid:"rom",name:"罗马尼亚语"},{uid:"slo",name:"斯洛文尼亚语"},{uid:"swe",name:"瑞典语"},{uid:"hu",name:"匈牙利语"},{uid:"cht",name:"繁体中文"},{uid:"vie",name:"越南语"}],Langindex1:0,Langindex2:1,show1:!1,show2:!1,from:"",to:"",getVal:"",setVal:""}},onShow:function(){this.from=this.langList[this.Langindex1].uid,this.to=this.langList[this.Langindex2].uid,this.setVal='{"我": "我"}',console.log(this.from),console.log(this.to)},methods:{clean:function(){this.show1=!1,this.show2=!1},tabLangs1:function(t,e){this.Langindex1=e,this.show1=!1,this.from=t.uid,console.log(this.from)},tabLangs2:function(t,e){this.Langindex2=e,this.show2=!1,this.to=t.uid,console.log(this.to),this.setVal&&""!=this.setVal?this.resApi():console.log("没有翻译内容")},resApi:function(){var t=this;if(this.setVal&&""!=this.setVal){var e={val:this.setVal,from:this.from,to:this.to};uni.request({url:"http://47.98.241.180:8089/fanYiApi",data:e,method:"POST",header:(0,i.default)({"Content-type":"application/json"},"Content-type","application/x-www-form-urlencoded"),dataType:"json",success:function(e){console.log(e.data);var a="<div>{<br/>";for(var n in e.data)a+='"'+n+'":"'+e.data[n]+'",<br/>';a=a.substring(0,a.lastIndexOf(",")),a+="<br/>}</div>",console.log(a),t.getVal=a}})}else console.log("没有翻译内容")}}};e.default=o},bf99:function(t,e,a){"use strict";a.r(e);var n=a("6bee"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},cf2d:function(t,e,a){"use strict";a.r(e);var n=a("59b7"),i=a("bf99");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("07d3");var s=a("2877"),l=Object(s["a"])(i["default"],n["a"],n["b"],!1,null,"e5866b3c",null);e["default"]=l.exports},d30a:function(t,e,a){e=t.exports=a("24fb")(!1),e.push([t.i,".fanyi[data-v-e5866b3c]{width:100%;background-color:#efefef;font-size:15px;overflow:hidden}.setVal[data-v-e5866b3c]{width:39%;background-color:#fff;border:1px #4395ff solid;min-height:600px;float:left;position:relative}.tabLang[data-v-e5866b3c]{width:20%;float:left;min-height:600px;background-color:#fff;border:1px #4395ff solid}.getVal[data-v-e5866b3c]{width:39%;background-color:#fff;border:1px #4395ff solid;height:600px;float:left;position:relative;overflow-y:auto}uni-textarea[data-v-e5866b3c]{width:100%;min-height:600px}.getValtext[data-v-e5866b3c]{width:100%;min-height:600px}.tabconten[data-v-e5866b3c]{width:100%;margin-top:150px;left:100px;text-align:center;font-size:15px;overflow:hidden;line-height:50px}.bLang[data-v-e5866b3c]{font-size:12px;border-radius:5px;border:1px #ead9d9 solid;background-color:#fff;text-align:center;width:80px;line-height:50px;float:left;color:#000}.select1[data-v-e5866b3c]{width:140px;border:1px solid #f5f5f5;background-color:#fff;position:absolute;top:0;right:0;height:690px;overflow-y:auto}.select2[data-v-e5866b3c]{width:140px;border:1px solid #f5f5f5;background-color:#fff;position:absolute;top:0;left:0;height:690px;overflow-y:auto}.selectVal[data-v-e5866b3c]{text-align:center;font-size:14px;line-height:30px;color:#000;border-bottom:rgba(136,138,142,.17) 1px solid}",""])},fe2a:function(t,e,a){var n=a("d30a");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("499e").default;i("7a52c046",n,!0,{sourceMap:!1,shadowMode:!1})}}]);