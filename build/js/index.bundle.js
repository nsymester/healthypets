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
// module "Pet.js"

function Pet() {
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

exports.Pet = Pet;

},{}],6:[function(require,module,exports){
'use strict';

var _CustomSelect = require('./components/CustomSelect');

var _Address = require('./components/Address');

var _Pet = require('./components/Pet');

var _CoverTypes = require('./components/CoverTypes');

var _Payment = require('./components/Payment');

(0, _CustomSelect.CustomSelect)();
(0, _Address.Address)();
(0, _Pet.Pet)();
(0, _CoverTypes.CoverTypes)();
(0, _Payment.Payment)();

},{"./components/Address":1,"./components/CoverTypes":2,"./components/CustomSelect":3,"./components/Payment":4,"./components/Pet":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0FkZHJlc3MuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0NvdmVyVHlwZXMuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0N1c3RvbVNlbGVjdC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGF5bWVudC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGV0LmpzIiwic3JjL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBOztBQUVBOztBQUVBLFNBQVMsT0FBVCxHQUFvQjtBQUNsQjtBQUNBLE1BQUksa0JBQWtCLEVBQUUsa0JBQUYsQ0FBdEI7QUFDQSxNQUFJLG9CQUFvQixFQUFFLHVCQUFGLENBQXhCO0FBQ0EsTUFBSSxlQUFlLEVBQUUsZ0JBQUYsQ0FBbkI7O0FBRUEsTUFBSSxrQkFBa0IsRUFBRSxrQkFBRixDQUF0QjtBQUNBLE1BQUksaUJBQWlCLEVBQUUsZ0JBQUYsQ0FBckI7QUFDQSxNQUFJLFdBQVcsRUFBRSxVQUFGLENBQWY7O0FBRUE7QUFDQSxrQkFBZ0IsS0FBaEIsQ0FBc0IsVUFBVSxHQUFWLEVBQWU7QUFDbkMsUUFBSSxjQUFKO0FBQ0Esb0JBQWdCLFFBQWhCLENBQXlCLFFBQXpCO0FBQ0EsbUJBQWUsUUFBZixDQUF3QixNQUF4QjtBQUNBLGFBQVMsUUFBVCxDQUFrQixNQUFsQjtBQUNELEdBTEQ7O0FBT0Esb0JBQWtCLEVBQWxCLENBQXFCLE9BQXJCLEVBQThCLFVBQVUsR0FBVixFQUFlO0FBQzNDLFFBQUksY0FBSjtBQUNBLGFBQVMsUUFBVCxDQUFrQixNQUFsQjtBQUNBLG9CQUFnQixRQUFoQixDQUF5QixNQUF6QjtBQUNBLG1CQUFlLFFBQWYsQ0FBd0IsTUFBeEI7QUFDRCxHQUxEOztBQU9BLGVBQWEsRUFBYixDQUFnQixPQUFoQixFQUF5QixVQUFV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LEdBQStCO0FBQzdCLElBQUUseUJBQUYsRUFBNkIsRUFBN0IsQ0FBZ0MsT0FBaEMsRUFBeUMsVUFBVSxHQUFWLEVBQWU7QUFDdEQsUUFBSSxjQUFKO0FBQ0EsUUFBSSxhQUFKLENBQWtCLFVBQWxCLENBQTZCLE1BQTdCO0FBQ0QsR0FIRDtBQUlEOztRQUVRLEcsR0FBQSxHOzs7OztBQ2xEVDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gbW9kdWxlIFwiQWRkcmVzcy5qc1wiXG5cbi8vIHBvc3Rjb2Rlc1xuXG5mdW5jdGlvbiBBZGRyZXNzICgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGxldCAkcG9zdGNvZGVTZWFyY2ggPSAkKCcjcG9zdGNvZGUtc2VhcmNoJyk7XG4gIGxldCAkYWRkcmVzc1Bvc3Rjb2RlcyA9ICQoJy5hZGRyZXNzX19wb3N0Y29kZXMgYScpO1xuICBsZXQgJGFkZHJlc3NMaW5rID0gJCgnLmFkZHJlc3NfX2xpbmsnKTtcblxuICBsZXQgJHBvc3Rjb2RlUmVzdWx0ID0gJCgnI3Bvc3Rjb2RlLXJlc3VsdCcpO1xuICBsZXQgJG1hbnVhbEFkZHJlc3MgPSAkKCcjbWFudWFsYWRkcmVzcycpO1xuICBsZXQgJGFkZHJlc3MgPSAkKCcjYWRkcmVzcycpO1xuXG4gIC8vIGJpbmQgZXZlbnRzXG4gICRwb3N0Y29kZVNlYXJjaC5jbGljayhmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJHBvc3Rjb2RlUmVzdWx0LmNvbGxhcHNlKCd0b2dnbGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRhZGRyZXNzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRhZGRyZXNzUG9zdGNvZGVzLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkYWRkcmVzcy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRwb3N0Y29kZVJlc3VsdC5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRtYW51YWxBZGRyZXNzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRhZGRyZXNzTGluay5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQWRkcmVzcyB9O1xuIiwiLy8gbW9kdWxlIFwiQ292ZXJUeXBlcy5qc1wiXG5cbmZ1bmN0aW9uIENvdmVyVHlwZXMgKCkge1xuICAvLyBjYWNoZSBET01cbiAgbGV0ICRsaWZldGltZUxpbmsgPSAkKCcjbGlmZWNvdmVyLWxpbmsnKTtcbiAgbGV0ICRtYXhpbXVtTGluayA9ICQoJyNtYXhpbXVtLWxpbmsnKTtcbiAgbGV0ICRhY2NpZGVudExpbmsgPSAkKCcjYWNjaWRlbnQtbGluaycpO1xuICBsZXQgJGJ0bkNvdmVyTGV2ZWwgPSAkKCcuYnRuLS1jb3Zlci1sZXZlbCcpO1xuXG4gIGxldCAkbGlmZXRpbWVDb3ZlciA9ICQoJyNsaWZlY292ZXInKTtcbiAgbGV0ICRtYXhpbXVtQ292ZXIgPSAkKCcjbWF4aW11bWNvdmVyJyk7XG4gIGxldCAkYWNjaWRlbnRDb3ZlciA9ICQoJyNhY2NpZGVudGNvdmVyJyk7XG5cbiAgJGxpZmV0aW1lTGluay5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJG1heGltdW1MaW5rLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkbGlmZXRpbWVDb3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRtYXhpbXVtQ292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkYWNjaWRlbnRDb3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWNjaWRlbnRMaW5rLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkbGlmZXRpbWVDb3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRtYXhpbXVtQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkYWNjaWRlbnRDb3Zlci5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAvLyBiaW5kIEV2ZW50c1xuXG4gIC8vIHN0b3Agd2ViIHBhZ2UgZnJvbSBzY3JvbGxpbmcgdG8gdG9wIHdoZW4gbGluayBpcyBjbGlja2VkIHRoYXQgdHJpZ2dlcnMgSmF2YVNjcmlwdFxuICAkYnRuQ292ZXJMZXZlbC5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyB0YXJnZXQgaWRcbiAgICBsZXQgdGFyZ2V0SWQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xuICAgIGxldCB0YXJnZXRIZWlnaHQgPSAgJCh0YXJnZXRJZCkuaGVpZ2h0KCk7XG4gICAgbGV0IGRvY3VtZW50SGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KCk7XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IGRvY3VtZW50SGVpZ2h0IH0sIHRhcmdldEhlaWdodCk7XG5cbiAgICBpZiAodGhpcy5pbm5lckhUTUwgPT09ICdDaG9vc2UgbGV2ZWwnKSB7XG4gICAgICB0aGlzLmlubmVySFRNTCA9ICdIaWRlIGxldmVscyc7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYnRuLS1vdXRsaW5lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gJ0Nob29zZSBsZXZlbCc7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdidG4tLW91dGxpbmUnKTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IHsgQ292ZXJUeXBlcyB9O1xuIiwiLy8gbW9kdWxlIFwiQ3VzdG9tU2VsZWN0LmpzXCJcblxuZnVuY3Rpb24gQ3VzdG9tU2VsZWN0ICgpIHtcbiAgdmFyIHNlbGVjdEFsdCwgaSwgaiwgc2VsRWxlbWVudCwgc2VsZWN0ZWRJdGVtLCBvcHRpb25MaXN0LCBvcHRpb25JdGVtO1xuXG4gIC8vIGNhY2hlIERPTVxuICAvKiBsb29rIGZvciBhbnkgZWxlbWVudHMgd2l0aCB0aGUgY2xhc3MgXCJzZWxlY3QtLWFsdFwiOiAqL1xuICBzZWxlY3RBbHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtLWFsdCcpO1xuXG4gIC8vIGJpbmQgRXZlbnRzXG4gIGZvciAoaSA9IDA7IGkgPCBzZWxlY3RBbHQubGVuZ3RoOyBpKyspIHtcbiAgICBzZWxFbGVtZW50ID0gc2VsZWN0QWx0W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzZWxlY3QnKVswXTtcblxuICAgIC8qIGZvciBlYWNoIGVsZW1lbnQsIGNyZWF0ZSBhIG5ldyBESVYgdGhhdCB3aWxsIGFjdCBhcyB0aGUgc2VsZWN0ZWQgaXRlbTogKi9cbiAgICBzZWxlY3RlZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBzZWxlY3RlZEl0ZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdzZWxlY3Qtc2VsZWN0ZWQnKTtcbiAgICBzZWxlY3RlZEl0ZW0uaW5uZXJIVE1MID0gc2VsRWxlbWVudC5vcHRpb25zW3NlbEVsZW1lbnQuc2VsZWN0ZWRJbmRleF0uaW5uZXJIVE1MO1xuXG4gICAgc2VsZWN0QWx0W2ldLmFwcGVuZENoaWxkKHNlbGVjdGVkSXRlbSk7XG5cbiAgICAvKiBmb3IgZWFjaCBlbGVtZW50LCBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBjb250YWluIHRoZSBvcHRpb24gbGlzdDogKi9cbiAgICBvcHRpb25MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgb3B0aW9uTGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NlbGVjdC1pdGVtcyBzZWxlY3QtaGlkZScpO1xuXG4gICAgZm9yIChqID0gMTsgaiA8IHNlbEVsZW1lbnQubGVuZ3RoOyBqKyspIHtcbiAgICAgIC8qIGZvciBlYWNoIG9wdGlvbiBpbiB0aGUgb3JpZ2luYWwgc2VsZWN0IGVsZW1lbnQsXG4gICAgICBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBhY3QgYXMgYW4gb3B0aW9uIGl0ZW06ICovXG4gICAgICBvcHRpb25JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICBvcHRpb25JdGVtLmlubmVySFRNTCA9IHNlbEVsZW1lbnQub3B0aW9uc1tqXS5pbm5lckhUTUw7XG4gICAgICBvcHRpb25JdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3luY09wdGlvblNlbGVjdGVkKTtcblxuICAgICAgb3B0aW9uTGlzdC5hcHBlbmRDaGlsZChvcHRpb25JdGVtKTtcbiAgICB9XG5cbiAgICBzZWxlY3RBbHRbaV0uYXBwZW5kQ2hpbGQob3B0aW9uTGlzdCk7XG5cbiAgICBzZWxlY3RlZEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU90aGVyT3B0aW9ucyk7XG4gIH1cblxuICAvLyBtZXRob2RzXG4gIGZ1bmN0aW9uIHN5bmNPcHRpb25TZWxlY3RlZCAoZSkge1xuICAgIC8qIHdoZW4gYW4gaXRlbSBpcyBjbGlja2VkLCB1cGRhdGUgdGhlIG9yaWdpbmFsIHNlbGVjdCBib3gsXG4gICAgYW5kIHRoZSBzZWxlY3RlZCBpdGVtOiAqL1xuICAgIHZhciB5LCBpLCBrLCBvcmlnaW5hbFNlbGVjdCwgaDtcbiAgICBvcmlnaW5hbFNlbGVjdCA9IHRoaXMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzZWxlY3QnKVswXTtcblxuICAgIC8vIHN0b3JlIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgaCA9IHRoaXMucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgZm9yIChpID0gMDsgaSA8IG9yaWdpbmFsU2VsZWN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAob3JpZ2luYWxTZWxlY3Qub3B0aW9uc1tpXS5pbm5lckhUTUwgPT09IHRoaXMuaW5uZXJIVE1MKSB7XG4gICAgICAgIG9yaWdpbmFsU2VsZWN0LnNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICBoLmlubmVySFRNTCA9IHRoaXMuaW5uZXJIVE1MO1xuICAgICAgICB5ID0gdGhpcy5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NhbWUtYXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgZm9yIChrID0gMDsgayA8IHkubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICB5W2tdLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2FtZS1hcy1zZWxlY3RlZCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaC5jbGljaygpO1xuICAgIGlmIChvcmlnaW5hbFNlbGVjdC5nZXRBdHRyaWJ1dGUoJ2lkJykgPT09ICdjb25kaXRpb25TZWxlY3QnKSB7XG4gICAgICAkKCcuY29uZGl0aW9ucycpLmFwcGVuZChgPGRpdiBjbGFzcz0ncGlsbF9fY29uZGl0aW9uJz4ke2guaW5uZXJIVE1MfSA8c3BhbiBjbGFzcz0nY2xvc2UnPng8L3NwYW4+PC9kaXY+YCk7XG4gICAgICBjaGVja0ZvckNvbmRpdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICAvKiBpZiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgb3V0c2lkZSB0aGUgc2VsZWN0IGJveCxcbiAgdGhlbiBjbG9zZSBhbGwgc2VsZWN0IGJveGVzOiAqL1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlQWxsU2VsZWN0KTtcbn1cblxuZnVuY3Rpb24gY2xvc2VPdGhlck9wdGlvbnMgKGUpIHtcbiAgLyogd2hlbiB0aGUgc2VsZWN0IGJveCBpcyBjbGlja2VkLCBjbG9zZSBhbnkgb3RoZXIgc2VsZWN0IGJveGVzLFxuICBhbmQgb3Blbi9jbG9zZSB0aGUgY3VycmVudCBzZWxlY3QgYm94OiAqL1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBjbG9zZUFsbFNlbGVjdCh0aGlzKTtcbiAgdGhpcy5uZXh0U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3QtaGlkZScpO1xuICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdC1hcnJvdy1hY3RpdmUnKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VBbGxTZWxlY3QgKGVsbW50KSB7XG4gIC8qIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNsb3NlIGFsbCBzZWxlY3QgYm94ZXMgaW4gdGhlIGRvY3VtZW50LFxuICBleGNlcHQgdGhlIGN1cnJlbnQgc2VsZWN0IGJveDogKi9cbiAgdmFyIHgsIHksIGksIGFyck5vID0gW107XG4gIHggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtaXRlbXMnKTtcbiAgeSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1zZWxlY3RlZCcpO1xuICBmb3IgKGkgPSAwOyBpIDwgeS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlbG1udCA9PSB5W2ldKSB7XG4gICAgICBhcnJOby5wdXNoKGkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHlbaV0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0LWFycm93LWFjdGl2ZScpO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJOby5pbmRleE9mKGkpKSB7XG4gICAgICB4W2ldLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdC1oaWRlJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yQ29uZGl0aW9ucyAoKSB7XG4gICQoJy5waWxsX19jb25kaXRpb24gLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBDdXN0b21TZWxlY3QgfTtcbiIsIi8vIG1vZHVsZSBcIlBheW1lbnQuanNcIlxuXG5mdW5jdGlvbiBQYXltZW50ICgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGxldCAkcmVndWxhclBheU1vbnRobHkgPSAkKCcjcmVndWxhci1wYXktbW9udGhseScpO1xuICBsZXQgJHJlZ3VsYXJQYXlBbm51YWxseSA9ICQoJyNyZWd1bGFyLXBheS1hbm51YWxseScpO1xuICBsZXQgJHBheW1lbnRUeXBlRGViaXQgPSAkKCcjcGF5bWVudC10eXBlLWRlYml0Jyk7XG4gIGxldCAkcGF5bWVudFR5cGVDcmVkaXQgPSAkKCcjcGF5bWVudC10eXBlLWNyZWRpdCcpO1xuXG4gIGxldCAkZGlyZWN0RGViaXREZXRhaWxzID0gJCgnI2RpcmVjdERlYml0RGV0YWlscycpO1xuICBsZXQgJHBheW1lbnRUeXBlID0gJCgnI3BheW1lbnRUeXBlJyk7XG4gIGxldCAkY3JlZGl0Q2FyZERldGFpbHMgPSAkKCcjY3JlZGl0Q2FyZERldGFpbHMnKTtcblxuICAvLyBiaW5kIGV2ZW50c1xuICAkcmVndWxhclBheU1vbnRobHkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcGF5bWVudFR5cGUuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJHJlZ3VsYXJQYXlBbm51YWxseS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJHBheW1lbnRUeXBlLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGRpcmVjdERlYml0RGV0YWlscy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkcGF5bWVudFR5cGVEZWJpdC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGRpcmVjdERlYml0RGV0YWlscy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRjcmVkaXRDYXJkRGV0YWlscy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkcGF5bWVudFR5cGVDcmVkaXQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRjcmVkaXRDYXJkRGV0YWlscy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IFBheW1lbnQgfTtcbiIsIi8vIG1vZHVsZSBcIlBldC5qc1wiXG5cbmZ1bmN0aW9uIFBldCAoKSB7XG4gIC8vIGNhY2hlIERPTVxuICBsZXQgJHByZUV4aXN0aW5nQ29uZGl0aW9uWWVzID0gJCgnI3ByZS1leGlzdGluZy1jb25kaXRpb24teWVzJyk7XG4gIGxldCAkcHJlRXhpc3RpbmdDb25kaXRpb25ObyA9ICQoJyNwcmUtZXhpc3RpbmctY29uZGl0aW9uLW5vJyk7XG4gIGxldCAkcGV0Q29uZGl0aW9uID0gJCgnI3BldC1jb25kaXRpb24nKTtcbiAgbGV0ICRjb25kaXRpb25TZWxlY3QgPSAgJCgnI2NvbmRpdGlvblNlbGVjdCcpO1xuXG4gIGxldCAkcGV0VHlwZURvZyA9ICQoJyNwZXQtdHlwZS1kb2cnKTtcbiAgbGV0ICRwZXRUeXBlQ2F0ID0gJCgnI3BldC10eXBlLWNhdCcpO1xuICBsZXQgJGNhdEluZm8gPSAkKCcjY2F0LWluZm8nKTtcbiAgbGV0ICRkb2dJbmZvID0gJCgnI2RvZy1pbmZvJyk7XG5cbiAgLy8gYmluZCBldmVudHNcbiAgJHBldFR5cGVEb2cuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRjYXRJbmZvLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGRvZ0luZm8uY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJHBldFR5cGVDYXQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRkb2dJbmZvLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGNhdEluZm8uY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJHByZUV4aXN0aW5nQ29uZGl0aW9uWWVzLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkcGV0Q29uZGl0aW9uLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gICRwcmVFeGlzdGluZ0NvbmRpdGlvbk5vLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkcGV0Q29uZGl0aW9uLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRjb25kaXRpb25TZWxlY3QuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc2VsZWN0ID0gJCgnI2NvbmRpdGlvblNlbGVjdCBvcHRpb246c2VsZWN0ZWQnKS52YWwoKTtcbiAgICAvLyBjcmVhdGUgYSBwaWxsXG4gICAgLy8gYXBwZW5kIHBpbGwgdG8gY29uZGl0aW9uIGxpc3RcbiAgICAkKCcuY29uZGl0aW9ucycpLmFwcGVuZChgPGRpdiBjbGFzcz1cInBpbGxfX2NvbmRpdGlvblwiPiR7c2VsZWN0fSA8c3BhbiBjbGFzcz1cImNsb3NlXCI+eDwvc3Bhbj48L2Rpdj5gKTtcblxuICAgIGNoZWNrRm9yQ29uZGl0aW9ucygpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JDb25kaXRpb25zICgpIHtcbiAgJCgnLnBpbGxfX2NvbmRpdGlvbiAuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IFBldCB9O1xuIiwiaW1wb3J0IHsgQ3VzdG9tU2VsZWN0IH0gZnJvbSAnLi9jb21wb25lbnRzL0N1c3RvbVNlbGVjdCc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi9jb21wb25lbnRzL0FkZHJlc3MnO1xuaW1wb3J0IHsgUGV0IH0gZnJvbSAnLi9jb21wb25lbnRzL1BldCc7XG5pbXBvcnQgeyBDb3ZlclR5cGVzIH0gZnJvbSAnLi9jb21wb25lbnRzL0NvdmVyVHlwZXMnO1xuaW1wb3J0IHsgUGF5bWVudCB9IGZyb20gJy4vY29tcG9uZW50cy9QYXltZW50JztcblxuQ3VzdG9tU2VsZWN0KCk7XG5BZGRyZXNzKCk7XG5QZXQoKTtcbkNvdmVyVHlwZXMoKTtcblBheW1lbnQoKTtcbiJdfQ==
