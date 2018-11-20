// module "CustomSelect.js"

function closeAllSelect(elmnt) {
  /* a function that will close all select boxes in the document,
  except the current select box: */

  const arrNo = [];
  const x = document.getElementsByClassName('select-items');
  const y = document.getElementsByClassName('select-selected');
  for (let i = 0; i < y.length; i += 1) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }
  for (let i = 0; i < x.length; i += 1) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}

function closeOtherOptions(e) {
  /* when the select box is clicked, close any other select boxes,
  and open/close the current select box: */
  e.stopPropagation();
  closeAllSelect(this);
  this.nextSibling.classList.toggle('select-hide');
  this.classList.toggle('select-arrow-active');
}

function checkForConditions() {
  $('.pill__condition .close').on('click', function(evt) {
    evt.preventDefault();
    evt.currentTarget.parentNode.remove();
  });
}

function CustomSelect() {
  let selectedItem;
  let optionList;
  let optionItem;

  // cache DOM
  /* look for any elements with the class "select--alt": */
  const selectAlt = document.getElementsByClassName('select--alt');

  // bind Events
  for (let i = 0; i < selectAlt.length; i += 1) {
    const selElement = selectAlt[i].getElementsByTagName('select')[0];

    /* for each element, create a new DIV that will act as the selected item: */
    selectedItem = document.createElement('DIV');
    selectedItem.setAttribute('class', 'select-selected');
    selectedItem.innerHTML = selElement.options[selElement.selectedIndex].innerHTML;

    selectAlt[i].appendChild(selectedItem);

    /* for each element, create a new DIV that will contain the option list: */
    optionList = document.createElement('DIV');
    optionList.setAttribute('class', 'select-items select-hide');

    for (let j = 1; j < selElement.length; j += 1) {
      /* for each option in the original select element,
      create a new DIV that will act as an option item: */
      optionItem = document.createElement('DIV');
      optionItem.innerHTML = selElement.options[j].innerHTML;
      optionItem.addEventListener('click', syncOptionSelected);

      optionList.appendChild(optionItem);
    }

    selectAlt[i].appendChild(optionList);

    selectedItem.addEventListener('click', closeOtherOptions);
  }

  // methods
  function syncOptionSelected() {
    /* when an item is clicked, update the original select box,
    and the selected item: */
    const originalSelect = this.parentNode.parentNode.getElementsByTagName('select')[0];

    // store the selected item
    const h = this.parentNode.previousSibling;
    for (let i = 0; i < originalSelect.length; i += 1) {
      if (originalSelect.options[i].innerHTML === this.innerHTML) {
        originalSelect.selectedIndex = i;
        h.innerHTML = this.innerHTML;
        const y = this.parentNode.getElementsByClassName('same-as-selected');
        for (let k = 0; k < y.length; k += 1) {
          y[k].removeAttribute('class');
        }
        this.setAttribute('class', 'same-as-selected');
        break;
      }
    }
    h.click();
    if (originalSelect.getAttribute('id') === 'condition-select') {
      $('.conditions').append(`<div class='pill__condition'>${h.innerHTML} <span class='close'>x</span></div>`);
      checkForConditions();
    }
  }

  /* if the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener('click', closeAllSelect);
}

export { CustomSelect };
