export default function setGrabCursor(e){const r=this;if(!r.params.simulateTouch||r.params.watchOverflow&&r.isLocked||r.params.cssMode)return;const s="container"===r.params.touchEventsTarget?r.el:r.wrapperEl;r.isElement&&(r.__preventObserver__=!0),s.style.cursor="move",s.style.cursor=e?"grabbing":"grab",r.isElement&&requestAnimationFrame((()=>{r.__preventObserver__=!1}))}