// module "CoverTypes.js"

function CoverTypes () {
  // cache DOM
  let $lifetimeLink = $('#lifetime-link');
  let $maximumLink = $('#maximum-link');
  let $accidentLink = $('#accident-link');
  let $btnCoverLevel = $('.btn--cover-level');

  let $lifetimeCover = $('#lifetime-cover');
  let $maximumCover = $('#maximum-cover');
  let $accidentCover = $('#accident-cover');

  $lifetimeLink.click(function () {
    $lifetimeCover.collapse('show');
    $maximumCover.collapse('hide');
    $accidentCover.collapse('hide');
  });

  $maximumLink.click(function () {
    $lifetimeCover.collapse('hide');
    $maximumCover.collapse('show');
    $accidentCover.collapse('hide');
  });

  $accidentLink.click(function () {
    $lifetimeCover.collapse('hide');
    $maximumCover.collapse('hide');
    $accidentCover.collapse('show');
  });

  // bind Events

  // stop web page from scrolling to top when link is clicked that triggers JavaScript
  $btnCoverLevel.click(function (e) {
    e.preventDefault();
    // target id
    let targetId = $(this).data('target');
    let targetHeight =  $(targetId).height();
    let documentHeight = $(document).height();
    $('html, body').animate({ scrollTop: documentHeight }, targetHeight);

    if (this.innerHTML === 'Choose level') {
      this.innerHTML = 'Hide levels';
      $(this).removeClass('btn-primary');
      $(this).addClass('btn--outline');
    } else {
      this.innerHTML = 'Choose level';
      $(this).removeClass('btn--outline');
      $(this).addClass('btn-primary');
    }
  });
}

export { CoverTypes };
