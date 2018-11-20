// module 'DatePicker.js'

// postcodes
function DatePicker() {
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

export { DatePicker };
