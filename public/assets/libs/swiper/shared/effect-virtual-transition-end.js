import{elementTransitionEnd}from"./utils.js";export default function effectVirtualTransitionEnd({swiper:e,duration:t,transformElements:n,allSlides:r}){const{activeIndex:i}=e;if(e.params.virtualTranslate&&0!==t){let t,a=!1;t=r?n:n.filter((t=>{const n=t.classList.contains("swiper-slide-transform")?(t=>{if(!t.parentElement)return e.slides.filter((e=>e.shadowEl&&e.shadowEl===t.parentNode))[0];return t.parentElement})(t):t;return e.getSlideIndex(n)===i})),t.forEach((t=>{elementTransitionEnd(t,(()=>{if(a)return;if(!e||e.destroyed)return;a=!0,e.animating=!1;const t=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0});e.wrapperEl.dispatchEvent(t)}))}))}}