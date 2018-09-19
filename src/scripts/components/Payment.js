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

export { Payment };
