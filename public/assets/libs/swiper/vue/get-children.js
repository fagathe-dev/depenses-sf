function getChildren(e,n,r){void 0===e&&(e={});const t=[],a={"container-start":[],"container-end":[],"wrapper-start":[],"wrapper-end":[]},o=(e,n)=>{Array.isArray(e)&&e.forEach((e=>{const r="symbol"==typeof e.type;"default"===n&&(n="container-end"),r&&e.children?o(e.children,n):!e.type||"SwiperSlide"!==e.type.name&&"AsyncComponentWrapper"!==e.type.name?a[n]&&a[n].push(e):t.push(e)}))};return Object.keys(e).forEach((n=>{if("function"!=typeof e[n])return;const r=e[n]();o(r,n)})),r.value=n.value,n.value=t,{slides:t,slots:a}}export{getChildren};