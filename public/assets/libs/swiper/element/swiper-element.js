import Swiper from"swiper";import{paramsList}from"../components-shared/params-list.js";import{getParams}from"./get-params.js";import{needsScrollbar,needsNavigation,needsPagination,attrToProp}from"../components-shared/utils.js";import{updateSwiper}from"../components-shared/update-swiper.js";const SwiperFontCSS="@font-face{font-family:swiper-icons;src:url('data:application/font-woff;charset=utf-8;base64, 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');font-weight:400;font-style:normal}",SwiperCSS=":root{--swiper-theme-color:#007aff}.swiper,swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1;display:block}:host(.swiper-vertical)>.swiper-wrapper{flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:flex;transition-property:transform;transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial);box-sizing:content-box}.swiper-android swiper-slide,.swiper-wrapper{transform:translate3d(0px,0,0)}.swiper-horizontal{touch-action:pan-y}.swiper-vertical{touch-action:pan-x}swiper-slide{flex-shrink:0;width:100%;height:100%;position:relative;transition-property:transform;display:block}.swiper-slide-invisible-blank{visibility:hidden}.swiper-autoheight,.swiper-autoheight swiper-slide{height:auto}:host(.swiper-autoheight) .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-backface-hidden swiper-slide{transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden}:host(.swiper-3d.swiper-css-mode) .swiper-wrapper{perspective:1200px}:host(.swiper-3d) .swiper-wrapper{transform-style:preserve-3d}.swiper-3d{perspective:1200px}.swiper-3d .swiper-cube-shadow,.swiper-3d .swiper-slide-shadow,.swiper-3d .swiper-slide-shadow-bottom,.swiper-3d .swiper-slide-shadow-left,.swiper-3d .swiper-slide-shadow-right,.swiper-3d .swiper-slide-shadow-top,.swiper-3d swiper-slide{transform-style:preserve-3d}.swiper-3d .swiper-slide-shadow,.swiper-3d .swiper-slide-shadow-bottom,.swiper-3d .swiper-slide-shadow-left,.swiper-3d .swiper-slide-shadow-right,.swiper-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-3d .swiper-slide-shadow{background:rgba(0,0,0,.15)}.swiper-3d .swiper-slide-shadow-left{background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-3d .swiper-slide-shadow-right{background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-3d .swiper-slide-shadow-top{background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-3d .swiper-slide-shadow-bottom{background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}:host(.swiper-css-mode)>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}:host(.swiper-css-mode)>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-css-mode>swiper-slide{scroll-snap-align:start start}:host(.swiper-horizontal.swiper-css-mode)>.swiper-wrapper{scroll-snap-type:x mandatory}:host(.swiper-vertical.swiper-css-mode)>.swiper-wrapper{scroll-snap-type:y mandatory}:host(.swiper-centered)>.swiper-wrapper::before{content:'';flex-shrink:0;order:9999}.swiper-centered>swiper-slide{scroll-snap-align:center center;scroll-snap-stop:always}.swiper-centered.swiper-horizontal>swiper-slide:first-child{margin-inline-start:var(--swiper-centered-offset-before)}:host(.swiper-centered.swiper-horizontal)>.swiper-wrapper::before{height:100%;min-height:1px;width:var(--swiper-centered-offset-after)}.swiper-centered.swiper-vertical>swiper-slide:first-child{margin-block-start:var(--swiper-centered-offset-before)}:host(.swiper-centered.swiper-vertical)>.swiper-wrapper::before{width:100%;min-width:1px;height:var(--swiper-centered-offset-after)}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;transform-origin:50%;box-sizing:border-box;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}.swiper-watch-progress .swiper-slide-visible .swiper-lazy-preloader,.swiper:not(.swiper-watch-progress) .swiper-lazy-preloader,swiper-container:not(.swiper-watch-progress) .swiper-lazy-preloader{animation:swiper-preloader-spin 1s infinite linear}.swiper-lazy-preloader-white{--swiper-preloader-color:#fff}.swiper-lazy-preloader-black{--swiper-preloader-color:#000}@keyframes swiper-preloader-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";let globalInjectStyles=!0;const addGlobalStyles=(e,s)=>{let i=document.querySelector("style#swiper-element-styles");const r=i&&i.preInit&&!e;!e&&s&&s.cssLinks().forEach((e=>{const s=document.createElement("link");s.rel="stylesheet",s.href=e,document.head.prepend(s)})),i&&!r||(i=i||document.createElement("style"),i.textContent=[SwiperFontCSS,s?s.cssStyles():""].join("\n"),i.id="swiper-element-styles",i.preInit=e,document.head.prepend(i))};class DummyHTMLElement{}const ClassToExtend="undefined"==typeof window||"undefined"==typeof HTMLElement?DummyHTMLElement:HTMLElement;class SwiperContainer extends ClassToExtend{constructor(){super(),this.tempDiv=document.createElement("div"),this.shadowEl=this.attachShadow({mode:"open"})}cssStyles(){return[globalInjectStyles?SwiperCSS:"",...this.injectStyles&&Array.isArray(this.injectStyles)?this.injectStyles:[]].join("\n")}cssLinks(){return this.injectStylesUrls||[]}render(){if(this.rendered)return;globalInjectStyles&&addGlobalStyles(!1,this);const e=this.cssStyles();e.length&&(this.stylesEl=document.createElement("style"),this.stylesEl.textContent=e,this.shadowEl.appendChild(this.stylesEl)),this.cssLinks().forEach((e=>{if(this.shadowEl.querySelector(`link[href="${e}"]`))return;const s=document.createElement("link");s.rel="stylesheet",s.href=e,this.shadowEl.appendChild(s)})),this.tempDiv.innerHTML=`\n      <slot name="container-start"></slot>\n      <div class="swiper-wrapper">\n        <slot></slot>\n      </div>\n      <slot name="container-end"></slot>\n      ${needsNavigation(this.passedParams)?'\n        <div part="button-prev" class="swiper-button-prev"></div>\n        <div part="button-next" class="swiper-button-next"></div>\n      ':""}\n      ${needsPagination(this.passedParams)?'\n        <div part="pagination" class="swiper-pagination"></div>\n      ':""}\n      ${needsScrollbar(this.passedParams)?'\n        <div part="scrollbar" class="swiper-scrollbar"></div>\n      ':""}\n    `,[...this.tempDiv.children].forEach((e=>{this.shadowEl.appendChild(e)})),this.rendered=!0}initialize(){if(this.initialized)return;this.initialized=!0;const{params:e,passedParams:s}=getParams(this);this.swiperParams=e,this.passedParams=s,delete this.swiperParams.init,this.render(),this.swiper=new Swiper(this,{...e,touchEventsTarget:"container",...e.virtual?{}:{observer:!0},onAny:(s,...i)=>{const r=e.eventsPrefix?`${e.eventsPrefix}${s.toLowerCase()}`:s.toLowerCase(),t=new CustomEvent(r,{detail:i,bubbles:!0,cancelable:!0});this.dispatchEvent(t)}})}connectedCallback(){this.initialized&&this.nested&&this.closest("swiper-slide")&&this.closest("swiper-slide").swiperLoopMoveDOM||(!1!==this.init&&"false"!==this.getAttribute("init")?this.initialize():addGlobalStyles(!0,this))}disconnectedCallback(){this.nested&&this.closest("swiper-slide")&&this.closest("swiper-slide").swiperLoopMoveDOM||(this.swiper&&this.swiper.destroy&&this.swiper.destroy(),this.initialized=!1)}updateSwiperOnPropChange(e,s){const{params:i,passedParams:r}=getParams(this,e,s);this.passedParams=r,this.swiperParams=i,updateSwiper({swiper:this.swiper,passedParams:this.passedParams,changedParams:[attrToProp(e)],..."navigation"===e&&r[e]?{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"}:{},..."pagination"===e&&r[e]?{paginationEl:".swiper-pagination"}:{},..."scrollbar"===e&&r[e]?{scrollbarEl:".swiper-scrollbar"}:{}})}attributeChangedCallback(e,s,i){this.initialized&&("true"===s&&null===i&&(i=!1),this.updateSwiperOnPropChange(e,i))}static get observedAttributes(){return paramsList.filter((e=>e.includes("_"))).map((e=>e.replace(/[A-Z]/g,(e=>`-${e}`)).replace("_","").toLowerCase()))}}paramsList.forEach((e=>{"init"!==e&&(e=e.replace("_",""),Object.defineProperty(SwiperContainer.prototype,e,{configurable:!0,get(){return(this.passedParams||{})[e]},set(s){this.passedParams||(this.passedParams={}),this.passedParams[e]=s,this.initialized&&this.updateSwiperOnPropChange(e)}}))}));class SwiperSlide extends ClassToExtend{constructor(){super(),this.tempDiv=document.createElement("div"),this.shadowEl=this.attachShadow({mode:"open"})}render(){const e=this.lazy||""===this.getAttribute("lazy")||"true"===this.getAttribute("lazy");if(this.tempDiv.innerHTML="<slot />",[...this.tempDiv.children].forEach((e=>{this.shadowEl.appendChild(e)})),e){const e=document.createElement("div");e.classList.add("swiper-lazy-preloader"),this.appendChild(e)}}initialize(){this.render()}connectedCallback(){this.initialize()}}const register=(e=!0)=>{"undefined"!=typeof window&&(e||(globalInjectStyles=!1),globalInjectStyles&&addGlobalStyles(!0),window.customElements.get("swiper-container")||window.customElements.define("swiper-container",SwiperContainer),window.customElements.get("swiper-slide")||window.customElements.define("swiper-slide",SwiperSlide))};"undefined"!=typeof window&&(window.SwiperElementRegisterParams=e=>{paramsList.push(...e)});export{SwiperContainer,SwiperSlide,register};