// module "Pet.js"

function Pet () {
  // cache DOM
  let $preExistingConditionYes = $('#pre-existing-condition-yes');
  let $preExistingConditionNo = $('#pre-existing-condition-no');
  let $petCondition = $('#pet-condition');
  let $conditionSelect =  $('#condition-select');
  let $dogTypeBreed =  $('#dog-type-breed');
  let $catTypeBreed =  $('#cat-type-breed');

  let $petTypeDog = $('#pet-type-dog');
  let $petTypeCat = $('#pet-type-cat');
  let $catInfo = $('#cat-info');
  let $dogInfo = $('#dog-info');

  let $dogType1 = $('#dog-type-1');
  let $dogType2 = $('#dog-type-2');

  let $dogType = $('#dog-type');

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
    let $select = $('#condition-select option:selected');

    // ignore the first option in the list
    if ($('#condition-select option:selected').index() === 0) {
      return;
    }

    // disabled selected condition
    $select.prop('disabled', true);

    // create a pill
    // append pill to condition list
    $('.conditions').append(`<div class="pill__condition">${$select.text()} <span class="close">x</span></div>`);

    // keep a record in the main store
    let conditionsArray = [];
    let $conditions = $('#pet-conditions')
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

function checkForConditions () {
  $('.pill__condition .close').on('click', function (evt) {
    evt.preventDefault();
    evt.currentTarget.parentNode.remove();

    // make the remove condition active in the dropdown
    let btnText = evt.currentTarget.parentNode.textContent;
    let condition = btnText.substr(0, (btnText.length - 2));

    // find condition in select condition-select
    $('#condition-select option').filter(function () { return $(this).html() === condition; }).prop('disabled', false);

    // remove from storage
    let conditions = [];
    conditions = JSON.parse($('#pet-conditions').val());
    conditions = conditions.filter(function (e) { return e !== condition; });
    $('#pet-conditions').val(JSON.stringify(conditions));
  });
}

function ToggleRequiredPetFields () {
  // if pet type selected
  // then check for
  $('input[name="pet-type"]').click(function (event) {
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

export { Pet, ToggleRequiredPetFields };
