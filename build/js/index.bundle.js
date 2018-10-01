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

    // get data target
    // split on "-"
    var targetArray = $(this).data('target').split('-');
    console.log('target: ', targetArray[1]);
    // cover = get 2nd element
    // find id "{cover}-cover"
    // remove from classlist "show"
    // $(`${targetArray[1]}-cover`).removeClass('show');
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

function ToggleRequiredFields() {

  if ($('input[name="pre-existing-condition"]').length > 0) {
    // check for pre-existing condtion information
    $('input[name="pre-existing-condition"]').click(function (event) {
      // return the height of the grandprarent box set earlier when pre-existing condtion wasn't selected
      $('input[name="pre-existing-condition"]:first').parent().parent().css('height', 'auto');
    });
  }

  if ($('input[name="neutered"]').length > 0) {
    // check for neutered information
    $('input[name="neutered"]').click(function (event) {
      // return the height of the grandprarent box set earlier when neutered wasn't selected
      $('input[name="neutered"]:first').parent().parent().css('height', 'auto');
    });
  }

  if ($('input[name="pet-type"]').length > 0) {
    // check for pet-type information
    $('input[name="pet-type"]').click(function (event) {
      // return the height of the grandprarent box set earlier when pet-type wasn't selected
      $('input[name="pet-type"]:first').parent().parent().css('height', 'auto');
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
        // if a regular payment is not selected
        // then increase the height of the form-check box to allow for the error meesage to be shown
        if ($('input[name="regular-pay"]:checked').length < 1) {
          $('input[name="regular-pay"]:first').parent().parent().css('height', '75px');
        }

        if ($('input[name="payment-type"]:checked').length < 1) {
          $('input[name="payment-type"]:first').parent().parent().css('height', '75px');
        }
      }

      // check for pre-existing conditions
      if ($('input[name="pre-existing-condition"]').length > 0) {
        // if pre-existing condition is not selected
        // then increase the height of the form-check box to allow for the error meesage to be shown
        if ($('input[name="pre-existing-condition"]:checked').length < 1) {
          $('input[name="pre-existing-condition"]:first').parent().parent().css('height', '80px');
        }
      }

      // check for neutered
      if ($('input[name="neutered"]').length > 0) {
        // if neutered is not selected
        // then increase the height of the form-check box to allow for the error meesage to be shown
        if ($('input[name="neutered"]:checked').length < 1) {
          $('input[name="neutered"]:first').parent().parent().css('height', '80px');
        }
      }

      // check for pet-type
      if ($('input[name="pet-type"]').length > 0) {
        // if pet-type is not selected
        // then increase the height of the form-check box to allow for the error meesage to be shown
        if ($('input[name="pet-type"]:checked').length < 1) {
          $('input[name="pet-type"]:first').parent().parent().css('height', '80px');
        }
      }
    }, false);
  });
}

