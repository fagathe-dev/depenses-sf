import effectInit from"../../shared/effect-init.js";import{createElement}from"../../shared/utils.js";export default function EffectCube({swiper:e,extendParams:t,on:s}){t({cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94}});const a=(e,t,s)=>{let a=s?e.querySelector(".swiper-slide-shadow-left"):e.querySelector(".swiper-slide-shadow-top"),r=s?e.querySelector(".swiper-slide-shadow-right"):e.querySelector(".swiper-slide-shadow-bottom");a||(a=createElement("div","swiper-slide-shadow-"+(s?"left":"top")),e.append(a)),r||(r=createElement("div","swiper-slide-shadow-"+(s?"right":"bottom")),e.append(r)),a&&(a.style.opacity=Math.max(-t,0)),r&&(r.style.opacity=Math.max(t,0))};effectInit({effect:"cube",swiper:e,on:s,setTranslate:()=>{const{el:t,wrapperEl:s,slides:r,width:o,height:i,rtlTranslate:l,size:d,browser:n}=e,c=e.params.cubeEffect,p=e.isHorizontal(),h=e.virtual&&e.params.virtual.enabled;let w,f=0;c.shadow&&(p?(w=e.slidesEl.querySelector(".swiper-cube-shadow"),w||(w=createElement("div","swiper-cube-shadow"),e.slidesEl.append(w)),w.style.height=`${o}px`):(w=t.querySelector(".swiper-cube-shadow"),w||(w=createElement("div","swiper-cube-shadow"),t.append(w))));for(let e=0;e<r.length;e+=1){const t=r[e];let s=e;h&&(s=parseInt(t.getAttribute("data-swiper-slide-index"),10));let o=90*s,i=Math.floor(o/360);l&&(o=-o,i=Math.floor(-o/360));const n=Math.max(Math.min(t.progress,1),-1);let w=0,m=0,u=0;s%4==0?(w=4*-i*d,u=0):(s-1)%4==0?(w=0,u=4*-i*d):(s-2)%4==0?(w=d+4*i*d,u=d):(s-3)%4==0&&(w=-d,u=3*d+4*d*i),l&&(w=-w),p||(m=w,w=0);const y=`rotateX(${p?0:-o}deg) rotateY(${p?o:0}deg) translate3d(${w}px, ${m}px, ${u}px)`;n<=1&&n>-1&&(f=90*s+90*n,l&&(f=90*-s-90*n)),t.style.transform=y,c.slideShadows&&a(t,n,p)}if(s.style.transformOrigin=`50% 50% -${d/2}px`,s.style["-webkit-transform-origin"]=`50% 50% -${d/2}px`,c.shadow)if(p)w.style.transform=`translate3d(0px, ${o/2+c.shadowOffset}px, ${-o/2}px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`;else{const e=Math.abs(f)-90*Math.floor(Math.abs(f)/90),t=1.5-(Math.sin(2*e*Math.PI/360)/2+Math.cos(2*e*Math.PI/360)/2),s=c.shadowScale,a=c.shadowScale/t,r=c.shadowOffset;w.style.transform=`scale3d(${s}, 1, ${a}) translate3d(0px, ${i/2+r}px, ${-i/2/a}px) rotateX(-90deg)`}const m=(n.isSafari||n.isWebView)&&n.needPerspectiveFix?-d/2:0;s.style.transform=`translate3d(0px,0,${m}px) rotateX(${e.isHorizontal()?0:f}deg) rotateY(${e.isHorizontal()?-f:0}deg)`,s.style.setProperty("--swiper-cube-translate-z",`${m}px`)},setTransition:t=>{const{el:s,slides:a}=e;if(a.forEach((e=>{e.style.transitionDuration=`${t}ms`,e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e=>{e.style.transitionDuration=`${t}ms`}))})),e.params.cubeEffect.shadow&&!e.isHorizontal()){const e=s.querySelector(".swiper-cube-shadow");e&&(e.style.transitionDuration=`${t}ms`)}},recreateShadows:()=>{const t=e.isHorizontal();e.slides.forEach((e=>{const s=Math.max(Math.min(e.progress,1),-1);a(e,s,t)}))},getEffectParams:()=>e.params.cubeEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,resistanceRatio:0,spaceBetween:0,centeredSlides:!1,virtualTranslate:!0})})}