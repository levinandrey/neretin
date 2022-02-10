(function(window){var e=null,h=!1;function i(a){return function(b){this[a]=b}}function j(a){return function(){return this[a]}}var k,m=this;
function n(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"==typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function o(a){return"array"==n(a)}function q(a){return"function"==n(a)}Math.floor(2147483648*Math.random()).toString(36);function r(a,b,c){return a.call.apply(a.bind,arguments)}
function s(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function t(a,b,c){t=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?r:s;return t.apply(e,arguments)};var v={};function w(a,b,c){if(o(b))for(var d=0;d<b.length;d++)w(a,b[d],c);else a.addEventListener?a.addEventListener(b,c,h):a.attachEvent&&a.attachEvent(b in v?v[b]:v[b]="on"+b,c)}function x(a,b,c){if(o(b))for(var d=0;d<b.length;d++)x(a,b[d],c);else a.removeEventListener?a.removeEventListener(b,c,h):a.detachEvent&&a.detachEvent(b in v?v[b]:v[b]="on"+b,c)};function y(a,b){this.ya=a;this.ia=b?b:"callback";this.D=5E3}var z=0;
y.prototype.send=function(a,b,c,d){var g=a||e;if(!document.documentElement.firstChild)return c&&c(g),e;d=d||"_"+(z++).toString(36)+(+new Date).toString(36);m._callbacks_||(m._callbacks_={});var a=document.createElement("script"),f=e;0<this.D&&(f=m.setTimeout(A(d,a,g,c),this.D));c=this.ya;g&&(c=B(g,c));b&&(m._callbacks_[d]=C(d,a,b,f),b={},b[this.ia]="_callbacks_."+d,c=B(b,c));a.type="text/javascript";a.id=d;a.charset="UTF-8";a.src=c;b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,
b);return{M:d,D:f}};function A(a,b,c,d){return function(){D(a,b,h);d&&d(c)}}function C(a,b,c,d){return function(g){m.clearTimeout(d);D(a,b,!0);c.apply(void 0,arguments)}}function D(a,b,c){m.setTimeout(function(){b.parentNode.removeChild(b)},0);m._callbacks_[a]&&(c?delete m._callbacks_[a]:m._callbacks_[a]=function(){})}function B(a,b){var c=[],d;for(d in a)c.push(d+"="+encodeURIComponent(a[d]));return-1==b.indexOf("?")?b+"?"+c.join("&"):b+"&"+c.join("&")};function E(a,b){this.width=a;this.height=b}E.prototype.toString=function(){return this.width+"x"+this.height};var F,G,H,I,J;function K(){return m.navigator?m.navigator.userAgent:e}J=I=H=G=F=h;var L;if(L=K()){var aa=m.navigator;J=0==L.indexOf("Opera");F=!J&&-1!=L.indexOf("MSIE");I=(H=!J&&-1!=L.indexOf("WebKit"))&&-1!=L.indexOf("Mobile");G=!J&&!H&&"Gecko"==aa.product}var ba=F,ca=G,M=H,da=I;var N;if(J&&m.opera){var O=m.opera.version;"function"==typeof O&&O()}else ca?N=/rv\:([^\);]+)(\)|;)/:ba?N=/MSIE\s+([^\);]+)(\)|;)/:M&&(N=/WebKit\/(\S+)/),N&&N.exec(K());function ea(a){var b=document.createElement("iframe"),a=a||{},c;for(c in a)b[c]=a[c];return b};var P="https:"==document.location.protocol?"https:":"http:";var fa=window;function Q(a,b,c,d){if(q(a))c&&(a=t(a,c));else throw Error("Invalid listener argument");this.O=a;if(2147483647<b)throw Error("Invalid delay argument");this.d=b;this.ha=t(this.xa,this);this.F=d||fa;this.B=+new Date}k=Q.prototype;k.a=e;k.enabled=h;k.start=function(){this.enabled=!0;this.a||(5E3>this.d&&(this.d=5E3),this.a=this.F.setTimeout(this.O,this.d),this.B=+new Date)};
k.xa=function(){if(this.enabled){var a=+new Date-this.B;0<a&&a<0.8*this.d?this.a=this.F.setTimeout(this.ha,this.d-a):this.O()}};k.stop=function(){this.enabled=h;this.a&&(this.F.clearTimeout(this.a),this.a=e)};k.pause=function(){this.stop();this.d-=+new Date-this.B};function ga(a,b){this.t=a;this.j=b||{}}function R(a,b,c){return void 0!==a.j[b]?a.j[b]:c};function S(a){this.N=void 0!==a?a:{}}S.prototype.W=/<\!--\s*@annotation\(\s*([^)]*)\s*\)\s*--\>/ig;S.prototype.ca=/\s*,\s*/i;S.prototype.$=/\s*=\s*/g;S.prototype.parse=function(a,b){for(var c={},d,g="boolean"==typeof b?b:!0;(d=this.W.exec(a))!=e;){d=d[1].split(this.ca);for(var f=0,l=d.length;f<l;f++){var u=d[f].split(this.$);if(2==u.length){var p=u[0];this.N[p]?c[p]=this.N[p](u[1]):g||(c[p]=u[1])}}}return c};function T(){var a;var b=m.location.hash,c=this.s.length;if(-1!=b.indexOf(this.s)){var d=b.indexOf(this.s),b=b.substring(d+c,d+c+40);40==b.length&&(a=b)}this.C=a;this.pa=new y(this.C?this.Y:this.S,this.U);this.ea=new S(ha)}var ha={duration:parseInt,friendly:function(a){return"true"==a?!0:h}};k=T.prototype;k.S=P+"//ad.rambler.ru/ban.ban";k.Y=P+"//adsys.rambler.ru/preview/green";k.s="greenpreview";k.U="cb";k.c={aa:"rn",X:"pg",V:"op",T:"ifr",l:"words",ba:"sres",da:"vres",Z:"pkey"};k.z=h;
k.i=function(a,b,c,d){var g={};g[this.c.aa]=+new Date;g[this.c.V]=16;g[this.c.T]=this.z?5:6;g[this.c.X]=a;var f=m.screen;f&&(g[this.c.ba]=f.width+"x"+f.height);var f=window,l=f.document;if(M&&!da){void 0!==f.innerHeight||(f=window);var l=f.innerHeight,u=f.document.documentElement.scrollHeight;f==f.top&&u<l&&(l-=15);f=new E(f.innerWidth,l)}else f="CSS1Compat"==l.compatMode?l.documentElement:l.body,f=new E(f.clientWidth,f.clientHeight);g[this.c.da]=f.toString();this.C&&(g[this.c.Z]=this.C);for(var p in b)g[p]=
b[p];this.pa.send(g,ia(a,c,this.ea),ja(d))};
k.m=function(a,b){function c(a){return'<script type="text/javascript">'+a+"<\/script>"}function d(a,b){var c;c=navigator.userAgent;var d=c.indexOf("MSIE ");c=parseFloat(c.substring(d+5,c.indexOf(";",d)));(a.contentWindow?a.contentWindow:window.frames[a.name]).contents=b;a.src="javascript:"+(6<parseInt(c,10)?'document.write(window["contents"]);document.close();':'window["contents"]')}function g(a,b){var d=(a.contentWindow?a.contentWindow:window.frames[a.name]).document;d.write(b);d.write(c("document.close();"))}
var f;if(R(a,"friendly"))f=c('var container_id="'+b.id+'";')+a.t,b.innerHTML=f;else{f="green_ifr_"+ +new Date;var l=ea({name:f,id:f,width:R(a,"width"),height:R(a,"height"),scrolling:"no",vspace:0,hspace:0,allowTransparency:"true",marginWidth:0,marginHeight:0,frameBorder:0});b.appendChild(l);f=c('var inDapIF=true,container_id="'+b.id+'",ifr_id="'+f+'";')+a.t;-1!=navigator.userAgent.indexOf("MSIE ")?d(l,f):g(l,f)}};
function ia(a,b,c){return function(d){var g=e;if(d=d[a])g=d.body,d={},c&&(d=c.parse(g,h)),g=new ga(g,d);q(b)&&b(g)}}function ja(a){return function(){q(a)&&a()}};function U(a,b,c,d,g){this.M=a;this.R=b;this.e=c;this.va=q(d)?d:function(){};this.L=q(g)?g:function(){};this.n={};this.J=t(this.i,this);this.I=t(this.ra,this);this.H=t(this.qa,this);this.ga=t(this.wa,this);this.fa=t(this.ja,this)}k=U.prototype;k.enabled=h;k.A=0;k.p=1;k.Q=i("p");k.oa=j("p");k.o=45E3;k.P=i("o");k.ma=j("o");k.r=function(a){var b=this.q.c.l,c=Array.prototype.slice.call(arguments);this.n[b]=this.n[b]?this.n[b]+(" "+c.join(" ")):c.join(" ")};k.q=e;k.G=function(a){this.q=a;return this};
k.h=e;k.b=e;k.empty=function(){if(!this.b&&(this.b="string"==typeof this.e?document.getElementById(this.e):this.e,!this.b))throw Error("Invalid slot container");this.b.innerHTML=""};k.wa=function(a){if(this.enabled)this.m(a);else{var b=R(a,"duration",this.o);this.h=a;this.A<this.p&&(this.a=new Q(this.J,b))}};k.ja=function(){this.L.call()};k.i=function(){this.A++;this.q.i(this.M,this.n,this.ga,this.fa)};
k.m=function(a){var b=R(a,"duration",this.o);a.j.width=R(a,"width",this.R[0]);a.j.height=R(a,"height",this.R[1]);this.empty();a.t?(this.q.m(a,this.b),this.va.call(e,a.j)):this.L.call();a!==this.h?(this.a&&(this.a.stop(),this.a=e),this.A<this.p&&(this.a=new Q(this.J,b),this.a.start())):this.a&&this.a.start();this.h=a};k.ra=function(){this.enabled&&this.a&&this.a.pause()};k.qa=function(){this.enabled&&this.a&&this.a.start()};
k.display=function(){if(!this.enabled){this.enabled=!0;if(!this.b&&(this.b="string"==typeof this.e?document.getElementById(this.e):this.e,!this.b))throw Error('Invalid slot divId "'+this.e+'"');w(this.b,"mouseover",this.I);w(this.b,"mouseout",this.H);this.h?this.m(this.h):this.i()}};k.f=function(){this.enabled&&(this.enabled=h,x(this.b,"mouseover",this.I),x(this.b,"mouseout",this.H),this.empty(),this.a&&this.a.pause())};k.refresh=function(){this.enabled&&this.i()};function V(){this.k={};this.g=new T;this.v={}}k=V.prototype;k.u=45E3;k.w=1;k.ta=i("u");k.la=j("u");k.ua=i("w");k.na=j("w");k.sa=function(a){this.g.z=a};k.ka=function(){return this.g.z};k.r=function(a){this.v[this.g.c.l]?Array.prototype.slice.call(arguments):this.v[this.g.c.l]=Array.prototype.slice.call(arguments).join(" ")};k.K=function(a,b,c,d,g){a=new U(a,b,c,d,g);a.G(this.g);a.P(this.u);a.Q(this.w);return this.k[c]=a};
k.display=function(a){if(o(a))for(var b=0;b<a.length;b++)this.display(a[b]);else a&&(this.k[a].r([this.v[this.g.c.l]]),this.k[a].display())};k.f=function(a){if(o(a))for(var b=0;b<a.length;b++)this.f(a[b]);else a&&this.k[a].f()};k.refresh=function(a){if(o(a))for(var b=0;b<a.length;b++)this.refresh(a[b]);else a&&this.k[a].refresh()};var W=window,ka=(W._green||{}).cmd||[],X=U.prototype;X.display=X.display;X.undisplay=X.f;X.refresh=X.refresh;X.addService=X.G;X.setDefaultLifetime=X.P;X.getDefaultLifetime=X.ma;X.setMaxUpdates=X.Q;X.getMaxUpdates=X.oa;X.setWords=X.r;X.hide=X.f;var Y=V.prototype;Y.defineSlot=Y.K;Y.definePlacement=Y.K;Y.display=Y.display;Y.undisplay=Y.f;Y.refresh=Y.refresh;Y.setDefaultAdItemLifetime=Y.ta;Y.getDefaultAdItemLifetime=Y.la;Y.setDefaultSlotMaxUpdates=Y.ua;Y.getDefaultSlotMaxUpdates=Y.na;
Y.setAllowFloatingBanners=Y.sa;Y.getAllowFloatingBanners=Y.ka;Y.setWords=Y.r;Y.hide=Y.f;function Z(a){this.push=function(a){for(var c=arguments,d=0,g=0;g<c.length;g++)try{q(c[g])&&c[g].call(void 0)}catch(f){d++}return d};o(a)&&this.push.apply(this,a)}var $=Z.prototype;$.push=$.push;W._green=new V;W._green.cmd=new Z(ka);})(window)