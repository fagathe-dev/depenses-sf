function _extends(){return _extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e},_extends.apply(this,arguments)}import React,{useRef,useState,forwardRef}from"react";import{uniqueClasses}from"../components-shared/utils.js";import{useIsomorphicLayoutEffect}from"./use-isomorphic-layout-effect.js";import{SwiperSlideContext}from"./context.js";const SwiperSlide=forwardRef((function(e,t){let{tag:i="div",children:r,className:s="",swiper:a,zoom:n,lazy:o,virtualIndex:l,swiperSlideIndex:d,...c}=void 0===e?{}:e;const p=useRef(null),[u,f]=useState("swiper-slide"),[m,w]=useState(!1);function v(e,t,i){t===p.current&&f(i)}useIsomorphicLayoutEffect((()=>{if(void 0!==d&&(p.current.swiperSlideIndex=d),t&&(t.current=p.current),p.current&&a){if(!a.destroyed)return a.on("_slideClass",v),()=>{a&&a.off("_slideClass",v)};"swiper-slide"!==u&&f("swiper-slide")}})),useIsomorphicLayoutEffect((()=>{a&&p.current&&!a.destroyed&&f(a.getSlideClasses(p.current))}),[a]);const S={isActive:u.indexOf("swiper-slide-active")>=0,isVisible:u.indexOf("swiper-slide-visible")>=0,isPrev:u.indexOf("swiper-slide-prev")>=0,isNext:u.indexOf("swiper-slide-next")>=0},x=()=>"function"==typeof r?r(S):r;return React.createElement(i,_extends({ref:p,className:uniqueClasses(`${u}${s?` ${s}`:""}`),"data-swiper-slide-index":l,onLoad:()=>{w(!0)}},c),n&&React.createElement(SwiperSlideContext.Provider,{value:S},React.createElement("div",{className:"swiper-zoom-container","data-swiper-zoom":"number"==typeof n?n:void 0},x(),o&&!m&&React.createElement("div",{className:"swiper-lazy-preloader"}))),!n&&React.createElement(SwiperSlideContext.Provider,{value:S},x(),o&&!m&&React.createElement("div",{className:"swiper-lazy-preloader"})))}));SwiperSlide.displayName="SwiperSlide";export{SwiperSlide};