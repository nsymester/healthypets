// module "Payment.js"

function Payment () {
  // cache DOM
  let $regularPayMonthly = $('#regular-pay-monthly');
  let $regularPayAnnually = $('#regular-pay-annually');
  let $paymentTypeDebit = $('#payment-type-debit');
  let $paymentTypeCredit = $('#payment-type-credit');

  let $directDebitDetails = $('#direct-debit-details');
  let $paymentType = $('#payment-type');
  let $creditCardDetails = $('#credit-card-details');

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

function CheckBankNumber (elem, nextElem) {
  let allowedKeys = [
    8, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 57, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105
  ];

  $(elem).on('keydown', function (e) {
    return $.inArray(e.which, allowedKeys) > -1;
  });
  /* IGNORE - END */

  function deleteGoBack (that, e) {
    return that.selectionStart === 0 && $.inArray(e.which, [ 8, 46 ]) > -1;
  }

  let $sortCode = $(elem);
  let count = $sortCode.length - 1;
  let $accNo = $(nextElem);

  $sortCode.on('keyup', function (e) {

    let index = $sortCode.index(this);
    let val = this.value;

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

function ToggleRequiredPaymentFields () {

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

function ActivateFormValidation () {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  let forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  let validation = Array.prototype.filter.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
      if (form.checkValidity() === false) {

        // if pet type selected do validity check on it's children which affect its outcome
        // if pet-type selected
        //  do validity check on the elements in the associated collapse div

        event.preventDefault();
        event.stopPropagation();
      } else {
        let nextPage;

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
        if ( $('#customer-house-number').val() === '' || $('#customer-street').val() === '' || $('#customer-town-city').val() === '') {
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

export { Payment, ActivateFormValidation, CheckBankNumber, ToggleRequiredPaymentFields };
