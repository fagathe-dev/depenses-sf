export default function removeSlide(e){const o=this,{params:l,activeIndex:s}=o;let t=s;l.loop&&(t-=o.loopedSlides,o.loopDestroy());let i,d=t;if("object"==typeof e&&"length"in e){for(let l=0;l<e.length;l+=1)i=e[l],o.slides[i]&&o.slides[i].remove(),i<d&&(d-=1);d=Math.max(d,0)}else i=e,o.slides[i]&&o.slides[i].remove(),i<d&&(d-=1),d=Math.max(d,0);o.recalcSlides(),l.loop&&o.loopCreate(),l.observer&&!o.isElement||o.update(),l.loop?o.slideTo(d+o.loopedSlides,0,!1):o.slideTo(d,0,!1)}