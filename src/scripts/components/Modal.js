// module "Modal.js"

function Modal() {
  // cahche DOM
  const $jsCoverLevelInfo = $('.js-cover-level__info');
  const $coverInfoModal = $('.cover-info-modal');
  const $coverInfoModalIntro = $('.cover-info__modal-intro');
  const $coverInfoModalTitle = $('.cover-info__modal-title');
  const $coverInfoModalBody = $('.cover-info__modal-body');

  // bind Events
  $jsCoverLevelInfo.click(function(evt) {
    evt.preventDefault();

    // load data into modal body
    $coverInfoModalIntro.html('<strong>Intro</strong>');
    $coverInfoModalTitle.html('Title');
    $coverInfoModalBody.html('Body');

    $coverInfoModal.modal('show');
  });
}

export { Modal };
