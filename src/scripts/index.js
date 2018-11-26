// import { log } from './components/Utils';

import { CustomSelect } from './components/CustomSelect';
import { Address } from './components/Address';
import { SetDate, AddTodaysDate } from './components/DatePicker';
import { Pet, ToggleRequiredPetFields } from './components/Pet';
import { CoverTypes } from './components/CoverTypes';
import { ActivateFormValidation } from './components/Validation';
import {
  Payment,
  CheckBankNumber,
  ToggleRequiredPaymentFields,
  ToggleRequiredFields,
  keyPressCheck,
  CreditCardTypeDetector,
} from './components/Payment';
import { WhiteLabelling } from './components/WhiteLabelling';

// Utils();
// window.log = log;

function init() {
  CustomSelect();
  Address();
  Pet();
  CoverTypes();
  Payment();
  WhiteLabelling('Towergate');
  AddTodaysDate();

  // check sort code and account number
  ActivateFormValidation();

  if ($('.form-group--sortcode').length > 0) {
    CheckBankNumber('.form-group--sortcode input', '#account-number');
  }

  // limit the number length for bank details
  if ($('.form-group--account-number input').length > 0) {
    keyPressCheck($('.form-group--account-number input'), 16);
  }
  if ($('.form-control--ccv').length > 0) {
    keyPressCheck($('.form-control--ccv'), 3);
  }

  const maxDate = SetDate();
  $('input[type=date]').each(function() {
    $(this).attr('max', maxDate);
  });

  $('#expiry-date').removeAttr('max');

  CreditCardTypeDetector({ credit_card_logos: '.card_logos', elm: '#card-number' });

  ToggleRequiredPaymentFields();
  ToggleRequiredPetFields();
  ToggleRequiredFields();
}

ready(init);

function ready(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
