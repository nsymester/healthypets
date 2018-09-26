// import { log } from './components/Utils';

import { CustomSelect } from './components/CustomSelect';
import { Address } from './components/Address';
import { Pet } from './components/Pet';
import { CoverTypes } from './components/CoverTypes';
import { ActivateFormValidation, Payment, CheckBankNumber, ToggleRequiredPaymentFields } from './components/Payment';
// import { Modal } from './components/Modal';

// Utils();
// window.log = log;

(function () {
  CustomSelect();
  Address();
  Pet();
  CoverTypes();
  Payment();

  // check sort code and account number
  ActivateFormValidation();

  if ($('.form-group--sortcode').length > 0) {
    CheckBankNumber('.form-group--sortcode input', '#account-number');
  }
  if ($('.form-group--account-number').length > 0) {
    CheckBankNumber('.form-group--account-number input', '#expiry-date');
  }

  ToggleRequiredPaymentFields();

  // Modal();
})();