exports.Payment = Payment;
exports.ActivateFormValidation = ActivateFormValidation;
exports.CheckBankNumber = CheckBankNumber;
exports.ToggleRequiredPaymentFields = ToggleRequiredPaymentFields;
exports.ToggleRequiredFields = ToggleRequiredFields;

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
  (0, _Payment.ToggleRequiredFields)();

  // Modal();
})(); // import { log } from './components/Utils';

},{"./components/Address":1,"./components/CoverTypes":2,"./components/CustomSelect":3,"./components/Payment":4,"./components/Pet":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0FkZHJlc3MuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0NvdmVyVHlwZXMuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0N1c3RvbVNlbGVjdC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGF5bWVudC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGV0LmpzIiwic3JjL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBOztBQUVBOztBQUVBLFNBQVMsT0FBVCxHQUFvQjtBQUNsQjtBQUNBLE1BQUksa0JBQWtCLEVBQUUsMkJBQUYsQ0FBdEI7QUFDQSxNQUFJLG9CQUFvQixFQUFFLHVCQUFGLENBQXhCO0FBQ0EsTUFBSSxlQUFlLEVBQUUsZ0JBQUYsQ0FBbkI7O0FBRUEsTUFBSSxrQkFBa0IsRUFBRSwyQkFBRixDQUF0QjtBQUNBLE1BQUksaUJBQWlCLEVBQUUsMEJBQUYsQ0FBckI7QUFDQSxNQUFJLFdBQVcsRUFBRSxtQkFBRixDQUFmOztBQUVBO0FBQ0Esa0JBQWdCLEtBQWhCLENBQXNCLFVBQVUsR0FBVixFQUFlO0FBQ25DLFFBQUksY0FBSjtBQUNBLG9CQUFnQixRQUFoQixDQUF5QixRQUF6QjtBQUNBLG1CQUFlLFFBQWYsQ0FBd0IsTUFBeEI7QUFDQSxhQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDRCxHQUxEOztBQU9BLG9CQUFrQixFQUFsQixDQUFxQixPQUFyQixFQUE4QixVQUFVLEdBQVYsRUFBZTtBQUMzQyxRQUFJLGNBQUo7QUFDQSxhQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDQSxvQkFBZ0IsUUFBaEIsQ0FBeUIsTUFBekI7QUFDQSxtQkFBZSxRQUFmLENBQXdCLE1BQXhCO0FBQ0QsR0FMRDs7QUFPQSxlQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsVUFB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LGlCQUEvQztBQUNEO0FBQ0QsTUFBSSxFQUFFLDZCQUFGLEVBQWlDLE1BQWpDLEdBQTBDLENBQTlDLEVBQWlEO0FBQy9DLGtDQUFnQixtQ0FBaEIsRUFBcUQsY0FBckQ7QUFDRDs7QUFFRDtBQUNBOztBQUVBO0FBQ0QsQ0FyQkQsSSxDQVpBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gbW9kdWxlIFwiQWRkcmVzcy5qc1wiXG5cbi8vIHBvc3Rjb2Rlc1xuXG5mdW5jdGlvbiBBZGRyZXNzICgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGxldCAkcG9zdGNvZGVTZWFyY2ggPSAkKCcjY3VzdG9tZXItcG9zdGNvZGUtc2VhcmNoJyk7XG4gIGxldCAkYWRkcmVzc1Bvc3Rjb2RlcyA9ICQoJy5hZGRyZXNzX19wb3N0Y29kZXMgYScpO1xuICBsZXQgJGFkZHJlc3NMaW5rID0gJCgnLmFkZHJlc3NfX2xpbmsnKTtcblxuICBsZXQgJHBvc3Rjb2RlUmVzdWx0ID0gJCgnI2N1c3RvbWVyLXBvc3Rjb2RlLXJlc3VsdCcpO1xuICBsZXQgJG1hbnVhbEFkZHJlc3MgPSAkKCcjY3VzdG9tZXItbWFudWFsLWFkZHJlc3MnKTtcbiAgbGV0ICRhZGRyZXNzID0gJCgnI2N1c3RvbWVyLWFkZHJlc3MnKTtcblxuICAvLyBiaW5kIGV2ZW50c1xuICAkcG9zdGNvZGVTZWFyY2guY2xpY2soZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICRwb3N0Y29kZVJlc3VsdC5jb2xsYXBzZSgndG9nZ2xlJyk7XG4gICAgJG1hbnVhbEFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkYWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWRkcmVzc1Bvc3Rjb2Rlcy5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWRkcmVzc0xpbmsub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICRhZGRyZXNzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJHBvc3Rjb2RlUmVzdWx0LmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJG1hbnVhbEFkZHJlc3MuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEFkZHJlc3MgfTtcbiIsIi8vIG1vZHVsZSBcIkNvdmVyVHlwZXMuanNcIlxuXG5mdW5jdGlvbiBDb3ZlclR5cGVzICgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGxldCAkbGlmZXRpbWVMaW5rID0gJCgnI2xpZmV0aW1lLWxpbmsnKTtcbiAgbGV0ICRtYXhpbXVtTGluayA9ICQoJyNtYXhpbXVtLWxpbmsnKTtcbiAgbGV0ICRhY2NpZGVudExpbmsgPSAkKCcjYWNjaWRlbnQtbGluaycpO1xuICBsZXQgJGJ0bkNvdmVyTGV2ZWwgPSAkKCcuYnRuLS1jb3Zlci1sZXZlbCcpO1xuXG4gIGxldCAkbGlmZXRpbWVDb3ZlciA9ICQoJyNsaWZldGltZS1jb3ZlcicpO1xuICBsZXQgJG1heGltdW1Db3ZlciA9ICQoJyNtYXhpbXVtLWNvdmVyJyk7XG4gIGxldCAkYWNjaWRlbnRDb3ZlciA9ICQoJyNhY2NpZGVudC1jb3ZlcicpO1xuXG4gICRsaWZldGltZUxpbmsuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRsaWZldGltZUNvdmVyLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJG1heGltdW1Db3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRhY2NpZGVudENvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRtYXhpbXVtTGluay5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJGFjY2lkZW50TGluay5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gYmluZCBFdmVudHNcblxuICAvLyBzdG9wIHdlYiBwYWdlIGZyb20gc2Nyb2xsaW5nIHRvIHRvcCB3aGVuIGxpbmsgaXMgY2xpY2tlZCB0aGF0IHRyaWdnZXJzIEphdmFTY3JpcHRcbiAgJGJ0bkNvdmVyTGV2ZWwuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gdGFyZ2V0IGlkXG4gICAgbGV0IHRhcmdldElkID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcbiAgICBsZXQgdGFyZ2V0SGVpZ2h0ID0gICQodGFyZ2V0SWQpLmhlaWdodCgpIC0gMTAwO1xuICAgIC8vIGxldCBkb2N1bWVudEhlaWdodCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0YXJnZXRIZWlnaHQgfSk7XG5cbiAgICBpZiAodGhpcy5pbm5lckhUTUwgPT09ICdDaG9vc2UgbGV2ZWwnKSB7XG4gICAgICB0aGlzLmlubmVySFRNTCA9ICdIaWRlIGxldmVscyc7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYnRuLS1vdXRsaW5lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gJ0Nob29zZSBsZXZlbCc7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdidG4tLW91dGxpbmUnKTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGRhdGEgdGFyZ2V0XG4gICAgLy8gc3BsaXQgb24gXCItXCJcbiAgICBsZXQgdGFyZ2V0QXJyYXkgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpLnNwbGl0KCctJyk7XG4gICAgY29uc29sZS5sb2coJ3RhcmdldDogJywgdGFyZ2V0QXJyYXlbMV0pO1xuICAgIC8vIGNvdmVyID0gZ2V0IDJuZCBlbGVtZW50XG4gICAgLy8gZmluZCBpZCBcIntjb3Zlcn0tY292ZXJcIlxuICAgIC8vIHJlbW92ZSBmcm9tIGNsYXNzbGlzdCBcInNob3dcIlxuICAgIC8vICQoYCR7dGFyZ2V0QXJyYXlbMV19LWNvdmVyYCkucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IENvdmVyVHlwZXMgfTtcbiIsIi8vIG1vZHVsZSBcIkN1c3RvbVNlbGVjdC5qc1wiXG5cbmZ1bmN0aW9uIEN1c3RvbVNlbGVjdCAoKSB7XG4gIHZhciBzZWxlY3RBbHQsIGksIGosIHNlbEVsZW1lbnQsIHNlbGVjdGVkSXRlbSwgb3B0aW9uTGlzdCwgb3B0aW9uSXRlbTtcblxuICAvLyBjYWNoZSBET01cbiAgLyogbG9vayBmb3IgYW55IGVsZW1lbnRzIHdpdGggdGhlIGNsYXNzIFwic2VsZWN0LS1hbHRcIjogKi9cbiAgc2VsZWN0QWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LS1hbHQnKTtcblxuICAvLyBiaW5kIEV2ZW50c1xuICBmb3IgKGkgPSAwOyBpIDwgc2VsZWN0QWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgc2VsRWxlbWVudCA9IHNlbGVjdEFsdFtpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2VsZWN0JylbMF07XG5cbiAgICAvKiBmb3IgZWFjaCBlbGVtZW50LCBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBhY3QgYXMgdGhlIHNlbGVjdGVkIGl0ZW06ICovXG4gICAgc2VsZWN0ZWRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgc2VsZWN0ZWRJdGVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2VsZWN0LXNlbGVjdGVkJyk7XG4gICAgc2VsZWN0ZWRJdGVtLmlubmVySFRNTCA9IHNlbEVsZW1lbnQub3B0aW9uc1tzZWxFbGVtZW50LnNlbGVjdGVkSW5kZXhdLmlubmVySFRNTDtcblxuICAgIHNlbGVjdEFsdFtpXS5hcHBlbmRDaGlsZChzZWxlY3RlZEl0ZW0pO1xuXG4gICAgLyogZm9yIGVhY2ggZWxlbWVudCwgY3JlYXRlIGEgbmV3IERJViB0aGF0IHdpbGwgY29udGFpbiB0aGUgb3B0aW9uIGxpc3Q6ICovXG4gICAgb3B0aW9uTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIG9wdGlvbkxpc3Quc2V0QXR0cmlidXRlKCdjbGFzcycsICdzZWxlY3QtaXRlbXMgc2VsZWN0LWhpZGUnKTtcblxuICAgIGZvciAoaiA9IDE7IGogPCBzZWxFbGVtZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAvKiBmb3IgZWFjaCBvcHRpb24gaW4gdGhlIG9yaWdpbmFsIHNlbGVjdCBlbGVtZW50LFxuICAgICAgY3JlYXRlIGEgbmV3IERJViB0aGF0IHdpbGwgYWN0IGFzIGFuIG9wdGlvbiBpdGVtOiAqL1xuICAgICAgb3B0aW9uSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgb3B0aW9uSXRlbS5pbm5lckhUTUwgPSBzZWxFbGVtZW50Lm9wdGlvbnNbal0uaW5uZXJIVE1MO1xuICAgICAgb3B0aW9uSXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN5bmNPcHRpb25TZWxlY3RlZCk7XG5cbiAgICAgIG9wdGlvbkxpc3QuYXBwZW5kQ2hpbGQob3B0aW9uSXRlbSk7XG4gICAgfVxuXG4gICAgc2VsZWN0QWx0W2ldLmFwcGVuZENoaWxkKG9wdGlvbkxpc3QpO1xuXG4gICAgc2VsZWN0ZWRJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VPdGhlck9wdGlvbnMpO1xuICB9XG5cbiAgLy8gbWV0aG9kc1xuICBmdW5jdGlvbiBzeW5jT3B0aW9uU2VsZWN0ZWQgKGUpIHtcbiAgICAvKiB3aGVuIGFuIGl0ZW0gaXMgY2xpY2tlZCwgdXBkYXRlIHRoZSBvcmlnaW5hbCBzZWxlY3QgYm94LFxuICAgIGFuZCB0aGUgc2VsZWN0ZWQgaXRlbTogKi9cbiAgICB2YXIgeSwgaSwgaywgb3JpZ2luYWxTZWxlY3QsIGg7XG4gICAgb3JpZ2luYWxTZWxlY3QgPSB0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2VsZWN0JylbMF07XG5cbiAgICAvLyBzdG9yZSB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgIGggPSB0aGlzLnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nO1xuICAgIGZvciAoaSA9IDA7IGkgPCBvcmlnaW5hbFNlbGVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG9yaWdpbmFsU2VsZWN0Lm9wdGlvbnNbaV0uaW5uZXJIVE1MID09PSB0aGlzLmlubmVySFRNTCkge1xuICAgICAgICBvcmlnaW5hbFNlbGVjdC5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgaC5pbm5lckhUTUwgPSB0aGlzLmlubmVySFRNTDtcbiAgICAgICAgeSA9IHRoaXMucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzYW1lLWFzLXNlbGVjdGVkJyk7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCB5Lmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgeVtrXS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NhbWUtYXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGguY2xpY2soKTtcbiAgICBpZiAob3JpZ2luYWxTZWxlY3QuZ2V0QXR0cmlidXRlKCdpZCcpID09PSAnY29uZGl0aW9uLXNlbGVjdCcpIHtcbiAgICAgICQoJy5jb25kaXRpb25zJykuYXBwZW5kKGA8ZGl2IGNsYXNzPSdwaWxsX19jb25kaXRpb24nPiR7aC5pbm5lckhUTUx9IDxzcGFuIGNsYXNzPSdjbG9zZSc+eDwvc3Bhbj48L2Rpdj5gKTtcbiAgICAgIGNoZWNrRm9yQ29uZGl0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGlmIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIHRoZSBzZWxlY3QgYm94LFxuICB0aGVuIGNsb3NlIGFsbCBzZWxlY3QgYm94ZXM6ICovXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VBbGxTZWxlY3QpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU90aGVyT3B0aW9ucyAoZSkge1xuICAvKiB3aGVuIHRoZSBzZWxlY3QgYm94IGlzIGNsaWNrZWQsIGNsb3NlIGFueSBvdGhlciBzZWxlY3QgYm94ZXMsXG4gIGFuZCBvcGVuL2Nsb3NlIHRoZSBjdXJyZW50IHNlbGVjdCBib3g6ICovXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGNsb3NlQWxsU2VsZWN0KHRoaXMpO1xuICB0aGlzLm5leHRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdC1oaWRlJyk7XG4gIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0LWFycm93LWFjdGl2ZScpO1xufVxuXG5mdW5jdGlvbiBjbG9zZUFsbFNlbGVjdCAoZWxtbnQpIHtcbiAgLyogYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2xvc2UgYWxsIHNlbGVjdCBib3hlcyBpbiB0aGUgZG9jdW1lbnQsXG4gIGV4Y2VwdCB0aGUgY3VycmVudCBzZWxlY3QgYm94OiAqL1xuICB2YXIgeCwgeSwgaSwgYXJyTm8gPSBbXTtcbiAgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1pdGVtcycpO1xuICB5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LXNlbGVjdGVkJyk7XG4gIGZvciAoaSA9IDA7IGkgPCB5Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVsbW50ID09IHlbaV0pIHtcbiAgICAgIGFyck5vLnB1c2goaSlcbiAgICB9IGVsc2Uge1xuICAgICAgeVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QtYXJyb3ctYWN0aXZlJyk7XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFyck5vLmluZGV4T2YoaSkpIHtcbiAgICAgIHhbaV0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0LWhpZGUnKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JDb25kaXRpb25zICgpIHtcbiAgJCgnLnBpbGxfX2NvbmRpdGlvbiAuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEN1c3RvbVNlbGVjdCB9O1xuIiwiLy8gbW9kdWxlIFwiUGF5bWVudC5qc1wiXG5cbmZ1bmN0aW9uIFBheW1lbnQgKCkge1xuICAvLyBjYWNoZSBET01cbiAgbGV0ICRyZWd1bGFyUGF5TW9udGhseSA9ICQoJyNyZWd1bGFyLXBheS1tb250aGx5Jyk7XG4gIGxldCAkcmVndWxhclBheUFubnVhbGx5ID0gJCgnI3JlZ3VsYXItcGF5LWFubnVhbGx5Jyk7XG4gIGxldCAkcGF5bWVudFR5cGVEZWJpdCA9ICQoJyNwYXltZW50LXR5cGUtZGViaXQnKTtcbiAgbGV0ICRwYXltZW50VHlwZUNyZWRpdCA9ICQoJyNwYXltZW50LXR5cGUtY3JlZGl0Jyk7XG5cbiAgbGV0ICRkaXJlY3REZWJpdERldGFpbHMgPSAkKCcjZGlyZWN0LWRlYml0LWRldGFpbHMnKTtcbiAgbGV0ICRwYXltZW50VHlwZSA9ICQoJyNwYXltZW50LXR5cGUnKTtcbiAgbGV0ICRjcmVkaXRDYXJkRGV0YWlscyA9ICQoJyNjcmVkaXQtY2FyZC1kZXRhaWxzJyk7XG5cbiAgLy8gYmluZCBldmVudHNcbiAgJHJlZ3VsYXJQYXlNb250aGx5LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkZGlyZWN0RGViaXREZXRhaWxzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJHBheW1lbnRUeXBlLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRyZWd1bGFyUGF5QW5udWFsbHkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRwYXltZW50VHlwZS5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJHBheW1lbnRUeXBlRGViaXQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkY3JlZGl0Q2FyZERldGFpbHMuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJHBheW1lbnRUeXBlQ3JlZGl0LmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkY3JlZGl0Q2FyZERldGFpbHMuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkZGlyZWN0RGViaXREZXRhaWxzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBDaGVja0JhbmtOdW1iZXIgKGVsZW0sIG5leHRFbGVtKSB7XG4gIGxldCBhbGxvd2VkS2V5cyA9IFtcbiAgICA4LCAzNywgMzgsIDM5LCA0MCwgNDYsIDQ4LCA0OSwgNTAsIDUxLCA1MiwgNTMsIDU0LCA1NSwgNTcsIDU3LCA5NiwgOTcsIDk4LCA5OSwgMTAwLCAxMDEsIDEwMiwgMTAzLCAxMDQsIDEwNVxuICBdO1xuXG4gICQoZWxlbSkub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgIHJldHVybiAkLmluQXJyYXkoZS53aGljaCwgYWxsb3dlZEtleXMpID4gLTE7XG4gIH0pO1xuICAvKiBJR05PUkUgLSBFTkQgKi9cblxuICBmdW5jdGlvbiBkZWxldGVHb0JhY2sgKHRoYXQsIGUpIHtcbiAgICByZXR1cm4gdGhhdC5zZWxlY3Rpb25TdGFydCA9PT0gMCAmJiAkLmluQXJyYXkoZS53aGljaCwgWyA4LCA0NiBdKSA+IC0xO1xuICB9XG5cbiAgbGV0ICRzb3J0Q29kZSA9ICQoZWxlbSk7XG4gIGxldCBjb3VudCA9ICRzb3J0Q29kZS5sZW5ndGggLSAxO1xuICBsZXQgJGFjY05vID0gJChuZXh0RWxlbSk7XG5cbiAgJHNvcnRDb2RlLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICBsZXQgaW5kZXggPSAkc29ydENvZGUuaW5kZXgodGhpcyk7XG4gICAgbGV0IHZhbCA9IHRoaXMudmFsdWU7XG5cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gdGhpcy5tYXhMZW5ndGgpIHtcbiAgICAgIGlmIChpbmRleCA9PT0gY291bnQpIHtcbiAgICAgICAgJGFjY05vLmZvY3VzKCk7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4IDwgY291bnQpIHtcbiAgICAgICAgJHNvcnRDb2RlLmVxKGluZGV4ICsgMSkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRlbGV0ZUdvQmFjayh0aGlzLCBlKSAmJiBpbmRleCAhPT0gMCkge1xuICAgICAgJHNvcnRDb2RlLmVxKGluZGV4IC0gMSkuZm9jdXMoKTtcbiAgICB9XG4gIH0pO1xuXG4gICRhY2NOby5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChkZWxldGVHb0JhY2sodGhpcywgZSkpIHtcbiAgICAgICRzb3J0Q29kZS5sYXN0KCkuZm9jdXMoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBUb2dnbGVSZXF1aXJlZFBheW1lbnRGaWVsZHMgKCkge1xuXG4gIGlmICgkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJIZWxsbyBSZWd1bGFyIFBheVwiKTtcblxuICAgIC8vIGlmIG1vbnRobHkgc2VsZWN0ZWRcbiAgICAvLyB0aGVuIGNoZWNrIGZvciBkaXJlY3QgZGViaXQgaW5mb3JtYXRpb25cbiAgICAkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl0nKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmICgkKCcjcmVndWxhci1wYXktYW5udWFsbHk6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWxjb21lIHRvIEFubnVhbCByZXBheW1lbnRzXCIpO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBncmFuZHByYXJlbnQgYm94IHNldCBlYXJsaWVyIHdoZW4gY2hlY2sgcGF5bWVudCB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdOmZpcnN0JykucGFyZW50KCkucGFyZW50KCkuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIERpcmVjdCBEZWJpdCBmaWVsZHMgTk9UIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCcjYWNjb3VudC1uYW1lJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQxJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQzJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNhY2NvdW50LW51bWJlcicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRoZSBwYXltZW50IHR5cGUgZmllbGRzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudC10eXBlXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBkZWFjdGl2YXRlIHRoZSBDcmVkaXQvRGViaXQgQ2FyZCBmaWVsZHMgTk9UIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCcjY2FyZC1uYW1lJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDEnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQzJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2V4cGlyeS1kYXRlJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjY3YnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHRoZSBkaXJlY3QgZGViaXQgZmllbGRzIHRvIHJlcXVpcmVkXG4gICAgICBpZiAoJCgnI3JlZ3VsYXItcGF5LW1vbnRobHk6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWxjb21lIHRvIE1vbnRobHkgcmVwYXltZW50c1wiKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIGNoZWNrIHBheW1lbnQgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXTpmaXJzdCcpLnBhcmVudCgpLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcblxuICAgICAgICAvLyBhY3RpdmF0ZSB0aGUgRGlyZWN0IERlYml0IGZpZWxkcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2FjY291bnQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQxJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNhY2NvdW50LW51bWJlcicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgcGF5bWVudCB0eXBlIGZpZWxkcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIENyZWRpdC9EZWJpdCBDYXJkIGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNjYXJkLW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0NCcpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjZXhwaXJ5LWRhdGUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NjdicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gaWYgcGF5bWVudCB0eXBlIHNlbGVjdGVkXG4gICAgLy8gdGhlbiBjaGVjayBmb3IgZWl0aGVyIHRoZSBkaXJlY3QgZGViaXQgb3IgY3JlZGl0IGNhcmQgaW5mb3JtYXRpb25cbiAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudC10eXBlXCJdJykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoJCgnI3BheW1lbnQtdHlwZS1kZWJpdDpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIldlbGNvbWUgdG8gRGlyZWN0IERlYml0IHBheW1lbnRcIik7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGdyYW5kcHJhcmVudCBib3ggc2V0IGVhcmxpZXIgd2hlbiBjaGVjayBwYXltZW50IHdhc24ndCBzZWxlY3RlZFxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudC10eXBlXCJdOmZpcnN0JykucGFyZW50KCkucGFyZW50KCkuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRoZSBEaXJlY3QgRGViaXQgZmllbGRzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCcjYWNjb3VudC1uYW1lJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDEnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQzJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2FjY291bnQtbnVtYmVyJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcblxuICAgICAgICAvLyBkZWFjdGl2YXRlIHRoZSBDcmVkaXQvRGViaXQgQ2FyZCBmaWVsZHMgTk9UIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCcjY2FyZC1uYW1lJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDEnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQzJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2V4cGlyeS1kYXRlJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjY3YnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCQoJyNwYXltZW50LXR5cGUtY3JlZGl0OmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV2VsY29tZSB0byBDcmVkaXQvRGViaXQgQ2FyZCBwYXltZW50XCIpO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBncmFuZHByYXJlbnQgYm94IHNldCBlYXJsaWVyIHdoZW4gY2hlY2sgcGF5bWVudCB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXTpmaXJzdCcpLnBhcmVudCgpLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgJzc1cHgnKTtcblxuICAgICAgICAvLyBkZWFjdGl2YXRlIHRoZSBEaXJlY3QgRGViaXQgZmllbGRzIE5PVCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2FjY291bnQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjYWNjb3VudC1udW1iZXInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcblxuICAgICAgICAvLyBhY3RpdmF0ZSB0aGUgQ3JlZGl0L0RlYml0IENhcmQgZmllbGRzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCcjY2FyZC1uYW1lJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQzJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0NCcpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNleHBpcnktZGF0ZScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNjY3YnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIFRvZ2dsZVJlcXVpcmVkRmllbGRzICgpIHtcblxuICBpZiAoJCgnaW5wdXRbbmFtZT1cInByZS1leGlzdGluZy1jb25kaXRpb25cIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgLy8gY2hlY2sgZm9yIHByZS1leGlzdGluZyBjb25kdGlvbiBpbmZvcm1hdGlvblxuICAgICQoJ2lucHV0W25hbWU9XCJwcmUtZXhpc3RpbmctY29uZGl0aW9uXCJdJykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIHByZS1leGlzdGluZyBjb25kdGlvbiB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwcmUtZXhpc3RpbmctY29uZGl0aW9uXCJdOmZpcnN0JykucGFyZW50KCkucGFyZW50KCkuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAvLyBjaGVjayBmb3IgbmV1dGVyZWQgaW5mb3JtYXRpb25cbiAgICAkKCdpbnB1dFtuYW1lPVwibmV1dGVyZWRcIl0nKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBncmFuZHByYXJlbnQgYm94IHNldCBlYXJsaWVyIHdoZW4gbmV1dGVyZWQgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAkKCdpbnB1dFtuYW1lPVwibmV1dGVyZWRcIl06Zmlyc3QnKS5wYXJlbnQoKS5wYXJlbnQoKS5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdJykubGVuZ3RoID4gMCkge1xuICAgIC8vIGNoZWNrIGZvciBwZXQtdHlwZSBpbmZvcm1hdGlvblxuICAgICQoJ2lucHV0W25hbWU9XCJwZXQtdHlwZVwiXScpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgLy8gcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGdyYW5kcHJhcmVudCBib3ggc2V0IGVhcmxpZXIgd2hlbiBwZXQtdHlwZSB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwZXQtdHlwZVwiXTpmaXJzdCcpLnBhcmVudCgpLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBBY3RpdmF0ZUZvcm1WYWxpZGF0aW9uICgpIHtcbiAgLy8gRmV0Y2ggYWxsIHRoZSBmb3JtcyB3ZSB3YW50IHRvIGFwcGx5IGN1c3RvbSBCb290c3RyYXAgdmFsaWRhdGlvbiBzdHlsZXMgdG9cbiAgbGV0IGZvcm1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmVlZHMtdmFsaWRhdGlvbicpO1xuICAvLyBMb29wIG92ZXIgdGhlbSBhbmQgcHJldmVudCBzdWJtaXNzaW9uXG4gIGxldCB2YWxpZGF0aW9uID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGZvcm1zLCBmdW5jdGlvbiAoZm9ybSkge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoZm9ybS5jaGVja1ZhbGlkaXR5KCkgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgLy8gaWYgcGV0IHR5cGUgc2VsZWN0ZWQgZG8gdmFsaWRpdHkgY2hlY2sgb24gaXQncyBjaGlsZHJlbiB3aGljaCBhZmZlY3QgaXRzIG91dGNvbWVcbiAgICAgICAgLy8gaWYgcGV0LXR5cGUgc2VsZWN0ZWRcbiAgICAgICAgLy8gIGRvIHZhbGlkaXR5IGNoZWNrIG9uIHRoZSBlbGVtZW50cyBpbiB0aGUgYXNzb2NpYXRlZCBjb2xsYXBzZSBkaXZcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBuZXh0UGFnZTtcblxuICAgICAgICAvLyBUaGVyZSBtYXliZSBtb3JlIHRoYW4gb25lIHN1Ym1pdCBidXR0b24gb24gdGhlIHBhZ2VcbiAgICAgICAgLy8gc28gdWx0aW1hdGVseSB3ZSB3b3VsZCBsaWtlIHRoZSBuZXh0IGJ1dHRvbiB0byBiZSBhYmxlIHRvIG1vdmUgb250byB0aGUgbmV4dCBwYWdlXG4gICAgICAgIGlmICgkKCdidXR0b25bZGF0YS1ocmVmXScpICE9IG51bGwpIHtcbiAgICAgICAgICBuZXh0UGFnZSA9ICQoJ2J1dHRvbltkYXRhLWhyZWZdJykuZGF0YSgnaHJlZicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybS5hY3Rpb24gPSBuZXh0UGFnZTtcbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgIH1cbiAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnd2FzLXZhbGlkYXRlZCcpO1xuXG4gICAgICAvLyBjaGVjayBmb3IgcG9zdGFsIGFkZHJlc3NcbiAgICAgIGlmICgkKCcjY3VzdG9tZXItaG91c2UtbnVtYmVyJykubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoICQoJyNjdXN0b21lci1ob3VzZS1udW1iZXInKS52YWwoKSA9PT0gJycgfHwgJCgnI2N1c3RvbWVyLXN0cmVldCcpLnZhbCgpID09PSAnJyB8fCAkKCcjY3VzdG9tZXItdG93bi1jaXR5JykudmFsKCkgPT09ICcnKSB7XG4gICAgICAgICAgJCgnLndhcy12YWxpZGF0ZWQgLmpzLWludmFsaWQtcG9zdGFsLWFkZHJlc3MuaW52YWxpZC1mZWVkYmFjaycpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKCcud2FzLXZhbGlkYXRlZCAuanMtaW52YWxpZC1wb3N0YWwtYWRkcmVzcy5pbnZhbGlkLWZlZWRiYWNrJykuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAvLyBpZiBhbGwgMyBwYXJ0cyBvZiB0aGUgYWRkcmVzcyBhcmUgY29tcGxldGVcbiAgICAgICAgICAvLyB0aGVuIGhpZGUgdGhlIGludmFsaWQtZmVlZGJhY2tcbiAgICAgICAgICBpZiAoJCgnI2N1c3RvbWVyLWhvdXNlLW51bWJlcicpLnZhbCgpICE9PSAnJyAmJiAkKCcjY3VzdG9tZXItc3RyZWV0JykudmFsKCkgIT09ICcnICYmICQoJyNjdXN0b21lci10b3duLWNpdHknKS52YWwoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICQoJy53YXMtdmFsaWRhdGVkIC5qcy1pbnZhbGlkLXBvc3RhbC1hZGRyZXNzLmludmFsaWQtZmVlZGJhY2snKS5oaWRlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy53YXMtdmFsaWRhdGVkIC5qcy1pbnZhbGlkLXBvc3RhbC1hZGRyZXNzLmludmFsaWQtZmVlZGJhY2snKS5zaG93KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgZm9yIHBheW1lbnRzXG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnSGVsbG8gUmVndWxhciBQYXkgY2hlY2snKTtcbiAgICAgICAgLy8gaWYgYSByZWd1bGFyIHBheW1lbnQgaXMgbm90IHNlbGVjdGVkXG4gICAgICAgIC8vIHRoZW4gaW5jcmVhc2UgdGhlIGhlaWdodCBvZiB0aGUgZm9ybS1jaGVjayBib3ggdG8gYWxsb3cgZm9yIHRoZSBlcnJvciBtZWVzYWdlIHRvIGJlIHNob3duXG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl06Y2hlY2tlZCcpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl06Zmlyc3QnKS5wYXJlbnQoKS5wYXJlbnQoKS5jc3MoJ2hlaWdodCcsICc3NXB4Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXTpjaGVja2VkJykubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl06Zmlyc3QnKS5wYXJlbnQoKS5wYXJlbnQoKS5jc3MoJ2hlaWdodCcsICc3NXB4Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgZm9yIHByZS1leGlzdGluZyBjb25kaXRpb25zXG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInByZS1leGlzdGluZy1jb25kaXRpb25cIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGlmIHByZS1leGlzdGluZyBjb25kaXRpb24gaXMgbm90IHNlbGVjdGVkXG4gICAgICAgIC8vIHRoZW4gaW5jcmVhc2UgdGhlIGhlaWdodCBvZiB0aGUgZm9ybS1jaGVjayBib3ggdG8gYWxsb3cgZm9yIHRoZSBlcnJvciBtZWVzYWdlIHRvIGJlIHNob3duXG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicHJlLWV4aXN0aW5nLWNvbmRpdGlvblwiXTpjaGVja2VkJykubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwcmUtZXhpc3RpbmctY29uZGl0aW9uXCJdOmZpcnN0JykucGFyZW50KCkucGFyZW50KCkuY3NzKCdoZWlnaHQnLCAnODBweCcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGZvciBuZXV0ZXJlZFxuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gaWYgbmV1dGVyZWQgaXMgbm90IHNlbGVjdGVkXG4gICAgICAgIC8vIHRoZW4gaW5jcmVhc2UgdGhlIGhlaWdodCBvZiB0aGUgZm9ybS1jaGVjayBib3ggdG8gYWxsb3cgZm9yIHRoZSBlcnJvciBtZWVzYWdlIHRvIGJlIHNob3duXG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwibmV1dGVyZWRcIl06Y2hlY2tlZCcpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwibmV1dGVyZWRcIl06Zmlyc3QnKS5wYXJlbnQoKS5wYXJlbnQoKS5jc3MoJ2hlaWdodCcsICc4MHB4Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgZm9yIHBldC10eXBlXG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBpZiBwZXQtdHlwZSBpcyBub3Qgc2VsZWN0ZWRcbiAgICAgICAgLy8gdGhlbiBpbmNyZWFzZSB0aGUgaGVpZ2h0IG9mIHRoZSBmb3JtLWNoZWNrIGJveCB0byBhbGxvdyBmb3IgdGhlIGVycm9yIG1lZXNhZ2UgdG8gYmUgc2hvd25cbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwZXQtdHlwZVwiXTpjaGVja2VkJykubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwZXQtdHlwZVwiXTpmaXJzdCcpLnBhcmVudCgpLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgJzgwcHgnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIGZhbHNlKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IFBheW1lbnQsIEFjdGl2YXRlRm9ybVZhbGlkYXRpb24sIENoZWNrQmFua051bWJlciwgVG9nZ2xlUmVxdWlyZWRQYXltZW50RmllbGRzLCBUb2dnbGVSZXF1aXJlZEZpZWxkcyB9O1xuIiwiLy8gbW9kdWxlIFwiUGV0LmpzXCJcblxuZnVuY3Rpb24gUGV0ICgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGxldCAkcHJlRXhpc3RpbmdDb25kaXRpb25ZZXMgPSAkKCcjcHJlLWV4aXN0aW5nLWNvbmRpdGlvbi15ZXMnKTtcbiAgbGV0ICRwcmVFeGlzdGluZ0NvbmRpdGlvbk5vID0gJCgnI3ByZS1leGlzdGluZy1jb25kaXRpb24tbm8nKTtcbiAgbGV0ICRwZXRDb25kaXRpb24gPSAkKCcjcGV0LWNvbmRpdGlvbicpO1xuICBsZXQgJGNvbmRpdGlvblNlbGVjdCA9ICAkKCcjY29uZGl0aW9uLXNlbGVjdCcpO1xuXG4gIGxldCAkcGV0VHlwZURvZyA9ICQoJyNwZXQtdHlwZS1kb2cnKTtcbiAgbGV0ICRwZXRUeXBlQ2F0ID0gJCgnI3BldC10eXBlLWNhdCcpO1xuICBsZXQgJGNhdEluZm8gPSAkKCcjY2F0LWluZm8nKTtcbiAgbGV0ICRkb2dJbmZvID0gJCgnI2RvZy1pbmZvJyk7XG5cbiAgLy8gYmluZCBldmVudHNcbiAgJHBldFR5cGVEb2cuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRjYXRJbmZvLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGRvZ0luZm8uY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJHBldFR5cGVDYXQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRkb2dJbmZvLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGNhdEluZm8uY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJHByZUV4aXN0aW5nQ29uZGl0aW9uWWVzLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkcGV0Q29uZGl0aW9uLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gICRwcmVFeGlzdGluZ0NvbmRpdGlvbk5vLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkcGV0Q29uZGl0aW9uLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRjb25kaXRpb25TZWxlY3QuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc2VsZWN0ID0gJCgnI2NvbmRpdGlvbi1zZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykudmFsKCk7XG4gICAgLy8gY3JlYXRlIGEgcGlsbFxuICAgIC8vIGFwcGVuZCBwaWxsIHRvIGNvbmRpdGlvbiBsaXN0XG4gICAgJCgnLmNvbmRpdGlvbnMnKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJwaWxsX19jb25kaXRpb25cIj4ke3NlbGVjdH0gPHNwYW4gY2xhc3M9XCJjbG9zZVwiPng8L3NwYW4+PC9kaXY+YCk7XG5cbiAgICBjaGVja0ZvckNvbmRpdGlvbnMoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yQ29uZGl0aW9ucyAoKSB7XG4gICQoJy5waWxsX19jb25kaXRpb24gLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBQZXQgfTtcbiIsIi8vIGltcG9ydCB7IGxvZyB9IGZyb20gJy4vY29tcG9uZW50cy9VdGlscyc7XG5cbmltcG9ydCB7IEN1c3RvbVNlbGVjdCB9IGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21TZWxlY3QnO1xuaW1wb3J0IHsgQWRkcmVzcyB9IGZyb20gJy4vY29tcG9uZW50cy9BZGRyZXNzJztcbmltcG9ydCB7IFBldCB9IGZyb20gJy4vY29tcG9uZW50cy9QZXQnO1xuaW1wb3J0IHsgQ292ZXJUeXBlcyB9IGZyb20gJy4vY29tcG9uZW50cy9Db3ZlclR5cGVzJztcbmltcG9ydCB7IEFjdGl2YXRlRm9ybVZhbGlkYXRpb24sIFBheW1lbnQsIENoZWNrQmFua051bWJlciwgVG9nZ2xlUmVxdWlyZWRQYXltZW50RmllbGRzLCBUb2dnbGVSZXF1aXJlZEZpZWxkcyB9IGZyb20gJy4vY29tcG9uZW50cy9QYXltZW50Jztcbi8vIGltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL01vZGFsJztcblxuLy8gVXRpbHMoKTtcbi8vIHdpbmRvdy5sb2cgPSBsb2c7XG5cbihmdW5jdGlvbiAoKSB7XG4gIEN1c3RvbVNlbGVjdCgpO1xuICBBZGRyZXNzKCk7XG4gIFBldCgpO1xuICBDb3ZlclR5cGVzKCk7XG4gIFBheW1lbnQoKTtcblxuICAvLyBjaGVjayBzb3J0IGNvZGUgYW5kIGFjY291bnQgbnVtYmVyXG4gIEFjdGl2YXRlRm9ybVZhbGlkYXRpb24oKTtcblxuICBpZiAoJCgnLmZvcm0tZ3JvdXAtLXNvcnRjb2RlJykubGVuZ3RoID4gMCkge1xuICAgIENoZWNrQmFua051bWJlcignLmZvcm0tZ3JvdXAtLXNvcnRjb2RlIGlucHV0JywgJyNhY2NvdW50LW51bWJlcicpO1xuICB9XG4gIGlmICgkKCcuZm9ybS1ncm91cC0tYWNjb3VudC1udW1iZXInKS5sZW5ndGggPiAwKSB7XG4gICAgQ2hlY2tCYW5rTnVtYmVyKCcuZm9ybS1ncm91cC0tYWNjb3VudC1udW1iZXIgaW5wdXQnLCAnI2V4cGlyeS1kYXRlJyk7XG4gIH1cblxuICBUb2dnbGVSZXF1aXJlZFBheW1lbnRGaWVsZHMoKTtcbiAgVG9nZ2xlUmVxdWlyZWRGaWVsZHMoKTtcblxuICAvLyBNb2RhbCgpO1xufSkoKTtcbiJdfQ==
