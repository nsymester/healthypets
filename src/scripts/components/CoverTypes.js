// module "CoverTypes.js"

function CoverTypes() {
  // cache DOM
  const $lifetimeLink = $('#lifetime-link');
  const $maximumLink = $('#maximum-link');
  const $accidentLink = $('#accident-link');
  const $btnCoverLevel = $('.btn--cover-level');

  const $lifetimeCover = $('#lifetime-cover');
  const $maximumCover = $('#maximum-cover');
  const $accidentCover = $('#accident-cover');

  $lifetimeLink.click(function() {
    $lifetimeCover.collapse('show');
    $maximumCover.collapse('hide');
    $accidentCover.collapse('hide');
  });

  $maximumLink.click(function() {
    $lifetimeCover.collapse('hide');
    $maximumCover.collapse('show');
    $accidentCover.collapse('hide');
  });

  $accidentLink.click(function() {
    $lifetimeCover.collapse('hide');
    $maximumCover.collapse('hide');
    $accidentCover.collapse('show');
  });

  // bind Events

  // stop web page from scrolling to top when link is clicked that triggers JavaScript
  $btnCoverLevel.click(function(e) {
    e.preventDefault();
    // target id
    const targetId = $(this).data('target');
    const targetHeight = $(targetId).height() - 100;
    // let documentHeight = $(document).height();
    $('html, body').animate({ scrollTop: targetHeight });

    if (this.innerHTML === 'Choose level') {
      this.innerHTML = 'Hide levels';
      $(this).removeClass('btn-primary');
      $(this).addClass('btn--outline');
    } else {
      this.innerHTML = 'Choose level';
      $(this).removeClass('btn--outline');
      $(this).addClass('btn-primary');
    }

    // get data target
    // split on "-"
    const targetArray = $(this)
      .data('target')
      .split('-');
    console.log('target: ', targetArray[1]);
    // cover = get 2nd element
    // find id "{cover}-cover"
    // remove from classlist "show"
    // $(`${targetArray[1]}-cover`).removeClass('show');
  });
}

export { CoverTypes };
