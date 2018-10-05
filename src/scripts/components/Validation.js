// module "Validation.js"

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

export { ActivateFormValidation };
