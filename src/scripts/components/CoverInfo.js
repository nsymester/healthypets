// import { log } from './Utils';

let coverInfoStore = {};

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

    // find the info
    const cover = $(this).data('cover');
    const info = $(this).data('info');
    const price = $(this).data('price');

    // load data into modal body
    $coverInfoModalIntro.html(`${coverInfoStore[cover].info.cover} ${price}`);
    $coverInfoModalTitle.html(coverInfoStore[cover].helpText[info].title);
    $coverInfoModalBody.html(coverInfoStore[cover].helpText[info].body);

    $coverInfoModal.modal('show');
  });
}

// module "CoverInfo.js"

function CoverInfo() {
  $.get('data.json', function(data, status) {
    // log(`Data: ${JSON.stringify(data, null, 2)} \nStatus: ${status}`);
    coverInfoStore = data;
  }).fail(function() {
    console.error('Failed to load');
  });
}

export { CoverInfo, Modal };
