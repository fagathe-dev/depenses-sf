import{getWindow}from"ssr-window";let browser;function calcBrowser(){const e=getWindow();let r=!1;function i(){const r=e.navigator.userAgent.toLowerCase();return r.indexOf("safari")>=0&&r.indexOf("chrome")<0&&r.indexOf("android")<0}if(i()){const i=String(e.navigator.userAgent);if(i.includes("Version/")){const[e,t]=i.split("Version/")[1].split(" ")[0].split(".").map((e=>Number(e)));r=e<16||16===e&&t<2}}return{isSafari:r||i(),needPerspectiveFix:r,isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)}}function getBrowser(){return browser||(browser=calcBrowser()),browser}export{getBrowser};