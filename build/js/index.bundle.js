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

function CheckBankNumber(elem, nextElem) {
  var allowedKeys = [8, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 57, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

  $(elem).on('keydown', function (e) {
    return $.inArray(e.which, allowedKeys) > -1;
  });
  /* IGNORE - END */

  function deleteGoBack(that, e) {
    return that.selectionStart === 0 && $.inArray(e.which, [8, 46]) > -1;
  }

  var $sortCode = $(elem);
  var count = $sortCode.length - 1;
  var $accNo = $(nextElem);

  $sortCode.on('keyup', function (e) {

    var index = $sortCode.index(this);
    var val = this.value;

    if (val.length === this.maxLength) {
      if (index === count) {
        $accNo.focus();
      } else if (index < count) {
        $sortCode.eq(index + 1).focus();
      }
    } else if (deleteGoBack(this, e) && index !== 0) {
      $sortCode.eq(index - 1).focus();
    }
  });

  $accNo.on('keyup', function (e) {
    if (deleteGoBack(this, e)) {
      $sortCode.last().focus();
    }
  });
}

function ToggleRequiredPaymentFields() {

  if ($('input[name="regular-pay"]').length > 0) {
    // console.log("Hello Regular Pay");

    // if monthly selected
    // then check for direct debit information
    $('input[name="regular-pay"]').click(function (event) {
      if ($('#regular-pay-annually:checked').length > 0) {
        // console.log("Welcome to Annual repayments");

        // return the height of the grandprarent box set earlier when check payment wasn't selected
        $('input[name="regular-pay"]:first').parent().parent().css('height', 'auto');

        // deactivate the Direct Debit fields NOT associated with this choice
        $('#account-name').prop('required', false);
        $('#sort-code-pt1').prop('required', false);
        $('#sort-code-pt2').prop('required', false);
        $('#sort-code-pt3').prop('required', false);
        $('#account-number').prop('required', false);

        // activate the payment type fields associated with this choice
        $('input[name="payment-type"]').each(function () {
          $(this).prop('required', true);
        });

        // deactivate the Credit/Debit Card fields NOT associated with this choice
        $('#card-name').prop('required', false);
        $('#card-number-pt1').prop('required', false);
        $('#card-number-pt2').prop('required', false);
        $('#card-number-pt3').prop('required', false);
        $('#card-number-pt4').prop('required', false);
        $('#expiry-date').prop('required', false);
        $('#ccv').prop('required', false);
      }

      // set the direct debit fields to required
      if ($('#regular-pay-monthly:checked').length > 0) {
        // console.log("Welcome to Monthly repayments");

        // return the height of the grandprarent box set earlier when check payment wasn't selected
        $('input[name="regular-pay"]:first').parent().parent().css('height', 'auto');

        // activate the Direct Debit fields associated with this choice
        $('#account-name').prop('required', true);
        $('#sort-code-pt1').prop('required', true);
        $('#sort-code-pt2').prop('required', true);
        $('#sort-code-pt3').prop('required', true);
        $('#account-number').prop('required', true);

        // deactivate the payment type fields associated with this choice
        $('input[name="payment-type"]').each(function () {
          $(this).prop('required', false);
        });

        // deactivate the Credit/Debit Card fields NOT associated with this choice
        $('#card-name').prop('required', false);
        $('#card-number-pt1').prop('required', false);
        $('#card-number-pt2').prop('required', false);
        $('#card-number-pt3').prop('required', false);
        $('#card-number-pt4').prop('required', false);
        $('#expiry-date').prop('required', false);
        $('#ccv').prop('required', false);
      }
    });

    // if payment type selected
    // then check for either the direct debit or credit card information
    $('input[name="payment-type"]').click(function (event) {
      if ($('#payment-type-debit:checked').length > 0) {
        // console.log("Welcome to Direct Debit payment");

        // return the height of the grandprarent box set earlier when check payment wasn't selected
        $('input[name="payment-type"]:first').parent().parent().css('height', 'auto');

        // activate the Direct Debit fields associated with this choice
        $('#account-name').prop('required', true);
        $('#sort-code-pt1').prop('required', true);
        $('#sort-code-pt2').prop('required', true);
        $('#sort-code-pt3').prop('required', true);
        $('#account-number').prop('required', true);

        // deactivate the Credit/Debit Card fields NOT associated with this choice
        $('#card-name').prop('required', false);
        $('#card-number-pt1').prop('required', false);
        $('#card-number-pt2').prop('required', false);
        $('#card-number-pt3').prop('required', false);
        $('#card-number-pt4').prop('required', false);
        $('#expiry-date').prop('required', false);
        $('#ccv').prop('required', false);
      }

      if ($('#payment-type-credit:checked').length > 0) {
        // console.log("Welcome to Credit/Debit Card payment");

        // return the height of the grandprarent box set earlier when check payment wasn't selected
        $('input[name="payment-type"]:first').parent().parent().css('height', '75px');

        // deactivate the Direct Debit fields NOT associated with this choice
        $('#account-name').prop('required', false);
        $('#sort-code-pt1').prop('required', false);
        $('#sort-code-pt2').prop('required', false);
        $('#sort-code-pt3').prop('required', false);
        $('#account-number').prop('required', false);

        // activate the Credit/Debit Card fields associated with this choice
        $('#card-name').prop('required', true);
        $('#card-number-pt1').prop('required', true);
        $('#card-number-pt2').prop('required', true);
        $('#card-number-pt3').prop('required', true);
        $('#card-number-pt4').prop('required', true);
        $('#expiry-date').prop('required', true);
        $('#ccv').prop('required', true);
      }
    });
  }
}

function ActivateFormValidation() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
      if (form.checkValidity() === false) {

        // if pet type selected do validity check on it's children which affect its outcome
        // if pet-type selected
        //  do validity check on the elements in the associated collapse div

        event.preventDefault();
        event.stopPropagation();
      } else {
        var nextPage = void 0;

        // There maybe more than one submit button on the page
        // so ultimately we would like the next button to be able to move onto the next page
        if ($('button[data-href]') != null) {
          nextPage = $('button[data-href]').data('href');
        }

        form.action = nextPage;
        form.submit();
      }
      form.classList.add('was-validated');

      // check for postal address
      if ($('#customer-house-number').length > 0) {
        if ($('#customer-house-number').val() === '' || $('#customer-street').val() === '' || $('#customer-town-city').val() === '') {
          $('.was-validated .js-invalid-postal-address.invalid-feedback').show();
        } else {
          $('.was-validated .js-invalid-postal-address.invalid-feedback').hide();
        }

        form.addEventListener('keyup', function (evt) {
          // if all 3 parts of the address are complete
          // then hide the invalid-feedback
          if ($('#customer-house-number').val() !== '' && $('#customer-street').val() !== '' && $('#customer-town-city').val() !== '') {
            $('.was-validated .js-invalid-postal-address.invalid-feedback').hide();
          } else {
            $('.was-validated .js-invalid-postal-address.invalid-feedback').show();
          }
        });
      }

      // check for payments
      if ($('input[name="regular-pay"]').length > 0) {
        // console.log('Hello Regular Pay check');
        // if the a regular payment is not selected
        // then increase the height of the form-check box to allow for the error meesage to b shown
        if ($('input[name="regular-pay"]:checked').length < 1) {
          $('input[name="regular-pay"]:first').parent().parent().css('height', '75px');
        }

        if ($('input[name="payment-type"]:checked').length < 1) {
          $('input[name="payment-type"]:first').parent().parent().css('height', '75px');
        }
      }
    }, false);
  });
}

