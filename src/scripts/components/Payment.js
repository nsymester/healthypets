// module "Payment.js"

function Payment() {
  // cache DOM
  const $regularPayMonthly = $('#regular-pay-monthly');
  const $regularPayAnnually = $('#regular-pay-annually');
  const $paymentTypeDebit = $('#payment-type-debit');
  const $paymentTypeCredit = $('#payment-type-credit');

  const $directDebitDetails = $('#direct-debit-details');
  const $paymentType = $('#payment-type');
  const $creditCardDetails = $('#credit-card-details');

  // bind events
  $regularPayMonthly.click(function() {
    $directDebitDetails.collapse('show');
    $paymentType.collapse('hide');
  });

  $regularPayAnnually.click(function() {
    $paymentType.collapse('show');
    $directDebitDetails.collapse('hide');
  });

  $paymentTypeDebit.click(function() {
    $directDebitDetails.collapse('show');
    $creditCardDetails.collapse('hide');
  });

  $paymentTypeCredit.click(function() {
    $creditCardDetails.collapse('show');
    $directDebitDetails.collapse('hide');
  });
}

function CheckBankNumber(elem, nextElem) {
  const allowedKeys = [
    8,
    37,
    38,
    39,
    40,
    46,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    57,
    57,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
  ];

  $(elem).on('keydown', function(e) {
    return $.inArray(e.which, allowedKeys) > -1;
  });

  function deleteGoBack(that, e) {
    return that.selectionStart === 0 && $.inArray(e.which, [8, 46]) > -1;
  }

  const $sortCode = $(elem);
  const count = $sortCode.length - 1;
  const $accNo = $(nextElem);

  $sortCode.on('keyup', function(e) {
    const index = $sortCode.index(this);
    const val = this.value;

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

  $accNo.on('keyup', function(e) {
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
    $('input[name="regular-pay"]').click(function() {
      if ($('#regular-pay-annually:checked').length > 0) {
        // console.log("Welcome to Annual repayments");

        // return the height of the grandprarent box set earlier when check payment wasn't selected
        $('input[name="regular-pay"]:first')
          .parent()
          .parent()
          .css('height', 'auto');

        // deactivate the Direct Debit fields NOT associated with this choice
        $('#account-name').prop('required', false);
        $('#sort-code-pt1').prop('required', false);
        $('#sort-code-pt2').prop('required', false);
        $('#sort-code-pt3').prop('required', false);
        $('#account-number').prop('required', false);

        // activate the payment type fields associated with this choice
        $('input[name="payment-type"]').each(function() {
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
        $('input[name="regular-pay"]:first')
          .parent()
          .parent()
          .css('height', 'auto');

        // activate the Direct Debit fields associated with this choice
        $('#account-name').prop('required', true);
        $('#sort-code-pt1').prop('required', true);
        $('#sort-code-pt2').prop('required', true);
        $('#sort-code-pt3').prop('required', true);
        $('#account-number').prop('required', true);

        // deactivate the payment type fields associated with this choice
        $('input[name="payment-type"]').each(function() {
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
    $('input[name="payment-type"]').click(function() {
      if ($('#payment-type-debit:checked').length > 0) {
        // console.log("Welcome to Direct Debit payment");

        // return the height of the grandprarent box set earlier when check payment wasn't selected
        $('input[name="payment-type"]:first')
          .parent()
          .parent()
          .css('height', 'auto');

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
        $('input[name="payment-type"]:first')
          .parent()
          .parent()
          .css('height', '75px');

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
    $('input[name="pre-existing-condition"]').click(function() {
      // return the height of the grandprarent box set earlier when pre-existing condtion wasn't selected
      $('input[name="pre-existing-condition"]:first')
        .parent()
        .parent()
        .css('height', 'auto');
    });
  }

  if ($('input[name="neutered"]').length > 0) {
    // check for neutered information
    $('input[name="neutered"]').click(function() {
      // return the height of the grandprarent box set earlier when neutered wasn't selected
      $('input[name="neutered"]:first')
        .parent()
        .parent()
        .css('height', 'auto');
    });
  }

  if ($('input[name="pet-type"]').length > 0) {
    // check for pet-type information
    $('input[name="pet-type"]').click(function() {
      // return the height of the grandprarent box set earlier when pet-type wasn't selected
      $('input[name="pet-type"]:first')
        .parent()
        .parent()
        .css('height', 'auto');
    });
  }
}

let keyCount = 1;
function isNumberKey(event) {
  const keyCode = window.event ? event.keyCode : event.which;

  if (
    keyCode === 8 || // backspace
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
  elm.keydown(function() {
    keyPressed($(this), maxKeyCount);
  });

  elm.keyup(function() {
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
  const settings = $.extend(
    {
      credit_card_logos_id: '.card_logos',
      elm: '#card-number',
    },
    options
  );

  // the object that contains the logos

  const logos_obj = $(settings.credit_card_logos_id);

  // the regular expressions check for possible matches as you type, hence the OR operators based on the number of chars
  // Visa
  const visa_regex = new RegExp('^4[0-9]{0,15}$');

  // MasterCard

  const mastercard_regex = new RegExp('^5$|^5[1-5][0-9]{0,14}$');

  // American Express

  const amex_regex = new RegExp('^3$|^3[47][0-9]{0,13}$');

  // Diners Club

  const diners_regex = new RegExp('^3$|^3[068]$|^3(?:0[0-5]|[68][0-9])[0-9]{0,11}$');

  // Discover

  const discover_regex = new RegExp('^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$');

  // JCB

  const jcb_regex = new RegExp('^2[1]?$|^21[3]?$|^1[8]?$|^18[0]?$|^(?:2131|1800)[0-9]{0,11}$|^3[5]?$|^35[0-9]{0,14}$');

  return $(settings.elm).each(function() {
    // as the user types
    $(this).keyup(function() {
      let currentValue = $(this).val();

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
      if (
        currentValue != '' &&
        !currentValue.match(visa_regex) &&
        !currentValue.match(mastercard_regex) &&
        !currentValue.match(amex_regex) &&
        !currentValue.match(diners_regex) &&
        !currentValue.match(discover_regex) &&
        !currentValue.match(jcb_regex)
      ) {
        $(logos_obj).addClass('is_nothing');
      } else {
        $(logos_obj).removeClass('is_nothing');
      }
    });
  });
}

export {
  Payment,
  CheckBankNumber,
  ToggleRequiredPaymentFields,
  ToggleRequiredFields,
  isNumberKey,
  keyPressCheck,
  // GetCardType,
  CreditCardTypeDetector,
};
