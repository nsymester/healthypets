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

exports.Payment = Payment;
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
  var $dogTypeBreed = $('#dog-type-breed');
  var $catTypeBreed = $('#cat-type-breed');

  var $petTypeDog = $('#pet-type-dog');
  var $petTypeCat = $('#pet-type-cat');
  var $catInfo = $('#cat-info');
  var $dogInfo = $('#dog-info');

  var $dogType1 = $('#dog-type-1');
  var $dogType2 = $('#dog-type-2');

  var $dogType = $('#dog-type');

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

  // select the radio button when select element clicked
  $dogTypeBreed.on('click', function () {
    $(this.parentNode.parentNode.firstElementChild).trigger('click');
    this.setAttribute('required', true);
  });

  // select the radio button when select element clicked
  $catTypeBreed.on('click', function () {
    $(this.parentNode.parentNode.firstElementChild).trigger('click');
    this.setAttribute('required', true);
  });

  $dogType1.click(function () {
    $dogType.collapse('show');
  });

  $dogType2.click(function () {
    $dogType.collapse('hide');
  });

  $dogTypeBreed.click(function () {
    $dogType.collapse('hide');
  });
}

function checkForConditions() {
  $('.pill__condition .close').on('click', function (evt) {
    evt.preventDefault();
    evt.currentTarget.parentNode.remove();
  });
}

function ToggleRequiredPetFields() {
  // if pet type selected
  // then check for
  $('input[name="pet-type"]').click(function (event) {
    if ($('#pet-type-dog:checked').length > 0) {
      // activate the dog pet type fields asscoiated with this choice
      $('#termsAgreement').prop('required', true);
      $('input[name="dog-type"]').prop('required', true);

      // deactivate the pet type fields NOT associated with this choice
      $('input[name="cat-type"]').prop('required', false);
    }

    if ($('#pet-type-cat:checked').length > 0) {
      // activate the cat pet type fields asscoiated with this choice
      $('input[name="cat-type"]').prop('required', true);

      // deactivate the pet type fields NOT associated with this choice
      $('#termsAgreement').prop('required', false);
      $('input[name="dog-type"]').prop('required', false);
    }
  });

  $('input[name="dog-type"]').click(function () {
    // dog-size
    if ($('#dog-type-2:checked').length > 0 || $('#dog-type-breed:checked').length > 0) {
      // activate the dog pet type fields asscoiated with this choice
      $('input[name="dog-size"]').prop('required', false);
    }
    if ($('#dog-type-1:checked').length > 0) {
      $('input[name="dog-size"]').prop('required', true);
    }

    if ($('#dog-type-1:checked').length > 0 || $('#dog-type-2:checked').length > 0) {
      // activate the dog pet type fields asscoiated with this choice
      $('#dog-type-breed').prop('required', false);
    }
  });

  $('input[name="cat-type"]').click(function () {
    if ($('#cat-type-1:checked').length > 0 || $('#cat-type-2:checked').length > 0) {
      // activate the cat pet type fields asscoiated with this choice
      $('#cat-type-breed').prop('required', false);
    }
  });
}

exports.Pet = Pet;
exports.ToggleRequiredPetFields = ToggleRequiredPetFields;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module "Validation.js"

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

