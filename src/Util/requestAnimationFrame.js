// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// https://gist.github.com/paulirish/1579671
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
var requestAnimationFrame;
var cancelAnimationFrame;

if(typeof window != "undefined"){
  requestAnimationFrame = window.requestAnimationFrame;
  cancelAnimationFrame = window.cancelAnimationFrame;
  for (var x = 0; x < vendors.length && !requestAnimationFrame; ++x) {
    requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
      || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
}
if (!requestAnimationFrame)
  requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = setTimeout(function () { callback(currTime + timeToCall); },
      timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

if (!cancelAnimationFrame)
  cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };

export {requestAnimationFrame, cancelAnimationFrame};