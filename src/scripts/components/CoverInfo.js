import { log } from './Utils';

let coverInfoStore = {};

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

    // find the info
    let cover = $(this).data('cover');
    let info = $(this).data('info');
    let price = $(this).data('price');

    // load data into modal body
    $coverInfoModalIntro.html(coverInfoStore[cover].info.cover + ' ' + price);
    $coverInfoModalTitle.html(coverInfoStore[cover].helpText[info].title);
    $coverInfoModalBody.html(coverInfoStore[cover].helpText[info].body);

    $coverInfoModal.modal('show');
  });
}

// module "CoverInfo.js"

function CoverInfo () {
  $.get('data.json', function (data, status) {
    // log(`Data: ${JSON.stringify(data, null, 2)} \nStatus: ${status}`);
    coverInfoStore = data;
  }).fail(function () {
    console.error('Failed to load');
  });
}

export { CoverInfo, Modal };
