// module "Utils.js"

const log = function(...args) {
  console.log(args);
};

function Utils() {
  // usage: log('inside coolFunc',this,arguments);
  // http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
  window.log = function(...args) {
    // store logs to an array for reference
    log.history = log.history || [];
    log.history.push(args);
    if (window.console) {
      console.log(Array.prototype.slice.call(args));
    }
  };
}

jQuery.print = function(message, insertionType) {
  if (typeof message === 'object') {
    let string = '{<br />';
    const values = [];
    let counter = 0;
    $.each(message, function(key, value) {
      if (value && value.nodeName) {
        let domnode = `&lt;${value.nodeName.toLowerCase()}`;
        domnode += value.className ? ` class="${value.className}"` : '';
        domnode += value.id ? ` id="${value.id}"` : '';
        domnode += '&gt;';
        value = domnode;
      }
      values[counter++] = `${key}: ${value}`;
    });
    string += values.join(',<br />');
    string += '<br />}';
    message = string;
  }

  let $output = $('#print-output');

  if ($output.length === 0) {
    $output = $('<div id="print-output" />').appendTo('body');
  }

  const $newMessage = $('<div class="print-output-line" />');
  $newMessage.html(message);
  insertionType = insertionType || 'append';
  $output[insertionType]($newMessage);
};

export { Utils, log };
