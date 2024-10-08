import{now,nextTick}from"../../shared/utils.js";export default function onTouchEnd(e){const i=this,t=i.touchEventsData,o=t.evCache.findIndex((i=>i.pointerId===e.pointerId));if(o>=0&&t.evCache.splice(o,1),["pointercancel","pointerout","pointerleave"].includes(e.type)){if(!("pointercancel"===e.type&&(i.browser.isSafari||i.browser.isWebView)))return}const{params:s,touches:r,rtlTranslate:l,slidesGrid:n,enabled:a}=i;if(!a)return;if(!s.simulateTouch&&"mouse"===e.pointerType)return;let d=e;if(d.originalEvent&&(d=d.originalEvent),t.allowTouchCallbacks&&i.emit("touchEnd",d),t.allowTouchCallbacks=!1,!t.isTouched)return t.isMoved&&s.grabCursor&&i.setGrabCursor(!1),t.isMoved=!1,void(t.startMoving=!1);s.grabCursor&&t.isMoved&&t.isTouched&&(!0===i.allowSlideNext||!0===i.allowSlidePrev)&&i.setGrabCursor(!1);const u=now(),c=u-t.touchStartTime;if(i.allowClick){const e=d.path||d.composedPath&&d.composedPath();i.updateClickedSlide(e&&e[0]||d.target),i.emit("tap click",d),c<300&&u-t.lastClickTime<300&&i.emit("doubleTap doubleClick",d)}if(t.lastClickTime=now(),nextTick((()=>{i.destroyed||(i.allowClick=!0)})),!t.isTouched||!t.isMoved||!i.swipeDirection||0===r.diff||t.currentTranslate===t.startTranslate)return t.isTouched=!1,t.isMoved=!1,void(t.startMoving=!1);let p;if(t.isTouched=!1,t.isMoved=!1,t.startMoving=!1,p=s.followFinger?l?i.translate:-i.translate:-t.currentTranslate,s.cssMode)return;if(i.params.freeMode&&s.freeMode.enabled)return void i.freeMode.onTouchEnd({currentPos:p});let v=0,T=i.slidesSizesGrid[0];for(let e=0;e<n.length;e+=e<s.slidesPerGroupSkip?1:s.slidesPerGroup){const i=e<s.slidesPerGroupSkip-1?1:s.slidesPerGroup;void 0!==n[e+i]?p>=n[e]&&p<n[e+i]&&(v=e,T=n[e+i]-n[e]):p>=n[e]&&(v=e,T=n[n.length-1]-n[n.length-2])}let g=null,h=null;s.rewind&&(i.isBeginning?h=i.params.virtual&&i.params.virtual.enabled&&i.virtual?i.virtual.slides.length-1:i.slides.length-1:i.isEnd&&(g=0));const w=(p-n[v])/T,f=v<s.slidesPerGroupSkip-1?1:s.slidesPerGroup;if(c>s.longSwipesMs){if(!s.longSwipes)return void i.slideTo(i.activeIndex);"next"===i.swipeDirection&&(w>=s.longSwipesRatio?i.slideTo(s.rewind&&i.isEnd?g:v+f):i.slideTo(v)),"prev"===i.swipeDirection&&(w>1-s.longSwipesRatio?i.slideTo(v+f):null!==h&&w<0&&Math.abs(w)>s.longSwipesRatio?i.slideTo(h):i.slideTo(v))}else{if(!s.shortSwipes)return void i.slideTo(i.activeIndex);i.navigation&&(d.target===i.navigation.nextEl||d.target===i.navigation.prevEl)?d.target===i.navigation.nextEl?i.slideTo(v+f):i.slideTo(v):("next"===i.swipeDirection&&i.slideTo(null!==g?g:v+f),"prev"===i.swipeDirection&&i.slideTo(null!==h?h:v))}}