// import { log } from './components/Utils';

import { CustomSelect } from './components/CustomSelect';
import { Address } from './components/Address';
import { DatePicker } from './components/DatePicker';
import { Pet, ToggleRequiredPetFields } from './components/Pet';
import { CoverTypes } from './components/CoverTypes';
import { ActivateFormValidation } from './components/Validation';
import { Payment, CheckBankNumber, ToggleRequiredPaymentFields, ToggleRequiredFields } from './components/Payment';
import { WhiteLabelling } from './components/WhiteLabelling';

// Utils();
// window.log = log;

(function() {
  CustomSelect();
  Address();
  Pet();
  CoverTypes();
  Payment();
  WhiteLabelling('Towergate');

  // check sort code and account number
  ActivateFormValidation();

  if ($('.form-group--sortcode').length > 0) {
    CheckBankNumber('.form-group--sortcode input', '#account-number');
  }

  if ($('.form-group--account-number').length > 0) {
    CheckBankNumber('.form-group--account-number input', '#expiry-date');
  }

  const maxDate = DatePicker();
  $('input[type=date]').each(function() {
    $(this).attr('max', maxDate);
  });

  ToggleRequiredPaymentFields();
  ToggleRequiredPetFields();
  ToggleRequiredFields();
})();
