/* ---------------------------------------------------------------------------------
   file-start: js/lib/es5-shim.min.js 
*/

(function(definition){if(typeof define=="function"){define(definition)}else if(typeof YUI=="function"){YUI.add("es5",definition)}else{definition()}})(function(){function Empty(){}if(!Function.prototype.bind){Function.prototype.bind=function bind(that){var target=this;if(typeof target!="function"){throw new TypeError("Function.prototype.bind called on incompatible "+target)}var args=slice.call(arguments,1);var bound=function(){if(this instanceof bound){var result=target.apply(this,args.concat(slice.call(arguments)));if(Object(result)===result){return result}return this}else{return target.apply(that,args.concat(slice.call(arguments)))}};if(target.prototype){Empty.prototype=target.prototype;bound.prototype=new Empty;Empty.prototype=null}return bound}}var call=Function.prototype.call;var prototypeOfArray=Array.prototype;var prototypeOfObject=Object.prototype;var slice=prototypeOfArray.slice;var _toString=call.bind(prototypeOfObject.toString);var owns=call.bind(prototypeOfObject.hasOwnProperty);var defineGetter;var defineSetter;var lookupGetter;var lookupSetter;var supportsAccessors;if(supportsAccessors=owns(prototypeOfObject,"__defineGetter__")){defineGetter=call.bind(prototypeOfObject.__defineGetter__);defineSetter=call.bind(prototypeOfObject.__defineSetter__);lookupGetter=call.bind(prototypeOfObject.__lookupGetter__);lookupSetter=call.bind(prototypeOfObject.__lookupSetter__)}if([1,2].splice(0).length!=2){var array_splice=Array.prototype.splice;Array.prototype.splice=function(start,deleteCount){if(!arguments.length){return[]}else{return array_splice.apply(this,[start===void 0?0:start,deleteCount===void 0?this.length-start:deleteCount].concat(slice.call(arguments,2)))}}}if([].unshift(0)!=1){var array_unshift=Array.prototype.unshift;Array.prototype.unshift=function(){array_unshift.apply(this,arguments);return this.length}}if(!Array.isArray){Array.isArray=function isArray(obj){return _toString(obj)=="[object Array]"}}var boxedString=Object("a"),splitString=boxedString[0]!="a"||!(0 in boxedString);if(!Array.prototype.forEach){Array.prototype.forEach=function forEach(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,thisp=arguments[1],i=-1,length=self.length>>>0;if(_toString(fun)!="[object Function]"){throw new TypeError}while(++i<length){if(i in self){fun.call(thisp,self[i],i,object)}}}}if(!Array.prototype.map){Array.prototype.map=function map(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,length=self.length>>>0,result=Array(length),thisp=arguments[1];if(_toString(fun)!="[object Function]"){throw new TypeError(fun+" is not a function")}for(var i=0;i<length;i++){if(i in self)result[i]=fun.call(thisp,self[i],i,object)}return result}}if(!Array.prototype.filter){Array.prototype.filter=function filter(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,length=self.length>>>0,result=[],value,thisp=arguments[1];if(_toString(fun)!="[object Function]"){throw new TypeError(fun+" is not a function")}for(var i=0;i<length;i++){if(i in self){value=self[i];if(fun.call(thisp,value,i,object)){result.push(value)}}}return result}}if(!Array.prototype.every){Array.prototype.every=function every(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,length=self.length>>>0,thisp=arguments[1];if(_toString(fun)!="[object Function]"){throw new TypeError(fun+" is not a function")}for(var i=0;i<length;i++){if(i in self&&!fun.call(thisp,self[i],i,object)){return false}}return true}}if(!Array.prototype.some){Array.prototype.some=function some(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,length=self.length>>>0,thisp=arguments[1];if(_toString(fun)!="[object Function]"){throw new TypeError(fun+" is not a function")}for(var i=0;i<length;i++){if(i in self&&fun.call(thisp,self[i],i,object)){return true}}return false}}if(!Array.prototype.reduce){Array.prototype.reduce=function reduce(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,length=self.length>>>0;if(_toString(fun)!="[object Function]"){throw new TypeError(fun+" is not a function")}if(!length&&arguments.length==1){throw new TypeError("reduce of empty array with no initial value")}var i=0;var result;if(arguments.length>=2){result=arguments[1]}else{do{if(i in self){result=self[i++];break}if(++i>=length){throw new TypeError("reduce of empty array with no initial value")}}while(true)}for(;i<length;i++){if(i in self){result=fun.call(void 0,result,self[i],i,object)}}return result}}if(!Array.prototype.reduceRight){Array.prototype.reduceRight=function reduceRight(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,length=self.length>>>0;if(_toString(fun)!="[object Function]"){throw new TypeError(fun+" is not a function")}if(!length&&arguments.length==1){throw new TypeError("reduceRight of empty array with no initial value")}var result,i=length-1;if(arguments.length>=2){result=arguments[1]}else{do{if(i in self){result=self[i--];break}if(--i<0){throw new TypeError("reduceRight of empty array with no initial value")}}while(true)}do{if(i in this){result=fun.call(void 0,result,self[i],i,object)}}while(i--);return result}}if(!Array.prototype.indexOf||[0,1].indexOf(1,2)!=-1){Array.prototype.indexOf=function indexOf(sought){var self=splitString&&_toString(this)=="[object String]"?this.split(""):toObject(this),length=self.length>>>0;if(!length){return-1}var i=0;if(arguments.length>1){i=toInteger(arguments[1])}i=i>=0?i:Math.max(0,length+i);for(;i<length;i++){if(i in self&&self[i]===sought){return i}}return-1}}if(!Array.prototype.lastIndexOf||[0,1].lastIndexOf(0,-3)!=-1){Array.prototype.lastIndexOf=function lastIndexOf(sought){var self=splitString&&_toString(this)=="[object String]"?this.split(""):toObject(this),length=self.length>>>0;if(!length){return-1}var i=length-1;if(arguments.length>1){i=Math.min(i,toInteger(arguments[1]))}i=i>=0?i:length-Math.abs(i);for(;i>=0;i--){if(i in self&&sought===self[i]){return i}}return-1}}if(!Object.keys){var hasDontEnumBug=true,dontEnums=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],dontEnumsLength=dontEnums.length;for(var key in{toString:null}){hasDontEnumBug=false}Object.keys=function keys(object){if(typeof object!="object"&&typeof object!="function"||object===null){throw new TypeError("Object.keys called on a non-object")}var keys=[];for(var name in object){if(owns(object,name)){keys.push(name)}}if(hasDontEnumBug){for(var i=0,ii=dontEnumsLength;i<ii;i++){var dontEnum=dontEnums[i];if(owns(object,dontEnum)){keys.push(dontEnum)}}}return keys}}var negativeDate=-621987552e5,negativeYearString="-000001";if(!Date.prototype.toISOString||new Date(negativeDate).toISOString().indexOf(negativeYearString)===-1){Date.prototype.toISOString=function toISOString(){var result,length,value,year,month;if(!isFinite(this)){throw new RangeError("Date.prototype.toISOString called on non-finite value.")}year=this.getUTCFullYear();month=this.getUTCMonth();year+=Math.floor(month/12);month=(month%12+12)%12;result=[month+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()];year=(year<0?"-":year>9999?"+":"")+("00000"+Math.abs(year)).slice(0<=year&&year<=9999?-4:-6);length=result.length;while(length--){value=result[length];if(value<10){result[length]="0"+value}}return year+"-"+result.slice(0,2).join("-")+"T"+result.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"}}var dateToJSONIsSupported=false;try{dateToJSONIsSupported=Date.prototype.toJSON&&new Date(NaN).toJSON()===null&&new Date(negativeDate).toJSON().indexOf(negativeYearString)!==-1&&Date.prototype.toJSON.call({toISOString:function(){return true}})}catch(e){}if(!dateToJSONIsSupported){Date.prototype.toJSON=function toJSON(key){var o=Object(this),tv=toPrimitive(o),toISO;if(typeof tv==="number"&&!isFinite(tv)){return null}toISO=o.toISOString;if(typeof toISO!="function"){throw new TypeError("toISOString property is not callable")}return toISO.call(o)}}if(!Date.parse||"Date.parse is buggy"){Date=function(NativeDate){function Date(Y,M,D,h,m,s,ms){var length=arguments.length;if(this instanceof NativeDate){var date=length==1&&String(Y)===Y?new NativeDate(Date.parse(Y)):length>=7?new NativeDate(Y,M,D,h,m,s,ms):length>=6?new NativeDate(Y,M,D,h,m,s):length>=5?new NativeDate(Y,M,D,h,m):length>=4?new NativeDate(Y,M,D,h):length>=3?new NativeDate(Y,M,D):length>=2?new NativeDate(Y,M):length>=1?new NativeDate(Y):new NativeDate;date.constructor=Date;return date}return NativeDate.apply(this,arguments)}var isoDateExpression=new RegExp("^"+"(\\d{4}|[+-]\\d{6})"+"(?:-(\\d{2})"+"(?:-(\\d{2})"+"(?:"+"T(\\d{2})"+":(\\d{2})"+"(?:"+":(\\d{2})"+"(?:\\.(\\d{3}))?"+")?"+"("+"Z|"+"(?:"+"([-+])"+"(\\d{2})"+":(\\d{2})"+")"+")?)?)?)?"+"$");var months=[0,31,59,90,120,151,181,212,243,273,304,334,365];function dayFromMonth(year,month){var t=month>1?1:0;return months[month]+Math.floor((year-1969+t)/4)-Math.floor((year-1901+t)/100)+Math.floor((year-1601+t)/400)+365*(year-1970)}for(var key in NativeDate){Date[key]=NativeDate[key]}Date.now=NativeDate.now;Date.UTC=NativeDate.UTC;Date.prototype=NativeDate.prototype;Date.prototype.constructor=Date;Date.parse=function parse(string){var match=isoDateExpression.exec(string);if(match){var year=Number(match[1]),month=Number(match[2]||1)-1,day=Number(match[3]||1)-1,hour=Number(match[4]||0),minute=Number(match[5]||0),second=Number(match[6]||0),millisecond=Number(match[7]||0),offset=!match[4]||match[8]?0:Number(new NativeDate(1970,0)),signOffset=match[9]==="-"?1:-1,hourOffset=Number(match[10]||0),minuteOffset=Number(match[11]||0),result;if(hour<(minute>0||second>0||millisecond>0?24:25)&&minute<60&&second<60&&millisecond<1e3&&month>-1&&month<12&&hourOffset<24&&minuteOffset<60&&day>-1&&day<dayFromMonth(year,month+1)-dayFromMonth(year,month)){result=((dayFromMonth(year,month)+day)*24+hour+hourOffset*signOffset)*60;result=((result+minute+minuteOffset*signOffset)*60+second)*1e3+millisecond+offset;if(-864e13<=result&&result<=864e13){return result}}return NaN}return NativeDate.parse.apply(this,arguments)};return Date}(Date)}if(!Date.now){Date.now=function now(){return(new Date).getTime()}}if("0".split(void 0,0).length){var string_split=String.prototype.split;String.prototype.split=function(separator,limit){if(separator===void 0&&limit===0)return[];return string_split.apply(this,arguments)}}if("".substr&&"0b".substr(-1)!=="b"){var string_substr=String.prototype.substr;String.prototype.substr=function(start,length){return string_substr.call(this,start<0?(start=this.length+start)<0?0:start:start,length)}}var ws="	\n\f\r ????????????????????"+"??????????????????????????????\u2028"+"\u2029???";if(!String.prototype.trim||ws.trim()){ws="["+ws+"]";var trimBeginRegexp=new RegExp("^"+ws+ws+"*"),trimEndRegexp=new RegExp(ws+ws+"*$");String.prototype.trim=function trim(){if(this===undefined||this===null){throw new TypeError("can't convert "+this+" to object")}return String(this).replace(trimBeginRegexp,"").replace(trimEndRegexp,"")}}function toInteger(n){n=+n;if(n!==n){n=0}else if(n!==0&&n!==1/0&&n!==-(1/0)){n=(n>0||-1)*Math.floor(Math.abs(n))}return n}function isPrimitive(input){var type=typeof input;return input===null||type==="undefined"||type==="boolean"||type==="number"||type==="string"}function toPrimitive(input){var val,valueOf,toString;if(isPrimitive(input)){return input}valueOf=input.valueOf;if(typeof valueOf==="function"){val=valueOf.call(input);if(isPrimitive(val)){return val}}toString=input.toString;if(typeof toString==="function"){val=toString.call(input);if(isPrimitive(val)){return val}}throw new TypeError}var toObject=function(o){if(o==null){throw new TypeError("can't convert "+o+" to object")}return Object(o)}});;

/* file-end: js/lib/es5-shim.min.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/lib/jquery-1.8.3.min.js 
*/

/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);;

/* file-end: js/lib/jquery-1.8.3.min.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/core/general.js 
*/

/* ---------------------------------------------------------------------------------
   file-start: js/core/lj.js 
*/

(function() {

    /**
     * @namespace LJ LiveJournal utility objects
     */
    var LJ = window.LJ = window.LJ || {};

    /**
     * Define a namespace.
     *
     * @param {string} path The String with namespace to be created.
     * @param {Object=} top An optional object. If set then the namespace will be built relative to it. Defaults to the window.
     */
    LJ.define = function(path, top) {
        var ns = path.split('.'),
            name;

        top = top || window;

        while (name = ns.shift()) {
            top[name] = top[name] || {};
            top = top[name];
        }
    };

    /**
     * Get a variable, defined especially for this page in the Site.page.
     *
     * @param {string} name Variable name.
     * @param {boolean} global A flag to check, whether the variable is local to page or not.
     *
     * @return {*} Returns a page variable or undefined if not found.
     */
    LJ.pageVar = function(name, global) {
        var obj = global ? window.Site : window.Site && window.Site.page;

        if (obj && obj.hasOwnProperty(name)) {
            return obj[name];
        } else {
            return void(0);
        }
    };

})();;

/* file-end: js/core/lj.js 
----------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------
   file-start: js/core/console.js 
*/

/**
 * IE console object dummy functions
 */
(function (window) {
	'use strict';
	
	var LJ = window.LJ = window.LJ || {};
	
	var methods = ['log', 'dir', 'warn', 'error', 'assert', 'count', 'info', 'time', 'timeEnd', 'debug'],
		noop = function () {},
		i, method;

	if (!window.console) {
		window.console = {};
	}

	for (i = 0; i < methods.length; i++) {
		method = methods[i];

		if (!console[method]) {
			console[method] = noop;
		}
	}

	if (typeof console !== 'undefined') {
		LJ.console = console;
	}
}(this));
;

/* file-end: js/core/console.js 
----------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------
   file-start: js/core/support.js 
*/

/**
 * @namespace LJ.Support Feature detections and other support features
 */
(function ($) {
    'use strict';

    LJ.define('LJ.Support');

    /**
     * Browser detection object
     * http://api.jquery.com/jQuery.browser/
     */
    LJ.Support.browser = (function() {
        /**
         * almost direct copy from jQuery 1.8.3,
         * expect 'jQuery.uaMatch' changed to 'uaMatch'
         */

        /* copy start */
        var matched, browser;

        // Use of jQuery.browser is frowned upon.
        // More details: http://api.jquery.com/jQuery.browser
        // jQuery.uaMatch maintained for back-compat
        var uaMatch = function( ua ) {
            ua = ua.toLowerCase();

            var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
                /(msie) ([\w.]+)/.exec( ua ) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
                [];

            return {
                browser: match[ 1 ] || "",
                version: match[ 2 ] || "0"
            };
        };

        matched = uaMatch( navigator.userAgent );
        browser = {};

        if ( matched.browser ) {
            browser[ matched.browser ] = true;
            browser.version = matched.version;
        }

        // Chrome is Webkit, but Webkit is also Safari.
        if ( browser.chrome ) {
            browser.webkit = true;
        } else if ( browser.webkit ) {
            browser.safari = true;
        }

        /* copy end */

        return browser;
	}());

	/**
	 * Local storage support
	 */
	try {
		// Firefox fires exception when cookie storage options are set to 'always ask'
		LJ.Support.localStorage = !!window.localStorage;
	} catch (error) {
		LJ.Support.localStorage = false;
	}

	/**
	 * CORS support
	 */
	LJ.Support.cors = window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest();

	/* Geolocation */
	LJ.Support.geoLocation = 'geolocation' in navigator;

	/* Incomplete implementation from modernizr */
	LJ.Support.touch = Boolean(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);

	/**
	 * History API
	 */
	LJ.Support.history = !!window.history.pushState;

    LJ.Support.isMac = navigator.userAgent.indexOf('Mac') !== -1;
}(jQuery));
;

/* file-end: js/core/support.js 
----------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------
   file-start: js/core/flags.js 
*/

/**
 * @author Valeriy Vasin (valeriy.vasin@sup.com)
 * @description Enable / disable javascript features for the project
 *
 * @example
 * // do something if feature is enabled
 * if ( LJ.Flags.isEnabled('subscriptions') ) {
 *     console.log('Subscription feature code goes here');
 * }
 *
 * // exit if feature is disabled
 * if ( LJ.Flags.isDisabled('subscriptions') ) {
 *     console.error('feature is under development');
 *     return;
 * }
 *
 * // get flag value for convinience and more flexibility
 * if ( LJ.Flags.value('subscriptions') === 'stage2' ) {
 *     console.log('stage 2 goes here');
 * }
 */

;(function () {
    'use strict';

    var LJ = window.LJ = window.LJ || {};

    // Feature states:
    // - true: feature is enabled
    // - false: feature is disabled
    // - other: feature state, e.g. 'stage2'. Feature is disabled.
    //
    // If feature hasn't been listed inside the object - it's enabled
    // Notice: when feature is ready you should remove checks everywhere
    //         and remove flag from this object
    LJ.Flags = {
        // Perl: migrated_to_friends_and_subscriptions
        friendsAndSubscriptions: false
    };

    // It's strongly recommended to access flags though this methods

    /**
     * Checks if feature is enabled
     * @param  {String}  name Feature name
     * @return {Boolean}      Result of the check
     */
    LJ.Flags.isEnabled = function (name) {
        var value = LJ.Flags[name];
        return value === true || typeof value === 'undefined';
    };

    /**
     * Check if feature is diabled
     * @param  {String}  name Feature name
     * @return {Boolean}      Result of the check
     */
    LJ.Flags.isDisabled = function (name) {
        return !LJ.Flags.isEnabled(name);
    };

    /**
     * Get current feature flag value
     * @param  {String} name Feature name
     * @return {*}           Feature value
     */
    LJ.Flags.value = function (name) {
        return LJ.Flags[name];
    };
}());
;

/* file-end: js/core/flags.js 
----------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------
   file-start: js/core/log.js 
*/

;(function() {
    'use strict';

    window.LJ = window.LJ || {};

    var logDomain = 'http://njs.services.livejournal.com/';

    window.onerror = function(msg, url, line) {
        var errorObject = {
            'msg'   : msg,
            'url'   : url,
            'line'  : line,
            'where' : String(window.location)
        };

        if (Site.remoteUser) {
            errorObject.user = Site.remoteUser;
        }

        var data = [],
            key,
            src,
            beacon;

        // Chrome doesn't support crossdomain error logging
        // http://blog.errorception.com/2012/12/catching-cross-domain-js-errors.html
        
        if (errorObject.msg === 'Script error.' && !errorObject.url) {
            return false;
        }

        for (key in errorObject) {
            data.push(key + '=' + encodeURIComponent(errorObject[key]));
        }

        src = logDomain + 'log?' + data.join('&');

        beacon = new Image();
        beacon.src = src;

        return false;
    };

    // backwards compatibility, will be removed soon
    
    if (typeof LJ.console.log === 'function') {
        LJ.info  = console.log.bind(console);
        LJ.warn  = console.log.bind(console);
        LJ.error = console.log.bind(console);
    } else {
        // IE8 case, see 'callable object'
        LJ.info  = console.log;
        LJ.warn  = console.log;
        LJ.error = console.log;
    }
})();
;

/* file-end: js/core/log.js 
----------------------------------------------------------------------------------*/

;(function ($) {
	'use strict';

	var LJ = window.LJ = window.LJ || {};

	/* Cookie plugin. Copyright (c) 2006 Klaus Hartl (stilbuero.de) */
	function Cookie(name, value, options) {
		if (value !== undefined) { // name and value given, set/delete cookie
			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date;
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
			}
			// CAUTION: Needed to parenthesize options.path and options.domain
			// in the following expressions, otherwise they evaluate to undefined
			// in the packed version for some reason...
			var path = options.path ? '; path=' + (options.path) : '',
			domain = options.domain ? '; domain=' + (options.domain) : '',
			secure = options.secure ? '; secure' : '',
			cookieValue = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
			document.cookie = cookieValue;
			return cookieValue;
		} else { // only name given, get cookie
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = cookies[i].trim();
					// Does this cookie string begin with the name we want?
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		}
	}
	window.Cookie = Cookie;

	/**/
	LJ.Cookie = {
		set: function (name, value, options) {
			return Cookie(name, value, options);
		},

		get: function (name) {
			return Cookie(name);
		}
	};

}(jQuery));;

/* file-end: js/core/general.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.lj.basicWidget.js 
*/

/* ---------------------------------------------------------------------------------
   file-start: js/lib/jquery-ui/jquery.ui.core.min.js 
*/

/*! jQuery UI - v1.8.24 - 2012-09-28
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.24",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.curCSS||(a.curCSS=a.css),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;

/* file-end: js/lib/jquery-ui/jquery.ui.core.min.js 
----------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------
   file-start: js/lib/jquery-ui/jquery.ui.widget.min.js 
*/

/*! jQuery UI - v1.8.24 - 2012-09-28
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;

/* file-end: js/lib/jquery-ui/jquery.ui.widget.min.js 
----------------------------------------------------------------------------------*/

/**
 * @author dmitry.petrov@sup.com (Dmitry Petrov)
 * @fileoverview Base widget for all livejournal widgets.
 */

/**
 * @name $
 */

/**
 * @name $.lj
 */

/**
 * @name $.lj.basicWidget
 * @requires $.ui.core, $.ui.widget
 * @class Base widget for all livejournal widgets.<br />
 * Basic widget adds pub/sub system to the widget hierarchy. By convention widgets add prefix equal
 * to the widget name of the most parent element who fires it. E.g. if someWidget and subSomeWidget
 * that extends someWidget do fire open event, it should be prefixed with someWidget - someWidget/open.
 *
 */
(function($) {
	'use strict';

	var __callbacks = {},

		//these events we set once and for all widget instances
		globalEvents = {
			documentClick: false
		};

	/** @lends $.lj.basicWidget.prototype */
	$.widget( 'lj.basicWidget', {

		/**
		 * Default options for widgets.
		 * @type Object
		 * @private
		 */
		options: {
			/**
			 * Object contains strings with class names that are used within widget.
			 */
			classNames: {},
			/**
			 * Object contains strings with selectors that are used to find nodes within widget.
			 */
			selectors: {},
			/**
			 * Object contains translation strings for a widget. Widget should not contain hardcoded strings.
			 */
			ml: {},
			/**
			 * Object contains strings with templates, that are used to build content within widget.
			 */
			tmpl: {}
		},

		_create: function() {
			/**
			 * Contains all events that should not trigger events on next fire for this widget.
			 * @type Object
			 */
			this.__suppressedEvents = {};
			this.__modules = {};
			this._locked = false;
		},

		/**
		 * Bind common events for the widget
		 */
		_bindControls: function() {
			var widget = this;

			/**
			 * documentClick
			 */
			if( !globalEvents.documentClick ) {
				$( document ).click( function( ev ) {
					widget._fire( 'documentClick', [], true );
				} );

				globalEvents.documentClick = true;
			}
		},

		_setOption: function(name, val) {
			switch (name) {
				case 'selectors':
				case 'classNames':
				case 'tmpl':
				case 'ml':
				case 'templates':
					this.options[name] = $.extend(this.options[name], val);
					return;
			}

			$.Widget.prototype._setOption.apply(this, arguments);
		},

		/**
		 * Subscribe to the event with the callback.
		 *
		 * @param {String} type Event type.
		 * @param {Function} callback Function that should be fired on the event.
		 */
		_on: function( type, callback ) {
			if (!__callbacks.hasOwnProperty(type)) {
				__callbacks[ type ] = [];
			}

			__callbacks[ type ].push( {
				fn: callback,
				owner: this,
				once: false
			} );
		},

		/**
		 * Subscribe to one selected event with the callback.
		 *
		 * @param {String} type Event type.
		 * @param {Function} callback Function that should be fired on the event.
		 */
		_one: function( type, callback ) {
			this._on( type, callback );
			__callbacks[ type ][ __callbacks[ type ].length - 1 ].once = true;
		},

		/**
		 * Remove subscription on the event.
		 *
		 * @param {String} type Event type.
		 * @param {Function=} callback Callback function. If parameter is omitted, function will remove all
		 *     callbacks of this instance from the subscription on this type of event.
		 */
		_off: function( type, callback ) {
			if (!__callbacks.hasOwnProperty(type)) {
				return;
			}

			var cbs = __callbacks[ type ];

			for (var i = 0; i < cbs.length; ++i) {
				if ((cbs[i].fn === callback) || (!callback && cbs[i].owner === this)) {
					cbs.splice(i--, 1);
				}
			}
		},

		/**
		 * Dispatch event.
		 *
		 * @param {String} type Event type.
		 * @param {Array|[]} args array with arguments that will be passed to the callback functions.
		 * @param {Boolean|False} includeOwner If false the message is not recieved by
		 *     the object that dispatched it.
		 */
		_fire: function( type, args, includeOwner ) {
			args = args || [];
			includeOwner = includeOwner || false;
			if( type in __callbacks ) {
				var cbs = __callbacks[ type ],
					i = -1;

				while( cbs[ ++i ] ) {
					if( !includeOwner && cbs[ i ].owner === this ) { continue; }
					if( type in cbs[ i ].owner.__suppressedEvents ) { continue; }
					cbs[ i ].fn.apply( null, args );
				}

				//we delete supressed event flag only after firing event because
				//widget can subscribe more than one callback
				while(cbs[ --i ]) {
					if( type in cbs[ i ].owner.__suppressedEvents ) {
						delete cbs[ i ].owner.__suppressedEvents[ type ];
					}

					//delete callbacks that should be fired only once
					if( cbs[ i ].once ) { cbs.splice(i, 1); }
				}
			}
		},

		/**
		 * Prevent event from being trigger on this widget instance on next fire.
		 *     An event after next will be processed as normal
		 */
		_suppressNextEvent: function( eventName ) {
			this.__suppressedEvents[ eventName ] = true;
		},

		/**
		 * Remove all subscriptions on widget distruction. If overriden, this method should be
		 *     also caled.
		 */
		_destroy: function() {
			var cbs, type, i;
			for (type in __callbacks) {
				if (__callbacks.hasOwnProperty(type)) {
					cbs = __callbacks[type];
					for (i = 0; i < cbs.length; ++i) {
						if (cbs[i].owner === this) {
							cbs.splice(i--, 1);
						}
					}
				}
			}
		},

		/**
		 * Find element inside the widget and return it. Note, that function caches the elements
		 * and assigns them ti the widget object with the name _{name}
		 *
		 * @param {string} name Name of the selector to search in this.options.selectors.
		 * @param {jQuery=} ctx Optionally we can say, where to find the node.
		 */
		_el: function(name, ctx) {
			var method = '_' + name;

			ctx = ctx || this.element;

			if (!this[method]) {
				this[method] = ctx.find(this.options.selectors[name]);
			}

			return this[method];
		},

		/**
		 * Fetch the class name from the options.
		 *
		 * @param {string} name Name of the class name to search in this.options.classNames.
		 */
		_cl: function(name) {
				return this.options.classNames[name];
		},

		/**
		 * Fetch the selector from the options.
		 *
		 * @param {string} name Name of the selector to search in this.options.selectors
		 */
		_s: function(name) {
				return this.options.selectors[name];
		},

		/**
		 * Apply template specified by name with data.
		 *
		 * @param {string} name The key name of the template in this.options.templates.
		 * @param {Object} data The data object which should be applied to the template.
		 *
		 * @return {jQuery} jQuery object with generated markup.
		 */
		_tmpl: function(name, data) {
			return LJ.UI.template(this.options.templates[name], data);
		},

		/**
		 * Fetch ml variable from the options and apply LJ.ml function to it
		 * @param  {String} name Options key for the ml variable
		 * @return {String}      ml-variable from server
		 */
		_ml: function (name) {
			if (this.options.ml && this.options.ml.hasOwnProperty(name)) {
				return LJ.ml( this.options.ml[name] );
			} else {
				LJ.console.log("Widget text variable ["+ name +"] hasn't been defined");
				return "["+ name +"]";
			}
		},

		/**
		 * Use a mixin with the widget instance.
		 *
		 * @param {string} name Mixin name. A Mixin should be registered with LJ.UI.mixin.
		 * @param {Object=} options Options to pass to the mixin.
		 */
		_use: function(name, options) {
			var module = LJ.UI.mixin(name);

			if (module) {
				if (this.__modules.hasOwnProperty(name)) {
					LJ.console.log('Warn: Module ', name, ' has already been registered for ', this.widgetName);
					return;
				}

				this.__modules[name] = module.call(this, jQuery, options);
			} else {
				LJ.console.log('Warn: Module ', name, ' has not been loaded yet');
			}
		},

		/**
		 * Return mixin object. Object should contain public api provided with this mixin.
		 *
		 * @param {string} name Mixin name.
		 */
		_: function(name) {
			if (this.__modules.hasOwnProperty(name)) {
				return this.__modules[name];
			} else {
				return null;
			}
		},

		/**
		 * Lock the widget. The method should be used to block widget UI during long operations, e.g. ajax requests.
		 */
		_lock: function() { this._locked = true; },

		/**
		 * Unlock the widget.
		 */
		_unlock: function() { this._locked = false; },

		/**
		 * Check whether widget is locked now.
		 *
		 * @return {boolean} The lock state
		 */
		locked: function() { return this._locked; }
	} );
}(jQuery));
;

/* file-end: js/jquery/jquery.lj.basicWidget.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/basic.js 
*/

document.documentElement.id = 'js';

//core.js

/**
 * Utility method.
 * @param x <code>any</code> Any JavaScript value, including <code>undefined</code>.
 * @return boolean <code>true</code> if the value is not <code>null</code> and is not <code>undefined</code>.
 */
finite = function(x){
	return isFinite(x) ? x : 0;
};


finiteInt = function(x, base){
	return finite(parseInt(x, base));
};


finiteFloat = function(x){
	return finite(parseFloat(x));
};

/* unique id generator */
Unique = {
	length: 0,
	id: function(){
		return ++this.length;
	}
};

/* event methods */
var Event = Event||{};

Event.stop = function(e){
	// this set in Event.prep
	e = e || window.event || this;
	Event.stopPropagation(e);
	Event.preventDefault(e);
	return false;
};

Event.stopPropagation = function(e){
	if(e && e.stopPropagation)
		e.stopPropagation(); else
		window.event.cancelBubble = true;
};

Event.preventDefault = function(e){
	e = e || window.event;
	if(e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
};

Event.prep = function(e){
	e = e || window.event;
	if(e.stop === undefined)
		e.stop = this.stop;
	if(e.target === undefined)
		e.target = e.srcElement;
	if(e.relatedTarget === undefined)
		e.relatedTarget = e.toElement;
	return e;
};

/**
 * Mark the namespace as a dependency. The function does nothing now.
 *
 * @param {string} path Namespace name.
 */
LJ.require = function(path) {
	//fillme
};

/**
 * @class Class allows to call a function with  some delay and also prevent
 *     its execution if needed.
 * @constructor
 *
 * @param {Function} func Function to call.
 * @param {number} wait Time in ms to wait before function will be called.
 * @param {boolean=false} resetOnCall it true, the function will be executed only after last call + delay time
 */
LJ.DelayedCall = function(func, wait, resetOnCall) {
	this._func = func;
	this._wait = wait;
	this._resetOnCall = !!resetOnCall;
	this._timer = null;
	this._args = null;
};

LJ.DelayedCall.prototype._timerCallback = function() {
	this._timer = null;
	this._func.apply(null, this._args);
};

/**
 * Run function. All arguments that will be passed to this function will be
 *    passed to the function called.
 */
LJ.DelayedCall.prototype.run = function(/* arguments */) {
	this._args = [].slice.call(arguments, 0);
	if (this._timer) {
		if (this._resetOnCall) {
			clearTimeout(this._timer);
			this._timer = null;
		} else {
			return;
		}
	}

	this._timer = setTimeout(this._timerCallback.bind(this), this._wait);
};

/**
 * Prevent function execution.
 */
LJ.DelayedCall.prototype.stop = function() {
	clearTimeout(this._timer);
	this._timer = null;
};

/**
 * Format number according to locale. E.g. 1000000 becomes 1,000,000.
 *
 * @param {number} num Number to format.
 */
LJ.commafy = function(num) {
	num = "" + num;
	if (/^\d+$/.test(num)) {
		var delim = LiveJournal.getLocalizedStr('number.punctuation');
		if (delim === '[number.punctuation]') { delim = ','; }

		var hasMatches = true;
		while (hasMatches) {
			hasMatches = false;
			num = num.replace(/(\d)(\d{3})(?!\d)/g, function(str, first, group) {
				hasMatches = true;
				return first + delim + group;
			})
		}
	}

	return num;
};

/**
 * Create function that will call the target function
 * at most once per every delay seconds. The signature and tests
 * are taken from underscore project.
 *
 * @param {Function} func The function to call.
 * @param {number} Delay between the calls in ms.
 */
LJ.throttle = function(func, delay) {
	var ctx, args, timer, shouldBeCalled = false;

	return function() {
		ctx = this;
		args = arguments;

		var callFunc = function() {
			timer = null;
			if (!shouldBeCalled) { return; }
			shouldBeCalled = false;
			timer = setTimeout(callFunc, delay);
			var ret = func.apply(ctx, args);

			return ret;
		};

		shouldBeCalled = true;
		if (timer) { return; }

		return callFunc();
	};
};

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * Notice: signature and documentation has been taken from `underscore` project
 *
 * @param  {Function} func    Function to be called
 * @param  {Number} wait      Amount of milliseconds to wait before invocation
 * @param  {Boolean} [immediate] Invocation edge
 * @return {Function}           Debounced function `func`
 */
LJ.debounce = function (func, wait, immediate) {
	'use strict';

	var timeout, result;

	return function () {
		var context = this,
			args = arguments,
			later,
			callNow = immediate && !timeout;

		later = function() {
			timeout = null;
			if ( !immediate ) {
				result = func.apply(context, args);
			}
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) {
			result = func.apply(context, args);
		}

		return result;
	};
},

/**
 * Create function that will call target function at most once
 * per every delay. Arguments are queued and when delay ends
 * function is called with last supplied arguments set. Optionally
 * arguments queue can be preserved on call, so all sheduled will be done.
 *
 * @param {Function} f The function to call.
 * @param {Number} delay Delay between the calls in ms.
 * @param {Boolean} preserve Run all queued sequentially
 */

LJ.threshold = function (f, delay, preserve) {
	var queue = [],
		batchSize, batch,
		lock = false,

		callback = function () {
			var caller = this;

			if (lock || !queue.length) {
				return;
			}

			while (queue.length) {
				lock = true;

				if (preserve) {
					f.apply(caller, queue.shift());
				} else {
					f.apply(caller, queue.pop());
					queue = [];
				}

				if (batch && --batch) {
					lock = false;
					continue;
				}

				setTimeout(function () {
					lock = false;
					batch = batchSize;
					callback.call(caller);
				}, delay);

				break;
			}
		},

		threshold = function () {
			queue.push([].slice.call(arguments));
			callback.call(this);
		};

	threshold.resetQueue = function () {
		queue = [];
	};

	threshold.batch = function (size) {
		if (size !== undefined) {
			batchSize = size >>> 0;
			if (!lock) {
				batch = batchSize;
			}
		}
	};

	return threshold;
};

LJ._const = {};

/**
 * Define a constant.
 *
 * @param {string} name name of the constant. All spaces will be replaced with underline.
 *     if constant was already defined, the function will throw the exception.
 * @param {*} value A value of the constant.
 */
LJ.defineConst = function(name, value) {
	name = name.toUpperCase().replace(/\s+/g, '_');

	if (LJ._const.hasOwnProperty(name)) {
		throw new Error('constant was already defined');
	} else {
		LJ._const[name] = value;
	}
};

/**
 * Get the value of the constant.
 *
 * @param {string} name The name of the constant.
 * @return {*} The value of the constant or undefined if constant was not defined.
 */
LJ.getConst = function(name) {
	name = name.toUpperCase().replace(/\s+/g, '_');

	return (LJ._const.hasOwnProperty(name) ? LJ._const[name] : void 0);
};

/**
 * @namespace LJ.Util.Journal Utility functions connected with journal
 */
LJ.define('LJ.Util.Journal');

(function() {
	var base = (LJ.pageVar('siteroot', true) || 'http://www.livejournal.com')
						.replace('http://www', ''),
		journalReg  = new RegExp('^http:\\/\\/([\\w-]+)' + base.replace(/\./, '\\.') + '(?:\\/(?:([\\w-]+)\\/)?(?:(\\d+)\\.html)?)?$');

	/**
	 * Parse journal link to retrieve information from it
	 *
	 * @param {string} url The string to parse.
	 * @return {Object} Return object will contain fields journal and ditemid(if availible) or null if the link cannot be parsed.
	 */
	LJ.Util.Journal.parseLink = function(url) {
		if (!url) {
			return null;
		}

		if (!url.match(/(\.html|\/)$/)) {
			url += '/';
		}

		var regRes = journalReg.exec(url),
			result = {};

		if (!regRes || !regRes[1]) { return null; }

		if (!regRes[1].match(/^(?:users|community)$/)) {
			result.journal = regRes[1];
		} else {
			if (!regRes[2]) { return null; }
			result.journal = regRes[2];
		}

			result.journal = result.journal.replace(/-/g, '_');

		if (regRes[3]) {
			result.ditemid = parseInt(regRes[3], 10);
		}

		return result;
	};

	/**
	 * Render journal link according to the standard scheme.
	 *
	 * @param {string} journal Journal name.
	 * @param {string|number}  ditemid Id of the post in the journal.
	 * @param {boolean} iscomm Whether to treat the journal as community.
	 *
	 * @return {string|null} Result is a link to the journal page or null if no journal was specified.
	 */
	LJ.Util.Journal.renderLink = function(journal, ditemid, iscomm) {
		if (!journal) {
			return null;
		}

		var url = 'http://';
		if (iscomm) {
			url += 'community' + base + '/' + journal;
		} else if (journal.match(/^_|_$/)) {
			url += 'users' + base + '/' + journal;
		} else {
			url += journal.replace(/_/g, '-') + base;
		}

		url += '/';

		if (ditemid) {
			url += ditemid + '.html';
		}

		return url;
	};

}());

/**
 * @namespace LJ.Util.Date The namespace contains utility functions connected with date.
 */
LJ.define('LJ.Util.Date');

(function() {

	var months = [ 'january', 'february', 'march', 'april',
					'may', 'june', 'july', 'august',
					'september', 'october', 'november', 'december' ],
		month_ml = 'date.month.{month}.long';

	function normalizeFormat(format) {
		if (!format || format === 'short') {
			format = LiveJournal.getLocalizedStr('date.format.short');
		} else if (format === 'long') {
			format = LiveJournal.getLocalizedStr('date.format.long');
		}

		return format;
	}

	function getMonth(idx) {
		var month = months[ idx % 12 ];
		return LiveJournal.getLocalizedStr(month_ml.supplant({month: month}));
	}

	/**
	 * Parse date from string.
	 *
	 * @param {string} datestr The string containing the date.
	 * @param {string} format Required date string format.
	 */
	LJ.Util.Date.parse = function(datestr, format) {
		format = normalizeFormat(format);

		//don't touch it if you can't use it
		if (!datestr) { return datestr; }

		var testStr = normalizeFormat(format),
			positions = [ null ],
			pos = 0, token,
			regs = {
				'%Y' : '(\\d{4})',
				'%M' : '(\\d{2})',
				'%D' : '(\\d{2})'
			};

		while( ( pos = testStr.indexOf( '%', pos ) ) !== -1 ) {
			token = testStr.substr( pos, 2 );
			if( token in regs ) {
				testStr = testStr.replace( token, regs[ token ] );
				positions.push( token );
			} else {
				pos += 2; //skip this token
				positions.push( null );
			}
		}

		var r = new RegExp( testStr ),
			arr = r.exec( datestr );

		if( !arr ) {
			return null;
		} else {
			var d = new Date();
			for( var i = 1; i < arr.length; ++i ) {
				if( positions[ i ] ) {
					switch( positions[ i ] ) {
						case '%D':
							d.setDate( arr[ i ] );
							break;
						case '%M':
							d.setMonth( parseInt( arr[ i ], 10 ) - 1 );
							break;
						case '%Y':
							d.setFullYear( arr[ i ] );
							break;
					}
				}
			}

			return d;
		}
	};

	/**
	 * Create string representation of object according to the format.
	 *
	 * @param {Date} date The date object to work with.
	 * @param {string=} format String format. Possible default formats are 'short' and 'long'.
	 */
	LJ.Util.Date.format = function(date, format) {
		format = normalizeFormat(format);

		return format.replace( /%([a-zA-Z]{1})/g, function(str, letter) {
			switch (letter) {
				case 'M' :
					return ('' + (date.getMonth() + 1)).pad(2, '0');
				case 'B' : //full month
					return getMonth(date.getMonth());
				case 'D' :
					return ('' + date.getDate()).pad(2, '0');
				case 'Y' :
					return date.getFullYear();
				case 'R' :
					return ('' + date.getHours()).pad(2, '0') + ':' + ('' + date.getMinutes()).pad(2, '0');
				case 'T' :
					return [
						('' + date.getHours()).pad(2, '0'),
						('' + date.getMinutes()).pad(2, '0'),
						('' + date.getSeconds()).pad(2, '0')
					].join(':');
				default:
					return str;
			}
		});
	};

	/**
	 * Get timezone from the date object in the canonical way.
	 *
	 * @return {string} A string representation of timezone, eg +0400
	 */
	LJ.Util.Date.timezone = function() {
		var offset = (-(new Date()).getTimezoneOffset() / 0.6),
			str = '';

		if (offset > 0) {
			str += '+';
		} else if (offset < 0) {
			str += '-';
			offset = -offset;
		}

		str += ('' + offset).pad(4, '0');

		return str;
	};

}());


LJ.DOM = LJ.DOM || {};

/**
 * Inject stylesheet into page.
 *
 * @param {string} Stylesheet filename to inject.
 * @param {global} Global object.
 */
LJ.DOM.injectStyle = function(fileName, _window) {
	var w = _window || window,
		head = w.document.getElementsByTagName("head")[0],
		cssNode = w.document.createElement('link');

	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = fileName;

	head.appendChild(cssNode);
};

/**
 * Get field's selection
 * @param  {jQuery/DOM} node jQuery or DOM node
 * @return {Object}      Object, contains { start, end } coordinates of selection
 */
LJ.DOM.getSelection = function (node) {
	var start = 0,
		end = 0,
		range,
		dup,
		regexp = null;

	if (!node.nodeName) {
		node = node.get(0);
	}

	if ( 'selectionStart' in node ) {
		return {
			start: node.selectionStart,
			end: node.selectionEnd
		};
	}

	if ( 'createTextRange' in node ) {
		range = document.selection.createRange();
		if ( range.parentElement() == node ) {
			dup = range.duplicate();
			if ( node.type === 'text' ) {
				node.focus();
				start = -dup.moveStart('character', -node.value.length);
				end = start + range.text.length;
			} else {
				// textarea
				regexp = /\r/g;
				dup.moveToElementText(node);
				dup.setEndPoint('EndToStart', range);
				start = dup.text.replace(regexp, '').length;
				dup.setEndPoint('EndToEnd', range);
				end = dup.text.replace(regexp, '').length;
				dup = document.selection.createRange();
				dup.moveToElementText(node);
				dup.moveStart('character', start);
				while (dup.move('character', -dup.compareEndPoints('StartToStart', range))) {
					start += 1;
				}
				dup.moveStart('character', end - start);
				while (dup.move('character', -dup.compareEndPoints('StartToEnd', range))) {
					end += 1;
				}
			}
		}
	}

	return {
		start: start,
		end: end
	};
};

/**
 * Set selection for node
 * @param {jQuery/DOM} node jQuery or native DOM node
 * @param {number} start Selection start position
 * @param {number} end   Selection end position
 */
LJ.DOM.setSelection = function (node, start, end) {
	var range;
	if (!node.nodeName) {
		node = node.get(0);
	}
	// see https://bugzilla.mozilla.org/show_bug.cgi?id=265159
	node.focus();
	if( node.setSelectionRange ){
		node.setSelectionRange(start, end);
	}
	// IE, "else" for opera 10
	else if (document.selection && document.selection.createRange){
		range = node.createTextRange();
		range.collapse(true);
		range.moveEnd('character', end);
		range.moveStart('character', start);
		range.select();
	}
};

/**
 * Set cursor position inside of input/textarea element
 * @param {jQuery/DOM} node     jQuery or DOM node
 * @param {[type]} position Cursor position
 */
LJ.DOM.setCursor = function (node, position) {
	var text, length, absPosition;
	if (!node.nodeName) {
		node = node.get(0);
	}

	text = ( 'value' in node ? node.value : node.text ).replace(/\r/, ''),
	length = text.length;

	// convenient positions
	if (position === 'end') {
		return LJ.DOM.setSelection(node, length, length);
	}
	if (position === 'start') {
		return LJ.DOM.setSelection(node, 0, 0);
	}
	// calculation of correct caret position
	if (position > 0) {
		if (position > length) {
			position = length;
		}
	} else if (position !== 0) {
		absPosition = Math.abs(position);
		position = absPosition > length ? 0 : length - absPosition;
	}
	LJ.DOM.setSelection(node, position, position);
};

/**
 * @namespace LJ.UI Namespace should contain utility functions that are connected with widgets.
 */
LJ.UI = LJ.UI || {};

LJ.UI._mixins = {};

/**
 * Register a mixin to allow to use it later in the jQuery UI widgets.
 *
 * @param {string} name Name of the widget.
 * @param {Function} module The function that will bootsrap widget. The Function will be applied
 *     to the widget instance and the return object will represent the public api for the mixin.
 */
LJ.UI.mixin = function(name, module) {
	if (arguments.length === 1) {
		if (LJ.UI._mixins.hasOwnProperty(name)) {
			return LJ.UI._mixins[name];
		} else {
			LJ.console.log('Warn: Mixin ', name, ' was called but is not defined yet.');
		}
	} else {
		LJ.UI._mixins[name] = module;
	}
};

(function() {

	var locale = (LJ.pageVar('locale', true) || 'en_LJ').substr(0, 2),
		//All handlers were directly copied from LJ::Lang code
		handlers = {
			be: plural_form_ru,
			en: plural_form_en,
			fr: plural_form_fr,
			hu: plural_form_singular,
			is: plural_form_is,
			ja: plural_form_singular,
			lt: plural_form_lt,
			lv: plural_form_lv,
			pl: plural_form_pl,
			pt: plural_form_fr,
			ru: plural_form_ru,
			tr: plural_form_singular,
			uk: plural_form_ru
		};

// English, Danish, German, Norwegian, Swedish, Estonian, Finnish, Greek,
// Hebrew, Italian, Spanish, Esperanto
function plural_form_en(count) {
	if (count == 1) {
		return 0;
	}

	return 1;
}

// French, Portugese, Brazilian Portuguese
function plural_form_fr(count) {
	if (count > 1) {
		return 1;
	}

	return 0;
}

// Croatian, Czech, Russian, Slovak, Ukrainian, Belarusian
function plural_form_ru(count) {
	if (typeof count === 'undefined') { return 0; }

	if (count % 10 == 1 && count % 100 != 11) {
		return 0;
	}

	if ((count % 10 >= 2 && count % 10 <= 4) &&
		(count % 100 < 10 || count % 100 >= 20)) {
		return 1;
	}

	return 2;
}

// Polish
function plural_form_pl(count) {
	if (count === 1) {
		return 0;
	}

	if ((count % 10 >= 2 && count % 10 <= 4) &&
		(count % 100 < 10 || count % 100 >= 20)) {
		return 1;
	}

	return 2;
}

// Lithuanian
function plural_form_lt(count) {
	if (count % 10 == 1 && count % 100 != 11) {
		return 0;
	}

	if ((count % 10 >= 2) &&
		(count % 100 < 10 || count % 100 >= 20)) {
		return 1;
	}

	return 2;
}

// Hungarian, Japanese, Korean (not supported), Turkish
function plural_form_singular(count) {
	return 0;
}

// Latvian
function plural_form_lv(count) {
	if (count % 10 === 1 && count % 100 !== 11) {
		return 0;
	}

	if (count != 0) {
		return 1;
	}

	return 2;
}

// Icelandic
function plural_form_is(count) {
	if (count % 10 === 1 && count % 100 !== 11) {
		return 0;
	}
	return 1;
}

	function pluralize(num, forms) {
		var handler = handlers.hasOwnProperty(locale) ? handlers[locale] : handlers['en'],
			form = handler(num);
		return forms[form] ? forms[form] : '';
	}

	/**
	 * Get localized string.
	 *
	 * @param {string} key A key to search.
	 * @param {Object} dict A hash to search values for substitution.
	 * @param {string=} def A default value to return if the string was not returned from the server.
	 *
	 * @return {string} Localized value for string.
	 */
	LJ.ml = function(key, dict, def) {
		var str = '', tmpl;
		dict = dict || {};

		if (Site.ml_text.hasOwnProperty(key)) {
			str = Site.ml_text[key];

			str = str.replace( /\[\[\?([\w-]+)\|(.*?)\]\]/g, function(str, numstr, forms) {
				if (!dict.hasOwnProperty(numstr)) { return str; }

				var num = parseInt(dict[numstr], 10);
				return pluralize(num, forms.split('|'));
			});

			for (tmpl in dict) {
				if (dict.hasOwnProperty(tmpl)) {
					str = str.replace('%' + tmpl + '%', dict[tmpl]);
					str = str.replace('[[' + tmpl + ']]', dict[tmpl]);
				}
			}
		} else {
			str = def || '[' + key + ']';
			LJ.console.log("Text variable ["+ key +"] hasn't been defined.");
		}

		return str;
	};

	/**
	 * LJ.ml alias for templates
	 */
	LJ.mltext = function (key) {
		var dict = {},
			args = Array.prototype.slice.call(arguments, 1),
			i, l;

		for (i = 0, l = args.length; i < l; i += 2) {
			dict[args[i]] = args[i + 1] || '';
		}

		return LJ.ml(key, dict);
	};
}());



/* object extensions */
if (!Object.extend)
	Object.extend = function (d, s){
		if(d) for(var p in s) if(!d[p]) d[p] = s[p];
		return d;
	};

if (!Object.override)
	Object.override = function (d, s){
		if(d) for(var p in s) d[p] = s[p];
		return d;
	};

/* function extensions */
/**
 * Returns an array of all own enumerable properties found upon a given object,
 * in the same order as that provided by a for-in loop.
 *
 * @param {Object} The object whose enumerable own properties are to be returned.
 *
 * @return {Array} Array with properties names.
 */

Object.extend(Function.prototype, {
	bindEventListener: function(object) {
		var method = this; // Use double closure to work around IE 6 memory leak.
		return function(e) {
			e = Event.prep(e);
			return method.call(object, e);
		};
	}
});

Object.extend(Function, {
	defer: function(func, args/*, more than one*/) {
		args = Array.prototype.slice.call(arguments, 1);

		setTimeout(function() {
			func.apply(null, args);
		}, 0);
	},

	/**
	 * Create a function that will call a function func with arguments
	 * through setTimeout set to zero.
	 * @param {Function} func The function to wrap.
	 * @param {Object} args Any arguments to attach to function call.
	 *
	 * @return {Function} Return newly created delayed function.
	 */
	defered: function(func, args) {
		args = args || [];
		return function() {
			var args2 = args.concat([].slice.call(arguments, 0));

			Function.defer(func, args2);
		};
	}
});



/* class helpers */
indirectObjects = [];

Class = function(superClass){
	// Set the constructor:
	var constructor = function(){
		if(arguments.length)
			this.init.apply(this, arguments);
	};
	//   -- Accomplish static-inheritance:
	Object.override(constructor, Class);  // inherit static methods from Class

	superClass = superClass || function(){
	};
	superClassFunc = function(){
	};
	Object.extend(superClassFunc.prototype, superClass.prototype);
	Object.extend(superClassFunc.prototype, {
		init: function(){
		},
		destroy: function(){
		}
	});
	Object.override(constructor, superClass); // inherit static methods from the superClass
	constructor.superClass = superClassFunc.prototype;

	// Set the constructor's prototype (accomplish object-inheritance):
	constructor.prototype = new superClass();
	constructor.prototype.constructor = constructor; // rev. 0.7
	//   -- extend prototype with Class instance methods
	Object.extend(constructor.prototype, Class.prototype);
	//   -- override prototype with interface methods
	for(var i = 1; i < arguments.length; i++)
		Object.override(constructor.prototype, arguments[i]);

	return constructor;
};

Class.prototype = {
	destroy: function(){
		try{
			if(this.indirectIndex)
				indirectObjects[ this.indirectIndex ] = undefined;
			delete this.indirectIndex;
		} catch(e){
		}

		for(var property in this){
			try{
				delete this[ property ];
			} catch(e){
			}
		}
	}
};



/* string extensions */
Object.extend(String, {
	escapeJSChar: function( c ) {
		// try simple escaping
		switch( c ) {
			case "\\": return "\\\\";
			case "\"": return "\\\"";
			case "'":  return "\\'";
			case "\b": return "\\b";
			case "\f": return "\\f";
			case "\n": return "\\n";
			case "\r": return "\\r";
			case "\t": return "\\t";
		}

		// return raw bytes now ... should be UTF-8
		if( c >= " " )
			return c;

		// try \uXXXX escaping, but shouldn't make it for case 1, 2
		c = c.charCodeAt( 0 ).toString( 16 );
		switch( c.length ) {
			case 1: return "\\u000" + c;
			case 2: return "\\u00" + c;
			case 3: return "\\u0" + c;
			case 4: return "\\u" + c;
		}

		// should never make it here
		return "";
	},

	encodeEntity: function( c ) {
		switch( c ) {
			case "<": return "&lt;";
			case ">": return "&gt;";
			case "&": return "&amp;";
			case '"': return "&quot;";
			case "'": return "&apos;";
		}
		return c;
	},

	decodeEntity: function( c ) {
		switch( c ) {
			case "amp": return "&";
			case "quot": return '"';
			case "apos": return "'";
			case "gt": return ">";
			case "lt": return "<";
		}
		var m = c.match( /^#(\d+)$/ );
		if( m && defined( m[ 1 ] ) )
			return String.fromCharCode( m[ 1 ] );
		m = c.match( /^#x([0-9a-f]+)$/i );
		if(  m && defined( m[ 1 ] ) )
			return String.fromCharCode( parseInt( hex, m[ 1 ] ) );
		return c;
	}
});

Object.extend(String.prototype, {
	escapeJS: function()
	{
		return this.replace( /([^ -!#-\[\]-~])/g, function( m, c ) { return String.escapeJSChar( c ); } )
	},

	/**
	 * Encode a string to allow a secure insertion in html code.
	 */
	encodeHTML: function() {
		return this.replace( /([<>&\"\'])/g, function( m, c ) { return String.encodeEntity( c ) } ); /* fix syntax highlight: " */
	},

	decodeHTML: function() {
		return this.replace( /&(.*?);/g, function( m, c ) { return String.decodeEntity( c ) } );
	},

	/**
	 * Add chars in front of string until it gets the length required.
	 *
	 * @param {Number} length Required string length.
	 * @param {String} padChar A char to add in front of string.
	 *
	 * @return {String} A padded string.
	 */
	pad: function(length, padChar)
	{
		return ((new Array(length + 1))
			.join(padChar)
			+ this
		).slice(-length);
	},

	supplant: function(o)
	{
		return this.replace(/{([^{}]*)}/g,
			function (a, b) {
				var r = o[b];
				return typeof r === 'string' || typeof r === 'number' ? r : a;
			});
	}
});

// will be shimmed using es6-shim later
if (typeof String.prototype.startsWith !== 'function') {
	String.prototype.startsWith = function(start) {
		return this.slice(0, String(start).length) === start;
	}
}

/* extend array object */
Object.extend(Array.prototype, {
	/**
	 * Check if index fits in current array size and fix it otherwise.
	 *
	 * @param {Number} fromIndex Index to check.
	 * @param {Number} defaultIndex This value will be taken if fromIndex is not defined.
	 *
	 * @return {Number} Fixed index value.
	 */
	fitIndex: function(fromIndex, defaultIndex)
	{
		if (fromIndex !== undefined || fromIndex == null) {
			fromIndex = defaultIndex;
		} else if (fromIndex < 0) {
			fromIndex = this.length + fromIndex;
			if (fromIndex < 0) {
				fromIndex = 0;
			}
		} else if (fromIndex >= this.length) {
			fromIndex = this.length - 1;
		}
		return fromIndex;
	},

	/**
	 * The function takes its arguments and add the ones that are not already inside to the end.
	 *
	 * @return {Number} New length of the array.
	 */
	add: function(/* a1, a2, ... */)
	{
		for (var j, a = arguments, i = 0; i < a.length; i++ ) {
			j = this.indexOf(a[i]);
			if (j < 0) {
				this.push(arguments[i]);
			}
		}
		return this.length;
	},

	/*
	 * The function takes its arguments and removes them from the array, if they are inside
	 *
	 * @return {Number} New length of the array.
	 */
	remove: function(/* a1, a2, ... */)
	{
		for (var j, a = arguments, i = 0; i < a.length; i++ ) {
			j = this.indexOf(a[i]);
			if (j >= 0) {
				this.splice(j, 1);
			}
		}
		return this.length;
	}
});

/* ajax */
var XMLHttpRequest = XMLHttpRequest || window.ActiveXObject && function(){
	return new ActiveXObject('Msxml2.XMLHTTP');
};

//dom.js
/* DOM class */
DOM = {
	getElement: function(e){
		return (typeof e == "string" || typeof e == "number") ? document.getElementById(e) : e;
	},

	addEventListener: function(e, eventName, func, useCapture){
		if(e.addEventListener)
			e.addEventListener(eventName, func, useCapture); else if(e.attachEvent)
			e.attachEvent('on' + eventName, func); else
			e['on' + eventName] = func;
	},

	removeEventListener: function(e, eventName, func, useCapture){
		if(e.removeEventListener)
			e.removeEventListener(eventName, func, useCapture); else if(e.detachEvent)
			e.detachEvent('on' + eventName, func); else
			e['on' + eventName] = undefined;
	},

	/* style */
	getComputedStyle: function(node){
		if(node.currentStyle){
			return node.currentStyle;
		}
		var defaultView = node.ownerDocument.defaultView;
		if(defaultView && defaultView.getComputedStyle){
			return defaultView.getComputedStyle(node, null);
		}
	},

	// given a window (or defaulting to current window), returns
	// object with .x and .y of client's usable area
	getClientDimensions: function(w){
		if(!w)
			w = window;

		var d = {};

		// most browsers
		if(w.innerHeight){
			d.x = w.innerWidth;
			d.y = w.innerHeight;
			return d;
		}

		// IE6, strict
		var de = w.document.documentElement;
		if(de && de.clientHeight){
			d.x = de.clientWidth;
			d.y = de.clientHeight;
			return d;
		}

		// IE, misc
		if(document.body){
			d.x = document.body.clientWidth;
			d.y = document.body.clientHeight;
			return d;
		}

		return undefined;
	},

	getDimensions: function(e){
		if(!e)
			return undefined;

		var style = DOM.getComputedStyle(e);

		return {
			offsetLeft: e.offsetLeft,
			offsetTop: e.offsetTop,
			offsetWidth: e.offsetWidth,
			offsetHeight: e.offsetHeight,
			clientWidth: e.clientWidth,
			clientHeight: e.clientHeight,

			offsetRight: e.offsetLeft + e.offsetWidth,
			offsetBottom: e.offsetTop + e.offsetHeight,
			clientLeft: finiteInt(style.borderLeftWidth) + finiteInt(style.paddingLeft),
			clientTop: finiteInt(style.borderTopWidth) + finiteInt(style.paddingTop),
			clientRight: e.clientLeft + e.clientWidth,
			clientBottom: e.clientTop + e.clientHeight
		};
	},

	getAbsoluteDimensions: function(e){
		var d = DOM.getDimensions(e);
		if(!d)
			return d;
		d.absoluteLeft = d.offsetLeft;
		d.absoluteTop = d.offsetTop;
		d.absoluteRight = d.offsetRight;
		d.absoluteBottom = d.offsetBottom;
		var bork = 0;
		while(e){
			try{ // IE 6 sometimes gives an unwarranted error ("htmlfile: Unspecified error").
				e = e.offsetParent;
			} catch (err){
				if(++bork > 25)
					return null;
			}
			if(!e)
				return d;
			d.absoluteLeft += e.offsetLeft;
			d.absoluteTop += e.offsetTop;
			d.absoluteRight += e.offsetLeft;
			d.absoluteBottom += e.offsetTop;
		}
		return d;
	},


	setLeft: function(e, v){
		e.style.left = finiteInt(v) + "px";
	},
	setTop: function(e, v){
		e.style.top = finiteInt(v) + "px";
	},
	setWidth: function(e, v){
		e.style.width = Math.max(0, finiteInt(v)) + "px";
	},
	setHeight: function(e, v){
		e.style.height = Math.max(0, finiteInt(v)) + "px";
	},

	getWindowScroll: function(w){
		var s = {
			left: 0,
			top: 0
		};

		if(!w) w = window;
		var d = w.document;
		var de = d.documentElement;

		// most browsers
		if(w.pageXOffset !== undefined){
			s.left = w.pageXOffset;
			s.top = w.pageYOffset;
		}

		// ie
		else if(de && de.scrollLeft !== undefined){
			s.left = de.scrollLeft;
			s.top = de.scrollTop;
		}

		// safari
		else if(w.scrollX !== undefined){
			s.left = w.scrollX;
			s.top = w.scrollY;
		}

		// opera
		else if(d.body && d.body.scrollLeft !== undefined){
			s.left = d.body.scrollLeft;
			s.top = d.body.scrollTop;
		}

		return s;
	},

	getAbsoluteCursorPosition: function(event){
		event = event || window.event;
		var s = DOM.getWindowScroll(window);
		return {
			x: s.left + event.clientX,
			y: s.top + event.clientY
		};
	},

	/* dom methods */
	filterElementsByClassName: function(es, className){
		var filtered = [];
		for(var i = 0; i < es.length; i++){
			var e = es[ i ];
			if(DOM.hasClassName(e, className))
				filtered[ filtered.length ] = e;
		}
		return filtered;
	},

	filterElementsByAttribute: function(es, attr){
		if(!es)
			return [];
		if(!attr)
			return es;
		var filtered = [];
		for(var i = 0; i < es.length; i++){
			var element = es[ i ];
			if(!element)
				continue;
			if(element.getAttribute && ( element.getAttribute(attr) ))
				filtered[ filtered.length ] = element;
		}
		return filtered;
	},

	filterElementsByTagName: function(es, tagName){
		if(tagName == "*")
			return es;
		var filtered = [];
		tagName = tagName.toLowerCase();
		for(var i = 0; i < es.length; i++){
			var e = es[ i ];
			if(e.tagName && e.tagName.toLowerCase() == tagName)
				filtered[ filtered.length ] = e;
		}
		return filtered;
	},

	// private
	getElementsByTagAndAttribute: function(root, tagName, attr){
		if(!root)
			root = document;
		var es = root.getElementsByTagName(tagName);
		return DOM.filterElementsByAttribute(es, attr);
	},

	getElementsByAttributeAndValue: function(root, attr, value){
		var es = DOM.getElementsByTagAndAttribute(root, "*", attr);
		var filtered = [];
		for(var i = 0; i < es.length; i++)
			if(es[ i ].getAttribute(attr) == value)
				filtered.push(es[ i ]);
		return filtered;
	},

	getElementsByTagAndClassName: function(root, tagName, className){
		if(!root)
			root = document;
		var elements = root.getElementsByTagName(tagName);
		return DOM.filterElementsByClassName(elements, className);
	},

	getElementsByClassName: function(root, className){
		return DOM.getElementsByTagAndClassName(root, "*", className);
	},

	getAncestors: function(n, includeSelf){
		if(!n)
			return [];
		var as = includeSelf ? [ n ] : [];
		n = n.parentNode;
		while(n){
			as.push(n);
			n = n.parentNode;
		}
		return as;
	},

	getAncestorsByClassName: function(n, className, includeSelf){
		var es = DOM.getAncestors(n, includeSelf);
		return DOM.filterElementsByClassName(es, className);
	},

	getFirstAncestorByClassName: function(n, className, includeSelf){
		return DOM.getAncestorsByClassName(n, className, includeSelf)[ 0 ];
	},

	hasClassName: function(e, className){
		if(!e || !e.className)
			return false;
		var cs = e.className.split(/\s+/g);
		for(var i = 0; i < cs.length; i++){
			if(cs[ i ] == className)
				return true;
		}
		return false;
	},

	addClassName: function(e, className){
		if(!e || !className)
			return false;
		var cs = e.className.split(/\s+/g);
		for(var i = 0; i < cs.length; i++){
			if(cs[ i ] == className)
				return true;
		}
		cs.push(className);
		e.className = cs.join(" ");
		return false;
	},

	removeClassName: function(e, className){
		var r = false;
		if(!e || !e.className || !className)
			return r;
		var cs = (e.className && e.className.length) ? e.className.split(/\s+/g) : [];
		var ncs = [];
		for(var i = 0; i < cs.length; i++){
			if(cs[ i ] == className){
				r = true;
				continue;
			}
			ncs.push(cs[ i ]);
		}
		if(r)
			e.className = ncs.join(" ");
		return r;
	},

	// deprecated: use LJ.DOM.* instead
	getSelectedRange: LJ.DOM.getSelection,
	setSelectedRange: LJ.DOM.setSelection
};

//httpreq.js

// opts:
// url, onError, onData, method (GET or POST), data
// url: where to get/post to
// onError: callback on error
// onData: callback on data received
// method: HTTP method, GET by default
// data: what to send to the server (urlencoded)
HTTPReq = {
	getJSON: function(opts){
		var req = new XMLHttpRequest();

		var state_callback = function(){
			if(req.readyState != 4) return;

			if(req.status != 200){
				if(opts.onError) opts.onError(req.status ? "status: " + req.status : "no data");
				return;
			}

			var resObj;
			var e;
			try{
				eval("resObj = " + req.responseText + ";");
			} catch (e){
			}

			if(e || ! resObj){
				if(opts.onError)
					opts.onError("Error parsing response: \"" + req.responseText + "\"");

				return;
			}

			if(opts.onData)
				opts.onData(resObj);
		};

		req.onreadystatechange = state_callback;

		var method = opts.method || "GET";
		var data = opts.data || null;

		var url = opts.url;
		if(opts.method == "GET" && opts.data){
			url += url.match(/\?/) ? "&" : "?";
			url += opts.data
		}

		url += url.match(/\?/) ? "&" : "?";
		url += "_rand=" + Math.random();

		req.open(method, url, true);

		// we should send null unless we're in a POST
		var to_send = null;

		if(method.toUpperCase() == "POST"){
			req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			to_send = data;
		}

		req.send(to_send);
	},

	formEncoded: function(vars){
		var enc = [];
		var e;
		for(var key in vars){
			enc.push(encodeURIComponent(key) + "=" + encodeURIComponent(vars[key]));
		}
		return enc.join("&");
	}
};

/**
 * Object responsible for statistic integration
 * @param  {jQuery} $ jQuery
 * @return {Object}   Methods for statistic interation
 */
LJ.Stat = (function ($) {
	var selector = '#hello-world',	// block for statistic addition
		el = null;					// cached jquery element

	/**
	 * Adds counter via inserting image on the page
	 * @param {String} img Image url
	 */
	function addCounter( url ) {
		var img = $('<img />', {
			src: url,
			alt: 'lj-counter'
		});
		// cache selector
		el = el || $(selector);
		el.append(img);
	}

	return {
		addCounter: addCounter
	};
}(jQuery));

LJ.siteMessage = (function ($) {
	'use strict';

	var scheme = LJ.pageVar('scheme'),
		messageSelector = '.appwidget-sitemessages',
		selectors = {
			lanzelot: { selector: '#main_body', method: 'before' },
			horizon: { selector: '#big-content-wrapper', method: 'prepend' },
			lynx: { selector: 'body', method: 'prepend' },

			// for journal pages
			journal: { selector: '#lj_controlstrip_new', method: 'after' }
		},
		// placeholder for methods to return
		methods = null;

	// we should run code only when document is ready and only for user
	// that is not currently logged in
	$(function () {
		if (!Site.remoteUser) {
			// wait for API initialization (inside of livejournal.js)
			setTimeout(methods.get.bind(methods), 0);
		}
	});

	methods = {
		/**
		 * Retrieve message from server and show it
		 */
		get: function () {
			var that = this;

			LJ.Api.call('sitemessage.get_message', { locale: Site.locale, country: Site.country }, function (data) {
				if (!data.error) {
					that.show(data.message);
				}
			});
		},

		/**
		 * Show content as message
		 * @param  {String} content Html representation of the message
		 */
		show: function (content) {
			var type = selectors[ scheme ? scheme : 'journal' ];

			// we should do nothing for this scheme yet
			if (scheme === 'schemius') {
				return;
			}

			// remove existed messages
			$(messageSelector).remove();

			// add message on the page
			$(type.selector)[type.method](content);
		}
	};

	return methods;
}(jQuery));
;

/* file-end: js/basic.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/jquery_fn.js 
*/

/* ---------------------------------------------------------------------------------
   file-start: js/hourglass.js 
*/

/**
 * @author Valeriy Vasin (valeriy.vasin@sup.com)
 * @description Create a little animated hourglass.
 */
;(function ($) {
    'use strict';

    /**
     * @class Hourglass
     * @constructor
     */
    function Hourglass() {
        this.element = $('<img />', {
            css: { position: 'absolute', display: 'none', zIndex: 5000 },
            width: 17,
            height: 17,
            src: (Site && Site.imgprefix) ?
                Site.imgprefix + '/hourglass.gif?v=1674' :
                '/img/hourglass.gif?v=1674'
        });

        this.element.appendTo(document.body);

        // name is used for backward compatibility with old widgets
        this.ele = this.element.get(0);

        if (arguments.length) {
            this.init.apply(this, arguments);
        }
    }

    /**
     * Initialize hourglass. Backward compatibility method.
     * @param  {HTMLElement} container  Dom element to show hourglass in
     * @param  {String}      className  Additional classname for the hourglass
     */
    Hourglass.prototype.init = function (container, className) {
        if (typeof className === 'string') {
            this.element.addClass(className);
        }

        if (typeof container !== 'undefined') {
            this.setContainer( container );
            this.show();
        }

        return this;
    };

    /**
     * Set position of for the hourglass
     * @param  {Number} x x-coordinate
     * @param  {Number} y y-coordinate
     */
    Hourglass.prototype.setPosition = function (x, y) {
        this.element.css({
            left: x - 8,
            top: y - 8
        });
        return this;
    };

    /**
     * Set parent element for hourglass
     * @param {HTMLElement} container Container in the center of which hourglass
     *                                will be showed
     */
    Hourglass.prototype.setContainer = function (container) {
        var $container = $(container),
            offset = $container.offset(),
            x = offset.left + $container.width() / 2,
            y = offset.top + $container.height() / 2;

        this.setPosition(x, y);
        return this;
    };

    /**
     * Set event according to which hourglass will be positioned
     * @param {jQuery.Event} e jQuery event
     */
    Hourglass.prototype.setEvent = function (e) {
        if (e.pageX && e.pageY) {
            this.setPosition(e.pageX, e.pageY);
        } else {
            this.setContainer(e.target);
        }
        return this;
    };

    /**
     * Show hourglass element
     */
    Hourglass.prototype.show = function () {
        this.element.show();
        return this;
    };

    /**
     * Hide hourglass element
     */
    Hourglass.prototype.hide = function () {
        this.element.hide();
        // backward compatibility
        this.remove();
        return this;
    };

    /**
     * Remove hourglass element
     */
    Hourglass.prototype.remove = function () {
        this.element.remove();
        return this;
    };

    /**
     * Place hourglass in the center of the element
     * @param {HTMLElement} container Container in the center of which hourglass
     *                                will be showed
     */
    Hourglass.prototype.hourglass_at_widget = function (container) {
        this.setContainer(container);
        this.show();
        return this;
    };

    /**
     * Set position of hourglass and show it. Backward compatibility method.
     * @param  {Number} x x-coordinate
     * @param  {Number} y y-coordinate
     */
    Hourglass.prototype.hourglass_at = function (x, y) {
        this.setPosition(x, y);
        this.show();
        return this;
    };

    /**
     * Add class to hourglass element. Backward compatibility method.
     * Notice: Use instance.element.addClass('my-class') instead
     * @param {String} className Class name
     */
    Hourglass.prototype.add_class_name = function (className) {
        this.element.addClass(className);
        return this;
    };

    // export to global
    window.Hourglass = Hourglass;
}(jQuery));
;

/* file-end: js/hourglass.js 
----------------------------------------------------------------------------------*/

/*global Hourglass */

jQuery.ajaxSetup({
	cache: false
});

/**
 * jQuery plugin that works with caret (it uses LJ.DOM.* methods and added for convenience only)
 * - if two arguments have been provided: setting selection from startPos to endPos
 * - if one argument: set cursor to startPos
 * - if no arguments: get selection of field
 *
 * @param  {number} startPos Start caret position
 * @param  {number} endPos   End caret position.
 */
jQuery.fn.caret = function (startPos, endPos) {
	var $el = this.length > 1 ? this.first() : this,
		length;

	if (startPos === 'start') {
		length = $el.val().length;
		LJ.DOM.setSelection($el, 0, 0);
		return this;
	}
	if (startPos === 'end') {
		length = $el.val().length;
		LJ.DOM.setSelection($el, length, length);
		return this;
	}

	if (typeof startPos === 'number') {
		if (typeof endPos !== 'number') {
			LJ.DOM.setCursor($el, startPos);
		} else {
			LJ.DOM.setSelection($el, startPos, endPos);
		}
		return this;
	} else {
		return LJ.DOM.getSelection($el);
	}
};


jQuery.fn.isCollapsed = function() {
	var selection = LJ.DOM.getSelection(this.get(0));
	return selection.start === selection.end;
};

/**
 * @deprecated Use hourglass.setEvent instead
 */
jQuery.fn.hourglass = function (xhr){
	var hourglasses = [];

	this.each(function () {
		var e,
			hourglass;

		// is complete or was aborted
		if (xhr && (xhr.readyState === 0 || xhr.readyState === 4)) {
			return;
		}

		if( !this.nodeType ) {
			// position from event
			e = jQuery.event.fix(this);
			hourglass = new Hourglass()
				.setEvent(e)
				.show();
		}

		hourglasses.push(hourglass);

		if (xhr) {
			hourglass.element.on('ajaxComplete', function (event, request){
				if (request === xhr){
					hourglass.remove();
				}
			});
		}
	});

	return hourglasses;
};

// not work for password
jQuery.fn.placeholder = (function()
{
	var check_focus = function() {
			if (this.value === this.getAttribute("placeholder")) {
				jQuery(this)
					.val("")
					.removeClass("placeholder");
			}
		},
		check_blur = function() {
			if (!this.value) {
				jQuery(this)
					.val(this.getAttribute("placeholder"))
					.addClass("placeholder");
			}
		},
		support;

	return function() {
		if (support === undefined) {
			support = "placeholder" in document.createElement("input");
		}
		if (support === true) {
			return this;
		} else {
			return this.each(function() {
				if (this.getAttribute("placeholder")) {
					var $this = jQuery(this);

					if (!$this.data('jQuery-has-placeholder')) {
						$this.focus(check_focus).blur(check_blur);

						jQuery(this.form)
							.submit(function() {
								$this.hasClass("placeholder") && $this.removeClass("placeholder").val("");
							});
					}

					this.value === this.getAttribute("placeholder") || !this.value
						? $this.val(this.getAttribute("placeholder")).addClass("placeholder")
						: $this.removeClass("placeholder");

					$this.data('jQuery-has-placeholder', true)
				}
			});
		}
	}
})();

//this one is fields type agnostic but creates additional label elements, which need to be styled
jQuery.fn.labeledPlaceholder = function(){
	function focus_action(input, label){
		label.hide();
	}

	function blur_action(input, label){
		if (input.val().length === 0) {
			label.show();
		}
	}

	return this.each(function(){

		if('placeholder' in document.createElement('input') && this.tagName.toLowerCase() === "input"){
			return;
		}
		if('placeholder' in document.createElement('textarea') && this.tagName.toLowerCase() === "textarea"){
			return;
		}

		var $this = jQuery(this),
			placeholder = $this.attr('placeholder');

		$this.wrap('<span class="placeholder-wrapper" />');

		if(!placeholder || placeholder.length === 0){
			return;
		}

		var label = jQuery("<label></label>").addClass('placeholder-label').mousedown(function(ev){
			setTimeout(function(){
				focus_action($this, label);
				$this.focus();
			}, 0);
		}).html(placeholder).insertBefore($this);
		$this.focus(function(){
			focus_action($this, label)
		}).blur(function(){
			blur_action($this, label)
		});

		blur_action($this, label);

	});
};

jQuery.fn.input = function(fn){
	return fn ? this.each(function(){
		var last_value = this.value;
		jQuery(this).bind("input keyup paste", function(e){
			// e.originalEvent use from trigger
			if(!e.originalEvent || this.value !== last_value){
				last_value = this.value;
				fn.apply(this, arguments);
			}
		})
	}) : this.trigger("input");
};

// ctrl+enter send form
jQuery.fn.disableEnterSubmit = function() {
	this.bind("keypress", function(e) {
		// keyCode == 10 in IE with ctrlKey
		if ((e.which === 13 || e.which === 10) && e.target && e.target.form) {
			if (e.ctrlKey && !jQuery(":submit", e.target.form).attr("disabled")
				&& (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT")
			) {
				e.target.form.submit();
			}

			if (e.target.tagName === "INPUT") {
				e.preventDefault();
			}
		}
	});
	return this;
};

/* function based on markup:
	tab links: ul>li>a
	current tab: ul>li.current
	tab container: ul>li
	tab container current: ul>li.current
*/
(function ($) {
	var supportHistoryAPI = !!window.history.pushState;
	var dataHistory = {};

	function changeTab(containers, links, index) {
		links
			.parent()
			.removeClass('current')
			.eq(index)
			.addClass('current');

		containers.removeClass('current')
			.eq(index)
			.addClass('current');

		LiveJournal.run_hook('change_tab', index);
	}

	function onClick(evt) {
		var item = $(this).parent(),
			index = item.index(),
			data = evt.data;

		if (data.containers[index]) {
			changeTab(data.containers, data.links, index);

			if (supportHistoryAPI) {
				window.history.pushState(null, '', this.href);
			}

			evt.preventDefault();
		}
	}

	if (supportHistoryAPI) {
		$(window).bind('popstate', function () {
			var data = dataHistory[location.href];

			if (data && data.length) {
				var length = data.length;
				while (length) {
					var itemData = data[--length];
					changeTab(itemData.containers, itemData.links, itemData.index);
				}
			}
		});
	}

	$.fn.tabsChanger = function(container) {
		var links = this.children('li').children('a');

		if (container) {
			container = $(container);
		} else {
			// next sibling of links
			container = links.parent().parent().next();
		}

		container = container.children('li');

		if (supportHistoryAPI) {
			links.each(function (index) {
				var urlData = dataHistory[this.href];

				if (!urlData) {
					urlData = dataHistory[this.href] = [];
				}

				urlData.push({
					index: index,
					links: links,
					containers: container
				});
			});
		}

		links.bind('click', {
			containers: container,
			links: links
		}, onClick);

		return this;
	};

})(jQuery);

/** jQuery overlay plugin
 * After creation overlay visibility can be toggled with
 * $( '#selector' ).overlay( 'show' ) and $( '#selector' ).overlay( 'hide' )
 */
jQuery.fn.overlay = function(opts){
	var options = {
		hideOnInit: true,
		hideOnClick: true
	};

	function Overlay(layer, options){
		this.layer = jQuery(layer);
		this.options = options;
		this.updateState(this.options.hideOnInit);
		this.bindEvents();
	}

	Overlay.prototype.bindEvents = function(){
		var overlay = this;

		if(this.options.hideOnClick){
			overlay.layer.mousedown(function(ev){
				ev.stopPropagation();
			});

			jQuery(document).mousedown(function(ev){
				overlay.updateState(true);
				ev.stopPropagation();
			});
		}
	};

	Overlay.prototype.updateState = function(hide){
		this.layerVisible = !hide;
		if(this.layerVisible){
			this.layer.show();
		} else {
			this.layer.hide();
		}
	};

	Overlay.prototype.proccessCommand = function (cmd){
		switch(cmd){
			case 'show' :
				this.updateState(false);
				break;
			case 'hide' :
				this.updateState(true);
				break;
		}
	};

	var cmd;
	if(typeof opts === "string"){
		cmd = opts;
	}

	return this.each(function(){
		if(!this.overlay){
			var o = jQuery.extend({}, options, opts || {});
			this.overlay = new Overlay(this, o);
		}

		if(cmd.length > 0){
			this.overlay.proccessCommand(opts)
		}
	});
};

/**
 * Function assures that callback will run not faster then minDelay.
 *
 * @param {Function} callback A callback to run.
 * @param {Number} minDelay Minimum delay in ms.
 *
 * @return {Function} Callback wrapper to use as a collback in your code.
 */
jQuery.delayedCallback = function(callback, minDelay) {
	var callCount = 2,
		results,
		checkFinish = function() {
			callCount--;
			if (callCount === 0) {
				callback.apply(null, results);
			}
		}

	setTimeout(checkFinish, minDelay);
	return function() {
		results = [].slice.apply(arguments);
		checkFinish();
	};
};

/**
 * Fix behavior of select box: trigger change event on keyup
 */
jQuery.fn.selectFix = function () {
	'use strict';

	return this.filter('select').on('keyup', function (e) {
		var code = e.which;
		if (code >= 37 && code <= 40) {
			jQuery(this).trigger('change');
		}
	});
};

/**
 * Provide ability to check if element is on the screen
 * @author Valeriy Vasin (valeriy.vasin@sup.com)
 */
;(function ($) {
	'use strict';
	// cache window object
	var $win = $(window);
	$.expr[':'].screenable = function (element) {
		var win = {},
			el = {},
			$el = $(element);

			// window coordinates
			win.width = $win.width(),
			win.height = $win.height(),
			win.top = $win.scrollTop(),
			win.bottom = win.top + win.height,
			win.left = $win.scrollLeft(),
			win.right = win.left + win.width,

			// element coordinates
			el.width = $el.width();
			el.height = $el.height();
			el.top = $el.offset().top;
			el.bottom = el.top + el.height;
			el.left = $el.offset().left;
			el.right = el.left + el.width;

		return (el.bottom > win.top && el.top < win.bottom) && (el.right > win.left && el.left < win.right);
	};
}(jQuery));

/**
 * @author Valeriy Vasin (valeriy.vasin@sup.com)
 * @description Parse lj-likes plugin
 *              It parses all elements with class 'lj-like', uncomment their content
 *              and parse with LiveJournal.parseLikeButtons()
 * @todo Move plugin to separate file
 */
;(function ($) {
	'use strict';

	var
		/**
		 * Empty collection that will contain not parsed lj-like elements
		 * that are currently on the page
		 */
		_likes = $();

	/**
	 * Remove comments inside node and parse likes
	 * @param  {Object} node jQuery node
	 * @return {Object}      jQuery node
	 */
	function parse(node) {
		var html = node.html(),
			// regexp for removing _tmplitem attribute
			tmplRegexp = /_tmplitem=['"]\d+['"]/mig;

		// uncomment like buttons
		html = $.trim( html.replace(/<!--([\s\S]*?)-->/mig, '$1') );

		/**
		 * Clean _tmplitem attributes
		 *
		 * It's a quirk for jquery templates possible bug with commented nodes
		 * and double applying jquery templates.
		 * _tmplitem attributes are not removed after compilation.
		 * Fix for #LJSUP-14149
		 */
		if ( tmplRegexp.test(html) ) {
			html = html.replace(tmplRegexp, '');
		}

		LiveJournal.parseLikeButtons( node.html(html) );

		return node;
	}

	/**
	 * handler for scroll event for lazy loading of likes
	 */
	function lazyLoad() {
		var screenableLikes = null;

		if ( _likes.length === 0 ) {
			return;
		}

		// find likes that are on the screen
		screenableLikes = _likes.filter(':screenable');

		if ( !screenableLikes.length ) {
			return;
		}

		screenableLikes.each(function () {
			var node = $(this);

			// move parsing to the end of the event loop
			setTimeout(function () {
				parse( node );
			}, 0);
		});

		// remove handled likes from the queue
		_likes = _likes.not(screenableLikes);
	}

	// after document ready, cuz LiveJournal namespace is not defined yet
	$(function () {
		/**
		 * Handle scroll event.
		 * Notice: for mobile devices we don't threshold lazyLoad
		 * because it fires only at the end of scrolling (iOS)
		 */
		$(window).on('scroll', LJ.Support.touch ? lazyLoad : LJ.threshold(lazyLoad, 1000));
	});

	$.fn.ljLikes = function (opts) {
		var likes = null;

		if ( this.length === 0 ) {
			return this;
		}

		opts = $.extend({}, $.fn.ljLikes.defaults, opts || {});

		// find elements with lj-likes class
		likes = this.find('.lj-like')
			.add( this.filter('.lj-like') )
			// filter previously unused items only and mark them as used
			.filter(function () {
				if (this.used) {
					return false;
				}
				this.used = true;
				return true;
			});

		if (likes.length === 0) {
			return this;
		}

		if ( !opts.lazy ) {
			// not lazy: immediately parsing
			likes.each(function () {
				var node = $(this);

				// parse should be deferred
				setTimeout(function () {
					parse( node );
				}, 0);
			});
		} else {
			// add likes for further lazy loading
			_likes = _likes.add( likes );
			// parse all added screenable elements
			lazyLoad();
		}
		return this;
	};

	// default plugin options
	$.fn.ljLikes.defaults = {
		/**
		 * Lazy loading of likes - will be parsed when becomes screenable
		 * if false - we will parse likes at the moment
		 */
		lazy: true
	};
}(jQuery));
;

/* file-end: js/jquery_fn.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/livejournal.js 
*/

/* ---------------------------------------------------------------------------------
   file-start: js/core/template.js 
*/

/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.tmpl.min.js 
*/

/*
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright 2011, Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},i=0,c=0,l=[];function g(g,d,h,e){var c={data:e||(e===0||e===false)?e:d?d.data:{},_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};g&&a.extend(c,g,{nodes:[],parent:d});if(h){c.tmpl=h;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++i;(l.length?f:b)[i]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a(i[h])[d](k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,m,k){if(d[0]&&a.isArray(d[0])){var g=a.makeArray(arguments),h=d[0],j=h.length,i=0,f;while(i<j&&!(f=a.data(h[i++],"tmplItem")));if(f&&c)g[2]=function(b){a.tmpl.afterManip(this,b,k)};r.apply(this,g)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var i,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(j(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);i=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(j(c,null,i)):i},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function j(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:j(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=k(c).concat(b);if(d)b=b.concat(k(d))});return b?b:k(c)}function k(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;$value={};with($data){__.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,k,g,b,c,d){var j=a.tmpl.tag[k],i,e,f;if(!j)throw"Unknown template tag: "+k;i=j._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=h(b);d=d?","+h(d)+")":c?")":"";e=c?b.indexOf(".")>-1?b+h(c):"("+b+").call($item"+d:b;f=c?e:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else f=e=i.$1||"null";g=h(g);return"');"+j[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(f).split("$1").join(e).split("$2").join(g||i.$2||"")+"__.push('"})+"');}return __;")}function n(c,b){c._wrap=j(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function h(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,h;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(h=j.length-1;h>=0;h--)m(j[h]);m(k)}function m(j){var p,h=j,k,e,m;if(m=j.getAttribute(d)){while(h.parentNode&&(h=h.parentNode).nodeType===1&&!(p=h.getAttribute(d)));if(p!==m){h=h.parentNode?h.nodeType===11?0:h.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[h]||f[h]);e.key=++i;b[i]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;h=a.data(j.parentNode,"tmplItem");h=h?h.key:0}if(e){k=e;while(k&&k.key!=h){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);
;

/* file-end: js/jquery/jquery.tmpl.min.js 
----------------------------------------------------------------------------------*/

(function ($, window) {
	'use strict';

	/* On partner sites LJ and LJ.UI are not defined */
	var LJ = window.LJ = window.LJ || {};
	LJ.UI = LJ.UI || {};

	/**
	 * Private namespace to hold information about templates.
	 */
	LJ.UI._templates = {};

	/**
	 * Asynchronously load template
	 *
	 * @param {string} name The name of the template.
	 * @param {callback} callback Callback is executed when loading done or error occured
	 */
	LJ.UI.loadTemplate = function (name, callback) {
		var url = '',
			timestamp = Site.server_time || String(Date.now()).replace(/\d{3}$/, '');

		callback = callback || $.noop;

		timestamp = Math.floor(timestamp / Site.templates_update_time);

		if (LJ.UI._templates[name]) {
			callback(undefined, name);
			return;
		}

		url += Site.statprefix + '/tmpl??';
		url += name.replace(/^templates-/, '').replace(/-/g, '/') + '.tmpl?';
		url += 'tm=' + timestamp;
		url += ';uselang=' + Site.locale;
		url += ';v=' + Site.version;

		$.ajax({
			url: url,
			cache: true,
			dataType: 'script'
		}).success(function () {
			if (LJ.UI._templates[name]) {
				callback(undefined, name);
			} else {
				callback(new Error('Template or server error'), name);
				console.log('Failed to setup template ' + name);
			}
		}).error(function () {
			callback(new Error('Network error'), name);
			console.log('Failed to load template ' + name);
		});
	};

	/**
	 * Register new template in system.
	 *
	 * @param {string} name The name of the template.
	 * @param {string} id Id of the script tag containing the templates or the template text.
	 * @param {string=jQuery} type Type of the template. Default is jquery templates.
	 */
	LJ.UI.registerTemplate = function (name, data, type) {
		var node, template;

		type = type || 'JQuery';

		switch (type) {
			case 'JQuery':
				node = $('#' + data);

				if (node.length) {
					$.template(name, node.html());
				} else {
					console.log('Template node #' + data + ' was not found');
					return;
				}

				break;

			case 'JQuery.stat':
				$.template(name, data);
				type = 'JQuery';
				break;
		}

		LJ.UI._templates[name] = {
			type: type,
			data: data
		};
	};

	/**
	 * Render the template with the data. Current version returns jQuery object
	 *    but surely should be able to return rendered strings.
	 *
	 *  @param {string} name The name of the template. Template should be registered.
	 *  @param {Object} data Data object to inset into template
	 *
	 *  @return {jQuery} jQuery object containing new markup.
	 */
	LJ.UI.template = function(name, data) {
		var template = LJ.UI._templates[name],
			message, html;

		if (!template) {
			message = 'Warn: template ' + name + ' was called but is not defined yet.';
			console.log(message);
			return $();
		}

		html = $.tmpl(name, data);

		return html;
	};
}(jQuery, this));
;

/* file-end: js/core/template.js 
----------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------
   file-start: js/core/track.js 
*/

/*
 * Methods to track stuff using Google Analytics
 */

(function() {
    'use strict';

    LJ.define('LJ.Track');

    var trackedTiming = {};

    function trackAnalytics(type) {
        var _gaqDefined = typeof window._gaq === 'object';

        if (!_gaqDefined) {
            console.warn('Google Analytics is not ready');
            return false;
        }

        var args  = Array.prototype.slice.call(arguments),
            stats = args.filter(Boolean);

        if (!LJ.pageVar('is_dev_server', true)) {
            window._gaq.push(stats);
        } else {
            console.info(stats);
        }

        return true;
    }

    /*
     * Both functions take arguments as documented here:
     * https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
     * https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingTiming
     *
     * @example
     *   LJ.Track.event('Category', 'Subcategory', 'Value', some_optional_number);
     *   LJ.Track.timing('Category', 'Subcategory', time_in_ms);
     */
    LJ.Track.event  = trackAnalytics.bind(this, '_trackEvent' );
    LJ.Track.timing = trackAnalytics.bind(this, '_trackTiming');

    /*
     * Same as LJ.Track.timing, but records timing only once
     */
    LJ.Track.timingOnce = function() {
        // key should not include timing value
        var key = JSON.stringify(Array.prototype.slice.call(arguments, 0, 2));

        if (!trackedTiming[key]) {
            LJ.Track.timing.apply(this, arguments);
            trackedTiming[key] = true;
        } else {
            if (Site.is_dev_server) {
                console.warn('Timing was already tracked');
            }
        }
    };

})();

/*
 * Following code sets _noActivity to true
 * when page is not active for given interval.
 */
(function($) {
    var MINUTE = 60 * 1000;

    var _noActivity = {};

    LJ.define('LJ.Activity');

    LJ.Activity.isInactiveMoreThan = function(interval) {
        if (!interval) {
            return false;
        }

        return _noActivity['interval' + interval];
    };

    LJ.Activity.hasInterval = function(interval) {
        return _noActivity.hasOwnProperty('interval' + interval);
    };

    /*
     * @param {Number} interval Inactivity interval in ms to track
     */
    function trackInactive(interval) {
        var timeout;

        /*
         * Setter for _noActivity
         */
        function noActivity(state) {
            var key = 'interval' + interval;

            if (_noActivity[key] === state) {
                return;
            }

            _noActivity[key] = state;

            if (state && LJ.Track) {
                LJ.Track.event('Site', 'Inactivity', 'Interval ' + Math.floor(interval / MINUTE));
            }
        }

        function makePageActive() {
            noActivity(false);

            clearTimeout(timeout);

            timeout = setTimeout(function() {
                noActivity(true);
            }, interval);
        }

        $(document).on(
            'click mousemove keypress scroll focus',
            LJ.throttle(makePageActive, 500)
        );

        makePageActive();
    }

    [5, 10, 15, 20, 25, 30, 35, 40].forEach(function(interval) {
        trackInactive(interval * MINUTE);
    });

})(jQuery);
;

/* file-end: js/core/track.js 
----------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------
   file-start: js/core/widget.js 
*/

(function ($, window) {
	'use strict';

	var widgets = {},
		unique = 0,
		baseClass = 'lj-widget',
		selector = '.' + baseClass;

	LJ.UI._widgets = widgets;

	/**
	 * Init widget node
	 *
	 * @param {jQuery} node Node
	 * @param {String} widget Widget name
	 * @param {String} entryPoint Leave empty to init when page is ready
	 */
	LJ.UI.initWidgetNode = function (node, widget, entryPoint) {
		if (node.hasClass(baseClass)) {
			console.log('Node already has class ' + baseClass);
			return;
		}

		node.addClass(baseClass);
		node.attr('data-widget', widget);

		if (entryPoint) {
			node.attr('data-bootstrap', entryPoint);
		}
	};

	/**
	 * Init widget on node
	 *
	 * @param {jQuery} node Node
	 */
	LJ.UI.initWidget = function (node, force) {
		var widget = node.data('widget'),
			options = node.data('widget-options'),
			bootstrap = node.data('bootstrap') || null,
			message;

		if (node.attr('data-widget-id')) {
			/* Widget already has unique id */
			return;
		}

		switch (typeof options) {
			case 'object':
				/* jQuery parsing was successfull */
				break;

			case 'string':
				/* Sometimes detection fails (when options string has line breaks) */
				try {
					options = LiveJournal.JSON.parse(options || '{}');
				} catch (error) {
					message = 'Invalid options string: ' + options + ' for widget ' + widget;

					console.log(message);

					options = {};
				}
				break;
		}

		if (force) {
			if (typeof $.fn[widget] === 'function') {
				$.fn[widget].apply(node, [options]);
			} else {
				message = 'Widget ' + widget + ' was not loaded';

				console.log(message);
				return;
			}
		}

		widgets[++unique] = {
			ready: !!force,
			entryPoint: bootstrap,
			options: options,
			name: widget,
			node: node
		};

		node
			.attr('data-widget-id', unique)
			.addClass(baseClass)
			.addClass(baseClass + '-' + unique);
	};

	/**
	 * Cleanup widget by node
	 *
	 * @param {jQuery} node Node
	 */
	LJ.UI.removeWidget = function (node) {
		var id = node.data('widget-id');

		if (!node.is(baseClass)) {
			console.log('Widget was not found on node');
			return;
		}

		if (widgets.hasOwnProperty(id)) {
			console.log('Widget ' + id + ' was removed already or never created');
			return;
		}

		delete widgets[id];
	};

	/**
	 * Init widgets with specific entry point or all remaining
	 *
	 * @param {String} entryPoint Entry point name
	 */
	LJ.UI.bootstrap = function (entryPoint) {
		var widget, unique, fn, message;

		$(selector).each(function () {
			LJ.UI.initWidget($(this));
		});

		for (unique in widgets) {
			if (widgets.hasOwnProperty(unique)) {
				widget = widgets[unique];

				if (widget.ready) {
					continue;
				}

				if (!entryPoint || widget.entryPoint === entryPoint) {
					fn = $.fn[widget.name];

					if (typeof fn === 'function') {
						fn.apply(widget.node, [widget.options]);
						widget.ready = true;
					} else {
						message = 'Widget ' + widget.name + ' was not loaded';

						console.log(message);
						continue;
					}
				}
			}
		}
	};
}(jQuery, this));
;

/* file-end: js/core/widget.js 
----------------------------------------------------------------------------------*/

// This file contains general-purpose LJ code
var LiveJournal = {};

// Hooks
;(function ($) {
    'use strict';

    LiveJournal.hooks = {}; // The hook mappings

    /**
     * Register handler for hook
     * @param  {String} hook Hook name
     * @param  {Function} func Hook handler
     */
    LiveJournal.register_hook = function (hook, func) {
        if (typeof hook !== 'string' || typeof func !== 'function') {
            throw new Error('Provide correct hook name or handler.');
        }

        if ( !LiveJournal.hooks[hook] ) {
            LiveJournal.hooks[hook] = [];
        }

        LiveJournal.hooks[hook].push(func);
    };

    /**
     * Run registered hooks
     * @param  {String} hook Hook name
     */
    LiveJournal.run_hook = function (hook /**, args*/) {
        var hookFuncs = LiveJournal.hooks[hook],
            args = null,
            result = null;

        // nothing has been registered for this hook
        if ( $.type(hookFuncs) !== 'array' || hookFuncs.length === 0 ) {
            return;
        }

        // arguments to pass for the hook
        args = Array.prototype.slice.call(arguments, 1);

        hookFuncs.forEach(function (hookFunc) {
            result = hookFunc.apply(null, args);
        });

        return result;
    };

    /**
     * Remove hook functionality
     * @param  {String} hook Hook name
     * @param  {Function} [func] Hook function to remove
     */
    LiveJournal.remove_hook = function (hook, func) {
        if (typeof hook !== 'string') {
            throw new Error('Hook name should be provided.');
        }

        // if no hooks has been registered yet
        if (!LiveJournal.hooks[hook]) {
            return;
        }

        if (typeof func === 'function') {
            LiveJournal.hooks[hook] = LiveJournal.hooks[hook].filter(function (hookFunc) {
                return hookFunc !== func;
            });
        } else {
            LiveJournal.hooks[hook] = [];
        }
    };
}(jQuery));

LiveJournal.initPage = function () {
    //LJRU-3137: The code relies on the Site global variable
    //so it appears on all livejournal pages. If it's
    //not there than we are on the external site.
    if (!window.Site) {
        return;
    }

    // when page loads, set up contextual popups
    jQuery(ContextualPopup.setupLive);

    if (LJ.Api) {
        LJ.Api.init({ auth_token: Site.auth_token });
    }

    LJ.UI.bootstrap();

    //register system hooks
    LiveJournal.register_hook('update_wallet_balance', LiveJournal.updateWalletBalance);
    LiveJournal.register_hook('xdr/message', LiveJournal.processXdr);

    // set up various handlers for every page
    LiveJournal.initInboxUpdate();

    LiveJournal.initNotificationStream();
    LiveJournal.initSpoilers();
    LiveJournal.initResizeHelper();

    //ljuniq cookie is checked here now instead of PageStats/Omniture.pm
    LiveJournal.checkLjUniq();

    // run other hooks
    LiveJournal.run_hook('page_load');
};

/**
 * Special helper class is added to the body if browser doesn't support media queries and
 * screen width is less then 1000px.
 */
LiveJournal.initResizeHelper = function() {
    var $window = jQuery(window),
        $body = jQuery('body'),
        hasClass = false,
        resizeFunc = LJ.throttle(function() {
            if ($window.width() <= 1000) {
                if (!hasClass) {
                    $body.addClass('l-width1000');
                    hasClass = true;
                }
            } else if (hasClass) {
                $body.removeClass('l-width1000');
                hasClass = false;
            }
        }, 500);

    //Only older ies need thes (caniuse.com)
    if (jQuery.browser.msie && Number(jQuery.browser.version) <= 8) {
        $window.on('resize', resizeFunc);
        resizeFunc();
    }
};

/**
 * Spoilers functionality - expand hidden text in posts when user clicks on corresponding link
 */
LiveJournal.initSpoilers = function() {
    jQuery(document).delegate('.lj-spoiler > .lj-spoiler-head a', 'click', function (evt) {
        evt.preventDefault();
        jQuery(this).closest('.lj-spoiler').toggleClass('lj-spoiler-opened');
    });
};

/**
 * Init long-polling connection to the server.
 * Now function can be used for testing purposes and
 * should be modified for any real use. E.g. it could be
 * used as an adapter to the Socket.IO
 */
LiveJournal.initNotificationStream = function(force) {
    force = force || false;
    var abortNotifications = false, seed = Site.notifySeed || 0;

    if (Site.notifyDisabled || (!Cookie('ljnotify') && !force && (Math.random() > seed))) {
        return;
    }

    if (!Cookie('ljnotify')) {
        Cookie('ljnotify', '1', {
            domain: Site.siteroot.replace(/^https?:\/\/www\./, ''),
            expires: 5000,
            path: '/'
        });
    }

    LiveJournal.register_hook('notification.stop', function() {
        abortNotifications = true;
    });

    function requestRound() {
        if (abortNotifications) {
            return;
        }

        jQuery.get(LiveJournal.getAjaxUrl('notifications'), 'json').success(
            function(data) {
                //if it's not a notification than it is a timeout answer
                if (data.type === 'notification') {
                    LiveJournal.run_hook(data.name, data.params || []);
                }
                requestRound();
            }).error(function() {
                requestRound()
            });
    }

    requestRound();
};

/**
 * Translate message from xdreceiver. The function will eventually be run
 *      from xdreceiver.html helper frame to send messages between different domains.
 *
 * @param {Object} message Object with the message. Object should always contain type field with event name
 */
LiveJournal.processXdr = function(message) {
    if (message.type) {
        var type = decodeURIComponent(message.type);
    } else {
        return;
    }

    var messageCopy = {};
    for (var name in message) {
        if (message.hasOwnProperty(name) && name !== 'type') {
            messageCopy[name] = decodeURIComponent(message[name]);
        }
    }

    LiveJournal.run_hook(type, messageCopy);
};

// Set up a timer to keep the inbox count updated
LiveJournal.initInboxUpdate = function () {
    // Don't run if not logged in or this is disabled
    if (! Site || ! Site.has_remote || ! Site.inbox_update_poll) {
        return;
    }

    // Don't run if no inbox count
    if (!$('LJ_Inbox_Unread_Count')) {
        return;
    }

    // Update every five minutes
    window.setInterval(LiveJournal.updateInbox, 1000 * 60 * 5);
};

// Do AJAX request to find the number of unread items in the inbox
LiveJournal.updateInbox = function () {

    jQuery.post(LiveJournal.getAjaxUrl('esn_inbox'), {
        action: 'get_unread_items'
    }, function(resp) {
        if (! resp || resp.error) {
            return;
        }

        var unread = $('LJ_Inbox_Unread_Count');
        if (unread) {
            unread.innerHTML = resp.unread_count ? '  (' + resp.unread_count + ')' : '';
        } else {
            unread = $('LJ_Inbox_Unread_Count_Controlstrip');
            if (unread) {
                unread.innerHTML = resp.unread_count ? resp.unread_count : '0';
            }
        }
    }, 'json');
};

//refresh number of tokens in the header
LiveJournal.updateWalletBalance = function () {
    jQuery.get(LiveJournal.getAjaxUrl('get_balance'), function(resp) {
        if (! resp || resp.status != 'OK') {
            return;
        }
        var newBalance = resp.balance ? parseInt(resp.balance, 10) : 0;

        var balance = $('LJ_Wallet_Balance');
        if (balance) {
            if (resp.balance) {
                balance.innerHTML = balance.innerHTML.replace(/\d+/, newBalance);
            } else {
                balance.innerHTML = '';
            }
        } else {
            balance = $('LJ_Wallet_Balance_Controlstrip');
            if (balance) {
                balance.innerHTML = newBalance;
            }
        }

        LiveJournal.run_hook('balance_updated', resp.balance);
    }, 'json');
};

// handy utilities to create elements with just text in them
function _textSpan() {
    return _textElements('span', arguments);
}
function _textDiv() {
    return _textElements('div', arguments);
}

function _textElements(eleType, txts) {
    var ele = [];
    for (var i = 0; i < txts.length; i++) {
        var node = document.createElement(eleType);
        node.innerHTML = txts[i];
        ele.push(node);
    }

    return ele.length == 1 ? ele[0] : ele;
}

LiveJournal.pollAnswerClick = function(e, data) {
    if (!data.pollid || !data.pollqid) {
        return false;
    }

    var xhr = jQuery.post(LiveJournal.getAjaxUrl('poll'), {
        pollid   : data.pollid,
        pollqid  : data.pollqid,
        page         : data.page,
        pagesize : data.pagesize,
        action   : 'get_answers'
    }, function(data, status) {
        status == 'success' ? LiveJournal.pollAnswersReceived(data) : LiveJournal.ajaxError(data);
    }, 'json');

    jQuery(e).hourglass(xhr);

    return false;
};

LiveJournal.pollAnswersReceived = function(answers) {
    if (!answers || !answers.pollid || !answers.pollqid) {
        return;
    }

    if (answers.error) {
        return LiveJournal.ajaxError(answers.error);
    }

    var id = '#LJ_Poll_' + answers.pollid + '_' + answers.pollqid,
        to_remove = '.LJ_PollAnswerLink, .lj_pollanswer, .lj_pollanswer_paging',
        html = '<div class="lj_pollanswer">' + (answers.answer_html || '(No answers)') + '</div>';

    answers.paging_html && (html += '<div class="lj_pollanswer_paging">' + answers.paging_html + '</div>');

    jQuery(id)
        .find(to_remove)
        .remove()
        .end()
        .prepend(html)
        .find('.lj_pollanswer');
};

// gets a url for doing ajax requests
LiveJournal.getAjaxUrl = function(action, params) {
    // if we are on a journal subdomain then our url will be
    // /journalname/__rpc_action instead of /__rpc_action
    var uselang = LiveJournal.parseGetArgs(location.search).uselang;
    if (uselang) {
        action += '?uselang=' + uselang;
    }
    if (params) {
        action += (uselang ? '&' : '?') + jQuery.param(params);
    }

    return Site.currentJournal ? '/' + Site.currentJournal + '/__rpc_' + action : '/__rpc_' + action;
};

// generic handler for ajax errors
LiveJournal.ajaxError = function (err) {
    if (LJ_IPPU) {
        LJ_IPPU.showNote('Error: ' + err);
    } else {
        alert('Error: ' + err);
    }
};

// given a URL, parse out the GET args and return them in a hash
LiveJournal.parseGetArgs = function (url) {
    url = url || window.location.href;
    url = url.replace(/#.*$/, '');

    var getArgsHash = {};

    var urlParts = url.split('?');
    if (!urlParts[1]) {
        return getArgsHash;
    }
    var getArgs = urlParts[1].split('&');

    for (var arg = 0; arg < getArgs.length; arg++) {
        var pair = getArgs[arg].split('=');
        getArgsHash[pair[0]] = pair[1];

    }

    return getArgsHash;
};

/**
 * Construct an url from base string and params object.
 *
 * @param {String} base Base string.
 * @param {Object} args Object with arguments, that have to be passed with the url.
 * @return {String}
 */
LiveJournal.constructUrl = function(base, args, escapeArgs) {
    base = base.replace(/(\&|\?)+$/g, '');
    var queryStr = base,
        queryArr = [];

    if (args) {
        queryStr += ( base.indexOf('?') === -1 ? '?' : '&' );

        for (var i in args) {
            queryArr.push(i + '=' + ( ( escapeArgs ) ? encodeURIComponent(args[i]) : args[i] ));
        }
    }

    return queryStr + queryArr.join('&');
};

/**
 * Generate a string for ljuniq cookie
 *
 * @return {String}
 */
LiveJournal.generateLjUniq = function() {
    var alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', result = '', i;

    var len = 15;
    for (i = 0; i < len; ++i) {
        result += alpha.charAt(Math.floor(Math.random() * ( alpha.length - 1 )));
    }

    result += ':' + Math.floor((new Date()) / 1000);
    result += ':pgstats' + ( ( Math.random() < 0.05 ) ? '1' : '0' );

    return result;
};

LiveJournal.checkLjUniq = function() {
    if (!Cookie('ljuniq')) {
        Cookie('ljuniq', LiveJournal.generateLjUniq(), {
                domain: Site.siteroot.replace(/^https?:\/\/www\./, ''),
                expires: 5000,
                path: '/'
            });
    }
};

LiveJournal.closeSiteMessage = function(node, e, id) {
    jQuery.post(LiveJournal.getAjaxUrl('close_site_message'), {
        messageid: id
    }, function(data, status) {
        if (status === 'success') {
            jQuery(node.parentNode.parentNode.parentNode).replaceWith(data.substitude);
        } else {
            LiveJournal.ajaxError(data);
        }
    }, 'json');
};

LiveJournal.parseLikeButtons = (function () {
    'use strict';

    var selectors = {
        facebook: '.lj-like-item-facebook',
        google: '.lj-like-item-google',
        twitter: '.lj-like-item-twitter',
        tumblr: '.lj-like-item-tumblr',
        surfingbird: '.lj-like-item-surfinbird',
        repost: '.lj-like-item-repost'
    };

    /**
     * Parse lj-like buttons
     * @param  {Object} $node jQuery .lj-like node
     */
    function parse($node) {
        /**
         * Notice: tumblr button works through entry sharing
         */
        parseFacebook($node);
        parseGoogle($node);
        parseTwitter($node);
        parseSurfingbird($node);
        parseRepost($node);
    }

    /**
     * Create iframe node with default params and ability to redefine them (iframe factory)
     * @param  {Object} params Params to substitute for iframe {src, width, height...}
     * @return {Element}       Created iframe node
     */
    function createIframe(params) {
        var iframe = document.createElement('iframe'),
            param;

        // defaults
        iframe.frameBorder = 0;
        iframe.scrolling = 'no';
        iframe.allowTransparency = 'true';
        iframe.width = 110;
        iframe.height = 20;

        // reassign params
        if (params) {
            for (param in params) {
                if (params.hasOwnProperty(param)) {
                    iframe[param] = params[param];
                }
            }
        }

        return iframe;
    }

    /**
     * Parse facebook likes
     * Documentation: http://developers.facebook.com/docs/reference/javascript/FB.XFBML.parse/
     * @param  {jQuery} $node jQuery collection
     */
    function parseFacebook($node) {
        var item = $node.find( selectors.facebook );

        if (item.length === 0) {
            return;
        }

        try {
            window.FB.XFBML.parse( item.get(0) );
        } catch (e) {
            console.warn(e.message);
        }
    }

    /**
     * Parse google +1 button
     * Documentation: https://developers.google.com/+/plugins/+1button/#jsapi
     * @param  {jQuery} $node jQuery node with likes in which we will search for google +1 button for parsing
     */
    function parseGoogle($node) {
        var $button = $node.find( selectors.google ).children().first(),    // jquery node <g:plusone />
            button = null;  // raw DOM node <g:plusone>

        if ($button.length === 0) {
            return;
        }

        button = $button.get(0);

        // gapi could throw errors
        try {
            window.gapi.plusone.render( button, { size: $button.attr('size'), href: $button.attr('href') } );
        } catch (e) {
            console.warn(e.message);
        }
    }

    /**
     * Parse and replace twitter button
     * @param  {jQuery} $node jQuery node with .lj-like class
     */
    function parseTwitter($node) {
        var params = null,
            iframe = null,
            // link to replace with iframe
            link = null,
            item = $node.find( selectors.twitter );

        if (item.length === 0) {
            return;
        }

        link = item.children().eq(0);

        params = {
            url: link.data('url'),
            text: link.data('text') || '',
            count: link.data('count'),
            lang: link.data('lang') || 'en',
            hashtags: link.data('hashtags') || ''
        };

        iframe = createIframe({
            src: LiveJournal.constructUrl('http://platform.twitter.com/widgets/tweet_button.html', params)
        });

        link.replaceWith(iframe);
    }

    /**
     * Parse surfingbird share button
     * @param  {jQuery} $node jQuery .lj-like node
     */
    function parseSurfingbird($node) {
        var item = $node.find( selectors.surfingbird ),
            link = null,
            iframe = null,
            params = null;

        if (item.length === 0) {
            return;
        }

        link = item.find('.surfinbird__like_button');
        params = {
            url: link.data('url'),
            caption: link.data('text'),
            layout: 'common'
        };

        iframe = createIframe({
            src: LiveJournal.constructUrl('http://surfingbird.ru/button', params)
        });

        link.replaceWith(iframe);
    }

    /**
     * Parse repost button
     * @param  {jQuery} $node jQuery .lj-like node
     */
    function parseRepost($node) {
        var item = $node.find( selectors.repost ),
            link = null,
            url;

        if (item.length === 0) {
            return;
        }

        link = $node.find('.lj-like-item-repost').find('a'),
        url = link.data('url');

        LJ.Api.call('repost.get_status', { url: url }, function (data) {
            link.replaceWith(LiveJournal.renderRepostButton(url, data));
        });
    }

    return parse;
}());

LiveJournal.renderRepostButton = function (url, data) {
    data = data || {};

    var meta = {
            paid: !!data.paid,
            url: url,
            cost: data.cost,
            budget: data.budget,
            count: Number(data.count || 0),
            reposted: !!data.reposted
        },
        template = 'templates-CleanHtml-Repost',
        options = {},
        node;

    if (meta.paid) {
        template = 'templates-CleanHtml-PaidRepost';
        meta.owner = meta.cost === '0';
        options.classNames = {
            active: 'paidrepost-button-active',
            inactive: 'paidrepost-button-inactive'
        };
    }

    return LJ.UI.template(template, meta).repostbutton(jQuery.extend(options, meta));
};

/**
 * Insert script in the document asynchronously.
 *
 * @param {String}  url     Url of the script
 * @param {Object=} params  Data to apply to the scipt node object, e.g. async, text.
 * @param {Node=}   parent  If exists, script tag will be inserted in this node or before the
 *                          first script tag otherwise.
 *
 * @return {jQuery.Deferred}    jQuery deferred object that will be resolved when
 *                              script loaded.
 */
LiveJournal.injectScript = function(url, params, parent) {
    var deferred = jQuery.Deferred(),
        defaults = {
            async: true
        },
        script,
        prop;

    script = document.createElement('script');
    script.src = url;

    if (params && jQuery.type(params) === 'object') {
        params = jQuery.extend({}, defaults, params);

        for (prop in params) {
            if ( params.hasOwnProperty(prop) ) {
                script[prop] = params[prop];
            }
        }
    }

    if (script.readyState) {
        // IE
        script.onreadystatechange = function () {
            if ( script.readyState === 'loaded' || script.readyState === 'complete' ) {
                script.onreadystatechange = null;
                deferred.resolve();
            }
        };
    } else {
        // Others
        script.onload = function(){
            deferred.resolve();
        };
    }


    if (parent) {
        parent.appendChild(script);
    } else {
        parent = document.getElementsByTagName('script')[0];
        parent.parentNode.insertBefore(script, parent);
    }

    return deferred;
};

LiveJournal.getLocalizedStr = LJ.ml;

LiveJournal.JSON = JSON;

/**
 * Check if site if browsed by mobile device
 *
 */
LiveJournal.isMobile = function() {
    var agent = navigator.userAgent || navigator.vendor || window.opera, isMobile = /android.+(mobile|transformer)|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|opera tablet|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4));

    return function () {
        return isMobile;
    }
}();

/**
 * Parse link or embed html.
 * @param {String} input Input can contain link or html.
 * @return {Object} Object representing the media.
 */

LiveJournal.parseMedia = (function() {
    'use strict';

    function parseMediaLink(input) {
        var link = {
            'youtube': 'http://youtube.com/watch?v={id}',
            'vimeo': 'http://vimeo.com/{id}',
            'vine': 'http://vine.co/v/{id}',
            'instagram': 'http://instagram.com/p/{id}/',
            'gist' : 'https://gist.github.com/{id}'
        };

        var embed = {
            'youtube': '<iframe src="http://www.youtube.com/embed/{id}" width="560" height="315" frameborder="0" allowfullscreen data-link="{link}"></iframe>'.supplant({link: link.youtube}),
            'vimeo'  : '<iframe src="http://player.vimeo.com/video/{id}" width="560" height="315" frameborder="0" allowfullscreen data-link="{link}"></iframe>'.supplant({link: link.vimeo}),
            'vine'   : '<iframe src="http://vine.co/v/{id}/card" width="380" height="380" frameborder="0" data-link="{link}"></iframe>'.supplant({link: link.vine}),
            'instagram' : '<iframe src="//instagram.com/p/{id}/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"  data-link="{link}"></iframe>'.supplant({link: link.instagram}),
            'gist' : '<a data-expand="false" href="https://gist.github.com/{id}">gist.github.com/{id}</a>'.supplant({link: link.gist})
        };

        var provider = {
            'vine': {
                parse: function(input) {
                    // http://vine.co/v/bdbF0i72uwA
                    var matcher = /vine.co\/v\/([^\/]*)/,
                        match = input.match(matcher);

                    return (match && match[1]) || null;
                }
            },

            'vimeo': {
                parse: function(input) {
                    var matcher = /^(http:\/\/)?(www\.)?(player\.)?vimeo.com\/(video\/)?(\d+)*/,
                        match = input.match(matcher);

                    return (match && match[5]) || null;
                }
            },

            'youtube': {
                parse: function(input) {
                    // http://stackoverflow.com/a/8260383
                    var matcher = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\??v?=?))([^#\&\?]*).*/,
                        match = input.match(matcher);

                    if (match && match[0].indexOf('youtu') === -1) {
                        return null;
                    }

                    // we really should move from regexp to querystring parsing
                    var qs = LiveJournal.parseGetArgs(input);
                    if (qs.v) {
                        return qs.v;
                    }

                    return (match && match[7]) || null;
                }
            },

            'instagram': {
                parse: function(input) {
                    var matcher = /.*(?:instagram\.\w*|instagr\.am)\/p\/([^\/]+).*/,
                        match = input.match(matcher);

                    return (match && match[1]) || null;
                }
            },

            'gist': {
                parse: function(input) {
                    var matcher = /.*(?:gist\.github\.com\/)([^\/]+\/{1}[^\/]+)\/{0,1}$/,
                        match = input.match(matcher);

                    return (match && match[1]) || null;
                }
            }
        };

        var id, key, result;
        for (key in provider) {
            id = provider[key].parse(input.trim());
            if (id) {
                result = {
                    site: key,
                    id: id
                };

                if (embed[key]) {
                    result.embed = embed[key].supplant(result);
                }

                if (link[key]) {
                    result.link = link[key].supplant(result);
                }

                return result;
            }
        }

        return null;
    }

    return function(input) {

        // jQuery can fail on input
        try {
            var node = jQuery(input).first(), src;

            if (node && node.prop('tagName').toLowerCase() === 'iframe') {
                src = node && node.attr('src');

                if (src) {
                    return parseMediaLink(src);
                }
            }
        } catch (e) {
            return parseMediaLink(input);
        }
    };
})();
;

/* file-end: js/livejournal.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.lj.bubble.js 
*/

/**
 * @name $.lj.bubble
 * @author sergey.zhirkov@sup.com (Sergey Zhirkov)
 * @author dmitry.petrov@sup.com (Dmitry Petrov)
 * @author artem.tyurin@sup.com (Artem Tyurin)
 * @author anazarov@sup.com (Alexander Nazarov)
 * @author valeriy.vasin@sup.com (Valeriy Vasin)
 *
 * @requires $.ui.core, $.ui.widget, $.lj.basicWidget
 * @class Wraps some content with pop-up "bubble", positioned relative to target or absolute (like modal window)
 * @extends $.lj.basicWidget
 */

/*
 * Usage:
 *	<script>
 *		$('div.with-bubble-content')
 *			.bubble()
 *			.bubble('publicMethod')
 *			.bubble({ many: options })
 *			.bubble('option', 'getOptionName')
 *			.bubble('option', 'setOptionName', 'setOptionValue')
 *			.bind('bubblehide', function( ev ){}); // bind some event
 *	</script>
 *
 */

/**
 * @example
 * // bubble will be always at the left
 * $node.bubble({
 *   target: $('div.target'),
 *   showOn: 'click',
 *   forcePosition: 'left'
 * });
 *
 * // bubble will be always positioned at right side and under the target
 * $node.bubble({
 *   target: $('div.target'),
 *   showOn: 'click',
 *   forcePosition: {
 *     right: true,
 *     bottom: true
 *   }
 * });
 *
 * // Obsolete option `alwaysShowUnderTarget` is also supported and could be mixed
 * // with `forcePosition` option.
 * // Notice: to mix this options you should set `forcePosition` via hash, not string
 *
 * // bubble will be always positioned at right side and under the target
 * $node.bubble({
 *   target: $('div.target'),
 *   showOn: 'click',
 *   alwaysShowUnderTarget: true,
 *   forcePosition: {
 *     right: true
 *   }
 * });
 */
(function ($, window) {
	$.widget('lj.bubble', $.lj.basicWidget, {
		options: {
			target: null,
			currentTarget: null,

			hoverTimer: null,
			hoverDelay: 600,
			showDelay: 0,

			position: {
				x: 0,
				y: 0
			},

			/**
			 * offset object can contain directly fields x and y or fields l,r,t,b,tl,tr,bl,br
			 *    that contain offset object for the bubble in the exact position.
			 *  Priority order: x,y -> tl,bl,tr,br -> t,b -> l,r
			 */
			offset: {},

			// horizontal align relative to target elem
			// TODO "right" align
			align: 'center', // left || center || side

			// always show under target elem (even if bubble node does not fit screen height)
			alwaysShowUnderTarget: false,
			/**
			 * Set bubble position directly (without screen position restrictions)
			 * bubble wherever we want forcely: e.g. set top left corner
			 * It could contain four fields: { top, left, bottom, right }
			 * If top and left are set to true, right and bottom are not important
			 *
			 * @type {Object|Boolean|String}
			 */
			forcePosition: false,

			closeControl: true,
			closeOnContentClick: false,
			closeOnDocumentClick: true,
			closeOnEscape: true,

			// show on special event triggered by target (no action by default - "false")
			showOn: false, // 'click' || ('hover' || 'mouseover') || 'focus' || false
			showEffect: '', //can be fade

			preventDefaultTargetClick: true,

			modal: false,

			classNames: {
				containerAddClass: '', //if this value is set it will add this class to the top node
				positionPrefix: 'i-popup-arr',
				arrowDefault: 'i-popup-arr',
				withCloseControl: 'b-popup-withclosecontrol',
				noCloseControl: 'b-popup-noclosecontrol'
			},

			selectors: {
				bubbleNode: 'div.bubble-node',
				bubbleArrow: 'i.i-popup-arr',
				bubbleInner: 'div.b-popup-inner',
				closeControl: 'i.i-popup-close',
				fader: '.b-fader'
			},

			templates: {
				fader: '<div class="b-fader" style="display: none"></div>',
				node: 'templates-Widgets-bubble'
			}
		},


		// private methods
		_create: function () {
			var ljBubble = this,
				options = ljBubble.options,
				selectors = options.selectors;

			$.lj.basicWidget.prototype._create.apply(this);
			$.lj.basicWidget.prototype._bindControls.apply(this);

			// workaround for previous `alwaysShowUnderTarget` option
			if (options.alwaysShowUnderTarget) {
				if (typeof options.forcePosition === 'string') {
					this._setOption('forcePosition', options.forcePosition);
				}
				options.forcePosition = options.forcePosition || {};
				options.forcePosition.bottom = true;
			}

			//this flag is needed because we cannot simply top propogation
			//on content click - user won't be able to open links.
			this.blockDocumentClick = false;

			// wrap bubble content with bubble outer html
			this._base = ljBubble._makeNode();

			this._on('documentClick', function() {
				if (options.closeOnDocumentClick && !ljBubble.blockDocumentClick) {
					ljBubble.hide();
				} else {
					ljBubble.blockDocumentClick = false;
				}
			});

			this._window = $(window);
			this._body = $('body');

			/*
			 * If set to true will prevent bubble from hiding.
			 */
			this._preventHide = false;

			// set default options
			ljBubble._setOptions(options);
		},

		_setOption: function (option, value) {
			var ljBubble = this,
				options = ljBubble.options,
				classNames = options.classNames,
				eventNamespace = '.' + ljBubble.widgetName + '-' + option,
				currentShowOn = options.showOn,
				newValue;

			switch (option) {
				case 'forcePosition':
					// support string value (one side restriction)
					if (typeof value === 'string' && /^left|right|top|bottom$/.test(value) ) {
						options.forcePosition = {};
						options.forcePosition[value] = true;
					} else if (typeof value === 'object' && value !== null) {
						// prevent change option outside of widget
						options.forcePosition = $.extend({}, value);
					}

				// no need in option set
				return;

				case 'target':
					newValue = $(value);
					if(options.target && options.target[0] === newValue[0]) {
						break;
					}

					//if target changes we should rebind all events from the old one.
					//we don't if the old one is a string or an ordinary node, because
					//it can happen only on init
					if (options.target && typeof options.target !== 'string' && ('length' in  options.target)) {
						this._setOption('showOn', false);
						options.target = newValue;
						this._setOption('showOn', currentShowOn);
					} else {
						options.target = $(value);
					}

				// no need in option set
				return;

				case 'closeControl':
					if (value) {
						ljBubble.bubbleNode
							.delegate(options.selectors.closeControl, 'click' + eventNamespace, function (event) {
								ljBubble.hide();
							})
							.removeClass(classNames.noCloseControl)
							.addClass(classNames.withCloseControl);
					} else {
						ljBubble.bubbleNode
							.undelegate(options.selectors.closeControl, 'click' + eventNamespace)
							.removeClass(classNames.withCloseControl)
							.addClass(classNames.noCloseControl);
					}
				break;
				case 'position':
					ljBubble.bubbleNode.css({
						left: value.x,
						top: value.y
					});
				break;
				case 'showOn':
					value = (value === 'mouseover') ? 'hover' : value;

					if (value === 'click') {
						options.target.bind('click' + eventNamespace, function (event) {
							var target = $(this);

							event.preventDefault();
							ljBubble.blockDocumentClick = true;

							if (ljBubble._visible) {
								ljBubble.hide();
							} else {
								ljBubble.show(target);
							}
						});
					} else {
						options.target.unbind('click' + eventNamespace);
					}

					if (value === 'hover') {
						options.target
							.add(ljBubble.bubbleNode)
								.bind('touchstart' + eventNamespace + ' mouseenter' + eventNamespace, function () {
									var target = this;
									clearTimeout(options.hoverTimer);
									options.hoverTimer = setTimeout(function () {
										ljBubble.show(target);
									}, options.showDelay);
								})
								.bind('mouseleave' + eventNamespace, function () {
									clearTimeout(options.hoverTimer);
									options.hoverTimer = setTimeout(function () {
										ljBubble.hide();
									}, options.hoverDelay);
								});
					} else {
						options.target
							.add(ljBubble.bubbleNode)
								.unbind('touchstart' + eventNamespace)
								.unbind('mouseenter' + eventNamespace)
								.unbind('mouseleave' + eventNamespace);
					}

					if (value === 'focus') {
						options.target
							.bind('focus' + eventNamespace, function (event) {
								var target = $(this);

								ljBubble.blockDocumentClick = true;
								event.preventDefault();
								event.stopPropagation();

								ljBubble.show(target);
							});
							// @BUG: this was commented out because click on the bubble
							//       content triggers blur event.
							// .bind('blur' + eventNamespace, function (event) {
							// 	ljBubble.hide();
							// });
					} else {
						options.target
							.unbind('focus' + eventNamespace)
							.unbind('blur' + eventNamespace);
					}
				break;
				case 'preventDefaultTargetClick':
					if (value) {
						options.target.bind('click' + eventNamespace, function (event) {
							event.preventDefault();
						});
					} else {
						options.target.unbind('click' + eventNamespace);
					}
				break;
				case 'closeOnEscape':
					if (value) {
						$(document).bind('keydown' + eventNamespace, function (event) {
							// escape
							if (event.keyCode === 27) {
								if (ljBubble._visible) {
									ljBubble.hide();
									//we're doing preventDefault, because Firefox drops ALL internet connection
									//on esc key, event xhr, sorry.
									event.preventDefault();
								}
							}
						});
					} else {
						$(document).unbind('keydown' + eventNamespace);
					}
				break;
				case 'closeOnContentClick':
					if (!value) {
						ljBubble.bubbleNode.bind('mousedown' + eventNamespace + ' click' + eventNamespace, function (event) {
							ljBubble.blockDocumentClick = true;
						});
					} else {
						ljBubble.bubbleNode.unbind('mousedown' + eventNamespace + ' click' + eventNamespace);
					}
				break;
			}

			options[option] = value;
		},

		_makeNode: function () {
			var bubbleNode = this.options.outerHtml? $(this.options.outerHtml) : this._tmpl('node', this.options),
				bubbleArrow = bubbleNode.find(this.options.selectors.bubbleArrow),
				bubbleInner = bubbleNode.find(this.options.selectors.bubbleInner),
				body = $('body');

			// this.element - with bubble content
			this.element
				.css('display', 'block')
				.prependTo(bubbleInner);

			if (this.options.modal) {
				this._el('fader', body);
				if (!this._fader.length) {
					this._fader = $(this.options.templates.fader).prependTo(body);
				}
			}

			this.bubbleNode = bubbleNode.prependTo(body);
			this.bubbleArrow = bubbleArrow;

			// store arrow elem position
			bubbleNode.css({
				visibility: 'hidden',
				display: 'block'
			});

			var containerAddClass = this.options.classNames.containerAddClass,
				position;

			//additional class is needed to customize look and behavior of bubble if needed
			if (containerAddClass && containerAddClass.length > 0) {
				bubbleNode.addClass(containerAddClass);
			}

			position = bubbleArrow.position() || {};

			bubbleArrow.data({
				'left': position.left,
				'top': position.top
			});

			bubbleNode.css({
				visibility: 'visible',
				display: 'none'
			});

			return bubbleNode;
		},

		_getPosition: function (targetControl, offset) {
			var targetImg;

			targetControl = targetControl || this.options.currentTarget;

			targetImg = targetControl.find('img').first();

			// if there is image in target (like this: <a><img src="..."></a>) - bubble will be positioned relative to image
			if (targetImg.length) {
				targetControl = targetImg;
			}

			if (this.options.modal) {
				return {
					position: {
						x: '50%',
						y: '50%'
					}
				};
			}

			var ljBubble = this,
				viewport = this._window,
				body = this._body,
				options = ljBubble.options,
				align = options.align,
				alwaysShowUnderTarget = options.alwaysShowUnderTarget,

				viewportWidth = viewport.width(),
				viewportHeight = viewport.height(),
				viewportScrollLeft = body.prop('scrollLeft'),

				elem = ljBubble.bubbleNode,
				elemWidth = elem.width(),
				elemHeight = elem.height(),

				popupArrow = ljBubble.bubbleArrow,
				popupArrowLeft = popupArrow.data('left'),
				popupArrowTop = popupArrow.data('top'),
				popupArrowWidth = 13, // popup arrow drawn with borders (6px at left and right side)

				targetOffset = targetControl.offset(),
				targetLeft = Math.round(targetOffset.left),
				targetTop = Math.round(targetOffset.top),
				targetWidth = targetControl.width(),
				outerWidth = targetControl.outerWidth(),
				targetHeight = targetControl.height(),

				scrollOffset = viewport.scrollTop(),
				leftPositionX, rightPositionX, topPositionY, bottomPositionY,
				arrowPositionType, arrowPositionTypes, position, checkAngle,
				arrowClass;

				switch (align) {
					case 'center':
						topPositionY = targetTop - popupArrowTop + targetHeight;
						leftPositionX = Math.floor(
							targetLeft + (targetWidth / 2) - popupArrowLeft - (popupArrowWidth / 2)
						);
					break;

					case 'left':
						leftPositionX = targetLeft;
						topPositionY = targetTop - popupArrowTop + targetHeight;
					break;

					case 'side':
						leftPositionX = targetLeft + outerWidth - popupArrowTop;
						topPositionY = Math.round(targetTop - (targetHeight / 2));
					break;
				}

				rightPositionX = targetLeft + Math.floor( (targetWidth / 2) - (elemWidth - popupArrowLeft - popupArrowWidth / 2) );
				bottomPositionY = targetTop + popupArrowTop - elemHeight;

				arrowPositionType = {
					x: 'l', // left
					y: 't' // top
				};

				arrowPositionTypes = {
					'lt': { x: leftPositionX, y: topPositionY },
					'tl': { x: leftPositionX, y: topPositionY },
					'tr': { x: rightPositionX, y: topPositionY },
					'bl': { x: leftPositionX, y: bottomPositionY },
					'br': { x: rightPositionX, y: bottomPositionY }
				};

				checkAngle = {
					x: leftPositionX + elemWidth,
					y: topPositionY + elemHeight
				};


			// Check bubble position relative to the viewport and fix it if needed
			(function () {
				var isUnder, isRighter;

				function isRighterThanViewport() {
					if (typeof isRighter === 'undefined') {
						isRighter = checkAngle.x > viewportWidth + viewportScrollLeft;
					}

					return isRighter;
				}

				function isUnderViewport() {
					if (typeof isUnder === 'undefined') {
						isUnder = checkAngle.y > viewportHeight + viewport.scrollTop() && bottomPositionY > 0;
					}

					return isUnder;
				}

				if (options.forcePosition) {
					if (options.forcePosition.left) {
						arrowPositionType.x = 'r';
					} else if (options.forcePosition.right) {
						arrowPositionType.x = 'l';
					} else {
						// left is by default
						if ( isRighterThanViewport() ) {
							arrowPositionType.x = 'r'; // right
						}
					}

					/**
					 * Notice:
					 *   Top and bottom sides are changed for bubble position
					 *  't' - bubble is under the target
					 *  'b' - bubble is above the target
					 */
					if (options.forcePosition.top) {
						arrowPositionType.y = 'b';
					} else if (options.forcePosition.bottom) {
						arrowPositionType.y = 't';
					} else {
						// 't' is by default
						if ( isUnderViewport() ) {
							arrowPositionType.y = 'b'; // bottom
						}
					}
				} else {
					if ( isRighterThanViewport() ) {
						arrowPositionType.x = 'r'; // right
					}

					if ( isUnderViewport() ) {
						arrowPositionType.y = 'b'; // bottom
					}
				}
			}());

			if (align === 'side') {
				arrowPositionType = arrowPositionType.x + arrowPositionType.y;
			} else {
				arrowPositionType = arrowPositionType.y + arrowPositionType.x;
			}

			arrowClass = options.classNames.positionPrefix + arrowPositionType;
			if (arrowClass !== this._arrowClass) {
				this._arrowClass = arrowClass;
				popupArrow
					.removeClass()
					.addClass(options.classNames.arrowDefault)
					.addClass(arrowClass);
			}

			position = arrowPositionTypes[arrowPositionType];
			if (this.tempOffset) {
				position.x += this.tempOffset.x;
				position.y += this.tempOffset.y;
				delete this.tempOffset;
			} else {
				position = this._applyOffset( position, arrowPositionType );
			}
			return { position: position, bubblePosition: arrowPositionType };
		},

		_updatePosition: function () {
			var newPosition = this._getPosition();
			this.option('position', newPosition.position);

			return newPosition;
		},

		_applyOffset: function( position, bubblePosition ) {
			var offset = this.options.offset,
				offsetObj;

			if( 'x' in offset ) {
				offsetObj = offset;
			} else {
				offsetObj = offset[ bubblePosition ] || offset[ bubblePosition.charAt( 0 ) ] || offset[ bubblePosition.charAt( 1 ) ];
			}

			if( offsetObj ) {
				position.x += offsetObj.x;
				position.y += offsetObj.y;
			}

			return position;
		},

		/*
		 * Show bubble
		 * @param {jQuery} target Bubble target
		 * @param {object} tempOffset Temporary offset
		 */
		show: function (target, tempOffset) {
			var ljBubble = this,
				node = this.bubbleNode,
				options = ljBubble.options,
				position;

			this.tempOffset = tempOffset;

			//prevent delayed mouseout event
			clearTimeout(this.options.hoverTimer);

			target = (target) ? $(target) : options.target;

			$(':lj-bubble')
				.not(ljBubble.element)
				.bubble('hide');

			if (!this._visible) {
				this._visible = true;

				this.option('currentTarget', target);
				position = this._updatePosition();

				if (this.options.modal) {
					this._fader.css({ display: 'block' });
					node.css({
						'margin-left': -node.width() / 2,
						'margin-top': -node.height() / 2,
						position: 'fixed'
					});
				}

				if (this.options.showEffect === 'fade') {
					node.fadeIn(200);
				} else {
					node.show();
				}
			}

			this._trigger('show', null, [{
				position: position
			}]);

			return this;
		},

		/**
		 * Hide bubble
		 */
		hide: function () {

			if ( this._preventHide ) {
				return this;
			}

			//prevent delayed mouseout event
			clearTimeout(this.options.hoverTimer);

			if (!this._visible) { //do not fire events if bubble is already hidden
				return;
			} else {
				this._visible = false;
			}

			if (this.options.modal) {
				this._fader.css({ display: 'none' });
			}

			this.bubbleNode.hide();
			this._trigger('hide');

			return this;
		},

		/**
		 * Reposition bubble on the page. The method is needed to reposition bubble
		 * in case when it's content is changed and it remains visible at the same time.
		 */
		updatePosition: function() {
			if (this._visible) {
				this._updatePosition();
			}
		},

		absolute: function(_x, _y) {
			this.option('position', {x: _x, y: _y});
		},

		move: function(_x, _y) {
			var p = this._getPosition();
			this.option('position', {x: _x, y: _y});
		},

		block: function(block) {
			this.blockDocumentClick = block;
		},

		base: function() {
			return this._base;
		},


		/**
		 * Determines whether bubble is currently visible
		 * @return {boolean} true if currently visible
		 */
		visible: function() {
			return this.bubbleNode.is(':visible');
		},


		/**
		 * Setter for _preventHide property
		 * @param {boolean} if set to true, will not hide bubble
		 */
		setPreventHide: function( val ) {
			this._preventHide = !!val;
		},


		/**
		 * Getter for _preventHide property
		 */
		isHidePrevented: function() {
			return this._preventHide;
		}
	});
})(jQuery, this);
;

/* file-end: js/jquery/jquery.lj.bubble.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/jquery/jquery.storage.js 
*/

/*!
 * jQuery storage plugin.
 * @author dmitry.petrov@sup.com (Dmitry Petrov)
 * @author anazarov@sup.com (Alexander Nazarov)
 *
 * Plugin uses local storage if availible and falls back to IE userData mechanism.
 *
 * @TODO: add cookie storage provider
 *
 * Plugin supports IE5.5+, Firefox 3.5+, Opera 10.5+, Google Chrome, Apple Safari 4+
 */

(function ($) {
	'use strict';

	var JSON = window.JSON || LiveJournal.JSON;

	function stringify(val) {
		return JSON.stringify(val);
	}

	function parse(val) {
		try {
			return JSON.parse(val);
		} catch (error) {
			return val;
		}
	}

	/**
	 * @namespace $.storage
	 */
	$.storage = (function () {

		/**
		 * Every provider should have the same interface and provide isSupported function to
		 * test if it's applicable in current browser
		 */
		var userDataProvider = function () {
			var storageId = 'jQueryStorageProvider',
				storageName = '__jQueryStorage__',
				node;

			function _create ()  {
				node = $('<link>')
					.attr('id', storageId)
					.css('display', 'none')
					.appendTo($('head'))
					.get(0);

				/* http://msdn.microsoft.com/en-us/library/ms533015%28v=vs.85%29.aspx */
				node.addBehavior('#default#userdata');
				node.load(storageName);
			}

			//LJSUP-11805: IE does not allow special symbols as attribute names
			function _normalize (name) {
				return name.replace(/[^0-9a-z_\-]/ig, '_');
			}

			_create();

			return {
				provider: 'data',

				/**
				 * Set item in the storage
				 *
				 * @param {String} name
				 * @param {String} val
				 * @returns {Boolean} True if item was set
				 */
				setItem: function (name, val) {
					node.setAttribute(_normalize(name), stringify(val));
					node.save(storageName);

					return true;
				},

				/**
				 * Get item from the storage.
				 *
				 * @param {String} Item name.
				 * @return {Object|String} Item value or null it it does not exist.
				 */
				getItem: function (name) {
					return parse(node.getAttribute(_normalize(name)));
				},

				/**
				 * Remove item from the storage
				 *
				 * @param @{String} Item name.
				 */
				removeItem: function (name) {
					node.removeAttribute(name);
					node.save(storageName);
				},

				/**
				 * Clear storage
				 */
				clear: function () {
					var attrs = node.attributes,
						i, l;

					for (i = 0, l = attrs.length; i < l; i++) {
						if (attrs[i].toLowerCase() === 'id') {
							continue;
						}

						node.removeAttribute(attrs[i]);
					}

					node.save(storageName);
				}
			};
		};

		userDataProvider.isSupported = function() { return $.browser.msie && (+$.browser.version) > 5; };

		var localStorageProvider = function() {
			function _create()  {
			}

			_create();

			return {
				provider: 'storage',

				setItem: function (name, val) {
					try {
						localStorage.setItem(name, stringify(val));
						return true;
					} catch (error) {
						return false;
					}
				},

				getItem: function (name) {
					return parse(localStorage.getItem(name));
				},

				removeItem: function (name) {
					localStorage.removeItem(name);
				},

				clear: function () {
					localStorage.clear();
				}
			};
		};

		localStorageProvider.isSupported = function() { return LJ.Support.localStorage; };

		var simpleProvider = function() {
			var store;

			function _create()  {
				store = {};
			}

			_create();

			return {
				provider: 'simple',

				setItem: function (name, val) {
					store.name = val;

					return true;
				},

				getItem: function (name) {
					if (store.hasOwnProperty(name)) {
						return store.name;
					} else {
						return null;
					}
				},

				removeItem: function (name) {
					delete store.name;
				},

				clear: function () {
					store = {};
				}
			};
		};

		simpleProvider.isSupported = function() { return true; };

		//currently all transports should be implemented inside plugin.
		var providers = [localStorageProvider, userDataProvider, simpleProvider],
			i, l;

		for (i = 0, l = providers.length; i < l; ++i ) {
			if (providers[i].isSupported()) {
				return providers[i]();
			}
		}

		//We should never reach this point.
	}());
}(jQuery));
;

/* file-end: js/jquery/jquery.storage.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/journal.js 
*/

/* ---------------------------------------------------------------------------------
   file-start: js/pagescroller.js 
*/

jQuery(function() {
	var entries = jQuery(".entry");
    
    function getCurrentEntry() {
        var scrollTop = jQuery(window).scrollTop();
        for (var i=0; i<entries.length; ++i) {
            // there is no exact equality between offset and scrollTop after call to scrollTo:
            // there may be offset=180.1, scrollTop=180
            // console.log("entry=" + i + ", entries.eq(i).offset().top=" + entries.eq(i).offset().top + ", scrollTop=" + scrollTop);
            if (entries.eq(i).offset().top-20 > scrollTop) {
                return i-1;
            }
        }
        return entries.length-1;
    }

	function keyCheck(e) {

    	if (!entries.length) {
            // console.log("No entries");
			return;
		}

        // do not mess with form inputs
        var activeElement = document.activeElement;
        if (activeElement) {
            var nodeName = activeElement.nodeName.toLowerCase();
            if (nodeName=="input" || nodeName=="textarea" || nodeName=="select") {
                // console.log("returning from form element: " + nodeName);
                return;
            }
        }
        // console.log("Key code = " + e.keyCode);

		var pos;
		if (e.keyCode === 78) {
			// next
            var anchor = getCurrentEntry()+1;
            // console.log("next, anchor=" + anchor + ", entries.length=" + entries.length);
			if (anchor >= entries.length) {
				return;
			}
			pos = entries.eq(anchor).offset();
			window.scrollTo(pos.left, pos.top-10);
		}
		if (e.keyCode === 80) {
			//previous
			var anchor = getCurrentEntry()-1;
            // console.log("prev, anchor=" + anchor + ", entries.length=" + entries.length);
			if (anchor < 0) {
                return; 
			}
			pos = entries.eq(anchor).offset();
			window.scrollTo(pos.left, pos.top-10);
		}
	}

    if (entries.length>1) {
        // console.log("Installing keyCheck");
	    jQuery(document).keyup(keyCheck);
    }
});
;

/* file-end: js/pagescroller.js 
----------------------------------------------------------------------------------*/

DonateButton = {
  buyMore: function(node, ml_message, event) {
    var bubble = jQuery(node).data('buyMoreCachedBubble');

    if (!bubble) {
      bubble = jQuery('<span>' + ml_message + '</span>').bubble({
        target: node
      });

      jQuery(node).data('buyMoreCachedBubble', bubble);
    }

    bubble.bubble('show');

    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }

    return false;
  },

  donate: function( link, url_data, event ) {
    var width = 639,
        height = 230,
        url = link.href,
        popupUrl,
        h;


    LJ.rpc.bind(function(ev) {
      if ( ev.origin && ev.origin !== Site.siteroot ) {
        return;
      }

      if ( ev.data && ev.data.message === 'updateWallet' ) {
        LiveJournal.run_hook( 'update_wallet_balance' );
        jQuery.getJSON(
          LiveJournal.getAjaxUrl('give_tokens') + '?' + url_data + '&mode=js',
          function (result) {
            var $node;

            if ( result.html ) {
              $node = jQuery( link ).closest( '.lj-button' );
              $node.replaceWith( result.html );
            }
          }
        );
      }
    });

    popupUrl = url + ( url.indexOf( '?' ) === -1 ? '?' : '&' ) + 'usescheme=nonavigation';
    h = window.open( 'about:blank', 'donate' , 'toolbar=0,status=0,width=' + width + ',height=' + height + ',scrollbars=yes,resizable=yes');
    h.name = location.href.replace( /#.*$/, '' );

    setTimeout(function() {
      LJ.rpc.initRecipient( h, popupUrl, location.href.replace( /#.*$/, '' ) );
    }, 0);

    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }

    return false;
  }
};

(function() {
  var options = {
    blockSelector: '.yota-contest'
  };

  function retrieveContestInfo( element ) {
    var journal = element.attr( 'data-user' );
    jQuery.getJSON(
      LiveJournal.getAjaxUrl('yota_widget_post'),
      { json: 1, journal: journal },
      function (answer) {
        var collected,
            key,
            i;

        if ('collected' in answer) {
          collected = answer.collected;
          for (i = 0; i < collected.length; i += 2) {
            element.find( '.' + collected[ i ] ).html( collected[ i + 1 ] );
          }
        }

        if ('rating' in answer ) {
          i = 5;

          while( --i > 0) {
            key = '' + i;
            if( key in answer.rating ) {
              element.find( '.c' + i ).html( answer.rating[ key ] );
            }
          }
        }
      }
    );
  }

  function findElement() {
    var element = jQuery( options.blockSelector );

    if( element.length ) {
      element.each(function() {
        retrieveContestInfo( jQuery( this ) );
      });
    }
  }

  jQuery(findElement);
}());

(function () {
  var storage = {
    init: function() {
      this._store = jQuery.storage.getItem('placeholders') || {};
    },

    inStorage: function(link) {
      return this._store.hasOwnProperty(link);
    },

    addUrl: function(link) {
      if ( !this.inStorage(link) ) {
        this._store[link] = true;
        jQuery.storage.setItem('placeholders', this._store);
      }
    }
  };

  storage.init();

  var placeholders = {
    image: {
      selector: '.b-mediaplaceholder-photo',
      loading: 'b-mediaplaceholder-processing',
      init: function() {
        var self = this;
        doc.on('click', this.selector, function(ev) {
          self.handler(this, ev);
        });
      },

      handler: function(el, html) {
        var im = new Image();

        im.onload = im.onerror = jQuery.delayedCallback(this.imgLoaded.bind(this, el, im), 500);
        im.src = el.href;
        el.className += ' ' + this.loading;

        storage.addUrl(el.href);
      },

      imgLoaded: function(el, image) {
        var img = jQuery('<img />').attr('src', image.src),
            $el = jQuery(el),
            href = $el.data('href'),
            imw = $el.data('width'),
            imh = $el.data('height');

        if (imw) {
          img.width(imw);
        }

        if (imh) {
          img.height(imh);
        }

        if (href && href.length > 0) {
          img = jQuery('<a>', { href: href }).append(img);
          $el.next('.b-mediaplaceholder-external').remove();
        }

        $el.replaceWith(img);
      }
    },

    video: {
      handler: function(link, html) {
        link.parentNode.replaceChild(jQuery(unescape(html))[0], link);
      }
    }
  };
  // use replaceChild for no blink scroll effect

  // Placeholder onclick event
  LiveJournal.placeholderClick = function(el, html) {
    var type = (html === 'image') ? html : 'video';

    placeholders[type].handler(el, html);
    return false;
  };

  LiveJournal.register_hook('page_load', function() {
    jQuery('.b-mediaplaceholder').each(function() {
      if (storage.inStorage(this.href)) {
        this.onclick.apply(this);
      }
    });
  });
})();

/**
 * Delayed like buttons loader
 */
LiveJournal.register_hook('page_load', function () {
  'use strict';

  jQuery(document.body).ljLikes();
});

/**
 * Embed gists from GitHub
 *
 * Parses the page for:
 * '<a href="https://gist.github.com/fcd584d3a351c3e9728b"></a>'
 */
(function($) {
  'use strict';

  var gistBase = '://gist.github.com/';

  function showGist(link) {
    var href  = link.attr('href'),
        head  = $('head'),
        match = href && href.match(/gist.github.com(.*)\/([a-zA-Z0-9]+)/),
        id    = match && match.pop();

    if (!id) {
      console.error('Bad GitHub id');
      return;
    }

    link
      .html('Loading the gist...');

    $.ajax({
      url: 'https' + gistBase + id + '.json',
      dataType: 'jsonp',
      timeout: 10000
    }).done(function(result) {
      if (!result.div || !result.stylesheet) {
        console.error('Data error', result);
      }

      head.append(
        '<link rel="stylesheet" href="https' + gistBase + result.stylesheet + '">'
      );

      var div = $(result.div);
      div.find('a').attr('target', '_blank');
      link.replaceWith(div);
    })
    .fail(function(error) {
      link.html('Gist loading error');
    });
  }

  function convertGists(node, isLjCut) {
    // Convert all gist links in node
    node = node || $('body');

    var gists = $('a[href*="' + gistBase + '"]', node);

    gists.each(function(_, element) {
      var link = $(element),
          isFeed,
          expandLink,
          needAutoExpand;

      link.attr('target', '_blank');

      // Insert original content from github if 'data-expand' is defined
      if ( link.attr('data-expand') ) {
        isFeed = /feed|friends/.test(window.location.pathname);
        needAutoExpand = isFeed ? isLjCut : (link.attr('data-expand') === 'true');

        // Add either gist or collapsed gist
        if (needAutoExpand) {

          // Add full gist content
          showGist(link);
        } else {

          // Add collapsed gist
          expandLink = $( '<a href="#">&nbsp;[Expand]</a>' );
          expandLink.on('click', function(e) {
            e.preventDefault();
            showGist(link);
            $(this).remove();
          });
          link.after(expandLink);
        }
      }

    });
  }

  $(function() {
    var body = $('body');
    convertGists( body );
    body.on('ljcutshow', function(event, ui) {
      convertGists($(event.target).next(), true );
    });
  });

}(jQuery));
;

/* file-end: js/journal.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/livejournal-local.js 
*/

$ = DOM.getElement;
jQuery(LiveJournal.initPage);

// ljtalk for ctxpopup
LiveJournal.register_hook("ctxpopup_extrainfo", function (userdata) {
	var content = '';
	if (userdata.is_person) {
		if (userdata.is_online !== null) {
			content = '<a href="' + Site.siteroot + '/chat/">' + userdata.ml_ljtalk + '</a>';
			if (userdata.is_online) {
				content += " " + userdata.ml_online;
			} else if (userdata.is_online == '0') {
				content += " " + userdata.ml_offline;
			}
		}
	}

	return content;
});

// for updating ljcom widgets from livejournal ones
LiveJournal.register_hook("update_other_widgets", function (from_widget) {
	if (from_widget == "LayoutChooser" && Customize.AdLayout) {
		Customize.AdLayout.updateContent();
	}
});
;

/* file-end: js/livejournal-local.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/lj_ippu.js 
*/

/* ---------------------------------------------------------------------------------
   file-start: js/ippu.js 
*/

/*
  IPPU methods:
     init([innerHTML]) -- takes innerHTML as optional argument
     show() -- shows the popup
     hide() -- hides popup
     cancel() -- hides and calls cancel callback

  Content setters:
     setContent(innerHTML) -- set innerHTML
     setContentElement(element) -- adds element as a child of the popup

   Accessors:
     getElement() -- returns popup DIV element
     visible() -- returns whether the popup is visible or not

   Titlebar:
     setTitlebar(show) -- true: show titlebar / false: no titlebar
     setTitle(title) -- sets the titlebar text
     getTitlebarElement() -- returns the titlebar element
     setTitlebarClass(className) -- set the class of the titlebar

   Styling:
     setOverflow(overflow) -- sets ele.style.overflow to overflow
     addClass(className) -- adds class to popup
     removeClass(className) -- removes class to popup

   Browser Hacks:
     setAutoHideSelects(autohide) -- when the popup is shown should it find all the selects
                                on the page and hide them (and show them again) (for IE)

   Positioning/Sizing:
     setLocation(left, top) -- set popup location: will be pixels if units not specified
     setLeft(left) -- set left location
     setTop(top)   -- set top location
     setDimensions(width, height) -- set popup dimensions: will be pixels if units not specified
     setAutoCenter(x, y) -- what dimensions to auto-center
     center() -- centers popup on screen
     centerX() -- centers popup horizontally
     centerY() -- centers popup vertically
     setFixedPosition(fixed) -- should the popup stay fixed on the page when it scrolls?
     centerOnWidget(widget) -- center popup on this widget
     setAutoCenterCallback(callback) -- calls callback with this IPPU instance as a parameter
                                        for auto-centering. Some common built-in class methods
                                        you can use as callbacks are:
                                        IPPU.center
                                        IPPU.centerX
                                        IPPU.centerY

     moveForward(amount) -- increases the zIndex by one or amount if specified
     moveBackward(amount) -- decreases the zIndex by one or amount if specified

   Modality:
     setClickToClose(clickToClose) -- if clickToClose is true, clicking outside of the popup
                                      will close it
     setModal(modality) -- If modality is true, then popup will capture all mouse events
                     and optionally gray out the rest of the page. (overrides clickToClose)
     setOverlayVisible(visible) -- If visible is true, when this popup is on the page it
                                   will gray out the rest of the page if this is modal

   Callbacks:
     setCancelledCallback(callback) -- call this when the dialog is closed through clicking
                                       outside, titlebar close button, etc...
     setHiddenCallback(callback) -- called when the dialog is closed in any fashion

   Fading:
     setFadeIn(fadeIn) -- set whether or not to automatically fade the ippu in
     setFadeOut(fadeOut) -- set whether or not to automatically fade the ippu out
     setFadeSpeed(secs) -- sets fade speed

  Class Methods:
   Handy callbacks:
     IPPU.center
     IPPU.centerX
     IPPU.centerY
   Browser testing:
     IPPU.isIE() -- is the browser internet exploder?
     IPPU.ieSafari() -- is this safari?

////////////////////


ippu.setModalDenialCallback(IPPU.cssBorderFlash);


   private:
    Properties:
     ele -- DOM node of div
     shown -- boolean; if element is in DOM
     autoCenterX -- boolean; auto-center horiz
     autoCenterY -- boolean; auto-center vertical
     fixedPosition -- boolean; stay in fixed position when browser scrolls?
     titlebar -- titlebar element
     title -- string; text to go in titlebar
     showTitlebar -- boolean; whether or not to show titlebar
     content -- DIV containing user's specified content
     clickToClose -- boolean; clicking outside popup will close it
     clickHandlerSetup -- boolean; have we set up the click handlers?
     docOverlay -- DIV that overlays the document for capturing clicks
     modal -- boolean; capture all events and prevent user from doing anything
                       until dialog is dismissed
     visibleOverlay -- boolean; make overlay slightly opaque
     clickHandlerFunc -- function; function to handle document clicks
     resizeHandlerFunc -- function; function to handle document resizing
     autoCenterCallback -- function; what callback to call for auto-centering
     cancelledCallback -- function; called when dialog is cancelled
     setAutoHideSelects -- boolean; autohide all SELECT elements on the page when popup is visible
     hiddenSelects -- array; SELECT elements that have been hidden
     hiddenCallback -- funciton; called when dialog is hidden
     fadeIn, fadeOut, fadeSpeed -- fading settings
     fadeMode -- current fading mode (in, out) if there is fading going on

    Methods:
     updateTitlebar() -- create titlebar if it doesn't exist,
                         hide it if titlebar == false,
                         update titlebar text
     updateContent() -- makes sure all currently specified properties are applied
     setupClickCapture() -- if modal, create document-sized div overlay to capture click events
                            otherwise install document onclick handler
     removeClickHandlers() -- remove overlay, event handlers
     clickHandler() -- event handler for clicks
     updateOverlay() -- if we have an overlay, make sure it's where it should be and (in)visible
                        if it should be
     autoCenter() -- centers popup on screen according to autoCenterX and autoCenterY
     hideSelects() -- hide all select element on page
     showSelects() -- show all selects
     _hide () -- actually hides everything, called by hide(), which does fading if necessary
*/

// this belongs somewhere else:
function changeOpac(id, opacity) {
    var e =  $(id);
    if (e && e.style) {
        var object = e.style;
        if (object) {
            //reduce flicker
            if (IPPU.isSafari() && opacity >= 100)
                opacity = 99.99;

            // IE
            if (object.filters)
                object.filters.alpha.opacity = opacity * 100;

            object.opacity = opacity;
        }
    }
}

IPPU = new Class( Object, {
  setFixedPosition: function (fixed) {
    // no fixed position for IE
    if (IPPU.isIE())
      return;

    this.fixedPosition = fixed;
    this.updateContent();
  },

  clickHandler : function (evt) {
    if (!this.clickToClose) return;
    if (!this.visible()) return;

    evt = Event.prep(evt);
    var target = evt.target;
    // don't do anything if inside the popup
    if (DOM.getAncestorsByClassName(target, "ippu", true).length > 0) return;
    this.cancel();
  },

  setCancelledCallback : function (callback) {
    this.cancelledCallback = callback;
  },

  cancel : function () {
    if (this.cancelledCallback)
      this.cancelledCallback();
    this.hide();
  },

  setHiddenCallback: function (callback) {
    this.hiddenCallback = callback;
  },

  setupClickCapture : function () {
    if (!this.visible() || this.clickHandlerSetup){return;}
    if (!this.clickToClose && !this.modal) {return;}

    this.clickHandlerFunc = this.clickHandler.bindEventListener(this);

    if (this.modal) {
      // create document-sized div to capture events
      if (this.overlay) return; // wtf? shouldn't exist yet
      this.overlay = document.createElement("div");
      this.overlay.style.left = "0px";
      this.overlay.style.top = "0px";
      this.overlay.style.margin = "0px";
      this.overlay.style.padding = "0px";
      
      this.overlay.style.backgroundColor = "#000000";
      this.overlay.style.zIndex="900";
      if (IPPU.isIE()){
      		this.overlay.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=50)";
		this.overlay.style.position="absolute";
		this.overlay.style.width=document.body.scrollWidth;
		this.overlay.style.height=document.body.scrollHeight;
      }
      else{
      	this.overlay.style.position = "fixed";
      }

      this.ele.parentNode.insertBefore(this.overlay, this.ele);
      this.updateOverlay();

      DOM.addEventListener(this.overlay, "click", this.clickHandlerFunc);
    } else {
      // simple document onclick handler
      DOM.addEventListener(document, "click", this.clickHandlerFunc);
    }

    this.clickHandlerSetup = true;
  },

  updateOverlay : function () {
    if (this.overlay) {
      var cd = DOM.getClientDimensions();
      this.overlay.style.width = (cd.x - 1) + "px";
      if(!IPPU.isIE()){
      	this.overlay.style.height = (cd.y - 1) + "px";
      }	
      if (this.visibleOverlay) {
        this.overlay.backgroundColor = "#000000";
        changeOpac(this.overlay, 0.50);
      } else {
        this.overlay.backgroundColor = "#FFFFFF";
        changeOpac(this.overlay, 0.0);
      }
    }
  },

  resizeHandler : function (evt) {
    this.updateContent();
  },

  removeClickHandlers : function () {
    if (!this.clickHandlerSetup) return;

    var myself = this;
    var handlerFunc = function (evt) {
      myself.clickHandler(evt);
    };

    DOM.removeEventListener(document, "click", this.clickHandlerFunc, false);

    if (this.overlay) {
      DOM.removeEventListener(this.overlay, "click", this.clickHandlerFunc, true);
      this.overlay.parentNode.removeChild(this.overlay);
      this.overlay = undefined;
    }

    this.clickHandlerFunc = undefined;
    this.clickHandlerSetup = false;
  },

  setClickToClose : function (clickToClose) {
    this.clickToClose = clickToClose;

    if (!this.clickHandlerSetup && clickToClose && this.visible()) {
      // popup is already visible, need to set up click handler
      var setupClickCaptureCallback = this.setupClickCapture.bind(this);
      window.setTimeout(setupClickCaptureCallback, 100);
    } else if (!clickToClose && this.clickHandlerSetup) {
      this.removeClickHandlers();
    }

    this.updateContent();
  },

  setModal : function (modal) {
    var changed = (this.modal == modal);

    // if it's modal, we don't want click-to-close
    if (modal)
      this.setClickToClose(false);

    this.modal = modal;
    if (changed) {
      this.removeClickHandlers();
      this.updateContent();
    }
  },

  setOverlayVisible : function (vis) {
    this.visibleOverlay = vis;
    this.updateContent();
  },

  updateContent : function () {
    this.autoCenter();
    this.updateTitlebar();
    this.updateOverlay();
    if (this.titlebar)
      this.setTitlebarClass(this.titlebar.className);

    var setupClickCaptureCallback = this.setupClickCapture.bind(this);
    window.setTimeout(setupClickCaptureCallback, 100);

    if (this.fixedPosition && this.ele.style.position != "fixed")
      this.ele.style.position = "fixed";
    else if (!this.fixedPosition && this.ele.style.position == "fixed")
      this.ele.style.position = "absolute";
  },

  getTitlebarElement : function () {
    return this.titlebar;
  },

  setTitlebarClass : function (className) {
    if (this.titlebar)
      this.titlebar.className = className;
  },

  setOverflow : function (overflow) {
    if (this.ele)
      this.ele.style.overflow = overflow;
  },

  visible : function () {
    return this.shown;
  },

  setTitlebar : function (show) {
    this.showTitlebar = show;

    if (show) {
      if (!this.titlebar) {
        // titlebar hasn't been created. Create it.
        var tbar = document.createElement("div");
        if (!tbar) return;
        tbar.style.width = "100%";

        if (this.title) tbar.innerHTML = this.title;
        this.ele.insertBefore(tbar, this.content);
        this.titlebar = tbar;

      }
    } else if (this.titlebar) {
      this.ele.removeChild(this.titlebar);
      this.titlebar = false;
    }
  },

  setTitle : function (title) {
    this.title = title;
    this.updateTitlebar();
  },

  updateTitlebar : function() {
    if (this.showTitlebar && this.titlebar && this.title != this.titlebar.innerHTML) {
      this.titlebar.innerHTML = this.title;
    }
  },

  addClass : function (className) {
    DOM.addClassName(this.ele, className);
  },

  removeClass : function (className) {
    DOM.removeClassName(this.ele, className);
  },

  setAutoCenterCallback : function (callback) {
    this.autoCenterCallback = callback;
  },

  autoCenter : function () {
    if (!this.visible || !this.visible()) return;

    if (this.autoCenterCallback) {
      this.autoCenterCallback(this);
      return;
    }

    if (this.autoCenterX)
      this.centerX();

    if (this.autoCenterY)
      this.centerY();
  },

  center : function () {
    this.centerX();
    this.centerY();
  },

  centerOnWidget : function (widget, offsetTop, offsetLeft) {
        offsetTop = offsetTop || 0;
        offsetLeft = offsetLeft || 0;
        this.setAutoCenter(false, false);
        this.setAutoCenterCallback(null);
  var wd = DOM.getAbsoluteDimensions(widget);
    var ed = DOM.getAbsoluteDimensions(this.ele);
    var newleft = (wd.absoluteRight - wd.offsetWidth / 2 - ed.offsetWidth / 2) + offsetLeft;
    var newtop = (wd.absoluteBottom - wd.offsetHeight / 2 - ed.offsetHeight / 2) + offsetTop;

        newleft = newleft < 0 ? 0 : newleft;
        newtop  = newtop  < 0 ? 0 : newtop;
    DOM.setLeft(this.ele, newleft);
    DOM.setTop(this.ele, newtop);
  },

  centerX : function () {
    if (!this.visible || !this.visible()) return;

    var cd = DOM.getClientDimensions();
    var newleft = cd.x / 2 - this.ele.offsetWidth / 2;

    // If not fixed position, center relative to the left of the page
    if (!this.fixedPosition) {
        var wd = DOM.getWindowScroll();
        newleft += wd.left;
    }

   DOM.setLeft(this.ele, newleft);
  },

  centerY : function () {
    if (!this.visible || !this.visible()) return;

    var cd = DOM.getClientDimensions();
    var newtop = cd.y / 2 - this.ele.offsetHeight / 2;

    // If not fixed position, center relative to the top of the page
    if (!this.fixedPosition) {
        var wd = DOM.getWindowScroll();
        newtop += wd.top;
    }

    DOM.setTop(this.ele, newtop);
  },

  setAutoCenter : function (autoCenterX, autoCenterY) {
    this.autoCenterX = autoCenterX || false;
    this.autoCenterY = autoCenterY || false;

    if (!autoCenterX && !autoCenterY) {
        this.setAutoCenterCallback(null);
        return;
    }

    this.autoCenter();
  },

  setDimensions : function (width, height) {
    width = width + "";
    height = height + "";
    if (width.match(/^\d+$/)) width += "px";
    if (height.match(/^\d+$/)) height += "px";

    this.ele.style.width  = width;
    this.ele.style.height = height;
  },

  moveForward : function (howMuch) {
      if (!howMuch) howMuch = 1;
      if (! this.ele) return;

      this.ele.style.zIndex += howMuch;
  },

  moveBackward : function (howMuch) {
      if (!howMuch) howMuch = 1;
      if (! this.ele) return;

      this.ele.style.zIndex -= howMuch;
  },

  setLocation : function (left, top) {
      this.setLeft(left);
      this.setTop(top);
  },

  setTop : function (top) {
   if (typeof top != 'string') top += 'px';
     this.ele.style.top = top;
  },

  setLeft : function (left) {
	if (typeof left != 'string') left += 'px';
    this.ele.style.left = left;
  },

  getElement : function () {
    return this.ele;
  },

  setContent : function (html) {
    this.content.innerHTML = html;
  },

  setContentElement : function (element) {
      // remove child nodes
      while (this.content.firstChild) {
          this.content.removeChild(this.content.firstChild);
      };

    this.content.appendChild(element);
  },

  setFadeIn : function (fadeIn) {
      this.fadeIn = fadeIn;
  },

  setFadeOut : function (fadeOut) {
      this.fadeOut = fadeOut;
  },

  setFadeSpeed : function (fadeSpeed) {
      this.fadeSpeed = fadeSpeed;
  },

  show : function () {
    this.shown = true;

    if (this.fadeIn) {
        var opp = 0.01;

        changeOpac(this.ele, opp);
    }

    document.body.appendChild(this.ele);
    this.ele.style.position = "absolute";
    if (this.autoCenterX || this.autoCenterY) this.center();

    this.updateContent();

    if (!this.resizeHandlerFunc) {
      this.resizeHandlerFunc = this.resizeHandler.bindEventListener(this);
      DOM.addEventListener(window, "resize", this.resizeHandlerFunc, false);
    }

    if (this.fadeIn)
        this.fade("in");

    this.hideSelects();
  },

  fade : function (mode, callback) {
      var opp;
      var delta;

      var steps = 10.0;

      if (mode == "in") {
          delta = 1 / steps;
          opp = 0.1;
      } else {
          if (this.ele.style.opacity)
          opp = finiteFloat(this.ele.style.opacity);
          else
          opp = 0.99;

          delta = -1 / steps;
      }

      var fadeSpeed = this.fadeSpeed;
      if (!fadeSpeed) fadeSpeed = 1;

      var fadeInterval = steps / fadeSpeed * 5;

      this.fadeMode = mode;

      var self = this;
      var fade = function () {
          opp += delta;

          // did someone start a fade in the other direction? if so,
          // cancel this fade
          if (self.fadeMode && self.fadeMode != mode) {
              if (callback)
                  callback.call(self, []);

              return;
          }

          if (opp <= 0.1) {
              if (callback)
                  callback.call(self, []);

              self.fadeMode = null;

              return;
          } else if (opp >= 1.0) {
              if (callback)
                  callback.call(self, []);

              self.fadeMode = null;

              return;
          } else {
              changeOpac(self.ele, opp);
              window.setTimeout(fade, fadeInterval);
          }
      };

      fade();
  },

  hide : function () {
    if (! this.visible()) return;

    if (this.fadeOut && this.ele) {
        this.fade("out", this._hide.bind(this));
    } else {
        this._hide();
    }
  },

  _hide : function () {
    if (this.hiddenCallback)
      this.hiddenCallback();

    this.shown = false;
    this.removeClickHandlers();

    if (this.ele)
    document.body.removeChild(this.ele);

    if (this.resizeHandlerFunc)
      DOM.removeEventListener(window, "resize", this.resizeHandlerFunc);

    this.showSelects();
  },

  // you probably want this for IE being dumb
  // (IE thinks select elements are cool and puts them in front of every element on the page)
  setAutoHideSelects : function (autohide) {
    this.autoHideSelects = autohide;
    this.updateContent();
  },

  hideSelects : function () {
    if (!this.autoHideSelects || !IPPU.isIE()) return;
    var sels = document.getElementsByTagName("select");
    var ele;
    for (var i = 0; i < sels.length; i++) {
      ele = sels[i];
      if (!ele) continue;

      // if this element is inside the ippu, skip it
      if (DOM.getAncestorsByClassName(ele, "ippu", true).length > 0) continue;

      if (ele.style.visibility != 'hidden') {
        ele.style.visibility = 'hidden';
        this.hiddenSelects.push(ele);
      }
    }
  },

  showSelects : function () {
    if (! this.autoHideSelects) return;
    var ele;
    while (ele = this.hiddenSelects.pop())
      ele.style.visibility = '';
  },

  init: function (html) {
    var ele = document.createElement("div");
    this.ele = ele;
    this.shown = false;
    this.autoCenterX = false;
    this.autoCenterY = false;
    this.titlebar = null;
    this.title = "";
    this.showTitlebar = false;
    this.clickToClose = false;
    this.modal = false;
    this.clickHandlerSetup = false;
    this.docOverlay = false;
    this.visibleOverlay = false;
    this.clickHandlerFunc = false;
    this.resizeHandlerFunc = false;
    this.fixedPosition = false;
    this.autoCenterCallback = null;
    this.cancelledCallback = null;
    this.autoHideSelects = false;
    this.hiddenCallback = null;
    this.fadeOut = false;
    this.fadeIn = false;
    this.hiddenSelects = [];
    this.fadeMode = null;

    ele.style.position = "absolute";
	ele.style.top = 0;
    ele.style.zIndex   = "1000";

    // plz don't remove thx
    DOM.addClassName(ele, "ippu");

    // create DIV to hold user's content
    this.content = document.createElement("div");

    this.content.innerHTML = html;

    this.ele.appendChild(this.content);
  }
});

// class methods
IPPU.center = function (obj) {
  obj.centerX();
  obj.centerY();
};

IPPU.centerX = function (obj) {
  obj.centerX();
};

IPPU.centerY = function (obj) {
  obj.centerY();
};

IPPU.isIE = function () {
    var UA = navigator.userAgent.toLowerCase();
    if (UA.indexOf('msie') != -1) return true;
    return false;
};

IPPU.isSafari = function () {
    var UA = navigator.userAgent.toLowerCase();
    if (UA.indexOf('safari') != -1) return true;
    return false;
};
;

/* file-end: js/ippu.js 
----------------------------------------------------------------------------------*/

LJ_IPPU = new Class ( IPPU, {
  init: function(title) {
    if (!title)
      title = "";

    LJ_IPPU.superClass.init.apply(this, []);

    this.uniqId = this.generateUniqId();
    this.cancelThisFunc = this.cancel.bind(this);

    this.setTitle(title);
    this.setTitlebar(true);
    this.setTitlebarClass("lj_ippu_titlebar");

    this.addClass("lj_ippu");
    this.setAutoCenterCallback(IPPU.center);
    this.setDimensions(514, "auto");
    //this.setOverflow("hidden");

    this.setFixedPosition(true);
    this.setClickToClose(true);
    this.setAutoHideSelects(true);
 },

  setTitle: function (title) {
    var titlebarContent = "\
      <div style='float:right; padding-right: 8px'>" +
      "<img src='" + Site.imgprefix + "/CloseButton.gif?v=7618' width='15' height='15' id='" + this.uniqId + "_cancel' /></div>" + title;

    LJ_IPPU.superClass.setTitle.apply(this, [titlebarContent]);
  },

  generateUniqId: function() {
    var theDate = new Date();
    return "lj_ippu_" + theDate.getHours() + theDate.getMinutes() + theDate.getMilliseconds();
  },

  show: function() {
    LJ_IPPU.superClass.show.apply(this);
    var setupCallback = this.setup_lj_ippu.bind(this);
    this.timerSetup = window.setTimeout(setupCallback, 300);
  },

  setup_lj_ippu: function (evt) {
    var cancelCallback = this.cancelThisFunc;
   $(this.uniqId + "_cancel").onclick = function(){
	    cancelCallback();
    };
  },

  hide: function() {
    clearInterval(this.timerSetup);
    LJ_IPPU.superClass.hide.apply(this);
  }
} );

// Class method to show a popup to show a note to the user
// note = message to show
// underele = element to display the note underneath
LJ_IPPU.showNote = function (note, underele, timeout, style) {
    var noteElement = document.createElement("div");
    noteElement.innerHTML = note;

    return LJ_IPPU.showNoteElement(noteElement, underele, timeout, style);
};

LJ_IPPU.showErrorNote = function (note, underele, timeout) {
    return LJ_IPPU.showNote(note, underele, timeout, "ErrorNote");
};

LJ_IPPU.showNoteElement = function (noteEle, underele, timeout, style) {
    var notePopup = new IPPU();
    notePopup.init();

    var inner = document.createElement("div");
    DOM.addClassName(inner, "Inner");
    inner.appendChild(noteEle);
    notePopup.setContentElement(inner);

    notePopup.setTitlebar(false);
    notePopup.setFadeIn(true);
    notePopup.setFadeOut(true);
    notePopup.setFadeSpeed(4);
    notePopup.setDimensions("auto", "auto");
    if (!style) style = "Note";
    notePopup.addClass(style);

    var dim;
    if (underele) {
        // pop up the box right under the element
        dim = DOM.getAbsoluteDimensions(underele);
        if (!dim) return;
    }

    var bounds = DOM.getClientDimensions();
    if (!bounds) return;

    if (!dim) {
        // no element specified to pop up on, show in the middle
        // notePopup.setModal(true);
        // notePopup.setOverlayVisible(true);
        notePopup.setAutoCenter(true, true);
        notePopup.show();
    } else {
        // default is to auto-center, don't want that
        notePopup.setAutoCenter(false, false);
        notePopup.setLocation(dim.absoluteLeft, dim.absoluteBottom + 4);
        notePopup.show();

        var popupBounds = DOM.getAbsoluteDimensions(notePopup.getElement());
        if (popupBounds.absoluteRight > bounds.x) {
            notePopup.setLocation(bounds.x - popupBounds.offsetWidth - 30, dim.absoluteBottom + 4);
        }
    }

    notePopup.setClickToClose(true);
    notePopup.moveForward();

    if (timeout === undefined) {
        timeout = 5000;
    }

    if (timeout) {
        window.setTimeout(function () {
            if (notePopup)
                notePopup.hide();
        }, timeout);
    }

    return notePopup;
};

LJ_IPPU.textPrompt = function (title, prompt, callback, options) {
		options = options || {};

    title += '';
    var notePopup = new LJ_IPPU(title);

    var inner = document.createElement("div");
    DOM.addClassName(inner, "ljippu_textprompt");

    // label
    if (prompt)
        inner.appendChild(_textDiv(prompt));

    // text field
    var field = document.createElement("textarea");
    DOM.addClassName(field, "htmlfield");
    field.cols = 40;
    field.rows = 5;
    inner.appendChild(field);

    // submit btn
    var btncont = document.createElement("div");
    DOM.addClassName(btncont, "submitbtncontainer");
    var btn = document.createElement("input");
    DOM.addClassName(btn, "submitbtn");
    btn.type = "button";
    btn.value = "Insert";
    btncont.appendChild(btn);
    inner.appendChild(btncont);

    notePopup.setContentElement(inner);

    notePopup.setAutoCenter(true, true);
    notePopup.setDimensions(options.width || "60%", "auto");
    notePopup.show();
    field.focus();

    DOM.addEventListener(btn, "click", function (e) {
        notePopup.hide();
        if (callback)
            callback.apply(null, [field.value]);
    });
}
;

/* file-end: js/lj_ippu.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/ljwidget.js 
*/

LJWidget = new Class(Object, {
    // replace the widget contents with an ajax call to render with params
    updateContent: function (params) {
        if (! params) params = {};
        this._show_frame = params["showFrame"];

        if ( params["method"] ) method = params["method"];
        params["_widget_update"] = 1;

        if (this.doAjaxRequest(params)) {
            // hilight the widget to show that its updating
            this.hilightFrame();
        }
    },

    // returns the widget element
    getWidget: function () {
        return $(this.widgetId);
    },

    // do a simple post to the widget
    doPost: function (params) {
        if (! params) params = {};
        this._show_frame = params["showFrame"];
        var postParams = {};

        var classPrefix = this.widgetClass;
        classPrefix = "Widget[" + classPrefix.replace(/::/g, "_") + "]_";

        for (var k in params) {
            var class_k = k;
            if (! k.match(/^Widget\[/) && k != 'lj_form_auth' && ! k.match(/^_widget/)) {
                class_k = classPrefix + k;
            }

            postParams[class_k] = params[k];
        }

        postParams["_widget_post"] = 1;

        this.doAjaxRequest(postParams);
    },

    doPostAndUpdateContent: function (params) {
        if (! params) params = {};

        params["_widget_update"] = 1;

        this.doPost(params);
    },

    // do an ajax post of the form passed in
    postForm: function (formElement) {
      if (! formElement) return false;

      var params = {};

      for (var i=0; i < formElement.elements.length; i++) {
        var element = formElement.elements[i];
        var name = element.name;
        var value = element.value;

        params[name] = value;
      }

      this.doPost(params);
    },

    ///////////////// PRIVATE METHODS ////////////////////

    init: function (id, widgetClass, authToken) {
        LJWidget.superClass.init.apply(this, arguments);
        this.widgetId = id;
        this.widgetClass = widgetClass;
        this.authToken = authToken;
    },

    hilightFrame: function () {
        if (this._show_frame != 1) return;
        if (this._frame) return;

        var widgetEle = this.getWidget();
        if (! widgetEle) return;

        var widgetParent = widgetEle.parentNode;
        if (! widgetParent) return;

        var enclosure = document.createElement("fieldset");
        enclosure.style.borderColor = "red";
        var title = document.createElement("legend");
        title.innerHTML = "Updating...";
        enclosure.appendChild(title);

        widgetParent.appendChild(enclosure);
        enclosure.appendChild(widgetEle);

        this._frame = enclosure;
    },

    removeHilightFrame: function () {
        if (this._show_frame != 1) return;

        var widgetEle = this.getWidget();
        if (! widgetEle) return;

        if (! this._frame) return;

        var par = this._frame.parentNode;
        if (! par) return;

        par.appendChild(widgetEle);
        par.removeChild(this._frame);

        this._frame = null;
    },

    method: "POST",
    endpoint: "widget",
    requestParams: {},

    doAjaxRequest: function (params) {
        if (! params) params = {};

        if (this._ajax_updating) return false;
        this._ajax_updating = true;

        params["_widget_id"]     = this.widgetId;
        params["_widget_class"]  = this.widgetClass;

        params["auth_token"]  = this.authToken;

        if ($('_widget_authas')) {
            params["authas"] = $('_widget_authas').value;
        }

        var reqOpts = {
            method:  this.method,
            data:    HTTPReq.formEncoded(params),
            url:     LiveJournal.getAjaxUrl(this.endpoint),
            onData:  this.ajaxDone.bind(this),
            onError: this.ajaxError.bind(this)
        };

        for (var k in params) {
            reqOpts[k] = params[k];
        }

        HTTPReq.getJSON(reqOpts);

        return true;
    },

    ajaxDone: function (data) {
        this._ajax_updating = false;
        this.removeHilightFrame();

		if (data["_widget_body"]) {
			if (data["_widget_body"].match(/ajax:.[^"]+/)) {
				this.authToken = data["_widget_body"].match(/ajax:.[^"]+/)[0];
			}
		}

        if (data.auth_token) {
            this.authToken = data.auth_token;
        }

        if (data.errors && data.errors != '') {
            return this.ajaxError(data.errors);
        }

        if (data.error) {
            return this.ajaxError(data.error);
        }

        // call callback if one exists
        if (this.onData) {
             this.onData(data);
        }

        if (data["_widget_body"]) {
            // did an update request, got the new body back
            var widgetEle = this.getWidget();
            if (! widgetEle) {
              // widget is gone, ignore
              return;
            }

            widgetEle.innerHTML = data["_widget_body"];

            if (this.onRefresh) {
                this.onRefresh();
            }
        }
    },

    ajaxError: function (err) {
        this._ajax_updating = false;

        if (this.onError) {
            // use class error handler
            this.onError(err);
        } else {
            // use generic error handler
            LiveJournal.ajaxError(err);
        }
    }
});

LJWidget.widgets = [];
;

/* file-end: js/ljwidget.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/ljwidget_ippu.js 
*/

LJWidgetIPPU = new Class(LJWidget, {
    init: function (opts, reqParams) {
        var title          = opts.title;
        var widgetClass    = opts.widgetClass;
        var authToken      = opts.authToken;
        var nearEle        = opts.nearElement;
        var not_view_close = opts.not_view_close;

        if (! reqParams) reqParams = {};
        this.reqParams = reqParams;

        // construct a container ippu for this widget
        var ippu = new LJ_IPPU(title, nearEle);
        this.ippu = ippu;
        var c = document.createElement("div");
        c.id = "LJWidgetIPPU_" + Unique.id();
        ippu.setContentElement(c);

        if (opts.width && opts.height)
          ippu.setDimensions(opts.width, opts.height);

        if (opts.overlay) {
            if (IPPU.isIE()) {
                this.ippu.setModal(true);
                this.ippu.setOverlayVisible(true);
                this.ippu.setClickToClose(false);
            } else {
                this.ippu.setModal(true);
                this.ippu.setOverlayVisible(true);
            }
        }

        if (opts.center) ippu.center();
        ippu.show();
        if (not_view_close) ippu.titlebar.getElementsByTagName('img')[0].style.display = 'none';

        var loadingText = document.createElement("div");
        loadingText.style.fontSize = '1.5em';
        loadingText.style.fontWeight = 'bold';
        loadingText.style.margin = '5px';
        loadingText.style.textAlign = 'center';

        loadingText.innerHTML = "Loading...";

        this.loadingText = loadingText;

        c.appendChild(loadingText);

        // id, widgetClass, authToken
        var widgetArgs = [c.id, widgetClass, authToken]
        LJWidgetIPPU.superClass.init.apply(this, widgetArgs);

        var self = this;
        ippu.setCancelledCallback( function() {
            if( self.cancel ) {
                self.cancel();
            }
        } );

        if (!widgetClass)
            return null;

        this.widgetClass = widgetClass;
        this.authToken   = authToken;
        this.title       = title;
        this.nearEle     = nearEle;

        window.setInterval(this.animateLoading.bind(this), 20);

        this.loaded = false;

        // start request for this widget now
        this.loadContent();
        return this;
    },

    animateCount: 0,

    animateLoading: function (i) {
      var ele = this.loadingText;

      if (this.loaded || ! ele) {
        window.clearInterval(i);
        return;
      }

      this.animateCount += 0.05;
      var intensity = ((Math.sin(this.animateCount) + 1) / 2) * 255;
      var hexColor = Math.round(intensity).toString(16);

      if (hexColor.length == 1) hexColor = "0" + hexColor;
      hexColor += hexColor + hexColor;

      ele.style.color = "#" + hexColor;
      this.ippu.center();
    },

    // override doAjaxRequest to add _widget_ippu = 1
    doAjaxRequest: function (params) {
      if (! params) params = {};
      params['_widget_ippu'] = 1;
     if(document.getElementById("LJ__Setting__InvisibilityGuests_invisibleguests_self")){
       params['Widget[IPPU_SettingProd]_LJ__Setting__InvisibilityGuests_invisibleguests']=
         (document.getElementById("LJ__Setting__InvisibilityGuests_invisibleguests_self").checked==true)?(1):((document.getElementById("LJ__Setting__InvisibilityGuests_invisibleguests_anon").checked==true)?(2):(0))
     }
      LJWidgetIPPU.superClass.doAjaxRequest.apply(this, [params]);
    },

    close: function () {
      this.ippu.hide();
    },

    loadContent: function () {
      var reqOpts = this.reqParams;
      this.updateContent(reqOpts);
    },

    method: "POST",

    // request finished
    onData: function (data) {
      this.loaded = true;
    },

    render: function (params) {

    }
});
;

/* file-end: js/ljwidget_ippu.js 
----------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------
   file-start: js/contextualhover.js 
*/


/* ---------------------------------------------------------------------------------
   file-start: js/relations.js 
*/

/**
 * @author Valeriy Vasin (valeriy.vasin@sup.com)
 * @description Manage user relations
 */
;(function () {
    'use strict';

    var actions = [
        'addFriend',
        'removeFriend',
        'subscribe',
        'unsubscribe',
        'join',
        'leave',
        'setBan',
        'setUnban',
        'banEverywhere',
        'unbanEverywhere'
    ];

    /**
     * Check consistency of action and data params returned from server
     * @param  {String} action One of four actions: add/remove friend, subscribe/unsubscribe
     * @param  {Object} data   Data returned frome server
     * @return {String}        Correct action that has been done
     */
    function verifyAction(action, data) {
        /**
         * Notice:
         *   the only case when response could be inconsistent is
         *   when you're going to subscribe for user that is already your friend
         */
        return action === 'subscribe' && data.is_friend ? 'addFriend' : action;
    }

    /**
     * Change relations between users
     * @param {Object}   eventData               Relations change object
     * @param {String}   eventData.username      Username of user change relations for
     * @param {String}   eventData.action        Action to perform (restricted to actions listed in array above)
     * @param {Function} [eventData.callback]    Callback function to call after
     */
    function changeRelation(eventData) {
        var username, action;

        if (typeof eventData !== 'object' || eventData === null) {
            throw new TypeError('Data should be an object.');
        }

        username = eventData.username;
        action = eventData.action;

        if ( actions.indexOf(action) === -1 ) {
            console.error('Action ' + action + ' is not allowed.');
            return;
        }

        LJ.Api.call(
            'change_relation.' + action.toLowerCase(),
            { target: username },
            function (data) {
                LiveJournal.run_hook('relations.changed', {
                    action: verifyAction(action, data),
                    username: username,
                    data: data
                });

                if (typeof eventData.callback === 'function') {
                    eventData.callback(data);
                }
            }
        );
    }

    // bind listeners for relation actions
    if ( LJ.Flags.isEnabled('friendsAndSubscriptions') ) {
        LiveJournal.register_hook('relations.change', changeRelation);
    }
}());
;

/* file-end: js/relations.js 
----------------------------------------------------------------------------------*/

/*global ContextualPopup, Hourglass */

/**
 * Contextual popup is displayed on mouse hover near
 * every userpic and userhead
 */

/**
 * Widget shows the dialog to edit current user note.
 */
LJWidgetIPPU_AddAlias = new Class(LJWidgetIPPU, {
    init: function (opts, params) {
        opts.widgetClass = "IPPU::AddAlias";
        this.width = opts.width; // Use for resizing later
        this.height = opts.height; // Use for resizing later
        this.alias = opts.alias;
        LJWidgetIPPU_AddAlias.superClass.init.apply(this, arguments);
    },

    changeAlias: function (evt, form) {
        this.doPost({
            alias: form['Widget[IPPU_AddAlias]_alias'].value + '',
            foruser: form['Widget[IPPU_AddAlias]_foruser'].value + ''
        });

        evt.preventDefault();
    },

    onData: function (data) {
        if (!data.res || !data.res.success) {
            return;
        }

        this.close();

        //Changing button. Only on profile page
        var edit_node = jQuery('.profile_addalias');
        if (edit_node.length) {
            if (data.res.alias) {
                edit_node[0].style.display = 'none';
                edit_node[1].style.display = 'block';
                edit_node[1].firstChild.alias = data.res.alias;
            } else {
                edit_node[0].style.display = 'block';
                edit_node[1].style.display = 'none';
            }
        }

        var username = data.res.username,
            alias = data.res.alias;
        if (ContextualPopup.cachedResults[username]) {
            ContextualPopup.cachedResults[username].alias_title = alias ? 'Edit Note' : 'Add Note';
            ContextualPopup.cachedResults[username].alias = alias;
        }

        if (ContextualPopup.currentId === username) {
            ContextualPopup.renderPopup(ContextualPopup.currentId);
        }
    },

    onError: function (msg) {
        LJ_IPPU.showErrorNote('Error: ' + msg);
    },

    onRefresh: function () {
        var form = jQuery('#addalias_form').get(0),
            input = jQuery(form['Widget[IPPU_AddAlias]_alias']),
            delete_btn = jQuery(form['Widget[IPPU_AddAlias]_aliasdelete']),
            widget = this;
        input.focus();

        if (delete_btn.length) {
            delete_btn.click(function(){
                input.val('');
            });
            input.input(function() {
                // save button disabled
                form['Widget[IPPU_AddAlias]_aliaschange'].disabled = !this.value;
            });
        }

        jQuery(form).submit(function(e) { widget.changeAlias(e, form); });
    },

    cancel: function () {
        this.close();
    }
});


//this object contains only authToken
Aliases = {};
function addAlias(target, ptitle, ljusername, oldalias, callback) {
    var widget;

    if ( !ptitle ) { return true; }

    widget = new LJWidgetIPPU_AddAlias({
        title: ptitle,
        width: 440,
        height: 180,
        authToken: Aliases.authToken,
        callback: callback
    }, {
        alias: target.alias||oldalias,
        foruser: ljusername
    });

    return false;
}


(function($) {
    'use strict';

    var rex_userpic = /(userpic\..+\/\d+\/\d+)|(\/userpic\/\d+\/\d+)/;

    /**
     * Object contains methods to build and display user popup.
     */
    var popup = {
        popupDelay: 500,
        popupTimer: null,
        adriverImages : {
            anonymous: 'http://ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=186396&bt=21&pid=482107&bid=893162&bn=893162&rnd={random}',
            guest: 'http://ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=186396&bt=21&pid=482107&bid=893165&bn=893165&rnd={random}',
            self: 'http://ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=186396&bt=21&pid=482107&bid=893167&bn=893167&rnd={random}'
        },

        classNames: {
            popup: 'b-popup-contextual'
        },
        selectors: {
            wrapper: '.b-contextualhover',
            bubble: '.b-popup',
            popup: '.contextualPopup'
        },
        templates: {
            wrapper: '<div class="b-contextualhover"></div>',
            content: 'templates-Widgets-contextualhover',
            loading: 'Loading...'
        },

        init: function() {
            var wrapper = jQuery(this.templates.wrapper),
                self = this;

            this._visible = false;

            this.element = jQuery(wrapper).bubble({
                alwaysShowUnderTarget: true,
                closeControl: false,
                show: function() {
                    ContextualPopup._visible = true;
                },
                hide: function() {
                    ContextualPopup.hideHourglass();
                    ContextualPopup._visible = false;
                },
                classNames: {
                    containerAddClass: this.classNames.popup
                }
            });

            this.bindShowHideEvents(this.element.closest(this.selectors.bubble));
        },

        bindShowHideEvents: function(el) {
            var self = this;
            el = jQuery(el);

            el.bind('mouseenter', function(ev) { self.show(); });
            el.bind('mouseleave', function(ev) { self.hide(); });
        },

        show: function(force) {
            this.setVisibile(true, force);
        },

        hide: function(force) {
            this.setVisibile(false, force);
        },

        setVisibile: function(isVisible, force) {
            var action = isVisible ? 'show' : 'hide',
                self = this;

            force = force || false;
            clearTimeout(this.popupTimer);

            if (force) {
                this.element.bubble(action);
            } else {
                this.popupTimer = setTimeout(function() {
                    self.element.bubble(action);
                }, this.popupDelay);
            }
        },

        /**
         * Constructs object, passes it to the template,
         * inserts it in the bubble and binds events.
         *
         * @param {Object} data Object returned from the endpoint.
         * @param {String} ctxPopupId The id of the user.
         */
        render: function(data, ctxPopupId) {
            if (!data) {
                this.element.empty().append(this.templates.loading);
                return;
            } else if (!data.username || !data.success || data.noshow) {
                this.hide(true);
                return;
            }

            var buildObject = {
                headLinks: [],
                linkGroups: []
            };

            if (data.url_userpic && data.url_userpic !== ctxPopupId) {
                buildObject.userpic = {
                    allpics: data.url_allpics,
                    pic: data.url_userpic
                };
            }

            buildObject.title = {
                title: data.ctxpopup_status
            };

            // aliases
            if (!data.is_requester && data.is_logged_in) {
                if (data.alias_enable) {
                    if (data.alias) {
                        buildObject.headLinks.push('<i>' + data.alias.encodeHTML() + '</i>');
                    }

                    buildObject.headLinks.push({
                        url: Site.siteroot + '/manage/notes.bml',
                        click: function(e)
                        {
                            e.preventDefault();
                            addAlias(this, data.alias_title, data.username, data.alias || '');
                        },
                        text: data.alias_title
                    });
                } else {
                    buildObject.headLinks.push(
                        '<span class="alias-unavailable">'+
                            '<a href="'+Site.siteroot+'/manage/account">'+
                                '<img src="'+Site.statprefix+'/horizon/upgrade-paid-icon.gif?v=2621" width="13" height="16" alt=""/>'+
                            '</a> '+
                            '<a href="'+Site.siteroot+'/support/faq/295.html">'+data.alias_title+'</a>'+
                        '</span>');
                }
            }

            if (data.is_logged_in && !data.is_requester) {

                // add/remove friend link
                (function () {

                    // do not show 'add friend / watch community' links. Only subscribe link should be
                    if ( LJ.Flags.isEnabled('friendsAndSubscriptions') ) {
                        if (!data.is_person && !data.is_identity) {
                            return;
                        }
                    }

                    buildObject.headLinks.push({
                        selector: 'a[href="{url}"]:first',
                        url: data.url_addfriend,
                        click: function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            ContextualPopup.changeRelation(data, ctxPopupId, data.is_friend ? 'removeFriend' : 'addFriend', e);
                        },
                        text: (function() {
                            if (data.is_comm) {
                                return data.is_friend ? data.ml_stop_community : data.ml_watch_community;
                            } else if (data.is_syndicated) {
                                return data.is_friend ? data.ml_unsubscribe_feed : data.ml_subscribe_feed;
                            } else {
                                return data.is_friend ? data.ml_remove_friend : data.ml_add_friend;
                            }
                        }())
                    });
                }());

                // subscribe/unsubscribe
                if ( LJ.Flags.isEnabled('friendsAndSubscriptions') ) {
                    if ( !data.is_friend ) {
                        buildObject.headLinks.push({
                            selector: 'a[href=#subscription]',
                            url: '#subscription',
                            click: function (e) {
                                ContextualPopup.changeRelation(
                                    data,
                                    ctxPopupId,
                                    data.is_subscribedon ? 'unsubscribe' : 'subscribe',
                                    e
                                );
                                e.preventDefault();
                                e.stopPropagation();
                            },
                            text: data.is_subscribedon ? data.ml_unsubscribe : data.ml_subscribe
                        });
                    }
                }

                if (data.is_friend && !data.is_identity) {
                    buildObject.headLinks.push({
                        url: data.url_addfriend,
                        text: data.ml_edit_friend_tags
                    });
                }
            }

            var linkGroup = [];

            // community member
            if (data.is_logged_in && data.is_comm) {
                linkGroup.push({
                    selector: 'a[href="{url}"]',
                    url: data.is_friend_of ? data.url_leavecomm : data.url_joincomm,
                    text: data.is_friend_of ? data.ml_leave : data.ml_join_community,
                    click: function(e)
                    {
                        e.preventDefault();
                        ContextualPopup.changeRelation(data, ctxPopupId, data.is_friend_of ? 'leave' : 'join', e);
                    }
                });
            }

            //filter community
            if( ( !data.is_comm && Site.current_journal && ( 'is_comm' in Site.current_journal ) &&
                        Site.current_journal.is_comm === '1' ) || data.posted_in ) {
                linkGroup.push({
                    url: ( ( data.posted_in ) ? data.posted_in : Site.current_journal.url_journal ) + '/?poster=' + data.username,
                    text: ( Site.remoteUser === data.username && !data.posted_in ) ?
                            ( data.ml_filter_by_poster_me || 'Filter community by me' ) :
                            ( data.ml_filter_by_poster || 'Filter community by poster' )
                });
            }

            buildObject.linkGroups.push(linkGroup);
            linkGroup = [];

            // send message
            if (data.is_logged_in && data.is_person && ! data.is_requester && data.url_message) {
                linkGroup.push({
                    url: data.url_message,
                    text: data.ml_send_message
                });
            }

            // vgift
            if ((data.is_person || data.is_comm) && !data.is_requester && data.can_receive_vgifts) {
                linkGroup.push({
                    url: Site.siteroot + '/shop/vgift.bml?to=' + data.username,
                    text: data.ml_send_gift
                });
            }

            // wishlist
            // commented according to task LJSUP-11396
            //if ((data.is_person || data.is_comm) && !data.is_requester && data.wishlist_url) {
            //  linkGroup.push({
            //      url: data.wishlist_url,
            //      text: data.ml_view_wishlist
            //  });
            //}

            // buy the same userhead
            if (data.is_logged_in && data.is_person && ! data.is_requester && data.is_custom_userhead) {
                linkGroup.push((data.is_app_userhead) ?
                        { url: data.url_userhead_install, text: data.ml_userhead_install } :
                        { url: data.url_buy_userhead, text: data.ml_buy_same_userhead }
                );
            }

            // identity
            if (data.is_identity && data.is_requester) {
                linkGroup.push({
                    url: Site.siteroot + '/identity/convert.bml',
                    text: data.ml_upgrade_account
                });
            }

            // add site-specific content here
            var extraContent = LiveJournal.run_hook('ctxpopup_extrainfo', data);
            if (extraContent) {
                linkGroup.push(extraContent);
            }

            buildObject.linkGroups.push(linkGroup);

            if (data.is_logged_in && !data.is_requester && !data.is_comm && !data.is_syndicated) {
                buildObject.showBanOptions = true;
                buildObject.banUsersLink = {
                    url: Site.siteroot + '/manage/banusers.bml',
                    text: data.ml_ban
                };

                // ban/unban
                buildObject.banCheckboxes = [];
                buildObject.banCheckboxes.push({
                    selector: '.ban_user',
                    className: 'ban_user',
                    label: data.ml_ban_in_my,
                    checked: data.is_banned,
                    change: function(e)
                    {
                        e.preventDefault();
                        ContextualPopup.changeRelation(data, ctxPopupId, data.is_banned ? 'setUnban' : 'setBan', e);
                    }
                });

                // report a bot
                if (!Site.remote_is_suspended) {
                    buildObject.reportBot = {
                        url: Site.siteroot + '/abuse/bots.bml?user=' + data.username,
                        text: data.ml_report
                    };
                }

                // ban user from all maintained communities
                if (!data.is_requester && !data.is_comm && !data.is_syndicated && data.have_communities) {
                    buildObject.banCheckboxes.push({
                        selector: '.ban_everywhere',
                        className: 'ban_everywhere',
                        label: data.ban_everywhere_title,
                        checked: data.is_banned_everywhere,
                        change: function(e)
                        {
                            e.preventDefault();
                            var action = data.is_banned_everywhere ? 'unbanEverywhere' : 'banEverywhere';
                            ContextualPopup.changeRelation(data, ctxPopupId, action, e);
                        }
                    });
                }
            }

            var userType = 'guest';
            if (!data.is_logged_in) { //  anonymous
                userType = 'anonymous';
            } else if (data.is_requester) { // self
                userType = 'self';
            }

            new Image().src = this.adriverImages[userType].supplant({ random: Math.random()});


            buildObject.socialCap = {
                first: !!data.first
            };

            buildObject.partner = !!data.partner;

            if (data.value) { buildObject.socialCap.value = data.value; }

            this.element
                .empty()
                .append(LJ.UI.template(this.templates.content, buildObject));

            if (this.element.is(':visible')) {
                //show method forces bubble to reposition with respect to the new content
                this.element.bubble('updatePosition');
            }

            this.setPopupEvents(buildObject);
        },

        /**
         * Go through all build objects and find all callbacks that should be bound
         * to the node events.
         *
         * @param {Object} buildObject Template object.
         */
        setPopupEvents: function(buildObject) {
            var element = this.element;
            element.undelegate();

            function walkObject(obj) {
                $.each(obj, function(key, value) {
                    var selector;

                    if (value.click) {
                        //default handler is by url
                        selector = value.selector || '[href="' + value.url + '"]';
                        selector = selector.supplant(value);
                        element.delegate(selector, 'click', value.click);
                    }

                    if (value.change) {
                        //for checkboxes selector should present anyway
                        selector = value.selector;
                        selector = selector.supplant(value);
                        element.delegate(selector, 'change', value.change);
                    }

                    //maybe this object has children with events to be set
                    if (typeof value === 'object') {
                        walkObject(value);
                    }
                });
            }

            walkObject(buildObject);
        }
    };

    window.ContextualPopup = {
        cachedResults  : {},
        currentRequests: {},
        currentId      : null,
        currentElement : null,
        hourglass      : null,

        /*
         * Init live handler for contextual popups
         */
        setupLive: function() {
            popup.init();

            $(document.body)
                // remove standart listeners from setup
                .off('mouseover', ContextualPopup.mouseover)
                .off('click', ContextualPopup.touchStart)

                // use live listener
                .on('mouseover ' + (LJ.Support.touch ? 'click' : ''), '.ljuser, img', function(event) {

                    // handle <img> with link to userpic
                    if (this.tagName.toLowerCase() === 'img' && !$(this).attr('src').match(rex_userpic)) {
                        return;
                    }

                    ContextualPopup.activate(event, true);
                });
        },

        setup: function() {
            /* this method is no longed needed, because of ContextualPopup.setupLive */
            return this;
        },

        /**
         * Search child nodes and bind hover events on them if needed.
         */
        searchAndAdd: function(node) {
            if (!Site.ctx_popup) { return; }

            // attach to all ljuser head icons
            var rex_userid = /\?userid=(\d+)/,
                class_nopopup = 'noctxpopup',
                ljusers = jQuery('span.ljuser:not(.' + class_nopopup + ')>a>img', node),
                i = -1, userid, ljuser, parent;

            // use while for speed
            while (ljusers[++i]) {
                ljuser = ljusers[i];
                parent = ljuser.parentNode;
                userid = parent.href.match(rex_userid);

                if (parent.href && userid) {
                    ljuser.userid = userid[1];
                } else if (parent.parentNode.getAttribute('lj:user')) {
                    ljuser.username = parent.parentNode.getAttribute('lj:user');
                } else {
                    continue;
                }

                ljuser.posted_in = parent.parentNode.getAttribute('data-journal');
                ljuser.className += ' ContextualPopup';
            }

            ljusers = node.getElementsByTagName('img');
            i = -1;
            while (ljusers[++i]) {
                ljuser = ljusers[i];
                if (ljuser.src.match(rex_userpic) && ljuser.className.indexOf(class_nopopup) < 0) {
                    ljuser.up_url = ljuser.src;
                    if (ljuser.parentNode.getAttribute('data-journal')) {
                        ljuser.posted_in = ljuser.parentNode.getAttribute('data-journal');
                    }
                    ljuser.className += ' ContextualPopup';
                }
            }
        },

        activate: function(e, useLive) {
            if (useLive && !(e.target.username || e.target.userid || e.target.up_url)) {
                ContextualPopup.searchAndAdd($(e.currentTarget).parent().get(0));
            };
                
            var target = e.target,
                ctxPopupId = target.username || target.userid || target.up_url,
                t = ContextualPopup;

            if (target.tagName === 'IMG' && ctxPopupId) {
                // if we don't have cached data background request it
                if (!t.cachedResults[ctxPopupId]) {
                    t.getInfo(target, ctxPopupId);
                }

                // doesn't display alt as tooltip
                if (jQuery.browser.msie && target.title !== undefined) {
                    target.title = '';
                }

                // show other popup
                if (t.currentElement !== target) {
                    t.showPopup(ctxPopupId, target);
                } else {
                    popup.show();
                }

                return true;
            }

            return false;
        },

        mouseOver: function(e) {
            ContextualPopup.activate(e);
        },

        touchStart: function(e) {
            var current = ContextualPopup.currentElement;

            //if popup is activated then currentElement property is rewriten somewhere inside the activate
            //function and this condition works;
            if (ContextualPopup.activate(e) && (!ContextualPopup._visible || current !== ContextualPopup.currentElement)) {
                e.preventDefault();
                e.stopPropagation();
            }
        },

        showPopup: function(ctxPopupId, ele) {
            var showNow = popup.element.is(':visible');
            jQuery(this.currentElement)
                .unbind('mouseenter mouseleave');

            this.currentId = ctxPopupId;
            var data = this.cachedResults[ctxPopupId];

            if (data && data.noshow) { return; }
            if (this.currentElement && this.currentElement !== ele) {
                popup.hide(true);
            }

            if (data && data.error) {
                popup.hide(true);
                ContextualPopup.showNote(data.error, ele);
                return;
            }

            popup.render(data, ctxPopupId);
            popup.element.bubble('option', 'target', jQuery(ele));
            popup.bindShowHideEvents(ele);
            popup.show(showNow);
            this.currentElement = ele;
        },

        /**
         * Hide currently opened popup
         */
        hide: function () {
            popup.hide(true);
            return this;
        },

        renderPopup: function(ctxPopupId) {
            popup.render(this.cachedResults[ctxPopupId], ctxPopupId);
        },

        // ajax request to change relation
        changeRelation: function (info, ctxPopupId, action, e) {
            function changedRelation(data) {
                if (data.error) {
                    return ContextualPopup.showNote(data.error.message);
                }

                if (ContextualPopup.cachedResults[ctxPopupId]) {
                    jQuery.extend(ContextualPopup.cachedResults[ctxPopupId], data);
                }

                // if the popup is up, reload it
                ContextualPopup.renderPopup(ctxPopupId);
            }

            LJ.Api.call(
                'change_relation.' + action.toLowerCase(),
                { target: info.username },
                function (data) {
                    ContextualPopup.hourglass.hide();
                    ContextualPopup.hourglass = null;
                    changedRelation(data);
                }
            );

            ContextualPopup.hideHourglass();
            ContextualPopup.hourglass = jQuery(e).hourglass()[0];

            //entering mouse on the hourglass should no close popup
            jQuery(ContextualPopup.hourglass.ele).bind('mouseenter', function(ev) {
                popup.element.trigger('mouseenter');
            });

            // so mousing over hourglass doesn't make ctxpopup think mouse is outside
            ContextualPopup.hourglass.element.addClass('lj_hourglass');

            return false;
        },

        // create a little popup to notify the user of something
        showNote: function (note, ele) {
            ele = ele || popup.element[0];
            LJ_IPPU.showNote(note, ele);
        },

        cleanCache: function(keys) {
            var self = this;

            keys = keys || [];
            if (typeof keys === 'string') {
                keys = [ keys ];
            }

            keys.forEach(function(key) {
                if (self.cachedResults[key]) {
                    delete self.cachedResults[key];
                }
            });
        },

        // do ajax request of user info
        getInfo: function(target, popup_id) {
            var t = this;
            if (t.currentRequests[popup_id]) {
                return;
            }
            t.currentRequests[popup_id] = 1;

            var reqParams = {
                user: target.username || ''
            };

            jQuery.ajax({
                url: LiveJournal.getAjaxUrl('ctxpopup'),
                data: Object.extend( reqParams, {
                    userid: target.userid || 0,
                    userpic_url: target.up_url || '',
                    mode: 'getinfo'
                }),
                dataType: 'json',
                success: function(data)
                {
                    if (data.error) {
                        data.username = reqParams.user;
                        t.cachedResults[data.username] = data;
                        popup.hide(true);
                        t.showNote(data.error, target);
                        return;
                    }

                    if( target.posted_in ) {
                        data.posted_in = target.posted_in;
                    }

                    t.cachedResults[String(data.userid)] =
                    t.cachedResults[data.username] =
                    t.cachedResults[data.url_userpic] = data;

                    // non default userpic
                    if (target.up_url) {
                        t.cachedResults[target.up_url] = data;
                    }

                    t.currentRequests[popup_id] = null;

                    if (t.currentId === popup_id) {
                        t.renderPopup(popup_id);
                    }
                },
                error: function()
                {
                    t.currentRequests[popup_id] = null;
                }
            });
        },

        hideHourglass: function () {
            if (this.hourglass) {
                this.hourglass.hide();
                this.hourglass = null;
            }
        }
    };

    // Update changing relations functionality to work through relations manager
    // that is declared in `js/relations.js`
    if ( LJ.Flags.isEnabled('friendsAndSubscriptions') ) {

        // redeclare `changeRelation` method to interact with relations manager
        ContextualPopup.changeRelation = function (info, ctxPopupId, action, e) {
            LiveJournal.run_hook('relations.change', {
                action: action,
                username: info.username
            });

            // hide existed hourglass and add another one
            ContextualPopup.hideHourglass();

            ContextualPopup.hourglass = new Hourglass()
                .setEvent(e)
                .show();

            ContextualPopup.hourglass.element
                // entering mouse on the hourglass should not close popup
                .on('mouseenter', function () {
                    popup.element.trigger('mouseenter');
                })
                // so mousing over hourglass doesn't make ctxpopup think mouse is outside
                .addClass('lj_hourglass');

            return false;
        };

        // subscribe to change relation events
        (function () {
            LiveJournal.register_hook('relations.changed', function (eventData) {
                var data = eventData.data,
                    username = eventData.username;

                ContextualPopup.hideHourglass();

                if (data.error) {
                    ContextualPopup.showNote(data.error.message);
                    return;
                }

                if ( ContextualPopup.cachedResults[username] ) {
                    $.extend(ContextualPopup.cachedResults[username], data);
                }

                // if the popup is up, reload it
                ContextualPopup.renderPopup(username);
            });
        }());
    }

}(jQuery));;

/* file-end: js/contextualhover.js 
----------------------------------------------------------------------------------*/
