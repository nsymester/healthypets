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
  var $todaysDate = $('label[for="policy-start-immediately"]');
  var $policyStartDate = $('#policy-start-date');

  // bind Events
  // $todaysDate.change(AddTodaysDateHandler);
  // $(document).on('input', $todaysDate, AddTodaysDateHandler);
  //  $(document).on('touchStart', $todaysDate, AddTodaysDateHandler);
  if (document.querySelector('#policy-start-immediately-label') != null) {
    document.querySelector('#policy-start-immediately-label').addEventListener('change', AddTodaysDateHandler, false);
    document.querySelector('#policy-start-immediately-label').addEventListener('touchstart', AddTodaysDateHandler, false);
  }

  // methods
  function AddTodaysDateHandler(evt) {
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
  elm.on('keydown', function () {
    keyPressed($(this), maxKeyCount);
  });

  elm.on('keyup', function () {
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

  var logosObj = $(settings.credit_card_logos_id);

  // the regular expressions check for possible matches as you type, hence the OR operators based on the number of chars
  // Visa
  var visaRegex = new RegExp('^4[0-9]{0,15}$');

  // MasterCard

  var mastercardRegex = new RegExp('^5$|^5[1-5][0-9]{0,14}$');

  // American Express

  var amexRegex = new RegExp('^3$|^3[47][0-9]{0,13}$');

  // Diners Club

  var dinersRegex = new RegExp('^3$|^3[068]$|^3(?:0[0-5]|[68][0-9])[0-9]{0,11}$');

  // Discover

  var discoverRegex = new RegExp('^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$');

  // JCB

  var jcbRegex = new RegExp('^2[1]?$|^21[3]?$|^1[8]?$|^18[0]?$|^(?:2131|1800)[0-9]{0,11}$|^3[5]?$|^35[0-9]{0,14}$');

  return $(settings.elm).each(function () {
    // as the user types
    $(this).keyup(function () {
      var currentValue = $(this).val();

      // get rid of spaces and dashes before using the regular expression
      currentValue = currentValue.replace(/ /g, '').replace(/-/g, '');

      // checks per each, as their could be multiple hits
      if (currentValue.match(visaRegex)) {
        $(logosObj).addClass('is_visa');
      } else {
        $(logosObj).removeClass('is_visa');
      }

      if (currentValue.match(mastercardRegex)) {
        $(logosObj).addClass('is_mastercard');
      } else {
        $(logosObj).removeClass('is_mastercard');
      }

      if (currentValue.match(amexRegex)) {
        $(logosObj).addClass('is_amex');
      } else {
        $(logosObj).removeClass('is_amex');
      }

      if (currentValue.match(dinersRegex)) {
        $(logosObj).addClass('is_diners');
      } else {
        $(logosObj).removeClass('is_diners');
      }

      if (currentValue.match(discoverRegex)) {
        $(logosObj).addClass('is_discover');
      } else {
        $(logosObj).removeClass('is_discover');
      }

      if (currentValue.match(jcbRegex)) {
        $(logosObj).addClass('is_jcb');
      } else {
        $(logosObj).removeClass('is_jcb');
      }

      // if nothing is a hit we add a class to fade them all out
      if (currentValue != '' && !currentValue.match(visaRegex) && !currentValue.match(mastercardRegex) && !currentValue.match(amexRegex) && !currentValue.match(dinersRegex) && !currentValue.match(discoverRegex) && !currentValue.match(jcbRegex)) {
        $(logosObj).addClass('is_nothing');
      } else {
        $(logosObj).removeClass('is_nothing');
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

function init() {
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
}

ready(init);

function ready(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

},{"./components/Address":1,"./components/CoverTypes":2,"./components/CustomSelect":3,"./components/DatePicker":4,"./components/Payment":5,"./components/Pet":6,"./components/Validation":7,"./components/WhiteLabelling":8}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0FkZHJlc3MuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0NvdmVyVHlwZXMuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0N1c3RvbVNlbGVjdC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvRGF0ZVBpY2tlci5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGF5bWVudC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGV0LmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9WYWxpZGF0aW9uLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9XaGl0ZUxhYmVsbGluZy5qcyIsInNyYy9zY3JpcHRzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQTs7QUFFQTtBQUNBLFNBQVMsT0FBVCxHQUFtQjtBQUNqQjtBQUNBLE1BQU0sa0JBQWtCLEVBQUUsMkJBQUYsQ0FBeEI7QUFDQSxNQUFNLG9CQUFvQixFQUFFLHVCQUFGLENBQTFCO0FBQ0EsTUFBTSxlQUFlLEVBQUUsZ0JBQUYsQ0FBckI7O0FBRUEsTUFBTSxrQkFBa0IsRUFBRSwyQkFBRixDQUF4QjtBQUNBLE1BQU0saUJBQWlCLEVBQUUsMEJBQUYsQ0FBdkI7QUFDQSxNQUFNLFdBQVcsRUFBRSxtQkFBRixDQUFqQjs7QUFFQTtBQUNBLGtCQUFnQixLQUFoQixDQUFzQixVQUFTLEdBQVQsRUFBYztBQUNsQyxRQUFJLGNBQUo7QUFDQSxvQkFBZ0IsUUFBaEIsQ0FBeUIsUUFBekI7QUFDQSxtQkFBZSxRQUFmLENBQXdCLE1BQXhCO0FBQ0EsYUFBUyxRQUFULENBQWtCLE1BQWxCO0FBQ0QsR0FMRDs7QUFPQSxvQkFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBUyxHQUFULEVBQWM7QUFDMUMsUUFBSSxjQUFKO0FBQ0EsYUFBUyxR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cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBtb2R1bGUgJ0FkZHJlc3MuanMnXG5cbi8vIHBvc3Rjb2Rlc1xuZnVuY3Rpb24gQWRkcmVzcygpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGNvbnN0ICRwb3N0Y29kZVNlYXJjaCA9ICQoJyNjdXN0b21lci1wb3N0Y29kZS1zZWFyY2gnKTtcbiAgY29uc3QgJGFkZHJlc3NQb3N0Y29kZXMgPSAkKCcuYWRkcmVzc19fcG9zdGNvZGVzIGEnKTtcbiAgY29uc3QgJGFkZHJlc3NMaW5rID0gJCgnLmFkZHJlc3NfX2xpbmsnKTtcblxuICBjb25zdCAkcG9zdGNvZGVSZXN1bHQgPSAkKCcjY3VzdG9tZXItcG9zdGNvZGUtcmVzdWx0Jyk7XG4gIGNvbnN0ICRtYW51YWxBZGRyZXNzID0gJCgnI2N1c3RvbWVyLW1hbnVhbC1hZGRyZXNzJyk7XG4gIGNvbnN0ICRhZGRyZXNzID0gJCgnI2N1c3RvbWVyLWFkZHJlc3MnKTtcblxuICAvLyBiaW5kIGV2ZW50c1xuICAkcG9zdGNvZGVTZWFyY2guY2xpY2soZnVuY3Rpb24oZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJHBvc3Rjb2RlUmVzdWx0LmNvbGxhcHNlKCd0b2dnbGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRhZGRyZXNzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRhZGRyZXNzUG9zdGNvZGVzLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICRhZGRyZXNzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJHBvc3Rjb2RlUmVzdWx0LmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJG1hbnVhbEFkZHJlc3MuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJGFkZHJlc3NMaW5rLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICRhZGRyZXNzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJHBvc3Rjb2RlUmVzdWx0LmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJG1hbnVhbEFkZHJlc3MuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEFkZHJlc3MgfTtcbiIsIi8vIG1vZHVsZSBcIkNvdmVyVHlwZXMuanNcIlxuXG5mdW5jdGlvbiBDb3ZlclR5cGVzKCkge1xuICAvLyBjYWNoZSBET01cbiAgY29uc3QgJGxpZmV0aW1lTGluayA9ICQoJyNsaWZldGltZS1saW5rJyk7XG4gIGNvbnN0ICRtYXhpbXVtTGluayA9ICQoJyNtYXhpbXVtLWxpbmsnKTtcbiAgY29uc3QgJGFjY2lkZW50TGluayA9ICQoJyNhY2NpZGVudC1saW5rJyk7XG4gIGNvbnN0ICRidG5Db3ZlckxldmVsID0gJCgnLmJ0bi0tY292ZXItbGV2ZWwnKTtcblxuICBjb25zdCAkbGlmZXRpbWVDb3ZlciA9ICQoJyNsaWZldGltZS1jb3ZlcicpO1xuICBjb25zdCAkbWF4aW11bUNvdmVyID0gJCgnI21heGltdW0tY292ZXInKTtcbiAgY29uc3QgJGFjY2lkZW50Q292ZXIgPSAkKCcjYWNjaWRlbnQtY292ZXInKTtcblxuICAkbGlmZXRpbWVMaW5rLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRsaWZldGltZUNvdmVyLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJG1heGltdW1Db3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRhY2NpZGVudENvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRtYXhpbXVtTGluay5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkbGlmZXRpbWVDb3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRtYXhpbXVtQ292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkYWNjaWRlbnRDb3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWNjaWRlbnRMaW5rLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRsaWZldGltZUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJG1heGltdW1Db3Zlci5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRhY2NpZGVudENvdmVyLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gIC8vIGJpbmQgRXZlbnRzXG5cbiAgLy8gc3RvcCB3ZWIgcGFnZSBmcm9tIHNjcm9sbGluZyB0byB0b3Agd2hlbiBsaW5rIGlzIGNsaWNrZWQgdGhhdCB0cmlnZ2VycyBKYXZhU2NyaXB0XG4gICRidG5Db3ZlckxldmVsLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gdGFyZ2V0IGlkXG4gICAgY29uc3QgdGFyZ2V0SWQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xuICAgIGNvbnN0IHRhcmdldEhlaWdodCA9ICQodGFyZ2V0SWQpLmhlaWdodCgpIC0gMTAwO1xuICAgIC8vIGxldCBkb2N1bWVudEhlaWdodCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0YXJnZXRIZWlnaHQgfSk7XG5cbiAgICBpZiAodGhpcy5pbm5lckhUTUwgPT09ICdDaG9vc2UgbGV2ZWwnKSB7XG4gICAgICB0aGlzLmlubmVySFRNTCA9ICdIaWRlIGxldmVscyc7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYnRuLS1vdXRsaW5lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gJ0Nob29zZSBsZXZlbCc7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdidG4tLW91dGxpbmUnKTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGRhdGEgdGFyZ2V0XG4gICAgLy8gc3BsaXQgb24gXCItXCJcbiAgICBjb25zdCB0YXJnZXRBcnJheSA9ICQodGhpcylcbiAgICAgIC5kYXRhKCd0YXJnZXQnKVxuICAgICAgLnNwbGl0KCctJyk7XG4gICAgY29uc29sZS5sb2coJ3RhcmdldDogJywgdGFyZ2V0QXJyYXlbMV0pO1xuICAgIC8vIGNvdmVyID0gZ2V0IDJuZCBlbGVtZW50XG4gICAgLy8gZmluZCBpZCBcIntjb3Zlcn0tY292ZXJcIlxuICAgIC8vIHJlbW92ZSBmcm9tIGNsYXNzbGlzdCBcInNob3dcIlxuICAgIC8vICQoYCR7dGFyZ2V0QXJyYXlbMV19LWNvdmVyYCkucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IENvdmVyVHlwZXMgfTtcbiIsIi8vIG1vZHVsZSBcIkN1c3RvbVNlbGVjdC5qc1wiXG5cbmZ1bmN0aW9uIGNsb3NlQWxsU2VsZWN0KGVsbW50KSB7XG4gIC8qIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNsb3NlIGFsbCBzZWxlY3QgYm94ZXMgaW4gdGhlIGRvY3VtZW50LFxuICBleGNlcHQgdGhlIGN1cnJlbnQgc2VsZWN0IGJveDogKi9cblxuICBjb25zdCBhcnJObyA9IFtdO1xuICBjb25zdCB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LWl0ZW1zJyk7XG4gIGNvbnN0IHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3Qtc2VsZWN0ZWQnKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGVsbW50ID09IHlbaV0pIHtcbiAgICAgIGFyck5vLnB1c2goaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHlbaV0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0LWFycm93LWFjdGl2ZScpO1xuICAgIH1cbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoYXJyTm8uaW5kZXhPZihpKSkge1xuICAgICAgeFtpXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QtaGlkZScpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjbG9zZU90aGVyT3B0aW9ucyhlKSB7XG4gIC8qIHdoZW4gdGhlIHNlbGVjdCBib3ggaXMgY2xpY2tlZCwgY2xvc2UgYW55IG90aGVyIHNlbGVjdCBib3hlcyxcbiAgYW5kIG9wZW4vY2xvc2UgdGhlIGN1cnJlbnQgc2VsZWN0IGJveDogKi9cbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgY2xvc2VBbGxTZWxlY3QodGhpcyk7XG4gIHRoaXMubmV4dFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0LWhpZGUnKTtcbiAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3QtYXJyb3ctYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRm9yQ29uZGl0aW9ucygpIHtcbiAgJCgnLnBpbGxfX2NvbmRpdGlvbiAuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuY3VycmVudFRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gQ3VzdG9tU2VsZWN0KCkge1xuICBsZXQgc2VsZWN0ZWRJdGVtO1xuICBsZXQgb3B0aW9uTGlzdDtcbiAgbGV0IG9wdGlvbkl0ZW07XG5cbiAgLy8gY2FjaGUgRE9NXG4gIC8qIGxvb2sgZm9yIGFueSBlbGVtZW50cyB3aXRoIHRoZSBjbGFzcyBcInNlbGVjdC0tYWx0XCI6ICovXG4gIGNvbnN0IHNlbGVjdEFsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC0tYWx0Jyk7XG5cbiAgLy8gYmluZCBFdmVudHNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RBbHQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBzZWxFbGVtZW50ID0gc2VsZWN0QWx0W2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzZWxlY3QnKVswXTtcblxuICAgIC8qIGZvciBlYWNoIGVsZW1lbnQsIGNyZWF0ZSBhIG5ldyBESVYgdGhhdCB3aWxsIGFjdCBhcyB0aGUgc2VsZWN0ZWQgaXRlbTogKi9cbiAgICBzZWxlY3RlZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBzZWxlY3RlZEl0ZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdzZWxlY3Qtc2VsZWN0ZWQnKTtcbiAgICBzZWxlY3RlZEl0ZW0uaW5uZXJIVE1MID0gc2VsRWxlbWVudC5vcHRpb25zW3NlbEVsZW1lbnQuc2VsZWN0ZWRJbmRleF0uaW5uZXJIVE1MO1xuXG4gICAgc2VsZWN0QWx0W2ldLmFwcGVuZENoaWxkKHNlbGVjdGVkSXRlbSk7XG5cbiAgICAvKiBmb3IgZWFjaCBlbGVtZW50LCBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBjb250YWluIHRoZSBvcHRpb24gbGlzdDogKi9cbiAgICBvcHRpb25MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgb3B0aW9uTGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NlbGVjdC1pdGVtcyBzZWxlY3QtaGlkZScpO1xuXG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCBzZWxFbGVtZW50Lmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAvKiBmb3IgZWFjaCBvcHRpb24gaW4gdGhlIG9yaWdpbmFsIHNlbGVjdCBlbGVtZW50LFxuICAgICAgY3JlYXRlIGEgbmV3IERJViB0aGF0IHdpbGwgYWN0IGFzIGFuIG9wdGlvbiBpdGVtOiAqL1xuICAgICAgb3B0aW9uSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgb3B0aW9uSXRlbS5pbm5lckhUTUwgPSBzZWxFbGVtZW50Lm9wdGlvbnNbal0uaW5uZXJIVE1MO1xuICAgICAgb3B0aW9uSXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN5bmNPcHRpb25TZWxlY3RlZCk7XG5cbiAgICAgIG9wdGlvbkxpc3QuYXBwZW5kQ2hpbGQob3B0aW9uSXRlbSk7XG4gICAgfVxuXG4gICAgc2VsZWN0QWx0W2ldLmFwcGVuZENoaWxkKG9wdGlvbkxpc3QpO1xuXG4gICAgc2VsZWN0ZWRJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VPdGhlck9wdGlvbnMpO1xuICB9XG5cbiAgLy8gbWV0aG9kc1xuICBmdW5jdGlvbiBzeW5jT3B0aW9uU2VsZWN0ZWQoKSB7XG4gICAgLyogd2hlbiBhbiBpdGVtIGlzIGNsaWNrZWQsIHVwZGF0ZSB0aGUgb3JpZ2luYWwgc2VsZWN0IGJveCxcbiAgICBhbmQgdGhlIHNlbGVjdGVkIGl0ZW06ICovXG4gICAgY29uc3Qgb3JpZ2luYWxTZWxlY3QgPSB0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2VsZWN0JylbMF07XG5cbiAgICAvLyBzdG9yZSB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgIGNvbnN0IGggPSB0aGlzLnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JpZ2luYWxTZWxlY3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChvcmlnaW5hbFNlbGVjdC5vcHRpb25zW2ldLmlubmVySFRNTCA9PT0gdGhpcy5pbm5lckhUTUwpIHtcbiAgICAgICAgb3JpZ2luYWxTZWxlY3Quc2VsZWN0ZWRJbmRleCA9IGk7XG4gICAgICAgIGguaW5uZXJIVE1MID0gdGhpcy5pbm5lckhUTUw7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnBhcmVudE5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2FtZS1hcy1zZWxlY3RlZCcpO1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHkubGVuZ3RoOyBrICs9IDEpIHtcbiAgICAgICAgICB5W2tdLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2FtZS1hcy1zZWxlY3RlZCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaC5jbGljaygpO1xuICAgIGlmIChvcmlnaW5hbFNlbGVjdC5nZXRBdHRyaWJ1dGUoJ2lkJykgPT09ICdjb25kaXRpb24tc2VsZWN0Jykge1xuICAgICAgJCgnLmNvbmRpdGlvbnMnKS5hcHBlbmQoYDxkaXYgY2xhc3M9J3BpbGxfX2NvbmRpdGlvbic+JHtoLmlubmVySFRNTH0gPHNwYW4gY2xhc3M9J2Nsb3NlJz54PC9zcGFuPjwvZGl2PmApO1xuICAgICAgY2hlY2tGb3JDb25kaXRpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgLyogaWYgdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIG91dHNpZGUgdGhlIHNlbGVjdCBib3gsXG4gIHRoZW4gY2xvc2UgYWxsIHNlbGVjdCBib3hlczogKi9cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUFsbFNlbGVjdCk7XG59XG5cbmV4cG9ydCB7IEN1c3RvbVNlbGVjdCB9O1xuIiwiLy8gbW9kdWxlICdEYXRlUGlja2VyLmpzJ1xuXG4vLyBwb3N0Y29kZXNcbmZ1bmN0aW9uIFNldERhdGUoKSB7XG4gIC8vIGNhY2hlIERPTVxuXG4gIGNvbnN0IGR0VG9kYXkgPSBuZXcgRGF0ZSgpO1xuXG4gIGxldCBtb250aCA9IGR0VG9kYXkuZ2V0TW9udGgoKSArIDE7XG4gIGxldCBkYXkgPSBkdFRvZGF5LmdldERhdGUoKTtcbiAgY29uc3QgeWVhciA9IGR0VG9kYXkuZ2V0RnVsbFllYXIoKTtcblxuICBpZiAobW9udGggPCAxMCkgbW9udGggPSBgMCR7bW9udGgudG9TdHJpbmcoKX1gO1xuICBpZiAoZGF5IDwgMTApIGRheSA9IGAwJHtkYXkudG9TdHJpbmcoKX1gO1xuXG4gIGNvbnN0IG1heERhdGUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xuICByZXR1cm4gbWF4RGF0ZTtcbn1cblxuZnVuY3Rpb24gQWRkVG9kYXlzRGF0ZSgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGNvbnN0ICR0b2RheXNEYXRlID0gJCgnbGFiZWxbZm9yPVwicG9saWN5LXN0YXJ0LWltbWVkaWF0ZWx5XCJdJyk7XG4gIGNvbnN0ICRwb2xpY3lTdGFydERhdGUgPSAkKCcjcG9saWN5LXN0YXJ0LWRhdGUnKTtcblxuICAvLyBiaW5kIEV2ZW50c1xuICAvLyAkdG9kYXlzRGF0ZS5jaGFuZ2UoQWRkVG9kYXlzRGF0ZUhhbmRsZXIpO1xuICAvLyAkKGRvY3VtZW50KS5vbignaW5wdXQnLCAkdG9kYXlzRGF0ZSwgQWRkVG9kYXlzRGF0ZUhhbmRsZXIpO1xuICAvLyAgJChkb2N1bWVudCkub24oJ3RvdWNoU3RhcnQnLCAkdG9kYXlzRGF0ZSwgQWRkVG9kYXlzRGF0ZUhhbmRsZXIpO1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvbGljeS1zdGFydC1pbW1lZGlhdGVseS1sYWJlbCcpICE9IG51bGwpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9saWN5LXN0YXJ0LWltbWVkaWF0ZWx5LWxhYmVsJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgQWRkVG9kYXlzRGF0ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNwb2xpY3ktc3RhcnQtaW1tZWRpYXRlbHktbGFiZWwnKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBBZGRUb2RheXNEYXRlSGFuZGxlciwgZmFsc2UpO1xuICB9XG5cbiAgLy8gbWV0aG9kc1xuICBmdW5jdGlvbiBBZGRUb2RheXNEYXRlSGFuZGxlcihldnQpIHtcbiAgICBpZiAoISRwb2xpY3lTdGFydERhdGUuYXR0cignZGlzYWJsZWQnKSkge1xuICAgICAgJHBvbGljeVN0YXJ0RGF0ZS52YWwoU2V0RGF0ZSgpKTtcbiAgICAgICRwb2xpY3lTdGFydERhdGUuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJHBvbGljeVN0YXJ0RGF0ZS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCB7IFNldERhdGUsIEFkZFRvZGF5c0RhdGUgfTtcbiIsIi8vIG1vZHVsZSBcIlBheW1lbnQuanNcIlxuXG5mdW5jdGlvbiBQYXltZW50KCkge1xuICAvLyBjYWNoZSBET01cbiAgY29uc3QgJHJlZ3VsYXJQYXlNb250aGx5ID0gJCgnI3JlZ3VsYXItcGF5LW1vbnRobHknKTtcbiAgY29uc3QgJHJlZ3VsYXJQYXlBbm51YWxseSA9ICQoJyNyZWd1bGFyLXBheS1hbm51YWxseScpO1xuICBjb25zdCAkcGF5bWVudFR5cGVEZWJpdCA9ICQoJyNwYXltZW50LXR5cGUtZGViaXQnKTtcbiAgY29uc3QgJHBheW1lbnRUeXBlQ3JlZGl0ID0gJCgnI3BheW1lbnQtdHlwZS1jcmVkaXQnKTtcblxuICBjb25zdCAkZGlyZWN0RGViaXREZXRhaWxzID0gJCgnI2RpcmVjdC1kZWJpdC1kZXRhaWxzJyk7XG4gIGNvbnN0ICRwYXltZW50VHlwZSA9ICQoJyNwYXltZW50LXR5cGUnKTtcbiAgY29uc3QgJGNyZWRpdENhcmREZXRhaWxzID0gJCgnI2NyZWRpdC1jYXJkLWRldGFpbHMnKTtcblxuICAvLyBiaW5kIGV2ZW50c1xuICAkcmVndWxhclBheU1vbnRobHkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJGRpcmVjdERlYml0RGV0YWlscy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRwYXltZW50VHlwZS5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkcmVndWxhclBheUFubnVhbGx5LmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRwYXltZW50VHlwZS5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJHBheW1lbnRUeXBlRGViaXQuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJGRpcmVjdERlYml0RGV0YWlscy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRjcmVkaXRDYXJkRGV0YWlscy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkcGF5bWVudFR5cGVDcmVkaXQuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJGNyZWRpdENhcmREZXRhaWxzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGRpcmVjdERlYml0RGV0YWlscy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gQ2hlY2tCYW5rTnVtYmVyKGVsZW0sIG5leHRFbGVtKSB7XG4gIGNvbnN0IGFsbG93ZWRLZXlzID0gW1xuICAgIDgsXG4gICAgMzcsXG4gICAgMzgsXG4gICAgMzksXG4gICAgNDAsXG4gICAgNDYsXG4gICAgNDgsXG4gICAgNDksXG4gICAgNTAsXG4gICAgNTEsXG4gICAgNTIsXG4gICAgNTMsXG4gICAgNTQsXG4gICAgNTUsXG4gICAgNTcsXG4gICAgNTcsXG4gICAgOTYsXG4gICAgOTcsXG4gICAgOTgsXG4gICAgOTksXG4gICAgMTAwLFxuICAgIDEwMSxcbiAgICAxMDIsXG4gICAgMTAzLFxuICAgIDEwNCxcbiAgICAxMDUsXG4gIF07XG5cbiAgJChlbGVtKS5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gJC5pbkFycmF5KGUud2hpY2gsIGFsbG93ZWRLZXlzKSA+IC0xO1xuICB9KTtcblxuICBmdW5jdGlvbiBkZWxldGVHb0JhY2sodGhhdCwgZSkge1xuICAgIHJldHVybiB0aGF0LnNlbGVjdGlvblN0YXJ0ID09PSAwICYmICQuaW5BcnJheShlLndoaWNoLCBbOCwgNDZdKSA+IC0xO1xuICB9XG5cbiAgY29uc3QgJHNvcnRDb2RlID0gJChlbGVtKTtcbiAgY29uc3QgY291bnQgPSAkc29ydENvZGUubGVuZ3RoIC0gMTtcbiAgY29uc3QgJGFjY05vID0gJChuZXh0RWxlbSk7XG5cbiAgJHNvcnRDb2RlLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zdCBpbmRleCA9ICRzb3J0Q29kZS5pbmRleCh0aGlzKTtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnZhbHVlO1xuXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IHRoaXMubWF4TGVuZ3RoKSB7XG4gICAgICBpZiAoaW5kZXggPT09IGNvdW50KSB7XG4gICAgICAgICRhY2NOby5mb2N1cygpO1xuICAgICAgfSBlbHNlIGlmIChpbmRleCA8IGNvdW50KSB7XG4gICAgICAgICRzb3J0Q29kZS5lcShpbmRleCArIDEpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkZWxldGVHb0JhY2sodGhpcywgZSkgJiYgaW5kZXggIT09IDApIHtcbiAgICAgICRzb3J0Q29kZS5lcShpbmRleCAtIDEpLmZvY3VzKCk7XG4gICAgfVxuICB9KTtcblxuICAkYWNjTm8ub24oJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgIGlmIChkZWxldGVHb0JhY2sodGhpcywgZSkpIHtcbiAgICAgICRzb3J0Q29kZS5sYXN0KCkuZm9jdXMoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBUb2dnbGVSZXF1aXJlZFBheW1lbnRGaWVsZHMoKSB7XG4gIGlmICgkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJIZWxsbyBSZWd1bGFyIFBheVwiKTtcblxuICAgIC8vIGlmIG1vbnRobHkgc2VsZWN0ZWRcbiAgICAvLyB0aGVuIGNoZWNrIGZvciBkaXJlY3QgZGViaXQgaW5mb3JtYXRpb25cbiAgICAkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl0nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIGlmICgkKCcjcmVndWxhci1wYXktYW5udWFsbHk6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWxjb21lIHRvIEFubnVhbCByZXBheW1lbnRzXCIpO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBncmFuZHByYXJlbnQgYm94IHNldCBlYXJsaWVyIHdoZW4gY2hlY2sgcGF5bWVudCB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdOmZpcnN0JylcbiAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIERpcmVjdCBEZWJpdCBmaWVsZHMgTk9UIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCcjYWNjb3VudC1uYW1lJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQxJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQzJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNhY2NvdW50LW51bWJlcicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRoZSBwYXltZW50IHR5cGUgZmllbGRzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudC10eXBlXCJdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHRoaXMpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIENyZWRpdC9EZWJpdCBDYXJkIGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNjYXJkLW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNleHBpcnktZGF0ZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2N2JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCB0aGUgZGlyZWN0IGRlYml0IGZpZWxkcyB0byByZXF1aXJlZFxuICAgICAgaWYgKCQoJyNyZWd1bGFyLXBheS1tb250aGx5OmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV2VsY29tZSB0byBNb250aGx5IHJlcGF5bWVudHNcIik7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGdyYW5kcHJhcmVudCBib3ggc2V0IGVhcmxpZXIgd2hlbiBjaGVjayBwYXltZW50IHdhc24ndCBzZWxlY3RlZFxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl06Zmlyc3QnKVxuICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIERpcmVjdCBEZWJpdCBmaWVsZHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNhY2NvdW50LW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQyJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjYWNjb3VudC1udW1iZXInKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIHBheW1lbnQgdHlwZSBmaWVsZHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpcykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIENyZWRpdC9EZWJpdCBDYXJkIGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNjYXJkLW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNleHBpcnktZGF0ZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2N2JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpZiBwYXltZW50IHR5cGUgc2VsZWN0ZWRcbiAgICAvLyB0aGVuIGNoZWNrIGZvciBlaXRoZXIgdGhlIGRpcmVjdCBkZWJpdCBvciBjcmVkaXQgY2FyZCBpbmZvcm1hdGlvblxuICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl0nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIGlmICgkKCcjcGF5bWVudC10eXBlLWRlYml0OmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV2VsY29tZSB0byBEaXJlY3QgRGViaXQgcGF5bWVudFwiKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIGNoZWNrIHBheW1lbnQgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl06Zmlyc3QnKVxuICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIERpcmVjdCBEZWJpdCBmaWVsZHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNhY2NvdW50LW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQyJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjYWNjb3VudC1udW1iZXInKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIENyZWRpdC9EZWJpdCBDYXJkIGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNjYXJkLW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNleHBpcnktZGF0ZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2N2JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgkKCcjcGF5bWVudC10eXBlLWNyZWRpdDpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIldlbGNvbWUgdG8gQ3JlZGl0L0RlYml0IENhcmQgcGF5bWVudFwiKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIGNoZWNrIHBheW1lbnQgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl06Zmlyc3QnKVxuICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICc3NXB4Jyk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgRGlyZWN0IERlYml0IGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNhY2NvdW50LW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDEnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2FjY291bnQtbnVtYmVyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIENyZWRpdC9EZWJpdCBDYXJkIGZpZWxkcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2NhcmQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlcicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNleHBpcnktZGF0ZScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNjY3YnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIFRvZ2dsZVJlcXVpcmVkRmllbGRzKCkge1xuICBpZiAoJCgnaW5wdXRbbmFtZT1cInByZS1leGlzdGluZy1jb25kaXRpb25cIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgLy8gY2hlY2sgZm9yIHByZS1leGlzdGluZyBjb25kdGlvbiBpbmZvcm1hdGlvblxuICAgICQoJ2lucHV0W25hbWU9XCJwcmUtZXhpc3RpbmctY29uZGl0aW9uXCJdJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIHByZS1leGlzdGluZyBjb25kdGlvbiB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwcmUtZXhpc3RpbmctY29uZGl0aW9uXCJdOmZpcnN0JylcbiAgICAgICAgLnBhcmVudCgpXG4gICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAvLyBjaGVjayBmb3IgbmV1dGVyZWQgaW5mb3JtYXRpb25cbiAgICAkKCdpbnB1dFtuYW1lPVwibmV1dGVyZWRcIl0nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBncmFuZHByYXJlbnQgYm94IHNldCBlYXJsaWVyIHdoZW4gbmV1dGVyZWQgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAkKCdpbnB1dFtuYW1lPVwibmV1dGVyZWRcIl06Zmlyc3QnKVxuICAgICAgICAucGFyZW50KClcbiAgICAgICAgLnBhcmVudCgpXG4gICAgICAgIC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdJykubGVuZ3RoID4gMCkge1xuICAgIC8vIGNoZWNrIGZvciBwZXQtdHlwZSBpbmZvcm1hdGlvblxuICAgICQoJ2lucHV0W25hbWU9XCJwZXQtdHlwZVwiXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGdyYW5kcHJhcmVudCBib3ggc2V0IGVhcmxpZXIgd2hlbiBwZXQtdHlwZSB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwZXQtdHlwZVwiXTpmaXJzdCcpXG4gICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAucGFyZW50KClcbiAgICAgICAgLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICB9KTtcbiAgfVxufVxuXG5sZXQga2V5Q291bnQgPSAxO1xuZnVuY3Rpb24gaXNOdW1iZXJLZXkoZXZlbnQpIHtcbiAgY29uc3Qga2V5Q29kZSA9IHdpbmRvdy5ldmVudCA/IGV2ZW50LmtleUNvZGUgOiBldmVudC53aGljaDtcblxuICBpZiAoXG4gICAga2V5Q29kZSA9PT0gOCB8fCAvLyBiYWNrc3BhY2VcbiAgICBrZXlDb2RlID09PSA0NiB8fCAvLyBkZWxldGVcbiAgICBrZXlDb2RlID09PSAxMyB8fCAvLyBlbnRlciBrZXlcbiAgICBrZXlDb2RlID09PSA5IHx8IC8vIHRhYlxuICAgIGtleUNvZGUgPT09IDExNiB8fCAvLyBGNSAocmVmcmVzaClcbiAgICBrZXlDb2RlID09PSAxMTIgfHwgLy8gRjFcbiAgICBrZXlDb2RlID09PSAxMTMgfHwgLy8gRjJcbiAgICBrZXlDb2RlID09PSAxMTQgfHwgLy8gRjNcbiAgICBrZXlDb2RlID09PSAxMTUgfHwgLy8gRjRcbiAgICBrZXlDb2RlID09PSAxMTcgfHwgLy8gRjZcbiAgICBrZXlDb2RlID09PSAxMTggfHwgLy8gRjdcbiAgICBrZXlDb2RlID09PSAxMTkgfHwgLy8gRjhcbiAgICBrZXlDb2RlID09PSAxMjAgfHwgLy8gRjlcbiAgICBrZXlDb2RlID09PSAxMjEgfHwgLy8gRjEwXG4gICAga2V5Q29kZSA9PT0gMTIyIHx8IC8vIEYxMVxuICAgIGtleUNvZGUgPT09IDEyMyAvLyBGMTJcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGtleUNvZGUgPCA0OCB8fCBrZXlDb2RlID4gNTcpIHtcbiAgICBpZiAoa2V5Q291bnQgPCA2KSB7XG4gICAgICBrZXlDb3VudCArPSAxOyAvLyBhZGRzIG9uZSB0byBjb3VudFxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnUGxlYXNlIE9ubHkgRW50ZXIgTnVtZXJpY2FsIFZhbHVlcycpO1xuICAgICAga2V5Q291bnQgPSAxO1xuICAgIH1cbiAgICAvLyByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGtleVByZXNzZWQoZWxtLCBtYXhLZXlDb3VudCkge1xuICBpZiAoZWxtLnZhbCgpLmxlbmd0aCA+PSBtYXhLZXlDb3VudCkge1xuICAgIGVsbS52YWwoZWxtLnZhbCgpLnN1YnN0cigwLCBtYXhLZXlDb3VudCkpO1xuICAgIGVsbS5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpO1xuICAgIGVsbS5hZGRDbGFzcygnaXMtdmFsaWQnKTtcbiAgfSBlbHNlIHtcbiAgICBlbG0uYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcbiAgICBlbG0ucmVtb3ZlQ2xhc3MoJ2lzLXZhbGlkJyk7XG4gIH1cbn1cbmZ1bmN0aW9uIGtleVByZXNzQ2hlY2soZWxtLCBtYXhLZXlDb3VudCkge1xuICBlbG0ub24oJ2tleWRvd24nLCBmdW5jdGlvbigpIHtcbiAgICBrZXlQcmVzc2VkKCQodGhpcyksIG1heEtleUNvdW50KTtcbiAgfSk7XG5cbiAgZWxtLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xuICAgIGtleVByZXNzZWQoJCh0aGlzKSwgbWF4S2V5Q291bnQpO1xuICB9KTtcbn1cblxuLy8gZnVuY3Rpb24gR2V0Q2FyZFR5cGUobnVtYmVyKSB7XG4vLyAgIC8vIHZpc2Fcbi8vICAgbGV0IHJlID0gbmV3IFJlZ0V4cCgnXjQnKTtcbi8vICAgaWYgKG51bWJlci5tYXRjaChyZSkgIT0gbnVsbCkgcmV0dXJuICdWaXNhJztcblxuLy8gICAvLyBNYXN0ZXJjYXJkXG4vLyAgIC8vIFVwZGF0ZWQgZm9yIE1hc3RlcmNhcmQgMjAxNyBCSU5zIGV4cGFuc2lvblxuLy8gICBpZiAoXG4vLyAgICAgL14oNVsxLTVdWzAtOV17MTR9fDIoMjJbMS05XVswLTldezEyfXwyWzMtOV1bMC05XXsxM318WzMtNl1bMC05XXsxNH18N1swLTFdWzAtOV17MTN9fDcyMFswLTldezEyfSkpJC8udGVzdChudW1iZXIpXG4vLyAgIClcbi8vICAgICByZXR1cm4gJ01hc3RlcmNhcmQnO1xuXG4vLyAgIC8vIEFNRVhcbi8vICAgcmUgPSBuZXcgUmVnRXhwKCdeM1s0N10nKTtcbi8vICAgaWYgKG51bWJlci5tYXRjaChyZSkgIT0gbnVsbCkgcmV0dXJuICdBTUVYJztcblxuLy8gICAvLyBEaXNjb3ZlclxuLy8gICByZSA9IG5ldyBSZWdFeHAoJ14oNjAxMXw2MjIoMTJbNi05XXwxWzMtOV1bMC05XXxbMi04XVswLTldezJ9fDlbMC0xXVswLTldfDkyWzAtNV18NjRbNC05XSl8NjUpJyk7XG4vLyAgIGlmIChudW1iZXIubWF0Y2gocmUpICE9IG51bGwpIHJldHVybiAnRGlzY292ZXInO1xuXG4vLyAgIC8vIERpbmVyc1xuLy8gICByZSA9IG5ldyBSZWdFeHAoJ14zNicpO1xuLy8gICBpZiAobnVtYmVyLm1hdGNoKHJlKSAhPSBudWxsKSByZXR1cm4gJ0RpbmVycyc7XG5cbi8vICAgLy8gRGluZXJzIC0gQ2FydGUgQmxhbmNoZVxuLy8gICByZSA9IG5ldyBSZWdFeHAoJ14zMFswLTVdJyk7XG4vLyAgIGlmIChudW1iZXIubWF0Y2gocmUpICE9IG51bGwpIHJldHVybiAnRGluZXJzIC0gQ2FydGUgQmxhbmNoZSc7XG5cbi8vICAgLy8gSkNCXG4vLyAgIHJlID0gbmV3IFJlZ0V4cCgnXjM1KDJbODldfFszLThdWzAtOV0pJyk7XG4vLyAgIGlmIChudW1iZXIubWF0Y2gocmUpICE9IG51bGwpIHJldHVybiAnSkNCJztcblxuLy8gICAvLyBWaXNhIEVsZWN0cm9uXG4vLyAgIHJlID0gbmV3IFJlZ0V4cCgnXig0MDI2fDQxNzUwMHw0NTA4fDQ4NDR8NDkxKDN8NykpJyk7XG4vLyAgIGlmIChudW1iZXIubWF0Y2gocmUpICE9IG51bGwpIHJldHVybiAnVmlzYSBFbGVjdHJvbic7XG5cbi8vICAgcmV0dXJuICcnO1xuLy8gfVxuXG5mdW5jdGlvbiBDcmVkaXRDYXJkVHlwZURldGVjdG9yKG9wdGlvbnMpIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSAkLmV4dGVuZChcbiAgICB7XG4gICAgICBjcmVkaXRfY2FyZF9sb2dvc19pZDogJy5jYXJkX2xvZ29zJyxcbiAgICAgIGVsbTogJyNjYXJkLW51bWJlcicsXG4gICAgfSxcbiAgICBvcHRpb25zXG4gICk7XG5cbiAgLy8gdGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBsb2dvc1xuXG4gIGNvbnN0IGxvZ29zT2JqID0gJChzZXR0aW5ncy5jcmVkaXRfY2FyZF9sb2dvc19pZCk7XG5cbiAgLy8gdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgY2hlY2sgZm9yIHBvc3NpYmxlIG1hdGNoZXMgYXMgeW91IHR5cGUsIGhlbmNlIHRoZSBPUiBvcGVyYXRvcnMgYmFzZWQgb24gdGhlIG51bWJlciBvZiBjaGFyc1xuICAvLyBWaXNhXG4gIGNvbnN0IHZpc2FSZWdleCA9IG5ldyBSZWdFeHAoJ140WzAtOV17MCwxNX0kJyk7XG5cbiAgLy8gTWFzdGVyQ2FyZFxuXG4gIGNvbnN0IG1hc3RlcmNhcmRSZWdleCA9IG5ldyBSZWdFeHAoJ141JHxeNVsxLTVdWzAtOV17MCwxNH0kJyk7XG5cbiAgLy8gQW1lcmljYW4gRXhwcmVzc1xuXG4gIGNvbnN0IGFtZXhSZWdleCA9IG5ldyBSZWdFeHAoJ14zJHxeM1s0N11bMC05XXswLDEzfSQnKTtcblxuICAvLyBEaW5lcnMgQ2x1YlxuXG4gIGNvbnN0IGRpbmVyc1JlZ2V4ID0gbmV3IFJlZ0V4cCgnXjMkfF4zWzA2OF0kfF4zKD86MFswLTVdfFs2OF1bMC05XSlbMC05XXswLDExfSQnKTtcblxuICAvLyBEaXNjb3ZlclxuXG4gIGNvbnN0IGRpc2NvdmVyUmVnZXggPSBuZXcgUmVnRXhwKCdeNiR8XjZbMDVdJHxeNjAxWzFdPyR8XjY1WzAtOV1bMC05XT8kfF42KD86MDExfDVbMC05XXsyfSlbMC05XXswLDEyfSQnKTtcblxuICAvLyBKQ0JcblxuICBjb25zdCBqY2JSZWdleCA9IG5ldyBSZWdFeHAoJ14yWzFdPyR8XjIxWzNdPyR8XjFbOF0/JHxeMThbMF0/JHxeKD86MjEzMXwxODAwKVswLTldezAsMTF9JHxeM1s1XT8kfF4zNVswLTldezAsMTR9JCcpO1xuXG4gIHJldHVybiAkKHNldHRpbmdzLmVsbSkuZWFjaChmdW5jdGlvbigpIHtcbiAgICAvLyBhcyB0aGUgdXNlciB0eXBlc1xuICAgICQodGhpcykua2V5dXAoZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgY3VycmVudFZhbHVlID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgLy8gZ2V0IHJpZCBvZiBzcGFjZXMgYW5kIGRhc2hlcyBiZWZvcmUgdXNpbmcgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgICAgY3VycmVudFZhbHVlID0gY3VycmVudFZhbHVlLnJlcGxhY2UoLyAvZywgJycpLnJlcGxhY2UoLy0vZywgJycpO1xuXG4gICAgICAvLyBjaGVja3MgcGVyIGVhY2gsIGFzIHRoZWlyIGNvdWxkIGJlIG11bHRpcGxlIGhpdHNcbiAgICAgIGlmIChjdXJyZW50VmFsdWUubWF0Y2godmlzYVJlZ2V4KSkge1xuICAgICAgICAkKGxvZ29zT2JqKS5hZGRDbGFzcygnaXNfdmlzYScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChsb2dvc09iaikucmVtb3ZlQ2xhc3MoJ2lzX3Zpc2EnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN1cnJlbnRWYWx1ZS5tYXRjaChtYXN0ZXJjYXJkUmVnZXgpKSB7XG4gICAgICAgICQobG9nb3NPYmopLmFkZENsYXNzKCdpc19tYXN0ZXJjYXJkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKGxvZ29zT2JqKS5yZW1vdmVDbGFzcygnaXNfbWFzdGVyY2FyZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFZhbHVlLm1hdGNoKGFtZXhSZWdleCkpIHtcbiAgICAgICAgJChsb2dvc09iaikuYWRkQ2xhc3MoJ2lzX2FtZXgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQobG9nb3NPYmopLnJlbW92ZUNsYXNzKCdpc19hbWV4Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50VmFsdWUubWF0Y2goZGluZXJzUmVnZXgpKSB7XG4gICAgICAgICQobG9nb3NPYmopLmFkZENsYXNzKCdpc19kaW5lcnMnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQobG9nb3NPYmopLnJlbW92ZUNsYXNzKCdpc19kaW5lcnMnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN1cnJlbnRWYWx1ZS5tYXRjaChkaXNjb3ZlclJlZ2V4KSkge1xuICAgICAgICAkKGxvZ29zT2JqKS5hZGRDbGFzcygnaXNfZGlzY292ZXInKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQobG9nb3NPYmopLnJlbW92ZUNsYXNzKCdpc19kaXNjb3ZlcicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFZhbHVlLm1hdGNoKGpjYlJlZ2V4KSkge1xuICAgICAgICAkKGxvZ29zT2JqKS5hZGRDbGFzcygnaXNfamNiJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKGxvZ29zT2JqKS5yZW1vdmVDbGFzcygnaXNfamNiJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIG5vdGhpbmcgaXMgYSBoaXQgd2UgYWRkIGEgY2xhc3MgdG8gZmFkZSB0aGVtIGFsbCBvdXRcbiAgICAgIGlmIChcbiAgICAgICAgY3VycmVudFZhbHVlICE9ICcnICYmXG4gICAgICAgICFjdXJyZW50VmFsdWUubWF0Y2godmlzYVJlZ2V4KSAmJlxuICAgICAgICAhY3VycmVudFZhbHVlLm1hdGNoKG1hc3RlcmNhcmRSZWdleCkgJiZcbiAgICAgICAgIWN1cnJlbnRWYWx1ZS5tYXRjaChhbWV4UmVnZXgpICYmXG4gICAgICAgICFjdXJyZW50VmFsdWUubWF0Y2goZGluZXJzUmVnZXgpICYmXG4gICAgICAgICFjdXJyZW50VmFsdWUubWF0Y2goZGlzY292ZXJSZWdleCkgJiZcbiAgICAgICAgIWN1cnJlbnRWYWx1ZS5tYXRjaChqY2JSZWdleClcbiAgICAgICkge1xuICAgICAgICAkKGxvZ29zT2JqKS5hZGRDbGFzcygnaXNfbm90aGluZycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChsb2dvc09iaikucmVtb3ZlQ2xhc3MoJ2lzX25vdGhpbmcnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7XG4gIFBheW1lbnQsXG4gIENoZWNrQmFua051bWJlcixcbiAgVG9nZ2xlUmVxdWlyZWRQYXltZW50RmllbGRzLFxuICBUb2dnbGVSZXF1aXJlZEZpZWxkcyxcbiAgaXNOdW1iZXJLZXksXG4gIGtleVByZXNzQ2hlY2ssXG4gIC8vIEdldENhcmRUeXBlLFxuICBDcmVkaXRDYXJkVHlwZURldGVjdG9yLFxufTtcbiIsIi8vIG1vZHVsZSBcIlBldC5qc1wiXG5cbmZ1bmN0aW9uIGNoZWNrRm9yQ29uZGl0aW9ucygpIHtcbiAgJCgnLnBpbGxfX2NvbmRpdGlvbiAuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuY3VycmVudFRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xuXG4gICAgLy8gbWFrZSB0aGUgcmVtb3ZlIGNvbmRpdGlvbiBhY3RpdmUgaW4gdGhlIGRyb3Bkb3duXG4gICAgY29uc3QgYnRuVGV4dCA9IGV2dC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgY29uZGl0aW9uID0gYnRuVGV4dC5zdWJzdHIoMCwgYnRuVGV4dC5sZW5ndGggLSAyKTtcblxuICAgIC8vIGZpbmQgY29uZGl0aW9uIGluIHNlbGVjdCBjb25kaXRpb24tc2VsZWN0XG4gICAgJCgnI2NvbmRpdGlvbi1zZWxlY3Qgb3B0aW9uJylcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkKHRoaXMpLmh0bWwoKSA9PT0gY29uZGl0aW9uO1xuICAgICAgfSlcbiAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblxuICAgIC8vIHJlbW92ZSBmcm9tIHN0b3JhZ2VcbiAgICBsZXQgY29uZGl0aW9ucyA9IFtdO1xuICAgIGNvbmRpdGlvbnMgPSBKU09OLnBhcnNlKCQoJyNwZXQtY29uZGl0aW9ucycpLnZhbCgpKTtcbiAgICBjb25kaXRpb25zID0gY29uZGl0aW9ucy5maWx0ZXIoZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIGUgIT09IGNvbmRpdGlvbjtcbiAgICB9KTtcbiAgICAkKCcjcGV0LWNvbmRpdGlvbnMnKS52YWwoSlNPTi5zdHJpbmdpZnkoY29uZGl0aW9ucykpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gUGV0KCkge1xuICAvLyBjYWNoZSBET01cbiAgY29uc3QgJHByZUV4aXN0aW5nQ29uZGl0aW9uWWVzID0gJCgnI3ByZS1leGlzdGluZy1jb25kaXRpb24teWVzJyk7XG4gIGNvbnN0ICRwcmVFeGlzdGluZ0NvbmRpdGlvbk5vID0gJCgnI3ByZS1leGlzdGluZy1jb25kaXRpb24tbm8nKTtcbiAgY29uc3QgJHBldENvbmRpdGlvbiA9ICQoJyNwZXQtY29uZGl0aW9uJyk7XG4gIGNvbnN0ICRjb25kaXRpb25TZWxlY3QgPSAkKCcjY29uZGl0aW9uLXNlbGVjdCcpO1xuICBjb25zdCAkZG9nVHlwZUJyZWVkID0gJCgnI2RvZy10eXBlLWJyZWVkJyk7XG4gIGNvbnN0ICRjYXRUeXBlQnJlZWQgPSAkKCcjY2F0LXR5cGUtYnJlZWQnKTtcblxuICBjb25zdCAkcGV0VHlwZURvZyA9ICQoJyNwZXQtdHlwZS1kb2cnKTtcbiAgY29uc3QgJHBldFR5cGVDYXQgPSAkKCcjcGV0LXR5cGUtY2F0Jyk7XG4gIGNvbnN0ICRjYXRJbmZvID0gJCgnI2NhdC1pbmZvJyk7XG4gIGNvbnN0ICRkb2dJbmZvID0gJCgnI2RvZy1pbmZvJyk7XG5cbiAgY29uc3QgJGRvZ1R5cGUxID0gJCgnI2RvZy10eXBlLTEnKTtcbiAgY29uc3QgJGRvZ1R5cGUyID0gJCgnI2RvZy10eXBlLTInKTtcblxuICBjb25zdCAkZG9nVHlwZSA9ICQoJyNkb2ctdHlwZScpO1xuXG4gIC8vIGJpbmQgZXZlbnRzXG4gICRwZXRUeXBlRG9nLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRjYXRJbmZvLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGRvZ0luZm8uY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJHBldFR5cGVDYXQuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJGRvZ0luZm8uY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkY2F0SW5mby5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAkcHJlRXhpc3RpbmdDb25kaXRpb25ZZXMuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJHBldENvbmRpdGlvbi5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAkcHJlRXhpc3RpbmdDb25kaXRpb25Oby5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkcGV0Q29uZGl0aW9uLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRjb25kaXRpb25TZWxlY3QuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0ICRzZWxlY3QgPSAkKCcjY29uZGl0aW9uLXNlbGVjdCBvcHRpb246c2VsZWN0ZWQnKTtcblxuICAgIC8vIGlnbm9yZSB0aGUgZmlyc3Qgb3B0aW9uIGluIHRoZSBsaXN0XG4gICAgaWYgKCQoJyNjb25kaXRpb24tc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLmluZGV4KCkgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBkaXNhYmxlZCBzZWxlY3RlZCBjb25kaXRpb25cbiAgICAkc2VsZWN0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cbiAgICAvLyBjcmVhdGUgYSBwaWxsXG4gICAgLy8gYXBwZW5kIHBpbGwgdG8gY29uZGl0aW9uIGxpc3RcbiAgICAkKCcuY29uZGl0aW9ucycpLmFwcGVuZChgPGRpdiBjbGFzcz1cInBpbGxfX2NvbmRpdGlvblwiPiR7JHNlbGVjdC50ZXh0KCl9IDxzcGFuIGNsYXNzPVwiY2xvc2VcIj54PC9zcGFuPjwvZGl2PmApO1xuXG4gICAgLy8ga2VlcCBhIHJlY29yZCBpbiB0aGUgbWFpbiBzdG9yZVxuICAgIGxldCBjb25kaXRpb25zQXJyYXkgPSBbXTtcbiAgICBjb25zdCAkY29uZGl0aW9ucyA9ICQoJyNwZXQtY29uZGl0aW9ucycpO1xuICAgIGlmICgkY29uZGl0aW9ucyAhPT0gbnVsbCAmJiAkY29uZGl0aW9ucy52YWwoKSAhPT0gJ1tdJyAmJiAkY29uZGl0aW9ucy52YWwoKSAhPT0gJycpIHtcbiAgICAgIGNvbmRpdGlvbnNBcnJheSA9IEpTT04ucGFyc2UoJGNvbmRpdGlvbnMudmFsKCkpO1xuICAgIH1cbiAgICBjb25kaXRpb25zQXJyYXkucHVzaCgkc2VsZWN0LnRleHQoKSk7XG4gICAgJCgnI3BldC1jb25kaXRpb25zJykudmFsKEpTT04uc3RyaW5naWZ5KGNvbmRpdGlvbnNBcnJheSkpO1xuXG4gICAgY2hlY2tGb3JDb25kaXRpb25zKCk7XG4gIH0pO1xuXG4gIC8vIHNlbGVjdCB0aGUgcmFkaW8gYnV0dG9uIHdoZW4gc2VsZWN0IGVsZW1lbnQgY2xpY2tlZFxuICAkZG9nVHlwZUJyZWVkLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICQodGhpcy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gIH0pO1xuXG4gIC8vIHNlbGVjdCB0aGUgcmFkaW8gYnV0dG9uIHdoZW4gc2VsZWN0IGVsZW1lbnQgY2xpY2tlZFxuICAkY2F0VHlwZUJyZWVkLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICQodGhpcy5wYXJlbnROb2RlLnBhcmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gIH0pO1xuXG4gICRkb2dUeXBlMS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkZG9nVHlwZS5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAkZG9nVHlwZTIuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJGRvZ1R5cGUuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJGRvZ1R5cGVCcmVlZC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkZG9nVHlwZS5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gVG9nZ2xlUmVxdWlyZWRQZXRGaWVsZHMoKSB7XG4gIC8vIGlmIHBldCB0eXBlIHNlbGVjdGVkXG4gIC8vIHRoZW4gY2hlY2sgZm9yXG4gICQoJ2lucHV0W25hbWU9XCJwZXQtdHlwZVwiXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKCcjcGV0LXR5cGUtZG9nOmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBhY3RpdmF0ZSB0aGUgZG9nIHBldCB0eXBlIGZpZWxkcyBhc3Njb2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICQoJyN0ZXJtc0FncmVlbWVudCcpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiZG9nLXR5cGVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuXG4gICAgICAvLyBkZWFjdGl2YXRlIHRoZSBwZXQgdHlwZSBmaWVsZHMgTk9UIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnaW5wdXRbbmFtZT1cImNhdC10eXBlXCJdJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKCQoJyNwZXQtdHlwZS1jYXQ6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGFjdGl2YXRlIHRoZSBjYXQgcGV0IHR5cGUgZmllbGRzIGFzc2NvaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnaW5wdXRbbmFtZT1cImNhdC10eXBlXCJdJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcblxuICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgcGV0IHR5cGUgZmllbGRzIE5PVCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICQoJyN0ZXJtc0FncmVlbWVudCcpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgJCgnaW5wdXRbbmFtZT1cImRvZy10eXBlXCJdJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgfVxuICB9KTtcblxuICAkKCdpbnB1dFtuYW1lPVwiZG9nLXR5cGVcIl0nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAvLyBkb2ctc2l6ZVxuICAgIGlmICgkKCcjZG9nLXR5cGUtMjpjaGVja2VkJykubGVuZ3RoID4gMCB8fCAkKCcjZG9nLXR5cGUtYnJlZWQ6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGFjdGl2YXRlIHRoZSBkb2cgcGV0IHR5cGUgZmllbGRzIGFzc2NvaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnaW5wdXRbbmFtZT1cImRvZy1zaXplXCJdJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmICgkKCcjZG9nLXR5cGUtMTpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgJCgnaW5wdXRbbmFtZT1cImRvZy1zaXplXCJdJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoJCgnI2RvZy10eXBlLTE6Y2hlY2tlZCcpLmxlbmd0aCA+IDAgfHwgJCgnI2RvZy10eXBlLTI6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGFjdGl2YXRlIHRoZSBkb2cgcGV0IHR5cGUgZmllbGRzIGFzc2NvaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnI2RvZy10eXBlLWJyZWVkJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgfVxuICB9KTtcblxuICAkKCdpbnB1dFtuYW1lPVwiY2F0LXR5cGVcIl0nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICBpZiAoJCgnI2NhdC10eXBlLTE6Y2hlY2tlZCcpLmxlbmd0aCA+IDAgfHwgJCgnI2NhdC10eXBlLTI6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGFjdGl2YXRlIHRoZSBjYXQgcGV0IHR5cGUgZmllbGRzIGFzc2NvaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnI2NhdC10eXBlLWJyZWVkJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IHsgUGV0LCBUb2dnbGVSZXF1aXJlZFBldEZpZWxkcyB9O1xuIiwiLy8gbW9kdWxlIFwiVmFsaWRhdGlvbi5qc1wiXG5cbmZ1bmN0aW9uIEFjdGl2YXRlRm9ybVZhbGlkYXRpb24oKSB7XG4gIC8vIEZldGNoIGFsbCB0aGUgZm9ybXMgd2Ugd2FudCB0byBhcHBseSBjdXN0b20gQm9vdHN0cmFwIHZhbGlkYXRpb24gc3R5bGVzIHRvXG4gIGNvbnN0IGZvcm1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmVlZHMtdmFsaWRhdGlvbicpO1xuICAvLyBMb29wIG92ZXIgdGhlbSBhbmQgcHJldmVudCBzdWJtaXNzaW9uXG4gIGNvbnN0IHZhbGlkYXRpb24gPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZm9ybXMsIGZ1bmN0aW9uKGZvcm0pIHtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnc3VibWl0JyxcbiAgICAgIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChmb3JtLmNoZWNrVmFsaWRpdHkoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAvLyBpZiBwZXQgdHlwZSBzZWxlY3RlZCBkbyB2YWxpZGl0eSBjaGVjayBvbiBpdCdzIGNoaWxkcmVuIHdoaWNoIGFmZmVjdCBpdHMgb3V0Y29tZVxuICAgICAgICAgIC8vIGlmIHBldC10eXBlIHNlbGVjdGVkXG4gICAgICAgICAgLy8gIGRvIHZhbGlkaXR5IGNoZWNrIG9uIHRoZSBlbGVtZW50cyBpbiB0aGUgYXNzb2NpYXRlZCBjb2xsYXBzZSBkaXZcblxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IG5leHRQYWdlO1xuXG4gICAgICAgICAgLy8gVGhlcmUgbWF5YmUgbW9yZSB0aGFuIG9uZSBzdWJtaXQgYnV0dG9uIG9uIHRoZSBwYWdlXG4gICAgICAgICAgLy8gc28gdWx0aW1hdGVseSB3ZSB3b3VsZCBsaWtlIHRoZSBuZXh0IGJ1dHRvbiB0byBiZSBhYmxlIHRvIG1vdmUgb250byB0aGUgbmV4dCBwYWdlXG4gICAgICAgICAgaWYgKCQoJ2J1dHRvbltkYXRhLWhyZWZdJykgIT0gbnVsbCkge1xuICAgICAgICAgICAgbmV4dFBhZ2UgPSAkKCdidXR0b25bZGF0YS1ocmVmXScpLmRhdGEoJ2hyZWYnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3JtLmFjdGlvbiA9IG5leHRQYWdlO1xuICAgICAgICAgIGZvcm0uc3VibWl0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCd3YXMtdmFsaWRhdGVkJyk7XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHBvc3RhbCBhZGRyZXNzXG4gICAgICAgIGlmICgkKCcjY3VzdG9tZXItaG91c2UtbnVtYmVyJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICQoJyNjdXN0b21lci1ob3VzZS1udW1iZXInKS52YWwoKSA9PT0gJycgfHxcbiAgICAgICAgICAgICQoJyNjdXN0b21lci1zdHJlZXQnKS52YWwoKSA9PT0gJycgfHxcbiAgICAgICAgICAgICQoJyNjdXN0b21lci10b3duLWNpdHknKS52YWwoKSA9PT0gJydcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgICQoJy53YXMtdmFsaWRhdGVkIC5qcy1pbnZhbGlkLXBvc3RhbC1hZGRyZXNzLmludmFsaWQtZmVlZGJhY2snKS5zaG93KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy53YXMtdmFsaWRhdGVkIC5qcy1pbnZhbGlkLXBvc3RhbC1hZGRyZXNzLmludmFsaWQtZmVlZGJhY2snKS5oaWRlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gaWYgYWxsIDMgcGFydHMgb2YgdGhlIGFkZHJlc3MgYXJlIGNvbXBsZXRlXG4gICAgICAgICAgICAvLyB0aGVuIGhpZGUgdGhlIGludmFsaWQtZmVlZGJhY2tcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgJCgnI2N1c3RvbWVyLWhvdXNlLW51bWJlcicpLnZhbCgpICE9PSAnJyAmJlxuICAgICAgICAgICAgICAkKCcjY3VzdG9tZXItc3RyZWV0JykudmFsKCkgIT09ICcnICYmXG4gICAgICAgICAgICAgICQoJyNjdXN0b21lci10b3duLWNpdHknKS52YWwoKSAhPT0gJydcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAkKCcud2FzLXZhbGlkYXRlZCAuanMtaW52YWxpZC1wb3N0YWwtYWRkcmVzcy5pbnZhbGlkLWZlZWRiYWNrJykuaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCgnLndhcy12YWxpZGF0ZWQgLmpzLWludmFsaWQtcG9zdGFsLWFkZHJlc3MuaW52YWxpZC1mZWVkYmFjaycpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBwYXltZW50c1xuICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdIZWxsbyBSZWd1bGFyIFBheSBjaGVjaycpO1xuICAgICAgICAgIC8vIGlmIGEgcmVndWxhciBwYXltZW50IGlzIG5vdCBzZWxlY3RlZFxuICAgICAgICAgIC8vIHRoZW4gaW5jcmVhc2UgdGhlIGhlaWdodCBvZiB0aGUgZm9ybS1jaGVjayBib3ggdG8gYWxsb3cgZm9yIHRoZSBlcnJvciBtZWVzYWdlIHRvIGJlIHNob3duXG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXTpjaGVja2VkJykubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdOmZpcnN0JylcbiAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAnNzVweCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicGF5bWVudC10eXBlXCJdOmNoZWNrZWQnKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudC10eXBlXCJdOmZpcnN0JylcbiAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAnNzVweCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBwcmUtZXhpc3RpbmcgY29uZGl0aW9uc1xuICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInByZS1leGlzdGluZy1jb25kaXRpb25cIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gaWYgcHJlLWV4aXN0aW5nIGNvbmRpdGlvbiBpcyBub3Qgc2VsZWN0ZWRcbiAgICAgICAgICAvLyB0aGVuIGluY3JlYXNlIHRoZSBoZWlnaHQgb2YgdGhlIGZvcm0tY2hlY2sgYm94IHRvIGFsbG93IGZvciB0aGUgZXJyb3IgbWVlc2FnZSB0byBiZSBzaG93blxuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicHJlLWV4aXN0aW5nLWNvbmRpdGlvblwiXTpjaGVja2VkJykubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInByZS1leGlzdGluZy1jb25kaXRpb25cIl06Zmlyc3QnKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICc4MHB4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIG5ldXRlcmVkXG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwibmV1dGVyZWRcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gaWYgbmV1dGVyZWQgaXMgbm90IHNlbGVjdGVkXG4gICAgICAgICAgLy8gdGhlbiBpbmNyZWFzZSB0aGUgaGVpZ2h0IG9mIHRoZSBmb3JtLWNoZWNrIGJveCB0byBhbGxvdyBmb3IgdGhlIGVycm9yIG1lZXNhZ2UgdG8gYmUgc2hvd25cbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cIm5ldXRlcmVkXCJdOmNoZWNrZWQnKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwibmV1dGVyZWRcIl06Zmlyc3QnKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICc4MHB4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHBldC10eXBlXG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicGV0LXR5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gaWYgcGV0LXR5cGUgaXMgbm90IHNlbGVjdGVkXG4gICAgICAgICAgLy8gdGhlbiBpbmNyZWFzZSB0aGUgaGVpZ2h0IG9mIHRoZSBmb3JtLWNoZWNrIGJveCB0byBhbGxvdyBmb3IgdGhlIGVycm9yIG1lZXNhZ2UgdG8gYmUgc2hvd25cbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdOmNoZWNrZWQnKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGV0LXR5cGVcIl06Zmlyc3QnKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICc4MHB4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHBldCBjb25kaXRpb25zIGluIGEgaGlkZGVuIHZhbHVlXG4gICAgICAgIGlmICgkKCcjcGV0LWNvbmRpdGlvbnMnKSAhPT0gbnVsbCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCQoJyNwZXQtY29uZGl0aW9ucycpLnZhbCgpKTtcbiAgICAgICAgICBpZiAoJCgnI3BldC1jb25kaXRpb25zJykudmFsKCkgIT09ICdbXScpIHtcbiAgICAgICAgICAgICQoJyNjb25kaXRpb24tc2VsZWN0JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAkKCcjY29uZGl0aW9uLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdib3JkZXItZGFuZ2VyJyk7XG4gICAgICAgICAgICAkKCcjY29uZGl0aW9uLXNlbGVjdCcpLmFkZENsYXNzKCdib3JkZXItc3VjY2VzcycpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcjY29uZGl0aW9uLXNlbGVjdCcpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAkKCcjY29uZGl0aW9uLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdib3JkZXItc3VjY2VzcycpO1xuICAgICAgICAgICAgJCgnI2NvbmRpdGlvbi1zZWxlY3QnKS5hZGRDbGFzcygnYm9yZGVyLWRhbmdlcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEFjdGl2YXRlRm9ybVZhbGlkYXRpb24gfTtcbiIsIi8vIG1vZHVsZSBcIldoaXRlTGFiZWxsaW5nLmpzXCJcblxuLy8gcG9zdGNvZGVzXG5cbmxldCBodHRwUmVxdWVzdDtcblxuZnVuY3Rpb24gV2hpdGVMYWJlbGxpbmcodGhlbWUgPSAnVG93ZXJnYXRlJykge1xuICAvLyBpZiAodGhlbWUgPT09ICdIZWFsdGh5IFBldHMnKSB7XG4gIC8vICAgLy8gbWFpbiBjb2xvdXJzXG4gIC8vICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnktY29sb3VyJywgJ29yYW5nZScpO1xuXG4gIC8vICAgLy8gbWFpbiBib2R5IGFuZCBwYW5lbCBiYWNrZ3JvdW5kc1xuICAvLyAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYW5lbC1iZy1jb2xvdXInLCAnb3JhbmdlJyk7XG4gIC8vICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWJvZHktYmctY29sb3VyJywgJ29yYW5nZScpO1xuXG4gIC8vICAgLy8gbWVudSBiYWNrZ3JvdW5kIGNvbG91clxuICAvLyAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1tZW51LWJnLWNvbG91cicsICdvcmFuZ2UnKTtcbiAgLy8gICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc3ViLW1lbnUtYmctY29sb3VyJywgJ29yYW5nZScpO1xuXG4gIC8vICAgLy8gcG9saWN5IGNvbG91cnNcbiAgLy8gICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tbGlmZXRpbWUtY29sb3VyJywgJ29yYW5nZScpO1xuICAvLyAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1tYXhpbXVtLWNvbG91cicsICdvcmFuZ2UnKTtcbiAgLy8gICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tYWNjaWRlbnQtY29sb3VyJywgJ29yYW5nZScpO1xuXG4gIC8vICAgLy8gZm9ybSBjb2xvdXJzXG4gIC8vICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWZvcm0tbGFiZWwtY29sb3VyJywgJ29yYW5nZScpO1xuICAvLyAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jdGEtY29sb3VyJywgJ29yYW5nZScpO1xuICAvLyAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1pbnB1dC1iZy1jb2xvdXInLCAnb3JhbmdlJyk7XG4gIC8vIH1cbiAgbWFrZVJlcXVlc3QoJ3RoZW1lLmpzb24nKTtcbn1cblxuZnVuY3Rpb24gbWFrZVJlcXVlc3QoZmlsZSkge1xuICBodHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIGlmICghaHR0cFJlcXVlc3QpIHtcbiAgICBjb25zb2xlLndhcm4oJ0dpdmluZyB1cCA6KCBDYW5ub3QgY3JlYXRlIGFuIFhNTEhUVFAgaW5zdGFuY2UnKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBodHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBwcm9jZXNzQ29udGVudHM7XG4gIGh0dHBSZXF1ZXN0Lm9wZW4oJ0dFVCcsIGAvY29uZmlnLyR7ZmlsZX1gKTtcbiAgaHR0cFJlcXVlc3Quc2VuZCgpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzQ29udGVudHMoKSB7XG4gIGlmIChodHRwUmVxdWVzdC5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XG4gICAgaWYgKGh0dHBSZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAvLyBwYXJzZSB0aGUganNvbiBmaWxlXG4gICAgICBjb25zdCBjb25maWcgPSBKU09OLnBhcnNlKGh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgIC8vIGxvYWQgdGhlbWVcbiAgICAgIHN3aXRjaCAoY29uZmlnLmNvbW1hbmQpIHtcbiAgICAgIGNhc2UgJ2xvYWQnOlxuICAgICAgICBtYWtlUmVxdWVzdChgL3RoZW1lcy8ke2NvbmZpZy50aGVtZX1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhY3RpdmF0ZSc6XG4gICAgICAgIGxvYWRUaGVtZShjb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignVGhlcmUgd2FzIGEgcHJvYmxlbSB3aXRoIHRoZSByZXF1ZXN0LicpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBsb2FkVGhlbWUodGhlbWUpIHtcbiAgLy8gY29uc29sZS5sb2codGhlbWUpO1xuICAvLyBjaGFuZ2UgY3NzIGluZm9cbiAgLy8gZm9yIChjb25zdCBzdHlsZSBpbiB0aGVtZS5jb2xvdXJzKSB7XG4gIC8vICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHN0eWxlLCB0aGVtZS5jb2xvdXJzW3N0eWxlXSk7XG4gIC8vIH1cblxuICBjb25zdCBjc3NJZCA9ICdteUNzcyc7IC8vIHlvdSBjb3VsZCBlbmNvZGUgdGhlIGNzcyBwYXRoIGl0c2VsZiB0byBnZW5lcmF0ZSBpZC4uXG4gIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpKSB7XG4gICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICBsaW5rLmlkID0gY3NzSWQ7XG4gICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICBsaW5rLmhyZWYgPSB0aGVtZS5jc3M7XG4gICAgbGluay5tZWRpYSA9ICdhbGwnO1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gIH1cblxuICAvLyBjaGFuZ2UgaW1hZ2UgaW5mb1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9nb19fbW9iaWxlJykuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCB0aGVtZS5pbWFnZXNbJ2xvZ28tbW9iaWxlJ10pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9nb19fZGVza3RvcCcpLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgdGhlbWUuaW1hZ2VzWydsb2dvLWRlc2t0b3AnXSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dvIGltZycpLnNldEF0dHJpYnV0ZSgnc3JjJywgdGhlbWUuaW1hZ2VzWydsb2dvLW1vYmlsZSddKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ28gaW1nJykuc2V0QXR0cmlidXRlKCdhbHQnLCBgJHt0aGVtZS5uYW1lfSBsb2dvYCk7XG59XG5cbmV4cG9ydCB7IFdoaXRlTGFiZWxsaW5nIH07XG4iLCIvLyBpbXBvcnQgeyBsb2cgfSBmcm9tICcuL2NvbXBvbmVudHMvVXRpbHMnO1xuXG5pbXBvcnQgeyBDdXN0b21TZWxlY3QgfSBmcm9tICcuL2NvbXBvbmVudHMvQ3VzdG9tU2VsZWN0JztcbmltcG9ydCB7IEFkZHJlc3MgfSBmcm9tICcuL2NvbXBvbmVudHMvQWRkcmVzcyc7XG5pbXBvcnQgeyBTZXREYXRlLCBBZGRUb2RheXNEYXRlIH0gZnJvbSAnLi9jb21wb25lbnRzL0RhdGVQaWNrZXInO1xuaW1wb3J0IHsgUGV0LCBUb2dnbGVSZXF1aXJlZFBldEZpZWxkcyB9IGZyb20gJy4vY29tcG9uZW50cy9QZXQnO1xuaW1wb3J0IHsgQ292ZXJUeXBlcyB9IGZyb20gJy4vY29tcG9uZW50cy9Db3ZlclR5cGVzJztcbmltcG9ydCB7IEFjdGl2YXRlRm9ybVZhbGlkYXRpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvVmFsaWRhdGlvbic7XG5pbXBvcnQge1xuICBQYXltZW50LFxuICBDaGVja0JhbmtOdW1iZXIsXG4gIFRvZ2dsZVJlcXVpcmVkUGF5bWVudEZpZWxkcyxcbiAgVG9nZ2xlUmVxdWlyZWRGaWVsZHMsXG4gIGtleVByZXNzQ2hlY2ssXG4gIENyZWRpdENhcmRUeXBlRGV0ZWN0b3IsXG59IGZyb20gJy4vY29tcG9uZW50cy9QYXltZW50JztcbmltcG9ydCB7IFdoaXRlTGFiZWxsaW5nIH0gZnJvbSAnLi9jb21wb25lbnRzL1doaXRlTGFiZWxsaW5nJztcblxuLy8gVXRpbHMoKTtcbi8vIHdpbmRvdy5sb2cgPSBsb2c7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIEN1c3RvbVNlbGVjdCgpO1xuICBBZGRyZXNzKCk7XG4gIFBldCgpO1xuICBDb3ZlclR5cGVzKCk7XG4gIFBheW1lbnQoKTtcbiAgV2hpdGVMYWJlbGxpbmcoJ1Rvd2VyZ2F0ZScpO1xuICBBZGRUb2RheXNEYXRlKCk7XG5cbiAgLy8gY2hlY2sgc29ydCBjb2RlIGFuZCBhY2NvdW50IG51bWJlclxuICBBY3RpdmF0ZUZvcm1WYWxpZGF0aW9uKCk7XG5cbiAgaWYgKCQoJy5mb3JtLWdyb3VwLS1zb3J0Y29kZScpLmxlbmd0aCA+IDApIHtcbiAgICBDaGVja0JhbmtOdW1iZXIoJy5mb3JtLWdyb3VwLS1zb3J0Y29kZSBpbnB1dCcsICcjYWNjb3VudC1udW1iZXInKTtcbiAgfVxuXG4gIC8vIGxpbWl0IHRoZSBudW1iZXIgbGVuZ3RoIGZvciBiYW5rIGRldGFpbHNcbiAgaWYgKCQoJy5mb3JtLWdyb3VwLS1hY2NvdW50LW51bWJlciBpbnB1dCcpLmxlbmd0aCA+IDApIHtcbiAgICBrZXlQcmVzc0NoZWNrKCQoJy5mb3JtLWdyb3VwLS1hY2NvdW50LW51bWJlciBpbnB1dCcpLCAxNik7XG4gIH1cbiAgaWYgKCQoJy5mb3JtLWNvbnRyb2wtLWNjdicpLmxlbmd0aCA+IDApIHtcbiAgICBrZXlQcmVzc0NoZWNrKCQoJy5mb3JtLWNvbnRyb2wtLWNjdicpLCAzKTtcbiAgfVxuXG4gIGNvbnN0IG1heERhdGUgPSBTZXREYXRlKCk7XG4gICQoJ2lucHV0W3R5cGU9ZGF0ZV0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykuYXR0cignbWF4JywgbWF4RGF0ZSk7XG4gIH0pO1xuXG4gICQoJyNleHBpcnktZGF0ZScpLnJlbW92ZUF0dHIoJ21heCcpO1xuXG4gIENyZWRpdENhcmRUeXBlRGV0ZWN0b3IoeyBjcmVkaXRfY2FyZF9sb2dvczogJy5jYXJkX2xvZ29zJywgZWxtOiAnI2NhcmQtbnVtYmVyJyB9KTtcblxuICBUb2dnbGVSZXF1aXJlZFBheW1lbnRGaWVsZHMoKTtcbiAgVG9nZ2xlUmVxdWlyZWRQZXRGaWVsZHMoKTtcbiAgVG9nZ2xlUmVxdWlyZWRGaWVsZHMoKTtcbn1cblxucmVhZHkoaW5pdCk7XG5cbmZ1bmN0aW9uIHJlYWR5KGZuKSB7XG4gIGlmIChkb2N1bWVudC5hdHRhY2hFdmVudCA/IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScgOiBkb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycpIHtcbiAgICBmbigpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbik7XG4gIH1cbn1cbiJdfQ==
