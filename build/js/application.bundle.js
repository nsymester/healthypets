(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _HelloWorld = require('./components/HelloWorld');

console.log((0, _HelloWorld.Hello)() + ' ' + _HelloWorld.World);

},{"./components/HelloWorld":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// module "HelloWorld.js"

function Hello() {
	return 'Hello';
}

var World = 'World';

exports.Hello = Hello;
exports.World = World;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHBsaWNhdGlvbi5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBRUEsUUFBUSxHQUFSLENBQWUsd0JBQWYsU0FBMEIsaUJBQTFCOzs7Ozs7OztBQ0ZBOztBQUVBLFNBQVMsS0FBVCxHQUFrQjtBQUNqQixRQUFPLE9BQVA7QUFDQTs7QUFFRCxJQUFNLFFBQVEsT0FBZDs7UUFFUyxLLEdBQUEsSztRQUFPLEssR0FBQSxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgSGVsbG8sIFdvcmxkIH0gZnJvbSAnLi9jb21wb25lbnRzL0hlbGxvV29ybGQnO1xyXG5cclxuY29uc29sZS5sb2coYCR7SGVsbG8oKX0gJHtXb3JsZH1gKTtcclxuIiwiLy8gbW9kdWxlIFwiSGVsbG9Xb3JsZC5qc1wiXHJcblxyXG5mdW5jdGlvbiBIZWxsbyAoKSB7XHJcblx0cmV0dXJuICdIZWxsbyc7XHJcbn1cclxuXHJcbmNvbnN0IFdvcmxkID0gJ1dvcmxkJztcclxuXHJcbmV4cG9ydCB7IEhlbGxvLCBXb3JsZCB9O1xyXG4iXX0=
