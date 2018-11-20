(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// import { log } from './Utils';

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

},{}],2:[function(require,module,exports){
'use strict';

var _CoverInfo = require('./components/CoverInfo');

(0, _CoverInfo.CoverInfo)();
(0, _CoverInfo.Modal)();

},{"./components/CoverInfo":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0NvdmVySW5mby5qcyIsInNyYy9zY3JpcHRzL2NvdmVyTGV2ZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBOztBQUVBLElBQUksaUJBQWlCLEVBQXJCOztBQUVBOztBQUVBLFNBQVMsS0FBVCxHQUFpQjtBQUNmO0FBQ0EsTUFBTSxvQkFBb0IsRUFBRSx1QkFBRixDQUExQjtBQUNBLE1BQU0sa0JBQWtCLEVBQUUsbUJBQUYsQ0FBeEI7QUFDQSxNQUFNLHVCQUF1QixFQUFFLDBCQUFGLENBQTdCO0FBQ0EsTUFBTSx1QkFBdUIsRUFBRSwwQkFBRixDQUE3QjtBQUNBLE1BQU0sc0JBQXNCLEVBQUUseUJBQUYsQ0FBNUI7O0FBRUE7QUFDQSxvQkFBa0IsS0FBbEIsQ0FBd0IsVUFBUyxHQUFULEVBQWM7QUFDcEMsUUFBSSxjQUFKOztBQUVBO0FBQ0EsUUFBTSxRQUFRLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxPQUFiLENBQWQ7QUFDQSxRQUFNLE9BQU8sRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE1BQWIsQ0FBYjtBQUNBLFFBQU0sUUFBUSxFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsT0FBYixDQUFkOztBQUVBO0FBQ0EseUJBQXFCLElBQXJCLENBQTZCLGVBQWUsS0FBZixFQUFzQixJQUF0QixDQUEyQixLQUF4RCxTQUFpRSxLQUFqRTtBQUNBLHlCQUFxQixJQUFyQixDQUEwQixlQUFlLEtBQWYsRUFBc0IsUUFBdEIsQ0FBK0IsSUFBL0IsRUFBcUMsS0FBL0Q7QUFDQSx3QkFBb0IsSUFBcEIsQ0FBeUIsZUFBZSxLQUFmLEVBQXNCLFFBQXRCLENBQStCLElBQS9CLEVBQXFDLElBQTlEOztBQUVBLG9CQUFnQixLQUFoQixDQUFzQixNQUF0QjtBQUNELEdBZEQ7QUFlRDs7QUFFRDs7QUFFQSxTQUFTLFNBQVQsR0FBcUI7QUFDbkIsSUFBRSxHQUFGLENBQU0sV0FBTixFQUFtQixVQUFTLElBQVQsRUFBZSxNQUFmLEVBQXVCO0FBQ3hDO0FBQ0EscUJBQWlCLElBQWpCO0FBQ0QsR0FIRCxFQUdHLElBSEgsQ0FHUSxZQUFXO0FBQ2pCLFlBQVEsS0FBUixDQUFjLGdCQUFkO0FBQ0QsR0FMRDtBQU1EOztRQUVRLFMsR0FBQSxTO1FBQVcsSyxHQUFBLEs7Ozs7O0FDM0NwQjs7QUFFQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi9VdGlscyc7XG5cbmxldCBjb3ZlckluZm9TdG9yZSA9IHt9O1xuXG4vLyBtb2R1bGUgXCJNb2RhbC5qc1wiXG5cbmZ1bmN0aW9uIE1vZGFsKCkge1xuICAvLyBjYWhjaGUgRE9NXG4gIGNvbnN0ICRqc0NvdmVyTGV2ZWxJbmZvID0gJCgnLmpzLWNvdmVyLWxldmVsX19pbmZvJyk7XG4gIGNvbnN0ICRjb3ZlckluZm9Nb2RhbCA9ICQoJy5jb3Zlci1pbmZvLW1vZGFsJyk7XG4gIGNvbnN0ICRjb3ZlckluZm9Nb2RhbEludHJvID0gJCgnLmNvdmVyLWluZm9fX21vZGFsLWludHJvJyk7XG4gIGNvbnN0ICRjb3ZlckluZm9Nb2RhbFRpdGxlID0gJCgnLmNvdmVyLWluZm9fX21vZGFsLXRpdGxlJyk7XG4gIGNvbnN0ICRjb3ZlckluZm9Nb2RhbEJvZHkgPSAkKCcuY292ZXItaW5mb19fbW9kYWwtYm9keScpO1xuXG4gIC8vIGJpbmQgRXZlbnRzXG4gICRqc0NvdmVyTGV2ZWxJbmZvLmNsaWNrKGZ1bmN0aW9uKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gZmluZCB0aGUgaW5mb1xuICAgIGNvbnN0IGNvdmVyID0gJCh0aGlzKS5kYXRhKCdjb3ZlcicpO1xuICAgIGNvbnN0IGluZm8gPSAkKHRoaXMpLmRhdGEoJ2luZm8nKTtcbiAgICBjb25zdCBwcmljZSA9ICQodGhpcykuZGF0YSgncHJpY2UnKTtcblxuICAgIC8vIGxvYWQgZGF0YSBpbnRvIG1vZGFsIGJvZHlcbiAgICAkY292ZXJJbmZvTW9kYWxJbnRyby5odG1sKGAke2NvdmVySW5mb1N0b3JlW2NvdmVyXS5pbmZvLmNvdmVyfSAke3ByaWNlfWApO1xuICAgICRjb3ZlckluZm9Nb2RhbFRpdGxlLmh0bWwoY292ZXJJbmZvU3RvcmVbY292ZXJdLmhlbHBUZXh0W2luZm9dLnRpdGxlKTtcbiAgICAkY292ZXJJbmZvTW9kYWxCb2R5Lmh0bWwoY292ZXJJbmZvU3RvcmVbY292ZXJdLmhlbHBUZXh0W2luZm9dLmJvZHkpO1xuXG4gICAgJGNvdmVySW5mb01vZGFsLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xufVxuXG4vLyBtb2R1bGUgXCJDb3ZlckluZm8uanNcIlxuXG5mdW5jdGlvbiBDb3ZlckluZm8oKSB7XG4gICQuZ2V0KCdkYXRhLmpzb24nLCBmdW5jdGlvbihkYXRhLCBzdGF0dXMpIHtcbiAgICAvLyBsb2coYERhdGE6ICR7SlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMil9IFxcblN0YXR1czogJHtzdGF0dXN9YCk7XG4gICAgY292ZXJJbmZvU3RvcmUgPSBkYXRhO1xuICB9KS5mYWlsKGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkJyk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBDb3ZlckluZm8sIE1vZGFsIH07XG4iLCJpbXBvcnQgeyBDb3ZlckluZm8sIE1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL0NvdmVySW5mbyc7XG5cbkNvdmVySW5mbygpO1xuTW9kYWwoKTtcbiJdfQ==