exports.ActivateFormValidation = ActivateFormValidation;

},{}],7:[function(require,module,exports){
'use strict';

var _CustomSelect = require('./components/CustomSelect');

var _Address = require('./components/Address');

var _Pet = require('./components/Pet');

var _CoverTypes = require('./components/CoverTypes');

var _Validation = require('./components/Validation');

var _Payment = require('./components/Payment');

// import { Modal } from './components/Modal';

// Utils();
// window.log = log;

// import { log } from './components/Utils';

(function () {
  (0, _CustomSelect.CustomSelect)();
  (0, _Address.Address)();
  (0, _Pet.Pet)();
  (0, _CoverTypes.CoverTypes)();
  (0, _Payment.Payment)();

  // check sort code and account number
  (0, _Validation.ActivateFormValidation)();

  if ($('.form-group--sortcode').length > 0) {
    (0, _Payment.CheckBankNumber)('.form-group--sortcode input', '#account-number');
  }

  if ($('.form-group--account-number').length > 0) {
    (0, _Payment.CheckBankNumber)('.form-group--account-number input', '#expiry-date');
  }

  (0, _Payment.ToggleRequiredPaymentFields)();
  (0, _Pet.ToggleRequiredPetFields)();
  (0, _Payment.ToggleRequiredFields)();

  // Modal();
})();

},{"./components/Address":1,"./components/CoverTypes":2,"./components/CustomSelect":3,"./components/Payment":4,"./components/Pet":5,"./components/Validation":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0FkZHJlc3MuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0NvdmVyVHlwZXMuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0N1c3RvbVNlbGVjdC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGF5bWVudC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGV0LmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9WYWxpZGF0aW9uLmpzIiwic3JjL3NjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBOztBQUVBOztBQUVBLFNBQVMsT0FBVCxHQUFvQjtBQUNsQjtBQUNBLE1BQUksa0JBQWtCLEVBQUUsMkJBQUYsQ0FBdEI7QUFDQSxNQUFJLG9CQUFvQixFQUFFLHVCQUFGLENBQXhCO0FBQ0EsTUFBSSxlQUFlLEVBQUUsZ0JBQUYsQ0FBbkI7O0FBRUEsTUFBSSxrQkFBa0IsRUFBRSwyQkFBRixDQUF0QjtBQUNBLE1BQUksaUJBQWlCLEVBQUUsMEJBQUYsQ0FBckI7QUFDQSxNQUFJLFdBQVcsRUFBRSxtQkFBRixDQUFmOztBQUVBO0FBQ0Esa0JBQWdCLEtBQWhCLENBQXNCLFVBQVUsR0FBVixFQUFlO0FBQ25DLFFBQUksY0FBSjtBQUNBLG9CQUFnQixRQUFoQixDQUF5QixRQUF6QjtBQUNBLG1CQUFlLFFBQWYsQ0FBd0IsTUFBeEI7QUFDQSxhQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDRCxHQUxEOztBQU9BLG9CQUFrQixFQUFsQixDQUFxQixPQUFyQixFQUE4QixVQUFVLEdBQVYsRUFBZTtBQUMzQyxRQUFJLGNBQUo7QUFDQSxhQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDQSxvQkFBZ0IsUUFBaEIsQ0FBeUIsTUFBekI7QUFDQSxtQkFBZSxRQUFmLENBQXdCLE1BQXhCO0FBQ0QsR0FM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c0I7Ozs7O0FDM0ZUOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBO0FBQ0E7O0FBWEE7O0FBYUEsQ0FBQyxZQUFZO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLE1BQUksRUFBRSx1QkFBRixFQUEyQixNQUEzQixHQUFvQyxDQUF4QyxFQUEyQztBQUN6QyxrQ0FBZ0IsNkJBQWhCLEVBQStDLGlCQUEvQztBQUNEOztBQUVELE1BQUksRUFBRSw2QkFBRixFQUFpQyxNQUFqQyxHQUEwQyxDQUE5QyxFQUFpRDtBQUMvQyxrQ0FBZ0IsbUNBQWhCLEVBQXFELGNBQXJEO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0QsQ0F2QkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBtb2R1bGUgXCJBZGRyZXNzLmpzXCJcblxuLy8gcG9zdGNvZGVzXG5cbmZ1bmN0aW9uIEFkZHJlc3MgKCkge1xuICAvLyBjYWNoZSBET01cbiAgbGV0ICRwb3N0Y29kZVNlYXJjaCA9ICQoJyNjdXN0b21lci1wb3N0Y29kZS1zZWFyY2gnKTtcbiAgbGV0ICRhZGRyZXNzUG9zdGNvZGVzID0gJCgnLmFkZHJlc3NfX3Bvc3Rjb2RlcyBhJyk7XG4gIGxldCAkYWRkcmVzc0xpbmsgPSAkKCcuYWRkcmVzc19fbGluaycpO1xuXG4gIGxldCAkcG9zdGNvZGVSZXN1bHQgPSAkKCcjY3VzdG9tZXItcG9zdGNvZGUtcmVzdWx0Jyk7XG4gIGxldCAkbWFudWFsQWRkcmVzcyA9ICQoJyNjdXN0b21lci1tYW51YWwtYWRkcmVzcycpO1xuICBsZXQgJGFkZHJlc3MgPSAkKCcjY3VzdG9tZXItYWRkcmVzcycpO1xuXG4gIC8vIGJpbmQgZXZlbnRzXG4gICRwb3N0Y29kZVNlYXJjaC5jbGljayhmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJHBvc3Rjb2RlUmVzdWx0LmNvbGxhcHNlKCd0b2dnbGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRhZGRyZXNzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRhZGRyZXNzUG9zdGNvZGVzLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkYWRkcmVzcy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRwb3N0Y29kZVJlc3VsdC5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRtYW51YWxBZGRyZXNzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRhZGRyZXNzTGluay5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQWRkcmVzcyB9O1xuIiwiLy8gbW9kdWxlIFwiQ292ZXJUeXBlcy5qc1wiXG5cbmZ1bmN0aW9uIENvdmVyVHlwZXMgKCkge1xuICAvLyBjYWNoZSBET01cbiAgbGV0ICRsaWZldGltZUxpbmsgPSAkKCcjbGlmZXRpbWUtbGluaycpO1xuICBsZXQgJG1heGltdW1MaW5rID0gJCgnI21heGltdW0tbGluaycpO1xuICBsZXQgJGFjY2lkZW50TGluayA9ICQoJyNhY2NpZGVudC1saW5rJyk7XG4gIGxldCAkYnRuQ292ZXJMZXZlbCA9ICQoJy5idG4tLWNvdmVyLWxldmVsJyk7XG5cbiAgbGV0ICRsaWZldGltZUNvdmVyID0gJCgnI2xpZmV0aW1lLWNvdmVyJyk7XG4gIGxldCAkbWF4aW11bUNvdmVyID0gJCgnI21heGltdW0tY292ZXInKTtcbiAgbGV0ICRhY2NpZGVudENvdmVyID0gJCgnI2FjY2lkZW50LWNvdmVyJyk7XG5cbiAgJGxpZmV0aW1lTGluay5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJG1heGltdW1MaW5rLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkbGlmZXRpbWVDb3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRtYXhpbXVtQ292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkYWNjaWRlbnRDb3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWNjaWRlbnRMaW5rLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkbGlmZXRpbWVDb3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRtYXhpbXVtQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkYWNjaWRlbnRDb3Zlci5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAvLyBiaW5kIEV2ZW50c1xuXG4gIC8vIHN0b3Agd2ViIHBhZ2UgZnJvbSBzY3JvbGxpbmcgdG8gdG9wIHdoZW4gbGluayBpcyBjbGlja2VkIHRoYXQgdHJpZ2dlcnMgSmF2YVNjcmlwdFxuICAkYnRuQ292ZXJMZXZlbC5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyB0YXJnZXQgaWRcbiAgICBsZXQgdGFyZ2V0SWQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xuICAgIGxldCB0YXJnZXRIZWlnaHQgPSAgJCh0YXJnZXRJZCkuaGVpZ2h0KCkgLSAxMDA7XG4gICAgLy8gbGV0IGRvY3VtZW50SGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KCk7XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRhcmdldEhlaWdodCB9KTtcblxuICAgIGlmICh0aGlzLmlubmVySFRNTCA9PT0gJ0Nob29zZSBsZXZlbCcpIHtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gJ0hpZGUgbGV2ZWxzJztcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdidG4tLW91dGxpbmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbm5lckhUTUwgPSAnQ2hvb3NlIGxldmVsJztcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2J0bi0tb3V0bGluZScpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKTtcbiAgICB9XG5cbiAgICAvLyBnZXQgZGF0YSB0YXJnZXRcbiAgICAvLyBzcGxpdCBvbiBcIi1cIlxuICAgIGxldCB0YXJnZXRBcnJheSA9ICQodGhpcykuZGF0YSgndGFyZ2V0Jykuc3BsaXQoJy0nKTtcbiAgICBjb25zb2xlLmxvZygndGFyZ2V0OiAnLCB0YXJnZXRBcnJheVsxXSk7XG4gICAgLy8gY292ZXIgPSBnZXQgMm5kIGVsZW1lbnRcbiAgICAvLyBmaW5kIGlkIFwie2NvdmVyfS1jb3ZlclwiXG4gICAgLy8gcmVtb3ZlIGZyb20gY2xhc3NsaXN0IFwic2hvd1wiXG4gICAgLy8gJChgJHt0YXJnZXRBcnJheVsxXX0tY292ZXJgKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQ292ZXJUeXBlcyB9O1xuIiwiLy8gbW9kdWxlIFwiQ3VzdG9tU2VsZWN0LmpzXCJcblxuZnVuY3Rpb24gQ3VzdG9tU2VsZWN0ICgpIHtcbiAgdmFyIHNlbGVjdEFsdCwgaSwgaiwgc2VsRWxlbWVudCwgc2VsZWN0ZWRJdGVtLCBvcHRpb25MaXN0LCBvcHRpb25JdGVtO1xuXG4gIC8vIGNhY2hlIERPTVxuICAvKiBsb29rIGZvciBhbnkgZWxlbWVudHMgd2l0aCB0aGUgY2xhc3MgXCJzZWxlY3QtLWFsdFwiOiAqL1xuICBzZWxlY3RBbHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtLWFsdCcpO1xuXG4gIC8vIGJpbmQgRXZlbnRzXG4gIGZvciAoaSA9IDA7IGkgPCBzZWxlY3RBbHQubGVuZ3RoOyBpKyspIHtcbiAgICBzZWxFbGVtZW50ID0gc2VsZWN0QWx0W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzZWxlY3QnKVswXTtcblxuICAgIC8qIGZvciBlYWNoIGVsZW1lbnQsIGNyZWF0ZSBhIG5ldyBESVYgdGhhdCB3aWxsIGFjdCBhcyB0aGUgc2VsZWN0ZWQgaXRlbTogKi9cbiAgICBzZWxlY3RlZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBzZWxlY3RlZEl0ZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdzZWxlY3Qtc2VsZWN0ZWQnKTtcbiAgICBzZWxlY3RlZEl0ZW0uaW5uZXJIVE1MID0gc2VsRWxlbWVudC5vcHRpb25zW3NlbEVsZW1lbnQuc2VsZWN0ZWRJbmRleF0uaW5uZXJIVE1MO1xuXG4gICAgc2VsZWN0QWx0W2ldLmFwcGVuZENoaWxkKHNlbGVjdGVkSXRlbSk7XG5cbiAgICAvKiBmb3IgZWFjaCBlbGVtZW50LCBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBjb250YWluIHRoZSBvcHRpb24gbGlzdDogKi9cbiAgICBvcHRpb25MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgb3B0aW9uTGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NlbGVjdC1pdGVtcyBzZWxlY3QtaGlkZScpO1xuXG4gICAgZm9yIChqID0gMTsgaiA8IHNlbEVsZW1lbnQubGVuZ3RoOyBqKyspIHtcbiAgICAgIC8qIGZvciBlYWNoIG9wdGlvbiBpbiB0aGUgb3JpZ2luYWwgc2VsZWN0IGVsZW1lbnQsXG4gICAgICBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBhY3QgYXMgYW4gb3B0aW9uIGl0ZW06ICovXG4gICAgICBvcHRpb25JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICBvcHRpb25JdGVtLmlubmVySFRNTCA9IHNlbEVsZW1lbnQub3B0aW9uc1tqXS5pbm5lckhUTUw7XG4gICAgICBvcHRpb25JdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3luY09wdGlvblNlbGVjdGVkKTtcblxuICAgICAgb3B0aW9uTGlzdC5hcHBlbmRDaGlsZChvcHRpb25JdGVtKTtcbiAgICB9XG5cbiAgICBzZWxlY3RBbHRbaV0uYXBwZW5kQ2hpbGQob3B0aW9uTGlzdCk7XG5cbiAgICBzZWxlY3RlZEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU90aGVyT3B0aW9ucyk7XG4gIH1cblxuICAvLyBtZXRob2RzXG4gIGZ1bmN0aW9uIHN5bmNPcHRpb25TZWxlY3RlZCAoZSkge1xuICAgIC8qIHdoZW4gYW4gaXRlbSBpcyBjbGlja2VkLCB1cGRhdGUgdGhlIG9yaWdpbmFsIHNlbGVjdCBib3gsXG4gICAgYW5kIHRoZSBzZWxlY3RlZCBpdGVtOiAqL1xuICAgIHZhciB5LCBpLCBrLCBvcmlnaW5hbFNlbGVjdCwgaDtcbiAgICBvcmlnaW5hbFNlbGVjdCA9IHRoaXMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzZWxlY3QnKVswXTtcblxuICAgIC8vIHN0b3JlIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgaCA9IHRoaXMucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgZm9yIChpID0gMDsgaSA8IG9yaWdpbmFsU2VsZWN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAob3JpZ2luYWxTZWxlY3Qub3B0aW9uc1tpXS5pbm5lckhUTUwgPT09IHRoaXMuaW5uZXJIVE1MKSB7XG4gICAgICAgIG9yaWdpbmFsU2VsZWN0LnNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICBoLmlubmVySFRNTCA9IHRoaXMuaW5uZXJIVE1MO1xuICAgICAgICB5ID0gdGhpcy5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NhbWUtYXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgZm9yIChrID0gMDsgayA8IHkubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICB5W2tdLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2FtZS1hcy1zZWxlY3RlZCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaC5jbGljaygpO1xuICAgIGlmIChvcmlnaW5hbFNlbGVjdC5nZXRBdHRyaWJ1dGUoJ2lkJykgPT09ICdjb25kaXRpb24tc2VsZWN0Jykge1xuICAgICAgJCgnLmNvbmRpdGlvbnMnKS5hcHBlbmQoYDxkaXYgY2xhc3M9J3BpbGxfX2NvbmRpdGlvbic+JHtoLmlubmVySFRNTH0gPHNwYW4gY2xhc3M9J2Nsb3NlJz54PC9zcGFuPjwvZGl2PmApO1xuICAgICAgY2hlY2tGb3JDb25kaXRpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgLyogaWYgdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIG91dHNpZGUgdGhlIHNlbGVjdCBib3gsXG4gIHRoZW4gY2xvc2UgYWxsIHNlbGVjdCBib3hlczogKi9cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUFsbFNlbGVjdCk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlT3RoZXJPcHRpb25zIChlKSB7XG4gIC8qIHdoZW4gdGhlIHNlbGVjdCBib3ggaXMgY2xpY2tlZCwgY2xvc2UgYW55IG90aGVyIHNlbGVjdCBib3hlcyxcbiAgYW5kIG9wZW4vY2xvc2UgdGhlIGN1cnJlbnQgc2VsZWN0IGJveDogKi9cbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgY2xvc2VBbGxTZWxlY3QodGhpcyk7XG4gIHRoaXMubmV4dFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0LWhpZGUnKTtcbiAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3QtYXJyb3ctYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlQWxsU2VsZWN0IChlbG1udCkge1xuICAvKiBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjbG9zZSBhbGwgc2VsZWN0IGJveGVzIGluIHRoZSBkb2N1bWVudCxcbiAgZXhjZXB0IHRoZSBjdXJyZW50IHNlbGVjdCBib3g6ICovXG4gIHZhciB4LCB5LCBpLCBhcnJObyA9IFtdO1xuICB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LWl0ZW1zJyk7XG4gIHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3Qtc2VsZWN0ZWQnKTtcbiAgZm9yIChpID0gMDsgaSA8IHkubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZWxtbnQgPT0geVtpXSkge1xuICAgICAgYXJyTm8ucHVzaChpKVxuICAgIH0gZWxzZSB7XG4gICAgICB5W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdC1hcnJvdy1hY3RpdmUnKTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IHgubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXJyTm8uaW5kZXhPZihpKSkge1xuICAgICAgeFtpXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QtaGlkZScpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0ZvckNvbmRpdGlvbnMgKCkge1xuICAkKCcucGlsbF9fY29uZGl0aW9uIC5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuY3VycmVudFRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQ3VzdG9tU2VsZWN0IH07XG4iLCIvLyBtb2R1bGUgXCJQYXltZW50LmpzXCJcblxuZnVuY3Rpb24gUGF5bWVudCAoKSB7XG4gIC8vIGNhY2hlIERPTVxuICBsZXQgJHJlZ3VsYXJQYXlNb250aGx5ID0gJCgnI3JlZ3VsYXItcGF5LW1vbnRobHknKTtcbiAgbGV0ICRyZWd1bGFyUGF5QW5udWFsbHkgPSAkKCcjcmVndWxhci1wYXktYW5udWFsbHknKTtcbiAgbGV0ICRwYXltZW50VHlwZURlYml0ID0gJCgnI3BheW1lbnQtdHlwZS1kZWJpdCcpO1xuICBsZXQgJHBheW1lbnRUeXBlQ3JlZGl0ID0gJCgnI3BheW1lbnQtdHlwZS1jcmVkaXQnKTtcblxuICBsZXQgJGRpcmVjdERlYml0RGV0YWlscyA9ICQoJyNkaXJlY3QtZGViaXQtZGV0YWlscycpO1xuICBsZXQgJHBheW1lbnRUeXBlID0gJCgnI3BheW1lbnQtdHlwZScpO1xuICBsZXQgJGNyZWRpdENhcmREZXRhaWxzID0gJCgnI2NyZWRpdC1jYXJkLWRldGFpbHMnKTtcblxuICAvLyBiaW5kIGV2ZW50c1xuICAkcmVndWxhclBheU1vbnRobHkuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcGF5bWVudFR5cGUuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJHJlZ3VsYXJQYXlBbm51YWxseS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJHBheW1lbnRUeXBlLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGRpcmVjdERlYml0RGV0YWlscy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkcGF5bWVudFR5cGVEZWJpdC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGRpcmVjdERlYml0RGV0YWlscy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRjcmVkaXRDYXJkRGV0YWlscy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkcGF5bWVudFR5cGVDcmVkaXQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRjcmVkaXRDYXJkRGV0YWlscy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIENoZWNrQmFua051bWJlciAoZWxlbSwgbmV4dEVsZW0pIHtcbiAgbGV0IGFsbG93ZWRLZXlzID0gW1xuICAgIDgsIDM3LCAzOCwgMzksIDQwLCA0NiwgNDgsIDQ5LCA1MCwgNTEsIDUyLCA1MywgNTQsIDU1LCA1NywgNTcsIDk2LCA5NywgOTgsIDk5LCAxMDAsIDEwMSwgMTAyLCAxMDMsIDEwNCwgMTA1XG4gIF07XG5cbiAgJChlbGVtKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuICQuaW5BcnJheShlLndoaWNoLCBhbGxvd2VkS2V5cykgPiAtMTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gZGVsZXRlR29CYWNrICh0aGF0LCBlKSB7XG4gICAgcmV0dXJuIHRoYXQuc2VsZWN0aW9uU3RhcnQgPT09IDAgJiYgJC5pbkFycmF5KGUud2hpY2gsIFsgOCwgNDYgXSkgPiAtMTtcbiAgfVxuXG4gIGxldCAkc29ydENvZGUgPSAkKGVsZW0pO1xuICBsZXQgY291bnQgPSAkc29ydENvZGUubGVuZ3RoIC0gMTtcbiAgbGV0ICRhY2NObyA9ICQobmV4dEVsZW0pO1xuXG4gICRzb3J0Q29kZS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgbGV0IGluZGV4ID0gJHNvcnRDb2RlLmluZGV4KHRoaXMpO1xuICAgIGxldCB2YWwgPSB0aGlzLnZhbHVlO1xuXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IHRoaXMubWF4TGVuZ3RoKSB7XG4gICAgICBpZiAoaW5kZXggPT09IGNvdW50KSB7XG4gICAgICAgICRhY2NOby5mb2N1cygpO1xuICAgICAgfSBlbHNlIGlmIChpbmRleCA8IGNvdW50KSB7XG4gICAgICAgICRzb3J0Q29kZS5lcShpbmRleCArIDEpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkZWxldGVHb0JhY2sodGhpcywgZSkgJiYgaW5kZXggIT09IDApIHtcbiAgICAgICRzb3J0Q29kZS5lcShpbmRleCAtIDEpLmZvY3VzKCk7XG4gICAgfVxuICB9KTtcblxuICAkYWNjTm8ub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZGVsZXRlR29CYWNrKHRoaXMsIGUpKSB7XG4gICAgICAkc29ydENvZGUubGFzdCgpLmZvY3VzKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gVG9nZ2xlUmVxdWlyZWRQYXltZW50RmllbGRzICgpIHtcblxuICBpZiAoJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdJykubGVuZ3RoID4gMCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiSGVsbG8gUmVndWxhciBQYXlcIik7XG5cbiAgICAvLyBpZiBtb250aGx5IHNlbGVjdGVkXG4gICAgLy8gdGhlbiBjaGVjayBmb3IgZGlyZWN0IGRlYml0IGluZm9ybWF0aW9uXG4gICAgJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdJykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoJCgnI3JlZ3VsYXItcGF5LWFubnVhbGx5OmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV2VsY29tZSB0byBBbm51YWwgcmVwYXltZW50c1wiKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIGNoZWNrIHBheW1lbnQgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXTpmaXJzdCcpLnBhcmVudCgpLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcblxuICAgICAgICAvLyBkZWFjdGl2YXRlIHRoZSBEaXJlY3QgRGViaXQgZmllbGRzIE5PVCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2FjY291bnQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjYWNjb3VudC1udW1iZXInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcblxuICAgICAgICAvLyBhY3RpdmF0ZSB0aGUgcGF5bWVudCB0eXBlIGZpZWxkcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgQ3JlZGl0L0RlYml0IENhcmQgZmllbGRzIE5PVCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2NhcmQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQxJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQ0JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNleHBpcnktZGF0ZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2N2JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCB0aGUgZGlyZWN0IGRlYml0IGZpZWxkcyB0byByZXF1aXJlZFxuICAgICAgaWYgKCQoJyNyZWd1bGFyLXBheS1tb250aGx5OmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV2VsY29tZSB0byBNb250aGx5IHJlcGF5bWVudHNcIik7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGdyYW5kcHJhcmVudCBib3ggc2V0IGVhcmxpZXIgd2hlbiBjaGVjayBwYXltZW50IHdhc24ndCBzZWxlY3RlZFxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl06Zmlyc3QnKS5wYXJlbnQoKS5wYXJlbnQoKS5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIERpcmVjdCBEZWJpdCBmaWVsZHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNhY2NvdW50LW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQyJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjYWNjb3VudC1udW1iZXInKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIHBheW1lbnQgdHlwZSBmaWVsZHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBkZWFjdGl2YXRlIHRoZSBDcmVkaXQvRGViaXQgQ2FyZCBmaWVsZHMgTk9UIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCcjY2FyZC1uYW1lJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDEnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQzJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2V4cGlyeS1kYXRlJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjY3YnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGlmIHBheW1lbnQgdHlwZSBzZWxlY3RlZFxuICAgIC8vIHRoZW4gY2hlY2sgZm9yIGVpdGhlciB0aGUgZGlyZWN0IGRlYml0IG9yIGNyZWRpdCBjYXJkIGluZm9ybWF0aW9uXG4gICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXScpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKCQoJyNwYXltZW50LXR5cGUtZGViaXQ6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWxjb21lIHRvIERpcmVjdCBEZWJpdCBwYXltZW50XCIpO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBncmFuZHByYXJlbnQgYm94IHNldCBlYXJsaWVyIHdoZW4gY2hlY2sgcGF5bWVudCB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXTpmaXJzdCcpLnBhcmVudCgpLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcblxuICAgICAgICAvLyBhY3RpdmF0ZSB0aGUgRGlyZWN0IERlYml0IGZpZWxkcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2FjY291bnQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQxJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNhY2NvdW50LW51bWJlcicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgQ3JlZGl0L0RlYml0IENhcmQgZmllbGRzIE5PVCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2NhcmQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQxJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQ0JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNleHBpcnktZGF0ZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2N2JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgkKCcjcGF5bWVudC10eXBlLWNyZWRpdDpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIldlbGNvbWUgdG8gQ3JlZGl0L0RlYml0IENhcmQgcGF5bWVudFwiKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIGNoZWNrIHBheW1lbnQgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl06Zmlyc3QnKS5wYXJlbnQoKS5wYXJlbnQoKS5jc3MoJ2hlaWdodCcsICc3NXB4Jyk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgRGlyZWN0IERlYml0IGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNhY2NvdW50LW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDEnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2FjY291bnQtbnVtYmVyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIENyZWRpdC9EZWJpdCBDYXJkIGZpZWxkcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2NhcmQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDEnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQyJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDQnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjZXhwaXJ5LWRhdGUnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjY2N2JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBUb2dnbGVSZXF1aXJlZEZpZWxkcyAoKSB7XG5cbiAgaWYgKCQoJ2lucHV0W25hbWU9XCJwcmUtZXhpc3RpbmctY29uZGl0aW9uXCJdJykubGVuZ3RoID4gMCkge1xuICAgIC8vIGNoZWNrIGZvciBwcmUtZXhpc3RpbmcgY29uZHRpb24gaW5mb3JtYXRpb25cbiAgICAkKCdpbnB1dFtuYW1lPVwicHJlLWV4aXN0aW5nLWNvbmRpdGlvblwiXScpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgLy8gcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGdyYW5kcHJhcmVudCBib3ggc2V0IGVhcmxpZXIgd2hlbiBwcmUtZXhpc3RpbmcgY29uZHRpb24gd2Fzbid0IHNlbGVjdGVkXG4gICAgICAkKCdpbnB1dFtuYW1lPVwicHJlLWV4aXN0aW5nLWNvbmRpdGlvblwiXTpmaXJzdCcpLnBhcmVudCgpLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmICgkKCdpbnB1dFtuYW1lPVwibmV1dGVyZWRcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgLy8gY2hlY2sgZm9yIG5ldXRlcmVkIGluZm9ybWF0aW9uXG4gICAgJCgnaW5wdXRbbmFtZT1cIm5ldXRlcmVkXCJdJykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIG5ldXRlcmVkIHdhc24ndCBzZWxlY3RlZFxuICAgICAgJCgnaW5wdXRbbmFtZT1cIm5ldXRlcmVkXCJdOmZpcnN0JykucGFyZW50KCkucGFyZW50KCkuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCQoJ2lucHV0W25hbWU9XCJwZXQtdHlwZVwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAvLyBjaGVjayBmb3IgcGV0LXR5cGUgaW5mb3JtYXRpb25cbiAgICAkKCdpbnB1dFtuYW1lPVwicGV0LXR5cGVcIl0nKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBncmFuZHByYXJlbnQgYm94IHNldCBlYXJsaWVyIHdoZW4gcGV0LXR5cGUgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAkKCdpbnB1dFtuYW1lPVwicGV0LXR5cGVcIl06Zmlyc3QnKS5wYXJlbnQoKS5wYXJlbnQoKS5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUGF5bWVudCwgQ2hlY2tCYW5rTnVtYmVyLCBUb2dnbGVSZXF1aXJlZFBheW1lbnRGaWVsZHMsIFRvZ2dsZVJlcXVpcmVkRmllbGRzIH07XG4iLCIvLyBtb2R1bGUgXCJQZXQuanNcIlxuXG5mdW5jdGlvbiBQZXQgKCkge1xuICAvLyBjYWNoZSBET01cbiAgbGV0ICRwcmVFeGlzdGluZ0NvbmRpdGlvblllcyA9ICQoJyNwcmUtZXhpc3RpbmctY29uZGl0aW9uLXllcycpO1xuICBsZXQgJHByZUV4aXN0aW5nQ29uZGl0aW9uTm8gPSAkKCcjcHJlLWV4aXN0aW5nLWNvbmRpdGlvbi1ubycpO1xuICBsZXQgJHBldENvbmRpdGlvbiA9ICQoJyNwZXQtY29uZGl0aW9uJyk7XG4gIGxldCAkY29uZGl0aW9uU2VsZWN0ID0gICQoJyNjb25kaXRpb24tc2VsZWN0Jyk7XG4gIGxldCAkZG9nVHlwZUJyZWVkID0gICQoJyNkb2ctdHlwZS1icmVlZCcpO1xuICBsZXQgJGNhdFR5cGVCcmVlZCA9ICAkKCcjY2F0LXR5cGUtYnJlZWQnKTtcblxuICBsZXQgJHBldFR5cGVEb2cgPSAkKCcjcGV0LXR5cGUtZG9nJyk7XG4gIGxldCAkcGV0VHlwZUNhdCA9ICQoJyNwZXQtdHlwZS1jYXQnKTtcbiAgbGV0ICRjYXRJbmZvID0gJCgnI2NhdC1pbmZvJyk7XG4gIGxldCAkZG9nSW5mbyA9ICQoJyNkb2ctaW5mbycpO1xuXG4gIGxldCAkZG9nVHlwZTEgPSAkKCcjZG9nLXR5cGUtMScpO1xuICBsZXQgJGRvZ1R5cGUyID0gJCgnI2RvZy10eXBlLTInKTtcblxuICBsZXQgJGRvZ1R5cGUgPSAkKCcjZG9nLXR5cGUnKTtcblxuICAvLyBiaW5kIGV2ZW50c1xuICAkcGV0VHlwZURvZy5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGNhdEluZm8uY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkZG9nSW5mby5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAkcGV0VHlwZUNhdC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGRvZ0luZm8uY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkY2F0SW5mby5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAkcHJlRXhpc3RpbmdDb25kaXRpb25ZZXMuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRwZXRDb25kaXRpb24uY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJHByZUV4aXN0aW5nQ29uZGl0aW9uTm8uY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICRwZXRDb25kaXRpb24uY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJGNvbmRpdGlvblNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgIGxldCBzZWxlY3QgPSAkKCcjY29uZGl0aW9uLXNlbGVjdCBvcHRpb246c2VsZWN0ZWQnKS52YWwoKTtcbiAgICAvLyBjcmVhdGUgYSBwaWxsXG4gICAgLy8gYXBwZW5kIHBpbGwgdG8gY29uZGl0aW9uIGxpc3RcbiAgICAkKCcuY29uZGl0aW9ucycpLmFwcGVuZChgPGRpdiBjbGFzcz1cInBpbGxfX2NvbmRpdGlvblwiPiR7c2VsZWN0fSA8c3BhbiBjbGFzcz1cImNsb3NlXCI+eDwvc3Bhbj48L2Rpdj5gKTtcblxuICAgIGNoZWNrRm9yQ29uZGl0aW9ucygpO1xuICB9KTtcblxuICAvLyBzZWxlY3QgdGhlIHJhZGlvIGJ1dHRvbiB3aGVuIHNlbGVjdCBlbGVtZW50IGNsaWNrZWRcbiAgJGRvZ1R5cGVCcmVlZC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCkudHJpZ2dlcignY2xpY2snKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCB0cnVlKTtcbiAgfSk7XG5cbiAgLy8gc2VsZWN0IHRoZSByYWRpbyBidXR0b24gd2hlbiBzZWxlY3QgZWxlbWVudCBjbGlja2VkXG4gICRjYXRUeXBlQnJlZWQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gIH0pO1xuXG4gICRkb2dUeXBlMS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJGRvZ1R5cGUuY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJGRvZ1R5cGUyLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkZG9nVHlwZS5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkZG9nVHlwZUJyZWVkLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkZG9nVHlwZS5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JDb25kaXRpb25zICgpIHtcbiAgJCgnLnBpbGxfX2NvbmRpdGlvbiAuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIFRvZ2dsZVJlcXVpcmVkUGV0RmllbGRzICgpIHtcbiAgLy8gaWYgcGV0IHR5cGUgc2VsZWN0ZWRcbiAgLy8gdGhlbiBjaGVjayBmb3JcbiAgJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdJykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKCQoJyNwZXQtdHlwZS1kb2c6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGFjdGl2YXRlIHRoZSBkb2cgcGV0IHR5cGUgZmllbGRzIGFzc2NvaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnI3Rlcm1zQWdyZWVtZW50JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJkb2ctdHlwZVwiXScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG5cbiAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIHBldCB0eXBlIGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAkKCdpbnB1dFtuYW1lPVwiY2F0LXR5cGVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoJCgnI3BldC10eXBlLWNhdDpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgLy8gYWN0aXZhdGUgdGhlIGNhdCBwZXQgdHlwZSBmaWVsZHMgYXNzY29pYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAkKCdpbnB1dFtuYW1lPVwiY2F0LXR5cGVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuXG4gICAgICAvLyBkZWFjdGl2YXRlIHRoZSBwZXQgdHlwZSBmaWVsZHMgTk9UIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnI3Rlcm1zQWdyZWVtZW50JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiZG9nLXR5cGVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH0pO1xuXG4gICQoJ2lucHV0W25hbWU9XCJkb2ctdHlwZVwiXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBkb2ctc2l6ZVxuICAgIGlmICgkKCcjZG9nLXR5cGUtMjpjaGVja2VkJykubGVuZ3RoID4gMCB8fCAkKCcjZG9nLXR5cGUtYnJlZWQ6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGFjdGl2YXRlIHRoZSBkb2cgcGV0IHR5cGUgZmllbGRzIGFzc2NvaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnaW5wdXRbbmFtZT1cImRvZy1zaXplXCJdJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmICgkKCcjZG9nLXR5cGUtMTpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgJCgnaW5wdXRbbmFtZT1cImRvZy1zaXplXCJdJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoJCgnI2RvZy10eXBlLTE6Y2hlY2tlZCcpLmxlbmd0aCA+IDAgfHwgJCgnI2RvZy10eXBlLTI6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGFjdGl2YXRlIHRoZSBkb2cgcGV0IHR5cGUgZmllbGRzIGFzc2NvaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnI2RvZy10eXBlLWJyZWVkJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgfVxuICB9KTtcblxuICAkKCdpbnB1dFtuYW1lPVwiY2F0LXR5cGVcIl0nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCQoJyNjYXQtdHlwZS0xOmNoZWNrZWQnKS5sZW5ndGggPiAwIHx8ICQoJyNjYXQtdHlwZS0yOmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBhY3RpdmF0ZSB0aGUgY2F0IHBldCB0eXBlIGZpZWxkcyBhc3Njb2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICQoJyNjYXQtdHlwZS1icmVlZCcpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgIH1cbiAgfSk7XG5cbn1cblxuZXhwb3J0IHsgUGV0LCBUb2dnbGVSZXF1aXJlZFBldEZpZWxkcyB9O1xuIiwiLy8gbW9kdWxlIFwiVmFsaWRhdGlvbi5qc1wiXG5cbmZ1bmN0aW9uIEFjdGl2YXRlRm9ybVZhbGlkYXRpb24gKCkge1xuICAvLyBGZXRjaCBhbGwgdGhlIGZvcm1zIHdlIHdhbnQgdG8gYXBwbHkgY3VzdG9tIEJvb3RzdHJhcCB2YWxpZGF0aW9uIHN0eWxlcyB0b1xuICBsZXQgZm9ybXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduZWVkcy12YWxpZGF0aW9uJyk7XG4gIC8vIExvb3Agb3ZlciB0aGVtIGFuZCBwcmV2ZW50IHN1Ym1pc3Npb25cbiAgbGV0IHZhbGlkYXRpb24gPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZm9ybXMsIGZ1bmN0aW9uIChmb3JtKSB7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChmb3JtLmNoZWNrVmFsaWRpdHkoKSA9PT0gZmFsc2UpIHtcblxuICAgICAgICAvLyBpZiBwZXQgdHlwZSBzZWxlY3RlZCBkbyB2YWxpZGl0eSBjaGVjayBvbiBpdCdzIGNoaWxkcmVuIHdoaWNoIGFmZmVjdCBpdHMgb3V0Y29tZVxuICAgICAgICAvLyBpZiBwZXQtdHlwZSBzZWxlY3RlZFxuICAgICAgICAvLyAgZG8gdmFsaWRpdHkgY2hlY2sgb24gdGhlIGVsZW1lbnRzIGluIHRoZSBhc3NvY2lhdGVkIGNvbGxhcHNlIGRpdlxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IG5leHRQYWdlO1xuXG4gICAgICAgIC8vIFRoZXJlIG1heWJlIG1vcmUgdGhhbiBvbmUgc3VibWl0IGJ1dHRvbiBvbiB0aGUgcGFnZVxuICAgICAgICAvLyBzbyB1bHRpbWF0ZWx5IHdlIHdvdWxkIGxpa2UgdGhlIG5leHQgYnV0dG9uIHRvIGJlIGFibGUgdG8gbW92ZSBvbnRvIHRoZSBuZXh0IHBhZ2VcbiAgICAgICAgaWYgKCQoJ2J1dHRvbltkYXRhLWhyZWZdJykgIT0gbnVsbCkge1xuICAgICAgICAgIG5leHRQYWdlID0gJCgnYnV0dG9uW2RhdGEtaHJlZl0nKS5kYXRhKCdocmVmJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtLmFjdGlvbiA9IG5leHRQYWdlO1xuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgICAgfVxuICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCd3YXMtdmFsaWRhdGVkJyk7XG5cbiAgICAgIC8vIGNoZWNrIGZvciBwb3N0YWwgYWRkcmVzc1xuICAgICAgaWYgKCQoJyNjdXN0b21lci1ob3VzZS1udW1iZXInKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICggJCgnI2N1c3RvbWVyLWhvdXNlLW51bWJlcicpLnZhbCgpID09PSAnJyB8fCAkKCcjY3VzdG9tZXItc3RyZWV0JykudmFsKCkgPT09ICcnIHx8ICQoJyNjdXN0b21lci10b3duLWNpdHknKS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgICAkKCcud2FzLXZhbGlkYXRlZCAuanMtaW52YWxpZC1wb3N0YWwtYWRkcmVzcy5pbnZhbGlkLWZlZWRiYWNrJykuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoJy53YXMtdmFsaWRhdGVkIC5qcy1pbnZhbGlkLXBvc3RhbC1hZGRyZXNzLmludmFsaWQtZmVlZGJhY2snKS5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgIC8vIGlmIGFsbCAzIHBhcnRzIG9mIHRoZSBhZGRyZXNzIGFyZSBjb21wbGV0ZVxuICAgICAgICAgIC8vIHRoZW4gaGlkZSB0aGUgaW52YWxpZC1mZWVkYmFja1xuICAgICAgICAgIGlmICgkKCcjY3VzdG9tZXItaG91c2UtbnVtYmVyJykudmFsKCkgIT09ICcnICYmICQoJyNjdXN0b21lci1zdHJlZXQnKS52YWwoKSAhPT0gJycgJiYgJCgnI2N1c3RvbWVyLXRvd24tY2l0eScpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgJCgnLndhcy12YWxpZGF0ZWQgLmpzLWludmFsaWQtcG9zdGFsLWFkZHJlc3MuaW52YWxpZC1mZWVkYmFjaycpLmhpZGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLndhcy12YWxpZGF0ZWQgLmpzLWludmFsaWQtcG9zdGFsLWFkZHJlc3MuaW52YWxpZC1mZWVkYmFjaycpLnNob3coKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBmb3IgcGF5bWVudHNcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdIZWxsbyBSZWd1bGFyIFBheSBjaGVjaycpO1xuICAgICAgICAvLyBpZiBhIHJlZ3VsYXIgcGF5bWVudCBpcyBub3Qgc2VsZWN0ZWRcbiAgICAgICAgLy8gdGhlbiBpbmNyZWFzZSB0aGUgaGVpZ2h0IG9mIHRoZSBmb3JtLWNoZWNrIGJveCB0byBhbGxvdyBmb3IgdGhlIGVycm9yIG1lZXNhZ2UgdG8gYmUgc2hvd25cbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXTpjaGVja2VkJykubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXTpmaXJzdCcpLnBhcmVudCgpLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgJzc1cHgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicGF5bWVudC10eXBlXCJdOmNoZWNrZWQnKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXTpmaXJzdCcpLnBhcmVudCgpLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgJzc1cHgnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBmb3IgcHJlLWV4aXN0aW5nIGNvbmRpdGlvbnNcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicHJlLWV4aXN0aW5nLWNvbmRpdGlvblwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gaWYgcHJlLWV4aXN0aW5nIGNvbmRpdGlvbiBpcyBub3Qgc2VsZWN0ZWRcbiAgICAgICAgLy8gdGhlbiBpbmNyZWFzZSB0aGUgaGVpZ2h0IG9mIHRoZSBmb3JtLWNoZWNrIGJveCB0byBhbGxvdyBmb3IgdGhlIGVycm9yIG1lZXNhZ2UgdG8gYmUgc2hvd25cbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwcmUtZXhpc3RpbmctY29uZGl0aW9uXCJdOmNoZWNrZWQnKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInByZS1leGlzdGluZy1jb25kaXRpb25cIl06Zmlyc3QnKS5wYXJlbnQoKS5wYXJlbnQoKS5jc3MoJ2hlaWdodCcsICc4MHB4Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgZm9yIG5ldXRlcmVkXG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cIm5ldXRlcmVkXCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBpZiBuZXV0ZXJlZCBpcyBub3Qgc2VsZWN0ZWRcbiAgICAgICAgLy8gdGhlbiBpbmNyZWFzZSB0aGUgaGVpZ2h0IG9mIHRoZSBmb3JtLWNoZWNrIGJveCB0byBhbGxvdyBmb3IgdGhlIGVycm9yIG1lZXNhZ2UgdG8gYmUgc2hvd25cbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXTpjaGVja2VkJykubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXTpmaXJzdCcpLnBhcmVudCgpLnBhcmVudCgpLmNzcygnaGVpZ2h0JywgJzgwcHgnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBmb3IgcGV0LXR5cGVcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicGV0LXR5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGlmIHBldC10eXBlIGlzIG5vdCBzZWxlY3RlZFxuICAgICAgICAvLyB0aGVuIGluY3JlYXNlIHRoZSBoZWlnaHQgb2YgdGhlIGZvcm0tY2hlY2sgYm94IHRvIGFsbG93IGZvciB0aGUgZXJyb3IgbWVlc2FnZSB0byBiZSBzaG93blxuICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdOmNoZWNrZWQnKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdOmZpcnN0JykucGFyZW50KCkucGFyZW50KCkuY3NzKCdoZWlnaHQnLCAnODBweCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgZmFsc2UpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQWN0aXZhdGVGb3JtVmFsaWRhdGlvbiB9O1xuIiwiLy8gaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi9jb21wb25lbnRzL1V0aWxzJztcblxuaW1wb3J0IHsgQ3VzdG9tU2VsZWN0IH0gZnJvbSAnLi9jb21wb25lbnRzL0N1c3RvbVNlbGVjdCc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi9jb21wb25lbnRzL0FkZHJlc3MnO1xuaW1wb3J0IHsgUGV0LCBUb2dnbGVSZXF1aXJlZFBldEZpZWxkcyB9IGZyb20gJy4vY29tcG9uZW50cy9QZXQnO1xuaW1wb3J0IHsgQ292ZXJUeXBlcyB9IGZyb20gJy4vY29tcG9uZW50cy9Db3ZlclR5cGVzJztcbmltcG9ydCB7IEFjdGl2YXRlRm9ybVZhbGlkYXRpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvVmFsaWRhdGlvbic7XG5pbXBvcnQgeyBQYXltZW50LCBDaGVja0JhbmtOdW1iZXIsIFRvZ2dsZVJlcXVpcmVkUGF5bWVudEZpZWxkcywgVG9nZ2xlUmVxdWlyZWRGaWVsZHMgfSBmcm9tICcuL2NvbXBvbmVudHMvUGF5bWVudCc7XG4vLyBpbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vY29tcG9uZW50cy9Nb2RhbCc7XG5cbi8vIFV0aWxzKCk7XG4vLyB3aW5kb3cubG9nID0gbG9nO1xuXG4oZnVuY3Rpb24gKCkge1xuICBDdXN0b21TZWxlY3QoKTtcbiAgQWRkcmVzcygpO1xuICBQZXQoKTtcbiAgQ292ZXJUeXBlcygpO1xuICBQYXltZW50KCk7XG5cbiAgLy8gY2hlY2sgc29ydCBjb2RlIGFuZCBhY2NvdW50IG51bWJlclxuICBBY3RpdmF0ZUZvcm1WYWxpZGF0aW9uKCk7XG5cbiAgaWYgKCQoJy5mb3JtLWdyb3VwLS1zb3J0Y29kZScpLmxlbmd0aCA+IDApIHtcbiAgICBDaGVja0JhbmtOdW1iZXIoJy5mb3JtLWdyb3VwLS1zb3J0Y29kZSBpbnB1dCcsICcjYWNjb3VudC1udW1iZXInKTtcbiAgfVxuXG4gIGlmICgkKCcuZm9ybS1ncm91cC0tYWNjb3VudC1udW1iZXInKS5sZW5ndGggPiAwKSB7XG4gICAgQ2hlY2tCYW5rTnVtYmVyKCcuZm9ybS1ncm91cC0tYWNjb3VudC1udW1iZXIgaW5wdXQnLCAnI2V4cGlyeS1kYXRlJyk7XG4gIH1cblxuICBUb2dnbGVSZXF1aXJlZFBheW1lbnRGaWVsZHMoKTtcbiAgVG9nZ2xlUmVxdWlyZWRQZXRGaWVsZHMoKTtcbiAgVG9nZ2xlUmVxdWlyZWRGaWVsZHMoKTtcblxuICAvLyBNb2RhbCgpO1xufSkoKTtcbiJdfQ==
