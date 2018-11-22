// module 'DatePicker.js'

// postcodes
function SetDate() {
  // cache DOM

  const dtToday = new Date();

  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  const year = dtToday.getFullYear();

  if (month < 10) month = `0${month.toString()}`;
  if (day < 10) day = `0${day.toString()}`;

  const maxDate = `${year}-${month}-${day}`;
  return maxDate;
}

function AddTodaysDate() {
  // cache DOM
  const $todaysDate = $('label[for="policy-start-immediately"');
  const $policyStartDate = $('#policy-start-date');

  // bind Events
  $todaysDate.change(AddTodaysDateHandler);

  // methods
  function AddTodaysDateHandler() {
    if (!$policyStartDate.attr('disabled')) {
      $policyStartDate.val(SetDate());
      $policyStartDate.attr('disabled', true);
    } else {
      $policyStartDate.attr('disabled', false);
    }
  }
}
export { SetDate, AddTodaysDate };
