(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module 'Address.js'

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

function closeAllSelect(elmnt) {
  /* a function that will close all select boxes in the document,
  except the current select box: */

  var arrNo = [];
  var x = document.getElementsByClassName('select-items');
  var y = document.getElementsByClassName('select-selected');
  for (var i = 0; i < y.length; i += 1) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }
  for (var _i = 0; _i < x.length; _i += 1) {
    if (arrNo.indexOf(_i)) {
      x[_i].classList.add('select-hide');
    }
  }
}

function closeOtherOptions(e) {
  /* when the select box is clicked, close any other select boxes,
  and open/close the current select box: */
  e.stopPropagation();
  closeAllSelect(this);
  this.nextSibling.classList.toggle('select-hide');
  this.classList.toggle('select-arrow-active');
}

function checkForConditions() {
  $('.pill__condition .close').on('click', function (evt) {
    evt.preventDefault();
    evt.currentTarget.parentNode.remove();
  });
}

function CustomSelect() {
  var selectedItem = void 0;
  var optionList = void 0;
  var optionItem = void 0;

  // cache DOM
  /* look for any elements with the class "select--alt": */
  var selectAlt = document.getElementsByClassName('select--alt');

  // bind Events
  for (var i = 0; i < selectAlt.length; i += 1) {
    var selElement = selectAlt[i].getElementsByTagName('select')[0];

    /* for each element, create a new DIV that will act as the selected item: */
    selectedItem = document.createElement('DIV');
    selectedItem.setAttribute('class', 'select-selected');
    selectedItem.innerHTML = selElement.options[selElement.selectedIndex].innerHTML;

    selectAlt[i].appendChild(selectedItem);

    /* for each element, create a new DIV that will contain the option list: */
    optionList = document.createElement('DIV');
    optionList.setAttribute('class', 'select-items select-hide');

    for (var j = 1; j < selElement.length; j += 1) {
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
  function syncOptionSelected() {
    /* when an item is clicked, update the original select box,
    and the selected item: */
    var originalSelect = this.parentNode.parentNode.getElementsByTagName('select')[0];

    // store the selected item
    var h = this.parentNode.previousSibling;
    for (var _i2 = 0; _i2 < originalSelect.length; _i2 += 1) {
      if (originalSelect.options[_i2].innerHTML === this.innerHTML) {
        originalSelect.selectedIndex = _i2;
        h.innerHTML = this.innerHTML;
        var y = this.parentNode.getElementsByClassName('same-as-selected');
        for (var k = 0; k < y.length; k += 1) {
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

exports.CustomSelect = CustomSelect;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module 'DatePicker.js'

// postcodes
function SetDate() {
  // cache DOM

  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();

  if (month < 10) month = '0' + month.toString();
  if (day < 10) day = '0' + day.toString();

  var maxDate = year + '-' + month + '-' + day;
  return maxDate;
}

function AddTodaysDate() {
  // cache DOM
  var $todaysDate = $('label[for="policy-start-immediately"');
  var $policyStartDate = $('#policy-start-date');

  // bind Events
  $todaysDate.change(AddTodaysDateHandler);

  // methods
  function AddTodaysDateHandler() {
    if (!$policyStartDate.attr('disabled')) {
      $policyStartDate.val(SetDate());
      $policyStartDate.attr('disabled', true);
    } else {
      $policyStartDate.attr('disabled', false);
    }
  }
}
exports.SetDate = SetDate;
exports.AddTodaysDate = AddTodaysDate;

},{}],5:[function(require,module,exports){
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
    $('input[name="regular-pay"]').click(function () {
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
        $('#card-number').prop('required', false);
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
        $('#card-number').prop('required', false);
        $('#expiry-date').prop('required', false);
        $('#ccv').prop('required', false);
      }
    });

    // if payment type selected
    // then check for either the direct debit or credit card information
    $('input[name="payment-type"]').click(function () {
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
        $('#card-number').prop('required', false);
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
        $('#card-number').prop('required', true);
        $('#expiry-date').prop('required', true);
        $('#ccv').prop('required', true);
      }
    });
  }
}

function ToggleRequiredFields() {
  if ($('input[name="pre-existing-condition"]').length > 0) {
    // check for pre-existing condtion information
    $('input[name="pre-existing-condition"]').click(function () {
      // return the height of the grandprarent box set earlier when pre-existing condtion wasn't selected
      $('input[name="pre-existing-condition"]:first').parent().parent().css('height', 'auto');
    });
  }

  if ($('input[name="neutered"]').length > 0) {
    // check for neutered information
    $('input[name="neutered"]').click(function () {
      // return the height of the grandprarent box set earlier when neutered wasn't selected
      $('input[name="neutered"]:first').parent().parent().css('height', 'auto');
    });
  }

  if ($('input[name="pet-type"]').length > 0) {
    // check for pet-type information
    $('input[name="pet-type"]').click(function () {
      // return the height of the grandprarent box set earlier when pet-type wasn't selected
      $('input[name="pet-type"]:first').parent().parent().css('height', 'auto');
    });
  }
}

var keyCount = 1;
function isNumberKey(event) {
  var keyCode = window.event ? event.keyCode : event.which;

  if (keyCode === 8 || // backspace
  keyCode === 46 || // delete
  keyCode === 13 || // enter key
  keyCode === 9 || // tab
  keyCode === 116 || // F5 (refresh)
  keyCode === 112 || // F1
  keyCode === 113 || // F2
  keyCode === 114 || // F3
  keyCode === 115 || // F4
  keyCode === 117 || // F6
  keyCode === 118 || // F7
  keyCode === 119 || // F8
  keyCode === 120 || // F9
  keyCode === 121 || // F10
  keyCode === 122 || // F11
  keyCode === 123 // F12
  ) {
      return true;
    }
  if (keyCode < 48 || keyCode > 57) {
    if (keyCount < 6) {
      keyCount += 1; // adds one to count
    } else {
      console.log('Please Only Enter Numerical Values');
      keyCount = 1;
    }
    // return false;
  }
  return true;
}

function keyPressed(elm, maxKeyCount) {
  if (elm.val().length >= maxKeyCount) {
    elm.val(elm.val().substr(0, maxKeyCount));
    elm.removeClass('is-invalid');
    elm.addClass('is-valid');
  } else {
    elm.addClass('is-invalid');
    elm.removeClass('is-valid');
  }
}
function keyPressCheck(elm, maxKeyCount) {
  elm.keydown(function () {
    keyPressed($(this), maxKeyCount);
  });

  elm.keyup(function () {
    keyPressed($(this), maxKeyCount);
  });
}

// function GetCardType(number) {
//   // visa
//   let re = new RegExp('^4');
//   if (number.match(re) != null) return 'Visa';

//   // Mastercard
//   // Updated for Mastercard 2017 BINs expansion
//   if (
//     /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)
//   )
//     return 'Mastercard';

//   // AMEX
//   re = new RegExp('^3[47]');
//   if (number.match(re) != null) return 'AMEX';

//   // Discover
//   re = new RegExp('^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)');
//   if (number.match(re) != null) return 'Discover';

//   // Diners
//   re = new RegExp('^36');
//   if (number.match(re) != null) return 'Diners';

//   // Diners - Carte Blanche
//   re = new RegExp('^30[0-5]');
//   if (number.match(re) != null) return 'Diners - Carte Blanche';

//   // JCB
//   re = new RegExp('^35(2[89]|[3-8][0-9])');
//   if (number.match(re) != null) return 'JCB';

//   // Visa Electron
//   re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
//   if (number.match(re) != null) return 'Visa Electron';

//   return '';
// }

function CreditCardTypeDetector(options) {
  var settings = $.extend({
    credit_card_logos_id: '.card_logos',
    elm: '#card-number'
  }, options);

  // the object that contains the logos

  var logos_obj = $(settings.credit_card_logos_id);

  // the regular expressions check for possible matches as you type, hence the OR operators based on the number of chars
  // Visa
  var visa_regex = new RegExp('^4[0-9]{0,15}$');

  // MasterCard

  var mastercard_regex = new RegExp('^5$|^5[1-5][0-9]{0,14}$');

  // American Express

  var amex_regex = new RegExp('^3$|^3[47][0-9]{0,13}$');

  // Diners Club

  var diners_regex = new RegExp('^3$|^3[068]$|^3(?:0[0-5]|[68][0-9])[0-9]{0,11}$');

  // Discover

  var discover_regex = new RegExp('^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$');

  // JCB

  var jcb_regex = new RegExp('^2[1]?$|^21[3]?$|^1[8]?$|^18[0]?$|^(?:2131|1800)[0-9]{0,11}$|^3[5]?$|^35[0-9]{0,14}$');

  return $(settings.elm).each(function () {
    // as the user types
    $(this).keyup(function () {
      var currentValue = $(this).val();

      // get rid of spaces and dashes before using the regular expression
      currentValue = currentValue.replace(/ /g, '').replace(/-/g, '');

      // checks per each, as their could be multiple hits
      if (currentValue.match(visa_regex)) {
        $(logos_obj).addClass('is_visa');
      } else {
        $(logos_obj).removeClass('is_visa');
      }

      if (currentValue.match(mastercard_regex)) {
        $(logos_obj).addClass('is_mastercard');
      } else {
        $(logos_obj).removeClass('is_mastercard');
      }

      if (currentValue.match(amex_regex)) {
        $(logos_obj).addClass('is_amex');
      } else {
        $(logos_obj).removeClass('is_amex');
      }

      if (currentValue.match(diners_regex)) {
        $(logos_obj).addClass('is_diners');
      } else {
        $(logos_obj).removeClass('is_diners');
      }

      if (currentValue.match(discover_regex)) {
        $(logos_obj).addClass('is_discover');
      } else {
        $(logos_obj).removeClass('is_discover');
      }

      if (currentValue.match(jcb_regex)) {
        $(logos_obj).addClass('is_jcb');
      } else {
        $(logos_obj).removeClass('is_jcb');
      }

      // if nothing is a hit we add a class to fade them all out
      if (currentValue != '' && !currentValue.match(visa_regex) && !currentValue.match(mastercard_regex) && !currentValue.match(amex_regex) && !currentValue.match(diners_regex) && !currentValue.match(discover_regex) && !currentValue.match(jcb_regex)) {
        $(logos_obj).addClass('is_nothing');
      } else {
        $(logos_obj).removeClass('is_nothing');
      }
    });
  });
}

exports.Payment = Payment;
exports.CheckBankNumber = CheckBankNumber;
exports.ToggleRequiredPaymentFields = ToggleRequiredPaymentFields;
exports.ToggleRequiredFields = ToggleRequiredFields;
exports.isNumberKey = isNumberKey;
exports.keyPressCheck = keyPressCheck;
exports.CreditCardTypeDetector = CreditCardTypeDetector;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module "Pet.js"

function checkForConditions() {
  $('.pill__condition .close').on('click', function (evt) {
    evt.preventDefault();
    evt.currentTarget.parentNode.remove();

    // make the remove condition active in the dropdown
    var btnText = evt.currentTarget.parentNode.textContent;
    var condition = btnText.substr(0, btnText.length - 2);

    // find condition in select condition-select
    $('#condition-select option').filter(function () {
      return $(this).html() === condition;
    }).prop('disabled', false);

    // remove from storage
    var conditions = [];
    conditions = JSON.parse($('#pet-conditions').val());
    conditions = conditions.filter(function (e) {
      return e !== condition;
    });
    $('#pet-conditions').val(JSON.stringify(conditions));
  });
}

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
    var $select = $('#condition-select option:selected');

    // ignore the first option in the list
    if ($('#condition-select option:selected').index() === 0) {
      return;
    }

    // disabled selected condition
    $select.prop('disabled', true);

    // create a pill
    // append pill to condition list
    $('.conditions').append('<div class="pill__condition">' + $select.text() + ' <span class="close">x</span></div>');

    // keep a record in the main store
    var conditionsArray = [];
    var $conditions = $('#pet-conditions');
    if ($conditions !== null && $conditions.val() !== '[]' && $conditions.val() !== '') {
      conditionsArray = JSON.parse($conditions.val());
    }
    conditionsArray.push($select.text());
    $('#pet-conditions').val(JSON.stringify(conditionsArray));

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

function ToggleRequiredPetFields() {
  // if pet type selected
  // then check for
  $('input[name="pet-type"]').click(function () {
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

},{}],7:[function(require,module,exports){
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

        form.addEventListener('keyup', function () {
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

      // check for pet conditions in a hidden value
      if ($('#pet-conditions') !== null) {
        // console.log($('#pet-conditions').val());
        if ($('#pet-conditions').val() !== '[]') {
          $('#condition-select').prop('required', false);
          $('#condition-select').removeClass('border-danger');
          $('#condition-select').addClass('border-success');
        } else {
          $('#condition-select').prop('required', true);
          $('#condition-select').removeClass('border-success');
          $('#condition-select').addClass('border-danger');
        }
      }
    }, false);
  });
}

exports.ActivateFormValidation = ActivateFormValidation;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module "WhiteLabelling.js"

// postcodes

var httpRequest = void 0;

function WhiteLabelling() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Towergate';

  // if (theme === 'Healthy Pets') {
  //   // main colours
  //   document.documentElement.style.setProperty('--primary-colour', 'orange');

  //   // main body and panel backgrounds
  //   document.documentElement.style.setProperty('--panel-bg-colour', 'orange');
  //   document.documentElement.style.setProperty('--body-bg-colour', 'orange');

  //   // menu background colour
  //   document.documentElement.style.setProperty('--menu-bg-colour', 'orange');
  //   document.documentElement.style.setProperty('--sub-menu-bg-colour', 'orange');

  //   // policy colours
  //   document.documentElement.style.setProperty('--lifetime-colour', 'orange');
  //   document.documentElement.style.setProperty('--maximum-colour', 'orange');
  //   document.documentElement.style.setProperty('--accident-colour', 'orange');

  //   // form colours
  //   document.documentElement.style.setProperty('--form-label-colour', 'orange');
  //   document.documentElement.style.setProperty('--cta-colour', 'orange');
  //   document.documentElement.style.setProperty('--input-bg-colour', 'orange');
  // }
  makeRequest('theme.json');
}

function makeRequest(file) {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    console.warn('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }

  httpRequest.onreadystatechange = processContents;
  httpRequest.open('GET', '/config/' + file);
  httpRequest.send();
}

function processContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      // parse the json file
      var config = JSON.parse(httpRequest.responseText);

      // load theme
      switch (config.command) {
        case 'load':
          makeRequest('/themes/' + config.theme);
          break;
        case 'activate':
          loadTheme(config);
          break;
        default:
        // do nothing
      }
    } else {
      console.error('There was a problem with the request.');
    }
  }
}

