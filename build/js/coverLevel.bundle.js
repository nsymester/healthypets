(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = exports.CoverInfo = undefined;

var _Utils = require('./Utils');

var coverInfoStore = {};

// module "Modal.js"

function Modal() {
  // cahche DOM
  var $jsCoverLevelInfo = $('.js-cover-level__info');
  var $coverInfoModal = $('.cover-info-modal');
  var $coverInfoModalIntro = $('.cover-info__modal-intro');
  var $coverInfoModalTitle = $('.cover-info__modal-title');
  var $coverInfoModalBody = $('.cover-info__modal-body');

  // bind Events
  $jsCoverLevelInfo.click(function (evt) {
    evt.preventDefault();

    // find the info
    var cover = $(this).data('cover');
    var info = $(this).data('info');
    var price = $(this).data('price');

    // load data into modal body
    $coverInfoModalIntro.html(coverInfoStore[cover].info.cover + ' ' + price);
    $coverInfoModalTitle.html(coverInfoStore[cover].helpText[info].title);
    $coverInfoModalBody.html(coverInfoStore[cover].helpText[info].body);

    $coverInfoModal.modal('show');
  });
}

// module "CoverInfo.js"

function CoverInfo() {
  $.get('data.json', function (data, status) {
    // log(`Data: ${JSON.stringify(data, null, 2)} \nStatus: ${status}`);
    coverInfoStore = data;
  }).fail(function () {
    console.error('Failed to load');
  });
}

exports.CoverInfo = CoverInfo;
exports.Modal = Modal;

},{"./Utils":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module "Utils.js"

function Utils() {
  // usage: log('inside coolFunc',this,arguments);
  // http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
  window.log = function () {
    // store logs to an array for reference
    log.history = log.history || [];
    log.history.push(arguments);
    if (window.console) {
      console.log(Array.prototype.slice.call(arguments));
    }
  };
}

var log = function log() {
  console.log.apply(console, arguments);
};

exports.Utils = Utils;
exports.log = log;

},{}],3:[function(require,module,exports){
'use strict';

var _CoverInfo = require('./components/CoverInfo');

(0, _CoverInfo.CoverInfo)();
(0, _CoverInfo.Modal)();

},{"./components/CoverInfo":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0NvdmVySW5mby5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvVXRpbHMuanMiLCJzcmMvc2NyaXB0cy9jb3ZlckxldmVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOztBQUVBLElBQUksaUJBQWlCLEVBQXJCOztBQUVBOztBQUVBLFNBQVMsS0FBVCxHQUFrQjtBQUNoQjtBQUNBLE1BQUksb0JBQW9CLEVBQUUsdUJBQUYsQ0FBeEI7QUFDQSxNQUFJLGtCQUFrQixFQUFFLG1CQUFGLENBQXRCO0FBQ0EsTUFBSSx1QkFBdUIsRUFBRSwwQkFBRixDQUEzQjtBQUNBLE1BQUksdUJBQXVCLEVBQUUsMEJBQUYsQ0FBM0I7QUFDQSxNQUFJLHNCQUFzQixFQUFFLHlCQUFGLENBQTFCOztBQUVBO0FBQ0Esb0JBQWtCLEtBQWxCLENBQXdCLFVBQVUsR0FBVixFQUFlO0FBQ3JDLFFBQUksY0FBSjs7QUFFQTtBQUNBLFFBQUksUUFBUSxFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsT0FBYixDQUFaO0FBQ0EsUUFBSSxPQUFPLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxNQUFiLENBQVg7QUFDQSxRQUFJLFFBQVEsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsQ0FBWjs7QUFFQTtBQUNBLHlCQUFxQixJQUFyQixDQUEwQixlQUFlLEtBQWYsRUFBc0IsSUFBdEIsQ0FBMkIsS0FBM0IsR0FBbUMsR0FBbkMsR0FBeUMsS0FBbkU7QUFDQSx5QkFBcUIsSUFBckIsQ0FBMEIsZUFBZSxLQUFmLEVBQXNCLFFBQXRCLENBQStCLElBQS9CLEVBQXFDLEtBQS9EO0FBQ0Esd0JBQW9CLElBQXBCLENBQXlCLGVBQWUsS0FBZixFQUFzQixRQUF0QixDQUErQixJQUEvQixFQUFxQyxJQUE5RDs7QUFFQSxvQkFBZ0IsS0FBaEIsQ0FBc0IsTUFBdEI7QUFDRCxHQWREO0FBZUQ7O0FBRUQ7O0FBRUEsU0FBUyxTQUFULEdBQXNCO0FBQ3BCLElBQUUsR0FBRixDQUFNLFdBQU4sRUFBbUIsVUFBVSxJQUFWLEVBQWdCLE1BQWhCLEVBQXdCO0FBQ3pDO0FBQ0EscUJBQWlCLElBQWpCO0FBQ0QsR0FIRCxFQUdHLElBSEgsQ0FHUSxZQUFZO0FBQ2xCLFlBQVEsS0FBUixDQUFjLGdCQUFkO0FBQ0QsR0FMRDtBQU1EOztRQUVRLFMsR0FBQSxTO1FBQVcsSyxHQUFBLEs7Ozs7Ozs7O0FDM0NwQjs7QUFFQSxTQUFTLEtBQVQsR0FBa0I7QUFDaEI7QUFDQTtBQUNBLFNBQU8sR0FBUCxHQUFhLFlBQVk7QUFDdkI7QUFDQSxRQUFJLE9BQUosR0FBYyxJQUFJLE9BQUosSUFBZSxFQUE3QjtBQUNBLFFBQUksT0FBSixDQUFZLElBQVosQ0FBaUIsU0FBakI7QUFDQSxRQUFJLE9BQU8sT0FBWCxFQUFvQjtBQUNsQixjQUFRLEdBQVIsQ0FBWSxNQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsQ0FBMkIsU0FBM0IsQ0FBWjtBQUNEO0FBQ0YsR0FQRDtBQVFEOztBQUVELElBQUksTUFBTSxTQUFOLEdBQU0sR0FBWTtBQUNwQixVQUFRLEdBQVIsQ0FBWSxLQUFaLENBQWtCLE9BQWxCLEVBQTJCLFNBQTNCO0FBQ0QsQ0FGRDs7UUFJUyxLLEdBQUEsSztRQUFPLEcsR0FBQSxHOzs7OztBQ25CaEI7O0FBRUE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IGxvZyB9IGZyb20gJy4vVXRpbHMnO1xuXG5sZXQgY292ZXJJbmZvU3RvcmUgPSB7fTtcblxuLy8gbW9kdWxlIFwiTW9kYWwuanNcIlxuXG5mdW5jdGlvbiBNb2RhbCAoKSB7XG4gIC8vIGNhaGNoZSBET01cbiAgbGV0ICRqc0NvdmVyTGV2ZWxJbmZvID0gJCgnLmpzLWNvdmVyLWxldmVsX19pbmZvJyk7XG4gIGxldCAkY292ZXJJbmZvTW9kYWwgPSAkKCcuY292ZXItaW5mby1tb2RhbCcpO1xuICBsZXQgJGNvdmVySW5mb01vZGFsSW50cm8gPSAkKCcuY292ZXItaW5mb19fbW9kYWwtaW50cm8nKTtcbiAgbGV0ICRjb3ZlckluZm9Nb2RhbFRpdGxlID0gJCgnLmNvdmVyLWluZm9fX21vZGFsLXRpdGxlJyk7XG4gIGxldCAkY292ZXJJbmZvTW9kYWxCb2R5ID0gJCgnLmNvdmVyLWluZm9fX21vZGFsLWJvZHknKTtcblxuICAvLyBiaW5kIEV2ZW50c1xuICAkanNDb3ZlckxldmVsSW5mby5jbGljayhmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBmaW5kIHRoZSBpbmZvXG4gICAgbGV0IGNvdmVyID0gJCh0aGlzKS5kYXRhKCdjb3ZlcicpO1xuICAgIGxldCBpbmZvID0gJCh0aGlzKS5kYXRhKCdpbmZvJyk7XG4gICAgbGV0IHByaWNlID0gJCh0aGlzKS5kYXRhKCdwcmljZScpO1xuXG4gICAgLy8gbG9hZCBkYXRhIGludG8gbW9kYWwgYm9keVxuICAgICRjb3ZlckluZm9Nb2RhbEludHJvLmh0bWwoY292ZXJJbmZvU3RvcmVbY292ZXJdLmluZm8uY292ZXIgKyAnICcgKyBwcmljZSk7XG4gICAgJGNvdmVySW5mb01vZGFsVGl0bGUuaHRtbChjb3ZlckluZm9TdG9yZVtjb3Zlcl0uaGVscFRleHRbaW5mb10udGl0bGUpO1xuICAgICRjb3ZlckluZm9Nb2RhbEJvZHkuaHRtbChjb3ZlckluZm9TdG9yZVtjb3Zlcl0uaGVscFRleHRbaW5mb10uYm9keSk7XG5cbiAgICAkY292ZXJJbmZvTW9kYWwubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG59XG5cbi8vIG1vZHVsZSBcIkNvdmVySW5mby5qc1wiXG5cbmZ1bmN0aW9uIENvdmVySW5mbyAoKSB7XG4gICQuZ2V0KCdkYXRhLmpzb24nLCBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgLy8gbG9nKGBEYXRhOiAke0pTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpfSBcXG5TdGF0dXM6ICR7c3RhdHVzfWApO1xuICAgIGNvdmVySW5mb1N0b3JlID0gZGF0YTtcbiAgfSkuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQnKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IENvdmVySW5mbywgTW9kYWwgfTtcbiIsIi8vIG1vZHVsZSBcIlV0aWxzLmpzXCJcblxuZnVuY3Rpb24gVXRpbHMgKCkge1xuICAvLyB1c2FnZTogbG9nKCdpbnNpZGUgY29vbEZ1bmMnLHRoaXMsYXJndW1lbnRzKTtcbiAgLy8gaHR0cDovL3BhdWxpcmlzaC5jb20vMjAwOS9sb2ctYS1saWdodHdlaWdodC13cmFwcGVyLWZvci1jb25zb2xlbG9nL1xuICB3aW5kb3cubG9nID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIHN0b3JlIGxvZ3MgdG8gYW4gYXJyYXkgZm9yIHJlZmVyZW5jZVxuICAgIGxvZy5oaXN0b3J5ID0gbG9nLmhpc3RvcnkgfHwgW107XG4gICAgbG9nLmhpc3RvcnkucHVzaChhcmd1bWVudHMpO1xuICAgIGlmICh3aW5kb3cuY29uc29sZSkge1xuICAgICAgY29uc29sZS5sb2coQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfVxuICB9O1xufVxuXG5sZXQgbG9nID0gZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xufTtcblxuZXhwb3J0IHsgVXRpbHMsIGxvZyB9O1xuIiwiaW1wb3J0IHsgQ292ZXJJbmZvLCBNb2RhbCB9IGZyb20gJy4vY29tcG9uZW50cy9Db3ZlckluZm8nO1xuXG5Db3ZlckluZm8oKTtcbk1vZGFsKCk7XG4iXX0=
