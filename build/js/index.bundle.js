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

(0, _CustomSelect.CustomSelect)();
(0, _Address.Address)();
(0, _Pet.Pet)();
(0, _CoverTypes.CoverTypes)();
(0, _Payment.Payment)();

},{"./components/Address":1,"./components/CoverTypes":2,"./components/CustomSelect":3,"./components/Payment":4,"./components/Pet":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0FkZHJlc3MuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0NvdmVyVHlwZXMuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0N1c3RvbVNlbGVjdC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGF5bWVudC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGV0LmpzIiwic3JjL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBOztBQUVBOztBQUVBLFNBQVMsT0FBVCxHQUFvQjtBQUNsQjtBQUNBLE1BQUksa0JBQWtCLEVBQUUsMkJBQUYsQ0FBdEI7QUFDQSxNQUFJLG9CQUFvQixFQUFFLHVCQUFGLENBQXhCO0FBQ0EsTUFBSSxlQUFlLEVBQUUsZ0JBQUYsQ0FBbkI7O0FBRUEsTUFBSSxrQkFBa0IsRUFBRSwyQkFBRixDQUF0QjtBQUNBLE1BQUksaUJBQWlCLEVBQUUsMEJBQUYsQ0FBckI7QUFDQSxNQUFJLFdBQVcsRUFBRSxtQkFBRixDQUFmOztBQUVBO0FBQ0Esa0JBQWdCLEtBQWhCLENBQXNCLFVBQVUsR0FBVixFQUFlO0FBQ25DLFFBQUksY0FBSjtBQUNBLG9CQUFnQixRQUFoQixDQUF5QixRQUF6QjtBQUNBLG1CQUFlLFFBQWYsQ0FBd0IsTUFBeEI7QUFDQSxhQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDRCxHQUxEOztBQU9BLG9CQUFrQixFQUFsQixDQUFxQixPQUFyQixFQUE4QixVQUFVLEdBQVYsRUFBZTtBQUMzQyxRQUFJLGNBQUo7QUFDQSxhQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDQSxvQkFBZ0IsUUFBaEIsQ0FBeUIsTUFBekI7QUFDQSxtQkFBZSxRQUFmLENBQXdCLE1BQXhCO0FBQ0QsR0FMRDs7QUFPQSxlQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsVUFB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QUFULEdBQStCO0FBQzdCLElBQUUseUJBQUYsRUFBNkIsRUFBN0IsQ0FBZ0MsT0FBaEMsRUFBeUMsVUFBVSxHQUFWLEVBQWU7QUFDdEQsUUFBSSxjQUFKO0FBQ0EsUUFBSSxhQUFKLENBQWtCLFVBQWxCLENBQTZCLE1BQTdCO0FBQ0QsR0FIRDtBQUlEOztRQUVRLEcsR0FBQSxHOzs7OztBQ2xEVDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gbW9kdWxlIFwiQWRkcmVzcy5qc1wiXG5cbi8vIHBvc3Rjb2Rlc1xuXG5mdW5jdGlvbiBBZGRyZXNzICgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGxldCAkcG9zdGNvZGVTZWFyY2ggPSAkKCcjY3VzdG9tZXItcG9zdGNvZGUtc2VhcmNoJyk7XG4gIGxldCAkYWRkcmVzc1Bvc3Rjb2RlcyA9ICQoJy5hZGRyZXNzX19wb3N0Y29kZXMgYScpO1xuICBsZXQgJGFkZHJlc3NMaW5rID0gJCgnLmFkZHJlc3NfX2xpbmsnKTtcblxuICBsZXQgJHBvc3Rjb2RlUmVzdWx0ID0gJCgnI2N1c3RvbWVyLXBvc3Rjb2RlLXJlc3VsdCcpO1xuICBsZXQgJG1hbnVhbEFkZHJlc3MgPSAkKCcjY3VzdG9tZXItbWFudWFsLWFkZHJlc3MnKTtcbiAgbGV0ICRhZGRyZXNzID0gJCgnI2N1c3RvbWVyLWFkZHJlc3MnKTtcblxuICAvLyBiaW5kIGV2ZW50c1xuICAkcG9zdGNvZGVTZWFyY2guY2xpY2soZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICRwb3N0Y29kZVJlc3VsdC5jb2xsYXBzZSgndG9nZ2xlJyk7XG4gICAgJG1hbnVhbEFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkYWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWRkcmVzc1Bvc3Rjb2Rlcy5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWRkcmVzc0xpbmsub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICRhZGRyZXNzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJHBvc3Rjb2RlUmVzdWx0LmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJG1hbnVhbEFkZHJlc3MuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEFkZHJlc3MgfTtcbiIsIi8vIG1vZHVsZSBcIkNvdmVyVHlwZXMuanNcIlxuXG5mdW5jdGlvbiBDb3ZlclR5cGVzICgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGxldCAkbGlmZXRpbWVMaW5rID0gJCgnI2xpZmV0aW1lLWxpbmsnKTtcbiAgbGV0ICRtYXhpbXVtTGluayA9ICQoJyNtYXhpbXVtLWxpbmsnKTtcbiAgbGV0ICRhY2NpZGVudExpbmsgPSAkKCcjYWNjaWRlbnQtbGluaycpO1xuICBsZXQgJGJ0bkNvdmVyTGV2ZWwgPSAkKCcuYnRuLS1jb3Zlci1sZXZlbCcpO1xuXG4gIGxldCAkbGlmZXRpbWVDb3ZlciA9ICQoJyNsaWZldGltZS1jb3ZlcicpO1xuICBsZXQgJG1heGltdW1Db3ZlciA9ICQoJyNtYXhpbXVtLWNvdmVyJyk7XG4gIGxldCAkYWNjaWRlbnRDb3ZlciA9ICQoJyNhY2NpZGVudC1jb3ZlcicpO1xuXG4gICRsaWZldGltZUxpbmsuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRsaWZldGltZUNvdmVyLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJG1heGltdW1Db3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRhY2NpZGVudENvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRtYXhpbXVtTGluay5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJGFjY2lkZW50TGluay5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gYmluZCBFdmVudHNcblxuICAvLyBzdG9wIHdlYiBwYWdlIGZyb20gc2Nyb2xsaW5nIHRvIHRvcCB3aGVuIGxpbmsgaXMgY2xpY2tlZCB0aGF0IHRyaWdnZXJzIEphdmFTY3JpcHRcbiAgJGJ0bkNvdmVyTGV2ZWwuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gdGFyZ2V0IGlkXG4gICAgbGV0IHRhcmdldElkID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcbiAgICBsZXQgdGFyZ2V0SGVpZ2h0ID0gICQodGFyZ2V0SWQpLmhlaWdodCgpO1xuICAgIGxldCBkb2N1bWVudEhlaWdodCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBkb2N1bWVudEhlaWdodCB9LCB0YXJnZXRIZWlnaHQpO1xuXG4gICAgaWYgKHRoaXMuaW5uZXJIVE1MID09PSAnQ2hvb3NlIGxldmVsJykge1xuICAgICAgdGhpcy5pbm5lckhUTUwgPSAnSGlkZSBsZXZlbHMnO1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2J0bi0tb3V0bGluZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlubmVySFRNTCA9ICdDaG9vc2UgbGV2ZWwnO1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYnRuLS1vdXRsaW5lJyk7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCB7IENvdmVyVHlwZXMgfTtcbiIsIi8vIG1vZHVsZSBcIkN1c3RvbVNlbGVjdC5qc1wiXG5cbmZ1bmN0aW9uIEN1c3RvbVNlbGVjdCAoKSB7XG4gIHZhciBzZWxlY3RBbHQsIGksIGosIHNlbEVsZW1lbnQsIHNlbGVjdGVkSXRlbSwgb3B0aW9uTGlzdCwgb3B0aW9uSXRlbTtcblxuICAvLyBjYWNoZSBET01cbiAgLyogbG9vayBmb3IgYW55IGVsZW1lbnRzIHdpdGggdGhlIGNsYXNzIFwic2VsZWN0LS1hbHRcIjogKi9cbiAgc2VsZWN0QWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LS1hbHQnKTtcblxuICAvLyBiaW5kIEV2ZW50c1xuICBmb3IgKGkgPSAwOyBpIDwgc2VsZWN0QWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgc2VsRWxlbWVudCA9IHNlbGVjdEFsdFtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2VsZWN0JylbMF07XG5cbiAgICAvKiBmb3IgZWFjaCBlbGVtZW50LCBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBhY3QgYXMgdGhlIHNlbGVjdGVkIGl0ZW06ICovXG4gICAgc2VsZWN0ZWRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgc2VsZWN0ZWRJdGVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2VsZWN0LXNlbGVjdGVkJyk7XG4gICAgc2VsZWN0ZWRJdGVtLmlubmVySFRNTCA9IHNlbEVsZW1lbnQub3B0aW9uc1tzZWxFbGVtZW50LnNlbGVjdGVkSW5kZXhdLmlubmVySFRNTDtcblxuICAgIHNlbGVjdEFsdFtpXS5hcHBlbmRDaGlsZChzZWxlY3RlZEl0ZW0pO1xuXG4gICAgLyogZm9yIGVhY2ggZWxlbWVudCwgY3JlYXRlIGEgbmV3IERJViB0aGF0IHdpbGwgY29udGFpbiB0aGUgb3B0aW9uIGxpc3Q6ICovXG4gICAgb3B0aW9uTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIG9wdGlvbkxpc3Quc2V0QXR0cmlidXRlKCdjbGFzcycsICdzZWxlY3QtaXRlbXMgc2VsZWN0LWhpZGUnKTtcblxuICAgIGZvciAoaiA9IDE7IGogPCBzZWxFbGVtZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAvKiBmb3IgZWFjaCBvcHRpb24gaW4gdGhlIG9yaWdpbmFsIHNlbGVjdCBlbGVtZW50LFxuICAgICAgY3JlYXRlIGEgbmV3IERJViB0aGF0IHdpbGwgYWN0IGFzIGFuIG9wdGlvbiBpdGVtOiAqL1xuICAgICAgb3B0aW9uSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgb3B0aW9uSXRlbS5pbm5lckhUTUwgPSBzZWxFbGVtZW50Lm9wdGlvbnNbal0uaW5uZXJIVE1MO1xuICAgICAgb3B0aW9uSXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN5bmNPcHRpb25TZWxlY3RlZCk7XG5cbiAgICAgIG9wdGlvbkxpc3QuYXBwZW5kQ2hpbGQob3B0aW9uSXRlbSk7XG4gICAgfVxuXG4gICAgc2VsZWN0QWx0W2ldLmFwcGVuZENoaWxkKG9wdGlvbkxpc3QpO1xuXG4gICAgc2VsZWN0ZWRJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VPdGhlck9wdGlvbnMpO1xuICB9XG5cbiAgLy8gbWV0aG9kc1xuICBmdW5jdGlvbiBzeW5jT3B0aW9uU2VsZWN0ZWQgKGUpIHtcbiAgICAvKiB3aGVuIGFuIGl0ZW0gaXMgY2xpY2tlZCwgdXBkYXRlIHRoZSBvcmlnaW5hbCBzZWxlY3QgYm94LFxuICAgIGFuZCB0aGUgc2VsZWN0ZWQgaXRlbTogKi9cbiAgICB2YXIgeSwgaSwgaywgb3JpZ2luYWxTZWxlY3QsIGg7XG4gICAgb3JpZ2luYWxTZWxlY3QgPSB0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2VsZWN0JylbMF07XG5cbiAgICAvLyBzdG9yZSB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgIGggPSB0aGlzLnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nO1xuICAgIGZvciAoaSA9IDA7IGkgPCBvcmlnaW5hbFNlbGVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG9yaWdpbmFsU2VsZWN0Lm9wdGlvbnNbaV0uaW5uZXJIVE1MID09PSB0aGlzLmlubmVySFRNTCkge1xuICAgICAgICBvcmlnaW5hbFNlbGVjdC5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgaC5pbm5lckhUTUwgPSB0aGlzLmlubmVySFRNTDtcbiAgICAgICAgeSA9IHRoaXMucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzYW1lLWFzLXNlbGVjdGVkJyk7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCB5Lmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgeVtrXS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NhbWUtYXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGguY2xpY2soKTtcbiAgICBpZiAob3JpZ2luYWxTZWxlY3QuZ2V0QXR0cmlidXRlKCdpZCcpID09PSAnY29uZGl0aW9uLXNlbGVjdCcpIHtcbiAgICAgICQoJy5jb25kaXRpb25zJykuYXBwZW5kKGA8ZGl2IGNsYXNzPSdwaWxsX19jb25kaXRpb24nPiR7aC5pbm5lckhUTUx9IDxzcGFuIGNsYXNzPSdjbG9zZSc+eDwvc3Bhbj48L2Rpdj5gKTtcbiAgICAgIGNoZWNrRm9yQ29uZGl0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGlmIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIHRoZSBzZWxlY3QgYm94LFxuICB0aGVuIGNsb3NlIGFsbCBzZWxlY3QgYm94ZXM6ICovXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VBbGxTZWxlY3QpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU90aGVyT3B0aW9ucyAoZSkge1xuICAvKiB3aGVuIHRoZSBzZWxlY3QgYm94IGlzIGNsaWNrZWQsIGNsb3NlIGFueSBvdGhlciBzZWxlY3QgYm94ZXMsXG4gIGFuZCBvcGVuL2Nsb3NlIHRoZSBjdXJyZW50IHNlbGVjdCBib3g6ICovXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGNsb3NlQWxsU2VsZWN0KHRoaXMpO1xuICB0aGlzLm5leHRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdC1oaWRlJyk7XG4gIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0LWFycm93LWFjdGl2ZScpO1xufVxuXG5mdW5jdGlvbiBjbG9zZUFsbFNlbGVjdCAoZWxtbnQpIHtcbiAgLyogYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2xvc2UgYWxsIHNlbGVjdCBib3hlcyBpbiB0aGUgZG9jdW1lbnQsXG4gIGV4Y2VwdCB0aGUgY3VycmVudCBzZWxlY3QgYm94OiAqL1xuICB2YXIgeCwgeSwgaSwgYXJyTm8gPSBbXTtcbiAgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1pdGVtcycpO1xuICB5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LXNlbGVjdGVkJyk7XG4gIGZvciAoaSA9IDA7IGkgPCB5Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVsbW50ID09IHlbaV0pIHtcbiAgICAgIGFyck5vLnB1c2goaSlcbiAgICB9IGVsc2Uge1xuICAgICAgeVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QtYXJyb3ctYWN0aXZlJyk7XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFyck5vLmluZGV4T2YoaSkpIHtcbiAgICAgIHhbaV0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0LWhpZGUnKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JDb25kaXRpb25zICgpIHtcbiAgJCgnLnBpbGxfX2NvbmRpdGlvbiAuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEN1c3RvbVNlbGVjdCB9O1xuIiwiLy8gbW9kdWxlIFwiUGF5bWVudC5qc1wiXG5cbmZ1bmN0aW9uIFBheW1lbnQgKCkge1xuICAvLyBjYWNoZSBET01cbiAgbGV0ICRyZWd1bGFyUGF5TW9udGhseSA9ICQoJyNyZWd1bGFyLXBheS1tb250aGx5Jyk7XG4gIGxldCAkcmVndWxhclBheUFubnVhbGx5ID0gJCgnI3JlZ3VsYXItcGF5LWFubnVhbGx5Jyk7XG4gIGxldCAkcGF5bWVudFR5cGVEZWJpdCA9ICQoJyNwYXltZW50LXR5cGUtZGViaXQnKTtcbiAgbGV0ICRwYXltZW50VHlwZUNyZWRpdCA9ICQoJyNwYXltZW50LXR5cGUtY3JlZGl0Jyk7XG5cbiAgbGV0ICRkaXJlY3REZWJpdERldGFpbHMgPSAkKCcjZGlyZWN0LWRlYml0LWRldGFpbHMnKTtcbiAgbGV0ICRwYXltZW50VHlwZSA9ICQoJyNwYXltZW50LXR5cGUnKTtcbiAgbGV0ICRjcmVkaXRDYXJkRGV0YWlscyA9ICQoJyNjcmVkaXQtY2FyZC1kZXRhaWxzJyk7XG5cbiAgLy8gYmluZCBldmVudHNcbiAgJHJlZ3VsYXJQYXlNb250aGx5LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkZGlyZWN0RGViaXREZXRhaWxzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJHBheW1lbnRUeXBlLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRyZWd1bGFyUGF5QW5udWFsbHkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRwYXltZW50VHlwZS5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJHBheW1lbnRUeXBlRGViaXQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkY3JlZGl0Q2FyZERldGFpbHMuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJHBheW1lbnRUeXBlQ3JlZGl0LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkY3JlZGl0Q2FyZERldGFpbHMuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkZGlyZWN0RGViaXREZXRhaWxzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBQYXltZW50IH07XG4iLCIvLyBtb2R1bGUgXCJQZXQuanNcIlxuXG5mdW5jdGlvbiBQZXQgKCkge1xuICAvLyBjYWNoZSBET01cbiAgbGV0ICRwcmVFeGlzdGluZ0NvbmRpdGlvblllcyA9ICQoJyNwcmUtZXhpc3RpbmctY29uZGl0aW9uLXllcycpO1xuICBsZXQgJHByZUV4aXN0aW5nQ29uZGl0aW9uTm8gPSAkKCcjcHJlLWV4aXN0aW5nLWNvbmRpdGlvbi1ubycpO1xuICBsZXQgJHBldENvbmRpdGlvbiA9ICQoJyNwZXQtY29uZGl0aW9uJyk7XG4gIGxldCAkY29uZGl0aW9uU2VsZWN0ID0gICQoJyNjb25kaXRpb24tc2VsZWN0Jyk7XG5cbiAgbGV0ICRwZXRUeXBlRG9nID0gJCgnI3BldC10eXBlLWRvZycpO1xuICBsZXQgJHBldFR5cGVDYXQgPSAkKCcjcGV0LXR5cGUtY2F0Jyk7XG4gIGxldCAkY2F0SW5mbyA9ICQoJyNjYXQtaW5mbycpO1xuICBsZXQgJGRvZ0luZm8gPSAkKCcjZG9nLWluZm8nKTtcblxuICAvLyBiaW5kIGV2ZW50c1xuICAkcGV0VHlwZURvZy5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGNhdEluZm8uY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkZG9nSW5mby5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAkcGV0VHlwZUNhdC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGRvZ0luZm8uY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkY2F0SW5mby5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAkcHJlRXhpc3RpbmdDb25kaXRpb25ZZXMuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRwZXRDb25kaXRpb24uY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJHByZUV4aXN0aW5nQ29uZGl0aW9uTm8uY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRwZXRDb25kaXRpb24uY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJGNvbmRpdGlvblNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgIGxldCBzZWxlY3QgPSAkKCcjY29uZGl0aW9uLXNlbGVjdCBvcHRpb246c2VsZWN0ZWQnKS52YWwoKTtcbiAgICAvLyBjcmVhdGUgYSBwaWxsXG4gICAgLy8gYXBwZW5kIHBpbGwgdG8gY29uZGl0aW9uIGxpc3RcbiAgICAkKCcuY29uZGl0aW9ucycpLmFwcGVuZChgPGRpdiBjbGFzcz1cInBpbGxfX2NvbmRpdGlvblwiPiR7c2VsZWN0fSA8c3BhbiBjbGFzcz1cImNsb3NlXCI+eDwvc3Bhbj48L2Rpdj5gKTtcblxuICAgIGNoZWNrRm9yQ29uZGl0aW9ucygpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JDb25kaXRpb25zICgpIHtcbiAgJCgnLnBpbGxfX2NvbmRpdGlvbiAuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IFBldCB9O1xuIiwiaW1wb3J0IHsgQ3VzdG9tU2VsZWN0IH0gZnJvbSAnLi9jb21wb25lbnRzL0N1c3RvbVNlbGVjdCc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi9jb21wb25lbnRzL0FkZHJlc3MnO1xuaW1wb3J0IHsgUGV0IH0gZnJvbSAnLi9jb21wb25lbnRzL1BldCc7XG5pbXBvcnQgeyBDb3ZlclR5cGVzIH0gZnJvbSAnLi9jb21wb25lbnRzL0NvdmVyVHlwZXMnO1xuaW1wb3J0IHsgUGF5bWVudCB9IGZyb20gJy4vY29tcG9uZW50cy9QYXltZW50JztcblxuQ3VzdG9tU2VsZWN0KCk7XG5BZGRyZXNzKCk7XG5QZXQoKTtcbkNvdmVyVHlwZXMoKTtcblBheW1lbnQoKTtcbiJdfQ==