function loadTheme(theme) {
  // console.log(theme);
  // change css info
  // for (const style in theme.colours) {
  //   document.documentElement.style.setProperty(style, theme.colours[style]);
  // }

  var cssId = 'myCss'; // you could encode the css path itself to generate id..
  if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = theme.css;
    link.media = 'all';
    head.appendChild(link);
  }

  // change image info
  document.querySelector('.logo__mobile').setAttribute('srcset', theme.images['logo-mobile']);
  document.querySelector('.logo__desktop').setAttribute('srcset', theme.images['logo-desktop']);
  document.querySelector('.logo img').setAttribute('src', theme.images['logo-mobile']);
  document.querySelector('.logo img').setAttribute('alt', theme.name + ' logo');
}

exports.WhiteLabelling = WhiteLabelling;

},{}],9:[function(require,module,exports){
'use strict';

var _CustomSelect = require('./components/CustomSelect');

var _Address = require('./components/Address');

var _DatePicker = require('./components/DatePicker');

var _Pet = require('./components/Pet');

var _CoverTypes = require('./components/CoverTypes');

var _Validation = require('./components/Validation');

var _Payment = require('./components/Payment');

var _WhiteLabelling = require('./components/WhiteLabelling');

// Utils();
// window.log = log;

// import { log } from './components/Utils';

(function () {
  (0, _CustomSelect.CustomSelect)();
  (0, _Address.Address)();
  (0, _Pet.Pet)();
  (0, _CoverTypes.CoverTypes)();
  (0, _Payment.Payment)();
  (0, _WhiteLabelling.WhiteLabelling)('Towergate');
  (0, _DatePicker.AddTodaysDate)();

  // check sort code and account number
  (0, _Validation.ActivateFormValidation)();

  if ($('.form-group--sortcode').length > 0) {
    (0, _Payment.CheckBankNumber)('.form-group--sortcode input', '#account-number');
  }

  // limit the number length for bank details
  if ($('.form-group--account-number input').length > 0) {
    (0, _Payment.keyPressCheck)($('.form-group--account-number input'), 16);
  }
  if ($('.form-control--ccv').length > 0) {
    (0, _Payment.keyPressCheck)($('.form-control--ccv'), 3);
  }

  var maxDate = (0, _DatePicker.SetDate)();
  $('input[type=date]').each(function () {
    $(this).attr('max', maxDate);
  });

  $('#expiry-date').removeAttr('max');

  (0, _Payment.CreditCardTypeDetector)({ credit_card_logos: '.card_logos', elm: '#card-number' });

  (0, _Payment.ToggleRequiredPaymentFields)();
  (0, _Pet.ToggleRequiredPetFields)();
  (0, _Payment.ToggleRequiredFields)();
})();

},{"./components/Address":1,"./components/CoverTypes":2,"./components/CustomSelect":3,"./components/DatePicker":4,"./components/Payment":5,"./components/Pet":6,"./components/Validation":7,"./components/WhiteLabelling":8}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0FkZHJlc3MuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0NvdmVyVHlwZXMuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0N1c3RvbVNlbGVjdC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvRGF0ZVBpY2tlci5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGF5bWVudC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGV0LmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9WYWxpZGF0aW9uLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9XaGl0ZUxhYmVsbGluZy5qcyIsInNyYy9zY3JpcHRzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQTs7QUFFQTtBQUNBLFNBQVMsT0FBVCxHQUFtQjtBQUNqQjtBQUNBLE1BQU0sa0JBQWtCLEVBQUUsMkJBQUYsQ0FBeEI7QUFDQSxNQUFNLG9CQUFvQixFQUFFLHVCQUFGLENBQTFCO0FBQ0EsTUFBTSxlQUFlLEVBQUUsZ0JBQUYsQ0FBckI7O0FBRUEsTUFBTSxrQkFBa0IsRUFBRSwyQkFBRixDQUF4QjtBQUNBLE1BQU0saUJBQWlCLEVBQUUsMEJBQUYsQ0FBdkI7QUFDQSxNQUFNLFdBQVcsRUFBRSxtQkFBRixDQUFqQjs7QUFFQTtBQUNBLGtCQUFnQixLQUFoQixDQUFzQixVQUFTLEdBQVQsRUFBYztBQUNsQyxRQUFJLGNBQUo7QUFDQSxvQkFBZ0IsUUFBaEIsQ0FBeUIsUUFBekI7QUFDQSxtQkFBZSxRQUFmLENBQXdCLE1BQXhCO0FBQ0EsYUFBUyxRQUFULENBQWtCLE1BQWxCO0FBQ0QsR0FMRDs7QUFPQSxvQkFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBUyxHQUFULEVBQWM7QUFDMUMsUUFBSSxjQUFKO0FBQ0EsYUFBUyxR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OztBQUVEO0FBQ0EsTUFBSSxFQUFFLG1DQUFGLEVBQXVDLE1BQXZDLEdBQWdELENBQXBELEVBQXVEO0FBQ3JELGdDQUFjLEVBQUUsbUNBQUYsQ0FBZCxFQUFzRCxFQUF0RDtBQUNEO0FBQ0QsTUFBSSxFQUFFLG9CQUFGLEVBQXdCLE1BQXhCLEdBQWlDLENBQXJDLEVBQXdDO0FBQ3RDLGdDQUFjLEVBQUUsb0JBQUYsQ0FBZCxFQUF1QyxDQUF2QztBQUNEOztBQUVELE1BQU0sVUFBVSwwQkFBaEI7QUFDQSxJQUFFLGtCQUFGLEVBQXNCLElBQXRCLENBQTJCLFlBQVc7QUFDcEMsTUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLEtBQWIsRUFBb0IsT0FBcEI7QUFDRCxHQUZEOztBQUlBLElBQUUsY0FBRixFQUFrQixVQUFsQixDQUE2QixLQUE3Qjs7QUFFQSx1Q0FBdUIsRUFBRSxtQkFBbUIsYUFBckIsRUFBb0MsS0FBSyxjQUF6QyxFQUF2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDRCxDQXBDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIG1vZHVsZSAnQWRkcmVzcy5qcydcblxuLy8gcG9zdGNvZGVzXG5mdW5jdGlvbiBBZGRyZXNzKCkge1xuICAvLyBjYWNoZSBET01cbiAgY29uc3QgJHBvc3Rjb2RlU2VhcmNoID0gJCgnI2N1c3RvbWVyLXBvc3Rjb2RlLXNlYXJjaCcpO1xuICBjb25zdCAkYWRkcmVzc1Bvc3Rjb2RlcyA9ICQoJy5hZGRyZXNzX19wb3N0Y29kZXMgYScpO1xuICBjb25zdCAkYWRkcmVzc0xpbmsgPSAkKCcuYWRkcmVzc19fbGluaycpO1xuXG4gIGNvbnN0ICRwb3N0Y29kZVJlc3VsdCA9ICQoJyNjdXN0b21lci1wb3N0Y29kZS1yZXN1bHQnKTtcbiAgY29uc3QgJG1hbnVhbEFkZHJlc3MgPSAkKCcjY3VzdG9tZXItbWFudWFsLWFkZHJlc3MnKTtcbiAgY29uc3QgJGFkZHJlc3MgPSAkKCcjY3VzdG9tZXItYWRkcmVzcycpO1xuXG4gIC8vIGJpbmQgZXZlbnRzXG4gICRwb3N0Y29kZVNlYXJjaC5jbGljayhmdW5jdGlvbihldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ3RvZ2dsZScpO1xuICAgICRtYW51YWxBZGRyZXNzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJGFkZHJlc3NQb3N0Y29kZXMub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWRkcmVzc0xpbmsub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQWRkcmVzcyB9O1xuIiwiLy8gbW9kdWxlIFwiQ292ZXJUeXBlcy5qc1wiXG5cbmZ1bmN0aW9uIENvdmVyVHlwZXMoKSB7XG4gIC8vIGNhY2hlIERPTVxuICBjb25zdCAkbGlmZXRpbWVMaW5rID0gJCgnI2xpZmV0aW1lLWxpbmsnKTtcbiAgY29uc3QgJG1heGltdW1MaW5rID0gJCgnI21heGltdW0tbGluaycpO1xuICBjb25zdCAkYWNjaWRlbnRMaW5rID0gJCgnI2FjY2lkZW50LWxpbmsnKTtcbiAgY29uc3QgJGJ0bkNvdmVyTGV2ZWwgPSAkKCcuYnRuLS1jb3Zlci1sZXZlbCcpO1xuXG4gIGNvbnN0ICRsaWZldGltZUNvdmVyID0gJCgnI2xpZmV0aW1lLWNvdmVyJyk7XG4gIGNvbnN0ICRtYXhpbXVtQ292ZXIgPSAkKCcjbWF4aW11bS1jb3ZlcicpO1xuICBjb25zdCAkYWNjaWRlbnRDb3ZlciA9ICQoJyNhY2NpZGVudC1jb3ZlcicpO1xuXG4gICRsaWZldGltZUxpbmsuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJG1heGltdW1MaW5rLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRsaWZldGltZUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJG1heGltdW1Db3Zlci5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRhY2NpZGVudENvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRhY2NpZGVudExpbmsuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gYmluZCBFdmVudHNcblxuICAvLyBzdG9wIHdlYiBwYWdlIGZyb20gc2Nyb2xsaW5nIHRvIHRvcCB3aGVuIGxpbmsgaXMgY2xpY2tlZCB0aGF0IHRyaWdnZXJzIEphdmFTY3JpcHRcbiAgJGJ0bkNvdmVyTGV2ZWwuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyB0YXJnZXQgaWRcbiAgICBjb25zdCB0YXJnZXRJZCA9ICQodGhpcykuZGF0YSgndGFyZ2V0Jyk7XG4gICAgY29uc3QgdGFyZ2V0SGVpZ2h0ID0gJCh0YXJnZXRJZCkuaGVpZ2h0KCkgLSAxMDA7XG4gICAgLy8gbGV0IGRvY3VtZW50SGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KCk7XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRhcmdldEhlaWdodCB9KTtcblxuICAgIGlmICh0aGlzLmlubmVySFRNTCA9PT0gJ0Nob29zZSBsZXZlbCcpIHtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gJ0hpZGUgbGV2ZWxzJztcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdidG4tLW91dGxpbmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbm5lckhUTUwgPSAnQ2hvb3NlIGxldmVsJztcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2J0bi0tb3V0bGluZScpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKTtcbiAgICB9XG5cbiAgICAvLyBnZXQgZGF0YSB0YXJnZXRcbiAgICAvLyBzcGxpdCBvbiBcIi1cIlxuICAgIGNvbnN0IHRhcmdldEFycmF5ID0gJCh0aGlzKVxuICAgICAgLmRhdGEoJ3RhcmdldCcpXG4gICAgICAuc3BsaXQoJy0nKTtcbiAgICBjb25zb2xlLmxvZygndGFyZ2V0OiAnLCB0YXJnZXRBcnJheVsxXSk7XG4gICAgLy8gY292ZXIgPSBnZXQgMm5kIGVsZW1lbnRcbiAgICAvLyBmaW5kIGlkIFwie2NvdmVyfS1jb3ZlclwiXG4gICAgLy8gcmVtb3ZlIGZyb20gY2xhc3NsaXN0IFwic2hvd1wiXG4gICAgLy8gJChgJHt0YXJnZXRBcnJheVsxXX0tY292ZXJgKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQ292ZXJUeXBlcyB9O1xuIiwiLy8gbW9kdWxlIFwiQ3VzdG9tU2VsZWN0LmpzXCJcblxuZnVuY3Rpb24gY2xvc2VBbGxTZWxlY3QoZWxtbnQpIHtcbiAgLyogYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2xvc2UgYWxsIHNlbGVjdCBib3hlcyBpbiB0aGUgZG9jdW1lbnQsXG4gIGV4Y2VwdCB0aGUgY3VycmVudCBzZWxlY3QgYm94OiAqL1xuXG4gIGNvbnN0IGFyck5vID0gW107XG4gIGNvbnN0IHggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtaXRlbXMnKTtcbiAgY29uc3QgeSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1zZWxlY3RlZCcpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoZWxtbnQgPT0geVtpXSkge1xuICAgICAgYXJyTm8ucHVzaChpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QtYXJyb3ctYWN0aXZlJyk7XG4gICAgfVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChhcnJOby5pbmRleE9mKGkpKSB7XG4gICAgICB4W2ldLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdC1oaWRlJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlT3RoZXJPcHRpb25zKGUpIHtcbiAgLyogd2hlbiB0aGUgc2VsZWN0IGJveCBpcyBjbGlja2VkLCBjbG9zZSBhbnkgb3RoZXIgc2VsZWN0IGJveGVzLFxuICBhbmQgb3Blbi9jbG9zZSB0aGUgY3VycmVudCBzZWxlY3QgYm94OiAqL1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBjbG9zZUFsbFNlbGVjdCh0aGlzKTtcbiAgdGhpcy5uZXh0U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3QtaGlkZScpO1xuICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdC1hcnJvdy1hY3RpdmUnKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JDb25kaXRpb25zKCkge1xuICAkKCcucGlsbF9fY29uZGl0aW9uIC5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBDdXN0b21TZWxlY3QoKSB7XG4gIGxldCBzZWxlY3RlZEl0ZW07XG4gIGxldCBvcHRpb25MaXN0O1xuICBsZXQgb3B0aW9uSXRlbTtcblxuICAvLyBjYWNoZSBET01cbiAgLyogbG9vayBmb3IgYW55IGVsZW1lbnRzIHdpdGggdGhlIGNsYXNzIFwic2VsZWN0LS1hbHRcIjogKi9cbiAgY29uc3Qgc2VsZWN0QWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LS1hbHQnKTtcblxuICAvLyBiaW5kIEV2ZW50c1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdEFsdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHNlbEVsZW1lbnQgPSBzZWxlY3RBbHRbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NlbGVjdCcpWzBdO1xuXG4gICAgLyogZm9yIGVhY2ggZWxlbWVudCwgY3JlYXRlIGEgbmV3IERJViB0aGF0IHdpbGwgYWN0IGFzIHRoZSBzZWxlY3RlZCBpdGVtOiAqL1xuICAgIHNlbGVjdGVkSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIHNlbGVjdGVkSXRlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NlbGVjdC1zZWxlY3RlZCcpO1xuICAgIHNlbGVjdGVkSXRlbS5pbm5lckhUTUwgPSBzZWxFbGVtZW50Lm9wdGlvbnNbc2VsRWxlbWVudC5zZWxlY3RlZEluZGV4XS5pbm5lckhUTUw7XG5cbiAgICBzZWxlY3RBbHRbaV0uYXBwZW5kQ2hpbGQoc2VsZWN0ZWRJdGVtKTtcblxuICAgIC8qIGZvciBlYWNoIGVsZW1lbnQsIGNyZWF0ZSBhIG5ldyBESVYgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIG9wdGlvbiBsaXN0OiAqL1xuICAgIG9wdGlvbkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBvcHRpb25MaXN0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2VsZWN0LWl0ZW1zIHNlbGVjdC1oaWRlJyk7XG5cbiAgICBmb3IgKGxldCBqID0gMTsgaiA8IHNlbEVsZW1lbnQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIC8qIGZvciBlYWNoIG9wdGlvbiBpbiB0aGUgb3JpZ2luYWwgc2VsZWN0IGVsZW1lbnQsXG4gICAgICBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBhY3QgYXMgYW4gb3B0aW9uIGl0ZW06ICovXG4gICAgICBvcHRpb25JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICBvcHRpb25JdGVtLmlubmVySFRNTCA9IHNlbEVsZW1lbnQub3B0aW9uc1tqXS5pbm5lckhUTUw7XG4gICAgICBvcHRpb25JdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3luY09wdGlvblNlbGVjdGVkKTtcblxuICAgICAgb3B0aW9uTGlzdC5hcHBlbmRDaGlsZChvcHRpb25JdGVtKTtcbiAgICB9XG5cbiAgICBzZWxlY3RBbHRbaV0uYXBwZW5kQ2hpbGQob3B0aW9uTGlzdCk7XG5cbiAgICBzZWxlY3RlZEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU90aGVyT3B0aW9ucyk7XG4gIH1cblxuICAvLyBtZXRob2RzXG4gIGZ1bmN0aW9uIHN5bmNPcHRpb25TZWxlY3RlZCgpIHtcbiAgICAvKiB3aGVuIGFuIGl0ZW0gaXMgY2xpY2tlZCwgdXBkYXRlIHRoZSBvcmlnaW5hbCBzZWxlY3QgYm94LFxuICAgIGFuZCB0aGUgc2VsZWN0ZWQgaXRlbTogKi9cbiAgICBjb25zdCBvcmlnaW5hbFNlbGVjdCA9IHRoaXMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzZWxlY3QnKVswXTtcblxuICAgIC8vIHN0b3JlIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgY29uc3QgaCA9IHRoaXMucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmlnaW5hbFNlbGVjdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKG9yaWdpbmFsU2VsZWN0Lm9wdGlvbnNbaV0uaW5uZXJIVE1MID09PSB0aGlzLmlubmVySFRNTCkge1xuICAgICAgICBvcmlnaW5hbFNlbGVjdC5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgaC5pbm5lckhUTUwgPSB0aGlzLmlubmVySFRNTDtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzYW1lLWFzLXNlbGVjdGVkJyk7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgeS5sZW5ndGg7IGsgKz0gMSkge1xuICAgICAgICAgIHlba10ucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzYW1lLWFzLXNlbGVjdGVkJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBoLmNsaWNrKCk7XG4gICAgaWYgKG9yaWdpbmFsU2VsZWN0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PT0gJ2NvbmRpdGlvbi1zZWxlY3QnKSB7XG4gICAgICAkKCcuY29uZGl0aW9ucycpLmFwcGVuZChgPGRpdiBjbGFzcz0ncGlsbF9fY29uZGl0aW9uJz4ke2guaW5uZXJIVE1MfSA8c3BhbiBjbGFzcz0nY2xvc2UnPng8L3NwYW4+PC9kaXY+YCk7XG4gICAgICBjaGVja0ZvckNvbmRpdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICAvKiBpZiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgb3V0c2lkZSB0aGUgc2VsZWN0IGJveCxcbiAgdGhlbiBjbG9zZSBhbGwgc2VsZWN0IGJveGVzOiAqL1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlQWxsU2VsZWN0KTtcbn1cblxuZXhwb3J0IHsgQ3VzdG9tU2VsZWN0IH07XG4iLCIvLyBtb2R1bGUgJ0RhdGVQaWNrZXIuanMnXG5cbi8vIHBvc3Rjb2Rlc1xuZnVuY3Rpb24gU2V0RGF0ZSgpIHtcbiAgLy8gY2FjaGUgRE9NXG5cbiAgY29uc3QgZHRUb2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgbGV0IG1vbnRoID0gZHRUb2RheS5nZXRNb250aCgpICsgMTtcbiAgbGV0IGRheSA9IGR0VG9kYXkuZ2V0RGF0ZSgpO1xuICBjb25zdCB5ZWFyID0gZHRUb2RheS5nZXRGdWxsWWVhcigpO1xuXG4gIGlmIChtb250aCA8IDEwKSBtb250aCA9IGAwJHttb250aC50b1N0cmluZygpfWA7XG4gIGlmIChkYXkgPCAxMCkgZGF5ID0gYDAke2RheS50b1N0cmluZygpfWA7XG5cbiAgY29uc3QgbWF4RGF0ZSA9IGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWA7XG4gIHJldHVybiBtYXhEYXRlO1xufVxuXG5mdW5jdGlvbiBBZGRUb2RheXNEYXRlKCkge1xuICAvLyBjYWNoZSBET01cbiAgY29uc3QgJHRvZGF5c0RhdGUgPSAkKCdsYWJlbFtmb3I9XCJwb2xpY3ktc3RhcnQtaW1tZWRpYXRlbHlcIicpO1xuICBjb25zdCAkcG9saWN5U3RhcnREYXRlID0gJCgnI3BvbGljeS1zdGFydC1kYXRlJyk7XG5cbiAgLy8gYmluZCBFdmVudHNcbiAgJHRvZGF5c0RhdGUuY2hhbmdlKEFkZFRvZGF5c0RhdGVIYW5kbGVyKTtcblxuICAvLyBtZXRob2RzXG4gIGZ1bmN0aW9uIEFkZFRvZGF5c0RhdGVIYW5kbGVyKCkge1xuICAgIGlmICghJHBvbGljeVN0YXJ0RGF0ZS5hdHRyKCdkaXNhYmxlZCcpKSB7XG4gICAgICAkcG9saWN5U3RhcnREYXRlLnZhbChTZXREYXRlKCkpO1xuICAgICAgJHBvbGljeVN0YXJ0RGF0ZS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkcG9saWN5U3RhcnREYXRlLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IHsgU2V0RGF0ZSwgQWRkVG9kYXlzRGF0ZSB9O1xuIiwiLy8gbW9kdWxlIFwiUGF5bWVudC5qc1wiXG5cbmZ1bmN0aW9uIFBheW1lbnQoKSB7XG4gIC8vIGNhY2hlIERPTVxuICBjb25zdCAkcmVndWxhclBheU1vbnRobHkgPSAkKCcjcmVndWxhci1wYXktbW9udGhseScpO1xuICBjb25zdCAkcmVndWxhclBheUFubnVhbGx5ID0gJCgnI3JlZ3VsYXItcGF5LWFubnVhbGx5Jyk7XG4gIGNvbnN0ICRwYXltZW50VHlwZURlYml0ID0gJCgnI3BheW1lbnQtdHlwZS1kZWJpdCcpO1xuICBjb25zdCAkcGF5bWVudFR5cGVDcmVkaXQgPSAkKCcjcGF5bWVudC10eXBlLWNyZWRpdCcpO1xuXG4gIGNvbnN0ICRkaXJlY3REZWJpdERldGFpbHMgPSAkKCcjZGlyZWN0LWRlYml0LWRldGFpbHMnKTtcbiAgY29uc3QgJHBheW1lbnRUeXBlID0gJCgnI3BheW1lbnQtdHlwZScpO1xuICBjb25zdCAkY3JlZGl0Q2FyZERldGFpbHMgPSAkKCcjY3JlZGl0LWNhcmQtZGV0YWlscycpO1xuXG4gIC8vIGJpbmQgZXZlbnRzXG4gICRyZWd1bGFyUGF5TW9udGhseS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkZGlyZWN0RGViaXREZXRhaWxzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJHBheW1lbnRUeXBlLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRyZWd1bGFyUGF5QW5udWFsbHkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJHBheW1lbnRUeXBlLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGRpcmVjdERlYml0RGV0YWlscy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkcGF5bWVudFR5cGVEZWJpdC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkZGlyZWN0RGViaXREZXRhaWxzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGNyZWRpdENhcmREZXRhaWxzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRwYXltZW50VHlwZUNyZWRpdC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkY3JlZGl0Q2FyZERldGFpbHMuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkZGlyZWN0RGViaXREZXRhaWxzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBDaGVja0JhbmtOdW1iZXIoZWxlbSwgbmV4dEVsZW0pIHtcbiAgY29uc3QgYWxsb3dlZEtleXMgPSBbXG4gICAgOCxcbiAgICAzNyxcbiAgICAzOCxcbiAgICAzOSxcbiAgICA0MCxcbiAgICA0NixcbiAgICA0OCxcbiAgICA0OSxcbiAgICA1MCxcbiAgICA1MSxcbiAgICA1MixcbiAgICA1MyxcbiAgICA1NCxcbiAgICA1NSxcbiAgICA1NyxcbiAgICA1NyxcbiAgICA5NixcbiAgICA5NyxcbiAgICA5OCxcbiAgICA5OSxcbiAgICAxMDAsXG4gICAgMTAxLFxuICAgIDEwMixcbiAgICAxMDMsXG4gICAgMTA0LFxuICAgIDEwNSxcbiAgXTtcblxuICAkKGVsZW0pLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiAkLmluQXJyYXkoZS53aGljaCwgYWxsb3dlZEtleXMpID4gLTE7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGRlbGV0ZUdvQmFjayh0aGF0LCBlKSB7XG4gICAgcmV0dXJuIHRoYXQuc2VsZWN0aW9uU3RhcnQgPT09IDAgJiYgJC5pbkFycmF5KGUud2hpY2gsIFs4LCA0Nl0pID4gLTE7XG4gIH1cblxuICBjb25zdCAkc29ydENvZGUgPSAkKGVsZW0pO1xuICBjb25zdCBjb3VudCA9ICRzb3J0Q29kZS5sZW5ndGggLSAxO1xuICBjb25zdCAkYWNjTm8gPSAkKG5leHRFbGVtKTtcblxuICAkc29ydENvZGUub24oJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnN0IGluZGV4ID0gJHNvcnRDb2RlLmluZGV4KHRoaXMpO1xuICAgIGNvbnN0IHZhbCA9IHRoaXMudmFsdWU7XG5cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gdGhpcy5tYXhMZW5ndGgpIHtcbiAgICAgIGlmIChpbmRleCA9PT0gY291bnQpIHtcbiAgICAgICAgJGFjY05vLmZvY3VzKCk7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4IDwgY291bnQpIHtcbiAgICAgICAgJHNvcnRDb2RlLmVxKGluZGV4ICsgMSkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRlbGV0ZUdvQmFjayh0aGlzLCBlKSAmJiBpbmRleCAhPT0gMCkge1xuICAgICAgJHNvcnRDb2RlLmVxKGluZGV4IC0gMSkuZm9jdXMoKTtcbiAgICB9XG4gIH0pO1xuXG4gICRhY2NOby5vbigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGRlbGV0ZUdvQmFjayh0aGlzLCBlKSkge1xuICAgICAgJHNvcnRDb2RlLmxhc3QoKS5mb2N1cygpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIFRvZ2dsZVJlcXVpcmVkUGF5bWVudEZpZWxkcygpIHtcbiAgaWYgKCQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkhlbGxvIFJlZ3VsYXIgUGF5XCIpO1xuXG4gICAgLy8gaWYgbW9udGhseSBzZWxlY3RlZFxuICAgIC8vIHRoZW4gY2hlY2sgZm9yIGRpcmVjdCBkZWJpdCBpbmZvcm1hdGlvblxuICAgICQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCQoJyNyZWd1bGFyLXBheS1hbm51YWxseTpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIldlbGNvbWUgdG8gQW5udWFsIHJlcGF5bWVudHNcIik7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGdyYW5kcHJhcmVudCBib3ggc2V0IGVhcmxpZXIgd2hlbiBjaGVjayBwYXltZW50IHdhc24ndCBzZWxlY3RlZFxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl06Zmlyc3QnKVxuICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgRGlyZWN0IERlYml0IGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNhY2NvdW50LW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDEnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2FjY291bnQtbnVtYmVyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIHBheW1lbnQgdHlwZSBmaWVsZHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpcykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgQ3JlZGl0L0RlYml0IENhcmQgZmllbGRzIE5PVCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2NhcmQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2V4cGlyeS1kYXRlJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjY3YnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHRoZSBkaXJlY3QgZGViaXQgZmllbGRzIHRvIHJlcXVpcmVkXG4gICAgICBpZiAoJCgnI3JlZ3VsYXItcGF5LW1vbnRobHk6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWxjb21lIHRvIE1vbnRobHkgcmVwYXltZW50c1wiKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIGNoZWNrIHBheW1lbnQgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXTpmaXJzdCcpXG4gICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcblxuICAgICAgICAvLyBhY3RpdmF0ZSB0aGUgRGlyZWN0IERlYml0IGZpZWxkcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2FjY291bnQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQxJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNhY2NvdW50LW51bWJlcicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgcGF5bWVudCB0eXBlIGZpZWxkcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgQ3JlZGl0L0RlYml0IENhcmQgZmllbGRzIE5PVCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2NhcmQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2V4cGlyeS1kYXRlJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjY3YnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGlmIHBheW1lbnQgdHlwZSBzZWxlY3RlZFxuICAgIC8vIHRoZW4gY2hlY2sgZm9yIGVpdGhlciB0aGUgZGlyZWN0IGRlYml0IG9yIGNyZWRpdCBjYXJkIGluZm9ybWF0aW9uXG4gICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCQoJyNwYXltZW50LXR5cGUtZGViaXQ6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWxjb21lIHRvIERpcmVjdCBEZWJpdCBwYXltZW50XCIpO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBncmFuZHByYXJlbnQgYm94IHNldCBlYXJsaWVyIHdoZW4gY2hlY2sgcGF5bWVudCB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXTpmaXJzdCcpXG4gICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcblxuICAgICAgICAvLyBhY3RpdmF0ZSB0aGUgRGlyZWN0IERlYml0IGZpZWxkcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2FjY291bnQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQxJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNhY2NvdW50LW51bWJlcicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgQ3JlZGl0L0RlYml0IENhcmQgZmllbGRzIE5PVCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2NhcmQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2V4cGlyeS1kYXRlJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjY3YnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCQoJyNwYXltZW50LXR5cGUtY3JlZGl0OmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV2VsY29tZSB0byBDcmVkaXQvRGViaXQgQ2FyZCBwYXltZW50XCIpO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBncmFuZHByYXJlbnQgYm94IHNldCBlYXJsaWVyIHdoZW4gY2hlY2sgcGF5bWVudCB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXTpmaXJzdCcpXG4gICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgLmNzcygnaGVpZ2h0JywgJzc1cHgnKTtcblxuICAgICAgICAvLyBkZWFjdGl2YXRlIHRoZSBEaXJlY3QgRGViaXQgZmllbGRzIE5PVCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2FjY291bnQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjYWNjb3VudC1udW1iZXInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcblxuICAgICAgICAvLyBhY3RpdmF0ZSB0aGUgQ3JlZGl0L0RlYml0IENhcmQgZmllbGRzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCcjY2FyZC1uYW1lJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2V4cGlyeS1kYXRlJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2NjdicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gVG9nZ2xlUmVxdWlyZWRGaWVsZHMoKSB7XG4gIGlmICgkKCdpbnB1dFtuYW1lPVwicHJlLWV4aXN0aW5nLWNvbmRpdGlvblwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAvLyBjaGVjayBmb3IgcHJlLWV4aXN0aW5nIGNvbmR0aW9uIGluZm9ybWF0aW9uXG4gICAgJCgnaW5wdXRbbmFtZT1cInByZS1leGlzdGluZy1jb25kaXRpb25cIl0nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBncmFuZHByYXJlbnQgYm94IHNldCBlYXJsaWVyIHdoZW4gcHJlLWV4aXN0aW5nIGNvbmR0aW9uIHdhc24ndCBzZWxlY3RlZFxuICAgICAgJCgnaW5wdXRbbmFtZT1cInByZS1leGlzdGluZy1jb25kaXRpb25cIl06Zmlyc3QnKVxuICAgICAgICAucGFyZW50KClcbiAgICAgICAgLnBhcmVudCgpXG4gICAgICAgIC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoJCgnaW5wdXRbbmFtZT1cIm5ldXRlcmVkXCJdJykubGVuZ3RoID4gMCkge1xuICAgIC8vIGNoZWNrIGZvciBuZXV0ZXJlZCBpbmZvcm1hdGlvblxuICAgICQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGdyYW5kcHJhcmVudCBib3ggc2V0IGVhcmxpZXIgd2hlbiBuZXV0ZXJlZCB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXTpmaXJzdCcpXG4gICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAucGFyZW50KClcbiAgICAgICAgLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmICgkKCdpbnB1dFtuYW1lPVwicGV0LXR5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgLy8gY2hlY2sgZm9yIHBldC10eXBlIGluZm9ybWF0aW9uXG4gICAgJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIHBldC10eXBlIHdhc24ndCBzZWxlY3RlZFxuICAgICAgJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdOmZpcnN0JylcbiAgICAgICAgLnBhcmVudCgpXG4gICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICAgIH0pO1xuICB9XG59XG5cbmxldCBrZXlDb3VudCA9IDE7XG5mdW5jdGlvbiBpc051bWJlcktleShldmVudCkge1xuICBjb25zdCBrZXlDb2RlID0gd2luZG93LmV2ZW50ID8gZXZlbnQua2V5Q29kZSA6IGV2ZW50LndoaWNoO1xuXG4gIGlmIChcbiAgICBrZXlDb2RlID09PSA4IHx8IC8vIGJhY2tzcGFjZVxuICAgIGtleUNvZGUgPT09IDQ2IHx8IC8vIGRlbGV0ZVxuICAgIGtleUNvZGUgPT09IDEzIHx8IC8vIGVudGVyIGtleVxuICAgIGtleUNvZGUgPT09IDkgfHwgLy8gdGFiXG4gICAga2V5Q29kZSA9PT0gMTE2IHx8IC8vIEY1IChyZWZyZXNoKVxuICAgIGtleUNvZGUgPT09IDExMiB8fCAvLyBGMVxuICAgIGtleUNvZGUgPT09IDExMyB8fCAvLyBGMlxuICAgIGtleUNvZGUgPT09IDExNCB8fCAvLyBGM1xuICAgIGtleUNvZGUgPT09IDExNSB8fCAvLyBGNFxuICAgIGtleUNvZGUgPT09IDExNyB8fCAvLyBGNlxuICAgIGtleUNvZGUgPT09IDExOCB8fCAvLyBGN1xuICAgIGtleUNvZGUgPT09IDExOSB8fCAvLyBGOFxuICAgIGtleUNvZGUgPT09IDEyMCB8fCAvLyBGOVxuICAgIGtleUNvZGUgPT09IDEyMSB8fCAvLyBGMTBcbiAgICBrZXlDb2RlID09PSAxMjIgfHwgLy8gRjExXG4gICAga2V5Q29kZSA9PT0gMTIzIC8vIEYxMlxuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoa2V5Q29kZSA8IDQ4IHx8IGtleUNvZGUgPiA1Nykge1xuICAgIGlmIChrZXlDb3VudCA8IDYpIHtcbiAgICAgIGtleUNvdW50ICs9IDE7IC8vIGFkZHMgb25lIHRvIGNvdW50XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdQbGVhc2UgT25seSBFbnRlciBOdW1lcmljYWwgVmFsdWVzJyk7XG4gICAgICBrZXlDb3VudCA9IDE7XG4gICAgfVxuICAgIC8vIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24ga2V5UHJlc3NlZChlbG0sIG1heEtleUNvdW50KSB7XG4gIGlmIChlbG0udmFsKCkubGVuZ3RoID49IG1heEtleUNvdW50KSB7XG4gICAgZWxtLnZhbChlbG0udmFsKCkuc3Vic3RyKDAsIG1heEtleUNvdW50KSk7XG4gICAgZWxtLnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XG4gICAgZWxtLmFkZENsYXNzKCdpcy12YWxpZCcpO1xuICB9IGVsc2Uge1xuICAgIGVsbS5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xuICAgIGVsbS5yZW1vdmVDbGFzcygnaXMtdmFsaWQnKTtcbiAgfVxufVxuZnVuY3Rpb24ga2V5UHJlc3NDaGVjayhlbG0sIG1heEtleUNvdW50KSB7XG4gIGVsbS5rZXlkb3duKGZ1bmN0aW9uKCkge1xuICAgIGtleVByZXNzZWQoJCh0aGlzKSwgbWF4S2V5Q291bnQpO1xuICB9KTtcblxuICBlbG0ua2V5dXAoZnVuY3Rpb24oKSB7XG4gICAga2V5UHJlc3NlZCgkKHRoaXMpLCBtYXhLZXlDb3VudCk7XG4gIH0pO1xufVxuXG4vLyBmdW5jdGlvbiBHZXRDYXJkVHlwZShudW1iZXIpIHtcbi8vICAgLy8gdmlzYVxuLy8gICBsZXQgcmUgPSBuZXcgUmVnRXhwKCdeNCcpO1xuLy8gICBpZiAobnVtYmVyLm1hdGNoKHJlKSAhPSBudWxsKSByZXR1cm4gJ1Zpc2EnO1xuXG4vLyAgIC8vIE1hc3RlcmNhcmRcbi8vICAgLy8gVXBkYXRlZCBmb3IgTWFzdGVyY2FyZCAyMDE3IEJJTnMgZXhwYW5zaW9uXG4vLyAgIGlmIChcbi8vICAgICAvXig1WzEtNV1bMC05XXsxNH18MigyMlsxLTldWzAtOV17MTJ9fDJbMy05XVswLTldezEzfXxbMy02XVswLTldezE0fXw3WzAtMV1bMC05XXsxM318NzIwWzAtOV17MTJ9KSkkLy50ZXN0KG51bWJlcilcbi8vICAgKVxuLy8gICAgIHJldHVybiAnTWFzdGVyY2FyZCc7XG5cbi8vICAgLy8gQU1FWFxuLy8gICByZSA9IG5ldyBSZWdFeHAoJ14zWzQ3XScpO1xuLy8gICBpZiAobnVtYmVyLm1hdGNoKHJlKSAhPSBudWxsKSByZXR1cm4gJ0FNRVgnO1xuXG4vLyAgIC8vIERpc2NvdmVyXG4vLyAgIHJlID0gbmV3IFJlZ0V4cCgnXig2MDExfDYyMigxMls2LTldfDFbMy05XVswLTldfFsyLThdWzAtOV17Mn18OVswLTFdWzAtOV18OTJbMC01XXw2NFs0LTldKXw2NSknKTtcbi8vICAgaWYgKG51bWJlci5tYXRjaChyZSkgIT0gbnVsbCkgcmV0dXJuICdEaXNjb3Zlcic7XG5cbi8vICAgLy8gRGluZXJzXG4vLyAgIHJlID0gbmV3IFJlZ0V4cCgnXjM2Jyk7XG4vLyAgIGlmIChudW1iZXIubWF0Y2gocmUpICE9IG51bGwpIHJldHVybiAnRGluZXJzJztcblxuLy8gICAvLyBEaW5lcnMgLSBDYXJ0ZSBCbGFuY2hlXG4vLyAgIHJlID0gbmV3IFJlZ0V4cCgnXjMwWzAtNV0nKTtcbi8vICAgaWYgKG51bWJlci5tYXRjaChyZSkgIT0gbnVsbCkgcmV0dXJuICdEaW5lcnMgLSBDYXJ0ZSBCbGFuY2hlJztcblxuLy8gICAvLyBKQ0Jcbi8vICAgcmUgPSBuZXcgUmVnRXhwKCdeMzUoMls4OV18WzMtOF1bMC05XSknKTtcbi8vICAgaWYgKG51bWJlci5tYXRjaChyZSkgIT0gbnVsbCkgcmV0dXJuICdKQ0InO1xuXG4vLyAgIC8vIFZpc2EgRWxlY3Ryb25cbi8vICAgcmUgPSBuZXcgUmVnRXhwKCdeKDQwMjZ8NDE3NTAwfDQ1MDh8NDg0NHw0OTEoM3w3KSknKTtcbi8vICAgaWYgKG51bWJlci5tYXRjaChyZSkgIT0gbnVsbCkgcmV0dXJuICdWaXNhIEVsZWN0cm9uJztcblxuLy8gICByZXR1cm4gJyc7XG4vLyB9XG5cbmZ1bmN0aW9uIENyZWRpdENhcmRUeXBlRGV0ZWN0b3Iob3B0aW9ucykge1xuICBjb25zdCBzZXR0aW5ncyA9ICQuZXh0ZW5kKFxuICAgIHtcbiAgICAgIGNyZWRpdF9jYXJkX2xvZ29zX2lkOiAnLmNhcmRfbG9nb3MnLFxuICAgICAgZWxtOiAnI2NhcmQtbnVtYmVyJyxcbiAgICB9LFxuICAgIG9wdGlvbnNcbiAgKTtcblxuICAvLyB0aGUgb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIGxvZ29zXG5cbiAgY29uc3QgbG9nb3Nfb2JqID0gJChzZXR0aW5ncy5jcmVkaXRfY2FyZF9sb2dvc19pZCk7XG5cbiAgLy8gdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgY2hlY2sgZm9yIHBvc3NpYmxlIG1hdGNoZXMgYXMgeW91IHR5cGUsIGhlbmNlIHRoZSBPUiBvcGVyYXRvcnMgYmFzZWQgb24gdGhlIG51bWJlciBvZiBjaGFyc1xuICAvLyBWaXNhXG4gIGNvbnN0IHZpc2FfcmVnZXggPSBuZXcgUmVnRXhwKCdeNFswLTldezAsMTV9JCcpO1xuXG4gIC8vIE1hc3RlckNhcmRcblxuICBjb25zdCBtYXN0ZXJjYXJkX3JlZ2V4ID0gbmV3IFJlZ0V4cCgnXjUkfF41WzEtNV1bMC05XXswLDE0fSQnKTtcblxuICAvLyBBbWVyaWNhbiBFeHByZXNzXG5cbiAgY29uc3QgYW1leF9yZWdleCA9IG5ldyBSZWdFeHAoJ14zJHxeM1s0N11bMC05XXswLDEzfSQnKTtcblxuICAvLyBEaW5lcnMgQ2x1YlxuXG4gIGNvbnN0IGRpbmVyc19yZWdleCA9IG5ldyBSZWdFeHAoJ14zJHxeM1swNjhdJHxeMyg/OjBbMC01XXxbNjhdWzAtOV0pWzAtOV17MCwxMX0kJyk7XG5cbiAgLy8gRGlzY292ZXJcblxuICBjb25zdCBkaXNjb3Zlcl9yZWdleCA9IG5ldyBSZWdFeHAoJ142JHxeNlswNV0kfF42MDFbMV0/JHxeNjVbMC05XVswLTldPyR8XjYoPzowMTF8NVswLTldezJ9KVswLTldezAsMTJ9JCcpO1xuXG4gIC8vIEpDQlxuXG4gIGNvbnN0IGpjYl9yZWdleCA9IG5ldyBSZWdFeHAoJ14yWzFdPyR8XjIxWzNdPyR8XjFbOF0/JHxeMThbMF0/JHxeKD86MjEzMXwxODAwKVswLTldezAsMTF9JHxeM1s1XT8kfF4zNVswLTldezAsMTR9JCcpO1xuXG4gIHJldHVybiAkKHNldHRpbmdzLmVsbSkuZWFjaChmdW5jdGlvbigpIHtcbiAgICAvLyBhcyB0aGUgdXNlciB0eXBlc1xuICAgICQodGhpcykua2V5dXAoZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgY3VycmVudFZhbHVlID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgLy8gZ2V0IHJpZCBvZiBzcGFjZXMgYW5kIGRhc2hlcyBiZWZvcmUgdXNpbmcgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgICAgY3VycmVudFZhbHVlID0gY3VycmVudFZhbHVlLnJlcGxhY2UoLyAvZywgJycpLnJlcGxhY2UoLy0vZywgJycpO1xuXG4gICAgICAvLyBjaGVja3MgcGVyIGVhY2gsIGFzIHRoZWlyIGNvdWxkIGJlIG11bHRpcGxlIGhpdHNcbiAgICAgIGlmIChjdXJyZW50VmFsdWUubWF0Y2godmlzYV9yZWdleCkpIHtcbiAgICAgICAgJChsb2dvc19vYmopLmFkZENsYXNzKCdpc192aXNhJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKGxvZ29zX29iaikucmVtb3ZlQ2xhc3MoJ2lzX3Zpc2EnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN1cnJlbnRWYWx1ZS5tYXRjaChtYXN0ZXJjYXJkX3JlZ2V4KSkge1xuICAgICAgICAkKGxvZ29zX29iaikuYWRkQ2xhc3MoJ2lzX21hc3RlcmNhcmQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQobG9nb3Nfb2JqKS5yZW1vdmVDbGFzcygnaXNfbWFzdGVyY2FyZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFZhbHVlLm1hdGNoKGFtZXhfcmVnZXgpKSB7XG4gICAgICAgICQobG9nb3Nfb2JqKS5hZGRDbGFzcygnaXNfYW1leCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChsb2dvc19vYmopLnJlbW92ZUNsYXNzKCdpc19hbWV4Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50VmFsdWUubWF0Y2goZGluZXJzX3JlZ2V4KSkge1xuICAgICAgICAkKGxvZ29zX29iaikuYWRkQ2xhc3MoJ2lzX2RpbmVycycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChsb2dvc19vYmopLnJlbW92ZUNsYXNzKCdpc19kaW5lcnMnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN1cnJlbnRWYWx1ZS5tYXRjaChkaXNjb3Zlcl9yZWdleCkpIHtcbiAgICAgICAgJChsb2dvc19vYmopLmFkZENsYXNzKCdpc19kaXNjb3ZlcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChsb2dvc19vYmopLnJlbW92ZUNsYXNzKCdpc19kaXNjb3ZlcicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFZhbHVlLm1hdGNoKGpjYl9yZWdleCkpIHtcbiAgICAgICAgJChsb2dvc19vYmopLmFkZENsYXNzKCdpc19qY2InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQobG9nb3Nfb2JqKS5yZW1vdmVDbGFzcygnaXNfamNiJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIG5vdGhpbmcgaXMgYSBoaXQgd2UgYWRkIGEgY2xhc3MgdG8gZmFkZSB0aGVtIGFsbCBvdXRcbiAgICAgIGlmIChcbiAgICAgICAgY3VycmVudFZhbHVlICE9ICcnICYmXG4gICAgICAgICFjdXJyZW50VmFsdWUubWF0Y2godmlzYV9yZWdleCkgJiZcbiAgICAgICAgIWN1cnJlbnRWYWx1ZS5tYXRjaChtYXN0ZXJjYXJkX3JlZ2V4KSAmJlxuICAgICAgICAhY3VycmVudFZhbHVlLm1hdGNoKGFtZXhfcmVnZXgpICYmXG4gICAgICAgICFjdXJyZW50VmFsdWUubWF0Y2goZGluZXJzX3JlZ2V4KSAmJlxuICAgICAgICAhY3VycmVudFZhbHVlLm1hdGNoKGRpc2NvdmVyX3JlZ2V4KSAmJlxuICAgICAgICAhY3VycmVudFZhbHVlLm1hdGNoKGpjYl9yZWdleClcbiAgICAgICkge1xuICAgICAgICAkKGxvZ29zX29iaikuYWRkQ2xhc3MoJ2lzX25vdGhpbmcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQobG9nb3Nfb2JqKS5yZW1vdmVDbGFzcygnaXNfbm90aGluZycpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IHtcbiAgUGF5bWVudCxcbiAgQ2hlY2tCYW5rTnVtYmVyLFxuICBUb2dnbGVSZXF1aXJlZFBheW1lbnRGaWVsZHMsXG4gIFRvZ2dsZVJlcXVpcmVkRmllbGRzLFxuICBpc051bWJlcktleSxcbiAga2V5UHJlc3NDaGVjayxcbiAgLy8gR2V0Q2FyZFR5cGUsXG4gIENyZWRpdENhcmRUeXBlRGV0ZWN0b3IsXG59O1xuIiwiLy8gbW9kdWxlIFwiUGV0LmpzXCJcblxuZnVuY3Rpb24gY2hlY2tGb3JDb25kaXRpb25zKCkge1xuICAkKCcucGlsbF9fY29uZGl0aW9uIC5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG5cbiAgICAvLyBtYWtlIHRoZSByZW1vdmUgY29uZGl0aW9uIGFjdGl2ZSBpbiB0aGUgZHJvcGRvd25cbiAgICBjb25zdCBidG5UZXh0ID0gZXZ0LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBjb25kaXRpb24gPSBidG5UZXh0LnN1YnN0cigwLCBidG5UZXh0Lmxlbmd0aCAtIDIpO1xuXG4gICAgLy8gZmluZCBjb25kaXRpb24gaW4gc2VsZWN0IGNvbmRpdGlvbi1zZWxlY3RcbiAgICAkKCcjY29uZGl0aW9uLXNlbGVjdCBvcHRpb24nKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICQodGhpcykuaHRtbCgpID09PSBjb25kaXRpb247XG4gICAgICB9KVxuICAgICAgLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXG4gICAgLy8gcmVtb3ZlIGZyb20gc3RvcmFnZVxuICAgIGxldCBjb25kaXRpb25zID0gW107XG4gICAgY29uZGl0aW9ucyA9IEpTT04ucGFyc2UoJCgnI3BldC1jb25kaXRpb25zJykudmFsKCkpO1xuICAgIGNvbmRpdGlvbnMgPSBjb25kaXRpb25zLmZpbHRlcihmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZSAhPT0gY29uZGl0aW9uO1xuICAgIH0pO1xuICAgICQoJyNwZXQtY29uZGl0aW9ucycpLnZhbChKU09OLnN0cmluZ2lmeShjb25kaXRpb25zKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBQZXQoKSB7XG4gIC8vIGNhY2hlIERPTVxuICBjb25zdCAkcHJlRXhpc3RpbmdDb25kaXRpb25ZZXMgPSAkKCcjcHJlLWV4aXN0aW5nLWNvbmRpdGlvbi15ZXMnKTtcbiAgY29uc3QgJHByZUV4aXN0aW5nQ29uZGl0aW9uTm8gPSAkKCcjcHJlLWV4aXN0aW5nLWNvbmRpdGlvbi1ubycpO1xuICBjb25zdCAkcGV0Q29uZGl0aW9uID0gJCgnI3BldC1jb25kaXRpb24nKTtcbiAgY29uc3QgJGNvbmRpdGlvblNlbGVjdCA9ICQoJyNjb25kaXRpb24tc2VsZWN0Jyk7XG4gIGNvbnN0ICRkb2dUeXBlQnJlZWQgPSAkKCcjZG9nLXR5cGUtYnJlZWQnKTtcbiAgY29uc3QgJGNhdFR5cGVCcmVlZCA9ICQoJyNjYXQtdHlwZS1icmVlZCcpO1xuXG4gIGNvbnN0ICRwZXRUeXBlRG9nID0gJCgnI3BldC10eXBlLWRvZycpO1xuICBjb25zdCAkcGV0VHlwZUNhdCA9ICQoJyNwZXQtdHlwZS1jYXQnKTtcbiAgY29uc3QgJGNhdEluZm8gPSAkKCcjY2F0LWluZm8nKTtcbiAgY29uc3QgJGRvZ0luZm8gPSAkKCcjZG9nLWluZm8nKTtcblxuICBjb25zdCAkZG9nVHlwZTEgPSAkKCcjZG9nLXR5cGUtMScpO1xuICBjb25zdCAkZG9nVHlwZTIgPSAkKCcjZG9nLXR5cGUtMicpO1xuXG4gIGNvbnN0ICRkb2dUeXBlID0gJCgnI2RvZy10eXBlJyk7XG5cbiAgLy8gYmluZCBldmVudHNcbiAgJHBldFR5cGVEb2cuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJGNhdEluZm8uY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkZG9nSW5mby5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAkcGV0VHlwZUNhdC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkZG9nSW5mby5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRjYXRJbmZvLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gICRwcmVFeGlzdGluZ0NvbmRpdGlvblllcy5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkcGV0Q29uZGl0aW9uLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gICRwcmVFeGlzdGluZ0NvbmRpdGlvbk5vLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRwZXRDb25kaXRpb24uY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJGNvbmRpdGlvblNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgJHNlbGVjdCA9ICQoJyNjb25kaXRpb24tc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpO1xuXG4gICAgLy8gaWdub3JlIHRoZSBmaXJzdCBvcHRpb24gaW4gdGhlIGxpc3RcbiAgICBpZiAoJCgnI2NvbmRpdGlvbi1zZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykuaW5kZXgoKSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGRpc2FibGVkIHNlbGVjdGVkIGNvbmRpdGlvblxuICAgICRzZWxlY3QucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblxuICAgIC8vIGNyZWF0ZSBhIHBpbGxcbiAgICAvLyBhcHBlbmQgcGlsbCB0byBjb25kaXRpb24gbGlzdFxuICAgICQoJy5jb25kaXRpb25zJykuYXBwZW5kKGA8ZGl2IGNsYXNzPVwicGlsbF9fY29uZGl0aW9uXCI+JHskc2VsZWN0LnRleHQoKX0gPHNwYW4gY2xhc3M9XCJjbG9zZVwiPng8L3NwYW4+PC9kaXY+YCk7XG5cbiAgICAvLyBrZWVwIGEgcmVjb3JkIGluIHRoZSBtYWluIHN0b3JlXG4gICAgbGV0IGNvbmRpdGlvbnNBcnJheSA9IFtdO1xuICAgIGNvbnN0ICRjb25kaXRpb25zID0gJCgnI3BldC1jb25kaXRpb25zJyk7XG4gICAgaWYgKCRjb25kaXRpb25zICE9PSBudWxsICYmICRjb25kaXRpb25zLnZhbCgpICE9PSAnW10nICYmICRjb25kaXRpb25zLnZhbCgpICE9PSAnJykge1xuICAgICAgY29uZGl0aW9uc0FycmF5ID0gSlNPTi5wYXJzZSgkY29uZGl0aW9ucy52YWwoKSk7XG4gICAgfVxuICAgIGNvbmRpdGlvbnNBcnJheS5wdXNoKCRzZWxlY3QudGV4dCgpKTtcbiAgICAkKCcjcGV0LWNvbmRpdGlvbnMnKS52YWwoSlNPTi5zdHJpbmdpZnkoY29uZGl0aW9uc0FycmF5KSk7XG5cbiAgICBjaGVja0ZvckNvbmRpdGlvbnMoKTtcbiAgfSk7XG5cbiAgLy8gc2VsZWN0IHRoZSByYWRpbyBidXR0b24gd2hlbiBzZWxlY3QgZWxlbWVudCBjbGlja2VkXG4gICRkb2dUeXBlQnJlZWQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCkudHJpZ2dlcignY2xpY2snKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCB0cnVlKTtcbiAgfSk7XG5cbiAgLy8gc2VsZWN0IHRoZSByYWRpbyBidXR0b24gd2hlbiBzZWxlY3QgZWxlbWVudCBjbGlja2VkXG4gICRjYXRUeXBlQnJlZWQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCkudHJpZ2dlcignY2xpY2snKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCB0cnVlKTtcbiAgfSk7XG5cbiAgJGRvZ1R5cGUxLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRkb2dUeXBlLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gICRkb2dUeXBlMi5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkZG9nVHlwZS5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkZG9nVHlwZUJyZWVkLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRkb2dUeXBlLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBUb2dnbGVSZXF1aXJlZFBldEZpZWxkcygpIHtcbiAgLy8gaWYgcGV0IHR5cGUgc2VsZWN0ZWRcbiAgLy8gdGhlbiBjaGVjayBmb3JcbiAgJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQoJyNwZXQtdHlwZS1kb2c6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGFjdGl2YXRlIHRoZSBkb2cgcGV0IHR5cGUgZmllbGRzIGFzc2NvaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnI3Rlcm1zQWdyZWVtZW50JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJkb2ctdHlwZVwiXScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG5cbiAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIHBldCB0eXBlIGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAkKCdpbnB1dFtuYW1lPVwiY2F0LXR5cGVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoJCgnI3BldC10eXBlLWNhdDpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgLy8gYWN0aXZhdGUgdGhlIGNhdCBwZXQgdHlwZSBmaWVsZHMgYXNzY29pYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAkKCdpbnB1dFtuYW1lPVwiY2F0LXR5cGVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuXG4gICAgICAvLyBkZWFjdGl2YXRlIHRoZSBwZXQgdHlwZSBmaWVsZHMgTk9UIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnI3Rlcm1zQWdyZWVtZW50JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiZG9nLXR5cGVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH0pO1xuXG4gICQoJ2lucHV0W25hbWU9XCJkb2ctdHlwZVwiXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIC8vIGRvZy1zaXplXG4gICAgaWYgKCQoJyNkb2ctdHlwZS0yOmNoZWNrZWQnKS5sZW5ndGggPiAwIHx8ICQoJyNkb2ctdHlwZS1icmVlZDpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgLy8gYWN0aXZhdGUgdGhlIGRvZyBwZXQgdHlwZSBmaWVsZHMgYXNzY29pYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAkKCdpbnB1dFtuYW1lPVwiZG9nLXNpemVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKCQoJyNkb2ctdHlwZS0xOmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiZG9nLXNpemVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIGlmICgkKCcjZG9nLXR5cGUtMTpjaGVja2VkJykubGVuZ3RoID4gMCB8fCAkKCcjZG9nLXR5cGUtMjpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgLy8gYWN0aXZhdGUgdGhlIGRvZyBwZXQgdHlwZSBmaWVsZHMgYXNzY29pYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAkKCcjZG9nLXR5cGUtYnJlZWQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH0pO1xuXG4gICQoJ2lucHV0W25hbWU9XCJjYXQtdHlwZVwiXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKCcjY2F0LXR5cGUtMTpjaGVja2VkJykubGVuZ3RoID4gMCB8fCAkKCcjY2F0LXR5cGUtMjpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgLy8gYWN0aXZhdGUgdGhlIGNhdCBwZXQgdHlwZSBmaWVsZHMgYXNzY29pYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAkKCcjY2F0LXR5cGUtYnJlZWQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgeyBQZXQsIFRvZ2dsZVJlcXVpcmVkUGV0RmllbGRzIH07XG4iLCIvLyBtb2R1bGUgXCJWYWxpZGF0aW9uLmpzXCJcblxuZnVuY3Rpb24gQWN0aXZhdGVGb3JtVmFsaWRhdGlvbigpIHtcbiAgLy8gRmV0Y2ggYWxsIHRoZSBmb3JtcyB3ZSB3YW50IHRvIGFwcGx5IGN1c3RvbSBCb290c3RyYXAgdmFsaWRhdGlvbiBzdHlsZXMgdG9cbiAgY29uc3QgZm9ybXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduZWVkcy12YWxpZGF0aW9uJyk7XG4gIC8vIExvb3Agb3ZlciB0aGVtIGFuZCBwcmV2ZW50IHN1Ym1pc3Npb25cbiAgY29uc3QgdmFsaWRhdGlvbiA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChmb3JtcywgZnVuY3Rpb24oZm9ybSkge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdzdWJtaXQnLFxuICAgICAgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGZvcm0uY2hlY2tWYWxpZGl0eSgpID09PSBmYWxzZSkge1xuICAgICAgICAgIC8vIGlmIHBldCB0eXBlIHNlbGVjdGVkIGRvIHZhbGlkaXR5IGNoZWNrIG9uIGl0J3MgY2hpbGRyZW4gd2hpY2ggYWZmZWN0IGl0cyBvdXRjb21lXG4gICAgICAgICAgLy8gaWYgcGV0LXR5cGUgc2VsZWN0ZWRcbiAgICAgICAgICAvLyAgZG8gdmFsaWRpdHkgY2hlY2sgb24gdGhlIGVsZW1lbnRzIGluIHRoZSBhc3NvY2lhdGVkIGNvbGxhcHNlIGRpdlxuXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgbmV4dFBhZ2U7XG5cbiAgICAgICAgICAvLyBUaGVyZSBtYXliZSBtb3JlIHRoYW4gb25lIHN1Ym1pdCBidXR0b24gb24gdGhlIHBhZ2VcbiAgICAgICAgICAvLyBzbyB1bHRpbWF0ZWx5IHdlIHdvdWxkIGxpa2UgdGhlIG5leHQgYnV0dG9uIHRvIGJlIGFibGUgdG8gbW92ZSBvbnRvIHRoZSBuZXh0IHBhZ2VcbiAgICAgICAgICBpZiAoJCgnYnV0dG9uW2RhdGEtaHJlZl0nKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBuZXh0UGFnZSA9ICQoJ2J1dHRvbltkYXRhLWhyZWZdJykuZGF0YSgnaHJlZicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvcm0uYWN0aW9uID0gbmV4dFBhZ2U7XG4gICAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ3dhcy12YWxpZGF0ZWQnKTtcblxuICAgICAgICAvLyBjaGVjayBmb3IgcG9zdGFsIGFkZHJlc3NcbiAgICAgICAgaWYgKCQoJyNjdXN0b21lci1ob3VzZS1udW1iZXInKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgJCgnI2N1c3RvbWVyLWhvdXNlLW51bWJlcicpLnZhbCgpID09PSAnJyB8fFxuICAgICAgICAgICAgJCgnI2N1c3RvbWVyLXN0cmVldCcpLnZhbCgpID09PSAnJyB8fFxuICAgICAgICAgICAgJCgnI2N1c3RvbWVyLXRvd24tY2l0eScpLnZhbCgpID09PSAnJ1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgJCgnLndhcy12YWxpZGF0ZWQgLmpzLWludmFsaWQtcG9zdGFsLWFkZHJlc3MuaW52YWxpZC1mZWVkYmFjaycpLnNob3coKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLndhcy12YWxpZGF0ZWQgLmpzLWludmFsaWQtcG9zdGFsLWFkZHJlc3MuaW52YWxpZC1mZWVkYmFjaycpLmhpZGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBpZiBhbGwgMyBwYXJ0cyBvZiB0aGUgYWRkcmVzcyBhcmUgY29tcGxldGVcbiAgICAgICAgICAgIC8vIHRoZW4gaGlkZSB0aGUgaW52YWxpZC1mZWVkYmFja1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAkKCcjY3VzdG9tZXItaG91c2UtbnVtYmVyJykudmFsKCkgIT09ICcnICYmXG4gICAgICAgICAgICAgICQoJyNjdXN0b21lci1zdHJlZXQnKS52YWwoKSAhPT0gJycgJiZcbiAgICAgICAgICAgICAgJCgnI2N1c3RvbWVyLXRvd24tY2l0eScpLnZhbCgpICE9PSAnJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICQoJy53YXMtdmFsaWRhdGVkIC5qcy1pbnZhbGlkLXBvc3RhbC1hZGRyZXNzLmludmFsaWQtZmVlZGJhY2snKS5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKCcud2FzLXZhbGlkYXRlZCAuanMtaW52YWxpZC1wb3N0YWwtYWRkcmVzcy5pbnZhbGlkLWZlZWRiYWNrJykuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHBheW1lbnRzXG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ0hlbGxvIFJlZ3VsYXIgUGF5IGNoZWNrJyk7XG4gICAgICAgICAgLy8gaWYgYSByZWd1bGFyIHBheW1lbnQgaXMgbm90IHNlbGVjdGVkXG4gICAgICAgICAgLy8gdGhlbiBpbmNyZWFzZSB0aGUgaGVpZ2h0IG9mIHRoZSBmb3JtLWNoZWNrIGJveCB0byBhbGxvdyBmb3IgdGhlIGVycm9yIG1lZXNhZ2UgdG8gYmUgc2hvd25cbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdOmNoZWNrZWQnKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl06Zmlyc3QnKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICc3NXB4Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl06Y2hlY2tlZCcpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl06Zmlyc3QnKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICc3NXB4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHByZS1leGlzdGluZyBjb25kaXRpb25zXG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicHJlLWV4aXN0aW5nLWNvbmRpdGlvblwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBpZiBwcmUtZXhpc3RpbmcgY29uZGl0aW9uIGlzIG5vdCBzZWxlY3RlZFxuICAgICAgICAgIC8vIHRoZW4gaW5jcmVhc2UgdGhlIGhlaWdodCBvZiB0aGUgZm9ybS1jaGVjayBib3ggdG8gYWxsb3cgZm9yIHRoZSBlcnJvciBtZWVzYWdlIHRvIGJlIHNob3duXG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwcmUtZXhpc3RpbmctY29uZGl0aW9uXCJdOmNoZWNrZWQnKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicHJlLWV4aXN0aW5nLWNvbmRpdGlvblwiXTpmaXJzdCcpXG4gICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJzgwcHgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgbmV1dGVyZWRcbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBpZiBuZXV0ZXJlZCBpcyBub3Qgc2VsZWN0ZWRcbiAgICAgICAgICAvLyB0aGVuIGluY3JlYXNlIHRoZSBoZWlnaHQgb2YgdGhlIGZvcm0tY2hlY2sgYm94IHRvIGFsbG93IGZvciB0aGUgZXJyb3IgbWVlc2FnZSB0byBiZSBzaG93blxuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwibmV1dGVyZWRcIl06Y2hlY2tlZCcpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXTpmaXJzdCcpXG4gICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJzgwcHgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgcGV0LXR5cGVcbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwZXQtdHlwZVwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBpZiBwZXQtdHlwZSBpcyBub3Qgc2VsZWN0ZWRcbiAgICAgICAgICAvLyB0aGVuIGluY3JlYXNlIHRoZSBoZWlnaHQgb2YgdGhlIGZvcm0tY2hlY2sgYm94IHRvIGFsbG93IGZvciB0aGUgZXJyb3IgbWVlc2FnZSB0byBiZSBzaG93blxuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicGV0LXR5cGVcIl06Y2hlY2tlZCcpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwZXQtdHlwZVwiXTpmaXJzdCcpXG4gICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJzgwcHgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgcGV0IGNvbmRpdGlvbnMgaW4gYSBoaWRkZW4gdmFsdWVcbiAgICAgICAgaWYgKCQoJyNwZXQtY29uZGl0aW9ucycpICE9PSBudWxsKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJCgnI3BldC1jb25kaXRpb25zJykudmFsKCkpO1xuICAgICAgICAgIGlmICgkKCcjcGV0LWNvbmRpdGlvbnMnKS52YWwoKSAhPT0gJ1tdJykge1xuICAgICAgICAgICAgJCgnI2NvbmRpdGlvbi1zZWxlY3QnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICQoJyNjb25kaXRpb24tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2JvcmRlci1kYW5nZXInKTtcbiAgICAgICAgICAgICQoJyNjb25kaXRpb24tc2VsZWN0JykuYWRkQ2xhc3MoJ2JvcmRlci1zdWNjZXNzJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyNjb25kaXRpb24tc2VsZWN0JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICQoJyNjb25kaXRpb24tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2JvcmRlci1zdWNjZXNzJyk7XG4gICAgICAgICAgICAkKCcjY29uZGl0aW9uLXNlbGVjdCcpLmFkZENsYXNzKCdib3JkZXItZGFuZ2VyJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQWN0aXZhdGVGb3JtVmFsaWRhdGlvbiB9O1xuIiwiLy8gbW9kdWxlIFwiV2hpdGVMYWJlbGxpbmcuanNcIlxuXG4vLyBwb3N0Y29kZXNcblxubGV0IGh0dHBSZXF1ZXN0O1xuXG5mdW5jdGlvbiBXaGl0ZUxhYmVsbGluZyh0aGVtZSA9ICdUb3dlcmdhdGUnKSB7XG4gIC8vIGlmICh0aGVtZSA9PT0gJ0hlYWx0aHkgUGV0cycpIHtcbiAgLy8gICAvLyBtYWluIGNvbG91cnNcbiAgLy8gICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tcHJpbWFyeS1jb2xvdXInLCAnb3JhbmdlJyk7XG5cbiAgLy8gICAvLyBtYWluIGJvZHkgYW5kIHBhbmVsIGJhY2tncm91bmRzXG4gIC8vICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXBhbmVsLWJnLWNvbG91cicsICdvcmFuZ2UnKTtcbiAgLy8gICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tYm9keS1iZy1jb2xvdXInLCAnb3JhbmdlJyk7XG5cbiAgLy8gICAvLyBtZW51IGJhY2tncm91bmQgY29sb3VyXG4gIC8vICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLW1lbnUtYmctY29sb3VyJywgJ29yYW5nZScpO1xuICAvLyAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zdWItbWVudS1iZy1jb2xvdXInLCAnb3JhbmdlJyk7XG5cbiAgLy8gICAvLyBwb2xpY3kgY29sb3Vyc1xuICAvLyAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1saWZldGltZS1jb2xvdXInLCAnb3JhbmdlJyk7XG4gIC8vICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLW1heGltdW0tY29sb3VyJywgJ29yYW5nZScpO1xuICAvLyAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1hY2NpZGVudC1jb2xvdXInLCAnb3JhbmdlJyk7XG5cbiAgLy8gICAvLyBmb3JtIGNvbG91cnNcbiAgLy8gICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tZm9ybS1sYWJlbC1jb2xvdXInLCAnb3JhbmdlJyk7XG4gIC8vICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWN0YS1jb2xvdXInLCAnb3JhbmdlJyk7XG4gIC8vICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWlucHV0LWJnLWNvbG91cicsICdvcmFuZ2UnKTtcbiAgLy8gfVxuICBtYWtlUmVxdWVzdCgndGhlbWUuanNvbicpO1xufVxuXG5mdW5jdGlvbiBtYWtlUmVxdWVzdChmaWxlKSB7XG4gIGh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgaWYgKCFodHRwUmVxdWVzdCkge1xuICAgIGNvbnNvbGUud2FybignR2l2aW5nIHVwIDooIENhbm5vdCBjcmVhdGUgYW4gWE1MSFRUUCBpbnN0YW5jZScpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHByb2Nlc3NDb250ZW50cztcbiAgaHR0cFJlcXVlc3Qub3BlbignR0VUJywgYC9jb25maWcvJHtmaWxlfWApO1xuICBodHRwUmVxdWVzdC5zZW5kKCk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NDb250ZW50cygpIHtcbiAgaWYgKGh0dHBSZXF1ZXN0LnJlYWR5U3RhdGUgPT09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICBpZiAoaHR0cFJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcbiAgICAgIC8vIHBhcnNlIHRoZSBqc29uIGZpbGVcbiAgICAgIGNvbnN0IGNvbmZpZyA9IEpTT04ucGFyc2UoaHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0KTtcblxuICAgICAgLy8gbG9hZCB0aGVtZVxuICAgICAgc3dpdGNoIChjb25maWcuY29tbWFuZCkge1xuICAgICAgY2FzZSAnbG9hZCc6XG4gICAgICAgIG1ha2VSZXF1ZXN0KGAvdGhlbWVzLyR7Y29uZmlnLnRoZW1lfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2FjdGl2YXRlJzpcbiAgICAgICAgbG9hZFRoZW1lKGNvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdUaGVyZSB3YXMgYSBwcm9ibGVtIHdpdGggdGhlIHJlcXVlc3QuJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGxvYWRUaGVtZSh0aGVtZSkge1xuICAvLyBjb25zb2xlLmxvZyh0aGVtZSk7XG4gIC8vIGNoYW5nZSBjc3MgaW5mb1xuICAvLyBmb3IgKGNvbnN0IHN0eWxlIGluIHRoZW1lLmNvbG91cnMpIHtcbiAgLy8gICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoc3R5bGUsIHRoZW1lLmNvbG91cnNbc3R5bGVdKTtcbiAgLy8gfVxuXG4gIGNvbnN0IGNzc0lkID0gJ215Q3NzJzsgLy8geW91IGNvdWxkIGVuY29kZSB0aGUgY3NzIHBhdGggaXRzZWxmIHRvIGdlbmVyYXRlIGlkLi5cbiAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjc3NJZCkpIHtcbiAgICBjb25zdCBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIGxpbmsuaWQgPSBjc3NJZDtcbiAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGxpbmsuaHJlZiA9IHRoZW1lLmNzcztcbiAgICBsaW5rLm1lZGlhID0gJ2FsbCc7XG4gICAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgfVxuXG4gIC8vIGNoYW5nZSBpbWFnZSBpbmZvXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dvX19tb2JpbGUnKS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHRoZW1lLmltYWdlc1snbG9nby1tb2JpbGUnXSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dvX19kZXNrdG9wJykuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCB0aGVtZS5pbWFnZXNbJ2xvZ28tZGVza3RvcCddKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ28gaW1nJykuc2V0QXR0cmlidXRlKCdzcmMnLCB0aGVtZS5pbWFnZXNbJ2xvZ28tbW9iaWxlJ10pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9nbyBpbWcnKS5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGAke3RoZW1lLm5hbWV9IGxvZ29gKTtcbn1cblxuZXhwb3J0IHsgV2hpdGVMYWJlbGxpbmcgfTtcbiIsIi8vIGltcG9ydCB7IGxvZyB9IGZyb20gJy4vY29tcG9uZW50cy9VdGlscyc7XG5cbmltcG9ydCB7IEN1c3RvbVNlbGVjdCB9IGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21TZWxlY3QnO1xuaW1wb3J0IHsgQWRkcmVzcyB9IGZyb20gJy4vY29tcG9uZW50cy9BZGRyZXNzJztcbmltcG9ydCB7IFNldERhdGUsIEFkZFRvZGF5c0RhdGUgfSBmcm9tICcuL2NvbXBvbmVudHMvRGF0ZVBpY2tlcic7XG5pbXBvcnQgeyBQZXQsIFRvZ2dsZVJlcXVpcmVkUGV0RmllbGRzIH0gZnJvbSAnLi9jb21wb25lbnRzL1BldCc7XG5pbXBvcnQgeyBDb3ZlclR5cGVzIH0gZnJvbSAnLi9jb21wb25lbnRzL0NvdmVyVHlwZXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVGb3JtVmFsaWRhdGlvbiB9IGZyb20gJy4vY29tcG9uZW50cy9WYWxpZGF0aW9uJztcbmltcG9ydCB7XG4gIFBheW1lbnQsXG4gIENoZWNrQmFua051bWJlcixcbiAgVG9nZ2xlUmVxdWlyZWRQYXltZW50RmllbGRzLFxuICBUb2dnbGVSZXF1aXJlZEZpZWxkcyxcbiAga2V5UHJlc3NDaGVjayxcbiAgQ3JlZGl0Q2FyZFR5cGVEZXRlY3Rvcixcbn0gZnJvbSAnLi9jb21wb25lbnRzL1BheW1lbnQnO1xuaW1wb3J0IHsgV2hpdGVMYWJlbGxpbmcgfSBmcm9tICcuL2NvbXBvbmVudHMvV2hpdGVMYWJlbGxpbmcnO1xuXG4vLyBVdGlscygpO1xuLy8gd2luZG93LmxvZyA9IGxvZztcblxuKGZ1bmN0aW9uKCkge1xuICBDdXN0b21TZWxlY3QoKTtcbiAgQWRkcmVzcygpO1xuICBQZXQoKTtcbiAgQ292ZXJUeXBlcygpO1xuICBQYXltZW50KCk7XG4gIFdoaXRlTGFiZWxsaW5nKCdUb3dlcmdhdGUnKTtcbiAgQWRkVG9kYXlzRGF0ZSgpO1xuXG4gIC8vIGNoZWNrIHNvcnQgY29kZSBhbmQgYWNjb3VudCBudW1iZXJcbiAgQWN0aXZhdGVGb3JtVmFsaWRhdGlvbigpO1xuXG4gIGlmICgkKCcuZm9ybS1ncm91cC0tc29ydGNvZGUnKS5sZW5ndGggPiAwKSB7XG4gICAgQ2hlY2tCYW5rTnVtYmVyKCcuZm9ybS1ncm91cC0tc29ydGNvZGUgaW5wdXQnLCAnI2FjY291bnQtbnVtYmVyJyk7XG4gIH1cblxuICAvLyBsaW1pdCB0aGUgbnVtYmVyIGxlbmd0aCBmb3IgYmFuayBkZXRhaWxzXG4gIGlmICgkKCcuZm9ybS1ncm91cC0tYWNjb3VudC1udW1iZXIgaW5wdXQnKS5sZW5ndGggPiAwKSB7XG4gICAga2V5UHJlc3NDaGVjaygkKCcuZm9ybS1ncm91cC0tYWNjb3VudC1udW1iZXIgaW5wdXQnKSwgMTYpO1xuICB9XG4gIGlmICgkKCcuZm9ybS1jb250cm9sLS1jY3YnKS5sZW5ndGggPiAwKSB7XG4gICAga2V5UHJlc3NDaGVjaygkKCcuZm9ybS1jb250cm9sLS1jY3YnKSwgMyk7XG4gIH1cblxuICBjb25zdCBtYXhEYXRlID0gU2V0RGF0ZSgpO1xuICAkKCdpbnB1dFt0eXBlPWRhdGVdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLmF0dHIoJ21heCcsIG1heERhdGUpO1xuICB9KTtcblxuICAkKCcjZXhwaXJ5LWRhdGUnKS5yZW1vdmVBdHRyKCdtYXgnKTtcblxuICBDcmVkaXRDYXJkVHlwZURldGVjdG9yKHsgY3JlZGl0X2NhcmRfbG9nb3M6ICcuY2FyZF9sb2dvcycsIGVsbTogJyNjYXJkLW51bWJlcicgfSk7XG5cbiAgVG9nZ2xlUmVxdWlyZWRQYXltZW50RmllbGRzKCk7XG4gIFRvZ2dsZVJlcXVpcmVkUGV0RmllbGRzKCk7XG4gIFRvZ2dsZVJlcXVpcmVkRmllbGRzKCk7XG59KSgpO1xuIl19
