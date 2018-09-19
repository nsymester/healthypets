// module "Address.js"

// postcodes

function Address () {
  // cache DOM
  let $postcodeSearch = $('#customer-postcode-search');
  let $addressPostcodes = $('.address__postcodes a');
  let $addressLink = $('.address__link');

  let $postcodeResult = $('#customer-postcode-result');
  let $manualAddress = $('#customer-manual-address');
  let $address = $('#customer-address');

  // bind events
  $postcodeSearch.click(function (evt) {
    evt.preventDefault();
    $postcodeResult.collapse('toggle');
    $manualAddress.collapse('show');
    $address.collapse('hide');
  });

  $addressPostcodes.on('click', function (evt) {
    evt.preventDefault();
    $address.collapse('show');
    $postcodeResult.collapse('hide');
    $manualAddress.collapse('hide');
  });

  $addressLink.on('click', function (evt) {
    evt.preventDefault();
    $address.collapse('show');
    $postcodeResult.collapse('hide');
    $manualAddress.collapse('hide');
  });
}

export { Address };
