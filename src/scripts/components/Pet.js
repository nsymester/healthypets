// module "Pet.js"

function Pet () {
  // cache DOM
  let $preExistingConditionYes = $('#pre-existing-condition-yes');
  let $preExistingConditionNo = $('#pre-existing-condition-no');
  let $petCondition = $('#pet-condition');
  let $conditionSelect =  $('#conditionSelect');

  let $petTypeDog = $('#pet-type-dog');
  let $petTypeCat = $('#pet-type-cat');
  let $catInfo = $('#cat-info');
  let $dogInfo = $('#dog-info');

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
    let select = $('#conditionSelect option:selected').val();
    // create a pill
    // append pill to condition list
    $('.conditions').append(`<div class="pill__condition">${select} <span class="close">x</span></div>`);

    checkForConditions();
  });
}

function checkForConditions () {
  $('.pill__condition .close').on('click', function (evt) {
    evt.preventDefault();
    evt.currentTarget.parentNode.remove();
  });
}

export { Pet };
