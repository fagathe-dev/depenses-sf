import{extend}from"../shared/utils.js";export default function moduleExtendParams(e,n){return function(t={}){const a=Object.keys(t)[0],o=t[a];"object"==typeof o&&null!==o?(["navigation","pagination","scrollbar"].indexOf(a)>=0&&!0===e[a]&&(e[a]={auto:!0}),a in e&&"enabled"in o?(!0===e[a]&&(e[a]={enabled:!0}),"object"!=typeof e[a]||"enabled"in e[a]||(e[a].enabled=!0),e[a]||(e[a]={enabled:!1}),extend(n,t)):extend(n,t)):extend(n,t)}}