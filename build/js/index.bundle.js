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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// module 'DatePicker.js'

// postcodes
function DatePicker() {
  // cache DOM

  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();

  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  var maxDate = year + "-" + month + "-" + day;
  return maxDate;
}

exports.DatePicker = DatePicker;

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

exports.Payment = Payment;
exports.CheckBankNumber = CheckBankNumber;
exports.ToggleRequiredPaymentFields = ToggleRequiredPaymentFields;
exports.ToggleRequiredFields = ToggleRequiredFields;

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

  if (theme === 'Healthy Pets') {
    // main colours
    document.documentElement.style.setProperty('--primary-colour', 'orange');

    // main body and panel backgrounds
    document.documentElement.style.setProperty('--panel-bg-colour', 'orange');
    document.documentElement.style.setProperty('--body-bg-colour', 'orange');

    // menu background colour
    document.documentElement.style.setProperty('--menu-bg-colour', 'orange');
    document.documentElement.style.setProperty('--sub-menu-bg-colour', 'orange');

    // policy colours
    document.documentElement.style.setProperty('--lifetime-colour', 'orange');
    document.documentElement.style.setProperty('--maximum-colour', 'orange');
    document.documentElement.style.setProperty('--accident-colour', 'orange');

    // form colours
    document.documentElement.style.setProperty('--form-label-colour', 'orange');
    document.documentElement.style.setProperty('--cta-colour', 'orange');
    document.documentElement.style.setProperty('--input-bg-colour', 'orange');
  }
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
  for (var style in theme.colours) {
    document.documentElement.style.setProperty(style, theme.colours[style]);
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
  (0, _Address.Address)();

  // check sort code and account number
  (0, _Validation.ActivateFormValidation)();

  if ($('.form-group--sortcode').length > 0) {
    (0, _Payment.CheckBankNumber)('.form-group--sortcode input', '#account-number');
  }

  if ($('.form-group--account-number').length > 0) {
    (0, _Payment.CheckBankNumber)('.form-group--account-number input', '#expiry-date');
  }

  var maxDate = (0, _DatePicker.DatePicker)();
  $('input[type=date]').each(function () {
    $(this).attr('max', maxDate);
  });

  (0, _Payment.ToggleRequiredPaymentFields)();
  (0, _Pet.ToggleRequiredPetFields)();
  (0, _Payment.ToggleRequiredFields)();
})();

},{"./components/Address":1,"./components/CoverTypes":2,"./components/CustomSelect":3,"./components/DatePicker":4,"./components/Payment":5,"./components/Pet":6,"./components/Validation":7,"./components/WhiteLabelling":8}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0FkZHJlc3MuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0NvdmVyVHlwZXMuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0N1c3RvbVNlbGVjdC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvRGF0ZVBpY2tlci5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGF5bWVudC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvUGV0LmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9WYWxpZGF0aW9uLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9XaGl0ZUxhYmVsbGluZy5qcyIsInNyYy9zY3JpcHRzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQTs7QUFFQTtBQUNBLFNBQVMsT0FBVCxHQUFtQjtBQUNqQjtBQUNBLE1BQU0sa0JBQWtCLEVBQUUsMkJBQUYsQ0FBeEI7QUFDQSxNQUFNLG9CQUFvQixFQUFFLHVCQUFGLENBQTFCO0FBQ0EsTUFBTSxlQUFlLEVBQUUsZ0JBQUYsQ0FBckI7O0FBRUEsTUFBTSxrQkFBa0IsRUFBRSwyQkFBRixDQUF4QjtBQUNBLE1BQU0saUJBQWlCLEVBQUUsMEJBQUYsQ0FBdkI7QUFDQSxNQUFNLFdBQVcsRUFBRSxtQkFBRixDQUFqQjs7QUFFQTtBQUNBLGtCQUFnQixLQUFoQixDQUFzQixVQUFTLEdBQVQsRUFBYztBQUNsQyxRQUFJLGNBQUo7QUFDQSxvQkFBZ0IsUUFBaEIsQ0FBeUIsUUFBekI7QUFDQSxtQkFBZSxRQUFmLENBQXdCLE1BQXhCO0FBQ0EsYUFBUyxRQUFULENBQWtCLE1BQWxCO0FBQ0QsR0FMRDs7QUFPQSxvQkFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBUyxHQUFULEVBQWM7QUFDMUMsUUFBSSxjQUFKO0FBQ0EsYUFBUyxR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OztBQUVBO0FBQ0E7O0FBRUEsTUFBSSxFQUFFLHVCQUFGLEVBQTJCLE1BQTNCLEdBQW9DLENBQXhDLEVBQTJDO0FBQ3pDLGtDQUFnQiw2QkFBaEIsRUFBK0MsaUJBQS9DO0FBQ0Q7O0FBRUQsTUFBSSxFQUFFLDZCQUFGLEVBQWlDLE1BQWpDLEdBQTBDLENBQTlDLEVBQWlEO0FBQy9DLGtDQUFnQixtQ0FBaEIsRUFBcUQsY0FBckQ7QUFDRDs7QUFFRCxNQUFNLFVBQVUsNkJBQWhCO0FBQ0EsSUFBRSxrQkFBRixFQUFzQixJQUF0QixDQUEyQixZQUFXO0FBQ3BDLE1BQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxLQUFiLEVBQW9CLE9BQXBCO0FBQ0QsR0FGRDs7QUFJQTtBQUNBO0FBQ0E7QUFDRCxDQTVCRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIG1vZHVsZSAnQWRkcmVzcy5qcydcblxuLy8gcG9zdGNvZGVzXG5mdW5jdGlvbiBBZGRyZXNzKCkge1xuICAvLyBjYWNoZSBET01cbiAgY29uc3QgJHBvc3Rjb2RlU2VhcmNoID0gJCgnI2N1c3RvbWVyLXBvc3Rjb2RlLXNlYXJjaCcpO1xuICBjb25zdCAkYWRkcmVzc1Bvc3Rjb2RlcyA9ICQoJy5hZGRyZXNzX19wb3N0Y29kZXMgYScpO1xuICBjb25zdCAkYWRkcmVzc0xpbmsgPSAkKCcuYWRkcmVzc19fbGluaycpO1xuXG4gIGNvbnN0ICRwb3N0Y29kZVJlc3VsdCA9ICQoJyNjdXN0b21lci1wb3N0Y29kZS1yZXN1bHQnKTtcbiAgY29uc3QgJG1hbnVhbEFkZHJlc3MgPSAkKCcjY3VzdG9tZXItbWFudWFsLWFkZHJlc3MnKTtcbiAgY29uc3QgJGFkZHJlc3MgPSAkKCcjY3VzdG9tZXItYWRkcmVzcycpO1xuXG4gIC8vIGJpbmQgZXZlbnRzXG4gICRwb3N0Y29kZVNlYXJjaC5jbGljayhmdW5jdGlvbihldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ3RvZ2dsZScpO1xuICAgICRtYW51YWxBZGRyZXNzLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJGFkZHJlc3NQb3N0Y29kZXMub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkYWRkcmVzc0xpbmsub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJGFkZHJlc3MuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcG9zdGNvZGVSZXN1bHQuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWFudWFsQWRkcmVzcy5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQWRkcmVzcyB9O1xuIiwiLy8gbW9kdWxlIFwiQ292ZXJUeXBlcy5qc1wiXG5cbmZ1bmN0aW9uIENvdmVyVHlwZXMoKSB7XG4gIC8vIGNhY2hlIERPTVxuICBjb25zdCAkbGlmZXRpbWVMaW5rID0gJCgnI2xpZmV0aW1lLWxpbmsnKTtcbiAgY29uc3QgJG1heGltdW1MaW5rID0gJCgnI21heGltdW0tbGluaycpO1xuICBjb25zdCAkYWNjaWRlbnRMaW5rID0gJCgnI2FjY2lkZW50LWxpbmsnKTtcbiAgY29uc3QgJGJ0bkNvdmVyTGV2ZWwgPSAkKCcuYnRuLS1jb3Zlci1sZXZlbCcpO1xuXG4gIGNvbnN0ICRsaWZldGltZUNvdmVyID0gJCgnI2xpZmV0aW1lLWNvdmVyJyk7XG4gIGNvbnN0ICRtYXhpbXVtQ292ZXIgPSAkKCcjbWF4aW11bS1jb3ZlcicpO1xuICBjb25zdCAkYWNjaWRlbnRDb3ZlciA9ICQoJyNhY2NpZGVudC1jb3ZlcicpO1xuXG4gICRsaWZldGltZUxpbmsuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJG1heGltdW1MaW5rLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRsaWZldGltZUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJG1heGltdW1Db3Zlci5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRhY2NpZGVudENvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRhY2NpZGVudExpbmsuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJGxpZmV0aW1lQ292ZXIuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkbWF4aW11bUNvdmVyLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgJGFjY2lkZW50Q292ZXIuY29sbGFwc2UoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gYmluZCBFdmVudHNcblxuICAvLyBzdG9wIHdlYiBwYWdlIGZyb20gc2Nyb2xsaW5nIHRvIHRvcCB3aGVuIGxpbmsgaXMgY2xpY2tlZCB0aGF0IHRyaWdnZXJzIEphdmFTY3JpcHRcbiAgJGJ0bkNvdmVyTGV2ZWwuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyB0YXJnZXQgaWRcbiAgICBjb25zdCB0YXJnZXRJZCA9ICQodGhpcykuZGF0YSgndGFyZ2V0Jyk7XG4gICAgY29uc3QgdGFyZ2V0SGVpZ2h0ID0gJCh0YXJnZXRJZCkuaGVpZ2h0KCkgLSAxMDA7XG4gICAgLy8gbGV0IGRvY3VtZW50SGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KCk7XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRhcmdldEhlaWdodCB9KTtcblxuICAgIGlmICh0aGlzLmlubmVySFRNTCA9PT0gJ0Nob29zZSBsZXZlbCcpIHtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gJ0hpZGUgbGV2ZWxzJztcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdidG4tLW91dGxpbmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbm5lckhUTUwgPSAnQ2hvb3NlIGxldmVsJztcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2J0bi0tb3V0bGluZScpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKTtcbiAgICB9XG5cbiAgICAvLyBnZXQgZGF0YSB0YXJnZXRcbiAgICAvLyBzcGxpdCBvbiBcIi1cIlxuICAgIGNvbnN0IHRhcmdldEFycmF5ID0gJCh0aGlzKVxuICAgICAgLmRhdGEoJ3RhcmdldCcpXG4gICAgICAuc3BsaXQoJy0nKTtcbiAgICBjb25zb2xlLmxvZygndGFyZ2V0OiAnLCB0YXJnZXRBcnJheVsxXSk7XG4gICAgLy8gY292ZXIgPSBnZXQgMm5kIGVsZW1lbnRcbiAgICAvLyBmaW5kIGlkIFwie2NvdmVyfS1jb3ZlclwiXG4gICAgLy8gcmVtb3ZlIGZyb20gY2xhc3NsaXN0IFwic2hvd1wiXG4gICAgLy8gJChgJHt0YXJnZXRBcnJheVsxXX0tY292ZXJgKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQ292ZXJUeXBlcyB9O1xuIiwiLy8gbW9kdWxlIFwiQ3VzdG9tU2VsZWN0LmpzXCJcblxuZnVuY3Rpb24gY2xvc2VBbGxTZWxlY3QoZWxtbnQpIHtcbiAgLyogYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2xvc2UgYWxsIHNlbGVjdCBib3hlcyBpbiB0aGUgZG9jdW1lbnQsXG4gIGV4Y2VwdCB0aGUgY3VycmVudCBzZWxlY3QgYm94OiAqL1xuXG4gIGNvbnN0IGFyck5vID0gW107XG4gIGNvbnN0IHggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3QtaXRlbXMnKTtcbiAgY29uc3QgeSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGVjdC1zZWxlY3RlZCcpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoZWxtbnQgPT0geVtpXSkge1xuICAgICAgYXJyTm8ucHVzaChpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QtYXJyb3ctYWN0aXZlJyk7XG4gICAgfVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChhcnJOby5pbmRleE9mKGkpKSB7XG4gICAgICB4W2ldLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdC1oaWRlJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlT3RoZXJPcHRpb25zKGUpIHtcbiAgLyogd2hlbiB0aGUgc2VsZWN0IGJveCBpcyBjbGlja2VkLCBjbG9zZSBhbnkgb3RoZXIgc2VsZWN0IGJveGVzLFxuICBhbmQgb3Blbi9jbG9zZSB0aGUgY3VycmVudCBzZWxlY3QgYm94OiAqL1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBjbG9zZUFsbFNlbGVjdCh0aGlzKTtcbiAgdGhpcy5uZXh0U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3QtaGlkZScpO1xuICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdC1hcnJvdy1hY3RpdmUnKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tGb3JDb25kaXRpb25zKCkge1xuICAkKCcucGlsbF9fY29uZGl0aW9uIC5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBDdXN0b21TZWxlY3QoKSB7XG4gIGxldCBzZWxlY3RlZEl0ZW07XG4gIGxldCBvcHRpb25MaXN0O1xuICBsZXQgb3B0aW9uSXRlbTtcblxuICAvLyBjYWNoZSBET01cbiAgLyogbG9vayBmb3IgYW55IGVsZW1lbnRzIHdpdGggdGhlIGNsYXNzIFwic2VsZWN0LS1hbHRcIjogKi9cbiAgY29uc3Qgc2VsZWN0QWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2VsZWN0LS1hbHQnKTtcblxuICAvLyBiaW5kIEV2ZW50c1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdEFsdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHNlbEVsZW1lbnQgPSBzZWxlY3RBbHRbaV0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NlbGVjdCcpWzBdO1xuXG4gICAgLyogZm9yIGVhY2ggZWxlbWVudCwgY3JlYXRlIGEgbmV3IERJViB0aGF0IHdpbGwgYWN0IGFzIHRoZSBzZWxlY3RlZCBpdGVtOiAqL1xuICAgIHNlbGVjdGVkSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIHNlbGVjdGVkSXRlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NlbGVjdC1zZWxlY3RlZCcpO1xuICAgIHNlbGVjdGVkSXRlbS5pbm5lckhUTUwgPSBzZWxFbGVtZW50Lm9wdGlvbnNbc2VsRWxlbWVudC5zZWxlY3RlZEluZGV4XS5pbm5lckhUTUw7XG5cbiAgICBzZWxlY3RBbHRbaV0uYXBwZW5kQ2hpbGQoc2VsZWN0ZWRJdGVtKTtcblxuICAgIC8qIGZvciBlYWNoIGVsZW1lbnQsIGNyZWF0ZSBhIG5ldyBESVYgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIG9wdGlvbiBsaXN0OiAqL1xuICAgIG9wdGlvbkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBvcHRpb25MaXN0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2VsZWN0LWl0ZW1zIHNlbGVjdC1oaWRlJyk7XG5cbiAgICBmb3IgKGxldCBqID0gMTsgaiA8IHNlbEVsZW1lbnQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIC8qIGZvciBlYWNoIG9wdGlvbiBpbiB0aGUgb3JpZ2luYWwgc2VsZWN0IGVsZW1lbnQsXG4gICAgICBjcmVhdGUgYSBuZXcgRElWIHRoYXQgd2lsbCBhY3QgYXMgYW4gb3B0aW9uIGl0ZW06ICovXG4gICAgICBvcHRpb25JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICBvcHRpb25JdGVtLmlubmVySFRNTCA9IHNlbEVsZW1lbnQub3B0aW9uc1tqXS5pbm5lckhUTUw7XG4gICAgICBvcHRpb25JdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3luY09wdGlvblNlbGVjdGVkKTtcblxuICAgICAgb3B0aW9uTGlzdC5hcHBlbmRDaGlsZChvcHRpb25JdGVtKTtcbiAgICB9XG5cbiAgICBzZWxlY3RBbHRbaV0uYXBwZW5kQ2hpbGQob3B0aW9uTGlzdCk7XG5cbiAgICBzZWxlY3RlZEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU90aGVyT3B0aW9ucyk7XG4gIH1cblxuICAvLyBtZXRob2RzXG4gIGZ1bmN0aW9uIHN5bmNPcHRpb25TZWxlY3RlZCgpIHtcbiAgICAvKiB3aGVuIGFuIGl0ZW0gaXMgY2xpY2tlZCwgdXBkYXRlIHRoZSBvcmlnaW5hbCBzZWxlY3QgYm94LFxuICAgIGFuZCB0aGUgc2VsZWN0ZWQgaXRlbTogKi9cbiAgICBjb25zdCBvcmlnaW5hbFNlbGVjdCA9IHRoaXMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzZWxlY3QnKVswXTtcblxuICAgIC8vIHN0b3JlIHRoZSBzZWxlY3RlZCBpdGVtXG4gICAgY29uc3QgaCA9IHRoaXMucGFyZW50Tm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmlnaW5hbFNlbGVjdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKG9yaWdpbmFsU2VsZWN0Lm9wdGlvbnNbaV0uaW5uZXJIVE1MID09PSB0aGlzLmlubmVySFRNTCkge1xuICAgICAgICBvcmlnaW5hbFNlbGVjdC5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgaC5pbm5lckhUTUwgPSB0aGlzLmlubmVySFRNTDtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzYW1lLWFzLXNlbGVjdGVkJyk7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgeS5sZW5ndGg7IGsgKz0gMSkge1xuICAgICAgICAgIHlba10ucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzYW1lLWFzLXNlbGVjdGVkJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBoLmNsaWNrKCk7XG4gICAgaWYgKG9yaWdpbmFsU2VsZWN0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PT0gJ2NvbmRpdGlvbi1zZWxlY3QnKSB7XG4gICAgICAkKCcuY29uZGl0aW9ucycpLmFwcGVuZChgPGRpdiBjbGFzcz0ncGlsbF9fY29uZGl0aW9uJz4ke2guaW5uZXJIVE1MfSA8c3BhbiBjbGFzcz0nY2xvc2UnPng8L3NwYW4+PC9kaXY+YCk7XG4gICAgICBjaGVja0ZvckNvbmRpdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICAvKiBpZiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgb3V0c2lkZSB0aGUgc2VsZWN0IGJveCxcbiAgdGhlbiBjbG9zZSBhbGwgc2VsZWN0IGJveGVzOiAqL1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlQWxsU2VsZWN0KTtcbn1cblxuZXhwb3J0IHsgQ3VzdG9tU2VsZWN0IH07XG4iLCIvLyBtb2R1bGUgJ0RhdGVQaWNrZXIuanMnXG5cbi8vIHBvc3Rjb2Rlc1xuZnVuY3Rpb24gRGF0ZVBpY2tlcigpIHtcbiAgLy8gY2FjaGUgRE9NXG5cbiAgY29uc3QgZHRUb2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgbGV0IG1vbnRoID0gZHRUb2RheS5nZXRNb250aCgpICsgMTtcbiAgbGV0IGRheSA9IGR0VG9kYXkuZ2V0RGF0ZSgpO1xuICBjb25zdCB5ZWFyID0gZHRUb2RheS5nZXRGdWxsWWVhcigpO1xuXG4gIGlmIChtb250aCA8IDEwKSBtb250aCA9IGAwJHttb250aC50b1N0cmluZygpfWA7XG4gIGlmIChkYXkgPCAxMCkgZGF5ID0gYDAke2RheS50b1N0cmluZygpfWA7XG5cbiAgY29uc3QgbWF4RGF0ZSA9IGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWA7XG4gIHJldHVybiBtYXhEYXRlO1xufVxuXG5leHBvcnQgeyBEYXRlUGlja2VyIH07XG4iLCIvLyBtb2R1bGUgXCJQYXltZW50LmpzXCJcblxuZnVuY3Rpb24gUGF5bWVudCgpIHtcbiAgLy8gY2FjaGUgRE9NXG4gIGNvbnN0ICRyZWd1bGFyUGF5TW9udGhseSA9ICQoJyNyZWd1bGFyLXBheS1tb250aGx5Jyk7XG4gIGNvbnN0ICRyZWd1bGFyUGF5QW5udWFsbHkgPSAkKCcjcmVndWxhci1wYXktYW5udWFsbHknKTtcbiAgY29uc3QgJHBheW1lbnRUeXBlRGViaXQgPSAkKCcjcGF5bWVudC10eXBlLWRlYml0Jyk7XG4gIGNvbnN0ICRwYXltZW50VHlwZUNyZWRpdCA9ICQoJyNwYXltZW50LXR5cGUtY3JlZGl0Jyk7XG5cbiAgY29uc3QgJGRpcmVjdERlYml0RGV0YWlscyA9ICQoJyNkaXJlY3QtZGViaXQtZGV0YWlscycpO1xuICBjb25zdCAkcGF5bWVudFR5cGUgPSAkKCcjcGF5bWVudC10eXBlJyk7XG4gIGNvbnN0ICRjcmVkaXRDYXJkRGV0YWlscyA9ICQoJyNjcmVkaXQtY2FyZC1kZXRhaWxzJyk7XG5cbiAgLy8gYmluZCBldmVudHNcbiAgJHJlZ3VsYXJQYXlNb250aGx5LmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkcGF5bWVudFR5cGUuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJHJlZ3VsYXJQYXlBbm51YWxseS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkcGF5bWVudFR5cGUuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkZGlyZWN0RGViaXREZXRhaWxzLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xuXG4gICRwYXltZW50VHlwZURlYml0LmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAkY3JlZGl0Q2FyZERldGFpbHMuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJHBheW1lbnRUeXBlQ3JlZGl0LmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRjcmVkaXRDYXJkRGV0YWlscy5jb2xsYXBzZSgnc2hvdycpO1xuICAgICRkaXJlY3REZWJpdERldGFpbHMuY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIENoZWNrQmFua051bWJlcihlbGVtLCBuZXh0RWxlbSkge1xuICBjb25zdCBhbGxvd2VkS2V5cyA9IFtcbiAgICA4LFxuICAgIDM3LFxuICAgIDM4LFxuICAgIDM5LFxuICAgIDQwLFxuICAgIDQ2LFxuICAgIDQ4LFxuICAgIDQ5LFxuICAgIDUwLFxuICAgIDUxLFxuICAgIDUyLFxuICAgIDUzLFxuICAgIDU0LFxuICAgIDU1LFxuICAgIDU3LFxuICAgIDU3LFxuICAgIDk2LFxuICAgIDk3LFxuICAgIDk4LFxuICAgIDk5LFxuICAgIDEwMCxcbiAgICAxMDEsXG4gICAgMTAyLFxuICAgIDEwMyxcbiAgICAxMDQsXG4gICAgMTA1LFxuICBdO1xuXG4gICQoZWxlbSkub24oJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuICQuaW5BcnJheShlLndoaWNoLCBhbGxvd2VkS2V5cykgPiAtMTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gZGVsZXRlR29CYWNrKHRoYXQsIGUpIHtcbiAgICByZXR1cm4gdGhhdC5zZWxlY3Rpb25TdGFydCA9PT0gMCAmJiAkLmluQXJyYXkoZS53aGljaCwgWzgsIDQ2XSkgPiAtMTtcbiAgfVxuXG4gIGNvbnN0ICRzb3J0Q29kZSA9ICQoZWxlbSk7XG4gIGNvbnN0IGNvdW50ID0gJHNvcnRDb2RlLmxlbmd0aCAtIDE7XG4gIGNvbnN0ICRhY2NObyA9ICQobmV4dEVsZW0pO1xuXG4gICRzb3J0Q29kZS5vbigna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc3QgaW5kZXggPSAkc29ydENvZGUuaW5kZXgodGhpcyk7XG4gICAgY29uc3QgdmFsID0gdGhpcy52YWx1ZTtcblxuICAgIGlmICh2YWwubGVuZ3RoID09PSB0aGlzLm1heExlbmd0aCkge1xuICAgICAgaWYgKGluZGV4ID09PSBjb3VudCkge1xuICAgICAgICAkYWNjTm8uZm9jdXMoKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCBjb3VudCkge1xuICAgICAgICAkc29ydENvZGUuZXEoaW5kZXggKyAxKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGVsZXRlR29CYWNrKHRoaXMsIGUpICYmIGluZGV4ICE9PSAwKSB7XG4gICAgICAkc29ydENvZGUuZXEoaW5kZXggLSAxKS5mb2N1cygpO1xuICAgIH1cbiAgfSk7XG5cbiAgJGFjY05vLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoZGVsZXRlR29CYWNrKHRoaXMsIGUpKSB7XG4gICAgICAkc29ydENvZGUubGFzdCgpLmZvY3VzKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gVG9nZ2xlUmVxdWlyZWRQYXltZW50RmllbGRzKCkge1xuICBpZiAoJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdJykubGVuZ3RoID4gMCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiSGVsbG8gUmVndWxhciBQYXlcIik7XG5cbiAgICAvLyBpZiBtb250aGx5IHNlbGVjdGVkXG4gICAgLy8gdGhlbiBjaGVjayBmb3IgZGlyZWN0IGRlYml0IGluZm9ybWF0aW9uXG4gICAgJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJCgnI3JlZ3VsYXItcGF5LWFubnVhbGx5OmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV2VsY29tZSB0byBBbm51YWwgcmVwYXltZW50c1wiKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIGNoZWNrIHBheW1lbnQgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXTpmaXJzdCcpXG4gICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcblxuICAgICAgICAvLyBkZWFjdGl2YXRlIHRoZSBEaXJlY3QgRGViaXQgZmllbGRzIE5PVCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2FjY291bnQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjYWNjb3VudC1udW1iZXInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcblxuICAgICAgICAvLyBhY3RpdmF0ZSB0aGUgcGF5bWVudCB0eXBlIGZpZWxkcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBkZWFjdGl2YXRlIHRoZSBDcmVkaXQvRGViaXQgQ2FyZCBmaWVsZHMgTk9UIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCcjY2FyZC1uYW1lJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDEnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQzJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2V4cGlyeS1kYXRlJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjY3YnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHRoZSBkaXJlY3QgZGViaXQgZmllbGRzIHRvIHJlcXVpcmVkXG4gICAgICBpZiAoJCgnI3JlZ3VsYXItcGF5LW1vbnRobHk6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWxjb21lIHRvIE1vbnRobHkgcmVwYXltZW50c1wiKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIGNoZWNrIHBheW1lbnQgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJyZWd1bGFyLXBheVwiXTpmaXJzdCcpXG4gICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcblxuICAgICAgICAvLyBhY3RpdmF0ZSB0aGUgRGlyZWN0IERlYml0IGZpZWxkcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2FjY291bnQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQxJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNhY2NvdW50LW51bWJlcicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgcGF5bWVudCB0eXBlIGZpZWxkcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnQtdHlwZVwiXScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZGVhY3RpdmF0ZSB0aGUgQ3JlZGl0L0RlYml0IENhcmQgZmllbGRzIE5PVCBhc3NvY2lhdGVkIHdpdGggdGhpcyBjaG9pY2VcbiAgICAgICAgJCgnI2NhcmQtbmFtZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQxJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDInKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MycpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQ0JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNleHBpcnktZGF0ZScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2N2JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpZiBwYXltZW50IHR5cGUgc2VsZWN0ZWRcbiAgICAvLyB0aGVuIGNoZWNrIGZvciBlaXRoZXIgdGhlIGRpcmVjdCBkZWJpdCBvciBjcmVkaXQgY2FyZCBpbmZvcm1hdGlvblxuICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl0nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIGlmICgkKCcjcGF5bWVudC10eXBlLWRlYml0OmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV2VsY29tZSB0byBEaXJlY3QgRGViaXQgcGF5bWVudFwiKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIGNoZWNrIHBheW1lbnQgd2Fzbid0IHNlbGVjdGVkXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl06Zmlyc3QnKVxuICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIERpcmVjdCBEZWJpdCBmaWVsZHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNhY2NvdW50LW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjc29ydC1jb2RlLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQyJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI3NvcnQtY29kZS1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjYWNjb3VudC1udW1iZXInKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIENyZWRpdC9EZWJpdCBDYXJkIGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNjYXJkLW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MScpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0NCcpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCcjZXhwaXJ5LWRhdGUnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnI2NjdicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoJCgnI3BheW1lbnQtdHlwZS1jcmVkaXQ6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWxjb21lIHRvIENyZWRpdC9EZWJpdCBDYXJkIHBheW1lbnRcIik7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGdyYW5kcHJhcmVudCBib3ggc2V0IGVhcmxpZXIgd2hlbiBjaGVjayBwYXltZW50IHdhc24ndCBzZWxlY3RlZFxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudC10eXBlXCJdOmZpcnN0JylcbiAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAnNzVweCcpO1xuXG4gICAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIERpcmVjdCBEZWJpdCBmaWVsZHMgTk9UIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgICAkKCcjYWNjb3VudC1uYW1lJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQxJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQyJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNzb3J0LWNvZGUtcHQzJykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJyNhY2NvdW50LW51bWJlcicpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRoZSBDcmVkaXQvRGViaXQgQ2FyZCBmaWVsZHMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAgICQoJyNjYXJkLW5hbWUnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQxJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2NhcmQtbnVtYmVyLXB0MicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJyNjYXJkLW51bWJlci1wdDMnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCcjY2FyZC1udW1iZXItcHQ0JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2V4cGlyeS1kYXRlJykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2NjdicpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gVG9nZ2xlUmVxdWlyZWRGaWVsZHMoKSB7XG4gIGlmICgkKCdpbnB1dFtuYW1lPVwicHJlLWV4aXN0aW5nLWNvbmRpdGlvblwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAvLyBjaGVjayBmb3IgcHJlLWV4aXN0aW5nIGNvbmR0aW9uIGluZm9ybWF0aW9uXG4gICAgJCgnaW5wdXRbbmFtZT1cInByZS1leGlzdGluZy1jb25kaXRpb25cIl0nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIC8vIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSBncmFuZHByYXJlbnQgYm94IHNldCBlYXJsaWVyIHdoZW4gcHJlLWV4aXN0aW5nIGNvbmR0aW9uIHdhc24ndCBzZWxlY3RlZFxuICAgICAgJCgnaW5wdXRbbmFtZT1cInByZS1leGlzdGluZy1jb25kaXRpb25cIl06Zmlyc3QnKVxuICAgICAgICAucGFyZW50KClcbiAgICAgICAgLnBhcmVudCgpXG4gICAgICAgIC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoJCgnaW5wdXRbbmFtZT1cIm5ldXRlcmVkXCJdJykubGVuZ3RoID4gMCkge1xuICAgIC8vIGNoZWNrIGZvciBuZXV0ZXJlZCBpbmZvcm1hdGlvblxuICAgICQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGdyYW5kcHJhcmVudCBib3ggc2V0IGVhcmxpZXIgd2hlbiBuZXV0ZXJlZCB3YXNuJ3Qgc2VsZWN0ZWRcbiAgICAgICQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXTpmaXJzdCcpXG4gICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAucGFyZW50KClcbiAgICAgICAgLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmICgkKCdpbnB1dFtuYW1lPVwicGV0LXR5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgLy8gY2hlY2sgZm9yIHBldC10eXBlIGluZm9ybWF0aW9uXG4gICAgJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAvLyByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgZ3JhbmRwcmFyZW50IGJveCBzZXQgZWFybGllciB3aGVuIHBldC10eXBlIHdhc24ndCBzZWxlY3RlZFxuICAgICAgJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdOmZpcnN0JylcbiAgICAgICAgLnBhcmVudCgpXG4gICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IFBheW1lbnQsIENoZWNrQmFua051bWJlciwgVG9nZ2xlUmVxdWlyZWRQYXltZW50RmllbGRzLCBUb2dnbGVSZXF1aXJlZEZpZWxkcyB9O1xuIiwiLy8gbW9kdWxlIFwiUGV0LmpzXCJcblxuZnVuY3Rpb24gY2hlY2tGb3JDb25kaXRpb25zKCkge1xuICAkKCcucGlsbF9fY29uZGl0aW9uIC5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG5cbiAgICAvLyBtYWtlIHRoZSByZW1vdmUgY29uZGl0aW9uIGFjdGl2ZSBpbiB0aGUgZHJvcGRvd25cbiAgICBjb25zdCBidG5UZXh0ID0gZXZ0LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBjb25kaXRpb24gPSBidG5UZXh0LnN1YnN0cigwLCBidG5UZXh0Lmxlbmd0aCAtIDIpO1xuXG4gICAgLy8gZmluZCBjb25kaXRpb24gaW4gc2VsZWN0IGNvbmRpdGlvbi1zZWxlY3RcbiAgICAkKCcjY29uZGl0aW9uLXNlbGVjdCBvcHRpb24nKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICQodGhpcykuaHRtbCgpID09PSBjb25kaXRpb247XG4gICAgICB9KVxuICAgICAgLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXG4gICAgLy8gcmVtb3ZlIGZyb20gc3RvcmFnZVxuICAgIGxldCBjb25kaXRpb25zID0gW107XG4gICAgY29uZGl0aW9ucyA9IEpTT04ucGFyc2UoJCgnI3BldC1jb25kaXRpb25zJykudmFsKCkpO1xuICAgIGNvbmRpdGlvbnMgPSBjb25kaXRpb25zLmZpbHRlcihmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZSAhPT0gY29uZGl0aW9uO1xuICAgIH0pO1xuICAgICQoJyNwZXQtY29uZGl0aW9ucycpLnZhbChKU09OLnN0cmluZ2lmeShjb25kaXRpb25zKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBQZXQoKSB7XG4gIC8vIGNhY2hlIERPTVxuICBjb25zdCAkcHJlRXhpc3RpbmdDb25kaXRpb25ZZXMgPSAkKCcjcHJlLWV4aXN0aW5nLWNvbmRpdGlvbi15ZXMnKTtcbiAgY29uc3QgJHByZUV4aXN0aW5nQ29uZGl0aW9uTm8gPSAkKCcjcHJlLWV4aXN0aW5nLWNvbmRpdGlvbi1ubycpO1xuICBjb25zdCAkcGV0Q29uZGl0aW9uID0gJCgnI3BldC1jb25kaXRpb24nKTtcbiAgY29uc3QgJGNvbmRpdGlvblNlbGVjdCA9ICQoJyNjb25kaXRpb24tc2VsZWN0Jyk7XG4gIGNvbnN0ICRkb2dUeXBlQnJlZWQgPSAkKCcjZG9nLXR5cGUtYnJlZWQnKTtcbiAgY29uc3QgJGNhdFR5cGVCcmVlZCA9ICQoJyNjYXQtdHlwZS1icmVlZCcpO1xuXG4gIGNvbnN0ICRwZXRUeXBlRG9nID0gJCgnI3BldC10eXBlLWRvZycpO1xuICBjb25zdCAkcGV0VHlwZUNhdCA9ICQoJyNwZXQtdHlwZS1jYXQnKTtcbiAgY29uc3QgJGNhdEluZm8gPSAkKCcjY2F0LWluZm8nKTtcbiAgY29uc3QgJGRvZ0luZm8gPSAkKCcjZG9nLWluZm8nKTtcblxuICBjb25zdCAkZG9nVHlwZTEgPSAkKCcjZG9nLXR5cGUtMScpO1xuICBjb25zdCAkZG9nVHlwZTIgPSAkKCcjZG9nLXR5cGUtMicpO1xuXG4gIGNvbnN0ICRkb2dUeXBlID0gJCgnI2RvZy10eXBlJyk7XG5cbiAgLy8gYmluZCBldmVudHNcbiAgJHBldFR5cGVEb2cuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJGNhdEluZm8uY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAkZG9nSW5mby5jb2xsYXBzZSgnc2hvdycpO1xuICB9KTtcblxuICAkcGV0VHlwZUNhdC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkZG9nSW5mby5jb2xsYXBzZSgnaGlkZScpO1xuICAgICRjYXRJbmZvLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gICRwcmVFeGlzdGluZ0NvbmRpdGlvblllcy5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkcGV0Q29uZGl0aW9uLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gICRwcmVFeGlzdGluZ0NvbmRpdGlvbk5vLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRwZXRDb25kaXRpb24uY29sbGFwc2UoJ2hpZGUnKTtcbiAgfSk7XG5cbiAgJGNvbmRpdGlvblNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgJHNlbGVjdCA9ICQoJyNjb25kaXRpb24tc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpO1xuXG4gICAgLy8gaWdub3JlIHRoZSBmaXJzdCBvcHRpb24gaW4gdGhlIGxpc3RcbiAgICBpZiAoJCgnI2NvbmRpdGlvbi1zZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykuaW5kZXgoKSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGRpc2FibGVkIHNlbGVjdGVkIGNvbmRpdGlvblxuICAgICRzZWxlY3QucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblxuICAgIC8vIGNyZWF0ZSBhIHBpbGxcbiAgICAvLyBhcHBlbmQgcGlsbCB0byBjb25kaXRpb24gbGlzdFxuICAgICQoJy5jb25kaXRpb25zJykuYXBwZW5kKGA8ZGl2IGNsYXNzPVwicGlsbF9fY29uZGl0aW9uXCI+JHskc2VsZWN0LnRleHQoKX0gPHNwYW4gY2xhc3M9XCJjbG9zZVwiPng8L3NwYW4+PC9kaXY+YCk7XG5cbiAgICAvLyBrZWVwIGEgcmVjb3JkIGluIHRoZSBtYWluIHN0b3JlXG4gICAgbGV0IGNvbmRpdGlvbnNBcnJheSA9IFtdO1xuICAgIGNvbnN0ICRjb25kaXRpb25zID0gJCgnI3BldC1jb25kaXRpb25zJyk7XG4gICAgaWYgKCRjb25kaXRpb25zICE9PSBudWxsICYmICRjb25kaXRpb25zLnZhbCgpICE9PSAnW10nICYmICRjb25kaXRpb25zLnZhbCgpICE9PSAnJykge1xuICAgICAgY29uZGl0aW9uc0FycmF5ID0gSlNPTi5wYXJzZSgkY29uZGl0aW9ucy52YWwoKSk7XG4gICAgfVxuICAgIGNvbmRpdGlvbnNBcnJheS5wdXNoKCRzZWxlY3QudGV4dCgpKTtcbiAgICAkKCcjcGV0LWNvbmRpdGlvbnMnKS52YWwoSlNPTi5zdHJpbmdpZnkoY29uZGl0aW9uc0FycmF5KSk7XG5cbiAgICBjaGVja0ZvckNvbmRpdGlvbnMoKTtcbiAgfSk7XG5cbiAgLy8gc2VsZWN0IHRoZSByYWRpbyBidXR0b24gd2hlbiBzZWxlY3QgZWxlbWVudCBjbGlja2VkXG4gICRkb2dUeXBlQnJlZWQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCkudHJpZ2dlcignY2xpY2snKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCB0cnVlKTtcbiAgfSk7XG5cbiAgLy8gc2VsZWN0IHRoZSByYWRpbyBidXR0b24gd2hlbiBzZWxlY3QgZWxlbWVudCBjbGlja2VkXG4gICRjYXRUeXBlQnJlZWQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCkudHJpZ2dlcignY2xpY2snKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCB0cnVlKTtcbiAgfSk7XG5cbiAgJGRvZ1R5cGUxLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRkb2dUeXBlLmNvbGxhcHNlKCdzaG93Jyk7XG4gIH0pO1xuXG4gICRkb2dUeXBlMi5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkZG9nVHlwZS5jb2xsYXBzZSgnaGlkZScpO1xuICB9KTtcblxuICAkZG9nVHlwZUJyZWVkLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICRkb2dUeXBlLmNvbGxhcHNlKCdoaWRlJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBUb2dnbGVSZXF1aXJlZFBldEZpZWxkcygpIHtcbiAgLy8gaWYgcGV0IHR5cGUgc2VsZWN0ZWRcbiAgLy8gdGhlbiBjaGVjayBmb3JcbiAgJCgnaW5wdXRbbmFtZT1cInBldC10eXBlXCJdJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQoJyNwZXQtdHlwZS1kb2c6Y2hlY2tlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGFjdGl2YXRlIHRoZSBkb2cgcGV0IHR5cGUgZmllbGRzIGFzc2NvaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnI3Rlcm1zQWdyZWVtZW50JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJkb2ctdHlwZVwiXScpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG5cbiAgICAgIC8vIGRlYWN0aXZhdGUgdGhlIHBldCB0eXBlIGZpZWxkcyBOT1QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAkKCdpbnB1dFtuYW1lPVwiY2F0LXR5cGVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoJCgnI3BldC10eXBlLWNhdDpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgLy8gYWN0aXZhdGUgdGhlIGNhdCBwZXQgdHlwZSBmaWVsZHMgYXNzY29pYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAkKCdpbnB1dFtuYW1lPVwiY2F0LXR5cGVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuXG4gICAgICAvLyBkZWFjdGl2YXRlIHRoZSBwZXQgdHlwZSBmaWVsZHMgTk9UIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNob2ljZVxuICAgICAgJCgnI3Rlcm1zQWdyZWVtZW50JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiZG9nLXR5cGVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH0pO1xuXG4gICQoJ2lucHV0W25hbWU9XCJkb2ctdHlwZVwiXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIC8vIGRvZy1zaXplXG4gICAgaWYgKCQoJyNkb2ctdHlwZS0yOmNoZWNrZWQnKS5sZW5ndGggPiAwIHx8ICQoJyNkb2ctdHlwZS1icmVlZDpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgLy8gYWN0aXZhdGUgdGhlIGRvZyBwZXQgdHlwZSBmaWVsZHMgYXNzY29pYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAkKCdpbnB1dFtuYW1lPVwiZG9nLXNpemVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKCQoJyNkb2ctdHlwZS0xOmNoZWNrZWQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiZG9nLXNpemVcIl0nKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIGlmICgkKCcjZG9nLXR5cGUtMTpjaGVja2VkJykubGVuZ3RoID4gMCB8fCAkKCcjZG9nLXR5cGUtMjpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgLy8gYWN0aXZhdGUgdGhlIGRvZyBwZXQgdHlwZSBmaWVsZHMgYXNzY29pYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAkKCcjZG9nLXR5cGUtYnJlZWQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH0pO1xuXG4gICQoJ2lucHV0W25hbWU9XCJjYXQtdHlwZVwiXScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKCcjY2F0LXR5cGUtMTpjaGVja2VkJykubGVuZ3RoID4gMCB8fCAkKCcjY2F0LXR5cGUtMjpjaGVja2VkJykubGVuZ3RoID4gMCkge1xuICAgICAgLy8gYWN0aXZhdGUgdGhlIGNhdCBwZXQgdHlwZSBmaWVsZHMgYXNzY29pYXRlZCB3aXRoIHRoaXMgY2hvaWNlXG4gICAgICAkKCcjY2F0LXR5cGUtYnJlZWQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgeyBQZXQsIFRvZ2dsZVJlcXVpcmVkUGV0RmllbGRzIH07XG4iLCIvLyBtb2R1bGUgXCJWYWxpZGF0aW9uLmpzXCJcblxuZnVuY3Rpb24gQWN0aXZhdGVGb3JtVmFsaWRhdGlvbigpIHtcbiAgLy8gRmV0Y2ggYWxsIHRoZSBmb3JtcyB3ZSB3YW50IHRvIGFwcGx5IGN1c3RvbSBCb290c3RyYXAgdmFsaWRhdGlvbiBzdHlsZXMgdG9cbiAgY29uc3QgZm9ybXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduZWVkcy12YWxpZGF0aW9uJyk7XG4gIC8vIExvb3Agb3ZlciB0aGVtIGFuZCBwcmV2ZW50IHN1Ym1pc3Npb25cbiAgY29uc3QgdmFsaWRhdGlvbiA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChmb3JtcywgZnVuY3Rpb24oZm9ybSkge1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdzdWJtaXQnLFxuICAgICAgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGZvcm0uY2hlY2tWYWxpZGl0eSgpID09PSBmYWxzZSkge1xuICAgICAgICAgIC8vIGlmIHBldCB0eXBlIHNlbGVjdGVkIGRvIHZhbGlkaXR5IGNoZWNrIG9uIGl0J3MgY2hpbGRyZW4gd2hpY2ggYWZmZWN0IGl0cyBvdXRjb21lXG4gICAgICAgICAgLy8gaWYgcGV0LXR5cGUgc2VsZWN0ZWRcbiAgICAgICAgICAvLyAgZG8gdmFsaWRpdHkgY2hlY2sgb24gdGhlIGVsZW1lbnRzIGluIHRoZSBhc3NvY2lhdGVkIGNvbGxhcHNlIGRpdlxuXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgbmV4dFBhZ2U7XG5cbiAgICAgICAgICAvLyBUaGVyZSBtYXliZSBtb3JlIHRoYW4gb25lIHN1Ym1pdCBidXR0b24gb24gdGhlIHBhZ2VcbiAgICAgICAgICAvLyBzbyB1bHRpbWF0ZWx5IHdlIHdvdWxkIGxpa2UgdGhlIG5leHQgYnV0dG9uIHRvIGJlIGFibGUgdG8gbW92ZSBvbnRvIHRoZSBuZXh0IHBhZ2VcbiAgICAgICAgICBpZiAoJCgnYnV0dG9uW2RhdGEtaHJlZl0nKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBuZXh0UGFnZSA9ICQoJ2J1dHRvbltkYXRhLWhyZWZdJykuZGF0YSgnaHJlZicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvcm0uYWN0aW9uID0gbmV4dFBhZ2U7XG4gICAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ3dhcy12YWxpZGF0ZWQnKTtcblxuICAgICAgICAvLyBjaGVjayBmb3IgcG9zdGFsIGFkZHJlc3NcbiAgICAgICAgaWYgKCQoJyNjdXN0b21lci1ob3VzZS1udW1iZXInKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgJCgnI2N1c3RvbWVyLWhvdXNlLW51bWJlcicpLnZhbCgpID09PSAnJyB8fFxuICAgICAgICAgICAgJCgnI2N1c3RvbWVyLXN0cmVldCcpLnZhbCgpID09PSAnJyB8fFxuICAgICAgICAgICAgJCgnI2N1c3RvbWVyLXRvd24tY2l0eScpLnZhbCgpID09PSAnJ1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgJCgnLndhcy12YWxpZGF0ZWQgLmpzLWludmFsaWQtcG9zdGFsLWFkZHJlc3MuaW52YWxpZC1mZWVkYmFjaycpLnNob3coKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLndhcy12YWxpZGF0ZWQgLmpzLWludmFsaWQtcG9zdGFsLWFkZHJlc3MuaW52YWxpZC1mZWVkYmFjaycpLmhpZGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBpZiBhbGwgMyBwYXJ0cyBvZiB0aGUgYWRkcmVzcyBhcmUgY29tcGxldGVcbiAgICAgICAgICAgIC8vIHRoZW4gaGlkZSB0aGUgaW52YWxpZC1mZWVkYmFja1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAkKCcjY3VzdG9tZXItaG91c2UtbnVtYmVyJykudmFsKCkgIT09ICcnICYmXG4gICAgICAgICAgICAgICQoJyNjdXN0b21lci1zdHJlZXQnKS52YWwoKSAhPT0gJycgJiZcbiAgICAgICAgICAgICAgJCgnI2N1c3RvbWVyLXRvd24tY2l0eScpLnZhbCgpICE9PSAnJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICQoJy53YXMtdmFsaWRhdGVkIC5qcy1pbnZhbGlkLXBvc3RhbC1hZGRyZXNzLmludmFsaWQtZmVlZGJhY2snKS5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKCcud2FzLXZhbGlkYXRlZCAuanMtaW52YWxpZC1wb3N0YWwtYWRkcmVzcy5pbnZhbGlkLWZlZWRiYWNrJykuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHBheW1lbnRzXG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ0hlbGxvIFJlZ3VsYXIgUGF5IGNoZWNrJyk7XG4gICAgICAgICAgLy8gaWYgYSByZWd1bGFyIHBheW1lbnQgaXMgbm90IHNlbGVjdGVkXG4gICAgICAgICAgLy8gdGhlbiBpbmNyZWFzZSB0aGUgaGVpZ2h0IG9mIHRoZSBmb3JtLWNoZWNrIGJveCB0byBhbGxvdyBmb3IgdGhlIGVycm9yIG1lZXNhZ2UgdG8gYmUgc2hvd25cbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInJlZ3VsYXItcGF5XCJdOmNoZWNrZWQnKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicmVndWxhci1wYXlcIl06Zmlyc3QnKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICc3NXB4Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl06Y2hlY2tlZCcpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50LXR5cGVcIl06Zmlyc3QnKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICc3NXB4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHByZS1leGlzdGluZyBjb25kaXRpb25zXG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicHJlLWV4aXN0aW5nLWNvbmRpdGlvblwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBpZiBwcmUtZXhpc3RpbmcgY29uZGl0aW9uIGlzIG5vdCBzZWxlY3RlZFxuICAgICAgICAgIC8vIHRoZW4gaW5jcmVhc2UgdGhlIGhlaWdodCBvZiB0aGUgZm9ybS1jaGVjayBib3ggdG8gYWxsb3cgZm9yIHRoZSBlcnJvciBtZWVzYWdlIHRvIGJlIHNob3duXG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwcmUtZXhpc3RpbmctY29uZGl0aW9uXCJdOmNoZWNrZWQnKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicHJlLWV4aXN0aW5nLWNvbmRpdGlvblwiXTpmaXJzdCcpXG4gICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJzgwcHgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgbmV1dGVyZWRcbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBpZiBuZXV0ZXJlZCBpcyBub3Qgc2VsZWN0ZWRcbiAgICAgICAgICAvLyB0aGVuIGluY3JlYXNlIHRoZSBoZWlnaHQgb2YgdGhlIGZvcm0tY2hlY2sgYm94IHRvIGFsbG93IGZvciB0aGUgZXJyb3IgbWVlc2FnZSB0byBiZSBzaG93blxuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwibmV1dGVyZWRcIl06Y2hlY2tlZCcpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJuZXV0ZXJlZFwiXTpmaXJzdCcpXG4gICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJzgwcHgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgcGV0LXR5cGVcbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwZXQtdHlwZVwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBpZiBwZXQtdHlwZSBpcyBub3Qgc2VsZWN0ZWRcbiAgICAgICAgICAvLyB0aGVuIGluY3JlYXNlIHRoZSBoZWlnaHQgb2YgdGhlIGZvcm0tY2hlY2sgYm94IHRvIGFsbG93IGZvciB0aGUgZXJyb3IgbWVlc2FnZSB0byBiZSBzaG93blxuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicGV0LXR5cGVcIl06Y2hlY2tlZCcpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwZXQtdHlwZVwiXTpmaXJzdCcpXG4gICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJzgwcHgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgcGV0IGNvbmRpdGlvbnMgaW4gYSBoaWRkZW4gdmFsdWVcbiAgICAgICAgaWYgKCQoJyNwZXQtY29uZGl0aW9ucycpICE9PSBudWxsKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJCgnI3BldC1jb25kaXRpb25zJykudmFsKCkpO1xuICAgICAgICAgIGlmICgkKCcjcGV0LWNvbmRpdGlvbnMnKS52YWwoKSAhPT0gJ1tdJykge1xuICAgICAgICAgICAgJCgnI2NvbmRpdGlvbi1zZWxlY3QnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICQoJyNjb25kaXRpb24tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2JvcmRlci1kYW5nZXInKTtcbiAgICAgICAgICAgICQoJyNjb25kaXRpb24tc2VsZWN0JykuYWRkQ2xhc3MoJ2JvcmRlci1zdWNjZXNzJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyNjb25kaXRpb24tc2VsZWN0JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICQoJyNjb25kaXRpb24tc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2JvcmRlci1zdWNjZXNzJyk7XG4gICAgICAgICAgICAkKCcjY29uZGl0aW9uLXNlbGVjdCcpLmFkZENsYXNzKCdib3JkZXItZGFuZ2VyJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgQWN0aXZhdGVGb3JtVmFsaWRhdGlvbiB9O1xuIiwiLy8gbW9kdWxlIFwiV2hpdGVMYWJlbGxpbmcuanNcIlxuXG4vLyBwb3N0Y29kZXNcblxubGV0IGh0dHBSZXF1ZXN0O1xuXG5mdW5jdGlvbiBXaGl0ZUxhYmVsbGluZyAodGhlbWUgPSAnVG93ZXJnYXRlJykge1xuICBpZiAodGhlbWUgPT09ICdIZWFsdGh5IFBldHMnKSB7XG4gICAgLy8gbWFpbiBjb2xvdXJzXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnktY29sb3VyJywgJ29yYW5nZScpO1xuXG4gICAgLy8gbWFpbiBib2R5IGFuZCBwYW5lbCBiYWNrZ3JvdW5kc1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYW5lbC1iZy1jb2xvdXInLCAnb3JhbmdlJyk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWJvZHktYmctY29sb3VyJywgJ29yYW5nZScpO1xuXG4gICAgLy8gbWVudSBiYWNrZ3JvdW5kIGNvbG91clxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1tZW51LWJnLWNvbG91cicsICdvcmFuZ2UnKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc3ViLW1lbnUtYmctY29sb3VyJywgJ29yYW5nZScpO1xuXG4gICAgLy8gcG9saWN5IGNvbG91cnNcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tbGlmZXRpbWUtY29sb3VyJywgJ29yYW5nZScpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1tYXhpbXVtLWNvbG91cicsICdvcmFuZ2UnKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tYWNjaWRlbnQtY29sb3VyJywgJ29yYW5nZScpO1xuXG4gICAgLy8gZm9ybSBjb2xvdXJzXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWZvcm0tbGFiZWwtY29sb3VyJywgJ29yYW5nZScpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jdGEtY29sb3VyJywgJ29yYW5nZScpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1pbnB1dC1iZy1jb2xvdXInLCAnb3JhbmdlJyk7XG4gIH1cbiAgbWFrZVJlcXVlc3QoJ3RoZW1lLmpzb24nKTtcbn1cblxuZnVuY3Rpb24gbWFrZVJlcXVlc3QgKGZpbGUpIHtcbiAgaHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICBpZiAoIWh0dHBSZXF1ZXN0KSB7XG4gICAgY29uc29sZS53YXJuKCdHaXZpbmcgdXAgOiggQ2Fubm90IGNyZWF0ZSBhbiBYTUxIVFRQIGluc3RhbmNlJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaHR0cFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gcHJvY2Vzc0NvbnRlbnRzO1xuICBodHRwUmVxdWVzdC5vcGVuKCdHRVQnLCBgL2NvbmZpZy8ke2ZpbGV9YCk7XG4gIGh0dHBSZXF1ZXN0LnNlbmQoKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0NvbnRlbnRzICgpIHtcbiAgaWYgKGh0dHBSZXF1ZXN0LnJlYWR5U3RhdGUgPT09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICBpZiAoaHR0cFJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcbiAgICAgIC8vIHBhcnNlIHRoZSBqc29uIGZpbGVcbiAgICAgIGxldCBjb25maWcgPSBKU09OLnBhcnNlKGh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgIC8vIGxvYWQgdGhlbWVcbiAgICAgIHN3aXRjaCAoY29uZmlnLmNvbW1hbmQpIHtcbiAgICAgIGNhc2UgJ2xvYWQnOlxuICAgICAgICBtYWtlUmVxdWVzdChgL3RoZW1lcy8ke2NvbmZpZy50aGVtZX1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhY3RpdmF0ZSc6XG4gICAgICAgIGxvYWRUaGVtZShjb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdUaGVyZSB3YXMgYSBwcm9ibGVtIHdpdGggdGhlIHJlcXVlc3QuJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGxvYWRUaGVtZSAodGhlbWUpIHtcbiAgLy8gY29uc29sZS5sb2codGhlbWUpO1xuICAvLyBjaGFuZ2UgY3NzIGluZm9cbiAgZm9yIChsZXQgc3R5bGUgaW4gdGhlbWUuY29sb3Vycykge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShzdHlsZSwgdGhlbWUuY29sb3Vyc1tzdHlsZV0pO1xuICB9XG5cbiAgLy8gY2hhbmdlIGltYWdlIGluZm9cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ29fX21vYmlsZScpLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgdGhlbWUuaW1hZ2VzWydsb2dvLW1vYmlsZSddKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ29fX2Rlc2t0b3AnKS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHRoZW1lLmltYWdlc1snbG9nby1kZXNrdG9wJ10pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9nbyBpbWcnKS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRoZW1lLmltYWdlc1snbG9nby1tb2JpbGUnXSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dvIGltZycpLnNldEF0dHJpYnV0ZSgnYWx0JywgYCR7dGhlbWUubmFtZX0gbG9nb2ApO1xufVxuXG5leHBvcnQgeyBXaGl0ZUxhYmVsbGluZyB9O1xuIiwiLy8gaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi9jb21wb25lbnRzL1V0aWxzJztcblxuaW1wb3J0IHsgQ3VzdG9tU2VsZWN0IH0gZnJvbSAnLi9jb21wb25lbnRzL0N1c3RvbVNlbGVjdCc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi9jb21wb25lbnRzL0FkZHJlc3MnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gJy4vY29tcG9uZW50cy9EYXRlUGlja2VyJztcbmltcG9ydCB7IFBldCwgVG9nZ2xlUmVxdWlyZWRQZXRGaWVsZHMgfSBmcm9tICcuL2NvbXBvbmVudHMvUGV0JztcbmltcG9ydCB7IENvdmVyVHlwZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvQ292ZXJUeXBlcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZUZvcm1WYWxpZGF0aW9uIH0gZnJvbSAnLi9jb21wb25lbnRzL1ZhbGlkYXRpb24nO1xuaW1wb3J0IHsgUGF5bWVudCwgQ2hlY2tCYW5rTnVtYmVyLCBUb2dnbGVSZXF1aXJlZFBheW1lbnRGaWVsZHMsIFRvZ2dsZVJlcXVpcmVkRmllbGRzIH0gZnJvbSAnLi9jb21wb25lbnRzL1BheW1lbnQnO1xuaW1wb3J0IHsgV2hpdGVMYWJlbGxpbmcgfSBmcm9tICcuL2NvbXBvbmVudHMvV2hpdGVMYWJlbGxpbmcnO1xuXG4vLyBVdGlscygpO1xuLy8gd2luZG93LmxvZyA9IGxvZztcblxuKGZ1bmN0aW9uKCkge1xuICBDdXN0b21TZWxlY3QoKTtcbiAgQWRkcmVzcygpO1xuICBQZXQoKTtcbiAgQ292ZXJUeXBlcygpO1xuICBQYXltZW50KCk7XG4gIFdoaXRlTGFiZWxsaW5nKCdUb3dlcmdhdGUnKTtcbiAgQWRkcmVzcygpO1xuXG4gIC8vIGNoZWNrIHNvcnQgY29kZSBhbmQgYWNjb3VudCBudW1iZXJcbiAgQWN0aXZhdGVGb3JtVmFsaWRhdGlvbigpO1xuXG4gIGlmICgkKCcuZm9ybS1ncm91cC0tc29ydGNvZGUnKS5sZW5ndGggPiAwKSB7XG4gICAgQ2hlY2tCYW5rTnVtYmVyKCcuZm9ybS1ncm91cC0tc29ydGNvZGUgaW5wdXQnLCAnI2FjY291bnQtbnVtYmVyJyk7XG4gIH1cblxuICBpZiAoJCgnLmZvcm0tZ3JvdXAtLWFjY291bnQtbnVtYmVyJykubGVuZ3RoID4gMCkge1xuICAgIENoZWNrQmFua051bWJlcignLmZvcm0tZ3JvdXAtLWFjY291bnQtbnVtYmVyIGlucHV0JywgJyNleHBpcnktZGF0ZScpO1xuICB9XG5cbiAgY29uc3QgbWF4RGF0ZSA9IERhdGVQaWNrZXIoKTtcbiAgJCgnaW5wdXRbdHlwZT1kYXRlXScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzKS5hdHRyKCdtYXgnLCBtYXhEYXRlKTtcbiAgfSk7XG5cbiAgVG9nZ2xlUmVxdWlyZWRQYXltZW50RmllbGRzKCk7XG4gIFRvZ2dsZVJlcXVpcmVkUGV0RmllbGRzKCk7XG4gIFRvZ2dsZVJlcXVpcmVkRmllbGRzKCk7XG59KSgpO1xuIl19
