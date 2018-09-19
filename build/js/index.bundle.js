(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module "Address.js"

// postcodes

function Address() {
  // cache DOM
  var $postcodeSearch = $('#postcode-search');
  var $addressPostcodes = $('.address__postcodes a');
  var $addressLink = $('.address__link');

  var $postcodeResult = $('#postcode-result');
  var $manualAddress = $('#manualaddress');
  var $address = $('#address');

  // bind events
  $postcodeSearch.click(function (evt) {
    evt.preventDefault();
    $postcodeResult.collapse('toggle');
    $manualAddress.collapse('show');
    $address.collapse('hide');
  });

  $addressPostcodes.on('click', function (evt) {
    evt.preventDefault();
    $address.collapse('show');
    $postcodeResult.collapse('hide');
    $manualAddress.collapse('hide');
  });

  $addressLink.on('click', function (evt) {
    evt.preventDefault();
    $address.collapse('show');
    $postcodeResult.collapse('hide');
    $manualAddress.collapse('hide');
  });
}

exports.Address = Address;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module "CoverTypes.js"

function CoverTypes() {
  // cache DOM
  var $lifetimeLink = $('#lifecover-link');
  var $maximumLink = $('#maximum-link');
  var $accidentLink = $('#accident-link');
  var $btnCoverLevel = $('.btn--cover-level');

  var $lifetimeCover = $('#lifecover');
  var $maximumCover = $('#maximumcover');
  var $accidentCover = $('#accidentcover');

  $lifetimeLink.click(function () {
    $lifetimeCover.collapse('show');
    $maximumCover.collapse('hide');
    $accidentCover.collapse('hide');
  });

  $maximumLink.click(function () {
    $lifetimeCover.collapse('hide');
    $maximumCover.collapse('show');
    $accidentCover.collapse('hide');
  });

  $accidentLink.click(function () {
    $lifetimeCover.collapse('hide');
    $maximumCover.collapse('hide');
    $accidentCover.collapse('show');
  });

  // bind Events

  // stop web page from scrolling to top when link is clicked that triggers JavaScript
  $btnCoverLevel.click(function (e) {
    e.preventDefault();
    // target id
    var targetId = $(this).data('target');
    var targetHeight = $(targetId).height();
    var documentHeight = $(document).height();
    $('html, body').animate({ scrollTop: documentHeight }, targetHeight);

    if (this.innerHTML === 'Choose level') {
      this.innerHTML = 'Hide levels';
      $(this).removeClass('btn-primary');
      $(this).addClass('btn--outline');
    } else {
      this.innerHTML = 'Choose level';
      $(this).removeClass('btn--outline');
      $(this).addClass('btn-primary');
    }
  });
}

exports.CoverTypes = CoverTypes;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module "CustomSelect.js"

function CustomSelect() {
  var selectAlt, i, j, selElement, selectedItem, optionList, optionItem;

  // cache DOM
  /* look for any elements with the class "select--alt": */
  selectAlt = document.getElementsByClassName('select--alt');

  // bind Events
  for (i = 0; i < selectAlt.length; i++) {
    selElement = selectAlt[i].getElementsByTagName('select')[0];

    /* for each element, create a new DIV that will act as the selected item: */
    selectedItem = document.createElement('DIV');
    selectedItem.setAttribute('class', 'select-selected');
    selectedItem.innerHTML = selElement.options[selElement.selectedIndex].innerHTML;

    selectAlt[i].appendChild(selectedItem);

    /* for each element, create a new DIV that will contain the option list: */
    optionList = document.createElement('DIV');
    optionList.setAttribute('class', 'select-items select-hide');

    for (j = 1; j < selElement.length; j++) {
      /* for each option in the original select element,
      create a new DIV that will act as an option item: */
      optionItem = document.createElement('DIV');
      optionItem.innerHTML = selElement.options[j].innerHTML;
      optionItem.addEventListener('click', syncOptionSelected);

      optionList.appendChild(optionItem);
    }

    selectAlt[i].appendChild(optionList);

    selectedItem.addEventListener('click', closeOtherOptions);
  }

  // methods
  function syncOptionSelected(e) {
    /* when an item is clicked, update the original select box,
    and the selected item: */
    var y, i, k, originalSelect, h;
    originalSelect = this.parentNode.parentNode.getElementsByTagName('select')[0];

    // store the selected item
    h = this.parentNode.previousSibling;
    for (i = 0; i < originalSelect.length; i++) {
      if (originalSelect.options[i].innerHTML === this.innerHTML) {
        originalSelect.selectedIndex = i;
        h.innerHTML = this.innerHTML;
        y = this.parentNode.getElementsByClassName('same-as-selected');
        for (k = 0; k < y.length; k++) {
          y[k].removeAttribute('class');
        }
        this.setAttribute('class', 'same-as-selected');
        break;
      }
    }
    h.click();
    if (originalSelect.getAttribute('id') === 'conditionSelect') {
      $('.conditions').append('<div class=\'pill__condition\'>' + h.innerHTML + ' <span class=\'close\'>x</span></div>');
      checkForConditions();
    }
  }

  /* if the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener('click', closeAllSelect);
}

function closeOtherOptions(e) {
  /* when the select box is clicked, close any other select boxes,
  and open/close the current select box: */
  e.stopPropagation();
  closeAllSelect(this);
  this.nextSibling.classList.toggle('select-hide');
  this.classList.toggle('select-arrow-active');
}

function closeAllSelect(elmnt) {
  /* a function that will close all select boxes in the document,
  except the current select box: */
  var x,
      y,
      i,
      arrNo = [];
  x = document.getElementsByClassName('select-items');
  y = document.getElementsByClassName('select-selected');
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}

function checkForConditions() {
  $('.pill__condition .close').on('click', function (evt) {
    evt.preventDefault();
    evt.currentTarget.parentNode.remove();
  });
}

exports.CustomSelect = CustomSelect;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module "Payment.js"

function Payment() {
  // cache DOM
  var $regularPayMonthly = $('#regular-pay-monthly');
  var $regularPayAnnually = $('#regular-pay-annually');
  var $paymentTypeDebit = $('#payment-type-debit');
  var $paymentTypeCredit = $('#payment-type-credit');

  var $directDebitDetails = $('#directDebitDetails');
  var $paymentType = $('#paymentType');
  var $creditCardDetails = $('#creditCardDetails');

  // bind events
  $regularPayMonthly.click(function () {
    $directDebitDetails.collapse('show');
    $paymentType.collapse('hide');
  });

  $regularPayAnnually.click(function () {
    $paymentType.collapse('show');
    $directDebitDetails.collapse('hide');
  });

  $paymentTypeDebit.click(function () {
    $directDebitDetails.collapse('show');
    $creditCardDetails.collapse('hide');
  });

  $paymentTypeCredit.click(function () {
    $creditCardDetails.collapse('show');
    $directDebitDetails.collapse('hide');
  });
}

exports.Payment = Payment;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module "Pets.js"

function Pets() {
  // cache DOM
  var $preExistingConditionYes = $('#pre-existing-condition-yes');
  var $preExistingConditionNo = $('#pre-existing-condition-no');
  var $petCondition = $('#pet-condition');
  var $conditionSelect = $('#conditionSelect');

  var $petTypeDog = $('#pet-type-dog');
  var $petTypeCat = $('#pet-type-cat');
  var $catInfo = $('#cat-info');
  var $dogInfo = $('#dog-info');

  // bind events
  $petTypeDog.click(function () {
    $catInfo.collapse('hide');
    $dogInfo.collapse('show');
  });

  $petTypeCat.click(function () {
    $dogInfo.collapse('hide');
    $catInfo.collapse('show');
  });

  $preExistingConditionYes.click(function () {
    $petCondition.collapse('show');
  });

  $preExistingConditionNo.click(function () {
    $petCondition.collapse('hide');
  });

  $conditionSelect.change(function () {
    var select = $('#conditionSelect option:selected').val();
    // create a pill
    // append pill to condition list
    $('.conditions').append('<div class="pill__condition">' + select + ' <span class="close">x</span></div>');

    checkForConditions();
  });
}

function checkForConditions() {
  $('.pill__condition .close').on('click', function (evt) {
    evt.preventDefault();
    evt.currentTarget.parentNode.remove();
  });
}

exports.Pets = Pets;

},{}],6:[function(require,module,exports){
'use strict';

var _CustomSelect = require('./components/CustomSelect');

var _Address = require('./components/Address');

var _Pets = require('./components/Pets');

var _CoverTypes = require('./components/CoverTypes');

var _Payment = require('./components/Payment');

(0, _CustomSelect.CustomSelect)();
(0, _Address.Address)();
(0, _Pets.Pets)();
(0, _CoverTypes.CoverTypes)();
(0, _Payment.Payment)();

},{"./components/Address":1,"./components/CoverTypes":2,"./components/CustomSelect":3,"./components/Payment":4,"./components/Pets":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0FkZHJlc3MuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0NvdmVyVHlwZXMuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0N1c3RvbVNlbGVjdC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGF5bWVudC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGV0cy5qcyIsInNyYy9zY3JpcHRzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQTs7QUFFQTs7QUFFQSxTQUFTLE9BQVQsR0FBb0I7QUFDbEI7QUFDQSxNQUFJLGtCQUFrQixFQUFFLGtCQUFGLENBQXRCO0FBQ0EsTUFBSSxvQkFBb0IsRUFBRSx1QkFBRixDQUF4QjtBQUNBLE1BQUksZUFBZSxFQUFFLGdCQUFGLENBQW5COztBQUVBLE1BQUksa0JBQWtCLEVBQUUsa0JBQUYsQ0FBdEI7QUFDQSxNQUFJLGlCQUFpQixFQUFFLGdCQUFGLENBQXJCO0FBQ0EsTUFBSSxXQUFXLEVBQUUsVUFBRixDQUFmOztBQUVBO0FBQ0Esa0JBQWdCLEtBQWhCLENBQXNCLFVBQVUsR0FBVixFQUFlO0FBQ25DLFFBQUksY0FBSjtBQUNBLG9CQUFnQixRQUFoQixDQUF5QixRQUF6QjtBQUNBLG1CQUFlLFFBQWYsQ0FBd0IsTUFBeEI7QUFDQSxhQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDRCxHQUxEOztBQU9BLG9CQUFrQixFQUFsQixDQUFxQixPQUFyQixFQUE4QixVQUFVLEdBQVYsRUFBZTtBQUMzQyxRQUFJLGNBQUo7QUFDQSxhQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDQSxvQkFBZ0IsUUFBaEIsQ0FBeUIsTUFBekI7QUFDQSxtQkFBZSxRQUFmLENBQXdCLE1BQXhCO0FBQ0QsR0FMRDs7QUFPQSxlQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsVUFB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VCxHQUErQjtBQUM3QixJQUFFLHlCQUFGLEVBQTZCLEVBQTdCLENBQWdDLE9BQWhDLEVBQXlDLFVBQVUsR0FBVixFQUFlO0FBQ3RELFFBQUksY0FBSjtBQUNBLFFBQUksYUFBSixDQUFrQixVQUFsQixDQUE2QixNQUE3QjtBQUNELEdBSEQ7QUFJRDs7UUFFUSxJLEdBQUEsSTs7Ozs7QUNsRFQ7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIG1vZHVsZSBcIkFkZHJlc3MuanNcIlxuXG4vLyBwb3N0Y29kZXNcblxuZnVuY3Rpb24gQWRkcmVzcyAoKSB7XG4gIC8vIGNhY2hlIERPTVxuICBsZXQgJHBvc3Rjb2RlU2VhcmNoID0gJCgnI3Bvc3Rjb2RlLXNlYXJjaCcpO1xuICBsZXQgJGFkZHJlc3NQb3N0Y29kZXMgPSAkKCcuYWRkcmVzc19fcG9zdGNvZGVzIGEnKTtcbiAgbGV0ICRhZGRyZXNzTGluayA9ICQoJy5hZGRyZXNzX19saW5rJyk7XG5cbiAgbGV0ICRwb3N0Y29kZVJlc3VsdCA9ICQoJyNwb3N0Y29kZS1yZXN1bHQnKTtcbiAgbGV0ICRtYW51YWxBZGRyZXNzID0gJCgnI21hbnVhbGFkZHJlc3MnKTtcbiAgbGV0ICRhZGRyZXNzID0gJCgnI2FkZHJlc3MnKTtcblxuICAvLyBiaW5kIGV2ZW50c1xuICAkcG9zdGNvZGVTZWFyY2guY2xpY2soZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICRwb3N0Y29kZVJlc3VsdC5jb2xsYXBzZSgndG9nZ2xlJyk7XG4gICAgJG1hbnVhbEFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkYWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWRkcmVzc1Bvc3Rjb2Rlcy5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWRkcmVzc0xpbmsub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICRhZGRyZXNzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJHBvc3Rjb2RlUmVzdWx0LmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJG1hbnVhbEFkZHJlc3MuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEFkZHJlc3MgfTtcbiIsIi8vIG1vZHVsZSBcIkNvdmVyVHlwZXMuanNcIlxuXG5mdW5jdGlvbiBDb3ZlclR5cGVzICgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGxldCAkbGlmZXRpbWVMaW5rID0gJCgnI2xpZmVjb3Zlci1saW5rJyk7XG4gIGxldCAkbWF4aW11bUxpbmsgPSAkKCcjbWF4aW11bS1saW5rJyk7XG4gIGxldCAkYWNjaWRlbnRMaW5rID0gJCgnI2FjY2lkZW50LWxpbmsnKTtcbiAgbGV0ICRidG5Db3ZlckxldmVsID0gJCgnLmJ0bi0tY292ZXItbGV2ZWwnKTtcblxuICBsZXQgJGxpZmV0aW1lQ292ZXIgPSAkKCcjbGlmZWNvdmVyJyk7XG4gIGxldCAkbWF4aW11bUNvdmVyID0gJCgnI21heGltdW1jb3ZlcicpO1xuICBsZXQgJGFjY2lkZW50Q292ZXIgPSAkKCcjYWNjaWRlbnRjb3ZlcicpO1xuXG4gICRsaWZldGltZUxpbmsuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRsaWZldGltZUNvdmVyLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJG1heGltdW1Db3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRhY2NpZGVudENvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRtYXhpbXVtTGluay5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJGFjY2lkZW50TGluay5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gYmluZCBFdmVudHNcblxuICAvLyBzdG9wIHdlYiBwYWdlIGZyb20gc2Nyb2xsaW5nIHRvIHRvcCB3aGVuIGxpbmsgaXMgY2xpY2tlZCB0aGF0IHRyaWdnZXJzIEphdmFTY3JpcHRcbiAgJGJ0bkNvdmVyTGV2ZWwuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gdGFyZ2V0IGlkXG4gICAgbGV0IHRhcmdldElkID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcbiAgICBsZXQgdGFyZ2V0SGVpZ2h0ID0gICQodGFyZ2V0SWQpLmhlaWdodCgpO1xuICAgIGxldCBkb2N1bWVudEhlaWdodCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBkb2N1bWVudEhlaWdodCB9LCB0YXJnZXRIZWlnaHQpO1xuXG4gICAgaWYgKHRoaXMuaW5uZXJIVE1MID09PSAnQ2hvb3NlIGxldmVsJykge1xuICAgICAgdGhpcy5pbm5lckhUTUwgPSAnSGlkZSBsZXZlbHMnO1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2J0bi0tb3V0bGluZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlubmVySFRNTCA9ICdDaG9vc2UgbGV2ZWwnO1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYnRuLS1vdXRsaW5lJyk7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCB7IENvdmVyVHlwZXMgfTtcbiIsIi8vIG1vZHVsZSBcIkN1c3RvbVNlbGVjdC5qc1wiXG5cbmZ1bmN0aW9uIEN1c3RvbVNlbGVjdCAoKSB7XG4gIHZhciBzZWxlY3RBbHQsIGksIGosIHNlbEVsZW1lbnQsIHNlbGVjdGVkSXRlbSwgb3B0aW9uTGlzdCwgb3B0aW9uSXRlbTtcblxuICAvLyBjYWNoZSBET01cbiAgLyogbG9vayBmb3IgYW55IGVsZW1lbnRzIHdpdGggdGhlIGNsYXNzIFwic2VsZWN0LS1hbHRcIjogKi9cbiAgc2VsZWN0QWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LS1hbHQnKTtcblxuICAvLyBiaW5kIEV2ZW50c1xuICBmb3IgKGkgPSAwOyBpIDwgc2VsZWN0QWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgc2VsRWxlbWVudCA9IHNlbGVjdEFsdFtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2VsZWN0JylbMF07XG5cbiAgICAvKiBmb3IgZWFjaCBlbGVtZW50LCBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBhY3QgYXMgdGhlIHNlbGVjdGVkIGl0ZW06ICovXG4gICAgc2VsZWN0ZWRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgc2VsZWN0ZWRJdGVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2VsZWN0LXNlbGVjdGVkJyk7XG4gICAgc2VsZWN0ZWRJdGVtLmlubmVySFRNTCA9IHNlbEVsZW1lbnQub3B0aW9uc1tzZWxFbGVtZW50LnNlbGVjdGVkSW5kZXhdLmlubmVySFRNTDtcblxuICAgIHNlbGVjdEFsdFtpXS5hcHBlbmRDaGlsZChzZWxlY3RlZEl0ZW0pO1xuXG4gICAgLyogZm9yIGVhY2ggZWxlbWVudCwgY3JlYXRlIGEgbmV3IERJViB0aGF0IHdpbGwgY29udGFpbiB0aGUgb3B0aW9uIGxpc3Q6ICovXG4gICAgb3B0aW9uTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIG9wdGlvbkxpc3Quc2V0QXR0cmlidXRlKCdjbGFzcycsICdzZWxlY3QtaXRlbXMgc2VsZWN0LWhpZGUnKTtcblxuICAgIGZvciAoaiA9IDE7IGogPCBzZWxFbGVtZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAvKiBmb3IgZWFjaCBvcHRpb24gaW4gdGhlIG9yaWdpbmFsIHNlbGVjdCBlbGVtZW50LFxuICAgICAgY3JlYXRlIGEgbmV3IERJViB0aGF0IHdpbGwgYWN0IGFzIGFuIG9wdGlvbiBpdGVtOiAqL1xuICAgICAgb3B0aW9uSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgb3B0aW9uSXRlbS5pbm5lckhUTUwgPSBzZWxFbGVtZW50Lm9wdGlvbnNbal0uaW5uZXJIVE1MO1xuICAgICAgb3B0aW9uSXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN5bmNPcHRpb25TZWxlY3RlZCk7XG5cbiAgICAgIG9wdGlvbkxpc3QuYXBwZW5kQ2hpbGQob3B0aW9uSXRlbSk7XG4gICAgfVxuXG4gICAgc2VsZWN0QWx0W2ldLmFwcGVuZENoaWxkKG9wdGlvbkxpc3QpO1xuXG4gICAgc2VsZWN0ZWRJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VPdGhlck9wdGlvbnMpO1xuICB9XG5cbiAgLy8gbWV0aG9kc1xuICBmdW5jdGlvbiBzeW5jT3B0aW9uU2VsZWN0ZWQgKGUpIHtcbiAgICAvKiB3aGVuIGFuIGl0ZW0gaXMgY2xpY2tlZCwgdXBkYXRlIHRoZSBvcmlnaW5hbCBzZWxlY3QgYm94LFxuICAgIGFuZCB0aGUgc2VsZWN0ZWQgaXRlbTogKi9cbiAgICB2YXIgeSwgaSwgaywgb3JpZ2luYWxTZWxlY3QsIGg7XG4gICAgb3JpZ2luYWxTZWxlY3QgPSB0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2VsZWN0JylbMF07XG5cbiAgICAvLyBzdG9yZSB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgIGggPSB0aGlzLnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nO1xuICAgIGZvciAoaSA9IDA7IGkgPCBvcmlnaW5hbFNlbGVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG9yaWdpbmFsU2VsZWN0Lm9wdGlvbnNbaV0uaW5uZXJIVE1MID09PSB0aGlzLmlubmVySFRNTCkge1xuICAgICAgICBvcmlnaW5hbFNlbGVjdC5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgaC5pbm5lckhUTUwgPSB0aGlzLmlubmVySFRNTDtcbiAgICAgICAgeSA9IHRoaXMucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzYW1lLWFzLXNlbGVjdGVkJyk7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCB5Lmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgeVtrXS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NhbWUtYXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGguY2xpY2soKTtcbiAgICBpZiAob3JpZ2luYWxTZWxlY3QuZ2V0QXR0cmlidXRlKCdpZCcpID09PSAnY29uZGl0aW9uU2VsZWN0Jykge1xuICAgICAgJCgnLmNvbmRpdGlvbnMnKS5hcHBlbmQoYDxkaXYgY2xhc3M9J3BpbGxfX2NvbmRpdGlvbic+JHtoLmlubmVySFRNTH0gPHNwYW4gY2xhc3M9J2Nsb3NlJz54PC9zcGFuPjwvZGl2PmApO1xuICAgICAgY2hlY2tGb3JDb25kaXRpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgLyogaWYgdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIG91dHNpZGUgdGhlIHNlbGVjdCBib3gsXG4gIHRoZW4gY2xvc2UgYWxsIHNlbGVjdCBib3hlczogKi9cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUFsbFNlbGVjdCk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlT3RoZXJPcHRpb25zIChlKSB7XG4gIC8qIHdoZW4gdGhlIHNlbGVjdCBib3ggaXMgY2xpY2tlZCwgY2xvc2UgYW55IG90aGVyIHNlbGVjdCBib3hlcyxcbiAgYW5kIG9wZW4vY2xvc2UgdGhlIGN1cnJlbnQgc2VsZWN0IGJveDogKi9cbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgY2xvc2VBbGxTZWxlY3QodGhpcyk7XG4gIHRoaXMubmV4dFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0LWhpZGUnKTtcbiAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3QtYXJyb3ctYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlQWxsU2VsZWN0IChlbG1udCkge1xuICAvKiBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjbG9zZSBhbGwgc2VsZWN0IGJveGVzIGluIHRoZSBkb2N1bWVudCxcbiAgZXhjZXB0IHRoZSBjdXJyZW50IHNlbGVjdCBib3g6ICovXG4gIHZhciB4LCB5LCBpLCBhcnJObyA9IFtdO1xuICB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LWl0ZW1zJyk7XG4gIHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3Qtc2VsZWN0ZWQnKTtcbiAgZm9yIChpID0gMDsgaSA8IHkubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZWxtbnQgPT0geVtpXSkge1xuICAgICAgYXJyTm8ucHVzaChpKVxuICAgIH0gZWxzZSB7XG4gICAgICB5W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdC1hcnJvdy1hY3RpdmUnKTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IHgubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXJyTm8uaW5kZXhPZihpKSkge1xuICAgICAgeFtpXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QtaGlkZScpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0ZvckNvbmRpdGlvbnMgKCkge1xuICAkKCcucGlsbF9fY29uZGl0aW9uIC5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuY3VycmVudFRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQ3VzdG9tU2VsZWN0IH07XG4iLCIvLyBtb2R1bGUgXCJQYXltZW50LmpzXCJcblxuZnVuY3Rpb24gUGF5bWVudCAoKSB7XG4gIC8vIGNhY2hlIERPTVxuICBsZXQgJHJlZ3VsYXJQYXlNb250aGx5ID0gJCgnI3JlZ3VsYXItcGF5LW1vbnRobHknKTtcbiAgbGV0ICRyZWd1bGFyUGF5QW5udWFsbHkgPSAkKCcjcmVndWxhci1wYXktYW5udWFsbHknKTtcbiAgbGV0ICRwYXltZW50VHlwZURlYml0ID0gJCgnI3BheW1lbnQtdHlwZS1kZWJpdCcpO1xuICBsZXQgJHBheW1lbnRUeXBlQ3JlZGl0ID0gJCgnI3BheW1lbnQtdHlwZS1jcmVkaXQnKTtcblxuICBsZXQgJGRpcmVjdERlYml0RGV0YWlscyA9ICQoJyNkaXJlY3REZWJpdERldGFpbHMnKTtcbiAgbGV0ICRwYXltZW50VHlwZSA9ICQoJyNwYXltZW50VHlwZScpO1xuICBsZXQgJGNyZWRpdENhcmREZXRhaWxzID0gJCgnI2NyZWRpdENhcmREZXRhaWxzJyk7XG5cbiAgLy8gYmluZCBldmVudHNcbiAgJHJlZ3VsYXJQYXlNb250aGx5LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkZGlyZWN0RGViaXREZXRhaWxzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJHBheW1lbnRUeXBlLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRyZWd1bGFyUGF5QW5udWFsbHkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRwYXltZW50VHlwZS5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJHBheW1lbnRUeXBlRGViaXQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkY3JlZGl0Q2FyZERldGFpbHMuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJHBheW1lbnRUeXBlQ3JlZGl0LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkY3JlZGl0Q2FyZERldGFpbHMuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkZGlyZWN0RGViaXREZXRhaWxzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBQYXltZW50IH07XG4iLCIvLyBtb2R1bGUgXCJQZXRzLmpzXCJcblxuZnVuY3Rpb24gUGV0cyAoKSB7XG4gIC8vIGNhY2hlIERPTVxuICBsZXQgJHByZUV4aXN0aW5nQ29uZGl0aW9uWWVzID0gJCgnI3ByZS1leGlzdGluZy1jb25kaXRpb24teWVzJyk7XG4gIGxldCAkcHJlRXhpc3RpbmdDb25kaXRpb25ObyA9ICQoJyNwcmUtZXhpc3RpbmctY29uZGl0aW9uLW5vJyk7XG4gIGxldCAkcGV0Q29uZGl0aW9uID0gJCgnI3BldC1jb25kaXRpb24nKTtcbiAgbGV0ICRjb25kaXRpb25TZWxlY3QgPSAgJCgnI2NvbmRpdGlvblNlbGVjdCcpO1xuXG4gIGxldCAkcGV0VHlwZURvZyA9ICQoJyNwZXQtdHlwZS1kb2cnKTtcbiAgbGV0ICRwZXRUeXBlQ2F0ID0gJCgnI3BldC10eXBlLWNhdCcpO1xuICBsZXQgJGNhdEluZm8gPSAkKCcjY2F0LWluZm8nKTtcbiAgbGV0ICRkb2dJbmZvID0gJCgnI2RvZy1pbmZvJyk7XG5cbiAgLy8gYmluZCBldmVudHNcbiAgJHBldFR5cGVEb2cuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRjYXRJbmZvLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGRvZ0luZm8uY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJHBldFR5cGVDYXQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRkb2dJbmZvLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGNhdEluZm8uY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJHByZUV4aXN0aW5nQ29uZGl0aW9uWWVzLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkcGV0Q29uZGl0aW9uLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gICRwcmVFeGlzdGluZ0NvbmRpdGlvbk5vLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkcGV0Q29uZGl0aW9uLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRjb25kaXRpb25TZWxlY3QuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc2VsZWN0ID0gJCgnI2NvbmRpdGlvblNlbGVjdCBvcHRpb246c2VsZWN0ZWQnKS52YWwoKTtcbiAgICAvLyBjcmVhdGUgYSBwaWxsXG4gICAgLy8gYXBwZW5kIHBpbGwgdG8gY29uZGl0aW9uIGxpc3RcbiAgICAkKCcuY29uZGl0aW9ucycpLmFwcGVuZChgPGRpdiBjbGFzcz1cInBpbGxfX2NvbmRpdGlvblwiPiR7c2VsZWN0fSA8c3BhbiBjbGFzcz1cImNsb3NlXCI+eDwvc3Bhbj48L2Rpdj5gKTtcblxuICAgIGNoZWNrRm9yQ29uZGl0aW9ucygpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JDb25kaXRpb25zICgpIHtcbiAgJCgnLnBpbGxfX2NvbmRpdGlvbiAuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IFBldHMgfTtcbiIsImltcG9ydCB7IEN1c3RvbVNlbGVjdCB9IGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21TZWxlY3QnO1xuaW1wb3J0IHsgQWRkcmVzcyB9IGZyb20gJy4vY29tcG9uZW50cy9BZGRyZXNzJztcbmltcG9ydCB7IFBldHMgfSBmcm9tICcuL2NvbXBvbmVudHMvUGV0cyc7XG5pbXBvcnQgeyBDb3ZlclR5cGVzIH0gZnJvbSAnLi9jb21wb25lbnRzL0NvdmVyVHlwZXMnO1xuaW1wb3J0IHsgUGF5bWVudCB9IGZyb20gJy4vY29tcG9uZW50cy9QYXltZW50JztcblxuQ3VzdG9tU2VsZWN0KCk7XG5BZGRyZXNzKCk7XG5QZXRzKCk7XG5Db3ZlclR5cGVzKCk7XG5QYXltZW50KCk7XG4iXX0=
