import classesToSelector from"../../shared/classes-to-selector.js";import createElementIfNotDefined from"../../shared/create-element-if-not-defined.js";import{elementIndex,elementOuterSize,elementParents}from"../../shared/utils.js";export default function Pagination({swiper:e,extendParams:a,on:s,emit:l}){const t="swiper-pagination";let i;a({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${t}-bullet`,bulletActiveClass:`${t}-bullet-active`,modifierClass:`${t}-`,currentClass:`${t}-current`,totalClass:`${t}-total`,hiddenClass:`${t}-hidden`,progressbarFillClass:`${t}-progressbar-fill`,progressbarOppositeClass:`${t}-progressbar-opposite`,clickableClass:`${t}-clickable`,lockClass:`${t}-lock`,horizontalClass:`${t}-horizontal`,verticalClass:`${t}-vertical`,paginationDisabledClass:`${t}-disabled`}}),e.pagination={el:null,bullets:[]};let n=0;const r=e=>(Array.isArray(e)||(e=[e].filter((e=>!!e))),e);function o(){return!e.params.pagination.el||!e.pagination.el||Array.isArray(e.pagination.el)&&0===e.pagination.el.length}function p(a,s){const{bulletActiveClass:l}=e.params.pagination;a&&(a=a[("prev"===s?"previous":"next")+"ElementSibling"])&&(a.classList.add(`${l}-${s}`),(a=a[("prev"===s?"previous":"next")+"ElementSibling"])&&a.classList.add(`${l}-${s}-${s}`))}function c(a){const s=a.target.closest(classesToSelector(e.params.pagination.bulletClass));if(!s)return;a.preventDefault();const l=elementIndex(s)*e.params.slidesPerGroup;if(e.params.loop){if(e.realIndex===l)return;const a=e.getSlideIndexByData(l),s=e.getSlideIndexByData(e.realIndex);a>e.slides.length-e.loopedSlides&&e.loopFix({direction:a>s?"next":"prev",activeSlideIndex:a,slideTo:!1}),e.slideToLoop(l)}else e.slideTo(l)}function d(){const a=e.rtl,s=e.params.pagination;if(o())return;let t,c,d=e.pagination.el;d=r(d);const u=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,g=e.params.loop?Math.ceil(u/e.params.slidesPerGroup):e.snapGrid.length;if(e.params.loop?(c=e.previousRealIndex||0,t=e.params.slidesPerGroup>1?Math.floor(e.realIndex/e.params.slidesPerGroup):e.realIndex):void 0!==e.snapIndex?(t=e.snapIndex,c=e.previousSnapIndex):(c=e.previousIndex||0,t=e.activeIndex||0),"bullets"===s.type&&e.pagination.bullets&&e.pagination.bullets.length>0){const l=e.pagination.bullets;let r,o,u;if(s.dynamicBullets&&(i=elementOuterSize(l[0],e.isHorizontal()?"width":"height",!0),d.forEach((a=>{a.style[e.isHorizontal()?"width":"height"]=i*(s.dynamicMainBullets+4)+"px"})),s.dynamicMainBullets>1&&void 0!==c&&(n+=t-(c||0),n>s.dynamicMainBullets-1?n=s.dynamicMainBullets-1:n<0&&(n=0)),r=Math.max(t-n,0),o=r+(Math.min(l.length,s.dynamicMainBullets)-1),u=(o+r)/2),l.forEach((e=>{const a=[...["","-next","-next-next","-prev","-prev-prev","-main"].map((e=>`${s.bulletActiveClass}${e}`))].map((e=>"string"==typeof e&&e.includes(" ")?e.split(" "):e)).flat();e.classList.remove(...a)})),d.length>1)l.forEach((e=>{const a=elementIndex(e);a===t&&e.classList.add(...s.bulletActiveClass.split(" ")),s.dynamicBullets&&(a>=r&&a<=o&&e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),a===r&&p(e,"prev"),a===o&&p(e,"next"))}));else{const e=l[t];if(e&&e.classList.add(...s.bulletActiveClass.split(" ")),s.dynamicBullets){const e=l[r],a=l[o];for(let e=r;e<=o;e+=1)l[e]&&l[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));p(e,"prev"),p(a,"next")}}if(s.dynamicBullets){const t=Math.min(l.length,s.dynamicMainBullets+4),n=(i*t-i)/2-u*i,r=a?"right":"left";l.forEach((a=>{a.style[e.isHorizontal()?r:"top"]=`${n}px`}))}}d.forEach(((a,i)=>{if("fraction"===s.type&&(a.querySelectorAll(classesToSelector(s.currentClass)).forEach((e=>{e.textContent=s.formatFractionCurrent(t+1)})),a.querySelectorAll(classesToSelector(s.totalClass)).forEach((e=>{e.textContent=s.formatFractionTotal(g)}))),"progressbar"===s.type){let l;l=s.progressbarOpposite?e.isHorizontal()?"vertical":"horizontal":e.isHorizontal()?"horizontal":"vertical";const i=(t+1)/g;let n=1,r=1;"horizontal"===l?n=i:r=i,a.querySelectorAll(classesToSelector(s.progressbarFillClass)).forEach((a=>{a.style.transform=`translate3d(0,0,0) scaleX(${n}) scaleY(${r})`,a.style.transitionDuration=`${e.params.speed}ms`}))}"custom"===s.type&&s.renderCustom?(a.innerHTML=s.renderCustom(e,t+1,g),0===i&&l("paginationRender",a)):(0===i&&l("paginationRender",a),l("paginationUpdate",a)),e.params.watchOverflow&&e.enabled&&a.classList[e.isLocked?"add":"remove"](s.lockClass)}))}function u(){const a=e.params.pagination;if(o())return;const s=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length;let t=e.pagination.el;t=r(t);let i="";if("bullets"===a.type){let l=e.params.loop?Math.ceil(s/e.params.slidesPerGroup):e.snapGrid.length;e.params.freeMode&&e.params.freeMode.enabled&&l>s&&(l=s);for(let s=0;s<l;s+=1)a.renderBullet?i+=a.renderBullet.call(e,s,a.bulletClass):i+=`<${a.bulletElement} class="${a.bulletClass}"></${a.bulletElement}>`}"fraction"===a.type&&(i=a.renderFraction?a.renderFraction.call(e,a.currentClass,a.totalClass):`<span class="${a.currentClass}"></span> / <span class="${a.totalClass}"></span>`),"progressbar"===a.type&&(i=a.renderProgressbar?a.renderProgressbar.call(e,a.progressbarFillClass):`<span class="${a.progressbarFillClass}"></span>`),e.pagination.bullets=[],t.forEach((s=>{"custom"!==a.type&&(s.innerHTML=i||""),"bullets"===a.type&&e.pagination.bullets.push(...s.querySelectorAll(classesToSelector(a.bulletClass)))})),"custom"!==a.type&&l("paginationRender",t[0])}function g(){e.params.pagination=createElementIfNotDefined(e,e.originalParams.pagination,e.params.pagination,{el:"swiper-pagination"});const a=e.params.pagination;if(!a.el)return;let s;"string"==typeof a.el&&e.isElement&&(s=e.el.shadowRoot.querySelector(a.el)),s||"string"!=typeof a.el||(s=[...document.querySelectorAll(a.el)]),s||(s=a.el),s&&0!==s.length&&(e.params.uniqueNavElements&&"string"==typeof a.el&&Array.isArray(s)&&s.length>1&&(s=[...e.el.querySelectorAll(a.el)],s.length>1&&(s=s.filter((a=>elementParents(a,".swiper")[0]===e.el))[0])),Array.isArray(s)&&1===s.length&&(s=s[0]),Object.assign(e.pagination,{el:s}),s=r(s),s.forEach((s=>{"bullets"===a.type&&a.clickable&&s.classList.add(a.clickableClass),s.classList.add(a.modifierClass+a.type),s.classList.add(e.isHorizontal()?a.horizontalClass:a.verticalClass),"bullets"===a.type&&a.dynamicBullets&&(s.classList.add(`${a.modifierClass}${a.type}-dynamic`),n=0,a.dynamicMainBullets<1&&(a.dynamicMainBullets=1)),"progressbar"===a.type&&a.progressbarOpposite&&s.classList.add(a.progressbarOppositeClass),a.clickable&&s.addEventListener("click",c),e.enabled||s.classList.add(a.lockClass)})))}function m(){const a=e.params.pagination;if(o())return;let s=e.pagination.el;s&&(s=r(s),s.forEach((s=>{s.classList.remove(a.hiddenClass),s.classList.remove(a.modifierClass+a.type),s.classList.remove(e.isHorizontal()?a.horizontalClass:a.verticalClass),a.clickable&&s.removeEventListener("click",c)}))),e.pagination.bullets&&e.pagination.bullets.forEach((e=>e.classList.remove(...a.bulletActiveClass.split(" "))))}s("changeDirection",(()=>{if(!e.pagination||!e.pagination.el)return;const a=e.params.pagination;let{el:s}=e.pagination;s=r(s),s.forEach((s=>{s.classList.remove(a.horizontalClass,a.verticalClass),s.classList.add(e.isHorizontal()?a.horizontalClass:a.verticalClass)}))})),s("init",(()=>{!1===e.params.pagination.enabled?f():(g(),u(),d())})),s("activeIndexChange",(()=>{void 0===e.snapIndex&&d()})),s("snapIndexChange",(()=>{d()})),s("snapGridLengthChange",(()=>{u(),d()})),s("destroy",(()=>{m()})),s("enable disable",(()=>{let{el:a}=e.pagination;a&&(a=r(a),a.forEach((a=>a.classList[e.enabled?"remove":"add"](e.params.pagination.lockClass))))})),s("lock unlock",(()=>{d()})),s("click",((a,s)=>{const t=s.target;let{el:i}=e.pagination;if(Array.isArray(i)||(i=[i].filter((e=>!!e))),e.params.pagination.el&&e.params.pagination.hideOnClick&&i&&i.length>0&&!t.classList.contains(e.params.pagination.bulletClass)){if(e.navigation&&(e.navigation.nextEl&&t===e.navigation.nextEl||e.navigation.prevEl&&t===e.navigation.prevEl))return;const a=i[0].classList.contains(e.params.pagination.hiddenClass);l(!0===a?"paginationShow":"paginationHide"),i.forEach((a=>a.classList.toggle(e.params.pagination.hiddenClass)))}}));const f=()=>{e.el.classList.add(e.params.pagination.paginationDisabledClass);let{el:a}=e.pagination;a&&(a=r(a),a.forEach((a=>a.classList.add(e.params.pagination.paginationDisabledClass)))),m()};Object.assign(e.pagination,{enable:()=>{e.el.classList.remove(e.params.pagination.paginationDisabledClass);let{el:a}=e.pagination;a&&(a=r(a),a.forEach((a=>a.classList.remove(e.params.pagination.paginationDisabledClass)))),g(),u(),d()},disable:f,render:u,update:d,init:g,destroy:m})}