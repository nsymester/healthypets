(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module "Address.js"

// postcodes

function Address() {
  // cache DOM
  var $postcodeSearch = $('#customer-postcode-search');
  var $addressPostcodes = $('.address__postcodes a');
  var $addressLink = $('.address__link');

  var $postcodeResult = $('#customer-postcode-result');
  var $manualAddress = $('#customer-manual-address');
  var $address = $('#customer-address');

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
  var $lifetimeLink = $('#lifetime-link');
  var $maximumLink = $('#maximum-link');
  var $accidentLink = $('#accident-link');
  var $btnCoverLevel = $('.btn--cover-level');

  var $lifetimeCover = $('#lifetime-cover');
  var $maximumCover = $('#maximum-cover');
  var $accidentCover = $('#accident-cover');

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
    var targetHeight = $(targetId).height() - 100;
    // let documentHeight = $(document).height();
    $('html, body').animate({ scrollTop: targetHeight });

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
    if (originalSelect.getAttribute('id') === 'condition-select') {
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

  var $directDebitDetails = $('#direct-debit-details');
  var $paymentType = $('#payment-type');
  var $creditCardDetails = $('#credit-card-details');

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
  var $conditionSelect = $('#condition-select');

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
    var select = $('#condition-select option:selected').val();
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

// import { Modal } from './components/Modal';

// Utils();
// window.log = log;

(0, _CustomSelect.CustomSelect)(); // import { log } from './components/Utils';

(0, _Address.Address)();
(0, _Pet.Pet)();
(0, _CoverTypes.CoverTypes)();
(0, _Payment.Payment)();
// Modal();

},{"./components/Address":1,"./components/CoverTypes":2,"./components/CustomSelect":3,"./components/Payment":4,"./components/Pet":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0FkZHJlc3MuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0NvdmVyVHlwZXMuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0N1c3RvbVNlbGVjdC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGF5bWVudC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGV0LmpzIiwic3JjL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBOztBQUVBOztBQUVBLFNBQVMsT0FBVCxHQUFvQjtBQUNsQjtBQUNBLE1BQUksa0JBQWtCLEVBQUUsMkJBQUYsQ0FBdEI7QUFDQSxNQUFJLG9CQUFvQixFQUFFLHVCQUFGLENBQXhCO0FBQ0EsTUFBSSxlQUFlLEVBQUUsZ0JBQUYsQ0FBbkI7O0FBRUEsTUFBSSxrQkFBa0IsRUFBRSwyQkFBRixDQUF0QjtBQUNBLE1BQUksaUJBQWlCLEVBQUUsMEJBQUYsQ0FBckI7QUFDQSxNQUFJLFdBQVcsRUFBRSxtQkFBRixDQUFmOztBQUVBO0FBQ0Esa0JBQWdCLEtBQWhCLENBQXNCLFVBQVUsR0FBVixFQUFlO0FBQ25DLFFBQUksY0FBSjtBQUNBLG9CQUFnQixRQUFoQixDQUF5QixRQUF6QjtBQUNBLG1CQUFlLFFBQWYsQ0FBd0IsTUFBeEI7QUFDQSxhQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDRCxHQUxEOztBQU9BLG9CQUFrQixFQUFsQixDQUFxQixPQUFyQixFQUE4QixVQUFVLEdBQVYsRUFBZTtBQUMzQyxRQUFJLGNBQUo7QUFDQSxhQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDQSxvQkFBZ0IsUUFBaEIsQ0FBeUIsTUFBekI7QUFDQSxtQkFBZSxRQUFmLENBQXdCLE1BQXhCO0FBQ0QsR0FMRDs7QUFPQSxlQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsVUFB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LE9BQWhDLEVBQXlDLFVBQVUsR0FBVixFQUFlO0FBQ3RELFFBQUksY0FBSjtBQUNBLFFBQUksYUFBSixDQUFrQixVQUFsQixDQUE2QixNQUE3QjtBQUNELEdBSEQ7QUFJRDs7UUFFUSxHLEdBQUEsRzs7Ozs7QUNoRFQ7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQyxDQVpBOztBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBtb2R1bGUgXCJBZGRyZXNzLmpzXCJcblxuLy8gcG9zdGNvZGVzXG5cbmZ1bmN0aW9uIEFkZHJlc3MgKCkge1xuICAvLyBjYWNoZSBET01cbiAgbGV0ICRwb3N0Y29kZVNlYXJjaCA9ICQoJyNjdXN0b21lci1wb3N0Y29kZS1zZWFyY2gnKTtcbiAgbGV0ICRhZGRyZXNzUG9zdGNvZGVzID0gJCgnLmFkZHJlc3NfX3Bvc3Rjb2RlcyBhJyk7XG4gIGxldCAkYWRkcmVzc0xpbmsgPSAkKCcuYWRkcmVzc19fbGluaycpO1xuXG4gIGxldCAkcG9zdGNvZGVSZXN1bHQgPSAkKCcjY3VzdG9tZXItcG9zdGNvZGUtcmVzdWx0Jyk7XG4gIGxldCAkbWFudWFsQWRkcmVzcyA9ICQoJyNjdXN0b21lci1tYW51YWwtYWRkcmVzcycpO1xuICBsZXQgJGFkZHJlc3MgPSAkKCcjY3VzdG9tZXItYWRkcmVzcycpO1xuXG4gIC8vIGJpbmQgZXZlbnRzXG4gICRwb3N0Y29kZVNlYXJjaC5jbGljayhmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJHBvc3Rjb2RlUmVzdWx0LmNvbGxhcHNlKCd0b2dnbGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRhZGRyZXNzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRhZGRyZXNzUG9zdGNvZGVzLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkYWRkcmVzcy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRwb3N0Y29kZVJlc3VsdC5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRtYW51YWxBZGRyZXNzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRhZGRyZXNzTGluay5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQWRkcmVzcyB9O1xuIiwiLy8gbW9kdWxlIFwiQ292ZXJUeXBlcy5qc1wiXG5cbmZ1bmN0aW9uIENvdmVyVHlwZXMgKCkge1xuICAvLyBjYWNoZSBET01cbiAgbGV0ICRsaWZldGltZUxpbmsgPSAkKCcjbGlmZXRpbWUtbGluaycpO1xuICBsZXQgJG1heGltdW1MaW5rID0gJCgnI21heGltdW0tbGluaycpO1xuICBsZXQgJGFjY2lkZW50TGluayA9ICQoJyNhY2NpZGVudC1saW5rJyk7XG4gIGxldCAkYnRuQ292ZXJMZXZlbCA9ICQoJy5idG4tLWNvdmVyLWxldmVsJyk7XG5cbiAgbGV0ICRsaWZldGltZUNvdmVyID0gJCgnI2xpZmV0aW1lLWNvdmVyJyk7XG4gIGxldCAkbWF4aW11bUNvdmVyID0gJCgnI21heGltdW0tY292ZXInKTtcbiAgbGV0ICRhY2NpZGVudENvdmVyID0gJCgnI2FjY2lkZW50LWNvdmVyJyk7XG5cbiAgJGxpZmV0aW1lTGluay5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJG1heGltdW1MaW5rLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkbGlmZXRpbWVDb3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRtYXhpbXVtQ292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkYWNjaWRlbnRDb3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWNjaWRlbnRMaW5rLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkbGlmZXRpbWVDb3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRtYXhpbXVtQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkYWNjaWRlbnRDb3Zlci5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAvLyBiaW5kIEV2ZW50c1xuXG4gIC8vIHN0b3Agd2ViIHBhZ2UgZnJvbSBzY3JvbGxpbmcgdG8gdG9wIHdoZW4gbGluayBpcyBjbGlja2VkIHRoYXQgdHJpZ2dlcnMgSmF2YVNjcmlwdFxuICAkYnRuQ292ZXJMZXZlbC5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyB0YXJnZXQgaWRcbiAgICBsZXQgdGFyZ2V0SWQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xuICAgIGxldCB0YXJnZXRIZWlnaHQgPSAgJCh0YXJnZXRJZCkuaGVpZ2h0KCkgLSAxMDA7XG4gICAgLy8gbGV0IGRvY3VtZW50SGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KCk7XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRhcmdldEhlaWdodCB9KTtcblxuICAgIGlmICh0aGlzLmlubmVySFRNTCA9PT0gJ0Nob29zZSBsZXZlbCcpIHtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gJ0hpZGUgbGV2ZWxzJztcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdidG4tLW91dGxpbmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbm5lckhUTUwgPSAnQ2hvb3NlIGxldmVsJztcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2J0bi0tb3V0bGluZScpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgeyBDb3ZlclR5cGVzIH07XG4iLCIvLyBtb2R1bGUgXCJDdXN0b21TZWxlY3QuanNcIlxuXG5mdW5jdGlvbiBDdXN0b21TZWxlY3QgKCkge1xuICB2YXIgc2VsZWN0QWx0LCBpLCBqLCBzZWxFbGVtZW50LCBzZWxlY3RlZEl0ZW0sIG9wdGlvbkxpc3QsIG9wdGlvbkl0ZW07XG5cbiAgLy8gY2FjaGUgRE9NXG4gIC8qIGxvb2sgZm9yIGFueSBlbGVtZW50cyB3aXRoIHRoZSBjbGFzcyBcInNlbGVjdC0tYWx0XCI6ICovXG4gIHNlbGVjdEFsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC0tYWx0Jyk7XG5cbiAgLy8gYmluZCBFdmVudHNcbiAgZm9yIChpID0gMDsgaSA8IHNlbGVjdEFsdC5sZW5ndGg7IGkrKykge1xuICAgIHNlbEVsZW1lbnQgPSBzZWxlY3RBbHRbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NlbGVjdCcpWzBdO1xuXG4gICAgLyogZm9yIGVhY2ggZWxlbWVudCwgY3JlYXRlIGEgbmV3IERJViB0aGF0IHdpbGwgYWN0IGFzIHRoZSBzZWxlY3RlZCBpdGVtOiAqL1xuICAgIHNlbGVjdGVkSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIHNlbGVjdGVkSXRlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NlbGVjdC1zZWxlY3RlZCcpO1xuICAgIHNlbGVjdGVkSXRlbS5pbm5lckhUTUwgPSBzZWxFbGVtZW50Lm9wdGlvbnNbc2VsRWxlbWVudC5zZWxlY3RlZEluZGV4XS5pbm5lckhUTUw7XG5cbiAgICBzZWxlY3RBbHRbaV0uYXBwZW5kQ2hpbGQoc2VsZWN0ZWRJdGVtKTtcblxuICAgIC8qIGZvciBlYWNoIGVsZW1lbnQsIGNyZWF0ZSBhIG5ldyBESVYgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIG9wdGlvbiBsaXN0OiAqL1xuICAgIG9wdGlvbkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBvcHRpb25MaXN0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2VsZWN0LWl0ZW1zIHNlbGVjdC1oaWRlJyk7XG5cbiAgICBmb3IgKGogPSAxOyBqIDwgc2VsRWxlbWVudC5sZW5ndGg7IGorKykge1xuICAgICAgLyogZm9yIGVhY2ggb3B0aW9uIGluIHRoZSBvcmlnaW5hbCBzZWxlY3QgZWxlbWVudCxcbiAgICAgIGNyZWF0ZSBhIG5ldyBESVYgdGhhdCB3aWxsIGFjdCBhcyBhbiBvcHRpb24gaXRlbTogKi9cbiAgICAgIG9wdGlvbkl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgIG9wdGlvbkl0ZW0uaW5uZXJIVE1MID0gc2VsRWxlbWVudC5vcHRpb25zW2pdLmlubmVySFRNTDtcbiAgICAgIG9wdGlvbkl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzeW5jT3B0aW9uU2VsZWN0ZWQpO1xuXG4gICAgICBvcHRpb25MaXN0LmFwcGVuZENoaWxkKG9wdGlvbkl0ZW0pO1xuICAgIH1cblxuICAgIHNlbGVjdEFsdFtpXS5hcHBlbmRDaGlsZChvcHRpb25MaXN0KTtcblxuICAgIHNlbGVjdGVkSXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlT3RoZXJPcHRpb25zKTtcbiAgfVxuXG4gIC8vIG1ldGhvZHNcbiAgZnVuY3Rpb24gc3luY09wdGlvblNlbGVjdGVkIChlKSB7XG4gICAgLyogd2hlbiBhbiBpdGVtIGlzIGNsaWNrZWQsIHVwZGF0ZSB0aGUgb3JpZ2luYWwgc2VsZWN0IGJveCxcbiAgICBhbmQgdGhlIHNlbGVjdGVkIGl0ZW06ICovXG4gICAgdmFyIHksIGksIGssIG9yaWdpbmFsU2VsZWN0LCBoO1xuICAgIG9yaWdpbmFsU2VsZWN0ID0gdGhpcy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NlbGVjdCcpWzBdO1xuXG4gICAgLy8gc3RvcmUgdGhlIHNlbGVjdGVkIGl0ZW1cbiAgICBoID0gdGhpcy5wYXJlbnROb2RlLnByZXZpb3VzU2libGluZztcbiAgICBmb3IgKGkgPSAwOyBpIDwgb3JpZ2luYWxTZWxlY3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChvcmlnaW5hbFNlbGVjdC5vcHRpb25zW2ldLmlubmVySFRNTCA9PT0gdGhpcy5pbm5lckhUTUwpIHtcbiAgICAgICAgb3JpZ2luYWxTZWxlY3Quc2VsZWN0ZWRJbmRleCA9IGk7XG4gICAgICAgIGguaW5uZXJIVE1MID0gdGhpcy5pbm5lckhUTUw7XG4gICAgICAgIHkgPSB0aGlzLnBhcmVudE5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2FtZS1hcy1zZWxlY3RlZCcpO1xuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgeS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIHlba10ucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzYW1lLWFzLXNlbGVjdGVkJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBoLmNsaWNrKCk7XG4gICAgaWYgKG9yaWdpbmFsU2VsZWN0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PT0gJ2NvbmRpdGlvbi1zZWxlY3QnKSB7XG4gICAgICAkKCcuY29uZGl0aW9ucycpLmFwcGVuZChgPGRpdiBjbGFzcz0ncGlsbF9fY29uZGl0aW9uJz4ke2guaW5uZXJIVE1MfSA8c3BhbiBjbGFzcz0nY2xvc2UnPng8L3NwYW4+PC9kaXY+YCk7XG4gICAgICBjaGVja0ZvckNvbmRpdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICAvKiBpZiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgb3V0c2lkZSB0aGUgc2VsZWN0IGJveCxcbiAgdGhlbiBjbG9zZSBhbGwgc2VsZWN0IGJveGVzOiAqL1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlQWxsU2VsZWN0KTtcbn1cblxuZnVuY3Rpb24gY2xvc2VPdGhlck9wdGlvbnMgKGUpIHtcbiAgLyogd2hlbiB0aGUgc2VsZWN0IGJveCBpcyBjbGlja2VkLCBjbG9zZSBhbnkgb3RoZXIgc2VsZWN0IGJveGVzLFxuICBhbmQgb3Blbi9jbG9zZSB0aGUgY3VycmVudCBzZWxlY3QgYm94OiAqL1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBjbG9zZUFsbFNlbGVjdCh0aGlzKTtcbiAgdGhpcy5uZXh0U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3QtaGlkZScpO1xuICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdC1hcnJvdy1hY3RpdmUnKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VBbGxTZWxlY3QgKGVsbW50KSB7XG4gIC8qIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNsb3NlIGFsbCBzZWxlY3QgYm94ZXMgaW4gdGhlIGRvY3VtZW50LFxuICBleGNlcHQgdGhlIGN1cnJlbnQgc2VsZWN0IGJveDogKi9cbiAgdmFyIHgsIHksIGksIGFyck5vID0gW107XG4gIHggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtaXRlbXMnKTtcbiAgeSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1zZWxlY3RlZCcpO1xuICBmb3IgKGkgPSAwOyBpIDwgeS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlbG1udCA9PSB5W2ldKSB7XG4gICAgICBhcnJOby5wdXNoKGkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHlbaV0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0LWFycm93LWFjdGl2ZScpO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJOby5pbmRleE9mKGkpKSB7XG4gICAgICB4W2ldLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdC1oaWRlJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yQ29uZGl0aW9ucyAoKSB7XG4gICQoJy5waWxsX19jb25kaXRpb24gLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBDdXN0b21TZWxlY3QgfTtcbiIsIi8vIG1vZHVsZSBcIlBheW1lbnQuanNcIlxuXG5mdW5jdGlvbiBQYXltZW50ICgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGxldCAkcmVndWxhclBheU1vbnRobHkgPSAkKCcjcmVndWxhci1wYXktbW9udGhseScpO1xuICBsZXQgJHJlZ3VsYXJQYXlBbm51YWxseSA9ICQoJyNyZWd1bGFyLXBheS1hbm51YWxseScpO1xuICBsZXQgJHBheW1lbnRUeXBlRGViaXQgPSAkKCcjcGF5bWVudC10eXBlLWRlYml0Jyk7XG4gIGxldCAkcGF5bWVudFR5cGVDcmVkaXQgPSAkKCcjcGF5bWVudC10eXBlLWNyZWRpdCcpO1xuXG4gIGxldCAkZGlyZWN0RGViaXREZXRhaWxzID0gJCgnI2RpcmVjdC1kZWJpdC1kZXRhaWxzJyk7XG4gIGxldCAkcGF5bWVudFR5cGUgPSAkKCcjcGF5bWVudC10eXBlJyk7XG4gIGxldCAkY3JlZGl0Q2FyZERldGFpbHMgPSAkKCcjY3JlZGl0LWNhcmQtZGV0YWlscycpO1xuXG4gIC8vIGJpbmQgZXZlbnRzXG4gICRyZWd1bGFyUGF5TW9udGhseS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGRpcmVjdERlYml0RGV0YWlscy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRwYXltZW50VHlwZS5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkcmVndWxhclBheUFubnVhbGx5LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkcGF5bWVudFR5cGUuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkZGlyZWN0RGViaXREZXRhaWxzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRwYXltZW50VHlwZURlYml0LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkZGlyZWN0RGViaXREZXRhaWxzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGNyZWRpdENhcmREZXRhaWxzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRwYXltZW50VHlwZUNyZWRpdC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGNyZWRpdENhcmREZXRhaWxzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGRpcmVjdERlYml0RGV0YWlscy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgUGF5bWVudCB9O1xuIiwiLy8gbW9kdWxlIFwiUGV0LmpzXCJcblxuZnVuY3Rpb24gUGV0ICgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGxldCAkcHJlRXhpc3RpbmdDb25kaXRpb25ZZXMgPSAkKCcjcHJlLWV4aXN0aW5nLWNvbmRpdGlvbi15ZXMnKTtcbiAgbGV0ICRwcmVFeGlzdGluZ0NvbmRpdGlvbk5vID0gJCgnI3ByZS1leGlzdGluZy1jb25kaXRpb24tbm8nKTtcbiAgbGV0ICRwZXRDb25kaXRpb24gPSAkKCcjcGV0LWNvbmRpdGlvbicpO1xuICBsZXQgJGNvbmRpdGlvblNlbGVjdCA9ICAkKCcjY29uZGl0aW9uLXNlbGVjdCcpO1xuXG4gIGxldCAkcGV0VHlwZURvZyA9ICQoJyNwZXQtdHlwZS1kb2cnKTtcbiAgbGV0ICRwZXRUeXBlQ2F0ID0gJCgnI3BldC10eXBlLWNhdCcpO1xuICBsZXQgJGNhdEluZm8gPSAkKCcjY2F0LWluZm8nKTtcbiAgbGV0ICRkb2dJbmZvID0gJCgnI2RvZy1pbmZvJyk7XG5cbiAgLy8gYmluZCBldmVudHNcbiAgJHBldFR5cGVEb2cuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRjYXRJbmZvLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGRvZ0luZm8uY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJHBldFR5cGVDYXQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRkb2dJbmZvLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGNhdEluZm8uY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJHByZUV4aXN0aW5nQ29uZGl0aW9uWWVzLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkcGV0Q29uZGl0aW9uLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gICRwcmVFeGlzdGluZ0NvbmRpdGlvbk5vLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkcGV0Q29uZGl0aW9uLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRjb25kaXRpb25TZWxlY3QuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc2VsZWN0ID0gJCgnI2NvbmRpdGlvbi1zZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykudmFsKCk7XG4gICAgLy8gY3JlYXRlIGEgcGlsbFxuICAgIC8vIGFwcGVuZCBwaWxsIHRvIGNvbmRpdGlvbiBsaXN0XG4gICAgJCgnLmNvbmRpdGlvbnMnKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJwaWxsX19jb25kaXRpb25cIj4ke3NlbGVjdH0gPHNwYW4gY2xhc3M9XCJjbG9zZVwiPng8L3NwYW4+PC9kaXY+YCk7XG5cbiAgICBjaGVja0ZvckNvbmRpdGlvbnMoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yQ29uZGl0aW9ucyAoKSB7XG4gICQoJy5waWxsX19jb25kaXRpb24gLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBQZXQgfTtcbiIsIi8vIGltcG9ydCB7IGxvZyB9IGZyb20gJy4vY29tcG9uZW50cy9VdGlscyc7XG5cbmltcG9ydCB7IEN1c3RvbVNlbGVjdCB9IGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21TZWxlY3QnO1xuaW1wb3J0IHsgQWRkcmVzcyB9IGZyb20gJy4vY29tcG9uZW50cy9BZGRyZXNzJztcbmltcG9ydCB7IFBldCB9IGZyb20gJy4vY29tcG9uZW50cy9QZXQnO1xuaW1wb3J0IHsgQ292ZXJUeXBlcyB9IGZyb20gJy4vY29tcG9uZW50cy9Db3ZlclR5cGVzJztcbmltcG9ydCB7IFBheW1lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvUGF5bWVudCc7XG4vLyBpbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vY29tcG9uZW50cy9Nb2RhbCc7XG5cbi8vIFV0aWxzKCk7XG4vLyB3aW5kb3cubG9nID0gbG9nO1xuXG5DdXN0b21TZWxlY3QoKTtcbkFkZHJlc3MoKTtcblBldCgpO1xuQ292ZXJUeXBlcygpO1xuUGF5bWVudCgpO1xuLy8gTW9kYWwoKTtcbiJdfQ==
