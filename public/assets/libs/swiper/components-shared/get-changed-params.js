import{paramsList}from"./params-list.js";import{isObject}from"./utils.js";function getChangedParams(e,t,i,s,n){const r=[];if(!t)return r;const a=e=>{r.indexOf(e)<0&&r.push(e)};if(i&&s){const e=s.map(n),t=i.map(n);e.join("")!==t.join("")&&a("children"),s.length!==i.length&&a("children")}return paramsList.filter((e=>"_"===e[0])).map((e=>e.replace(/_/,""))).forEach((i=>{if(i in e&&i in t)if(isObject(e[i])&&isObject(t[i])){const s=Object.keys(e[i]),n=Object.keys(t[i]);s.length!==n.length?a(i):(s.forEach((s=>{e[i][s]!==t[i][s]&&a(i)})),n.forEach((s=>{e[i][s]!==t[i][s]&&a(i)})))}else e[i]!==t[i]&&a(i)})),r}export{getChangedParams};