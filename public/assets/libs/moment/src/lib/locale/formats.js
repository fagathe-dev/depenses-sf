export var defaultLongDateFormat={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};export function longDateFormat(t){var M=this._longDateFormat[t],a=this._longDateFormat[t.toUpperCase()];return M||!a?M:(this._longDateFormat[t]=a.replace(/MMMM|MM|DD|dddd/g,(function(t){return t.slice(1)})),this._longDateFormat[t])}