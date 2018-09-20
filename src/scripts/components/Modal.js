// module "Modal.js"

function Modal () {
  // cahche DOM
  let $jsCoverLevelInfo = $('.js-cover-level__info');
  let $coverInfoModal = $('.cover-info-modal');
  let $coverInfoModalIntro = $('.cover-info__modal-intro');
  let $coverInfoModalTitle = $('.cover-info__modal-title');
  let $coverInfoModalBody = $('.cover-info__modal-body');

  // bind Events
  $jsCoverLevelInfo.click(function (evt) {
    evt.preventDefault();

    // load data into modal body
    $coverInfoModalIntro.html('<strong>Intro</strong>');
    $coverInfoModalTitle.html('Title');
    $coverInfoModalBody.html('Body');

    $coverInfoModal.modal('show');
  });
}

export { Modal };