exports.Payment = Payment;
exports.ActivateFormValidation = ActivateFormValidation;
exports.CheckBankNumber = CheckBankNumber;
exports.ToggleRequiredPaymentFields = ToggleRequiredPaymentFields;

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

(function () {
  (0, _CustomSelect.CustomSelect)();
  (0, _Address.Address)();
  (0, _Pet.Pet)();
  (0, _CoverTypes.CoverTypes)();
  (0, _Payment.Payment)();

  // check sort code and account number
  (0, _Payment.ActivateFormValidation)();

  if ($('.form-group--sortcode').length > 0) {
    (0, _Payment.CheckBankNumber)('.form-group--sortcode input', '#account-number');
  }
  if ($('.form-group--account-number').length > 0) {
    (0, _Payment.CheckBankNumber)('.form-group--account-number input', '#expiry-date');
  }

  (0, _Payment.ToggleRequiredPaymentFields)();

  // Modal();
})(); // import { log } from './components/Utils';

},{"./components/Address":1,"./components/CoverTypes":2,"./components/CustomSelect":3,"./components/Payment":4,"./components/Pet":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0FkZHJlc3MuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0NvdmVyVHlwZXMuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0N1c3RvbVNlbGVjdC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGF5bWVudC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGV0LmpzIiwic3JjL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBOztBQUVBOztBQUVBLFNBQVMsT0FBVCxHQUFvQjtBQUNsQjtBQUNBLE1BQUksa0JBQWtCLEVBQUUsMkJBQUYsQ0FBdEI7QUFDQSxNQUFJLG9CQUFvQixFQUFFLHVCQUFGLENBQXhCO0FBQ0EsTUFBSSxlQUFlLEVBQUUsZ0JBQUYsQ0FBbkI7O0FBRUEsTUFBSSxrQkFBa0IsRUFBRSwyQkFBRixDQUF0QjtBQUNBLE1BQUksaUJBQWlCLEVBQUUsMEJBQUYsQ0FBckI7QUFDQSxNQUFJLFdBQVcsRUFBRSxtQkFBRixDQUFmOztBQUVBO0FBQ0Esa0JBQWdCLEtBQWhCLENBQXNCLFVBQVUsR0FBVixFQUFlO0FBQ25DLFFBQUksY0FBSjtBQUNBLG9CQUFnQixRQUFoQixDQUF5QixRQUF6QjtBQUNBLG1CQUFlLFFBQWYsQ0FBd0IsTUFBeEI7QUFDQSxhQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDRCxHQUxEOztBQU9BLG9CQUFrQixFQUFsQixDQUFxQixPQUFyQixFQUE4QixVQUFVLEdBQVYsRUFBZTtBQUMzQyxRQUFJLGNBQUo7QUFDQSxhQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDQSxvQkFBZ0IsUUFBaEIsQ0FBeUIsTUFBekI7QUFDQSxtQkFBZSxRQUFmLENBQXdCLE1BQXhCO0FBQ0QsR0FMRDs7QUFPQSxlQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsVUFB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RUE7QUFDRCxHQVBEO0FBUUQ7O0FBRUQsU0FBUyxrQkFBVCxHQUErQjtBQUM3QixJQUFFLHlCQUFGLEVBQTZCLEVBQTdCLENBQWdDLE9BQWhDLEVBQXlDLFVBQVUsR0FBVixFQUFlO0FBQ3RELFFBQUksY0FBSjtBQUNBLFFBQUksYUFBSixDQUFrQixVQUFsQixDQUE2QixNQUE3QjtBQUNELEdBSEQ7QUFJRDs7UUFFUSxHLEdBQUEsRzs7Ozs7QUNoRFQ7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDLFlBQVk7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsTUFBSSxFQUFFLHVCQUFGLEVBQTJCLE1BQTNCLEdBQW9DLENBQXhDLEVBQTJDO0FBQ3pDLGtDQUFnQiw2QkFBaEIsRUFBK0MsaUJBQS9DO0FBQ0Q7QUFDRCxNQUFJLEVBQUUsNkJBQUYsRUFBaUMsTUFBakMsR0FBMEMsQ0FBOUMsRUFBaUQ7QUFDL0Msa0NBQWdCLG1DQUFoQixFQUFxRCxjQUFyRDtBQUNEOztBQUVEOztBQUVBO0FBQ0QsQ0FwQkQsSSxDQVpBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gbW9kdWxlIFwiQWRkcmVzcy5qc1wiXG5cbi8vIHBvc3Rjb2Rlc1xuXG5mdW5jdGlvbiBBZGRyZXNzICgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGxldCAkcG9zdGNvZGVTZWFyY2ggPSAkKCcjY3VzdG9tZXItcG9zdGNvZGUtc2VhcmNoJyk7XG4gIGxldCAkYWRkcmVzc1Bvc3Rjb2RlcyA9ICQoJy5hZGRyZXNzX19wb3N0Y29kZXMgYScpO1xuICBsZXQgJGFkZHJlc3NMaW5rID0gJCgnLmFkZHJlc3NfX2xpbmsnKTtcblxuICBsZXQgJHBvc3Rjb2RlUmVzdWx0ID0gJCgnI2N1c3RvbWVyLXBvc3Rjb2RlLXJlc3VsdCcpO1xuICBsZXQgJG1hbnVhbEFkZHJlc3MgPSAkKCcjY3VzdG9tZXItbWFudWFsLWFkZHJlc3MnKTtcbiAgbGV0ICRhZGRyZXNzID0gJCgnI2N1c3RvbWVyLWFkZHJlc3MnKTtcblxuICAvLyBiaW5kIGV2ZW50c1xuICAkcG9zdGNvZGVTZWFyY2guY2xpY2soZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICRwb3N0Y29kZVJlc3VsdC5jb2xsYXBzZSgndG9nZ2xlJyk7XG4gICAgJG1hbnVhbEFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkYWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWRkcmVzc1Bvc3Rjb2Rlcy5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWRkcmVzc0xpbmsub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICRhZGRyZXNzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJHBvc3Rjb2RlUmVzdWx0LmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJG1hbnVhbEFkZHJlc3MuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEFkZHJlc3MgfTtcbiIsIi8vIG1vZHVsZSBcIkNvdmVyVHlwZXMuanNcIlxuXG5mdW5jdGlvbiBDb3ZlclR5cGVzICgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGxldCAkbGlmZXRpbWVMaW5rID0gJCgnI2xpZmV0aW1lLWxpbmsnKTtcbiAgbGV0ICRtYXhpbXVtTGluayA9ICQoJyNtYXhpbXVtLWxpbmsnKTtcbiAgbGV0ICRhY2NpZGVudExpbmsgPSAkKCcjYWNjaWRlbnQtbGluaycpO1xuICBsZXQgJGJ0bkNvdmVyTGV2ZWwgPSAkKCcuYnRuLS1jb3Zlci1sZXZlbCcpO1xuXG4gIGxldCAkbGlmZXRpbWVDb3ZlciA9ICQoJyNsaWZldGltZS1jb3ZlcicpO1xuICBsZXQgJG1heGltdW1Db3ZlciA9ICQoJyNtYXhpbXVtLWNvdmVyJyk7XG4gIGxldCAkYWNjaWRlbnRDb3ZlciA9ICQoJyNhY2NpZGVudC1jb3ZlcicpO1xuXG4gICRsaWZldGltZUxpbmsuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRsaWZldGltZUNvdmVyLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJG1heGltdW1Db3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRhY2NpZGVudENvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRtYXhpbXVtTGluay5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJGFjY2lkZW50TGluay5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gYmluZCBFdmVudHNcblxuICAvLyBzdG9wIHdlYiBwYWdlIGZyb20gc2Nyb2xsaW5nIHRvIHRvcCB3aGVuIGxpbmsgaXMgY2xpY2tlZCB0aGF0IHRyaWdnZXJzIEphdmFTY3JpcHRcbiAgJGJ0bkNvdmVyTGV2ZWwuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gdGFyZ2V0IGlkXG4gICAgbGV0IHRhcmdldElkID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcbiAgICBsZXQgdGFyZ2V0SGVpZ2h0ID0gICQodGFyZ2V0SWQpLmhlaWdodCgpIC0gMTAwO1xuICAgIC8vIGxldCBkb2N1bWVudEhlaWdodCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0YXJnZXRIZWlnaHQgfSk7XG5cbiAgICBpZiAodGhpcy5pbm5lckhUTUwgPT09ICdDaG9vc2UgbGV2ZWwnKSB7XG4gICAgICB0aGlzLmlubmVySFRNTCA9ICdIaWRlIGxldmVscyc7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYnRuLS1vdXRsaW5lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gJ0Nob29zZSBsZXZlbCc7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdidG4tLW91dGxpbmUnKTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IHsgQ292ZXJUeXBlcyB9O1xuIiwiLy8gbW9kdWxlIFwiQ3VzdG9tU2VsZWN0LmpzXCJcblxuZnVuY3Rpb24gQ3VzdG9tU2VsZWN0ICgpIHtcbiAgdmFyIHNlbGVjdEFsdCwgaSwgaiwgc2VsRWxlbWVudCwgc2VsZWN0ZWRJdGVtLCBvcHRpb25MaXN0LCBvcHRpb25JdGVtO1xuXG4gIC8vIGNhY2hlIERPTVxuICAvKiBsb29rIGZvciBhbnkgZWxlbWVudHMgd2l0aCB0aGUgY2xhc3MgXCJzZWxlY3QtLWFsdFwiOiAqL1xuICBzZWxlY3RBbHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtLWFsdCcpO1xuXG4gIC8vIGJpbmQgRXZlbnRzXG4gIGZvciAoaSA9IDA7IGkgPCBzZWxlY3RBbHQubGVuZ3RoOyBpKyspIHtcbiAgICBzZWxFbGVtZW50ID0gc2VsZWN0QWx0W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzZWxlY3QnKVswXTtcblxuICAgIC8qIGZvciBlYWNoIGVsZW1lbnQsIGNyZWF0ZSBhIG5ldyBESVYgdGhhdCB3aWxsIGFjdCBhcyB0aGUgc2VsZWN0ZWQgaXRlbTogKi9cbiAgICBzZWxlY3RlZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBzZWxlY3RlZEl0ZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdzZWxlY3Qtc2VsZWN0ZWQnKTtcbiAgICBzZWxlY3RlZEl0ZW0uaW5uZXJIVE1MID0gc2VsRWxlbWVudC5vcHRpb25zW3NlbEVsZW1lbnQuc2VsZWN0ZWRJbmRleF0uaW5uZXJIVE1MO1xuXG4gICAgc2VsZWN0QWx0W2ldLmFwcGVuZENoaWxkKHNlbGVjdGVkSXRlbSk7XG5cbiAgICAvKiBmb3IgZWFjaCBlbGVtZW50LCBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBjb250YWluIHRoZSBvcHRpb24gbGlzdDogKi9cbiAgICBvcHRpb25MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgb3B0aW9uTGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NlbGVjdC1pdGVtcyBzZWxlY3QtaGlkZScpO1xuXG4gICAgZm9yIChqID0gMTsgaiA8IHNlbEVsZW1lbnQubGVuZ3RoOyBqKyspIHtcbiAgICAgIC8qIGZvciBlYWNoIG9wdGlvbiBpbiB0aGUgb3JpZ2luYWwgc2VsZWN0IGVsZW1lbnQsXG4gICAgICBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBhY3QgYXMgYW4gb3B0aW9uIGl0ZW06ICovXG4gICAgICBvcHRpb25JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICBvcHRpb25JdGVtLmlubmVySFRNTCA9IHNlbEVsZW1lbnQub3B0aW9uc1tqXS5pbm5lckhUTUw7XG4gICAgICBvcHRpb25JdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3luY09wdGlvblNlbGVjdGVkKTtcblxuICAgICAgb3B0aW9uTGlzdC5hcHBlbmRDaGlsZChvcHRpb25JdGVtKTtcbiAgICB9XG5cbiAgICBzZWxlY3RBbHRbaV0uYXBwZW5kQ2hpbGQob3B0aW9uTGlzdCk7XG5cbiAgICBzZWxlY3RlZEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU90aGVyT3B0aW9ucyk7XG4gIH1cblxuICAvLyBtZXRob2RzXG4gIGZ1bmN0aW9uIHN5bmNPcHRpb25TZWxlY3RlZCAoZSkge1xuICAgIC8qIHdoZW4gYW4gaXRlbSBpcyBjbGlja2VkLCB1cGRhdGUgdGhlIG9yaWdpbmFsIHNlbGVjdCBib3gsXG4gICAgYW5kIHRoZSBzZWxlY3RlZCBpdGVtOiAqL1xuICAgIHZhciB5LCBpLCBrLCBvcmlnaW5hbFNlbGVjdCwgaDtcbiAgICBvcmlnaW5hbFNlbGVjdCA9IHRoaXMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzZWxlY3QnKVswXTtcblxuICAgIC8vIHN0b3JlIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgaCA9IHRoaXMucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgZm9yIChpID0gMDsgaSA8IG9yaWdpbmFsU2VsZWN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAob3JpZ2luYWxTZWxlY3Qub3B0aW9uc1tpXS5pbm5lckhUTUwgPT09IHRoaXMuaW5uZXJIVE1MKSB7XG4gICAgICAgIG9yaWdpbmFsU2VsZWN0LnNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICBoLmlubmVySFRNTCA9IHRoaXMuaW5uZXJIVE1MO1xuICAgICAgICB5ID0gdGhpcy5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NhbWUtYXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgZm9yIChrID0gMDsgayA8IHkubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICB5W2tdLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2FtZS1hcy1zZWxlY3RlZCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaC5jbGljaygpO1xuICAgIGlmIChvcmlnaW5hbFNlbGVjdC5nZXRBdHRyaWJ1dGUoJ2lkJykgPT09ICdjb25kaXRpb24tc2VsZWN0Jykge1xuICAgICAgJCgnLmNvbmRpdGlvbnMnKS5hcHBlbmQoYDxkaXYgY2xhc3M9J3BpbGxfX2NvbmRpdGlvbic+JHtoLmlubmVySFRNTH0gPHNwYW4gY2xhc3M9J2Nsb3NlJz54PC9zcGFuPjwvZGl2PmApO1xuICAgICAgY2hlY2tGb3JDb25kaXRpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgLyogaWYgdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIG91dHNpZGUgdGhlIHNlbGVjdCBib3gsXG4gIHRoZW4gY2xvc2UgYWxsIHNlbGVjdCBib3hlczogKi9cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUFsbFNlbGVjdCk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlT3RoZXJPcHRpb25zIChlKSB7XG4gIC8qIHdoZW4gdGhlIHNlbGVjdCBib3ggaXMgY2xpY2tlZCwgY2xvc2UgYW55IG90aGVyIHNlbGVjdCBib3hlcyxcbiAgYW5kIG9wZW4vY2xvc2UgdGhlIGN1cnJlbnQgc2VsZWN0IGJveDogKi9cbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgY2xvc2VBbGxTZWxlY3QodGhpcyk7XG4gIHRoaXMubmV4dFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0LWhpZGUnKTtcbiAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3QtYXJyb3ctYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlQWxsU2VsZWN0IChlbG1udCkge1xuICAvKiBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjbG9zZSBhbGwgc2VsZWN0IGJveGVzIGluIHRoZSBkb2N1bWVudCxcbiAgZXhjZXB0IHRoZSBjdXJyZW50IHNlbGVjdCBib3g6ICovXG4gIHZhciB4LCB5LCBpLCBhcnJObyA9IFtdO1xuICB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LWl0ZW1zJyk7XG4gIHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3Qtc2VsZWN0ZWQnKTtcbiAgZm9yIChpID0gMDsgaSA8IHkubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZWxtbnQgPT0geVtpXSkge1xuICAgICAgYXJyTm8ucHVzaChpKVxuICAgIH0gZWxzZSB7XG4gICAgICB5W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdC1hcnJvdy1hY3RpdmUnKTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IHgubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXJyTm8uaW5kZXhPZihpKSkge1xuICAgICAgeFtpXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QtaGlkZScpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0ZvckNvbmRpdGlvbnMgKCkge1xuICAkKCcucGlsbF9fY29uZGl0aW9uIC5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuY3VycmVudFRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQ3VzdG9tU2VsZWN0IH07XG4iLCIvLyBtb2R1bGUgXCJQYXltZW50LmpzXCJcblxuZnVuY3Rpb24gUGF5bWVudCAoKSB7XG4gIC8vIGNhY2hlIERPTVxuICBsZXQgJHJlZ3VsYXJQYXlNb250aGx5ID0gJCgnI3JlZ3VsYXItcGF5LW1vbnRobHknKTtcbiAgbGV0ICRyZWd1bGFyUGF5QW5udWFsbHkgPSAkKCcjcmVndWxhci1wYXktYW5udWFsbHknKTtcbiAgbGV0ICRwYXltZW50VHlwZURlYml0ID0gJCgnI3BheW1lbnQtdHlwZS1kZWJpdCcpO1xuICBsZXQgJHBheW1lbnRUeXBlQ3JlZGl0ID0gJCgnI3BheW1lbnQtdHlwZS1jcmVkaXQnKTtcblxuICBsZXQgJGRpcmVjdERlYml0RGV0YWlscyA9ICQoJyNkaXJlY3QtZGViaXQtZGV0YWlscycpO1xuICBsZXQgJHBheW1lbnRUeXBlID0gJCgnI3BheW1lbnQtdHlwZScpO1xuICBsZXQgJGNyZWRpdENhcmREZXRhaWxzID0gJCgnI2NyZWRpdC1jYXJkLWRldGFpbHMnKTtcblxuICAvLyBiaW5kIGV2ZW50c1xuICAkcmVndWxhclBheU1vbnRobHkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcGF5bWVudFR5cGUuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJHJlZ3VsYXJQYXlBbm51YWxseS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJHBheW1lbnRUeXBlLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGRpcmVjdERlYml0RGV0YWlscy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkcGF5bWVudFR5cGVEZWJpdC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGRpcmVjdERlYml0RGV0YWlscy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRjcmVkaXRDYXJkRGV0YWlscy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkcGF5bWVudFR5cGVDcmVkaXQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRjcmVkaXRDYXJkRGV0YWlscy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIENoZWNrQmFua051bWJlciAoZWxlbSwgbmV4dEVsZW0pIHtcbiAgbGV0IGFsbG93ZWRLZXlzID0gW1xuICAgIDgsIDM3LCAzOCwgMzksIDQwLCA0NiwgNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NywgNTcsIDk2LCA5NywgOTgsIDk5LCAxMDAsIDEwMSwgMTAyLCAxMDMsIDEwNCwgMTA1XG4gIF07XG5cbiAgJChlbGVtKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuICQuaW5BcnJheShlLndoaWNoLCBhbGxvd2VkS2V5cykgPiAtMTtcbiAgfSk7XG4gIC8qIElHTk9SRSAtIEVORCAqL1xuXG4gIGZ1bmN0aW9uIGRlbGV0ZUdvQmFjayAodGhhdCwgZSkge1xuICAgIHJldHVybiB0aGF0LnNlbGVjdGlvblN0YXJ0ID09PSAwICYmICQuaW5BcnJheShlLndoaWNoLCBbIDgsIDQ2IF0pID4gLTE7XG4gIH1cblxuICBsZXQgJHNvcnRDb2RlID0gJChlbGVtKTtcbiAgbGV0IGNvdW50ID0gJHNvcnRDb2RlLmxlbmd0aCAtIDE7XG4gIGxldCAkYWNjTm8gPSAkKG5leHRFbGVtKTtcblxuICAkc29ydENvZGUub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcblxuICAgIGxldCBpbmRleCA9ICRzb3J0Q29kZS5pbmRleCh0aGlzKTtcbiAgICBsZXQgdmFsID0gdGhpcy52YWx1ZTtcblxuICAgIGlmICh2YWwubGVuZ3RoID09PSB0aGlzLm1heExlbmd0aCkge1xuICAgICAgaWYgKGluZGV4ID09PSBjb3VudCkge1xuICAgICAgICAkYWNjTm8uZm9jdXMoKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCBjb3VudCkge1xuICAgICAgICAkc29ydENvZGUuZXEoaW5kZXggKyAxKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGVsZXRlR29CYWNrKHRoaXMsIGUpICYmIGluZGV4ICE9PSAwKSB7XG4gICAgICAkc29ydENvZGUuZXEoaW5kZXggLSAxKS5mb2N1cygpO1xuICAgIH1cbiAgfSk7XG5cbiAgJGFjY05vLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGRlbGV0ZUdvQmFjayh0aGlzLCBlKSkge1xuICAgICAgJHNvcnRDb2RlLmxhc3QoKS5mb2N1cygpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIFRvZ2dsZVJlcXVpcmVkUGF5bWVudEZpZWxkcyAoKSB7XG5cbiAgaWYgKCQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkhlbGxvIFJlZ3VsYXIgUGF5XCIpO1xuXG4gICAgLy8gaWYgbW9udGhseSBzZWxlY3RlZFxuICAgIC8vIHRoZW4gY2hlY2sgZm9yIGRpcmVjdCBkZWJpdCBpbmZvcm1hdGlvblxuICAgICQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXScpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKCQoJyNyZWd1bGFyLXBheS1hbm51YWxseTpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIldlbGNvbWUgdG8gQW5udWFsIHJlcGF5bWVudHNcIik7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGdyYW5kcHJhcmVudCBib3ggc2V0IGVhcmxpZXIgd2hlbiBjaGVjayBwYXltZW50IHdhc24ndCBzZWxlY3RlZFxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl06Zmlyc3QnKS5wYXJlbnQoKS5wYXJlbnQoKS5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgRGlyZWN0IERlYml0IGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNhY2NvdW50LW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDEnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2FjY291bnQtbnVtYmVyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIHBheW1lbnQgdHlwZSBmaWVsZHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIENyZWRpdC9EZWJpdCBDYXJkIGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNjYXJkLW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0NCcpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjZXhwaXJ5LWRhdGUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NjdicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgdGhlIGRpcmVjdCBkZWJpdCBmaWVsZHMgdG8gcmVxdWlyZWRcbiAgICAgIGlmICgkKCcjcmVndWxhci1wYXktbW9udGhseTpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIldlbGNvbWUgdG8gTW9udGhseSByZXBheW1lbnRzXCIpO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBncmFuZHByYXJlbnQgYm94IHNldCBlYXJsaWVyIHdoZW4gY2hlY2sgcGF5bWVudCB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdOmZpcnN0JykucGFyZW50KCkucGFyZW50KCkuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRoZSBEaXJlY3QgRGViaXQgZmllbGRzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCcjYWNjb3VudC1uYW1lJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDEnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQzJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2FjY291bnQtbnVtYmVyJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcblxuICAgICAgICAvLyBkZWFjdGl2YXRlIHRoZSBwYXltZW50IHR5cGUgZmllbGRzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudC10eXBlXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgQ3JlZGl0L0RlYml0IENhcmQgZmllbGRzIE5PVCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2NhcmQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQxJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQ0JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNleHBpcnktZGF0ZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2N2JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpZiBwYXltZW50IHR5cGUgc2VsZWN0ZWRcbiAgICAvLyB0aGVuIGNoZWNrIGZvciBlaXRoZXIgdGhlIGRpcmVjdCBkZWJpdCBvciBjcmVkaXQgY2FyZCBpbmZvcm1hdGlvblxuICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl0nKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmICgkKCcjcGF5bWVudC10eXBlLWRlYml0OmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV2VsY29tZSB0byBEaXJlY3QgRGViaXQgcGF5bWVudFwiKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIGNoZWNrIHBheW1lbnQgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl06Zmlyc3QnKS5wYXJlbnQoKS5wYXJlbnQoKS5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIERpcmVjdCBEZWJpdCBmaWVsZHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNhY2NvdW50LW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQyJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjYWNjb3VudC1udW1iZXInKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIENyZWRpdC9EZWJpdCBDYXJkIGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNjYXJkLW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0NCcpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjZXhwaXJ5LWRhdGUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NjdicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoJCgnI3BheW1lbnQtdHlwZS1jcmVkaXQ6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWxjb21lIHRvIENyZWRpdC9EZWJpdCBDYXJkIHBheW1lbnRcIik7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGdyYW5kcHJhcmVudCBib3ggc2V0IGVhcmxpZXIgd2hlbiBjaGVjayBwYXltZW50IHdhc24ndCBzZWxlY3RlZFxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudC10eXBlXCJdOmZpcnN0JykucGFyZW50KCkucGFyZW50KCkuY3NzKCdoZWlnaHQnLCAnNzVweCcpO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIERpcmVjdCBEZWJpdCBmaWVsZHMgTk9UIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCcjYWNjb3VudC1uYW1lJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQxJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQzJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNhY2NvdW50LW51bWJlcicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRoZSBDcmVkaXQvRGViaXQgQ2FyZCBmaWVsZHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNjYXJkLW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQxJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQ0JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2V4cGlyeS1kYXRlJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2NjdicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gQWN0aXZhdGVGb3JtVmFsaWRhdGlvbiAoKSB7XG4gIC8vIEZldGNoIGFsbCB0aGUgZm9ybXMgd2Ugd2FudCB0byBhcHBseSBjdXN0b20gQm9vdHN0cmFwIHZhbGlkYXRpb24gc3R5bGVzIHRvXG4gIGxldCBmb3JtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25lZWRzLXZhbGlkYXRpb24nKTtcbiAgLy8gTG9vcCBvdmVyIHRoZW0gYW5kIHByZXZlbnQgc3VibWlzc2lvblxuICBsZXQgdmFsaWRhdGlvbiA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChmb3JtcywgZnVuY3Rpb24gKGZvcm0pIHtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGZvcm0uY2hlY2tWYWxpZGl0eSgpID09PSBmYWxzZSkge1xuXG4gICAgICAgIC8vIGlmIHBldCB0eXBlIHNlbGVjdGVkIGRvIHZhbGlkaXR5IGNoZWNrIG9uIGl0J3MgY2hpbGRyZW4gd2hpY2ggYWZmZWN0IGl0cyBvdXRjb21lXG4gICAgICAgIC8vIGlmIHBldC10eXBlIHNlbGVjdGVkXG4gICAgICAgIC8vICBkbyB2YWxpZGl0eSBjaGVjayBvbiB0aGUgZWxlbWVudHMgaW4gdGhlIGFzc29jaWF0ZWQgY29sbGFwc2UgZGl2XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbmV4dFBhZ2U7XG5cbiAgICAgICAgLy8gVGhlcmUgbWF5YmUgbW9yZSB0aGFuIG9uZSBzdWJtaXQgYnV0dG9uIG9uIHRoZSBwYWdlXG4gICAgICAgIC8vIHNvIHVsdGltYXRlbHkgd2Ugd291bGQgbGlrZSB0aGUgbmV4dCBidXR0b24gdG8gYmUgYWJsZSB0byBtb3ZlIG9udG8gdGhlIG5leHQgcGFnZVxuICAgICAgICBpZiAoJCgnYnV0dG9uW2RhdGEtaHJlZl0nKSAhPSBudWxsKSB7XG4gICAgICAgICAgbmV4dFBhZ2UgPSAkKCdidXR0b25bZGF0YS1ocmVmXScpLmRhdGEoJ2hyZWYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm0uYWN0aW9uID0gbmV4dFBhZ2U7XG4gICAgICAgIGZvcm0uc3VibWl0KCk7XG4gICAgICB9XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ3dhcy12YWxpZGF0ZWQnKTtcblxuICAgICAgLy8gY2hlY2sgZm9yIHBvc3RhbCBhZGRyZXNzXG4gICAgICBpZiAoJCgnI2N1c3RvbWVyLWhvdXNlLW51bWJlcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKCAkKCcjY3VzdG9tZXItaG91c2UtbnVtYmVyJykudmFsKCkgPT09ICcnIHx8ICQoJyNjdXN0b21lci1zdHJlZXQnKS52YWwoKSA9PT0gJycgfHwgJCgnI2N1c3RvbWVyLXRvd24tY2l0eScpLnZhbCgpID09PSAnJykge1xuICAgICAgICAgICQoJy53YXMtdmFsaWRhdGVkIC5qcy1pbnZhbGlkLXBvc3RhbC1hZGRyZXNzLmludmFsaWQtZmVlZGJhY2snKS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnLndhcy12YWxpZGF0ZWQgLmpzLWludmFsaWQtcG9zdGFsLWFkZHJlc3MuaW52YWxpZC1mZWVkYmFjaycpLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgLy8gaWYgYWxsIDMgcGFydHMgb2YgdGhlIGFkZHJlc3MgYXJlIGNvbXBsZXRlXG4gICAgICAgICAgLy8gdGhlbiBoaWRlIHRoZSBpbnZhbGlkLWZlZWRiYWNrXG4gICAgICAgICAgaWYgKCQoJyNjdXN0b21lci1ob3VzZS1udW1iZXInKS52YWwoKSAhPT0gJycgJiYgJCgnI2N1c3RvbWVyLXN0cmVldCcpLnZhbCgpICE9PSAnJyAmJiAkKCcjY3VzdG9tZXItdG93bi1jaXR5JykudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAkKCcud2FzLXZhbGlkYXRlZCAuanMtaW52YWxpZC1wb3N0YWwtYWRkcmVzcy5pbnZhbGlkLWZlZWRiYWNrJykuaGlkZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcud2FzLXZhbGlkYXRlZCAuanMtaW52YWxpZC1wb3N0YWwtYWRkcmVzcy5pbnZhbGlkLWZlZWRiYWNrJykuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGZvciBwYXltZW50c1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0hlbGxvIFJlZ3VsYXIgUGF5IGNoZWNrJyk7XG4gICAgICAgIC8vIGlmIHRoZSBhIHJlZ3VsYXIgcGF5bWVudCBpcyBub3Qgc2VsZWN0ZWRcbiAgICAgICAgLy8gdGhlbiBpbmNyZWFzZSB0aGUgaGVpZ2h0IG9mIHRoZSBmb3JtLWNoZWNrIGJveCB0byBhbGxvdyBmb3IgdGhlIGVycm9yIG1lZXNhZ2UgdG8gYiBzaG93blxuICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdOmNoZWNrZWQnKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdOmZpcnN0JykucGFyZW50KCkucGFyZW50KCkuY3NzKCdoZWlnaHQnLCAnNzVweCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl06Y2hlY2tlZCcpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudC10eXBlXCJdOmZpcnN0JykucGFyZW50KCkucGFyZW50KCkuY3NzKCdoZWlnaHQnLCAnNzVweCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgZmFsc2UpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgUGF5bWVudCwgQWN0aXZhdGVGb3JtVmFsaWRhdGlvbiwgQ2hlY2tCYW5rTnVtYmVyLCBUb2dnbGVSZXF1aXJlZFBheW1lbnRGaWVsZHMgfTtcbiIsIi8vIG1vZHVsZSBcIlBldC5qc1wiXG5cbmZ1bmN0aW9uIFBldCAoKSB7XG4gIC8vIGNhY2hlIERPTVxuICBsZXQgJHByZUV4aXN0aW5nQ29uZGl0aW9uWWVzID0gJCgnI3ByZS1leGlzdGluZy1jb25kaXRpb24teWVzJyk7XG4gIGxldCAkcHJlRXhpc3RpbmdDb25kaXRpb25ObyA9ICQoJyNwcmUtZXhpc3RpbmctY29uZGl0aW9uLW5vJyk7XG4gIGxldCAkcGV0Q29uZGl0aW9uID0gJCgnI3BldC1jb25kaXRpb24nKTtcbiAgbGV0ICRjb25kaXRpb25TZWxlY3QgPSAgJCgnI2NvbmRpdGlvbi1zZWxlY3QnKTtcblxuICBsZXQgJHBldFR5cGVEb2cgPSAkKCcjcGV0LXR5cGUtZG9nJyk7XG4gIGxldCAkcGV0VHlwZUNhdCA9ICQoJyNwZXQtdHlwZS1jYXQnKTtcbiAgbGV0ICRjYXRJbmZvID0gJCgnI2NhdC1pbmZvJyk7XG4gIGxldCAkZG9nSW5mbyA9ICQoJyNkb2ctaW5mbycpO1xuXG4gIC8vIGJpbmQgZXZlbnRzXG4gICRwZXRUeXBlRG9nLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkY2F0SW5mby5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRkb2dJbmZvLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gICRwZXRUeXBlQ2F0LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkZG9nSW5mby5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRjYXRJbmZvLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gICRwcmVFeGlzdGluZ0NvbmRpdGlvblllcy5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJHBldENvbmRpdGlvbi5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAkcHJlRXhpc3RpbmdDb25kaXRpb25Oby5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJHBldENvbmRpdGlvbi5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkY29uZGl0aW9uU2VsZWN0LmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHNlbGVjdCA9ICQoJyNjb25kaXRpb24tc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpO1xuICAgIC8vIGNyZWF0ZSBhIHBpbGxcbiAgICAvLyBhcHBlbmQgcGlsbCB0byBjb25kaXRpb24gbGlzdFxuICAgICQoJy5jb25kaXRpb25zJykuYXBwZW5kKGA8ZGl2IGNsYXNzPVwicGlsbF9fY29uZGl0aW9uXCI+JHtzZWxlY3R9IDxzcGFuIGNsYXNzPVwiY2xvc2VcIj54PC9zcGFuPjwvZGl2PmApO1xuXG4gICAgY2hlY2tGb3JDb25kaXRpb25zKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja0ZvckNvbmRpdGlvbnMgKCkge1xuICAkKCcucGlsbF9fY29uZGl0aW9uIC5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuY3VycmVudFRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgUGV0IH07XG4iLCIvLyBpbXBvcnQgeyBsb2cgfSBmcm9tICcuL2NvbXBvbmVudHMvVXRpbHMnO1xuXG5pbXBvcnQgeyBDdXN0b21TZWxlY3QgfSBmcm9tICcuL2NvbXBvbmVudHMvQ3VzdG9tU2VsZWN0JztcbmltcG9ydCB7IEFkZHJlc3MgfSBmcm9tICcuL2NvbXBvbmVudHMvQWRkcmVzcyc7XG5pbXBvcnQgeyBQZXQgfSBmcm9tICcuL2NvbXBvbmVudHMvUGV0JztcbmltcG9ydCB7IENvdmVyVHlwZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvQ292ZXJUeXBlcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZUZvcm1WYWxpZGF0aW9uLCBQYXltZW50LCBDaGVja0JhbmtOdW1iZXIsIFRvZ2dsZVJlcXVpcmVkUGF5bWVudEZpZWxkcyB9IGZyb20gJy4vY29tcG9uZW50cy9QYXltZW50Jztcbi8vIGltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL01vZGFsJztcblxuLy8gVXRpbHMoKTtcbi8vIHdpbmRvdy5sb2cgPSBsb2c7XG5cbihmdW5jdGlvbiAoKSB7XG4gIEN1c3RvbVNlbGVjdCgpO1xuICBBZGRyZXNzKCk7XG4gIFBldCgpO1xuICBDb3ZlclR5cGVzKCk7XG4gIFBheW1lbnQoKTtcblxuICAvLyBjaGVjayBzb3J0IGNvZGUgYW5kIGFjY291bnQgbnVtYmVyXG4gIEFjdGl2YXRlRm9ybVZhbGlkYXRpb24oKTtcblxuICBpZiAoJCgnLmZvcm0tZ3JvdXAtLXNvcnRjb2RlJykubGVuZ3RoID4gMCkge1xuICAgIENoZWNrQmFua051bWJlcignLmZvcm0tZ3JvdXAtLXNvcnRjb2RlIGlucHV0JywgJyNhY2NvdW50LW51bWJlcicpO1xuICB9XG4gIGlmICgkKCcuZm9ybS1ncm91cC0tYWNjb3VudC1udW1iZXInKS5sZW5ndGggPiAwKSB7XG4gICAgQ2hlY2tCYW5rTnVtYmVyKCcuZm9ybS1ncm91cC0tYWNjb3VudC1udW1iZXIgaW5wdXQnLCAnI2V4cGlyeS1kYXRlJyk7XG4gIH1cblxuICBUb2dnbGVSZXF1aXJlZFBheW1lbnRGaWVsZHMoKTtcblxuICAvLyBNb2RhbCgpO1xufSkoKTtcbiJdfQ==
