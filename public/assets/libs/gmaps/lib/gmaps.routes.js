var travelMode,unitSystem;GMaps.prototype.getRoutes=function(t){switch(t.travelMode){case"bicycling":travelMode=google.maps.TravelMode.BICYCLING;break;case"transit":travelMode=google.maps.TravelMode.TRANSIT;break;case"driving":travelMode=google.maps.TravelMode.DRIVING;break;default:travelMode=google.maps.TravelMode.WALKING}unitSystem="imperial"===t.unitSystem?google.maps.UnitSystem.IMPERIAL:google.maps.UnitSystem.METRIC;var e=extend_object({avoidHighways:!1,avoidTolls:!1,optimizeWaypoints:!1,waypoints:[]},t);e.origin=/string/.test(typeof t.origin)?t.origin:new google.maps.LatLng(t.origin[0],t.origin[1]),e.destination=/string/.test(typeof t.destination)?t.destination:new google.maps.LatLng(t.destination[0],t.destination[1]),e.travelMode=travelMode,e.unitSystem=unitSystem,delete e.callback,delete e.error;var o=[];(new google.maps.DirectionsService).route(e,(function(e,s){if(s===google.maps.DirectionsStatus.OK){for(var i in e.routes)e.routes.hasOwnProperty(i)&&o.push(e.routes[i]);t.callback&&t.callback(o,e,s)}else t.error&&t.error(e,s)}))},GMaps.prototype.removeRoutes=function(){this.routes.length=0},GMaps.prototype.getElevations=function(t){(t=extend_object({locations:[],path:!1,samples:256},t)).locations.length>0&&t.locations[0].length>0&&(t.locations=array_flat(array_map([t.locations],arrayToLatLng,!1)));var e=t.callback;delete t.callback;var o=new google.maps.ElevationService;if(t.path){var s={path:t.locations,samples:t.samples};o.getElevationAlongPath(s,(function(t,o){e&&"function"==typeof e&&e(t,o)}))}else delete t.path,delete t.samples,o.getElevationForLocations(t,(function(t,o){e&&"function"==typeof e&&e(t,o)}))},GMaps.prototype.cleanRoute=GMaps.prototype.removePolylines,GMaps.prototype.renderRoute=function(t,e){var o,s="string"==typeof e.panel?document.getElementById(e.panel.replace("#","")):e.panel;e.panel=s,e=extend_object({map:this.map},e),o=new google.maps.DirectionsRenderer(e),this.getRoutes({origin:t.origin,destination:t.destination,travelMode:t.travelMode,waypoints:t.waypoints,unitSystem:t.unitSystem,error:t.error,avoidHighways:t.avoidHighways,avoidTolls:t.avoidTolls,optimizeWaypoints:t.optimizeWaypoints,callback:function(t,e,s){s===google.maps.DirectionsStatus.OK&&o.setDirections(e)}})},GMaps.prototype.drawRoute=function(t){var e=this;this.getRoutes({origin:t.origin,destination:t.destination,travelMode:t.travelMode,waypoints:t.waypoints,unitSystem:t.unitSystem,error:t.error,avoidHighways:t.avoidHighways,avoidTolls:t.avoidTolls,optimizeWaypoints:t.optimizeWaypoints,callback:function(o){if(o.length>0){var s={path:o[o.length-1].overview_path,strokeColor:t.strokeColor,strokeOpacity:t.strokeOpacity,strokeWeight:t.strokeWeight};t.hasOwnProperty("icons")&&(s.icons=t.icons),e.drawPolyline(s),t.callback&&t.callback(o[o.length-1])}}})},GMaps.prototype.travelRoute=function(t){if(t.origin&&t.destination)this.getRoutes({origin:t.origin,destination:t.destination,travelMode:t.travelMode,waypoints:t.waypoints,unitSystem:t.unitSystem,error:t.error,callback:function(e){if(e.length>0&&t.start&&t.start(e[e.length-1]),e.length>0&&t.step){var o=e[e.length-1];if(o.legs.length>0)for(var s,i=o.legs[0].steps,a=0;s=i[a];a++)s.step_number=a,t.step(s,o.legs[0].steps.length-1)}e.length>0&&t.end&&t.end(e[e.length-1])}});else if(t.route&&t.route.legs.length>0)for(var e,o=t.route.legs[0].steps,s=0;e=o[s];s++)e.step_number=s,t.step(e)},GMaps.prototype.drawSteppedRoute=function(t){var e=this;if(t.origin&&t.destination)this.getRoutes({origin:t.origin,destination:t.destination,travelMode:t.travelMode,waypoints:t.waypoints,error:t.error,callback:function(o){if(o.length>0&&t.start&&t.start(o[o.length-1]),o.length>0&&t.step){var s=o[o.length-1];if(s.legs.length>0)for(var i,a=s.legs[0].steps,n=0;i=a[n];n++){i.step_number=n;var r={path:i.path,strokeColor:t.strokeColor,strokeOpacity:t.strokeOpacity,strokeWeight:t.strokeWeight};t.hasOwnProperty("icons")&&(r.icons=t.icons),e.drawPolyline(r),t.step(i,s.legs[0].steps.length-1)}}o.length>0&&t.end&&t.end(o[o.length-1])}});else if(t.route&&t.route.legs.length>0)for(var o,s=t.route.legs[0].steps,i=0;o=s[i];i++){o.step_number=i;var a={path:o.path,strokeColor:t.strokeColor,strokeOpacity:t.strokeOpacity,strokeWeight:t.strokeWeight};t.hasOwnProperty("icons")&&(a.icons=t.icons),e.drawPolyline(a),t.step(o)}},GMaps.Route=function(t){this.origin=t.origin,this.destination=t.destination,this.waypoints=t.waypoints,this.map=t.map,this.route=t.route,this.step_count=0,this.steps=this.route.legs[0].steps,this.steps_length=this.steps.length;var e={path:new google.maps.MVCArray,strokeColor:t.strokeColor,strokeOpacity:t.strokeOpacity,strokeWeight:t.strokeWeight};t.hasOwnProperty("icons")&&(e.icons=t.icons),this.polyline=this.map.drawPolyline(e).getPath()},GMaps.Route.prototype.getRoute=function(t){var o=this;this.map.getRoutes({origin:this.origin,destination:this.destination,travelMode:t.travelMode,waypoints:this.waypoints||[],error:t.error,callback:function(){o.route=e[0],t.callback&&t.callback.call(o)}})},GMaps.Route.prototype.back=function(){if(this.step_count>0){this.step_count--;var t=this.route.legs[0].steps[this.step_count].path;for(var e in t)t.hasOwnProperty(e)&&this.polyline.pop()}},GMaps.Route.prototype.forward=function(){if(this.step_count<this.steps_length){var t=this.route.legs[0].steps[this.step_count].path;for(var e in t)t.hasOwnProperty(e)&&this.polyline.push(t[e]);this.step_count++}};