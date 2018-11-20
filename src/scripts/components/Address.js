// module 'Address.js'

// postcodes
function Address() {
  // cache DOM
  const $postcodeSearch = $('#customer-postcode-search');
  const $addressPostcodes = $('.address__postcodes a');
  const $addressLink = $('.address__link');

  const $postcodeResult = $('#customer-postcode-result');
  const $manualAddress = $('#customer-manual-address');
  const $address = $('#customer-address');

  // bind events
  $postcodeSearch.click(function(evt) {
    evt.preventDefault();
    $postcodeResult.collapse('toggle');
    $manualAddress.collapse('show');
    $address.collapse('hide');
  });

  $addressPostcodes.on('click', function(evt) {
    evt.preventDefault();
    $address.collapse('show');
    $postcodeResult.collapse('hide');
    $manualAddress.collapse('hide');
  });

  $addressLink.on('click', function(evt) {
    evt.preventDefault();
    $address.collapse('show');
    $postcodeResult.collapse('hide');
    $manualAddress.collapse('hide');
  });
}

export { Address };
