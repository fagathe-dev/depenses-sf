var some;some=Array.prototype.some?Array.prototype.some:function(r){for(var e=Object(this),t=e.length>>>0,o=0;o<t;o++)if(o in e&&r.call(this,e[o],o,e))return!0;return!1};export{some as default};