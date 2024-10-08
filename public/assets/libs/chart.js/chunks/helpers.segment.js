/*! For license information please see helpers.segment.js.LICENSE.txt */
import{Color}from"@kurkle/color";function noop(){}const uid=(()=>{let e=0;return()=>e++})();function isNullOrUndef(e){return null==e}function isArray(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return"[object"===t.slice(0,7)&&"Array]"===t.slice(-6)}function isObject(e){return null!==e&&"[object Object]"===Object.prototype.toString.call(e)}function isNumberFinite(e){return("number"==typeof e||e instanceof Number)&&isFinite(+e)}function finiteOrDefault(e,t){return isNumberFinite(e)?e:t}function valueOrDefault(e,t){return void 0===e?t:e}const toPercentage=(e,t)=>"string"==typeof e&&e.endsWith("%")?parseFloat(e)/100:+e/t,toDimension=(e,t)=>"string"==typeof e&&e.endsWith("%")?parseFloat(e)/100*t:+e;function callback(e,t,n){if(e&&"function"==typeof e.call)return e.apply(n,t)}function each(e,t,n,o){let r,i,a;if(isArray(e))if(i=e.length,o)for(r=i-1;r>=0;r--)t.call(n,e[r],r);else for(r=0;r<i;r++)t.call(n,e[r],r);else if(isObject(e))for(a=Object.keys(e),i=a.length,r=0;r<i;r++)t.call(n,e[a[r]],a[r])}function _elementsEqual(e,t){let n,o,r,i;if(!e||!t||e.length!==t.length)return!1;for(n=0,o=e.length;n<o;++n)if(r=e[n],i=t[n],r.datasetIndex!==i.datasetIndex||r.index!==i.index)return!1;return!0}function clone(e){if(isArray(e))return e.map(clone);if(isObject(e)){const t=Object.create(null),n=Object.keys(e),o=n.length;let r=0;for(;r<o;++r)t[n[r]]=clone(e[n[r]]);return t}return e}function isValidKey(e){return-1===["__proto__","prototype","constructor"].indexOf(e)}function _merger(e,t,n,o){if(!isValidKey(e))return;const r=t[e],i=n[e];isObject(r)&&isObject(i)?merge(r,i,o):t[e]=clone(i)}function merge(e,t,n){const o=isArray(t)?t:[t],r=o.length;if(!isObject(e))return e;const i=(n=n||{}).merger||_merger;let a;for(let t=0;t<r;++t){if(a=o[t],!isObject(a))continue;const r=Object.keys(a);for(let t=0,o=r.length;t<o;++t)i(r[t],e,a,n)}return e}function mergeIf(e,t){return merge(e,t,{merger:_mergerIf})}function _mergerIf(e,t,n){if(!isValidKey(e))return;const o=t[e],r=n[e];isObject(o)&&isObject(r)?mergeIf(o,r):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=clone(r))}function _deprecated(e,t,n,o){void 0!==t&&console.warn(e+': "'+n+'" is deprecated. Please use "'+o+'" instead')}const keyResolvers={"":e=>e,x:e=>e.x,y:e=>e.y};function _splitKey(e){const t=e.split("."),n=[];let o="";for(const e of t)o+=e,o.endsWith("\\")?o=o.slice(0,-1)+".":(n.push(o),o="");return n}function _getKeyResolver(e){const t=_splitKey(e);return e=>{for(const n of t){if(""===n)break;e=e&&e[n]}return e}}function resolveObjectKey(e,t){return(keyResolvers[t]||(keyResolvers[t]=_getKeyResolver(t)))(e)}function _capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}const defined=e=>void 0!==e,isFunction=e=>"function"==typeof e,setsEqual=(e,t)=>{if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0};function _isClickEvent(e){return"mouseup"===e.type||"click"===e.type||"contextmenu"===e.type}const PI=Math.PI,TAU=2*PI,PITAU=TAU+PI,INFINITY=Number.POSITIVE_INFINITY,RAD_PER_DEG=PI/180,HALF_PI=PI/2,QUARTER_PI=PI/4,TWO_THIRDS_PI=2*PI/3,log10=Math.log10,sign=Math.sign;function almostEquals(e,t,n){return Math.abs(e-t)<n}function niceNum(e){const t=Math.round(e);e=almostEquals(e,t,e/1e3)?t:e;const n=Math.pow(10,Math.floor(log10(e))),o=e/n;return(o<=1?1:o<=2?2:o<=5?5:10)*n}function _factorize(e){const t=[],n=Math.sqrt(e);let o;for(o=1;o<n;o++)e%o==0&&(t.push(o),t.push(e/o));return n===(0|n)&&t.push(n),t.sort(((e,t)=>e-t)).pop(),t}function isNumber(e){return!isNaN(parseFloat(e))&&isFinite(e)}function almostWhole(e,t){const n=Math.round(e);return n-t<=e&&n+t>=e}function _setMinAndMaxByKey(e,t,n){let o,r,i;for(o=0,r=e.length;o<r;o++)i=e[o][n],isNaN(i)||(t.min=Math.min(t.min,i),t.max=Math.max(t.max,i))}function toRadians(e){return e*(PI/180)}function toDegrees(e){return e*(180/PI)}function _decimalPlaces(e){if(!isNumberFinite(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function getAngleFromPoint(e,t){const n=t.x-e.x,o=t.y-e.y,r=Math.sqrt(n*n+o*o);let i=Math.atan2(o,n);return i<-.5*PI&&(i+=TAU),{angle:i,distance:r}}function distanceBetweenPoints(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function _angleDiff(e,t){return(e-t+PITAU)%TAU-PI}function _normalizeAngle(e){return(e%TAU+TAU)%TAU}function _angleBetween(e,t,n,o){const r=_normalizeAngle(e),i=_normalizeAngle(t),a=_normalizeAngle(n),s=_normalizeAngle(i-r),l=_normalizeAngle(a-r),c=_normalizeAngle(r-i),u=_normalizeAngle(r-a);return r===i||r===a||o&&i===a||s>l&&c<u}function _limitValue(e,t,n){return Math.max(t,Math.min(n,e))}function _int16Range(e){return _limitValue(e,-32768,32767)}function _isBetween(e,t,n,o=1e-6){return e>=Math.min(t,n)-o&&e<=Math.max(t,n)+o}function _lookup(e,t,n){n=n||(n=>e[n]<t);let o,r=e.length-1,i=0;for(;r-i>1;)o=i+r>>1,n(o)?i=o:r=o;return{lo:i,hi:r}}const _lookupByKey=(e,t,n,o)=>_lookup(e,n,o?o=>{const r=e[o][t];return r<n||r===n&&e[o+1][t]===n}:o=>e[o][t]<n),_rlookupByKey=(e,t,n)=>_lookup(e,n,(o=>e[o][t]>=n));function _filterBetween(e,t,n){let o=0,r=e.length;for(;o<r&&e[o]<t;)o++;for(;r>o&&e[r-1]>n;)r--;return o>0||r<e.length?e.slice(o,r):e}const arrayEvents=["push","pop","shift","splice","unshift"];function listenArrayEvents(e,t){e._chartjs?e._chartjs.listeners.push(t):(Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),arrayEvents.forEach((t=>{const n="_onData"+_capitalize(t),o=e[t];Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value(...t){const r=o.apply(this,t);return e._chartjs.listeners.forEach((e=>{"function"==typeof e[n]&&e[n](...t)})),r}})})))}function unlistenArrayEvents(e,t){const n=e._chartjs;if(!n)return;const o=n.listeners,r=o.indexOf(t);-1!==r&&o.splice(r,1),o.length>0||(arrayEvents.forEach((t=>{delete e[t]})),delete e._chartjs)}function _arrayUnique(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}function fontString(e,t,n){return t+" "+e+"px "+n}const requestAnimFrame="undefined"==typeof window?function(e){return e()}:window.requestAnimationFrame;function throttled(e,t){let n=[],o=!1;return function(...r){n=r,o||(o=!0,requestAnimFrame.call(window,(()=>{o=!1,e.apply(t,n)})))}}function debounce(e,t){let n;return function(...o){return t?(clearTimeout(n),n=setTimeout(e,t,o)):e.apply(this,o),t}}const _toLeftRightCenter=e=>"start"===e?"left":"end"===e?"right":"center",_alignStartEnd=(e,t,n)=>"start"===e?t:"end"===e?n:(t+n)/2,_textX=(e,t,n,o)=>e===(o?"left":"right")?n:"center"===e?(t+n)/2:t;function _getStartAndCountOfVisiblePoints(e,t,n){const o=t.length;let r=0,i=o;if(e._sorted){const{iScale:a,_parsed:s}=e,l=a.axis,{min:c,max:u,minDefined:d,maxDefined:f}=a.getUserBounds();d&&(r=_limitValue(Math.min(_lookupByKey(s,a.axis,c).lo,n?o:_lookupByKey(t,l,a.getPixelForValue(c)).lo),0,o-1)),i=f?_limitValue(Math.max(_lookupByKey(s,a.axis,u,!0).hi+1,n?0:_lookupByKey(t,l,a.getPixelForValue(u),!0).hi+1),r,o)-r:o-r}return{start:r,count:i}}function _scaleRangesChanged(e){const{xScale:t,yScale:n,_scaleRanges:o}=e,r={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!o)return e._scaleRanges=r,!0;const i=o.xmin!==t.min||o.xmax!==t.max||o.ymin!==n.min||o.ymax!==n.max;return Object.assign(o,r),i}const atEdge=e=>0===e||1===e,elasticIn=(e,t,n)=>-Math.pow(2,10*(e-=1))*Math.sin((e-t)*TAU/n),elasticOut=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*TAU/n)+1,effects={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>1-Math.cos(e*HALF_PI),easeOutSine:e=>Math.sin(e*HALF_PI),easeInOutSine:e=>-.5*(Math.cos(PI*e)-1),easeInExpo:e=>0===e?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>1===e?1:1-Math.pow(2,-10*e),easeInOutExpo:e=>atEdge(e)?e:e<.5?.5*Math.pow(2,10*(2*e-1)):.5*(2-Math.pow(2,-10*(2*e-1))),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>atEdge(e)?e:elasticIn(e,.075,.3),easeOutElastic:e=>atEdge(e)?e:elasticOut(e,.075,.3),easeInOutElastic(e){const t=.1125;return atEdge(e)?e:e<.5?.5*elasticIn(2*e,t,.45):.5+.5*elasticOut(2*e-1,t,.45)},easeInBack(e){const t=1.70158;return e*e*((t+1)*e-t)},easeOutBack(e){const t=1.70158;return(e-=1)*e*((t+1)*e+t)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?e*e*((1+(t*=1.525))*e-t)*.5:.5*((e-=2)*e*((1+(t*=1.525))*e+t)+2)},easeInBounce:e=>1-effects.easeOutBounce(1-e),easeOutBounce(e){const t=7.5625,n=2.75;return e<1/n?t*e*e:e<2/n?t*(e-=1.5/n)*e+.75:e<2.5/n?t*(e-=2.25/n)*e+.9375:t*(e-=2.625/n)*e+.984375},easeInOutBounce:e=>e<.5?.5*effects.easeInBounce(2*e):.5*effects.easeOutBounce(2*e-1)+.5};function isPatternOrGradient(e){if(e&&"object"==typeof e){const t=e.toString();return"[object CanvasPattern]"===t||"[object CanvasGradient]"===t}return!1}function color(e){return isPatternOrGradient(e)?e:new Color(e)}function getHoverColor(e){return isPatternOrGradient(e)?e:new Color(e).saturate(.5).darken(.1).hexString()}const numbers=["x","y","borderWidth","radius","tension"],colors=["color","borderColor","backgroundColor"];function applyAnimationsDefaults(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:e=>"onProgress"!==e&&"onComplete"!==e&&"fn"!==e}),e.set("animations",{colors:{type:"color",properties:colors},numbers:{type:"number",properties:numbers}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:e=>0|e}}}})}function applyLayoutsDefaults(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const intlCache=new Map;function getNumberFormat(e,t){t=t||{};const n=e+JSON.stringify(t);let o=intlCache.get(n);return o||(o=new Intl.NumberFormat(e,t),intlCache.set(n,o)),o}function formatNumber(e,t,n){return getNumberFormat(t,n).format(e)}const formatters={values:e=>isArray(e)?e:""+e,numeric(e,t,n){if(0===e)return"0";const o=this.chart.options.locale;let r,i=e;if(n.length>1){const t=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(t<1e-4||t>1e15)&&(r="scientific"),i=calculateDelta(e,n)}const a=log10(Math.abs(i)),s=isNaN(a)?1:Math.max(Math.min(-1*Math.floor(a),20),0),l={notation:r,minimumFractionDigits:s,maximumFractionDigits:s};return Object.assign(l,this.options.ticks.format),formatNumber(e,o,l)},logarithmic(e,t,n){if(0===e)return"0";const o=n[t].significand||e/Math.pow(10,Math.floor(log10(e)));return[1,2,3,5,10,15].includes(o)||t>.8*n.length?formatters.numeric.call(this,e,t,n):""}};function calculateDelta(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var Ticks={formatters};function applyScaleDefaults(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(e,t)=>t.lineWidth,tickColor:(e,t)=>t.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Ticks.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:e=>!e.startsWith("before")&&!e.startsWith("after")&&"callback"!==e&&"parser"!==e,_indexable:e=>"borderDash"!==e&&"tickBorderDash"!==e&&"dash"!==e}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:e=>"backdropPadding"!==e&&"callback"!==e,_indexable:e=>"backdropPadding"!==e})}const overrides=Object.create(null),descriptors=Object.create(null);function getScope$1(e,t){if(!t)return e;const n=t.split(".");for(let t=0,o=n.length;t<o;++t){const o=n[t];e=e[o]||(e[o]=Object.create(null))}return e}function set(e,t,n){return"string"==typeof t?merge(getScope$1(e,t),n):merge(getScope$1(e,""),t)}class Defaults{constructor(e,t){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=e=>e.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(e,t)=>getHoverColor(t.backgroundColor),this.hoverBorderColor=(e,t)=>getHoverColor(t.borderColor),this.hoverColor=(e,t)=>getHoverColor(t.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(e),this.apply(t)}set(e,t){return set(this,e,t)}get(e){return getScope$1(this,e)}describe(e,t){return set(descriptors,e,t)}override(e,t){return set(overrides,e,t)}route(e,t,n,o){const r=getScope$1(this,e),i=getScope$1(this,n),a="_"+t;Object.defineProperties(r,{[a]:{value:r[t],writable:!0},[t]:{enumerable:!0,get(){const e=this[a],t=i[o];return isObject(e)?Object.assign({},t,e):valueOrDefault(e,t)},set(e){this[a]=e}}})}apply(e){e.forEach((e=>e(this)))}}var defaults=new Defaults({_scriptable:e=>!e.startsWith("on"),_indexable:e=>"events"!==e,hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[applyAnimationsDefaults,applyLayoutsDefaults,applyScaleDefaults]);function toFontString(e){return!e||isNullOrUndef(e.size)||isNullOrUndef(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function _measureText(e,t,n,o,r){let i=t[r];return i||(i=t[r]=e.measureText(r).width,n.push(r)),i>o&&(o=i),o}function _longestText(e,t,n,o){let r=(o=o||{}).data=o.data||{},i=o.garbageCollect=o.garbageCollect||[];o.font!==t&&(r=o.data={},i=o.garbageCollect=[],o.font=t),e.save(),e.font=t;let a=0;const s=n.length;let l,c,u,d,f;for(l=0;l<s;l++)if(d=n[l],null==d||isArray(d)){if(isArray(d))for(c=0,u=d.length;c<u;c++)f=d[c],null==f||isArray(f)||(a=_measureText(e,r,i,a,f))}else a=_measureText(e,r,i,a,d);e.restore();const h=i.length/2;if(h>n.length){for(l=0;l<h;l++)delete r[i[l]];i.splice(0,h)}return a}function _alignPixel(e,t,n){const o=e.currentDevicePixelRatio,r=0!==n?Math.max(n/2,.5):0;return Math.round((t-r)*o)/o+r}function clearCanvas(e,t){(t=t||e.getContext("2d")).save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore()}function drawPoint(e,t,n,o){drawPointLegend(e,t,n,o,null)}function drawPointLegend(e,t,n,o,r){let i,a,s,l,c,u,d,f;const h=t.pointStyle,p=t.rotation,g=t.radius;let y=(p||0)*RAD_PER_DEG;if(h&&"object"==typeof h&&(i=h.toString(),"[object HTMLImageElement]"===i||"[object HTMLCanvasElement]"===i))return e.save(),e.translate(n,o),e.rotate(y),e.drawImage(h,-h.width/2,-h.height/2,h.width,h.height),void e.restore();if(!(isNaN(g)||g<=0)){switch(e.beginPath(),h){default:r?e.ellipse(n,o,r/2,g,0,0,TAU):e.arc(n,o,g,0,TAU),e.closePath();break;case"triangle":u=r?r/2:g,e.moveTo(n+Math.sin(y)*u,o-Math.cos(y)*g),y+=TWO_THIRDS_PI,e.lineTo(n+Math.sin(y)*u,o-Math.cos(y)*g),y+=TWO_THIRDS_PI,e.lineTo(n+Math.sin(y)*u,o-Math.cos(y)*g),e.closePath();break;case"rectRounded":c=.516*g,l=g-c,a=Math.cos(y+QUARTER_PI)*l,d=Math.cos(y+QUARTER_PI)*(r?r/2-c:l),s=Math.sin(y+QUARTER_PI)*l,f=Math.sin(y+QUARTER_PI)*(r?r/2-c:l),e.arc(n-d,o-s,c,y-PI,y-HALF_PI),e.arc(n+f,o-a,c,y-HALF_PI,y),e.arc(n+d,o+s,c,y,y+HALF_PI),e.arc(n-f,o+a,c,y+HALF_PI,y+PI),e.closePath();break;case"rect":if(!p){l=Math.SQRT1_2*g,u=r?r/2:l,e.rect(n-u,o-l,2*u,2*l);break}y+=QUARTER_PI;case"rectRot":d=Math.cos(y)*(r?r/2:g),a=Math.cos(y)*g,s=Math.sin(y)*g,f=Math.sin(y)*(r?r/2:g),e.moveTo(n-d,o-s),e.lineTo(n+f,o-a),e.lineTo(n+d,o+s),e.lineTo(n-f,o+a),e.closePath();break;case"crossRot":y+=QUARTER_PI;case"cross":d=Math.cos(y)*(r?r/2:g),a=Math.cos(y)*g,s=Math.sin(y)*g,f=Math.sin(y)*(r?r/2:g),e.moveTo(n-d,o-s),e.lineTo(n+d,o+s),e.moveTo(n+f,o-a),e.lineTo(n-f,o+a);break;case"star":d=Math.cos(y)*(r?r/2:g),a=Math.cos(y)*g,s=Math.sin(y)*g,f=Math.sin(y)*(r?r/2:g),e.moveTo(n-d,o-s),e.lineTo(n+d,o+s),e.moveTo(n+f,o-a),e.lineTo(n-f,o+a),y+=QUARTER_PI,d=Math.cos(y)*(r?r/2:g),a=Math.cos(y)*g,s=Math.sin(y)*g,f=Math.sin(y)*(r?r/2:g),e.moveTo(n-d,o-s),e.lineTo(n+d,o+s),e.moveTo(n+f,o-a),e.lineTo(n-f,o+a);break;case"line":a=r?r/2:Math.cos(y)*g,s=Math.sin(y)*g,e.moveTo(n-a,o-s),e.lineTo(n+a,o+s);break;case"dash":e.moveTo(n,o),e.lineTo(n+Math.cos(y)*(r?r/2:g),o+Math.sin(y)*g);break;case!1:e.closePath()}e.fill(),t.borderWidth>0&&e.stroke()}}function _isPointInArea(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function clipArea(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function unclipArea(e){e.restore()}function _steppedLineTo(e,t,n,o,r){if(!t)return e.lineTo(n.x,n.y);if("middle"===r){const o=(t.x+n.x)/2;e.lineTo(o,t.y),e.lineTo(o,n.y)}else"after"===r!=!!o?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function _bezierCurveTo(e,t,n,o){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(o?t.cp1x:t.cp2x,o?t.cp1y:t.cp2y,o?n.cp2x:n.cp1x,o?n.cp2y:n.cp1y,n.x,n.y)}function setRenderOpts(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),isNullOrUndef(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function decorateText(e,t,n,o,r){if(r.strikethrough||r.underline){const i=e.measureText(o),a=t-i.actualBoundingBoxLeft,s=t+i.actualBoundingBoxRight,l=n-i.actualBoundingBoxAscent,c=n+i.actualBoundingBoxDescent,u=r.strikethrough?(l+c)/2:c;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=r.decorationWidth||2,e.moveTo(a,u),e.lineTo(s,u),e.stroke()}}function drawBackdrop(e,t){const n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function renderText(e,t,n,o,r,i={}){const a=isArray(t)?t:[t],s=i.strokeWidth>0&&""!==i.strokeColor;let l,c;for(e.save(),e.font=r.string,setRenderOpts(e,i),l=0;l<a.length;++l)c=a[l],i.backdrop&&drawBackdrop(e,i.backdrop),s&&(i.strokeColor&&(e.strokeStyle=i.strokeColor),isNullOrUndef(i.strokeWidth)||(e.lineWidth=i.strokeWidth),e.strokeText(c,n,o,i.maxWidth)),e.fillText(c,n,o,i.maxWidth),decorateText(e,n,o,c,i),o+=Number(r.lineHeight);e.restore()}function addRoundedRectPath(e,t){const{x:n,y:o,w:r,h:i,radius:a}=t;e.arc(n+a.topLeft,o+a.topLeft,a.topLeft,-HALF_PI,PI,!0),e.lineTo(n,o+i-a.bottomLeft),e.arc(n+a.bottomLeft,o+i-a.bottomLeft,a.bottomLeft,PI,HALF_PI,!0),e.lineTo(n+r-a.bottomRight,o+i),e.arc(n+r-a.bottomRight,o+i-a.bottomRight,a.bottomRight,HALF_PI,0,!0),e.lineTo(n+r,o+a.topRight),e.arc(n+r-a.topRight,o+a.topRight,a.topRight,0,-HALF_PI,!0),e.lineTo(n+a.topLeft,o)}const LINE_HEIGHT=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,FONT_STYLE=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function toLineHeight(e,t){const n=(""+e).match(LINE_HEIGHT);if(!n||"normal"===n[1])return 1.2*t;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100}return t*e}const numberOrZero=e=>+e||0;function _readValueToProps(e,t){const n={},o=isObject(t),r=o?Object.keys(t):t,i=isObject(e)?o?n=>valueOrDefault(e[n],e[t[n]]):t=>e[t]:()=>e;for(const e of r)n[e]=numberOrZero(i(e));return n}function toTRBL(e){return _readValueToProps(e,{top:"y",right:"x",bottom:"y",left:"x"})}function toTRBLCorners(e){return _readValueToProps(e,["topLeft","topRight","bottomLeft","bottomRight"])}function toPadding(e){const t=toTRBL(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function toFont(e,t){e=e||{},t=t||defaults.font;let n=valueOrDefault(e.size,t.size);"string"==typeof n&&(n=parseInt(n,10));let o=valueOrDefault(e.style,t.style);o&&!(""+o).match(FONT_STYLE)&&(console.warn('Invalid font style specified: "'+o+'"'),o=void 0);const r={family:valueOrDefault(e.family,t.family),lineHeight:toLineHeight(valueOrDefault(e.lineHeight,t.lineHeight),n),size:n,style:o,weight:valueOrDefault(e.weight,t.weight),string:""};return r.string=toFontString(r),r}function resolve(e,t,n,o){let r,i,a,s=!0;for(r=0,i=e.length;r<i;++r)if(a=e[r],void 0!==a&&(void 0!==t&&"function"==typeof a&&(a=a(t),s=!1),void 0!==n&&isArray(a)&&(a=a[n%a.length],s=!1),void 0!==a))return o&&!s&&(o.cacheable=!1),a}function _addGrace(e,t,n){const{min:o,max:r}=e,i=toDimension(t,(r-o)/2),a=(e,t)=>n&&0===e?0:e+t;return{min:a(o,-Math.abs(i)),max:a(r,i)}}function createContext(e,t){return Object.assign(Object.create(e),t)}function _createResolver(e,t=[""],n,o,r=(()=>e[0])){const i=n||e;void 0===o&&(o=_resolve("_fallback",e));const a={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:i,_fallback:o,_getTarget:r,override:n=>_createResolver([n,...e],t,i,o)};return new Proxy(a,{deleteProperty:(t,n)=>(delete t[n],delete t._keys,delete e[0][n],!0),get:(n,o)=>_cached(n,o,(()=>_resolveWithPrefixes(o,t,e,n))),getOwnPropertyDescriptor:(e,t)=>Reflect.getOwnPropertyDescriptor(e._scopes[0],t),getPrototypeOf:()=>Reflect.getPrototypeOf(e[0]),has:(e,t)=>getKeysFromAllScopes(e).includes(t),ownKeys:e=>getKeysFromAllScopes(e),set(e,t,n){const o=e._storage||(e._storage=r());return e[t]=o[t]=n,delete e._keys,!0}})}function _attachContext(e,t,n,o){const r={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:_descriptors(e,o),setContext:t=>_attachContext(e,t,n,o),override:r=>_attachContext(e.override(r),t,n,o)};return new Proxy(r,{deleteProperty:(t,n)=>(delete t[n],delete e[n],!0),get:(e,t,n)=>_cached(e,t,(()=>_resolveWithContext(e,t,n))),getOwnPropertyDescriptor:(t,n)=>t._descriptors.allKeys?Reflect.has(e,n)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,n),getPrototypeOf:()=>Reflect.getPrototypeOf(e),has:(t,n)=>Reflect.has(e,n),ownKeys:()=>Reflect.ownKeys(e),set:(t,n,o)=>(e[n]=o,delete t[n],!0)})}function _descriptors(e,t={scriptable:!0,indexable:!0}){const{_scriptable:n=t.scriptable,_indexable:o=t.indexable,_allKeys:r=t.allKeys}=e;return{allKeys:r,scriptable:n,indexable:o,isScriptable:isFunction(n)?n:()=>n,isIndexable:isFunction(o)?o:()=>o}}const readKey=(e,t)=>e?e+_capitalize(t):t,needsSubResolver=(e,t)=>isObject(t)&&"adapters"!==e&&(null===Object.getPrototypeOf(t)||t.constructor===Object);function _cached(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t))return e[t];const o=n();return e[t]=o,o}function _resolveWithContext(e,t,n){const{_proxy:o,_context:r,_subProxy:i,_descriptors:a}=e;let s=o[t];return isFunction(s)&&a.isScriptable(t)&&(s=_resolveScriptable(t,s,e,n)),isArray(s)&&s.length&&(s=_resolveArray(t,s,e,a.isIndexable)),needsSubResolver(t,s)&&(s=_attachContext(s,r,i&&i[t],a)),s}function _resolveScriptable(e,t,n,o){const{_proxy:r,_context:i,_subProxy:a,_stack:s}=n;if(s.has(e))throw new Error("Recursion detected: "+Array.from(s).join("->")+"->"+e);s.add(e);let l=t(i,a||o);return s.delete(e),needsSubResolver(e,l)&&(l=createSubResolver(r._scopes,r,e,l)),l}function _resolveArray(e,t,n,o){const{_proxy:r,_context:i,_subProxy:a,_descriptors:s}=n;if(void 0!==i.index&&o(e))return t[i.index%t.length];if(isObject(t[0])){const n=t,o=r._scopes.filter((e=>e!==n));t=[];for(const l of n){const n=createSubResolver(o,r,e,l);t.push(_attachContext(n,i,a&&a[e],s))}}return t}function resolveFallback(e,t,n){return isFunction(e)?e(t,n):e}const getScope=(e,t)=>!0===e?t:"string"==typeof e?resolveObjectKey(t,e):void 0;function addScopes(e,t,n,o,r){for(const i of t){const t=getScope(n,i);if(t){e.add(t);const i=resolveFallback(t._fallback,n,r);if(void 0!==i&&i!==n&&i!==o)return i}else if(!1===t&&void 0!==o&&n!==o)return null}return!1}function createSubResolver(e,t,n,o){const r=t._rootScopes,i=resolveFallback(t._fallback,n,o),a=[...e,...r],s=new Set;s.add(o);let l=addScopesFromKey(s,a,n,i||n,o);return null!==l&&((void 0===i||i===n||(l=addScopesFromKey(s,a,i,l,o),null!==l))&&_createResolver(Array.from(s),[""],r,i,(()=>subGetTarget(t,n,o))))}function addScopesFromKey(e,t,n,o,r){for(;n;)n=addScopes(e,t,n,o,r);return n}function subGetTarget(e,t,n){const o=e._getTarget();t in o||(o[t]={});const r=o[t];return isArray(r)&&isObject(n)?n:r||{}}function _resolveWithPrefixes(e,t,n,o){let r;for(const i of t)if(r=_resolve(readKey(i,e),n),void 0!==r)return needsSubResolver(e,r)?createSubResolver(n,o,e,r):r}function _resolve(e,t){for(const n of t){if(!n)continue;const t=n[e];if(void 0!==t)return t}}function getKeysFromAllScopes(e){let t=e._keys;return t||(t=e._keys=resolveKeysFromAllScopes(e._scopes)),t}function resolveKeysFromAllScopes(e){const t=new Set;for(const n of e)for(const e of Object.keys(n).filter((e=>!e.startsWith("_"))))t.add(e);return Array.from(t)}function _parseObjectDataRadialScale(e,t,n,o){const{iScale:r}=e,{key:i="r"}=this._parsing,a=new Array(o);let s,l,c,u;for(s=0,l=o;s<l;++s)c=s+n,u=t[c],a[s]={r:r.parse(resolveObjectKey(u,i),c)};return a}const EPSILON=Number.EPSILON||1e-14,getPoint=(e,t)=>t<e.length&&!e[t].skip&&e[t],getValueAxis=e=>"x"===e?"y":"x";function splineCurve(e,t,n,o){const r=e.skip?t:e,i=t,a=n.skip?t:n,s=distanceBetweenPoints(i,r),l=distanceBetweenPoints(a,i);let c=s/(s+l),u=l/(s+l);c=isNaN(c)?0:c,u=isNaN(u)?0:u;const d=o*c,f=o*u;return{previous:{x:i.x-d*(a.x-r.x),y:i.y-d*(a.y-r.y)},next:{x:i.x+f*(a.x-r.x),y:i.y+f*(a.y-r.y)}}}function monotoneAdjust(e,t,n){const o=e.length;let r,i,a,s,l,c=getPoint(e,0);for(let u=0;u<o-1;++u)l=c,c=getPoint(e,u+1),l&&c&&(almostEquals(t[u],0,EPSILON)?n[u]=n[u+1]=0:(r=n[u]/t[u],i=n[u+1]/t[u],s=Math.pow(r,2)+Math.pow(i,2),s<=9||(a=3/Math.sqrt(s),n[u]=r*a*t[u],n[u+1]=i*a*t[u])))}function monotoneCompute(e,t,n="x"){const o=getValueAxis(n),r=e.length;let i,a,s,l=getPoint(e,0);for(let c=0;c<r;++c){if(a=s,s=l,l=getPoint(e,c+1),!s)continue;const r=s[n],u=s[o];a&&(i=(r-a[n])/3,s[`cp1${n}`]=r-i,s[`cp1${o}`]=u-i*t[c]),l&&(i=(l[n]-r)/3,s[`cp2${n}`]=r+i,s[`cp2${o}`]=u+i*t[c])}}function splineCurveMonotone(e,t="x"){const n=getValueAxis(t),o=e.length,r=Array(o).fill(0),i=Array(o);let a,s,l,c=getPoint(e,0);for(a=0;a<o;++a)if(s=l,l=c,c=getPoint(e,a+1),l){if(c){const e=c[t]-l[t];r[a]=0!==e?(c[n]-l[n])/e:0}i[a]=s?c?sign(r[a-1])!==sign(r[a])?0:(r[a-1]+r[a])/2:r[a-1]:r[a]}monotoneAdjust(e,r,i),monotoneCompute(e,i,t)}function capControlPoint(e,t,n){return Math.max(Math.min(e,n),t)}function capBezierPoints(e,t){let n,o,r,i,a,s=_isPointInArea(e[0],t);for(n=0,o=e.length;n<o;++n)a=i,i=s,s=n<o-1&&_isPointInArea(e[n+1],t),i&&(r=e[n],a&&(r.cp1x=capControlPoint(r.cp1x,t.left,t.right),r.cp1y=capControlPoint(r.cp1y,t.top,t.bottom)),s&&(r.cp2x=capControlPoint(r.cp2x,t.left,t.right),r.cp2y=capControlPoint(r.cp2y,t.top,t.bottom)))}function _updateBezierControlPoints(e,t,n,o,r){let i,a,s,l;if(t.spanGaps&&(e=e.filter((e=>!e.skip))),"monotone"===t.cubicInterpolationMode)splineCurveMonotone(e,r);else{let n=o?e[e.length-1]:e[0];for(i=0,a=e.length;i<a;++i)s=e[i],l=splineCurve(n,s,e[Math.min(i+1,a-(o?0:1))%a],t.tension),s.cp1x=l.previous.x,s.cp1y=l.previous.y,s.cp2x=l.next.x,s.cp2y=l.next.y,n=s}t.capBezierPoints&&capBezierPoints(e,n)}function _isDomSupported(){return"undefined"!=typeof window&&"undefined"!=typeof document}function _getParentNode(e){let t=e.parentNode;return t&&"[object ShadowRoot]"===t.toString()&&(t=t.host),t}function parseMaxStyle(e,t,n){let o;return"string"==typeof e?(o=parseInt(e,10),-1!==e.indexOf("%")&&(o=o/100*t.parentNode[n])):o=e,o}const getComputedStyle=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function getStyle(e,t){return getComputedStyle(e).getPropertyValue(t)}const positions=["top","right","bottom","left"];function getPositionedStyle(e,t,n){const o={};n=n?"-"+n:"";for(let r=0;r<4;r++){const i=positions[r];o[i]=parseFloat(e[t+"-"+i+n])||0}return o.width=o.left+o.right,o.height=o.top+o.bottom,o}const useOffsetPos=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function getCanvasPosition(e,t){const n=e.touches,o=n&&n.length?n[0]:e,{offsetX:r,offsetY:i}=o;let a,s,l=!1;if(useOffsetPos(r,i,e.target))a=r,s=i;else{const e=t.getBoundingClientRect();a=o.clientX-e.left,s=o.clientY-e.top,l=!0}return{x:a,y:s,box:l}}function getRelativePosition(e,t){if("native"in e)return e;const{canvas:n,currentDevicePixelRatio:o}=t,r=getComputedStyle(n),i="border-box"===r.boxSizing,a=getPositionedStyle(r,"padding"),s=getPositionedStyle(r,"border","width"),{x:l,y:c,box:u}=getCanvasPosition(e,n),d=a.left+(u&&s.left),f=a.top+(u&&s.top);let{width:h,height:p}=t;return i&&(h-=a.width+s.width,p-=a.height+s.height),{x:Math.round((l-d)/h*n.width/o),y:Math.round((c-f)/p*n.height/o)}}function getContainerSize(e,t,n){let o,r;if(void 0===t||void 0===n){const i=_getParentNode(e);if(i){const e=i.getBoundingClientRect(),a=getComputedStyle(i),s=getPositionedStyle(a,"border","width"),l=getPositionedStyle(a,"padding");t=e.width-l.width-s.width,n=e.height-l.height-s.height,o=parseMaxStyle(a.maxWidth,i,"clientWidth"),r=parseMaxStyle(a.maxHeight,i,"clientHeight")}else t=e.clientWidth,n=e.clientHeight}return{width:t,height:n,maxWidth:o||INFINITY,maxHeight:r||INFINITY}}const round1=e=>Math.round(10*e)/10;function getMaximumSize(e,t,n,o){const r=getComputedStyle(e),i=getPositionedStyle(r,"margin"),a=parseMaxStyle(r.maxWidth,e,"clientWidth")||INFINITY,s=parseMaxStyle(r.maxHeight,e,"clientHeight")||INFINITY,l=getContainerSize(e,t,n);let{width:c,height:u}=l;if("content-box"===r.boxSizing){const e=getPositionedStyle(r,"border","width"),t=getPositionedStyle(r,"padding");c-=t.width+e.width,u-=t.height+e.height}c=Math.max(0,c-i.width),u=Math.max(0,o?c/o:u-i.height),c=round1(Math.min(c,a,l.maxWidth)),u=round1(Math.min(u,s,l.maxHeight)),c&&!u&&(u=round1(c/2));return(void 0!==t||void 0!==n)&&o&&l.height&&u>l.height&&(u=l.height,c=round1(Math.floor(u*o))),{width:c,height:u}}function retinaScale(e,t,n){const o=t||1,r=Math.floor(e.height*o),i=Math.floor(e.width*o);e.height=Math.floor(e.height),e.width=Math.floor(e.width);const a=e.canvas;return a.style&&(n||!a.style.height&&!a.style.width)&&(a.style.height=`${e.height}px`,a.style.width=`${e.width}px`),(e.currentDevicePixelRatio!==o||a.height!==r||a.width!==i)&&(e.currentDevicePixelRatio=o,a.height=r,a.width=i,e.ctx.setTransform(o,0,0,o,0,0),!0)}const supportsEventListenerOptions=function(){let e=!1;try{const t={get passive(){return e=!0,!1}};window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(e){}return e}();function readUsedSize(e,t){const n=getStyle(e,t),o=n&&n.match(/^(\d+)(\.\d+)?px$/);return o?+o[1]:void 0}function _pointInLine(e,t,n,o){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function _steppedInterpolation(e,t,n,o){return{x:e.x+n*(t.x-e.x),y:"middle"===o?n<.5?e.y:t.y:"after"===o?n<1?e.y:t.y:n>0?t.y:e.y}}function _bezierInterpolation(e,t,n,o){const r={x:e.cp2x,y:e.cp2y},i={x:t.cp1x,y:t.cp1y},a=_pointInLine(e,r,n),s=_pointInLine(r,i,n),l=_pointInLine(i,t,n),c=_pointInLine(a,s,n),u=_pointInLine(s,l,n);return _pointInLine(c,u,n)}const getRightToLeftAdapter=function(e,t){return{x:n=>e+e+t-n,setWidth(e){t=e},textAlign:e=>"center"===e?e:"right"===e?"left":"right",xPlus:(e,t)=>e-t,leftForLtr:(e,t)=>e-t}},getLeftToRightAdapter=function(){return{x:e=>e,setWidth(e){},textAlign:e=>e,xPlus:(e,t)=>e+t,leftForLtr:(e,t)=>e}};function getRtlAdapter(e,t,n){return e?getRightToLeftAdapter(t,n):{x:e=>e,setWidth(e){},textAlign:e=>e,xPlus:(e,t)=>e+t,leftForLtr:(e,t)=>e}}function overrideTextDirection(e,t){let n,o;"ltr"!==t&&"rtl"!==t||(n=e.canvas.style,o=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=o)}function restoreTextDirection(e,t){void 0!==t&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function propertyFn(e){return"angle"===e?{between:_angleBetween,compare:_angleDiff,normalize:_normalizeAngle}:{between:_isBetween,compare:(e,t)=>e-t,normalize:e=>e}}function normalizeSegment({start:e,end:t,count:n,loop:o,style:r}){return{start:e%n,end:t%n,loop:o&&(t-e+1)%n==0,style:r}}function getSegment(e,t,n){const{property:o,start:r,end:i}=n,{between:a,normalize:s}=propertyFn(o),l=t.length;let c,u,{start:d,end:f,loop:h}=e;if(h){for(d+=l,f+=l,c=0,u=l;c<u&&a(s(t[d%l][o]),r,i);++c)d--,f--;d%=l,f%=l}return f<d&&(f+=l),{start:d,end:f,loop:h,style:e.style}}function _boundSegment(e,t,n){if(!n)return[e];const{property:o,start:r,end:i}=n,a=t.length,{compare:s,between:l,normalize:c}=propertyFn(o),{start:u,end:d,loop:f,style:h}=getSegment(e,t,n),p=[];let g,y,m,b=!1,_=null;const x=()=>b||l(r,m,g)&&0!==s(r,m),v=()=>!b||0===s(i,g)||l(i,m,g);for(let e=u,n=u;e<=d;++e)y=t[e%a],y.skip||(g=c(y[o]),g!==m&&(b=l(g,r,i),null===_&&x()&&(_=0===s(g,r)?e:n),null!==_&&v()&&(p.push(normalizeSegment({start:_,end:e,loop:f,count:a,style:h})),_=null),n=e,m=g));return null!==_&&p.push(normalizeSegment({start:_,end:d,loop:f,count:a,style:h})),p}function _boundSegments(e,t){const n=[],o=e.segments;for(let r=0;r<o.length;r++){const i=_boundSegment(o[r],e.points,t);i.length&&n.push(...i)}return n}function findStartAndEnd(e,t,n,o){let r=0,i=t-1;if(n&&!o)for(;r<t&&!e[r].skip;)r++;for(;r<t&&e[r].skip;)r++;for(r%=t,n&&(i+=r);i>r&&e[i%t].skip;)i--;return i%=t,{start:r,end:i}}function solidSegments(e,t,n,o){const r=e.length,i=[];let a,s=t,l=e[t];for(a=t+1;a<=n;++a){const n=e[a%r];n.skip||n.stop?l.skip||(o=!1,i.push({start:t%r,end:(a-1)%r,loop:o}),t=s=n.stop?a:null):(s=a,l.skip&&(t=a)),l=n}return null!==s&&i.push({start:t%r,end:s%r,loop:o}),i}function _computeSegments(e,t){const n=e.points,o=e.options.spanGaps,r=n.length;if(!r)return[];const i=!!e._loop,{start:a,end:s}=findStartAndEnd(n,r,i,o);if(!0===o)return splitByStyles(e,[{start:a,end:s,loop:i}],n,t);return splitByStyles(e,solidSegments(n,a,s<a?s+r:s,!!e._fullLoop&&0===a&&s===r-1),n,t)}function splitByStyles(e,t,n,o){return o&&o.setContext&&n?doSplitByStyles(e,t,n,o):t}function doSplitByStyles(e,t,n,o){const r=e._chart.getContext(),i=readStyle(e.options),{_datasetIndex:a,options:{spanGaps:s}}=e,l=n.length,c=[];let u=i,d=t[0].start,f=d;function h(e,t,o,r){const i=s?-1:1;if(e!==t){for(e+=l;n[e%l].skip;)e-=i;for(;n[t%l].skip;)t+=i;e%l!=t%l&&(c.push({start:e%l,end:t%l,loop:o,style:r}),u=r,d=t%l)}}for(const e of t){d=s?d:e.start;let t,i=n[d%l];for(f=d+1;f<=e.end;f++){const s=n[f%l];t=readStyle(o.setContext(createContext(r,{type:"segment",p0:i,p1:s,p0DataIndex:(f-1)%l,p1DataIndex:f%l,datasetIndex:a}))),styleChanged(t,u)&&h(d,f-1,e.loop,u),i=s,u=t}d<f-1&&h(d,f-1,e.loop,u)}return c}function readStyle(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function styleChanged(e,t){if(!t)return!1;const n=[],o=function(e,t){return isPatternOrGradient(t)?(n.includes(t)||n.push(t),n.indexOf(t)):t};return JSON.stringify(e,o)!==JSON.stringify(t,o)}export{unclipArea as $,_rlookupByKey as A,_lookupByKey as B,_isPointInArea as C,getAngleFromPoint as D,toPadding as E,each as F,getMaximumSize as G,HALF_PI as H,_getParentNode as I,readUsedSize as J,supportsEventListenerOptions as K,throttled as L,_isDomSupported as M,_factorize as N,finiteOrDefault as O,PI as P,callback as Q,_addGrace as R,_limitValue as S,TAU as T,toDegrees as U,_measureText as V,_int16Range as W,_alignPixel as X,clipArea as Y,renderText as Z,_arrayUnique as _,resolve as a,fontString as a$,toFont as a0,_toLeftRightCenter as a1,_alignStartEnd as a2,overrides as a3,merge as a4,_capitalize as a5,descriptors as a6,isFunction as a7,_attachContext as a8,_createResolver as a9,overrideTextDirection as aA,_textX as aB,restoreTextDirection as aC,drawPointLegend as aD,distanceBetweenPoints as aE,noop as aF,_setMinAndMaxByKey as aG,niceNum as aH,almostWhole as aI,almostEquals as aJ,_decimalPlaces as aK,Ticks as aL,log10 as aM,_longestText as aN,_filterBetween as aO,_lookup as aP,isPatternOrGradient as aQ,getHoverColor as aR,clone as aS,_merger as aT,_mergerIf as aU,_deprecated as aV,_splitKey as aW,toFontString as aX,splineCurve as aY,splineCurveMonotone as aZ,getStyle as a_,_descriptors as aa,mergeIf as ab,uid as ac,debounce as ad,retinaScale as ae,clearCanvas as af,setsEqual as ag,_elementsEqual as ah,_isClickEvent as ai,_isBetween as aj,_readValueToProps as ak,_updateBezierControlPoints as al,_computeSegments as am,_boundSegments as an,_steppedInterpolation as ao,_bezierInterpolation as ap,_pointInLine as aq,_steppedLineTo as ar,_bezierCurveTo as as,drawPoint as at,addRoundedRectPath as au,toTRBL as av,toTRBLCorners as aw,_boundSegment as ax,_normalizeAngle as ay,getRtlAdapter as az,isArray as b,toLineHeight as b0,PITAU as b1,INFINITY as b2,RAD_PER_DEG as b3,QUARTER_PI as b4,TWO_THIRDS_PI as b5,_angleDiff as b6,color as c,defaults as d,effects as e,resolveObjectKey as f,isNumberFinite as g,defined as h,isObject as i,createContext as j,isNullOrUndef as k,listenArrayEvents as l,toPercentage as m,toDimension as n,formatNumber as o,_angleBetween as p,_getStartAndCountOfVisiblePoints as q,requestAnimFrame as r,sign as s,toRadians as t,unlistenArrayEvents as u,valueOrDefault as v,_scaleRangesChanged as w,isNumber as x,_parseObjectDataRadialScale as y,getRelativePosition as z};